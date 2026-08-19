"use client";

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

const POPUP_DISMISSED_KEY = "alentah_newsletter_popup_dismissed";

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  /*
   * ============================================================
   * CHECK IF POPUP WAS ALREADY DISMISSED IN THIS TAB
   * ============================================================
   */

  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return sessionStorage.getItem(POPUP_DISMISSED_KEY) === "true";
  });

  /*
   * ============================================================
   * DISMISS FOR THIS TAB / SESSION
   *
   * sessionStorage disappears when the browser tab/session ends.
   * ============================================================
   */

  const dismissForSession = () => {
    sessionStorage.setItem(POPUP_DISMISSED_KEY, "true");
    setDismissed(true);
    setOpen(false);
  };

  /*
   * ============================================================
   * EXIT INTENT + MOBILE
   * ============================================================
   */

  useEffect(() => {
    if (dismissed) return;

    /*
     * DESKTOP EXIT INTENT
     */

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 5 && !open) {
        setOpen(true);
      }
    };

    document.addEventListener("mouseout", handleMouseLeave);

    /*
     * MOBILE
     *
     * Touch devices do not have desktop exit intent,
     * so show once after 5 seconds.
     */

    let mobileTimer: ReturnType<typeof setTimeout> | undefined;

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      mobileTimer = setTimeout(() => {
        if (!dismissed) {
          setOpen(true);
        }
      }, 5000);
    }

    return () => {
      document.removeEventListener("mouseout", handleMouseLeave);

      if (mobileTimer) {
        clearTimeout(mobileTimer);
      }
    };
  }, [dismissed, open]);

  /*
   * ============================================================
   * DIALOG OPEN / CLOSE
   *
   * Any user-initiated close counts as dismissed:
   * - X
   * - No thanks
   * - Escape
   * - clicking outside
   * ============================================================
   */

  const handleDialogChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setOpen(true);
      return;
    }

    if (open) {
      dismissForSession();
    }
  };

  /*
   * ============================================================
   * CONFETTI
   * ============================================================
   */

  const fireConfetti = () => {
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
  };

  /*
   * ============================================================
   * SUBSCRIBE
   * ============================================================
   */

  const handleSubscribe = async () => {
    const trimmedEmail = email.trim();

    /*
     * Do NOT dismiss if email is invalid.
     */

    if (!trimmedEmail || !trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);

    /*
     * TODO:
     * Replace this with your real newsletter API.
     */

    await new Promise((resolve) => setTimeout(resolve, 900));

    /*
     * Valid subscription:
     * dismiss for this tab/session.
     */

    sessionStorage.setItem(POPUP_DISMISSED_KEY, "true");

    setDismissed(true);
    setLoading(false);

    fireConfetti();

    setOpen(false);
  };

  /*
   * ============================================================
   * DON'T RENDER AFTER DISMISSAL
   * ============================================================
   */

  if (dismissed) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      {/* ========================================================
          BACKDROP
      ======================================================== */}

      <DialogOverlay
        className="
          fixed
          inset-0
          z-[9998]
          bg-black/65
          backdrop-blur-[2px]
          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          data-[state=open]:fade-in-0
          data-[state=closed]:fade-out-0
        "
      />

      {/* ========================================================
          MODAL
      ======================================================== */}

      <DialogContent
        className="
          !fixed
          !left-1/2
          !top-1/2
          !z-[9999]
          !m-0
          !flex
          !-translate-x-1/2
          !-translate-y-1/2
          !items-center
          !justify-center
          !overflow-visible
          !border-0
          !bg-transparent
          !p-0
          !shadow-none
          !outline-none
          !ring-0
          !max-w-none
          [&>button]:hidden
        "
        style={{
          width: "min(720px, calc(100vw - 36px), calc(100vh - 36px))",
          height: "min(720px, calc(100vw - 36px), calc(100vh - 36px))",
        }}
      >
        {/* ======================================================
            POPUP WRAPPER
        ====================================================== */}

        <div className="relative h-full w-full">
          {/* ====================================================
              CLOSE BUTTON
              OUTSIDE THE CIRCLE
          ==================================================== */}

          <button
            type="button"
            aria-label="Close newsletter popup"
            onClick={dismissForSession}
            className="
              absolute
              right-[-5px]
              top-[-5px]
              z-[100]
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
                stroke-[2]
                sm:h-[21px]
                sm:w-[21px]
              "
            />
          </button>

          {/* ====================================================
              STATIC CIRCLE BORDER
          ==================================================== */}

          <div
            className="
              absolute
              inset-0
              rounded-full
              border-[4px]
              border-primary
              bg-background
              shadow-[0_30px_100px_rgba(0,0,0,0.45)]
            "
          />

          {/* ====================================================
              INNER SURFACE
          ==================================================== */}

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
            {/* ==================================================
                CONTENT
            ================================================== */}

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
              {/* ==================================================
                  ALENTAH BRAND
              ================================================== */}

              <div
                className="
                  mb-3
                  flex
                  justify-center
                  sm:mb-4
                "
              >
                <div
                  className="
                    border-y-[2px]
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

              {/* ==================================================
                  SMALL INTRO
              ================================================== */}

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

              {/* ==================================================
                  MAIN HEADING
              ================================================== */}

              <DialogTitle
                className="
                  !mx-auto
                  !max-w-[500px]
                  !p-0
                  !font-black
                  !leading-[1.02]
                  !tracking-[-0.045em]
                  !text-foreground
                "
                style={{
                  fontSize: "clamp(1.35rem, 3.2vw, 2.55rem)",
                }}
              >
                Stay ahead with the latest
              </DialogTitle>

              {/* ==================================================
                  DESCRIPTION
              ================================================== */}

              <DialogDescription
                className="
                  !mx-auto
                  !mt-3
                  !max-w-[410px]
                  !font-medium
                  !leading-tight
                  !text-muted-foreground
                  sm:!mt-4
                "
                style={{
                  fontSize: "clamp(0.78rem, 1.5vw, 1.1rem)",
                }}
              >
                Get Alentah&apos;s latest stories, guides, reviews, and ideas delivered straight to
                your inbox.
              </DialogDescription>

              {/* ==================================================
                  FORM
              ================================================== */}

              <div
                className="
                  mt-4
                  w-full
                  space-y-2.5
                  sm:mt-5
                  sm:space-y-3
                "
              >
                {/* EMAIL */}

                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubscribe();
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

                {/* CHECKBOX */}

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

                {/* BUTTON */}

                <Button
                  type="button"
                  disabled={loading}
                  onClick={handleSubscribe}
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

                {/* NO THANKS */}

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

                {/* ==================================================
                    LEGAL
                ================================================== */}

                <p
                  className="
                    mx-auto
                    max-w-[360px]
                    text-[7px]
                    leading-[1.25]
                    text-muted-foreground
                    sm:text-[8px]
                    md:text-[9px]
                  "
                >
                  By signing up, you agree to receive updates from Alentah. You can unsubscribe at
                  any time. See our Terms of Use and Privacy Policy for more information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
