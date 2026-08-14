"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

/**
 * Primitivas de animación del Design System.
 * Rápidas, suaves y discretas. Respetan `prefers-reduced-motion`.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

function useMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}

type MotionDivProps = Omit<HTMLMotionProps<"div">, "children" | "className"> & {
  children?: React.ReactNode;
  className?: string;
};

/** Fade in suave. */
export function Fade({ children, className, ...props }: MotionDivProps) {
  const reduce = useMotionSafe();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Slide up (para cards / secciones). */
export function SlideUp({
  children,
  className,
  delay = 0,
  ...props
}: MotionDivProps & { delay?: number }) {
  const reduce = useMotionSafe();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Scale (aparición). */
export function Scale({ children, className, ...props }: MotionDivProps) {
  const reduce = useMotionSafe();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const staggerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

/** Contenedor que anima hijos en cascada. Los hijos usan <StaggerItem/>. */
export function StaggerGroup({ children, className, ...props }: MotionDivProps) {
  const reduce = useMotionSafe();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, ...props }: MotionDivProps) {
  const reduce = useMotionSafe();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={staggerVariants} {...props}>
      {children}
    </motion.div>
  );
}
