"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = ["beautiful", "aesthetic", "efficient", "intuitive", "useful"];

export default function GradientRotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <span style={{ display: "inline-block", minWidth: "10ch" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            display: "inline-block",
            fontStyle: "italic",
            backgroundImage:
              "linear-gradient(77deg, rgb(255,255,255) 3%, rgb(255,138,29) 18%, rgb(255,96,212) 32%, rgb(177,74,255) 49%, rgb(95,166,254) 69%, rgb(0,250,121) 87%, rgb(255,255,255) 94%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {words[index]}.
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
