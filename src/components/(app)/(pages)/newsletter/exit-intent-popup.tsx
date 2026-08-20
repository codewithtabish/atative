"use client";

import { subscribeNewsletterAction } from "@/app/actions/(newsletter)/subscribe-newsletter-action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import confetti from "canvas-confetti";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const NEWSLETTER_SUBSCRIBED_KEY = "alentah_newsletter_subscribed";
const POPUP_DISMISSED_KEY = "alentah_newsletter_popup_dismissed";
const NEWSLETTER_SUBSCRIBED_EVENT = "alentah:newsletter-subscribed";

/**
 * Normalize an email before storing/comparing it.
 */
function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

/**
 * Get all locally subscribed newsletter emails.
 *
 * The current format is:
 *
 * ["email@example.com", "another@example.com"]
 *
 * The old boolean format ("true") is also handled safely.
 */
function getSubscribedEmails(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(NEWSLETTER_SUBSCRIBED_KEY);

    if (!stored) {
      return [];
    }

    /**
     * Backward compatibility with the previous implementation.
     *
     * Previously the popup stored:
     *
     * "true"
     *
     * We cannot know which email was subscribed from that value,
     * so we simply ignore it and use the new email-array format.
     */
    if (stored === "true") {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((value): value is string => typeof value === "string")
      .map(normalizeEmail)
      .filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Check whether at least one email has subscribed.
 *
 * This is used by the popup because the popup should disappear
 * after a successful newsletter subscription on this browser.
 */
function hasAnySubscription() {
  return getSubscribedEmails().length > 0;
}

/**
 * Save a subscribed email without deleting existing emails.
 */
function saveSubscribedEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return;
  }

  const existingEmails = getSubscribedEmails();

  if (existingEmails.some((existingEmail) => normalizeEmail(existingEmail) === normalizedEmail)) {
    return;
  }

  localStorage.setItem(
    NEWSLETTER_SUBSCRIBED_KEY,
    JSON.stringify([...existingEmails, normalizedEmail]),
  );
}

/**
 * Get initial popup dismissal state.
 *
 * Dismissal only lasts for the current browser session.
 */
function getInitialDismissedState() {
  if (typeof window === "undefined") {
    return false;
  }

  return sessionStorage.getItem(POPUP_DISMISSED_KEY) === "true";
}

/**
 * Get initial subscription state.
 *
 * The popup only needs to know whether this browser has
 * at least one successfully subscribed email.
 */
function getInitialSubscribedState() {
  if (typeof window === "undefined") {
    return false;
  }

  return hasAnySubscription();
}

