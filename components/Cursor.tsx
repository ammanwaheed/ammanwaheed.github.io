"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// Height never changes — only width animates — eliminates the oval artifact.
const CURSOR_H = 28;

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [label, setLabel] = useState("");
  const [targetWidth, setTargetWidth] = useState(CURSOR_H);
  const [clicked, setClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 40, mass: 0.5 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    setMounted(true);
    setIsPointerFine(window.matchMedia("(pointer: fine)").matches);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element).closest("a, button, [data-cursor]");
      if (target && !target.hasAttribute("data-no-cursor")) {
        setHovered(true);
        setIsFilled(target.hasAttribute("data-cursor-filled"));
        setLabel(target.getAttribute("data-cursor-label") ?? "");
        setTargetWidth(target.getBoundingClientRect().width);
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = (e.target as Element).closest("a, button, [data-cursor]");
      if (target) {
        setHovered(false);
        setIsFilled(false);
        setLabel("");
      }
    };

    const onDown = () => setClicked(true);
    const onUp   = () => setClicked(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, [mouseX, mouseY]);

  if (!mounted || !isPointerFine) return null;

  // Always expand on hover. No-label/no-fill → empty pill that matches the
  // hovered element's width. Width only changes — height is constant → no oval.
  const hasContent = hovered && (isFilled || !!label);
  const isEmailCursor = label.toLowerCase().includes("email");
  const isVisitCursor = label.toLowerCase() === "visit";

  const pillWidth = isFilled
    ? isVisitCursor
      ? label.length * 7 + 26  // visit: snug, no extra right gap
      : label.length * 7 + 36  // other filled: icon + text + padding
    : label
    ? label.length * 7 + 28  // outline with text
    : targetWidth + 12;      // empty pill — matches hovered element + breathing room
  const width = hovered ? pillWidth : CURSOR_H;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        x: cursorX,
        y: cursorY,
        // Anchor at -CURSOR_H/2 so the circle is centered and the pill
        // extends to the RIGHT of the cursor. Icon lands near the cursor tip.
        translateX: `${-CURSOR_H / 2}px`,
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{ width, scale: clicked ? 0.78 : 1 }}
        transition={{
          width: { type: "spring", stiffness: 480, damping: 36 },
          scale: { type: "spring", stiffness: 700, damping: 28, mass: 0.4 },
        }}
        style={{
          height: CURSOR_H,
          borderRadius: 9999,
          overflow: "hidden",
          border: isFilled && hovered ? "none" : "1.5px solid rgba(240,236,224,0.55)",
          background:
            isFilled && hovered
              ? isVisitCursor ? "#a8d8b8" : "var(--accent-designed)"
              : hovered
              ? "rgba(240,236,224,0.06)"
              : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <AnimatePresence mode="wait">
          {hasContent && (
            <motion.span
              key={label + String(isFilled)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12, delay: 0.1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "10px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "var(--font-geist-sans)",
                fontWeight: 500,
                color: isFilled ? "var(--background)" : "rgba(240,236,224,0.9)",
                whiteSpace: "nowrap",
                paddingInline: "10px",
              }}
            >
              {isFilled && (
                isEmailCursor ? (
                  // Clipboard icon for email
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  </svg>
                ) : isVisitCursor ? (
                  // Globe icon for visit links
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                ) : (
                  // Eye icon for view actions
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )
              )}
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
