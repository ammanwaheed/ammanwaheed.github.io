"use client";

import { motion } from "framer-motion";

interface WorkCardProps {
  title: string;
  tag: string;
  year: string;
  href: string;
  gradient: string;
}

export default function WorkCard({ title, tag, year, href, gradient }: WorkCardProps) {
  return (
    <motion.a
      href={href}
      className="block cursor-none"
      data-cursor-label="View Project"
      data-cursor-filled
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Image block — hover overlay removed, cursor handles it */}
      <div
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5"
        style={{ background: gradient }}
      >
        {/* Tag pill — top left */}
        <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-sm text-foreground/90">
          {tag}
        </span>
        {/* Year — top right */}
        <span className="absolute top-4 right-4 font-mono text-[10px] text-foreground/60">
          {year}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl text-foreground leading-snug">{title}</h3>
    </motion.a>
  );
}
