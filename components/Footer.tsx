"use client";

import { useState } from "react";
import GradientRotatingText from "@/components/GradientRotatingText";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("saw.amman@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="px-8 md:px-16 pt-20 pb-16 border-t border-border-subtle">
      {/* Info row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 md:mb-16">
        <span className="font-mono text-xs text-muted tracking-widest uppercase">made in toronto</span>
        <div className="flex gap-6 md:gap-8">
          <button
            onClick={copyEmail}
            data-cursor-filled
            data-cursor-label="Copy Email"
            className="font-mono text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest"
          >
            {copied ? "copied!" : "email"}
          </button>
          <a
            href="https://linkedin.com/in/ammansaw"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest"
          >
            linkedin
          </a>
          <a
            href="https://github.com/ammanwaheed"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest"
          >
            github
          </a>
        </div>
      </div>

      {/* Big headline — period is inside the rotating component */}
      <h2 className="font-display leading-[1.05] text-foreground" style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}>
        Let&apos;s make something <GradientRotatingText />
      </h2>
    </footer>
  );
}
