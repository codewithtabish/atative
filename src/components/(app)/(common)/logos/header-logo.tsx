"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type AtativeLogoProps = {
  className?: string;
  color?: string;
  showWordmark?: boolean;
};

/* ------------------------------------------------------------------ */
/*  ATATIVE animated logo — fully responsive, works on all devices.    */
/*                                                                      */
/*  - Geometric "A" mark + "ATATIVE" wordmark.                         */
/*  - Scales fluidly with its container (width:100%, height:auto,      */
/*    preserveAspectRatio) — no fixed px sizing anywhere.              */
/*  - On mount: mark and wordmark animate in with a short stagger.     */
/*  - Cool bubble animation: several small bubbles drift upward from   */
/*    the accent point, fading and scaling as they rise, looping on    */
/*    staggered delays so it never looks mechanical.                   */
/*  - Respects prefers-reduced-motion: everything collapses to a       */
/*    plain static render.                                             */
/* ------------------------------------------------------------------ */
export function AtativeHeaderLogo({
  className,
  color = "#829A88",
  showWordmark = true,
}: AtativeLogoProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const markVariants: Variants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" },
    },
  };

  const wordmarkVariants: Variants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" },
    },
  };

  // Bubble config: each bubble rises, drifts sideways slightly, fades out.
  const bubbles = [
    { r: 3.2, dx: -6, delay: 0, duration: 3.2, rise: 46 },
    { r: 2.2, dx: 4, delay: 0.9, duration: 2.6, rise: 38 },
    { r: 1.6, dx: -2, delay: 1.7, duration: 3.0, rise: 34 },
    { r: 2.6, dx: 7, delay: 2.4, duration: 3.4, rise: 42 },
  ];

  return (
    <motion.svg
      viewBox={showWordmark ? "0 0 1200 213" : "0 0 100 213"}
      className={className}
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        maxWidth: "100%",
      }}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="ATATIVE"
      xmlns="http://www.w3.org/2000/svg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <title>ATATIVE</title>

      <motion.g id="mark" variants={markVariants}>
        <path
          d="M50 66 L100 150 H78 L67 130 H33 L22 150 H0 L50 66 Z M50 96 L41 112 H59 L50 96 Z"
          fill={color}
          fillRule="evenodd"
        />

        {/* Anchor bubble — gentle continuous breathing */}
        <motion.circle
          cx={50}
          cy={147}
          r={7}
          fill={color}
          fillOpacity={0.35}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.25, 1],
                  opacity: [0.35, 0.6, 0.35],
                }
          }
          transition={{
            duration: 2.6,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "50px 147px" }}
        />

        {/* Rising bubble trail — small bubbles drifting up and fading out */}
        {!shouldReduceMotion &&
          bubbles.map((b, i) => (
            <motion.circle
              key={i}
              cx={50}
              cy={147}
              r={b.r}
              fill={color}
              initial={{ opacity: 0, y: 0, x: 0, scale: 0.6 }}
              animate={{
                opacity: [0, 0.55, 0],
                y: [0, -b.rise],
                x: [0, b.dx],
                scale: [0.6, 1, 0.8],
              }}
              transition={{
                duration: b.duration,
                delay: b.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
      </motion.g>

      {showWordmark && (
        <motion.g id="wordmark" transform="translate(150, 0)" variants={wordmarkVariants}>
          <text
            x="0"
            y="140"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="92"
            fontWeight="600"
            letterSpacing="14"
            fill={color}
          >
            ATATIVE
          </text>
        </motion.g>
      )}
    </motion.svg>
  );
}

export default AtativeHeaderLogo;
