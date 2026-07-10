import { ArrowRight, Loader2, Plus, Trash2, Check } from "lucide-react";
import { SectionHeader, SubSection, DSCard, Label } from "./DSLayout";

function Btn({
  variant = "primary",
  size = "md",
  children,
  disabled = false,
  loading = false,
  icon,
  iconRight,
}: {
  variant?: "primary" | "secondary" | "ghost" | "text" | "destructive" | "success" | "outline-purple";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}) {
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    borderRadius: "0.5rem",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    transition: "all 0.15s ease",
    whiteSpace: "nowrap",
    flexShrink: 0,
  };

  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: "0.375rem 0.75rem",  fontSize: "0.75rem",   height: "1.875rem" },
    md: { padding: "0.5rem 1rem",       fontSize: "0.875rem",  height: "2.25rem"  },
    lg: { padding: "0.625rem 1.375rem", fontSize: "0.9375rem", height: "2.625rem" },
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: disabled ? "var(--muted)" : "var(--primary)",
      color: disabled ? "var(--muted-foreground)" : "var(--primary-foreground)",
    },
    secondary: {
      background: disabled ? "var(--muted)" : "var(--secondary)",
      color: disabled ? "var(--muted-foreground)" : "var(--secondary-foreground)",
      border: "1px solid var(--secondary-foreground)",
      borderColor: disabled ? "transparent" : "var(--secondary-foreground)",
    },
    ghost: {
      background: "transparent",
      color: disabled ? "var(--muted-foreground)" : "var(--foreground)",
      border: "1px solid var(--border)",
    },
    "outline-purple": {
      background: "transparent",
      color: disabled ? "var(--muted-foreground)" : "var(--brand-purple)",
      border: "1px solid var(--brand-purple)",
      borderColor: disabled ? "var(--border)" : "var(--brand-purple)",
    },
    text: {
      background: "transparent",
      color: disabled ? "var(--muted-foreground)" : "var(--primary)",
      padding: sizes[size]?.padding,
    },
    destructive: {
      background: disabled ? "var(--muted)" : "var(--destructive)",
      color: disabled ? "var(--muted-foreground)" : "var(--destructive-foreground)",
    },
    success: {
      background: disabled ? "var(--muted)" : "var(--brand-success)",
      color: "#fff",
    },
  };

  return (
    <button
      style={{ ...baseStyle, ...sizes[size], ...variants[variant], opacity: disabled ? 0.6 : 1 }}
      disabled={disabled}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
      {children}
      {iconRight}
    </button>
  );
}

export function ButtonsSection() {
  return (
    <div>
      <SectionHeader
        title="Buttons"
        description="All button variants, sizes, states, and combinations. Use semantic variants — never style raw buttons."
      />

      <SubSection title="Variants">
        <DSCard>
          <div className="flex flex-wrap gap-3 items-center">
            <Btn variant="primary">Primary</Btn>
            <Btn variant="secondary">Secondary</Btn>
            <Btn variant="outline-purple">Outline Purple</Btn>
            <Btn variant="ghost">Ghost</Btn>
            <Btn variant="text" iconRight={<ArrowRight size={14} />}>Text Link</Btn>
            <Btn variant="destructive">Destructive</Btn>
            <Btn variant="success" icon={<Check size={14} />}>Success</Btn>
          </div>
        </DSCard>
      </SubSection>

      <SubSection title="Sizes">
        <DSCard>
          <div className="flex flex-wrap gap-3 items-center">
            <Btn variant="primary" size="sm">Small</Btn>
            <Btn variant="primary" size="md">Default</Btn>
            <Btn variant="primary" size="lg">Large</Btn>
          </div>
        </DSCard>
      </SubSection>

      <SubSection title="With Icons">
        <DSCard>
          <div className="flex flex-wrap gap-3 items-center">
            <Btn variant="primary" icon={<Plus size={14} />}>New Campaign</Btn>
            <Btn variant="secondary" iconRight={<ArrowRight size={14} />}>View Profile</Btn>
            <Btn variant="ghost" icon={<Trash2 size={14} />}>Delete</Btn>
            <Btn variant="destructive" icon={<Trash2 size={14} />}>Delete Campaign</Btn>
          </div>
        </DSCard>
      </SubSection>

      <SubSection title="States">
        <div className="grid sm:grid-cols-2 gap-4">
          <DSCard>
            <Label>Normal → Hover → Active</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="flex flex-col gap-1 items-center">
                <Btn variant="primary">Normal</Btn>
                <span className="text-muted-foreground" style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif" }}>bg-primary</span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <button
                  style={{
                    padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "none", cursor: "pointer",
                    background: "#1D4ED8", color: "#fff", fontSize: "0.875rem", fontFamily: "'Inter', sans-serif", fontWeight: 500, height: "2.25rem"
                  }}
                >
                  Hover
                </button>
                <span className="text-muted-foreground" style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif" }}>bg-blue-700</span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <button
                  style={{
                    padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "none", cursor: "pointer",
                    background: "#1E40AF", color: "#fff", fontSize: "0.875rem", fontFamily: "'Inter', sans-serif", fontWeight: 500, height: "2.25rem",
                    transform: "scale(0.97)"
                  }}
                >
                  Active
                </button>
                <span className="text-muted-foreground" style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif" }}>bg-blue-800</span>
              </div>
            </div>
          </DSCard>
          <DSCard>
            <Label>Disabled & Loading</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="flex flex-col gap-1 items-center">
                <Btn variant="primary" disabled>Disabled</Btn>
                <span className="text-muted-foreground" style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif" }}>opacity-60</span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <Btn variant="primary" loading>Loading…</Btn>
                <span className="text-muted-foreground" style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif" }}>spinner shown</span>
              </div>
            </div>
          </DSCard>
        </div>
      </SubSection>

      <SubSection title="Button Group">
        <DSCard>
          <div className="flex">
            {["All", "Active", "Paused", "Completed"].map((label, i) => (
              <button
                key={label}
                style={{
                  padding: "0.4375rem 1rem",
                  fontSize: "0.8125rem",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  cursor: "pointer",
                  background: i === 0 ? "var(--primary)" : "var(--card)",
                  color: i === 0 ? "var(--primary-foreground)" : "var(--muted-foreground)",
                  border: "1px solid var(--border)",
                  marginLeft: i === 0 ? 0 : -1,
                  borderRadius: i === 0 ? "0.5rem 0 0 0.5rem" : i === 3 ? "0 0.5rem 0.5rem 0" : 0,
                  position: "relative",
                  zIndex: i === 0 ? 1 : 0,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </DSCard>
      </SubSection>

      <SubSection title="Icon-only Buttons">
        <DSCard>
          <div className="flex gap-3 items-center flex-wrap">
            {[
              { bg: "var(--primary)", fg: "#fff", icon: <Plus size={16} /> },
              { bg: "var(--secondary)", fg: "var(--secondary-foreground)", icon: <ArrowRight size={16} /> },
              { bg: "transparent", fg: "var(--foreground)", icon: <Trash2 size={16} />, border: "1px solid var(--border)" },
            ].map((b, i) => (
              <button
                key={i}
                style={{
                  width: 36, height: 36, borderRadius: "0.5rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: b.bg, color: b.fg, border: b.border ?? "none", cursor: "pointer",
                }}
              >
                {b.icon}
              </button>
            ))}
            {/* Round FAB */}
            <button
              style={{
                width: 44, height: 44, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer",
                boxShadow: "0 4px 12px rgba(37,99,235,0.35)",
              }}
            >
              <Plus size={18} />
            </button>
          </div>
        </DSCard>
      </SubSection>
    </div>
  );
}
