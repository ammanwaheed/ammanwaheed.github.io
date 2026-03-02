import WorksGrid from "@/components/WorksGrid";

const experience = [
  { year: "Present", company: "Vretta", href: "https://www.vretta.com/", role: "Full-Stack Developer", tech: "Python, React, AWS", current: true },
  { year: "2025", company: "PatientCompanion", href: "https://www.patientcompanion.ca/", role: "Product Engineer", tech: "React, Python, AWS", current: true},
  { year: "2025", company: "VTS", href: "https://www.vts.com/", role: "Design Engineer", tech: "React, TypeScript, Magic Pattern, Figma", current: true },
  { year: "2024", company: "Qamar Agency", href: "https://qamaragency.com/", role: "Founding Engineer Lead", tech: "ReactJS, React Native, NextJS", current: true },
  { year: "2023", company: "DistillerSR", href: "https://www.distillersr.com/products/distillersr-systematic-review-software", role: "Full-Stack Engineer", tech: "React, Python, FastAPI", current: true },
  { year: "2022", company: "Magnet Forensics", href: "https://www.magnetforensics.com/", role: "Data / Full-Stack Engineer", tech: "C#, .NET, Java, Python", current: true },
];

const works = [
  {
    title: "The Design Intelligence Platform",
    subtitle: "Cordage, Launched 2026",
    href: "/cordage",
    gradient: "#1a2744",
    image: "/assets/cordage/work.png",
    image2: "/assets/cordage/work2.png",
    cursorLabel: "View Case Study",
  },
  {
    title: "Designing the world's largest tenant experience",
    subtitle: "Shipped 2024",
    href: "https://www.vts.com/vts-activate",
    gradient: "#d4844a",
    logoImage: "/assets/vts/logo.png",
    cursorLabel: "View Project",
    aspectRatio: "16/9",
  },
  {
    title: "Designing the GTA business landscape",
    subtitle: "Qamar + Markaz, Shipped 2025",
    href: "https://qamaragency.com/#/work",
    gradient: "#033923",
    siteImage: "/assets/qamar/work.png",
    phoneImage: "/assets/qamar/markaz.png",
  },
  {
    title: "AI Research Literature Review Platform",
    subtitle: "DistillerSR AI, Shipped 2024",
    href: "https://www.distillersr.com/products/distillersrai",
    gradient: "#2c85e6",
    screenImage: "/assets/distillersr/work.png",
    chartImage: "/assets/distillersr/chart.gif",
  },
  {
    title: "Deskmat Design and Products",
    subtitle: "Kumori, Launched and Shipped 2021",
    href: "https://geekhack.org/index.php?topic=108913.0",
    gradient: "linear-gradient(135deg, #3a4a6b 0%, #6b4a7a 100%)",
    mat1: "/assets/kumori/mat1.png",
    mat2: "/assets/kumori/mat2.png",
    aspectRatio: "16/9",
  },
  {
    title: "Enhancing the student club experience.",
    subtitle: "UWaterloo Clubs, Shipped 2021-2025",
    href: "https://2024.hackthenorth.com/",
    gradient: "#FFED29",
    fanImages: [
      "/assets/uw/work1.png",
      "/assets/uw/work4.png",
      "/assets/uw/work2.png",
      "/assets/uw/work3.png",
    ],
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="px-8 md:px-16 pt-16 md:pt-[13vh] pb-20 md:pb-28">
        <div className="grid md:grid-cols-[3fr_2fr] gap-12 md:gap-24 items-start">
          {/* Left: headline */}
          <h1 className="font-display text-[clamp(2.8rem,5.2vw,5.5rem)] leading-[1.04] text-foreground">
            I&apos;m Amman, a product builder who{" "}
            <em style={{ color: "var(--accent-creative)" }}>designs</em>{" "}
            and{" "}
            <em style={{ color: "var(--accent-designed)" }}>engineers.</em> 
          </h1>

          {/* Right: experience table */}
          <div>
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-5">
              Experience
            </p>
            <div>
              {experience.map(({ year, company, href, role, tech, current }) => (
                <div
                  key={`${year}-${company}`}
                  className="flex items-start gap-6 py-3.5 border-b border-border-subtle last:border-0"
                >
                  <span className="font-mono text-xs text-muted w-10 shrink-0 pt-0.5">{year}</span>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-label="Visit"
                      data-cursor-filled
                      className="font-sans text-sm transition-colors hover:opacity-80"
                      style={{ color: current ? "var(--foreground)" : "var(--muted)" }}
                    >
                      {company}
                    </a>
                    <span className="font-mono text-[10px] text-muted opacity-60">{tech}</span>
                  </div>
                  {role && (
                    <span className="font-sans text-xs text-muted text-right hidden sm:block shrink-0 pt-0.5">
                      {role}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="px-8 md:px-16 pb-32">
        {/* Section header */}
        <div className="flex items-center justify-between pt-5 pb-10 border-t border-border-subtle">
          <h2 className="font-display text-2xl md:text-3xl text-foreground">Selected Work</h2>
        </div>

        <WorksGrid works={works} />
      </section>
    </main>
  );
}
