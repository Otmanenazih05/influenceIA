import { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X, Check } from "lucide-react";
import { SectionHeader, SubSection, DSCard, Label } from "./DSLayout";

/* ─── Badge ─── */
function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.25rem",
        padding: "0.2rem 0.625rem", borderRadius: "999px",
        background: bg, color: color,
        fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 600,
        textTransform: "uppercase", letterSpacing: "0.05em",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {label}
    </span>
  );
}

/* ─── Score Chip ─── */
function ScoreChip({ score, label = "Score IA" }: { score: number; label?: string }) {
  const color = score >= 80 ? "var(--brand-blue)" : score >= 60 ? "var(--brand-warning)" : "var(--brand-error)";
  return (
    <div
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        padding: "0.3rem 0.75rem 0.3rem 0.4rem",
        borderRadius: "999px",
        border: `1.5px solid ${color}`,
        background: `${color}12`,
      }}
    >
      <div
        style={{
          width: 22, height: 22, borderRadius: "50%",
          background: color, display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.6rem", color: "#fff", lineHeight: 1 }}>
          {score}
        </span>
      </div>
      <div>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "var(--muted-foreground)", display: "block", lineHeight: 1 }}>{label}</span>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.75rem", fontWeight: 700, color, lineHeight: 1 }}>
          {score}<span style={{ fontWeight: 400, fontSize: "0.6rem" }}>/100</span>
        </span>
      </div>
    </div>
  );
}

/* ─── Status Pill ─── */
function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; dot: string }> = {
    Active:    { bg: "#D1FAE5", color: "#065F46", dot: "#10B981" },
    Paused:    { bg: "#FEF3C7", color: "#92400E", dot: "#F59E0B" },
    Completed: { bg: "#EDE9FE", color: "#5B21B6", dot: "#7C3AED" },
    Draft:     { bg: "var(--muted)", color: "var(--muted-foreground)", dot: "var(--muted-foreground)" },
    Rejected:  { bg: "#FEE2E2", color: "#991B1B", dot: "#EF4444" },
  };
  const s = map[status] ?? map.Draft;
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.3rem",
        padding: "0.25rem 0.625rem", borderRadius: "999px",
        background: s.bg, color: s.color,
        fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 500,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

/* ─── Alert ─── */
function Alert({ type, title, message }: { type: "info" | "success" | "warning" | "error"; title: string; message: string }) {
  const map = {
    info:    { bg: "#EFF6FF", border: "#BFDBFE", color: "#1D4ED8", Icon: Info },
    success: { bg: "#ECFDF5", border: "#A7F3D0", color: "#065F46", Icon: CheckCircle2 },
    warning: { bg: "#FFFBEB", border: "#FDE68A", color: "#92400E", Icon: AlertTriangle },
    error:   { bg: "#FEF2F2", border: "#FECACA", color: "#991B1B", Icon: XCircle },
  };
  const s = map[type];
  return (
    <div
      style={{
        display: "flex", gap: "0.75rem", padding: "0.875rem 1rem",
        background: s.bg, border: `1px solid ${s.border}`, borderRadius: "0.625rem",
      }}
    >
      <s.Icon size={17} style={{ color: s.color, flexShrink: 0, marginTop: 1 }} />
      <div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: s.color }}>{title}</p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: s.color, opacity: 0.85, marginTop: 1 }}>{message}</p>
      </div>
    </div>
  );
}

/* ─── Toast ─── */
function Toast({ type, message }: { type: "success" | "error" | "info"; message: string }) {
  const map = {
    success: { bg: "var(--foreground)", icon: <Check size={14} style={{ color: "var(--brand-success)" }} /> },
    error:   { bg: "var(--foreground)", icon: <X size={14} style={{ color: "var(--brand-error)" }} /> },
    info:    { bg: "var(--foreground)", icon: <Info size={14} style={{ color: "var(--brand-blue)" }} /> },
  };
  const s = map[type];
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: "0.625rem",
        padding: "0.75rem 1rem",
        background: s.bg, borderRadius: "0.625rem",
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
        minWidth: 240,
      }}
    >
      {s.icon}
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "var(--card)", fontWeight: 500, flex: 1 }}>{message}</span>
      <X size={14} style={{ color: "var(--muted-foreground)", cursor: "pointer", opacity: 0.6 }} />
    </div>
  );
}

/* ─── Progress Bar ─── */
function ProgressBar({ value, label, color = "var(--primary)" }: { value: number; label?: string; color?: string }) {
  return (
    <div>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{label}</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "var(--foreground)" }}>{value}%</span>
        </div>
      )}
      <div style={{ height: 7, borderRadius: 999, background: "var(--muted)", overflow: "hidden" }}>
        <div
          style={{ height: "100%", width: `${value}%`, borderRadius: 999, background: color, transition: "width 1s ease" }}
        />
      </div>
    </div>
  );
}

