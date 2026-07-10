import { useState, useEffect } from "react";
import {
  X, Bookmark, BookmarkCheck, ArrowRight, CheckCircle, XCircle,
  Calendar, DollarSign, Users, Target, Zap, Instagram,
  Play, Youtube, Facebook, Clock, Shield, Info,
} from "lucide-react";
import type { Campaign } from "./CampaignsPage";
import api from "../../../lib/api";

import { TiktokIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "../ui/SocialIcons";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

function PlatformIcon({ p, size = 15 }: { p: string; size?: number }) {
  const map: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
    instagram: { icon: <InstagramIcon size={size} />, color: "#E1306C", label: "IG" },
    tiktok:    { icon: <TiktokIcon size={size} />,      color: "#010101", label: "TK" },
    youtube:   { icon: <YoutubeIcon size={size} />,   color: "#FF0000", label: "YT" },
    facebook:  { icon: <FacebookIcon size={size} />,  color: "#1877F2", label: "FB" },
  };
  const m = map[p];
  if (!m) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", padding: "0.2rem 0.5rem", borderRadius: 999, background: `${m.color}14`, color: m.color }}>
      {m.icon}
      <span style={{ fontFamily: f.b, fontSize: "0.68rem", fontWeight: 700 }}>{m.label}</span>
    </span>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ paddingBottom: "1.5rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
        {icon && <span style={{ color: "var(--muted-foreground)" }}>{icon}</span>}
        <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", letterSpacing: "-0.01em" }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function MatchBar({ score }: { score: number }) {
  const color = score >= 90 ? "#10B981" : score >= 80 ? "#2563EB" : score >= 70 ? "#7C3AED" : "#6B7280";
  const label = score >= 90 ? "Excellent match" : score >= 80 ? "Great match" : score >= 70 ? "Good match" : "Moderate match";
  return (
    <div
      style={{
        background: score >= 90 ? "#ECFDF5" : score >= 80 ? "#EFF6FF" : "#EDE9FE",
        border: `1px solid ${score >= 90 ? "#A7F3D0" : score >= 80 ? "#BFDBFE" : "#DDD6FE"}`,
        borderRadius: "0.875rem",
        padding: "1rem 1.125rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Zap size={16} style={{ color }} />
          <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color, letterSpacing: "-0.03em" }}>{score}%</span>
          <span style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color }}>{label}</span>
        </div>
      </div>
      {/* Score bar */}
      <div style={{ height: 6, borderRadius: 999, background: "rgba(0,0,0,0.08)", marginBottom: "1rem", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${score}%`, borderRadius: 999, background: color, transition: "width 1s ease" }} />
      </div>
    </div>
  );
}

function ApplyModal({ campaign, onClose }: { campaign: Campaign; onClose: () => void }) {
  const [step, setStep] = useState<"message" | "confirm" | "done">("message");
  const [message, setMessage] = useState("");
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    setApplying(true);
    setError(null);
    try {
      await api.post(`/api/campaigns/${campaign.id}/apply`, { cover_message: message });
      setStep("done");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 460, background: "var(--card)", borderRadius: "1rem", padding: "1.75rem", boxShadow: "0 16px 48px rgba(0,0,0,0.2)", zIndex: 1 }}>
        {step === "done" ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <CheckCircle size={28} style={{ color: "#10B981" }} />
            </div>
            <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.25rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>Application sent!</p>
            <p style={{ fontFamily: f.b, fontSize: "0.9rem", color: "var(--muted-foreground)", lineHeight: 1.65, marginBottom: "1.5rem" }}>
              {campaign.brand} will review your profile and get back to you within 48 hours.
            </p>
            <button onClick={onClose} style={{ padding: "0.625rem 1.5rem", borderRadius: "0.5rem", background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.9rem", fontWeight: 500 }}>
              Back to campaigns
            </button>
          </div>
        ) : step === "confirm" ? (
          <div>
            <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.125rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>Confirm application</p>
            <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", marginBottom: "1.25rem" }}>
              You're about to apply to <strong style={{ color: "var(--foreground)" }}>{campaign.title}</strong> by {campaign.brand}.
            </p>
            <div style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem", padding: "0.875rem 1rem", marginBottom: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[{ l: "Budget", v: `${campaign.budget.toLocaleString()} MAD` }, { l: "Deadline", v: campaign.deadline }, { l: "Payment", v: campaign.paymentModel }].map(item => (
                <div key={item.l} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>{item.l}</span>
                  <span style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)" }}>{item.v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.625rem" }}>
              <button onClick={() => setStep("message")} disabled={applying} style={{ flex: 1, padding: "0.625rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", cursor: applying ? "default" : "pointer", fontFamily: f.b, fontSize: "0.875rem", opacity: applying ? 0.7 : 1 }}>Back</button>
              <button onClick={handleApply} disabled={applying} style={{ flex: 2, padding: "0.625rem", borderRadius: "0.5rem", border: "none", background: "var(--primary)", color: "#fff", cursor: applying ? "default" : "pointer", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, opacity: applying ? 0.7 : 1 }}>
                {applying ? "Submitting..." : "Submit application"}
              </button>
            </div>
            {error && <p style={{ color: "red", marginTop: 10, fontSize: "0.8rem", textAlign: "center" }}>{error}</p>}
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.125rem", color: "var(--foreground)" }}>Apply to {campaign.brand}</p>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}><X size={18} /></button>
            </div>
            <label style={{ display: "block", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
              Introduce yourself <span style={{ color: "#EC4899" }}>*</span>
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the brand why you're the right fit. What's your connection to this niche? What makes your content authentic for their audience?"
              style={{ width: "100%", padding: "0.75rem 0.875rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--input-background)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.875rem", resize: "vertical", outline: "none", lineHeight: 1.65, boxSizing: "border-box", marginBottom: "1rem" }}
            />
            <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", marginBottom: "1rem" }}>
              Your IA Score (87), linked accounts, and profile are sent automatically.
            </p>
            <button
              onClick={() => setStep("confirm")}
              disabled={message.trim().length < 30}
              style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "none", background: message.trim().length >= 30 ? "var(--primary)" : "var(--muted)", color: message.trim().length >= 30 ? "#fff" : "var(--muted-foreground)", cursor: message.trim().length >= 30 ? "pointer" : "default", fontFamily: f.b, fontSize: "0.9rem", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            >
              Continue <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function CampaignDrawer({
  campaign,
  onClose,
}: {
  campaign: Campaign | null;
  onClose: () => void;
}) {
  const [saved, setSaved] = useState(campaign?.saved ?? false);
  const [applying, setApplying] = useState(false);

  useEffect(() => { setSaved(campaign?.saved ?? false); }, [campaign]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!campaign) return null;

  const urgencyColor = campaign.spotsLeft <= 1 ? "#EF4444" : campaign.spotsLeft <= 3 ? "#F59E0B" : "#10B981";
  const typeLabel: Record<string, string> = { paid: "Paid", gifted: "Gifted", affiliate: "Affiliate", ambassador: "Ambassador" };
  const typeBg: Record<string, string> = { paid: "#DBEAFE", gifted: "#FCE7F3", affiliate: "#D1FAE5", ambassador: "#EDE9FE" };
  const typeColor: Record<string, string> = { paid: "#1D4ED8", gifted: "#BE185D", affiliate: "#065F46", ambassador: "#5B21B6" };

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 60, backdropFilter: "blur(2px)" }} />

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "min(520px, 100vw)",
          height: "100vh",
          background: "var(--card)",
          zIndex: 70,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
          borderLeft: "1px solid var(--border)",
          animation: "slideIn .22s ease",
        }}
      >
        <style>{`@keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>

        {/* Drawer header */}
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "0.625rem", background: `${campaign.brandColor}18`, display: "flex", alignItems: "center", justifyContent: "center", color: campaign.brandColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", flexShrink: 0 }}>
              {campaign.brand[0]}
            </div>
            <div>
              <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{campaign.brand}</p>
              <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{campaign.brandIndustry} · {campaign.country}</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <button
              onClick={() => setSaved((s) => !s)}
              style={{ width: 34, height: 34, borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", background: saved ? "#EDE9FE" : "var(--muted)", border: "none", cursor: "pointer", color: saved ? "#7C3AED" : "var(--muted-foreground)" }}
            >
              {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            </button>
            <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--muted)", border: "none", cursor: "pointer", color: "var(--muted-foreground)" }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 1.25rem" }}>

          {/* Campaign hero */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", alignItems: "center", marginBottom: "0.75rem" }}>
              {campaign.status === "new" && (
                <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "#FCE7F3", color: "#BE185D", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>New</span>
              )}
              {campaign.status === "closing" && (
                <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "#FEF3C7", color: "#92400E", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Closing soon</span>
              )}
              <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: typeBg[campaign.type], color: typeColor[campaign.type], fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600 }}>
                {typeLabel[campaign.type]}
              </span>
              <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "var(--muted)", color: "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.65rem" }}>
                {campaign.niche}
              </span>
            </div>
            <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.75rem", lineHeight: 1.3 }}>
              {campaign.title}
            </h2>

            {/* Quick stats row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", marginBottom: "0.875rem" }}>
              {campaign.platforms.map((p) => <PlatformIcon key={p} p={p} />)}
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.2rem 0.625rem", borderRadius: 999, background: "var(--muted)", fontFamily: f.b, fontSize: "0.75rem", color: "var(--foreground)", fontWeight: 500 }}>
                <DollarSign size={12} style={{ color: "var(--muted-foreground)" }} />
                {campaign.budget.toLocaleString()} {campaign.budgetUnit ?? "MAD"}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.2rem 0.625rem", borderRadius: 999, background: "var(--muted)", fontFamily: f.b, fontSize: "0.75rem", color: "var(--foreground)" }}>
                <Calendar size={12} style={{ color: "var(--muted-foreground)" }} />
                {campaign.deadline}
              </span>
            </div>

            {/* Spots remaining */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.875rem", background: `${urgencyColor}10`, border: `1px solid ${urgencyColor}30`, borderRadius: "0.5rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: urgencyColor, flexShrink: 0 }} />
              <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: urgencyColor, fontWeight: 500 }}>
                {campaign.spotsLeft === 0 ? "No spots left" : `${campaign.spotsLeft} creator spot${campaign.spotsLeft !== 1 ? "s" : ""} remaining`}
              </span>
              <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", marginLeft: 2 }}>· {campaign.applicants} applicants</span>
            </div>
          </div>

          {/* Match score */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
              <Zap size={14} style={{ color: "#7C3AED" }} />
              <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>Your IA Match</h3>
            </div>
            <MatchBar score={campaign.matchScore} />
            <div style={{ marginTop: "0.875rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {(campaign as any).matchReasons?.map?.((r: any) => (
                <div key={r.label} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: r.met ? "#ECFDF5" : "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    {r.met ? <CheckCircle size={11} style={{ color: "#10B981" }} /> : <XCircle size={11} style={{ color: "var(--muted-foreground)" }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)" }}>{r.label}</span>
                    <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", display: "block" }}>{r.detail}</span>
                  </div>
                  <span style={{ padding: "0.1rem 0.375rem", borderRadius: 999, background: "var(--muted)", color: "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.65rem", flexShrink: 0 }}>
                    {r.weight}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Brief */}
          <Section title="Campaign brief" icon={<Info size={14} />}>
            <p style={{ fontFamily: f.b, fontSize: "0.9rem", color: "var(--muted-foreground)", lineHeight: 1.75 }}>{campaign.brief}</p>
          </Section>

          {/* Deliverables */}
          <Section title="Deliverables" icon={<CheckCircle size={14} />}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {((campaign as any).deliverables || []).map((d: string, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.5rem 0.75rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.5rem" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }} />
                  <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)" }}>{d}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Payment */}
          <Section title="Payment & budget" icon={<Shield size={14} />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
              <div style={{ padding: "0.875rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem" }}>
                <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Total budget</p>
                <p style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.03em" }}>{campaign.budget.toLocaleString()}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>MAD</p>
              </div>
              <div style={{ padding: "0.875rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem" }}>
                <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Payment model</p>
                <p style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)", lineHeight: 1.5 }}>{campaign.paymentModel}</p>
              </div>
            </div>
            <div style={{ marginTop: "0.625rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              {((campaign as any).milestones || []).map((m: string, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.6rem", color: "#1D4ED8" }}>{i + 1}</span>
                  </div>
                  <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--foreground)" }}>{m}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Target audience */}
          <Section title="Target audience" icon={<Target size={14} />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {[
                { l: "Gender",    v: (campaign as any).targetAudience?.gender || "All" },
                { l: "Age range", v: (campaign as any).targetAudience?.ageRange || "Any" },
                { l: "Location",  v: (campaign as any).targetAudience?.location || "Any" },
                { l: "Niche",     v: (campaign as any).targetAudience?.niche || "Any" },
              ].map((item) => (
                <div key={item.l} style={{ padding: "0.625rem 0.75rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.5rem" }}>
                  <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{item.l}</p>
                  <p style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)" }}>{item.v}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Requirements */}
          <Section title="Creator requirements" icon={<Users size={14} />}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              {((campaign as any).requirements || []).map((r: string, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={13} style={{ color: "var(--brand-success, #10B981)", flexShrink: 0 }} />
                  <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)" }}>{r}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Sticky footer */}
        <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--border)", background: "var(--card)", flexShrink: 0, display: "flex", gap: "0.625rem" }}>
          <button
            onClick={() => setSaved((s) => !s)}
            style={{ flex: "0 0 auto", padding: "0.6875rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: saved ? "#EDE9FE" : "var(--card)", color: saved ? "#7C3AED" : "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.375rem" }}
          >
            {saved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
            {saved ? "Saved" : "Save"}
          </button>
          <button
            onClick={() => setApplying(true)}
            style={{ flex: 1, padding: "0.6875rem", borderRadius: "0.5rem", border: "none", background: campaign.spotsLeft === 0 ? "var(--muted)" : "var(--primary)", color: campaign.spotsLeft === 0 ? "var(--muted-foreground)" : "#fff", cursor: campaign.spotsLeft === 0 ? "default" : "pointer", fontFamily: f.b, fontSize: "0.9rem", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", boxShadow: campaign.spotsLeft === 0 ? "none" : "var(--shadow-primary)" }}
            disabled={campaign.spotsLeft === 0}
          >
            {campaign.spotsLeft === 0 ? "No spots available" : "Apply to this campaign"}
            {campaign.spotsLeft > 0 && <ArrowRight size={15} />}
          </button>
        </div>
      </div>

      {applying && <ApplyModal campaign={campaign} onClose={() => setApplying(false)} />}
    </>
  );
}
