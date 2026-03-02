"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const meta = [
  { label: "Project",  value: "VTS Activate" },
  { label: "Role",     value: "Design Engineer" },
  { label: "Year",     value: "2024" },
  { label: "Type",     value: "Enterprise · Tenant Experience · Design Systems" },
];

export default function VTSCaseStudy() {
  const { scrollY } = useScroll();
  const marqX       = useTransform(scrollY, [0, 700], [0, -400]);
  const marqOpacity = useTransform(scrollY, [0, 300], [1, 0.04]);

  const marqRef = useRef<HTMLDivElement>(null);
  const [marqTop, setMarqTop] = useState(0);
  useEffect(() => {
    if (marqRef.current) {
      setMarqTop(marqRef.current.getBoundingClientRect().top + window.scrollY);
    }
  }, []);

  return (
    <main className="min-h-screen" style={{ "--muted": "var(--foreground)" } as React.CSSProperties}>

      {/* Back */}
      <div className="px-4 md:px-16 pt-16 md:pt-20 mb-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest group"
        >
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:-translate-x-0.5 transition-transform"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Work
        </Link>
      </div>

      {/* Hero scope — sticky marquee confined to this section */}
      <div>
      {/* Sticky marquee — top measured on mount so it never moves */}
      <div
        ref={marqRef}
        className="pointer-events-none"
        style={{ position: "sticky", top: marqTop, zIndex: 0 }}
      >
        <motion.div style={{ x: marqX, opacity: marqOpacity }} className="whitespace-nowrap">
          <span
            className="font-display select-none"
            style={{ fontSize: "clamp(64px,14vw,180px)", lineHeight: 1, color: "var(--accent-designed)", paddingLeft: "4vw" }}
          >
            VTS Activate&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VTS Activate&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VTS Activate
          </span>
        </motion.div>
      </div>

      {/* Two-col: sticky left summary + scrollable right gallery */}
      <div className="flex flex-col md:flex-row gap-0 px-4 md:px-16 pt-8" style={{ position: "relative" }}>

        {/* Left — sticky */}
        <div className="w-full md:w-[42%] shrink-0 md:sticky md:top-28 md:self-start pr-0 md:pr-14 mb-8 md:mb-0" style={{ height: "fit-content" }}>
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--accent-designed)" }}>
            Case Study
          </p>
          <h1 className="font-display text-[clamp(2.2rem,3.5vw,3.8rem)] leading-[1.05] text-foreground mb-6">
            Designing the world&apos;s largest tenant experience
          </h1>
          <p className="font-sans text-base text-muted leading-relaxed mb-10">
            VTS Activate is the tenant experience layer of the VTS platform —
            used by millions of occupants across commercial real estate globally.
            I joined as a Design Engineer to help scale the product&apos;s design
            system and ship new features end-to-end.
          </p>

          <div className="border-t border-border-subtle">
            {meta.map(({ label, value }) => (
              <div key={label} className="py-4 border-b border-border-subtle">
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-1">{label}</p>
                <p className="font-sans text-sm text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — gallery */}
        <div className="w-full md:flex-1 relative pb-8 md:pb-24">
          <div className="flex flex-col gap-5">
            {/* Animated gradient blob card */}
            <div
              className="w-full rounded-2xl overflow-hidden relative"
              style={{ background: "#d4844a", aspectRatio: "16/9" }}
            >
              <div className="absolute inset-0" style={{ overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: "-50%", background: "radial-gradient(ellipse 65% 55% at 22% 28%, #f0922a 0%, transparent 55%)", animation: "gradBlob1 6s ease-in-out infinite", filter: "blur(28px)" }} />
                <div style={{ position: "absolute", inset: "-50%", background: "radial-gradient(ellipse 70% 65% at 80% 18%, #a070d8 0%, transparent 52%)", animation: "gradBlob2 7s ease-in-out infinite", filter: "blur(24px)" }} />
                <div style={{ position: "absolute", inset: "-50%", background: "radial-gradient(ellipse 60% 50% at 12% 78%, #8855cc 0%, transparent 55%)", animation: "gradBlob3 8s ease-in-out infinite reverse", filter: "blur(32px)" }} />
                <div style={{ position: "absolute", inset: "-50%", background: "radial-gradient(ellipse 55% 45% at 55% 55%, #e8a0b0 0%, transparent 58%)", animation: "gradBlob1 5s ease-in-out infinite reverse", filter: "blur(36px)" }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/assets/vts/logo.png"
                  alt="VTS Activate"
                  style={{ width: "40%", height: "auto", filter: "invert(1)", mixBlendMode: "screen" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>{/* /hero scope */}

      {/* Content */}
      <div className="px-4 md:px-16 max-w-3xl mt-16 md:mt-24 pb-20 md:pb-32 space-y-12 md:space-y-20">

        <section>
          <h2 className="font-display text-3xl text-foreground mb-6">Overview</h2>
          <div className="space-y-4 font-sans text-base leading-relaxed text-muted">
            <p>
              VTS is the operating system for commercial real estate — used by
              the world&apos;s largest landlords, brokers, and tenants. Activate
              is the tenant-facing layer: a platform for building amenity
              bookings, visitor management, and community experiences within
              office buildings.
            </p>
            <p>
              My role sat at the intersection of design and engineering — I owned
              components end-to-end, from Figma specs through to production
              React code, working closely with PMs and the design system team.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl text-foreground mb-6">The Challenge</h2>
          <div className="space-y-4 font-sans text-base leading-relaxed text-muted">
            <p>
              At the scale VTS operates, design consistency isn&apos;t optional —
              it&apos;s a product requirement. With dozens of engineers across
              multiple squads, the design system needed to be both flexible
              enough to accommodate diverse building types and strict enough
              to stay coherent.
            </p>
            <p>
              The specific challenge I inherited: the existing component library
              had grown organically and was starting to fracture under the weight
              of one-off implementations. Features were shipping with subtle
              inconsistencies that compounded across the product.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl text-foreground mb-6">Approach</h2>
          <div className="space-y-4 font-sans text-base leading-relaxed text-muted">
            <p>
              I worked across the stack — auditing the existing component
              library, identifying patterns that could be extracted into shared
              primitives, and building new features using those primitives as a
              foundation. Each component I shipped came with Storybook documentation,
              accessibility annotations, and usage guidelines.
            </p>
            <p>
              On the design side, I used Magic Pattern and Figma to prototype
              interactions before implementation, and worked with the design
              team to validate that the component API matched design intent
              before any code was written.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl text-foreground mb-6">Outcome</h2>
          <div className="space-y-4 font-sans text-base leading-relaxed text-muted">
            <p>
              Shipped multiple features to production across the Activate
              platform, contributed to the design system used by the full
              engineering org, and helped establish patterns that reduced
              component duplication across squads.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
