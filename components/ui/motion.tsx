"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

/**
 * Primitivas de animación del Design System — nivel profesional.
 * Suaves, con física de resorte y respeto por `prefers-reduced-motion`.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

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
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Slide up con resorte suave (para cards / secciones). */
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: EASE_OUT_EXPO }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Reveal con clip y desplazamiento — editorial premium. */
export function Reveal({
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
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: EASE_OUT_EXPO }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Scale con resorte (aparición). */
export function Scale({
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
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT_EXPO }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Parallax sutil para imágenes de fondo. */
export function Parallax({
  children,
  className,
  offset = 40,
  ...props
}: MotionDivProps & { offset?: number }) {
  const reduce = useMotionSafe();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  if (reduce) return <div ref={ref} className={className}>{children}</div>;
  return (
    <motion.div ref={ref} className={className} style={{ y }} {...props}>
      {children}
    </motion.div>
  );
}

const staggerVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

/** Contenedor que anima hijos en cascada con resorte. */
export function StaggerGroup({ children, className, ...props }: MotionDivProps) {
  const reduce = useMotionSafe();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
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

/** Blur-in para imágenes hero. */
export function BlurIn({ children, className, ...props }: MotionDivProps) {
  const reduce = useMotionSafe();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
