"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ── Helpers ── */

function CaseImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%", background: "#0d1321", border: "1px solid rgba(62,92,118,0.2)" }}>
      <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
    </div>
  );
}

function CaseVideo({ src, alt }: { src: string; alt: string }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setExpanded(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [expanded]);

  return (
    <div
      style={{ width: "100%", background: "#0d1321", border: "1px solid rgba(62,92,118,0.2)", position: "relative", cursor: "none" }}
      onClick={() => setExpanded(true)}
      data-cursor-label="Watch"
      data-cursor-filled
    >
      <video src={src} autoPlay loop muted playsInline aria-label={alt} style={{ width: "100%", display: "block" }} />

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
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
              <video src={src} autoPlay loop muted playsInline
                style={{ width: "72vw", maxWidth: 1000, height: "auto", borderRadius: 12, boxShadow: "0 40px 100px rgba(0,0,0,0.7)", display: "block" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  return (
    <div style={{ background: "#0d1321", border: "1px solid rgba(62,92,118,0.4)", borderRadius: 10, overflow: "hidden" }}>
      {lang && (
        <div style={{ padding: "7px 16px", borderBottom: "1px solid rgba(62,92,118,0.3)" }}>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "#748cab", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {lang}
          </span>
        </div>
      )}
      <pre style={{ fontFamily: "var(--font-geist-mono)", fontSize: 12.5, color: "#f0ebd8", lineHeight: 1.8, padding: "20px 24px", margin: 0, overflowX: "auto", whiteSpace: "pre" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ── Data ── */

const pageMeta = [
  { label: "Role",     value: "Co-founder, Design & Engineering" },
  { label: "Timeline", value: "Dec 2025 – Feb 2026" },
  { label: "Team",     value: "1 AI Engineer, 1 Product Engineer" },
  { label: "Skills",   value: "Product Design · Frontend Engineering · User Research" },
];

const overviewRows = [
  { label: "Problem", value: "Creative professionals want to use AI generative models in their workflows, but existing tools are either too technical (raw APIs) or too limited (single-model, no composition)." },
  { label: "Solution", value: "A node-based canvas editor where any AI model can be connected to any other through typed ports, with a built-in AI assistant that constructs and modifies workflows in natural language." },
  { label: "Outcome",  value: "A full-stack collaborative platform with 40+ node types, real-time multi-user editing, AI-assisted workflow construction, and one-click publishing to shareable apps." },
];

const colorSystem = [
  { name: "Ink Black",       hex: "#0d1321", role: "Canvas background, darkest surface" },
  { name: "Deep Space Blue", hex: "#1d2d44", role: "Panel backgrounds, glassmorphic surfaces" },
  { name: "Blue Slate",      hex: "#3e5c76", role: "Interactive elements, borders, accent" },
  { name: "Dusty Denim",     hex: "#748cab", role: "Secondary text, muted labels" },
  { name: "Eggshell",        hex: "#f0ebd8", role: "Primary text, logo, selected states" },
];

const opsCode = `Client A moves a node
  → batch of ops sent to server
  → server assigns a sequential version number
  → op broadcast to all other clients on that canvas
  → Client B receives op, applies it locally`;

const snapshotCode = `Canvas state = base snapshot + ops since snapshot version
             ↓ (after 50 ops)
Canvas state = new snapshot + 0 pending ops`;

const pipelineCode = `User message
  → System prompt with full node catalog (types, ports, IO types)
  → LLM clarifies requirements if needed (model preference, style, format)
  → LLM generates a graph plan (nodes + edges as structured JSON)
  → Server validates the plan (type compatibility, required connections)
  → LLM presents plan to user for approval
  → On approval: server computes layout, creates nodes + edges via canvas ops`;

const proxyCode = `const nodeTypes = useMemo(() => {
  return new Proxy({} as Record<string, ComponentType<NodeProps>>, {
    get(_, type: string) {
      return nodeComponentRegistry[type] || GenericNode;
    },
  });
}, []);`;

const navSections = [
  { id: "overview",         label: "Overview" },
  { id: "design-problem",   label: "Design Problem" },
  { id: "design-language",  label: "Design Language" },
  { id: "canvas-nodes",     label: "Canvas & Nodes" },
  { id: "product-features", label: "Product Features" },
  { id: "technical",        label: "Technical Dives" },
  { id: "reflection",       label: "Reflection" },
];

/* ── Page ── */

export default function CordageCaseStudy() {
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

  const [activeSection, setActiveSection] = useState("overview");
  const [cardHovered, setCardHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-25% 0px -70% 0px", threshold: 0 }
    );
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="min-h-screen" style={{ "--muted": "var(--foreground)" } as React.CSSProperties}>

      {/* Back */}
      <div className="px-4 md:px-16 pt-16 md:pt-20 mb-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs hover:opacity-60 transition-opacity uppercase tracking-widest group"
          style={{ color: "rgba(240,236,224,0.45)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
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
            style={{ fontSize: "clamp(72px,17vw,220px)", lineHeight: 1, color: "var(--accent-scalable)", paddingLeft: "4vw" }}
          >
            Cordage&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cordage&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cordage
          </span>
        </motion.div>
      </div>

      {/* Two-col hero */}
      <div className="flex flex-col md:flex-row gap-0 px-4 md:px-16 pt-8" style={{ position: "relative" }}>

        {/* Left — sticky */}
        <div className="w-full md:w-[42%] shrink-0 md:sticky md:top-28 md:self-start pr-0 md:pr-14 mb-8 md:mb-0" style={{ height: "fit-content" }}>
          <p className="font-mono text-[10px] uppercase tracking-widest mb-5" style={{ color: "var(--accent-scalable)" }}>
            Case Study
          </p>
          <h1 className="font-display text-[clamp(1.9rem,3vw,3.2rem)] leading-[1.08] text-foreground mb-6">
            What if building AI workflows felt like designing, not programming?
          </h1>
          <p className="font-sans text-sm leading-relaxed mb-10" style={{ color: "rgba(240,236,224,0.65)" }}>
            Cordage is a node-based visual canvas where designers, filmmakers, and creative
            technologists wire together AI models into multi-step workflows — without touching
            code. I led product design and frontend engineering from the ground up.
          </p>

          <div className="border-t border-border-subtle">
            {pageMeta.map(({ label, value }) => (
              <div key={label} className="py-3.5 border-b border-border-subtle">
                <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: "rgba(240,236,224,0.45)" }}>{label}</p>
                <p className="font-sans text-sm text-foreground">{value}</p>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="mt-8">
            <a
              href="https://trycordage.com"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="Visit"
              data-cursor-filled
              className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest px-4 py-2.5 transition-opacity hover:opacity-70"
              style={{
                border: "1px solid rgba(240,236,224,0.2)",
                color: "var(--foreground)",
                cursor: "none",
              }}
            >
              trycordage.com
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7,7 17,7 17,17" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right — hero gallery */}
        <div className="w-full md:flex-1 relative pb-8 flex flex-col gap-3">
          {/* Work card — hover animation matches home page */}
          <div
            className="relative w-full overflow-hidden"
            style={{ background: "#1a2744", aspectRatio: "4/3" }}
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
          >
            <motion.img
              src="/assets/cordage/work.png"
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
              animate={{ x: cardHovered ? 18 : 0, rotate: cardHovered ? 4 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <motion.img
              src="/assets/cordage/work2.png"
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
              animate={{ x: cardHovered ? 10 : 0, rotate: cardHovered ? -3 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          {/* Canvas full-width */}
          <CaseImage src="/assets/cordage/canvas.png" alt="Cordage canvas with a running workflow" />

          {/* Two functionality videos side by side */}
          <div className="flex gap-3">
            <div className="flex-1">
              <CaseVideo src="/assets/cordage/node-types.mov" alt="Node type palette showing 40+ available node types" />
            </div>
            <div className="flex-1">
              <CaseVideo src="/assets/cordage/inspector-panel.mov" alt="Inspector panel open for configuring a node" />
            </div>
          </div>
        </div>
      </div>
      </div>{/* /hero scope */}

      {/* ── Body content: sticky nav + centered article ── */}
      <div className="px-4 md:px-16 mt-16 md:mt-28 pb-20 md:pb-40">
        <div className="flex gap-12 lg:gap-16 items-start">

          {/* Sticky section nav */}
          <div className="hidden lg:block w-40 shrink-0 sticky top-32 self-start">
            <nav className="space-y-0.5">
              {navSections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  data-no-cursor
                  className="block w-full text-left py-1.5 font-sans text-sm transition-all duration-200"
                  style={{
                    color:      activeSection === id ? "var(--foreground)" : "rgba(240,236,224,0.45)",
                    fontWeight: activeSection === id ? 600 : 400,
                    cursor: "none",
                  }}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Article */}
          <div className="flex-1 min-w-0">

            {/* ── Overview ── */}
            <section id="overview" className="mb-24" style={{ scrollMarginTop: "7rem" }}>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-5" style={{ color: "var(--accent-scalable)" }}>
                Overview
              </p>
              <div style={{ border: "1px solid rgba(240,236,224,0.1)", borderRadius: 12, overflow: "hidden", maxWidth: 700 }}>
                {overviewRows.map(({ label, value }, i) => (
                  <div key={label} className="flex flex-col md:flex-row gap-2 md:gap-8 px-4 md:px-6 py-4 md:py-5" style={{ borderBottom: i < 2 ? "1px solid rgba(240,236,224,0.07)" : "none", background: i % 2 === 0 ? "rgba(240,236,224,0.02)" : "transparent" }}>
                    <div className="shrink-0" style={{ width: 76 }}>
                      <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--accent-scalable)" }}>{label}</span>
                    </div>
                    <p className="font-sans text-sm text-foreground leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Design Problem ── */}
            <section id="design-problem" className="mb-24" style={{ scrollMarginTop: "7rem", maxWidth: 700 }}>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: "var(--accent-designed)" }}>Design Problem</p>
              <h2 className="font-display text-[2rem] text-foreground leading-[1.15] mb-6">Making Power Feel Approachable</h2>
              <div className="space-y-4 font-sans text-[15px] text-foreground leading-relaxed">
                <p>Node-based tools have a reputation for being intimidating. Tools like Blender&apos;s shader editor or Unreal&apos;s Blueprints are powerful, but their visual density can feel hostile to newcomers. Cordage&apos;s users aren&apos;t developers — they&apos;re visual creators who think in terms of images, video, and narrative.</p>
                <p>The design had to accomplish two things that normally pull in opposite directions:</p>
                <div className="space-y-2 pl-1">
                  {[["Professional and precise","like a tool worthy of serious work"],["Visually calm","so a complex 20-node workflow doesn't feel overwhelming"]].map(([strong,rest])=>(
                    <div key={strong} className="flex gap-3"><span style={{color:"var(--accent-designed)"}}>—</span><p><strong className="text-foreground font-medium">{strong}</strong>{" — "}{rest}</p></div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Design Language ── */}
            <section id="design-language" className="mb-24" style={{ scrollMarginTop: "7rem" }}>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-10" style={{ color: "var(--accent-designed)" }}>Design Language & Branding</p>

              {/* Color System */}
              <div className="mb-14">
                <h3 className="font-sans text-base font-semibold text-foreground mb-2">Color System</h3>
                <p className="font-sans text-[15px] text-foreground leading-relaxed mb-6" style={{ maxWidth: 700 }}>
                  The entire UI is built around a 5-color palette derived from a single metaphor: a <em>blueprint under artificial light</em>. Deep navy backgrounds evoke technical drawings; warm eggshell text creates contrast without harshness.
                </p>
                <div style={{ border: "1px solid rgba(240,236,224,0.1)", borderRadius: 10, overflow: "hidden", marginBottom: 24 }}>
                  <div className="flex items-center gap-4 px-5 py-3" style={{ borderBottom: "1px solid rgba(240,236,224,0.08)", background: "rgba(240,236,224,0.03)" }}>
                    <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(240,236,224,0.45)", width: 140 }}>Name</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(240,236,224,0.45)", width: 76 }}>Hex</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(240,236,224,0.45)" }}>Role</div>
                  </div>
                  {colorSystem.map(({ name, hex, role }, i) => (
                    <div key={hex} className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: i < 4 ? "1px solid rgba(240,236,224,0.06)" : "none" }}>
                      <div className="flex items-center gap-2.5 shrink-0" style={{ width: 140 }}>
                        <div style={{ width: 11, height: 11, borderRadius: 3, background: hex, flexShrink: 0 }} />
                        <span className="font-sans text-sm text-foreground">{name}</span>
                      </div>
                      <div className="shrink-0" style={{ width: 76 }}><code className="font-mono text-[11px]" style={{ color: "#748cab" }}>{hex}</code></div>
                      <p className="font-sans text-sm text-foreground">{role}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="flex-1">
                    <CaseImage src="/assets/cordage/hovered-node.png" alt="Hovered node showing eggshell highlight and blue slate handles" />
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[13px] text-foreground leading-relaxed">
                      The eggshell color does the most design work — appearing on node handles, selected borders, button hover states, and the logo. Semantic colors extend the system: olive green for running states, muted gold for warnings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="mb-14">
                <h3 className="font-sans text-base font-semibold text-foreground mb-6">Typography</h3>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="flex-1">
                    <CaseImage src="/assets/cordage/toolbar-focus.png" alt="Canvas toolbar showing typography hierarchy — title, run controls, and labels" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <p className="font-sans text-[15px] text-foreground leading-relaxed">
                      A single typeface — <strong className="text-foreground font-medium">Urbanist</strong> — handles all text across the product. Geometric sans-serif, optically balanced at both large and small sizes, with enough personality to feel designed without being decorative.
                    </p>
                    <div className="space-y-2 pl-4" style={{ borderLeft: "2px solid rgba(240,236,224,0.1)" }}>
                      {[["Node labels","11px / weight 300 / +0.02em tracking — barely-there floating text"],["UI controls","14px / weight 600 — crisp and actionable"],["Canvas header","weight 700 / −0.02em tracking — tight and confident"]].map(([ctx,spec])=>(
                        <p key={ctx} className="font-sans text-sm text-foreground"><span className="text-foreground">{ctx}:</span>{" "}<code className="font-mono text-[11px]" style={{color:"#748cab"}}>{spec}</code></p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Glassmorphism */}
              <div>
                <h3 className="font-sans text-base font-semibold text-foreground mb-2">Glassmorphism: Structure Through Material</h3>
                <p className="font-sans text-[15px] text-foreground leading-relaxed mb-5" style={{ maxWidth: 700 }}>
                  The visual language is built on glassmorphism — panels that feel like frosted glass floating above the canvas. Every surface is defined by three CSS properties:
                </p>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="flex-1">
                    <CaseImage src="/assets/cordage/settings.png" alt="Settings panel showing glassmorphic surface over the canvas background" />
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[15px] text-foreground leading-relaxed">
                      This creates visual depth without relying on solid colors. The strength of the blur increases with elevation: tooltips use a stronger blur than floating toolbars, which use a stronger blur than panel backgrounds — giving the UI a physically intuitive depth model.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Canvas & Node System ── */}
            <section id="canvas-nodes" className="mb-24" style={{ scrollMarginTop: "7rem" }}>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-10" style={{ color: "var(--accent-creative)" }}>Canvas & Node System</p>

              <div className="mb-16">
                <h3 className="font-sans text-base font-semibold text-foreground mb-2">The Node Design</h3>
                <p className="font-sans text-[15px] text-foreground leading-relaxed mb-5" style={{ maxWidth: 700 }}>
                  40+ node types need to feel like a coherent family while being visually distinct enough to scan at a glance. Each node shares a base structure — dark glass card with colored header, input handles left, output handles right — but category is communicated through header color and icon:
                </p>
                <div className="space-y-2 mb-7" style={{ maxWidth: 700 }}>
                  {[["Model nodes","run AI models (image generation, audio, video)"],["Input nodes","inject media or text into the graph"],["Tool nodes","non-AI processing (crop, resize, blur, export)"],["Flow control","conditional branching, iteration, joining parallel paths"],["Interface nodes","user-facing inputs/outputs for published apps"]].map(([name,desc])=>(
                    <div key={name} className="flex gap-3"><span style={{color:"var(--accent-creative)"}}>—</span><p className="font-sans text-[15px] text-foreground"><strong className="text-foreground font-medium">{name}</strong> — {desc}</p></div>
                  ))}
                </div>
                <p className="font-sans text-[15px] text-foreground leading-relaxed mb-3" style={{ maxWidth: 700 }}>Node states are communicated entirely through subtle visual changes — no text banners, no modals:</p>
                <div className="space-y-1.5 mb-8 pl-4" style={{ borderLeft: "2px solid rgba(240,236,224,0.1)", maxWidth: 700 }}>
                  {[["Idle","muted shadow, transparent border"],["Hovered","node lifts slightly (translateY(-1px)), shadow deepens"],["Selected","1px eggshell border appears, stronger glow"],["Running","animated pulsing indicator"],["Batched","purple tinted border glow"]].map(([state,desc])=>(
                    <p key={state} className="font-sans text-sm text-foreground"><code className="font-mono text-[11px] mr-2" style={{color:"#748cab"}}>{state}</code>{desc}</p>
                  ))}
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <CaseVideo src="/assets/cordage/node-types.mov" alt="Canvas showing a variety of node types — model, input, and tool nodes with colored headers" />
                  </div>
                  <div className="flex-1">
                    <CaseVideo src="/assets/cordage/node-running.mov" alt="A node in running state with its animated pulsing status indicator" />
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <h3 className="font-sans text-base font-semibold text-foreground mb-6">Edges & Connection</h3>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="flex-1">
                    <CaseImage src="/assets/cordage/incompatible-node-path.png" alt="Edge connection showing an incompatible node path highlighted in red" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <p className="font-sans text-[15px] text-foreground leading-relaxed">Edges are designed to be nearly invisible unless needed — at rest, 1px strokes at ~12% opacity of eggshell. On hover they brighten and gain a drop shadow. When a workflow is running, edges animate with a traveling dash to show data flow direction.</p>
                    <p className="font-sans text-[15px] text-foreground leading-relaxed">Connection handles are 8×8px squares with slightly rounded corners. On hover they scale to 12×12px. When dragging a new connection, valid targets glow green; invalid targets turn red with a ✕ indicator. No text, no popup — just immediate spatial feedback.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-sans text-base font-semibold text-foreground mb-6">The Floating Controls Bar</h3>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="flex-1">
                    <CaseVideo src="/assets/cordage/bottom-tooltip.mov" alt="The floating controls bar at the bottom of the canvas with pan, undo/redo, auto-format, and save buttons" />
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[15px] text-foreground leading-relaxed">Controls for pan/hand mode, undo/redo, zoom, commenting, and saving live in a compact bar anchored to the <em>bottom center of the canvas</em> — out of the peripheral reading zones. Every button has micro-states: active fill, 40% opacity when disabled, and the save button shifts to an eggshell-highlighted border when there are unsaved changes.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Product Features ── */}
            <section id="product-features" className="mb-24" style={{ scrollMarginTop: "7rem" }}>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-10" style={{ color: "var(--accent-driven)" }}>Product Features</p>

              <div className="mb-16">
                <h3 className="font-sans text-base font-semibold text-foreground mb-6">Workflow Execution with Live Node Status</h3>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="flex-1">
                    <CaseImage src="/assets/cordage/canvas.png" alt="Canvas mid-run showing nodes in various states — running, completed, and pending" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <p className="font-sans text-[15px] text-foreground leading-relaxed">When a user hits <strong className="text-foreground font-medium">Run</strong>, the canvas becomes a live status display. The execution model is topologically sorted on the server: entry nodes run first, and each downstream node only starts when all upstream dependencies complete.</p>
                    <p className="font-sans text-[15px] text-foreground leading-relaxed">Parallel branches execute concurrently — you draw the graph, and parallelism comes for free from its structure. Status updates broadcast through Supabase Realtime; two people watching the same canvas both see nodes light up in sequence together.</p>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <h3 className="font-sans text-base font-semibold text-foreground mb-6">Inspector Panel & Node Configuration</h3>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="flex-1">
                    <CaseVideo src="/assets/cordage/inspector-panel.mov" alt="Inspector panel open for a model node showing prompt input, model settings, and parameter controls" />
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[15px] text-foreground leading-relaxed">Every node has a configuration panel accessible via the settings icon in its header. The inspector slides in as a right-side sheet, revealing parameters specific to that node type — model settings, prompt fields, style selectors, format options. All form controls maintain the glassmorphism visual language.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-sans text-base font-semibold text-foreground mb-6">Dashboard & Templates</h3>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="flex-1 flex flex-col gap-3">
                    <CaseImage src="/assets/cordage/dashboard.png" alt="Dashboard showing canvas cards on the blueprint grid background with atmospheric gradient lighting" />
                    <CaseImage src="/assets/cordage/templates-marketplace.png" alt="Templates marketplace showing pre-built workflow templates organized by category" />
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[15px] text-foreground leading-relaxed">The dashboard is built on a <strong className="text-foreground font-medium">blueprint grid</strong> background — a deliberate reference to architectural drawings, reinforcing the metaphor of planning and constructing. The grid uses layered radial gradients for atmospheric depth so the blueprint aesthetic reads as atmospheric rather than literal.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Technical Deep Dives ── */}
            <section id="technical" className="mb-24" style={{ scrollMarginTop: "7rem" }}>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-10" style={{ color: "var(--accent-creative)" }}>Technical Deep Dives</p>

              {/* 01 — Collaboration */}
              <div className="mb-20">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-[10px] shrink-0" style={{ color: "var(--accent-creative)" }}>01</span>
                  <h3 className="font-sans text-base font-semibold text-foreground">Real-Time Collaboration via Operational Transforms</h3>
                </div>
                <div style={{ maxWidth: 700 }}>
                  <p className="font-sans text-[15px] text-foreground leading-relaxed mb-4">Building collaborative editing — where multiple people can simultaneously edit the same canvas without conflicts — is one of the harder engineering problems in any canvas tool. We implemented an <strong className="text-foreground font-medium">ops-based synchronization system</strong> inspired by operational transform principles.</p>
                  <p className="font-sans text-[15px] text-foreground leading-relaxed mb-4">Rather than syncing the entire canvas state on every change, every edit is represented as a typed operation — {["MOVE_NODE","ADD_NODE","DELETE_NODE","ADD_EDGE","UPDATE_NODE_DATA"].map((op,i,arr)=>(<span key={op}><code className="font-mono text-[11px]" style={{color:"#748cab"}}>{op}</code>{i<arr.length-1?", ":""}</span>))}. Ops are sent in batches, stored in an ordered log, and broadcast to other connected clients.</p>
                  <div className="mb-5"><CodeBlock code={opsCode} /></div>
                  <p className="font-sans text-[15px] text-foreground leading-relaxed mb-4">Every op receives a monotonically increasing version number. Even if two clients send operations simultaneously, the server serializes them with unambiguous ordering.</p>
                  <p className="font-sans text-[14px] font-semibold text-foreground mb-3">The snapshot compaction system</p>
                  <p className="font-sans text-[15px] text-foreground leading-relaxed mb-4">Once the ops log exceeds 50 ops, the server applies all outstanding ops to the base snapshot, saves the resulting graph state, and deletes the compacted ops. Clients joining mid-session fetch the current snapshot + any ops since that version — keeping initial load fast.</p>
                  <div className="mb-8"><CodeBlock code={snapshotCode} /></div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="flex-1">
                    <CaseVideo src="/assets/cordage/auto-format-canvas.mov" alt="Auto-format canvas feature reorganizing a complex workflow into a clean layout" />
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[15px] text-foreground leading-relaxed">This architecture means the ops log stays small and fast to query, while the full edit history is preserved in periodic snapshots — a good trade-off for a canvas product where micro-edits (node drags, parameter tweaks) happen constantly.</p>
                  </div>
                </div>
              </div>

              {/* 02 — Corgbot */}
              <div className="mb-20">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-[10px] shrink-0" style={{ color: "var(--accent-creative)" }}>02</span>
                  <h3 className="font-sans text-base font-semibold text-foreground">Corgbot — The AI Workflow Construction Agent</h3>
                </div>
                <div style={{ maxWidth: 700 }}>
                  <p className="font-sans text-[15px] text-foreground leading-relaxed mb-4">Corgbot is the built-in AI assistant in the right sidebar. In Build Mode, it can <strong className="text-foreground font-medium">construct, validate, and place entire node graphs</strong> on the canvas in response to natural language requests.</p>
                  <p className="font-sans text-[15px] text-foreground leading-relaxed mb-4">The challenge: bridging the gap between what a user says (&ldquo;create a workflow that takes a photo and makes it look like an oil painting&rdquo;) and what the canvas needs — specific node types, correct port connections, valid data type compatibility, reasonable spatial layout.</p>
                  <div className="mb-5"><CodeBlock code={pipelineCode} /></div>
                  <p className="font-sans text-[15px] text-foreground leading-relaxed mb-8">The node catalog is generated dynamically from the same registry that powers the canvas itself. When the LLM proposes a connection, the validator checks output-type vs input-type compatibility. Layout is computed server-side using a Sugiyama-style algorithm that positions nodes in clean left-to-right columns.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <CaseVideo src="/assets/cordage/corgbot.mov" alt="Corgbot panel open with an active conversation showing a graph construction request and approve/reject buttons" />
                  </div>
                  <div className="flex-1">
                    <CaseVideo src="/assets/cordage/node-running.mov" alt="The resulting workflow executing on the canvas after Corgbot places the nodes" />
                  </div>
                </div>
              </div>

              {/* 03 — Proxy */}
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-[10px] shrink-0" style={{ color: "var(--accent-creative)" }}>03</span>
                  <h3 className="font-sans text-base font-semibold text-foreground">The Proxy-Based Node Type System</h3>
                </div>
                <div style={{ maxWidth: 700 }}>
                  <p className="font-sans text-[15px] text-foreground leading-relaxed mb-4">A naive implementation of 40+ node types would require a large static import list and a manual switch statement. We solved this with a <strong className="text-foreground font-medium">JavaScript Proxy</strong> pattern for the ReactFlow <code className="font-mono text-[11px]" style={{color:"#748cab"}}>nodeTypes</code> registry:</p>
                  <div className="mb-8"><CodeBlock code={proxyCode} lang="typescript" /></div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="flex-1">
                    <CaseVideo src="/assets/cordage/toolbar-palette.mov" alt="Node palette showing the searchable list of available node types grouped by category" />
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[15px] text-foreground leading-relaxed mb-4">The Proxy intercepts any property access and returns the matching component — or falls back to a <code className="font-mono text-[11px]" style={{color:"#748cab"}}>GenericNode</code> if the type isn&apos;t recognized.</p>
                    <div className="space-y-2">
                      {[["Zero-configuration registration","adding a new node type means adding it to the registry — nothing else changes"],["Safe degradation","unknown node types render as a generic placeholder rather than crashing"],["Stable reference","useMemo with no dependencies prevents unnecessary remounts of all nodes"]].map(([title,desc])=>(
                        <div key={title} className="flex gap-3"><span style={{color:"var(--accent-creative)"}}>—</span><p className="font-sans text-[14px] text-foreground"><strong className="text-foreground font-medium">{title}</strong>: {desc}</p></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Reflection ── */}
            <section id="reflection" className="mb-20" style={{ scrollMarginTop: "7rem", maxWidth: 700 }}>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-5" style={{ color: "rgba(240,236,224,0.45)" }}>Reflection</p>
              <h2 className="font-display text-[2rem] text-foreground leading-[1.15] mb-6">Design and engineering as the same problem</h2>
              <p className="font-sans text-[15px] text-foreground leading-relaxed mb-5">Cordage pushed me to think about design and engineering as inseparable. The glassmorphism system wasn&apos;t just an aesthetic choice — it was a spatial language that helped users understand what was in front of what. The ops-based collaboration system wasn&apos;t just a technical requirement — the version model directly shaped how we designed the save indicator and history panel.</p>
              <p className="font-sans text-[14px] font-semibold text-foreground mb-4">A few things I&apos;d approach differently with more time:</p>
              <div className="space-y-3 mb-10">
                {[["Mobile / touch input","the canvas interaction model assumes mouse precision; a touch-adapted layout would unlock a much wider audience"],["Onboarding path","new users arriving at an empty canvas face a cold-start problem — templates and guided first-run experiences would close this gap"],["Edge readability at scale","as workflows grow beyond ~20 nodes, edge routing becomes visually cluttered; a smarter routing algorithm (or explicit edge grouping) would help"]].map(([title,desc])=>(
                  <div key={title} className="flex gap-3"><span style={{color:"rgba(240,236,224,0.45)"}}>—</span><p className="font-sans text-[15px] text-foreground"><strong className="text-foreground font-medium">{title}</strong>: {desc}</p></div>
                ))}
              </div>
              <div style={{ background: "rgba(240,236,224,0.03)", border: "1px solid rgba(240,236,224,0.08)", borderLeft: "3px solid var(--accent-scalable)", borderRadius: "0 8px 8px 0", padding: "18px 22px" }}>
                <p className="font-sans text-[15px] text-foreground leading-relaxed italic">&ldquo;Constraint breeds clarity. Limiting ourselves to a single typeface, a 5-color palette, and a single glassmorphic surface material made every decision easier. When you know the materials, you can focus on the craft.&rdquo;</p>
              </div>
            </section>

            {/* Footer link */}
            <div className="pt-8 border-t border-border-subtle">
              <a href="https://trycordage.com" target="_blank" rel="noopener noreferrer" data-cursor data-cursor-label="Visit" data-cursor-filled className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:opacity-60 transition-opacity" style={{ color: "rgba(240,236,224,0.45)", cursor: "none" }}>
                trycordage.com
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7,7 17,7 17,17" /></svg>
              </a>
            </div>

          </div>{/* /article */}
        </div>{/* /flex */}
      </div>{/* /content */}
    </main>
  );
}
