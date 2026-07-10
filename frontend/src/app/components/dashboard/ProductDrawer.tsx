import { useState, useEffect } from "react";
import { X, ArrowRight, CheckCircle, Package, Camera, Users, Clock, ChevronRight } from "lucide-react";
import type { MarketplaceProduct } from "./MarketplacePage";
import { TiktokIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "../ui/SocialIcons";
import api from "../../../lib/api";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

function PlatformPip({ p }: { p: string }) {
  const map: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
    instagram: { color: "#E1306C", label: "Instagram", icon: <InstagramIcon size={12} /> },
    tiktok:    { color: "#010101", label: "TikTok",    icon: <TiktokIcon size={12} /> },
    youtube:   { color: "#FF0000", label: "YouTube",   icon: <YoutubeIcon size={12} /> },
    facebook:  { color: "#1877F2", label: "Facebook",  icon: <FacebookIcon size={12} /> },
  };
  const m = map[p];
  if (!m) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.25rem 0.625rem", borderRadius: 999, background: `${m.color}14`, color: m.color, fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600 }}>
      {m.icon} {m.label}
    </span>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ paddingBottom: "1.375rem", marginBottom: "1.375rem", borderBottom: "1px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
        <span style={{ color: "var(--muted-foreground)" }}>{icon}</span>
        <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function RequestModal({ product, onClose }: { product: MarketplaceProduct; onClose: () => void }) {
  const [step, setStep] = useState<"form" | "done">("form");
  const [note, setNote] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async () => {
    setRequesting(true);
    setError(null);
    try {
      if (product.id.startsWith("static")) {
        await new Promise((resolve) => setTimeout(resolve, 800));
      } else {
        await api.post(`/api/marketplace/listings/${product.id}/request`, { pitch: note });
      }
      setStep("done");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit request");
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 440, background: "var(--card)", borderRadius: "1rem", padding: "1.75rem", boxShadow: "0 16px 48px rgba(0,0,0,0.2)", zIndex: 1 }}>
        {step === "done" ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <CheckCircle size={28} style={{ color: "#10B981" }} />
            </div>
            <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.25rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>Request submitted!</p>
            <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.65, marginBottom: "1.5rem" }}>
              {product.brand} will review your profile and respond within 72 hours.
            </p>
            <button onClick={onClose} style={{ padding: "0.625rem 1.5rem", borderRadius: "0.5rem", background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500 }}>
              Back to marketplace
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div>
                <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.0625rem", color: "var(--foreground)", marginBottom: "0.125rem" }}>Request {product.name}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>by {product.brand}</p>
              </div>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}><X size={18} /></button>
            </div>

            <div style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem", padding: "0.875rem 1rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>Product value</span>
                <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9rem", color: "var(--foreground)" }}>{product.giftValue} MAD</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>Content expected</span>
                <span style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)" }}>{product.contentRequired.length} pieces</span>
              </div>
            </div>

            <label style={{ display: "block", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
              Why are you a great fit? <span style={{ color: "#EC4899" }}>*</span>
            </label>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tell the brand about your connection to this product category and how you'd authentically present it to your audience…"
              style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--input-background)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.875rem", resize: "vertical", outline: "none", lineHeight: 1.65, boxSizing: "border-box", marginBottom: "1rem" }}
            />
            <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", marginBottom: "1rem" }}>
              Your IA Score and profile are sent automatically with your request.
            </p>
            <button
              onClick={handleRequest}
              disabled={note.trim().length < 20 || requesting}
              style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "none", background: (note.trim().length >= 20 && !requesting) ? "var(--primary)" : "var(--muted)", color: (note.trim().length >= 20 && !requesting) ? "#fff" : "var(--muted-foreground)", cursor: (note.trim().length >= 20 && !requesting) ? "pointer" : "default", fontFamily: f.b, fontSize: "0.9rem", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            >
              {requesting ? "Submitting..." : "Submit request"} {!requesting && <ArrowRight size={15} />}
            </button>
            {error && <p style={{ color: "red", marginTop: 10, fontSize: "0.8rem", textAlign: "center" }}>{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}

export function ProductDrawer({
  product,
  onClose,
}: {
  product: MarketplaceProduct | null;
  onClose: () => void;
}) {
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!product) return null;

  const availLabel: Record<string, { text: string; color: string; bg: string }> = {
    available: { text: "Available",     color: "#065F46", bg: "#D1FAE5" },
    limited:   { text: "Limited spots", color: "#92400E", bg: "#FEF3C7" },
    full:      { text: "No spots left", color: "#991B1B", bg: "#FEE2E2" },
  };
  const avail = availLabel[product.availability];

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 60, backdropFilter: "blur(2px)" }} />
      <div
        style={{
          position: "fixed", top: 0, right: 0,
          width: "min(480px, 100vw)", height: "100vh",
          background: "var(--card)",
          zIndex: 70, display: "flex", flexDirection: "column",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
          borderLeft: "1px solid var(--border)",
          animation: "slideIn .22s ease",
        }}
      >
        <style>{`@keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>

        {/* Header */}
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 34, height: 34, borderRadius: "0.625rem", background: `${product.brandColor}18`, display: "flex", alignItems: "center", justifyContent: "center", color: product.brandColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", flexShrink: 0 }}>
              {product.brand[0]}
            </div>
            <div>
              <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{product.brand}</p>
              <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{product.category} · {product.brandLocation}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--muted)", border: "none", cursor: "pointer", color: "var(--muted-foreground)" }}>
            <X size={15} />
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 1.25rem" }}>

          {/* Product visual */}
          <div
            style={{
              height: 200, borderRadius: "0.875rem",
              background: `linear-gradient(135deg, ${product.imageGradient[0]}, ${product.imageGradient[1]})`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              marginBottom: "1.375rem",
              border: "1px solid var(--border)",
              position: "relative", overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", bottom: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
            <div style={{ width: 56, height: 56, borderRadius: "1rem", background: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem", backdropFilter: "blur(4px)" }}>
              <Package size={26} style={{ color: product.brandColor }} />
            </div>
            <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9375rem", color: product.brandColor, textAlign: "center", paddingInline: "1rem" }}>
              {product.name}
            </p>
          </div>

          {/* Product hero info */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "0.75rem" }}>
              <span style={{ padding: "0.2rem 0.625rem", borderRadius: 999, background: `${product.brandColor}15`, color: product.brandColor, fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600 }}>
                {product.category}
              </span>
              <span style={{ padding: "0.2rem 0.625rem", borderRadius: 999, background: avail.bg, color: avail.color, fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600 }}>
                {avail.text}
                {product.spotsLeft !== undefined && product.spotsLeft > 0 && ` · ${product.spotsLeft} of ${product.spotsTotal}`}
              </span>
            </div>

            <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.25rem", color: "var(--foreground)", letterSpacing: "-0.02em", marginBottom: "0.5rem", lineHeight: 1.3 }}>
              {product.name}
            </h2>
            <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "0.875rem" }}>
              {product.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
              {product.platforms.map((p) => <PlatformPip key={p} p={p} />)}
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.25rem 0.625rem", borderRadius: 999, background: "var(--muted)", fontFamily: f.b, fontSize: "0.75rem", color: "var(--foreground)", fontWeight: 500 }}>
                <Clock size={12} style={{ color: "var(--muted-foreground)" }} /> {product.turnaround}
              </span>
            </div>
          </div>

          {/* What you'll receive */}
          <Section title="What you'll receive" icon={<Package size={14} />}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {product.whatYouGet.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", padding: "0.625rem 0.875rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.5rem", borderLeft: `3px solid ${product.brandColor}` }}>
                  <CheckCircle size={14} style={{ color: product.brandColor, flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* What we expect */}
          <Section title="Content you'll create" icon={<Camera size={14} />}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {product.contentRequired.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", padding: "0.625rem 0.875rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.5rem" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--primary)", flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Requirements */}
          <Section title="Creator requirements" icon={<Users size={14} />}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              {product.requirements.map((req, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={13} style={{ color: "#10B981", flexShrink: 0 }} />
                  <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)" }}>{req}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Gift value */}
          <div style={{ background: `${product.brandColor}08`, border: `1px solid ${product.brandColor}20`, borderRadius: "0.75rem", padding: "1rem 1.125rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>Total gift value</p>
                <p style={{ fontFamily: f.h, fontWeight: 800, fontSize: "2rem", color: product.brandColor, letterSpacing: "-0.04em", lineHeight: 1 }}>{product.giftValue}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>MAD · gifted/barter</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", marginBottom: 2 }}>Applications</p>
                <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.25rem", color: "var(--foreground)" }}>{product.applications}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--border)", background: "var(--card)", flexShrink: 0 }}>
          <button
            onClick={() => product.availability !== "full" && setRequesting(true)}
            disabled={product.availability === "full"}
            style={{
              width: "100%", padding: "0.75rem", borderRadius: "0.625rem",
              border: "none",
              background: product.availability === "full" ? "var(--muted)" : "var(--primary)",
              color: product.availability === "full" ? "var(--muted-foreground)" : "#fff",
              cursor: product.availability === "full" ? "default" : "pointer",
              fontFamily: f.b, fontSize: "0.9375rem", fontWeight: 500,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              boxShadow: product.availability === "full" ? "none" : "var(--shadow-primary)",
            }}
          >
            {product.availability === "full" ? "No spots available" : "Request this product"}
            {product.availability !== "full" && <ArrowRight size={16} />}
          </button>
          {product.availability !== "full" && (
            <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", textAlign: "center", marginTop: "0.5rem" }}>
              No payment required — gifted in exchange for content
            </p>
          )}
        </div>
      </div>

      {requesting && <RequestModal product={product} onClose={() => setRequesting(false)} />}
    </>
  );
}
