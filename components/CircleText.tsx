"use client";

import { motion, MotionValue } from "framer-motion";
import { useId } from "react";

interface CircleTextProps {
  text: string;
  radius?: number;
  fontSize?: number;
  letterSpacing?: number;
  color?: string;
  rotate: MotionValue<number>;
}

export default function CircleText({
  text,
  radius = 180,
  fontSize = 28,
  letterSpacing = 10,
  color = "rgba(240,236,224,0.3)",
  rotate,
}: CircleTextProps) {
  const id = useId().replace(/:/g, "-");
  const size = radius * 2 + fontSize * 2 + 16;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;

  const charWidth = fontSize * 0.58 + letterSpacing;
  const textLen = text.length * charWidth;
  const repeatCount = Math.max(2, Math.ceil(circumference / textLen) + 1);
  const fullText = Array(repeatCount).fill(text).join("  ");

  const pathD = `M ${cx},${cy} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ color, rotate }}
    >
      <defs>
        <path id={`cp-${id}`} d={pathD} />
      </defs>
      <text
        fontSize={fontSize}
        fill="currentColor"
        fontFamily="var(--font-instrument-serif), Georgia, serif"
        fontWeight="400"
        letterSpacing={letterSpacing}
      >
        <textPath href={`#cp-${id}`}>{fullText}</textPath>
      </text>
    </motion.svg>
  );
}