/* ─── Stepper ─── */
function Stepper({ activeStep }: { activeStep: number }) {
  const steps = ["Campagne", "Influenceurs", "Détails", "Validation"];
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {steps.map((step, i) => (
        <div key={step} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div
              style={{
                width: 30, height: 30, borderRadius: "50%",
                background: i < activeStep ? "var(--primary)" : i === activeStep ? "var(--primary)" : "var(--muted)",
                border: `2px solid ${i <= activeStep ? "var(--primary)" : "var(--border)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: i <= activeStep ? "#fff" : "var(--muted-foreground)",
                fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 600,
              }}
            >
              {i < activeStep ? <Check size={14} /> : i + 1}
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.7rem",
                color: i === activeStep ? "var(--primary)" : "var(--muted-foreground)",
                fontWeight: i === activeStep ? 500 : 400,
                whiteSpace: "nowrap",
              }}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                height: 2, width: 48,
                background: i < activeStep ? "var(--primary)" : "var(--border)",
                marginBottom: 20, marginLeft: 4, marginRight: 4,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Tooltip ─── */
function TooltipDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      {["Default", "Info"].map((type) => (
        <div key={type} style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div
            style={{
              position: "absolute", bottom: "calc(100% + 8px)",
              padding: "0.375rem 0.625rem",
              background: "var(--foreground)", color: "var(--card)",
              borderRadius: "0.375rem",
              fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 500,
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            {type === "Default" ? "Score IA calculé quotidiennement" : "93 influenceurs disponibles"}
            <div
              style={{
                position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
                width: 0, height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: `5px solid var(--foreground)`,
              }}
            />
          </div>
          <button
            style={{
              padding: "0.4rem 0.875rem", borderRadius: "0.375rem",
              background: "var(--muted)", color: "var(--muted-foreground)", border: "none", cursor: "pointer",
              fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem",
            }}
          >
            Hover target
          </button>
        </div>
      ))}
    </div>
  );
}

export function FeedbackSection() {
  const [step, setStep] = useState(2);

  return (
    <div>
      <SectionHeader
        title="Feedback & Status"
        description="Badges, score chips, status pills, alerts, toasts, tooltips, progress bars, and steppers."
      />

      <SubSection title="Badges & Labels">
        <DSCard>
          <div className="flex flex-wrap gap-2">
            <Badge label="Vérifié"         color="#065F46" bg="#D1FAE5" />
            <Badge label="Top Créateur"    color="#5B21B6" bg="#EDE9FE" />
            <Badge label="Nouveau"         color="#1D4ED8" bg="#DBEAFE" />
            <Badge label="En attente"      color="#92400E" bg="#FEF3C7" />
            <Badge label="Partenariat"     color="#BE185D" bg="#FCE7F3" />
            <Badge label="IA Recommandé"   color="#065F46" bg="#D1FAE5" />
          </div>
        </DSCard>
      </SubSection>

      <SubSection title="Score Chips">
        <DSCard>
          <div className="flex flex-wrap gap-3 items-center">
            <ScoreChip score={92} />
            <ScoreChip score={87} />
            <ScoreChip score={74} />
            <ScoreChip score={61} />
            <ScoreChip score={43} />
          </div>
        </DSCard>
      </SubSection>

      <SubSection title="Status Pills">
        <DSCard>
          <div className="flex flex-wrap gap-2">
            {["Active", "Paused", "Completed", "Draft", "Rejected"].map((s) => (
              <StatusPill key={s} status={s} />
            ))}
          </div>
        </DSCard>
      </SubSection>

      <SubSection title="Alerts">
        <div className="space-y-3">
          <Alert type="success" title="Campaign Published" message="Your campaign is now live and visible to influencers." />
          <Alert type="info"    title="New Applicants" message="12 influencers have applied to your latest campaign." />
          <Alert type="warning" title="Budget Limit Approaching" message="You've used 82% of your monthly campaign budget." />
          <Alert type="error"   title="Payment Failed" message="We couldn't process your last payment. Please update your billing info." />
        </div>
      </SubSection>

      <SubSection title="Toast Notifications">
        <DSCard>
          <div className="flex flex-col gap-3 items-start">
            <Toast type="success" message="Campaign published successfully" />
            <Toast type="error"   message="Failed to save changes. Try again." />
            <Toast type="info"    message="New influencer applied to your campaign" />
          </div>
        </DSCard>
      </SubSection>

      <SubSection title="Tooltip">
        <DSCard>
          <div style={{ paddingTop: 40 }}>
            <TooltipDemo />
          </div>
        </DSCard>
      </SubSection>

      <SubSection title="Progress Bars">
        <DSCard>
          <div className="space-y-4">
            <ProgressBar value={75} label="Progression campagne" color="var(--primary)" />
            <ProgressBar value={48} label="Budget utilisé" color="var(--brand-warning)" />
            <ProgressBar value={92} label="Objectif d'impressions" color="var(--brand-success)" />
            <ProgressBar value={23} label="Couverture contenu" color="var(--brand-pink)" />
          </div>
        </DSCard>
      </SubSection>

      <SubSection title="Stepper">
        <DSCard>
          <Stepper activeStep={step} />
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              style={{ padding: "0.375rem 0.875rem", borderRadius: "0.375rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem" }}
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(Math.min(3, step + 1))}
              style={{ padding: "0.375rem 0.875rem", borderRadius: "0.375rem", border: "none", background: "var(--primary)", color: "#fff", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem" }}
            >
              Next →
            </button>
          </div>
        </DSCard>
      </SubSection>
    </div>
  );
}
