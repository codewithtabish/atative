"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type AtativeLogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export function AtativeHeaderLogo({ className, showWordmark = true }: AtativeLogoProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.04,
      },
    },
  };

  const markVariants: Variants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const wordmarkVariants: Variants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.svg
      viewBox={showWordmark ? "0 0 680 140" : "0 0 110 140"}
      className={cn("h-9 w-auto sm:h-10 md:h-11 lg:h-12", className)}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="ATATIVE"
      xmlns="http://www.w3.org/2000/svg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <title>ATATIVE</title>

      {/* Geometric Italic A */}
      <motion.g id="mark" variants={markVariants}>
        {/* Main italic A shape */}
        <path
          d="M62 16 
             L118 122 
             H94 
             L82 94 
             H38 
             L26 122 
             H2 
             L62 16 
             Z 
             
             M62 48 
             L48 78 
             H76 
             L62 48 
             Z"
          fill="currentColor"
          fillRule="evenodd"
          className="text-primary"
        />

        {/* Soft accent pulse */}
        <motion.circle
          cx={62}
          cy={118}
          r={5.5}
          className="fill-primary"
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
            duration: 3.2,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "62px 118px" }}
        />
      </motion.g>

      {/* Wordmark */}
      {showWordmark && (
        <motion.g id="wordmark" variants={wordmarkVariants}>
          <text
            x="148"
            y="98"
            fontFamily="var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
            fontSize="72"
            fontWeight="700"
            letterSpacing="6"
            className="fill-foreground"
          >
            ATATIVE
          </text>
        </motion.g>
      )}
    </motion.svg>
  );
}

export default AtativeHeaderLogo;
