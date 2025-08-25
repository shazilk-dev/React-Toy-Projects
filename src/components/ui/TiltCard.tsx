"use client";

import React, { useRef } from "react";
import { useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "../../lib/utils";
import { useReducedMotionPref } from "../../hooks/useReducedMotionPref";

interface TiltCardProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onDrag" | "onDragStart" | "onDragEnd"
  > {
  glare?: boolean;
  scale?: number;
  rotate?: number; // max deg each axis
}

export const TiltCard: React.FC<TiltCardProps> = ({
  className,
  children,
  glare = true,
  scale = 1.015,
  rotate = 8,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useMotionValue(0);
  const rY = useMotionValue(0);

  function onMove(e: React.MouseEvent) {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rX.set((py - 0.5) * -rotate);
    rY.set((px - 0.5) * rotate);
    x.set((px - 0.5) * 30);
    y.set((py - 0.5) * 30);
  }
  function reset() {
    rX.set(0);
    rY.set(0);
    x.set(0);
    y.set(0);
  }

  const glareBg = useMotionTemplate`radial-gradient(circle at calc(50% + ${x}px) calc(50% + ${y}px), oklch(0.85_0.12_250/.55), transparent 65%)`;
  const shine = useMotionTemplate`linear-gradient(125deg, transparent 0%, oklch(0.9_0.08_250/.0) 33%, oklch(0.9_0.08_250/.35) 50%, transparent 67%)`;

  // Inline style state
  const styleRef = useRef<{ rX: number; rY: number }>({ rX: 0, rY: 0 });
  // Sync transforms manually to avoid motion component typing issues
  React.useEffect(() => {
    if (reduced) return; // skip reactive transform updates
    const unsubX = rX.on("change", (v) => {
      styleRef.current.rX = v;
      apply();
    });
    const unsubY = rY.on("change", (v) => {
      styleRef.current.rY = v;
      apply();
    });
    function apply() {
      if (!ref.current) return;
      ref.current.style.transform = `perspective(1000px) rotateX(${styleRef.current.rX}deg) rotateY(${styleRef.current.rY}deg)`;
    }
    return () => {
      unsubX();
      unsubY();
    };
  }, [rX, rY, reduced]);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        "relative transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d]",
        !reduced && "hover:scale-[" + scale + "]",
        className,
      )}
      {...rest}
    >
      {glare && !reduced && (
        <>
          <div
            aria-hidden
            style={{ backgroundImage: glareBg as unknown as string }}
            className="rounded-inherit pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
          />
          <div
            aria-hidden
            style={{
              backgroundImage: shine as unknown as string,
              backgroundSize: "300% 300%",
            }}
            className="rounded-inherit pointer-events-none absolute inset-0 animate-[shineMove_5s_linear_infinite] opacity-0 mix-blend-plus-lighter transition-opacity duration-500 group-hover:opacity-60"
          />
        </>
      )}
      <style>{`
        @keyframes shineMove {
          to {
            transform: translate3d(-30%, 0, 0);
          }
        }
      `}</style>
      {children}
    </div>
  );
};
