"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SIZE = 192;

/* ── Video card — thumbnail + click-to-expand overlay ── */
function VideoCard({ src, label }: { src: string; label: string }) {
  const [expanded, setExpanded] = useState(false);
  const thumbRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!expanded) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setExpanded(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [expanded]);

  return (
    <div
      data-cursor
      data-cursor-label={label}
      data-cursor-filled
      style={{ position: "relative", cursor: "none" }}
      onClick={() => setExpanded(true)}
    >
      {/* Thumbnail */}
      <div style={{ width: SIZE, height: SIZE, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(240,236,224,0.08)" }}>
        <video
          ref={thumbRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => { if (thumbRef.current) thumbRef.current.playbackRate = 1.5; }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              background: "rgba(0, 0, 0, 0.88)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <motion.div
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{    scale: 0.82, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative" }}
            >
              <button
                onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
                aria-label="Close"
                style={{
                  position: "absolute", top: -44, right: 0,
                  background: "none", border: "none",
                  color: "rgba(240,236,224,0.6)", fontSize: 22,
                  cursor: "pointer", padding: "8px", lineHeight: 1,
                }}
              >
                ✕
              </button>
              <video
                src={src}
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={(e) => { (e.target as HTMLVideoElement).playbackRate = 1.5; }}
                style={{
                  width: "72vw",
                  maxWidth: 1000,
                  height: "auto",
                  borderRadius: 16,
                  boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
                  display: "block",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Image card ── */
function ImageCard({ src, label }: { src: string; label: string }) {
  return (
    <div
      data-cursor
      data-cursor-label={label}
      data-cursor-filled
      style={{
        width: SIZE,
        height: SIZE,
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(240,236,224,0.08)",
        cursor: "none",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
}

/* ── Grid ── */
const col1 = [
  { src: "/assets/about/ice.mp4",    type: "video" as const, label: "Puffins and Black Sands" },
  { src: "/assets/about/group.JPG",  type: "image" as const, label: "Adventuring!"            },
];
const col2 = [
  { src: "/assets/about/gotham.png",  type: "image" as const, label: "Night Pics"       },
  { src: "/assets/about/me.JPG",      type: "image" as const, label: "C'est moi!"       },
  { src: "/assets/about/origami.JPG", type: "image" as const, label: "Origami Origins"  },
];

export default function PhotoGrid() {
  return (
    <div className="hidden md:flex gap-3 sticky top-24">

      {/* Column 1: video + origami — centred against col 2's 3-item height */}
      <div className="flex flex-col gap-3 justify-center">
        {col1.map((item) =>
          item.type === "video"
            ? <VideoCard key={item.src} src={item.src} label={item.label} />
            : <ImageCard key={item.src} src={item.src} label={item.label} />
        )}
      </div>

      {/* Column 2: gotham / me / group — stacked from top */}
      <div className="flex flex-col gap-3">
        {col2.map((item) =>
          <ImageCard key={item.src} src={item.src} label={item.label} />
        )}
      </div>

    </div>
  );
}
