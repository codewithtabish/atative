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
];

/* Pakistani Flag with gentle wave animation */
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
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 30 20"
        className="h-full w-full drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Green field */}
        <rect width="30" height="20" fill="#01411C" />
        {/* White stripe */}
        <rect width="7.5" height="20" fill="#FFFFFF" />
        {/* Crescent */}
        <circle cx="18.5" cy="10" r="5.2" fill="#FFFFFF" />
        <circle cx="20.2" cy="10" r="4.3" fill="#01411C" />
        {/* Star */}
        <polygon
          fill="#FFFFFF"
          points="22.8,6.8 23.4,8.6 25.3,8.6 23.8,9.7 24.4,11.5 22.8,10.4 21.2,11.5 21.8,9.7 20.3,8.6 22.2,8.6"
        />
      </svg>
    </motion.div>
  );
}

export default function SpecialDayBanner() {
  const shouldReduceMotion = useReducedMotion();

  // Compute during render (no useEffect + setState needed)
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const todaySpecial = SPECIAL_DAYS.find((d) => d.month === month && d.day === day);

  if (!todaySpecial) return null;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full overflow-hidden bg-[#0B6E4F] text-white"
    >
      {/* Soft shine animation */}
      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-120%", "120%"] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 4,
          }}
        />
      )}

      <div className="relative flex items-center justify-center gap-3 px-4 py-2.5 sm:gap-4">
        {/* Animated Flag */}
        <PakistanFlag className="h-5 w-[30px] shrink-0 overflow-hidden rounded-[2px] sm:h-6 sm:w-9" />

        {/* Text */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center text-[12.5px] font-medium tracking-wide sm:text-sm">
          <span className="font-semibold tracking-wider">{todaySpecial.title}</span>
          <span className="hidden opacity-60 sm:inline">•</span>
          <span className="opacity-95">{todaySpecial.message}</span>
        </div>

        {/* Soft glowing star */}
        <motion.span
          className="hidden text-amber-300 sm:inline"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }
          }
          transition={{
            duration: 2.4,
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
