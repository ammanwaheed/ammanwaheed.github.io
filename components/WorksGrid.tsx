"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface Work {
  title: string;
  subtitle: string;
  href: string;
  gradient: string;
  // stack variant (Cordage)
  image?: string;
  image2?: string;
  // logo variant (VTS)
  logoImage?: string;
  // overlap variant (Kumori)
  mat1?: string;
  mat2?: string;
  // screen + chart variant (DistillerSR)
  screenImage?: string;
  chartImage?: string;
  // website + phone variant (Qamar)
  siteImage?: string;
  phoneImage?: string;
  // fanned screenshots variant (UW)
  fanImages?: string[];
  // custom cursor label (defaults to "View Project")
  cursorLabel?: string;
  // override aspect ratio (defaults to "4/3")
  aspectRatio?: string;
}

export default function WorksGrid({ works }: { works: Work[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const col1 = works.filter((_, i) => i % 2 === 0);
  const col2 = works.filter((_, i) => i % 2 !== 0);

  const card = (work: Work, idx: number) => {
    const isHovered = hovered === idx;
    const dimmed = hovered !== null && !isHovered;

    return (
      <motion.a
        key={work.title}
        href={work.href}
        className="block cursor-none relative"
        style={{ zIndex: isHovered ? 20 : 1 }}
        data-cursor-label={work.cursorLabel ?? "View Project"}
        data-cursor-filled
        onMouseEnter={() => setHovered(idx)}
        onMouseLeave={() => setHovered(null)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.08 }}
      >
        {/* Card shell */}
        <motion.div
          className="relative w-full overflow-hidden"
          style={{ background: work.gradient, aspectRatio: work.aspectRatio ?? "4/3" }}
          animate={{ filter: dimmed ? "brightness(0.07)" : "brightness(1)" }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >

          {/* ── VTS: animated blob gradient + white logo ── */}
          {work.logoImage && (
            <>
              <div className="absolute inset-0" style={{ overflow: "hidden" }}>
                {/* orange blob — top left */}
                <div style={{
                  position: "absolute", inset: "-50%",
                  background: "radial-gradient(ellipse 65% 55% at 22% 28%, #f0922a 0%, transparent 55%)",
                  animation: "gradBlob1 6s ease-in-out infinite",
                  filter: "blur(28px)",
                }} />
                {/* strong purple blob — top right */}
                <div style={{
                  position: "absolute", inset: "-50%",
                  background: "radial-gradient(ellipse 70% 65% at 80% 18%, #a070d8 0%, transparent 52%)",
                  animation: "gradBlob2 7s ease-in-out infinite",
                  filter: "blur(24px)",
                }} />
                {/* secondary purple — bottom left */}
                <div style={{
                  position: "absolute", inset: "-50%",
                  background: "radial-gradient(ellipse 60% 50% at 12% 78%, #8855cc 0%, transparent 55%)",
                  animation: "gradBlob3 8s ease-in-out infinite reverse",
                  filter: "blur(32px)",
                }} />
                {/* warm pink/peach bridge — center */}
                <div style={{
                  position: "absolute", inset: "-50%",
                  background: "radial-gradient(ellipse 55% 45% at 55% 55%, #e8a0b0 0%, transparent 58%)",
                  animation: "gradBlob1 5s ease-in-out infinite reverse",
                  filter: "blur(36px)",
                }} />
              </div>

              {/* Logo — inverted to white, screen blend hides the black bg */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={work.logoImage}
                  alt="VTS Activate"
                  style={{
                    width: "55%",
                    height: "auto",
                    filter: "invert(1)",
                    mixBlendMode: "screen",
                  }}
                />
              </div>
            </>
          )}

          {/* ── Cordage: right-displaced stacked images ── */}
          {work.image && (
            <motion.img
              src={work.image}
              alt=""
              className="absolute pointer-events-none"
              style={{
                bottom: "22%",
                right: "-17%",
                width: "95%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "4px",
                zIndex: 1,
              }}
              animate={{
                x: isHovered ? 18 : 0,
                rotate: isHovered ? 4 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          )}
          {work.image2 && (
            <motion.img
              src={work.image2}
              alt=""
              className="absolute pointer-events-none"
              style={{
                bottom: "-7%",
                right: "-2%",
                width: "88%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "4px",
                zIndex: 2,
              }}
              animate={{
                x: isHovered ? 10 : 0,
                rotate: isHovered ? -3 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          )}

          {/* ── DistillerSR: both cut off left, chart below + on top ── */}
          {work.screenImage && (
            <motion.img
              src={work.screenImage}
              alt=""
              className="absolute pointer-events-none"
              style={{
                top: "6%",
                left: "-6%",
                width: "88%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
                zIndex: 1,
              }}
              animate={{ x: isHovered ? 16 : 0 }}
              transition={{ duration: 0.45, ease: "easeInOut", delay: 0 }}
            />
          )}
          {work.chartImage && (
            <motion.img
              src={work.chartImage}
              alt=""
              className="absolute pointer-events-none"
              style={{
                bottom: "-8%",
                left: "-2%",
                width: "78%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 8px 28px rgba(0,0,0,0.3)",
                zIndex: 2,
              }}
              animate={{ x: isHovered ? 16 : 0 }}
              transition={{ duration: 0.45, ease: "easeInOut", delay: isHovered ? 0.12 : 0 }}
            />
          )}

          {/* ── Qamar: website bottom-anchored left, phone bottom-right ── */}
          {work.siteImage && (
            <motion.img
              src={work.siteImage}
              alt=""
              className="absolute pointer-events-none"
              style={{
                bottom: "0",
                left: "-18%",
                width: "98%",
                height: "auto",
                objectFit: "contain",
                objectPosition: "bottom",
                borderRadius: "8px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                transformOrigin: "bottom left",
                zIndex: 1,
              }}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />
          )}
          {work.phoneImage && (
            <motion.img
              src={work.phoneImage}
              alt=""
              className="absolute pointer-events-none"
              style={{
                bottom: "0",
                right: "6%",
                width: "30%",
                height: "auto",
                objectFit: "contain",
                transformOrigin: "bottom left",
                zIndex: 2,
              }}
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />
          )}

          {/* ── Kumori: overlapping mats — cross at card center ── */}
          {/* mat2 anchored at bottom-left = center, extends to top-right */}
          {work.mat2 && (
            <motion.img
              src={work.mat2}
              alt=""
              className="absolute pointer-events-none"
              style={{
                left: "44%",
                bottom: "44%",
                width: "70%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "6px",
                zIndex: 1,
              }}
              animate={{ rotate: isHovered ? -4 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          )}
          {/* mat1 anchored at top-right = center, extends to bottom-left */}
          {work.mat1 && (
            <motion.img
              src={work.mat1}
              alt=""
              className="absolute pointer-events-none"
              style={{
                right: "44%",
                top: "44%",
                width: "70%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "6px",
                zIndex: 2,
              }}
              animate={{ rotate: isHovered ? -4 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          )}
          {/* ── UW: fanned screenshots rising from the bottom ── */}
          {work.fanImages && (() => {
            // [zIndex, bottom, left, width, defaultRotate, hoverRotate]
            // All stacked identically; only bottom (elevation) differs at rest.
            // On hover: work1 scales up + lifts, others fan out.
            const cfg = [
              { z: 4, b: "0%",  hr: 0,   hScale: 1.07, hy: 0   }, // work1 front
              { z: 3, b: "9%",  hr: 13,  hScale: 1.05, hy: 0   }, // work2
              { z: 2, b: "18%", hr: -16, hScale: 1.05, hy: 0   }, // work3
              { z: 1, b: "27%", hr: 20,  hScale: 1.05, hy: 0   }, // work4
            ];
            return cfg.map((c, i) => (
              <motion.img
                key={i}
                src={work.fanImages![i]}
                alt=""
                className="absolute pointer-events-none"
                style={{
                  bottom: c.b,
                  left: "13%",
                  width: "74%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "6px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                  zIndex: c.z,
                  transformOrigin: "bottom center",
                }}
                animate={{
                  rotate: isHovered ? c.hr : 0,
                  scale: isHovered ? c.hScale : 1,
                  y: isHovered ? c.hy : 0,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            ));
          })()}
        </motion.div>

        {/* Title + subtitle — floats below card, above all siblings */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 right-0 pointer-events-none"
              style={{ top: "calc(100% + 1.25rem + 10px)", zIndex: 30, paddingLeft: "0.5rem" }}
            >
              <h3 className="font-display text-[2rem] text-foreground leading-snug">
                {work.title}
              </h3>
              <p className="font-mono text-sm text-muted mt-2">
                {work.subtitle}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-start">
      <div className="flex flex-col gap-4 md:flex-1">
        {col1.map((w, i) => card(w, i * 2))}
      </div>
      <div className="flex flex-col gap-4 md:flex-1">
        {col2.map((w, i) => card(w, i * 2 + 1))}
      </div>
    </div>
  );
}
