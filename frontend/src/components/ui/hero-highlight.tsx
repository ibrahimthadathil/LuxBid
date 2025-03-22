"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React from "react";
import { useTheme } from "@/components/theme/theme-provider";
export const HeroHighlight = ({
  children,
  className,
  containerClassName,color,bg
}: {color?:string;
  bg?:string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const { theme } = useTheme(); 
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

const highlightDotBgClass = theme === 'light'
  ? 'bg-dot-thick-indigo-400'
  : 'bg-dot-thick-indigo-700';
  return (
    <div
      className={cn(
        "relative h-full flex items-center dark:bg-transparent justify-center rounded-xl w-full group",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <div className={`absolute inset-0 ${bg || 'bg-dot-thick-transparent'} pointer-events-none`} />
      <motion.div
className={`pointer-events-none ${color || highlightDotBgClass} absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100`}        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />

      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { theme } = useTheme(); 

  const gradientClass = theme === 'light'
    ? 'from-indigo-300 to-purple-300'
    : 'from-indigo-500 to-purple-500';

  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r ${gradientClass}`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};