function fireConfetti() {
  confetti({
    particleCount: 140,
    spread: 85,
    startVelocity: 30,
    origin: {
      x: 0.5,
      y: 0.5,
    },
    colors: [
      "hsl(var(--primary))",
      "hsl(var(--foreground))",
      "#22c55e",
      "#4ade80",
      "#86efac",
      "#ffffff",
    ],
  });
}

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * True when this browser has at least one newsletter subscription.
   */
  const [subscribed, setSubscribed] = useState(getInitialSubscribedState);

  /**
   * Popup dismissal only lasts for the current session.
   */
  const [dismissed, setDismissed] = useState(getInitialDismissedState);

  /**
   * Listen for newsletter subscriptions made by:
   *
   * - The Daily
   * - this popup
   * - another component in the same tab
   * - another browser tab/window
   *
   * The custom event handles the SAME tab.
   * The storage event handles OTHER tabs.
   */
  useEffect(() => {
    const handleNewsletterSubscribed = () => {
      setSubscribed(true);
      setDismissed(true);
      setOpen(false);
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== NEWSLETTER_SUBSCRIBED_KEY) {
        return;
      }

      const hasSubscription = getSubscribedEmails().length > 0;

      if (hasSubscription) {
        setSubscribed(true);
        setDismissed(true);
        setOpen(false);
      }
    };

    window.addEventListener(NEWSLETTER_SUBSCRIBED_EVENT, handleNewsletterSubscribed);

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(NEWSLETTER_SUBSCRIBED_EVENT, handleNewsletterSubscribed);

      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  /**
   * Exit intent + mobile trigger.
   *
   * We intentionally do not synchronously call setState
   * from the effect body.
   */
  useEffect(() => {
    if (dismissed || subscribed) {
      return;
    }

    /**
     * If there is already a subscription, do not register
     * the popup triggers.
     */
    if (hasAnySubscription()) {
      return;
    }

    const handleMouseLeave = (event: MouseEvent) => {
      const isSubscribed = hasAnySubscription();
      const isDismissed = sessionStorage.getItem(POPUP_DISMISSED_KEY) === "true";

      if (isSubscribed || isDismissed || event.clientY > 5) {
        return;
      }

      setOpen(true);
    };

    document.addEventListener("mouseout", handleMouseLeave);

    let mobileTimer: ReturnType<typeof setTimeout> | undefined;

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      mobileTimer = setTimeout(() => {
        const isSubscribed = hasAnySubscription();

        const isDismissed = sessionStorage.getItem(POPUP_DISMISSED_KEY) === "true";

        if (isSubscribed || isDismissed) {
          return;
        }

        setOpen(true);
      }, 5000);
    }

    return () => {
      document.removeEventListener("mouseout", handleMouseLeave);

      if (mobileTimer) {
        clearTimeout(mobileTimer);
      }
    };
  }, [dismissed, subscribed]);

  /**
   * Dismiss popup for the current session.
   */
  const dismissForSession = () => {
    sessionStorage.setItem(POPUP_DISMISSED_KEY, "true");

    setDismissed(true);
    setOpen(false);
  };

  /**
   * Handle Radix Dialog open state.
   */
  const handleDialogChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      if (open) {
        dismissForSession();
      }

      return;
    }

    /**
     * Never allow opening if a subscription already exists.
     */
    if (subscribed || hasAnySubscription()) {
      setOpen(false);
      return;
    }

    /**
     * Never reopen after session dismissal.
     */
    const isDismissed = sessionStorage.getItem(POPUP_DISMISSED_KEY) === "true";

    if (dismissed || isDismissed) {
      setOpen(false);
      return;
    }

    setOpen(true);
  };

  /**
   * Mark this browser as subscribed.
   *
   * IMPORTANT:
   * We save the actual email rather than "true".
   *
   * This allows The Daily to recognize the exact email.
   */
  const markAsSubscribed = (subscribedEmail: string) => {
    saveSubscribedEmail(subscribedEmail);

    /**
     * Native storage events do NOT fire in the same tab.
     *
     * This custom event makes The Daily update immediately.
     */
    window.dispatchEvent(new Event(NEWSLETTER_SUBSCRIBED_EVENT));

    sessionStorage.setItem(POPUP_DISMISSED_KEY, "true");

    setSubscribed(true);
    setDismissed(true);
    setOpen(false);
  };

  /**
   * Subscribe.
   */
  const handleSubscribe = async () => {
    if (loading || subscribed) {
      return;
    }

    const trimmedEmail = normalizeEmail(email);

    /**
     * Basic validation.
     */
    if (!trimmedEmail || !trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      return;
    }

    /**
     * If this exact email already exists locally,
     * there is no reason to call the server again.
     */
    const alreadySubscribed = getSubscribedEmails().some(
      (storedEmail) => normalizeEmail(storedEmail) === trimmedEmail,
    );

    if (alreadySubscribed) {
      markAsSubscribed(trimmedEmail);
      return;
    }

    setLoading(true);

    try {
      const result = await subscribeNewsletterAction(trimmedEmail);

      /**
       * Server rejected the request.
       *
       * If the server says the email already exists,
       * we still consider it subscribed locally.
       */
      if (!result.success) {
        const message = result.message?.toLowerCase() ?? "";

        const isDuplicate =
          message.includes("already subscribed") ||
          message.includes("already a subscriber") ||
          message.includes("already exists");

        if (isDuplicate) {
          markAsSubscribed(trimmedEmail);
        }

        return;
      }

      /**
       * Successful subscription.
       *
       * Save the ACTUAL email.
       */
      markAsSubscribed(trimmedEmail);

      setEmail("");

      fireConfetti();
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Do not render the popup after:
   *
   * - successful subscription
   * - existing subscription
   * - session dismissal
   */
  if (dismissed || subscribed) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogOverlay
        className="
          fixed
          inset-0
          z-9998
          bg-black/65
          backdrop-blur-[2px]
          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          data-[state=open]:fade-in-0
          data-[state=closed]:fade-out-0
        "
      />

      <DialogContent
        className="
          z-9999!
          m-0!-1/2!
          flex!/2!
          -translate-x-1/2!
          -translate-y-1/2!
          items-center!
          justify-center!/2
          overflow-visible!
          border-0!nter
          bg-transparent!
          p-0!rflow-visible
          shadow-none!
          outline-none!nt
          ring-0!
          max-w-none!
          outline-none!
          ring-0!none
          max-w-none!hidden
        "
        style={{
          width: "min(720px, calc(100vw - 36px), calc(100vh - 36px))",
          height: "min(720px, calc(100vw - 36px), calc(100vh - 36px))",
        }}
      >
        <div className="relative h-full w-full">
          <button
            type="button"
            aria-label="Close newsletter popup"
            onClick={dismissForSession}
            className="
              absolute
              right-[-5px]
              top-[-5px]
              z-100
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-border
              bg-background
              text-foreground
              shadow-[0_8px_25px_rgba(0,0,0,0.3)]
              transition-colors
              hover:bg-muted
              focus:outline-none
              focus:ring-2
              focus:ring-primary
              sm:right-[-10px]
              sm:top-[-10px]
              sm:h-11
              sm:w-11
              md:right-[-14px]
              md:top-[-14px]
              md:h-12
              md:w-12
            "
          >
            <X
              className="
                h-5
                w-5
                stroke-2
                sm:h-[21px]
                sm:w-[21px]
              "
            />
          </button>

          <div
            className="
              absolute
              inset-0
              rounded-full
              border-4
              border-primary
              bg-background
              shadow-[0_30px_100px_rgba(0,0,0,0.45)]
            "
          />

          <div
            className="
              absolute
              inset-[4px]
              z-10
              flex
              items-center
              justify-center
              overflow-hidden
              rounded-full
              bg-background
            "
          >
            <div
              className="
                relative
                z-20
                flex
                w-[68%]
                max-w-[480px]
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <div className="mb-3 flex justify-center sm:mb-4">
                <div
                  className="
                    border-y-2
                    border-foreground
                    px-4
                    py-1
                    sm:border-y-[3px]
                    sm:px-5
                    sm:py-1.5
                  "
                >
                  <span
                    className="
                      text-xl
                      font-black
                      tracking-[-0.065em]
                      text-foreground
                      sm:text-2xl
                      md:text-3xl
                    "
                  >
                    ALENTAH
                  </span>
                </div>
              </div>

              <p
                className="
                  mb-2
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-muted-foreground
                  sm:mb-3
                  sm:text-xs
                  md:text-sm
                "
              >
                Stay in the know
              </p>

              <DialogTitle
                className="
                  mx-auto!
                  max-w-[500px]!
                  p-0!
                  font-black!
                  leading-[1.02]!
                  tracking-[-0.045em]!
                  text-foreground!
                "
                style={{
                  fontSize: "clamp(1.35rem, 3.2vw, 2.55rem)",
                }}
              >
                Stay ahead with the latest
              </DialogTitle>

              <DialogDescription
                className="
                  mx-auto!
                  mt-3!
                  max-w-[410px]!
                  font-medium!
                  leading-tight!
                  text-muted-foreground!
                  sm:mt-4!
                "
                style={{
                  fontSize: "clamp(0.78rem, 1.5vw, 1.1rem)",
                }}
              >
                Get Alentah&apos;s latest stories, guides, reviews, and ideas delivered straight to
                your inbox.
              </DialogDescription>

              <div
                className="
                  mt-4
                  w-full
                  space-y-2.5
                  sm:mt-5
                  sm:space-y-3
                "
              >
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  value={email}
                  disabled={loading}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      void handleSubscribe();
                    }
                  }}
                  className="
                    h-10
                    w-full
                    rounded-lg
                    border-border
                    bg-background
                    px-3
                    text-xs
                    shadow-sm
                    placeholder:text-muted-foreground
                    focus-visible:border-primary
                    focus-visible:ring-2
                    focus-visible:ring-primary/20
                    sm:h-12
                    sm:px-4
                    sm:text-sm
                    md:h-13
                  "
                />

                <div
                  className="
                    flex
                    items-start
                    gap-2
                    px-0.5
                    text-left
                  "
                >
                  <Checkbox
                    id="deals"
                    defaultChecked
                    disabled={loading}
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                      sm:h-[18px]
                      sm:w-[18px]
                    "
                  />

                  <Label
                    htmlFor="deals"
                    className="
                      cursor-pointer
                      text-[9px]
                      font-medium
                      leading-[1.3]
                      text-muted-foreground
                      sm:text-xs
                      md:text-sm
                    "
                  >
                    Get our newsletter so you never miss an update or deal.
                  </Label>
                </div>

                <Button
                  type="button"
                  disabled={loading}
                  onClick={() => void handleSubscribe()}
                  className="
                    h-10
                    w-full
                    rounded-lg
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    shadow-md
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:shadow-lg
                    active:translate-y-0
                    sm:h-12
                    sm:text-sm
                    md:h-13
                  "
                >
                  {loading ? "Subscribing..." : "Sign Me Up"}
                </Button>

                <button
                  type="button"
                  onClick={dismissForSession}
                  className="
                    mx-auto
                    block
                    text-[10px]
                    font-medium
                    text-primary
                    underline
                    underline-offset-4
                    transition-opacity
                    hover:opacity-70
                    sm:text-xs
                    md:text-sm
                  "
                >
                  No thanks
                </button>

                <p
                  className="
                    mx-auto
                    max-w-[360px]
                    text-[7px]
                    leading-tight
                    text-muted-foreground
                    sm:text-[8px]
                    md:text-[9px]
                  "
                >
                  By signing up, you agree to receive updates from Alentah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
