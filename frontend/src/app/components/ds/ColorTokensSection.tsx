import { SectionHeader, SubSection, Label } from "./DSLayout";

const brandColors = [
  { name: "Primary Blue",   hex: "#2563EB", darkHex: "#3B82F6", var: "--brand-blue",    role: "Primary actions, links, CTAs" },
  { name: "Secondary Purple", hex: "#7C3AED", darkHex: "#8B5CF6", var: "--brand-purple", role: "Secondary actions, tags, highlights" },
  { name: "Accent Pink",    hex: "#EC4899", darkHex: "#F472B6", var: "--brand-pink",    role: "Accent, notifications, AI Score badges" },
  { name: "Success",        hex: "#10B981", darkHex: "#34D399", var: "--brand-success", role: "Positive states, growth indicators" },
  { name: "Warning",        hex: "#F59E0B", darkHex: "#FBBF24", var: "--brand-warning", role: "Caution, pending states" },
  { name: "Error",          hex: "#EF4444", darkHex: "#F87171", var: "--brand-error",   role: "Destructive actions, error states" },
];

const neutralColors = [
  { name: "Foreground",     token: "--foreground",      lightHex: "#1F2937", darkHex: "#F1F5F9" },
  { name: "Secondary Text", token: "--muted-foreground", lightHex: "#6B7280", darkHex: "#94A3B8" },
  { name: "Background",     token: "--background",       lightHex: "#F1F5F9", darkHex: "#0F172A" },
  { name: "Card Surface",   token: "--card",             lightHex: "#FFFFFF", darkHex: "#1E293B" },
  { name: "Border",         token: "--border",           lightHex: "#E2E8F0", darkHex: "rgba(255,255,255,.08)" },
  { name: "Input BG",       token: "--input-background", lightHex: "#F8FAFC", darkHex: "#0F172A" },
];

const blueScale = ["#DBEAFE", "#BFDBFE", "#93C5FD", "#60A5FA", "#3B82F6", "#2563EB", "#1D4ED8", "#1E40AF", "#1E3A8A"];
const purpleScale = ["#EDE9FE", "#DDD6FE", "#C4B5FD", "#A78BFA", "#8B5CF6", "#7C3AED", "#6D28D9", "#5B21B6", "#4C1D95"];
const pinkScale = ["#FCE7F3", "#FBCFE8", "#F9A8D4", "#F472B6", "#EC4899", "#DB2777", "#BE185D", "#9D174D", "#831843"];

interface ColorSwatchProps {
  color: string;
  size?: "sm" | "md";
  label?: string;
}

function ColorSwatch({ color, size = "md", label }: ColorSwatchProps) {
  const isSmall = size === "sm";
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`rounded-lg border border-border ${isSmall ? "w-8 h-8" : "w-14 h-14"}`}
        style={{ background: color }}
      />
      {label && (
        <span
          className="text-center text-muted-foreground"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 500 }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function BrandColorCard({ name, hex, darkHex, role }: typeof brandColors[0]) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="h-20 w-full" style={{ background: hex }} />
      <div className="p-3">
        <p
          className="text-foreground"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.8125rem" }}
        >
          {name}
        </p>
        <p
          className="text-muted-foreground mt-0.5"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.03em" }}
        >
          {hex}
        </p>
        <p
          className="text-muted-foreground mt-0.5"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem" }}
        >
          {role}
        </p>
        <div className="mt-2 flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full border border-border" style={{ background: hex }} />
          <span className="text-muted-foreground" style={{ fontSize: "0.7rem", fontFamily: "'Inter', sans-serif" }}>Light</span>
          <div className="w-3.5 h-3.5 rounded-full border border-border ml-1" style={{ background: darkHex }} />
          <span className="text-muted-foreground" style={{ fontSize: "0.7rem", fontFamily: "'Inter', sans-serif" }}>Dark</span>
        </div>
      </div>
    </div>
  );
}

export function ColorTokensSection() {
  return (
    <div>
      <SectionHeader
        title="Color Tokens"
        description="All color values used across the InfluencIA platform. Use CSS custom properties — never hard-code hex values in components."
      />

      <SubSection title="Brand Palette">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {brandColors.map((c) => (
            <BrandColorCard key={c.name} {...c} />
          ))}
        </div>
      </SubSection>

      <SubSection title="Neutral & Semantic Tokens">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_1fr] text-xs font-medium text-muted-foreground border-b border-border px-4 py-2.5 gap-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            <span>Token Name</span>
            <span>Light</span>
            <span>Dark</span>
            <span>Usage</span>
          </div>
          {neutralColors.map((c, i) => (
            <div
              key={c.token}
              className={`grid grid-cols-[1fr_auto_auto_1fr] px-4 py-3 gap-4 items-center ${i % 2 === 0 ? "" : "bg-muted/30"}`}
            >
              <div>
                <p className="text-foreground" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", fontWeight: 500 }}>{c.name}</p>
                <p className="text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem" }}>{c.token}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded border border-border" style={{ background: c.lightHex }} />
                <span className="text-muted-foreground" style={{ fontSize: "0.7rem", fontFamily: "'Inter', sans-serif" }}>{c.lightHex}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded border border-border" style={{ background: c.darkHex }} />
                <span className="text-muted-foreground" style={{ fontSize: "0.7rem", fontFamily: "'Inter', sans-serif" }}>{c.darkHex}</span>
              </div>
              <span className="text-muted-foreground" style={{ fontSize: "0.75rem", fontFamily: "'Inter', sans-serif" }}>{c.name} surfaces and text</span>
            </div>
          ))}
        </div>
      </SubSection>

      <SubSection title="Color Scales">
        <div className="space-y-4">
          {[
            { name: "Blue", scale: blueScale },
            { name: "Purple", scale: purpleScale },
            { name: "Pink", scale: pinkScale },
          ].map(({ name, scale }) => (
            <div key={name} className="bg-card border border-border rounded-xl p-4">
              <Label>{name} Scale</Label>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {scale.map((color, i) => (
                  <ColorSwatch key={i} color={color} size="sm" label={`${(i + 1) * 100}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SubSection>

      <SubSection title="Usage Rules">
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {[
            ["✅ Do", "Use `var(--primary)` for all primary actions. Use `var(--brand-purple)` for secondary emphasis."],
            ["✅ Do", "Use `var(--foreground)` for body text, `var(--muted-foreground)` for secondary/helper text."],
            ["✅ Do", "Keep backgrounds `var(--background)` for page, `var(--card)` for raised surfaces."],
            ["❌ Don't", "Never hard-code hex values in components. Always reference CSS custom properties."],
            ["❌ Don't", "Don't mix brand-blue and brand-purple as competing primaries. Blue is for actions, purple for highlights."],
            ["❌ Don't", "Avoid using the accent pink for large filled areas — use it for badges, chips, and highlights only."],
          ].map(([label, text], i) => (
            <div key={i} className="px-4 py-3 flex gap-3 items-start">
              <span
                className="flex-shrink-0"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 600 }}
              >
                {label}
              </span>
              <p className="text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem" }}>{text}</p>
            </div>
          ))}
        </div>
      </SubSection>
    </div>
  );
}
