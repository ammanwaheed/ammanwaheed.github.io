"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = [
  { text: "designed", color: "var(--accent-designed)" },
  { text: "scalable", color: "var(--accent-scalable)" },
  { text: "creative", color: "var(--accent-creative)" },
  { text: "driven", color: "var(--accent-driven)" },
];

export default function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const word = words[index];

  return (
    <span
      className="inline-block relative"
      style={{ minWidth: "8ch" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={word.text}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ color: word.color }}
          className="inline-block"
        >
          {word.text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
