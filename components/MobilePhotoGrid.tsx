"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { src: "/assets/about/ice.mp4",     type: "video" as const, label: "Puffins and Black Sands" },
  { src: "/assets/about/group.JPG",   type: "image" as const, label: "Adventuring!"            },
  { src: "/assets/about/gotham.png",  type: "image" as const, label: "Night Pics"              },
  { src: "/assets/about/me.JPG",      type: "image" as const, label: "C'est moi!"              },
  { src: "/assets/about/origami.JPG", type: "image" as const, label: "Origami Origins"         },
];

function ExpandableVideo({ src }: { src: string }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setExpanded(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [expanded]);

  return (
    <>
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        onClick={() => setExpanded(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
      />
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setExpanded(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 999,
              background: "rgba(0,0,0,0.88)",
              display: "flex", alignItems: "center", justifyContent: "center",
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
                onClick={() => setExpanded(false)}
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
                style={{
                  width: "88vw",
                  maxWidth: 700,
                  height: "auto",
                  borderRadius: 12,
                  boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
                  display: "block",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function MobilePhotoGrid() {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8 md:hidden">
      {items.map((item) => (
        <div
          key={item.src}
          style={{
            width: "calc(50% - 6px)",
            aspectRatio: "1",
            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid rgba(240,236,224,0.08)",
          }}
        >
          {item.type === "video" ? (
            <ExpandableVideo src={item.src} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.src}
              alt={item.label}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
