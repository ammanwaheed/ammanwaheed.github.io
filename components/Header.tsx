"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Work",    href: "/#work",    smooth: "work"    },
  { label: "About",   href: "/about"                       },
  { label: "Contact", href: "/#contact", smooth: "contact" },
  { label: "Resume",  href: "/assets/Amman_Waheed_Resume.pdf", external: true },
];

export default function Header() {
  const [githubHovered, setGithubHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      <header
        className="w-full px-5 md:px-8 py-4 md:py-5 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(240,236,224,0.06)" }}
      >
        {/* Left */}
        <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-4">
          <Link
            href="/"
            className="font-sans font-bold text-sm uppercase tracking-tight text-foreground hover:text-muted transition-colors"
          >
            Amman Waheed
          </Link>
          <span className="font-sans text-xs text-muted uppercase tracking-widest font-normal">
            Software / Design Engineer
          </span>
        </div>

        {/* Center nav — desktop only */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="/#work" className="font-sans text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest"
            onClick={(e) => { const el = document.getElementById("work"); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); } }}>
            Work
          </a>
          <Link href="/about" className="font-sans text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest">
            About
          </Link>
          <a href="/#contact" className="font-sans text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest"
            onClick={(e) => { const el = document.getElementById("contact"); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); } }}>
            Contact
          </a>
          <a href="/assets/Amman_Waheed_Resume.pdf" target="_blank" rel="noopener noreferrer"
            className="font-sans text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest">
            Resume
          </a>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            className="flex md:hidden flex-col justify-center items-center gap-[5px] w-8 h-8"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "block", width: 20, height: 1.5, background: "var(--foreground)", borderRadius: 2, transformOrigin: "center" }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              style={{ display: "block", width: 20, height: 1.5, background: "var(--foreground)", borderRadius: 2 }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "block", width: 20, height: 1.5, background: "var(--foreground)", borderRadius: 2, transformOrigin: "center" }}
            />
          </button>

          <span className="hidden md:inline" style={{ color: "var(--accent-designed)", fontSize: "10px" }}>◆</span>

          <div
            className="hidden md:block relative"
            onMouseEnter={() => setGithubHovered(true)}
            onMouseLeave={() => setGithubHovered(false)}
          >
            <a
              href="https://github.com/ammanwaheed"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              ammanwaheed
            </a>

            <AnimatePresence>
              {githubHovered && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0,  scale: 1 }}
                  exit={{    opacity: 0, y: -4, scale: 0.94 }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                  className="absolute top-full mt-2 right-0 flex items-center gap-1.5 pointer-events-none"
                  style={{
                    background: "var(--foreground)", color: "var(--background)",
                    borderRadius: 999, padding: "5px 12px",
                    fontSize: 11, fontFamily: "var(--font-geist-mono)",
                    whiteSpace: "nowrap", zIndex: 50, fontWeight: 500,
                  }}
                >
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  visit github
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 right-0 z-50 flex flex-col px-5 py-5 gap-5"
            style={{
              background: "var(--background)",
              borderBottom: "1px solid rgba(240,236,224,0.08)",
            }}
          >
            {navLinks.map((link) => {
              const cls = "font-sans text-sm text-muted hover:text-foreground transition-colors uppercase tracking-widest";
              if (link.smooth) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={cls}
                    onClick={(e) => {
                      const el = document.getElementById(link.smooth!);
                      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); }
                      setMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </a>
                );
              }
              if (link.external) {
                return (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                    className={cls} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                );
              }
              return (
                <Link key={link.label} href={link.href} className={cls} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
