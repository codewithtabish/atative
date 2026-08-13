"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type AtativeLogoProps = {
  className?: string;
  color?: string;
  showWordmark?: boolean;
};

/* ------------------------------------------------------------------ */
/*  ATATIVE mark — geometric "A" + wordmark, scales fluidly.           */
/*                                                                      */
/*  Motion is intentionally quiet: a single entrance stagger and one   */
/*  slow breathing accent dot. The old rising-bubble trail was cut —   */
/*  four looping particles fought for attention against the header's   */
/*  new category ticker, and didn't mean anything for a publication    */
/*  mark. One calm signal reads as considered; four reads as busy.     */
/*  Respects prefers-reduced-motion (collapses to a static render).    */
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
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const markVariants: Variants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" },
    },
  };

  const wordmarkVariants: Variants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -6 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" },
    },
  };

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

        {/* Single accent dot — a quiet, continuous "publishing" pulse. */}
        <motion.circle
          cx={50}
          cy={147}
          r={6}
          fill={color}
          fillOpacity={0.4}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.65, 0.4],
                }
          }
          transition={{
            duration: 2.8,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "50px 147px" }}
        />
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
