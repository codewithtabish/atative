// src/components/(app)/(common)/navbars/_componenets/special-day-navbar.tsx

"use client";

import { motion, useReducedMotion } from "framer-motion";

type SpecialDay = {
  month: number;
  day: number;
  title: string;
  message: string;
};

const SPECIAL_DAYS: SpecialDay[] = [
  {
    month: 8,
    day: 14,
    title: "Pakistan Independence Day",
    message: "Celebrating 14th August — Pakistan Zindabad!",
  },
  {
    month: 8,
    day: 15,
    title: "India Independence Day",
    message: "Celebrating 15th August — Jai Hind!",
  },
  {
    month: 8,
    day: 16,
    title: "FIFA World Cup",
    message: "The beautiful game continues — Glory Awaits!",
  },
];

/* Pakistani Flag */
function PakistanFlag({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={
        shouldReduceMotion
          ? undefined
          : {
              rotate: [0, -2.5, 2.5, -1.5, 0],
              y: [0, -1, 1, -0.5, 0],
            }
      }
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 30 20" className="h-full w-full drop-shadow-sm" aria-hidden="true">
        <rect width="30" height="20" fill="#01411C" />
        <rect width="7.5" height="20" fill="#FFFFFF" />
        <circle cx="18.5" cy="10" r="5.2" fill="#FFFFFF" />
        <circle cx="20.2" cy="10" r="4.3" fill="#01411C" />
        <polygon
          fill="#FFFFFF"
          points="22.8,6.8 23.4,8.6 25.3,8.6 23.8,9.7 24.4,11.5 22.8,10.4 21.2,11.5 21.8,9.7 20.3,8.6 22.2,8.6"
        />
      </svg>
    </motion.div>
  );
}

/* Indian Flag */
function IndiaFlag({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={
        shouldReduceMotion
          ? undefined
          : {
              rotate: [0, -2.5, 2.5, -1.5, 0],
              y: [0, -1, 1, -0.5, 0],
            }
      }
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 30 20" className="h-full w-full drop-shadow-sm" aria-hidden="true">
        <rect width="30" height="6.67" y="0" fill="#FF9933" />
        <rect width="30" height="6.67" y="6.67" fill="#FFFFFF" />
        <rect width="30" height="6.66" y="13.34" fill="#138808" />
        <circle cx="15" cy="10" r="2.8" fill="none" stroke="#000080" strokeWidth="0.45" />
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          const x2 = 15 + 2.8 * Math.cos(angle);
          const y2 = 10 + 2.8 * Math.sin(angle);
          return (
            <line key={i} x1="15" y1="10" x2={x2} y2={y2} stroke="#000080" strokeWidth="0.35" />
          );
        })}
        <circle cx="15" cy="10" r="0.55" fill="#000080" />
      </svg>
    </motion.div>
  );
}

/* Animated World Cup Flag Icon */
function WorldCupFlag({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={
        shouldReduceMotion
          ? undefined
          : {
              rotate: [0, -3, 3, -2, 0],
              y: [0, -1.5, 1, -0.8, 0],
            }
      }
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 30 20" className="h-full w-full drop-shadow-sm" aria-hidden="true">
        {/* Soft gradient background */}
        <defs>
          <linearGradient id="wcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>

        <rect width="30" height="20" fill="url(#wcGrad)" rx="1.5" />

        {/* White vertical stripe */}
        <rect x="9" width="4" height="20" fill="white" fillOpacity="0.9" />

        {/* Simple trophy / cup shape */}
        <path
          d="M15 4.5 C13.2 4.5 12 5.8 12 7.5 C12 8.8 12.7 9.8 13.8 10.3 L13.2 14 H16.8 L16.2 10.3 C17.3 9.8 18 8.8 18 7.5 C18 5.8 16.8 4.5 15 4.5 Z"
          fill="white"
          fillOpacity="0.95"
        />
        {/* Trophy base */}
        <rect x="13.5" y="14" width="3" height="1.8" fill="white" fillOpacity="0.9" rx="0.3" />
        <rect x="12.8" y="15.8" width="4.4" height="1.2" fill="white" fillOpacity="0.85" rx="0.4" />
      </svg>
    </motion.div>
  );
}

export default function SpecialDayBanner() {
  const shouldReduceMotion = useReducedMotion();

  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const todaySpecial = SPECIAL_DAYS.find((d) => d.month === month && d.day === day);

  if (!todaySpecial) return null;

  const renderIcon = () => {
    if (todaySpecial.day === 14) {
      return (
        <PakistanFlag className="h-5 w-[30px] shrink-0 overflow-hidden rounded-[2px] sm:h-6 sm:w-9" />
      );
    }
    if (todaySpecial.day === 15) {
      return (
        <IndiaFlag className="h-5 w-[30px] shrink-0 overflow-hidden rounded-[2px] sm:h-6 sm:w-9" />
      );
    }
    // 16 August → FIFA World Cup Flag
    return (
      <WorldCupFlag className="h-5 w-[30px] shrink-0 overflow-hidden rounded-[2px] sm:h-6 sm:w-9" />
    );
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full overflow-hidden bg-primary text-primary-foreground"
    >
      {/* Soft light shine effect */}
      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/12 to-transparent"
          animate={{ x: ["-130%", "130%"] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 3.5,
          }}
        />
      )}

      <div className="relative flex items-center justify-center gap-3 px-4 py-2.5 sm:gap-4">
        {renderIcon()}

        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center text-[12.5px] font-medium tracking-wide sm:text-sm">
          <span className="font-semibold tracking-wider">{todaySpecial.title}</span>
          <span className="hidden opacity-60 sm:inline">•</span>
          <span className="opacity-95">{todaySpecial.message}</span>
        </div>

        {/* Animated star */}
        <motion.span
          className="hidden text-primary-foreground/90 sm:inline"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.3, 1],
                  opacity: [0.65, 1, 0.65],
                  rotate: [0, 12, -8, 0],
                }
          }
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ★
        </motion.span>
      </div>
    </motion.div>
  );
}
