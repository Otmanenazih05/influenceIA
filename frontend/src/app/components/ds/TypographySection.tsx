import { SectionHeader, SubSection } from "./DSLayout";

const typeScale = [
  { name: "Hero Title",     tag: "Poppins 700", size: "4rem",      lh: "1.1",  ls: "-0.04em", usage: "Landing page hero headline",       sample: "Connect Brands with Real Creators" },
  { name: "Display",        tag: "Poppins 700", size: "3rem",      lh: "1.15", ls: "-0.03em", usage: "Section hero titles",               sample: "Your Campaign Dashboard" },
  { name: "Page Title",     tag: "Poppins 600", size: "2rem",      lh: "1.2",  ls: "-0.025em",usage: "Page headings (H1)",                sample: "Influencer Marketplace" },
  { name: "Section Title",  tag: "Poppins 600", size: "1.5rem",    lh: "1.3",  ls: "-0.015em",usage: "Section headings (H2)",             sample: "Top Performing Campaigns" },
  { name: "Card Title",     tag: "Poppins 600", size: "1.125rem",  lh: "1.4",  ls: "-0.01em", usage: "Card headers, module titles (H3)", sample: "Lancement Produit" },
  { name: "Body Large",     tag: "Inter 400",   size: "1.0625rem", lh: "1.65", ls: "0",       usage: "Lead paragraphs, onboarding copy",  sample: "La plateforme IA qui connecte les marques aux nano et micro-influenceurs." },
  { name: "Body",           tag: "Inter 400",   size: "0.9375rem", lh: "1.6",  ls: "0",       usage: "Default body copy",                 sample: "Manage your influencer campaigns, track performance, and measure ROI in real time." },
  { name: "Body Small",     tag: "Inter 400",   size: "0.8125rem", lh: "1.55", ls: "0",       usage: "Supporting copy, descriptions",     sample: "Your campaign has reached 89% of its target audience this month." },
  { name: "Label",          tag: "Inter 500",   size: "0.875rem",  lh: "1.5",  ls: "0",       usage: "Form labels, table column headers", sample: "Campaign Name" },
  { name: "Helper Text",    tag: "Inter 400",   size: "0.75rem",   lh: "1.5",  ls: "0",       usage: "Form hints, character counts",      sample: "Must be at least 8 characters." },
  { name: "Badge / Chip",   tag: "Inter 600",   size: "0.6875rem", lh: "1",    ls: "0.04em",  usage: "Status pills, labels, tags",        sample: "TOP CREATOR" },
  { name: "Table Text",     tag: "Inter 400",   size: "0.8125rem", lh: "1.5",  ls: "0",       usage: "Table rows, data cells",            sample: "Sarah Benjelloun · 98K abonnés" },
  { name: "Caption",        tag: "Inter 400",   size: "0.6875rem", lh: "1.4",  ls: "0",       usage: "Timestamps, metadata, captions",    sample: "Updated 2 hours ago" },
];

export function TypographySection() {
  return (
    <div>
      <SectionHeader
        title="Typography Scale"
        description="Two-font system: Poppins for headings (authority, brand presence) and Inter for body/UI (legibility, neutrality)."
      />

      <SubSection title="Type Scale Reference">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {typeScale.map((t, i) => {
            const isPoppins = t.tag.startsWith("Poppins");
            return (
              <div
                key={t.name}
                className={`border-b border-border last:border-0 px-5 py-5 flex flex-col gap-1 ${i % 2 === 0 ? "" : "bg-muted/20"}`}
              >
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span
                    className="text-muted-foreground flex-shrink-0"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600, width: "9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    {t.name}
                  </span>
                  <div className="flex gap-2 flex-shrink-0">
                    <span
                      className="px-1.5 py-0.5 rounded text-muted-foreground bg-muted"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 500 }}
                    >
                      {t.tag}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded text-muted-foreground bg-muted"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem" }}
                    >
                      {t.size}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded text-muted-foreground bg-muted hidden sm:inline"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem" }}
                    >
                      lh {t.lh}
                    </span>
                  </div>
                </div>
                <p
                  className="text-foreground mt-1"
                  style={{
                    fontFamily: isPoppins ? "'Poppins', sans-serif" : "'Inter', sans-serif",
                    fontSize: t.size,
                    lineHeight: t.lh,
                    letterSpacing: t.ls,
                    fontWeight: t.tag.includes("700") ? 700 : t.tag.includes("600") ? 600 : t.tag.includes("500") ? 500 : 400,
                    maxWidth: "46ch",
                  }}
                >
                  {t.sample}
                </p>
                <p
                  className="text-muted-foreground"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem" }}
                >
                  {t.usage}
                </p>
              </div>
            );
          })}
        </div>
      </SubSection>

      <SubSection title="Font Pairing Guide">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <div
              className="text-xs uppercase tracking-widest text-muted-foreground mb-3"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "0.08em" }}
            >
              Poppins — Headings
            </div>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.75rem", letterSpacing: "-0.025em", color: "var(--foreground)", lineHeight: 1.2 }}>
              InfluencIA
            </p>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "1.25rem", color: "var(--foreground)", lineHeight: 1.4, marginTop: "0.5rem" }}>
              Connect. Collaborate. Grow.
            </p>
            <p className="text-muted-foreground mt-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "0.875rem" }}>
              Bold authority with modern geometry
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div
              className="text-xs uppercase tracking-widest text-muted-foreground mb-3"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "0.08em" }}
            >
              Inter — Body & UI
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.9375rem", color: "var(--foreground)", lineHeight: 1.6 }}>
              La plateforme IA qui connecte les marques aux nano et micro-influenceurs et mesure l'impact réel.
            </p>
            <p className="text-muted-foreground mt-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.75rem" }}>
              Neutral, legible, optimised for screens
            </p>
          </div>
        </div>
      </SubSection>

      <SubSection title="Weight Reference">
        <div className="bg-card border border-border rounded-xl p-5 flex flex-wrap gap-6">
          {[
            { weight: 400, label: "Regular" },
            { weight: 500, label: "Medium" },
            { weight: 600, label: "SemiBold" },
            { weight: 700, label: "Bold" },
            { weight: 800, label: "ExtraBold" },
          ].map((w) => (
            <div key={w.weight}>
              <p
                className="text-muted-foreground"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 500, marginBottom: "0.25rem" }}
              >
                {w.label} · {w.weight}
              </p>
              <p
                className="text-foreground"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: w.weight, fontSize: "1.25rem" }}
              >
                InfluencIA
              </p>
            </div>
          ))}
        </div>
      </SubSection>
    </div>
  );
}
