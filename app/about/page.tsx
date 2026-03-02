import type { Metadata } from "next";
import PatternPhotos from "@/components/PatternPhotos";
import PhotoGrid from "@/components/PhotoGrid";
import MobilePhotoGrid from "@/components/MobilePhotoGrid";

export const metadata: Metadata = {
  title: "About — Amman Waheed",
  description: "A little about who I am, what I do, and how I think.",
};

const bullets = [
  "leading development and creative teams",
  "fantisizing over culture and art, and snapping cool drone shots",
  "hunting down the best munch and mango lassi in every city I visit",
  "sending shuttlecocks to the moon",
];


export default function About() {
  return (
    <main className="min-h-screen px-8 md:px-16 pt-24 pb-32">
      <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">

        {/* Left: headline + text + photos */}
        <div>
          {/* Headline — short and fun */}
          <h1 className="font-display text-[clamp(2.4rem,4.5vw,5rem)] leading-[1.06] text-foreground mb-10">
            I&apos;m an engineer, builder,{" "}
            <em style={{ color: "var(--accent-creative)" }}>&amp;</em>{" "}
            creative, always curious, occasionally obsessed.
          </h1>

          {/* Inner flex: text left | pattern photos right */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-40 items-start">

            {/* Text column */}
            <div className="max-w-xs">
              <div className="space-y-4 font-sans text-base leading-relaxed text-muted">
                <p>
                  I studied computer science at the University of Waterloo and specialized in
                  Human-Computer Interaction, basically, I took the most interesting parts of CS
                  and made them about people.
                </p>
                <p>Outside of screens and sketchbooks, I&apos;m:</p>
              </div>

              <ul className="mt-3 space-y-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span
                      className="shrink-0"
                      style={{ color: "var(--accent-designed)", fontSize: 8, marginTop: 7 }}
                    >
                      ◆
                    </span>
                    <span className="font-sans text-base leading-relaxed text-muted">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Contact line */}
              <p className="font-sans text-base leading-relaxed text-muted mt-6">
                To work together or just say hi, reach out on{" "}
                <a
                  href="https://linkedin.com/in/ammansaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:opacity-70"
                  style={{ borderBottom: "1px dotted rgba(240,236,224,0.6)", paddingBottom: 1 }}
                >
                  LinkedIn
                </a>{" "}
                or{" "}
                <a
                  href="mailto:saw.amman@gmail.com"
                  className="text-foreground transition-colors hover:opacity-70"
                  style={{ borderBottom: "1px dotted rgba(240,236,224,0.6)", paddingBottom: 1 }}
                >
                  email
                </a>{" "}
                — I&apos;d love to meet you!
              </p>

              {/* Gif + quip */}
              <div className="flex items-end gap-3 mt-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/about/DbTXS3b.gif"
                  alt="pixel art mug"
                  style={{ width: 64, imageRendering: "pixelated" }}
                />
                <span
                  className="font-mono text-xs pb-1"
                  style={{ color: "var(--muted)", opacity: 0.55 }}
                >
                  not chai, hot cocoa all the way!
                </span>
              </div>

              {/* Mobile photo grid — 2 per row, centered */}
              <MobilePhotoGrid />
            </div>

            {/* Pattern prints — cascading column, artistic */}
            <div className="hidden md:block">
              <PatternPhotos />
            </div>
          </div>
        </div>

        <PhotoGrid />

      </div>
    </main>
  );
}
