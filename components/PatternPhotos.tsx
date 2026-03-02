"use client";

import { motion } from "framer-motion";

const SIZE = 150;

const photos = [
  { src: "/assets/about/pat1.jpg", rotate: -9,  x: 0,  y: 0,   delay: 0.1,  label: "Charpai Art"    },
  { src: "/assets/about/pat2.png", rotate:  6,  x: 32, y: 120, delay: 0.22, label: "Ajrak Pattern"   },
  { src: "/assets/about/pat3.png", rotate: -4,  x: 10, y: 240, delay: 0.36, label: "Persian Tiling"  },
];

export default function PatternPhotos() {
  return (
    <div className="relative shrink-0" style={{ width: 196, height: 400, isolation: "isolate" }}>
      {photos.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: p.x, top: p.y, zIndex: i + 1 }}
          initial={{ opacity: 0, y: -80, rotate: p.rotate + 24 }}
          animate={{ opacity: 1, y: 0,   rotate: p.rotate }}
          transition={{ delay: p.delay, type: "spring", stiffness: 150, damping: 14 }}
        >
          {/* data-cursor makes the custom cursor pick up the label */}
          <div
            data-cursor
            data-cursor-label={p.label}
            data-cursor-filled
            style={{ cursor: "none" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.label}
              style={{
                width: SIZE,
                height: SIZE,
                objectFit: "cover",
                borderRadius: 3,
                border: "3.5px solid rgba(240, 236, 224, 0.85)",
                boxShadow: "0 10px 32px rgba(0,0,0,0.6)",
                display: "block",
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
