"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

const SIZE = 52;
const LINE_W = 2;

export default function ScrollCircle({
  gridRef,
}: {
  gridRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollY } = useScroll();
  const gpRef = useRef({ top: 0, left: 0 });
  const vhRef = useRef(0);

  const tx = useMotionValue(-9999);
  const ty = useMotionValue(-9999);
  const mw = useMotionValue(SIZE);
  const mh = useMotionValue(SIZE);
  const mbr = useMotionValue(SIZE / 2);

  const compute = useCallback(
    (sy: number) => {
      const { top: gTop, left: gLeft } = gpRef.current;
      const vh = vhRef.current;
      if (!vh) return;

      // s0: animation starts when grid top is 50% down the viewport
      // s1: animation ends 320px of scroll later
      const s0 = gTop - vh * 0.5;
      const s1 = s0 + 320;

      if (sy <= s0) {
        // Phase 1: circle tracks the grid's top-left corner
        tx.set(gLeft - SIZE / 2);
        ty.set(gTop - SIZE / 2 - sy);
        mw.set(SIZE);
        mh.set(SIZE);
        mbr.set(SIZE / 2);
      } else if (sy < s1) {
        // Phase 2: unravel — circle morphs into a left-edge line
        const p = (sy - s0) / (s1 - s0);
        // ease-in-out
        const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;

        const startTx = gLeft - SIZE / 2;
        const startTy = gTop - SIZE / 2 - s0;

        tx.set(startTx * (1 - e));
        ty.set(startTy * (1 - e));
        mw.set(SIZE + (LINE_W - SIZE) * e);
        mh.set(SIZE + (vh - SIZE) * e);
        mbr.set((SIZE / 2) * (1 - e));
      } else {
        // Phase 3: stuck as a full-height line at the left edge
        tx.set(0);
        ty.set(0);
        mw.set(LINE_W);
        mh.set(vh);
        mbr.set(0);
      }
    },
    [tx, ty, mw, mh, mbr]
  );

  useEffect(() => {
    const measure = () => {
      vhRef.current = window.innerHeight;
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        gpRef.current = {
          top: rect.top + window.scrollY,
          left: rect.left,
        };
        compute(scrollY.get());
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [gridRef, compute, scrollY]);

  useMotionValueEvent(scrollY, "change", compute);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: tx,
        y: ty,
        width: mw,
        height: mh,
        borderRadius: mbr,
        background: "rgba(240, 236, 224, 0.18)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
