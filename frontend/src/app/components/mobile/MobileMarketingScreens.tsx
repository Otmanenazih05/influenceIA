import { ArrowRight, Menu, Sparkles, Users, Star, Eye, EyeOff, Check, X } from "lucide-react";
import { StatusBar, f } from "./PhoneFrame";

/* ═══ HOME HERO ═══ */
export function MobileHomeScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--background)", overflow: "hidden" }}>
      <StatusBar />
      {/* Header */}
      <div style={{ height: 52, background: "var(--card)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.125rem", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: 26, height: 26, borderRadius: "0.375rem", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={12} color="#fff" />
          </div>
          <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9375rem", color: "var(--foreground)" }}>Influenc<span style={{ color: "#2563EB" }}>IA</span></span>
        </div>
        <button style={{ width: 36, height: 36, borderRadius: "0.5rem", background: "var(--muted)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--foreground)" }}>
          <Menu size={17} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
        {/* Hero section */}
        <div style={{ padding: "2rem 1.375rem 1.5rem", background: "var(--card)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.25rem 0.75rem", borderRadius: 999, background: "var(--secondary)", marginBottom: "1.125rem" }}>
            <Sparkles size={11} style={{ color: "#7C3AED" }} />
            <span style={{ fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600, color: "#5B21B6" }}>AI-Powered Platform</span>
          </div>
          <h1 style={{ fontFamily: f.h, fontWeight: 800, fontSize: "2.375rem", color: "var(--foreground)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "1rem" }}>
            Where brands meet their{" "}
            <span style={{ color: "#2563EB" }}>perfect creator</span>
          </h1>
          <p style={{ fontFamily: f.b, fontSize: "0.9375rem", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            AI-powered matching for brands and nano creators. No minimum followers.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            <button style={{ width: "100%", padding: "0.875rem", borderRadius: "0.625rem", background: "#2563EB", color: "#fff", border: "none", fontFamily: f.b, fontSize: "0.9375rem", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", boxShadow: "var(--shadow-primary)" }}>
              Launch a campaign <ArrowRight size={16} />
            </button>
            <button style={{ width: "100%", padding: "0.875rem", borderRadius: "0.625rem", border: "1px solid var(--border)", background: "transparent", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.9375rem" }}>
              Join as a creator
            </button>
          </div>
          {/* Social proof */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginTop: "1.125rem" }}>
            <div style={{ display: "flex" }}>
              {["#2563EB","#7C3AED","#EC4899","#10B981"].map((c, i) => (
                <div key={c} style={{ width: 26, height: 26, borderRadius: "50%", background: `${c}25`, border: "2px solid var(--card)", marginLeft: i > 0 ? -7 : 0, display: "flex", alignItems: "center", justifyContent: "center", color: c, fontFamily: f.h, fontWeight: 700, fontSize: "0.6rem" }}>
                  {["S","Y","L","O"][i]}
                </div>
              ))}
            </div>
            <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>
              <strong style={{ color: "var(--foreground)", fontWeight: 600 }}>2,500+</strong> brands trust InfluencIA
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ background: "var(--muted)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "1.125rem 1.375rem", display: "flex", justifyContent: "space-around" }}>
          {[{ v: "12K+", l: "Creators" }, { v: "3.7×", l: "Avg ROI" }, { v: "98%", l: "Satisfaction" }].map((s) => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.03em" }}>{s.v}</p>
              <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Product preview card */}
        <div style={{ padding: "1.375rem" }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.125rem", boxShadow: "0 4px 16px rgba(0,0,0,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.875rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem" }}>S</div>
              <div>
                <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>Sarah Benjelloun</p>
                <p style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)" }}>Lifestyle · 98K · 8.3% eng</p>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.2rem 0.625rem", borderRadius: 999, background: "#EDE9FE" }}>
                <span style={{ fontFamily: f.h, fontWeight: 800, fontSize: "0.8rem", color: "#7C3AED" }}>87</span>
                <span style={{ fontFamily: f.b, fontSize: "0.65rem", color: "#7C3AED" }}>IA</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {[{ l: "Match", v: "96%", c: "#10B981" }, { l: "ROI", v: "3.7×", c: "#2563EB" }, { l: "Spots", v: "3 left", c: "#EC4899" }].map((m) => (
                <div key={m.l} style={{ flex: 1, background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.5rem", padding: "0.375rem", textAlign: "center" }}>
                  <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: m.c }}>{m.v}</p>
                  <p style={{ fontFamily: f.b, fontSize: "0.6rem", color: "var(--muted-foreground)" }}>{m.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it works teaser */}
        <div style={{ padding: "0 1.375rem 2rem" }}>
          <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)", marginBottom: "0.875rem" }}>Two paths, one platform</p>
          {[
            { n: "1", title: "Create your brief", desc: "Set budget, niche, and deliverables in minutes." },
            { n: "2", title: "AI matches creators", desc: "InfluencIA scores and ranks the best fits." },
            { n: "3", title: "Launch & measure ROI", desc: "Full reporting and escrow payments built in." },
          ].map((step) => (
            <div key={step.n} style={{ display: "flex", gap: "0.875rem", marginBottom: "0.875rem" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: f.h, fontWeight: 700, fontSize: "0.75rem", flexShrink: 0, marginTop: 2 }}>{step.n}</div>
              <div>
                <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{step.title}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══ LOGIN ═══ */
export function MobileLoginScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: "var(--background)" }}>
      <StatusBar light />
      {/* Brand hero top */}
      <div style={{ background: "linear-gradient(160deg, #0B1628 0%, #1E1B4B 100%)", padding: "2rem 1.375rem 3.5rem", flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: "rgba(124,58,237,0.15)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <div style={{ width: 30, height: 30, borderRadius: "0.5rem", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={14} color="#fff" />
          </div>
          <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1rem", color: "#fff" }}>Influenc<span style={{ color: "#60A5FA" }}>IA</span></span>
        </div>
        <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.75rem", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.2 }}>Welcome back</p>
        <p style={{ fontFamily: f.b, fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", marginTop: "0.375rem" }}>Sign in to continue</p>
      </div>

      {/* Form card */}
      <div style={{ flex: 1, background: "var(--card)", borderRadius: "1.5rem 1.5rem 0 0", marginTop: -24, padding: "1.75rem 1.375rem 1.5rem", overflowY: "auto", scrollbarWidth: "none" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>Email address</label>
            <div style={{ height: "2.875rem", borderRadius: "0.625rem", border: "1.5px solid #2563EB", background: "var(--input-background)", display: "flex", alignItems: "center", padding: "0 0.875rem" }}>
              <span style={{ fontFamily: f.b, fontSize: "0.9rem", color: "var(--muted-foreground)" }}>sarah@influencia.ai</span>
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
              <label style={{ fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>Password</label>
              <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "#2563EB" }}>Forgot?</span>
            </div>
            <div style={{ height: "2.875rem", borderRadius: "0.625rem", border: "1px solid var(--border)", background: "var(--input-background)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 0.875rem" }}>
              <span style={{ fontFamily: f.b, fontSize: "0.9rem", color: "var(--muted-foreground)", letterSpacing: "0.15em" }}>••••••••</span>
              <Eye size={16} style={{ color: "var(--muted-foreground)" }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={11} color="#fff" strokeWidth={3} />
            </div>
            <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Remember me</span>
          </div>
        </div>
        <button style={{ width: "100%", padding: "0.875rem", borderRadius: "0.625rem", background: "#2563EB", color: "#fff", border: "none", fontFamily: f.b, fontSize: "0.9375rem", fontWeight: 500, marginTop: "1.25rem", boxShadow: "var(--shadow-primary)" }}>
          Sign in
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1rem 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontFamily: f.b, fontSize: "0.8rem", color: "var(--muted-foreground)" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>
        <button style={{ width: "100%", padding: "0.875rem", borderRadius: "0.625rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.9rem", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
          <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.183l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/><path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
          Continue with Google
        </button>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", textAlign: "center", marginTop: "1.25rem" }}>
          No account? <span style={{ color: "#2563EB", fontWeight: 500 }}>Create one free</span>
        </p>
      </div>
    </div>
  );
}

/* ═══ REGISTER — ROLE SELECTION ═══ */
export function MobileRegisterScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--background)", overflow: "hidden" }}>
      <StatusBar />
      {/* Stepper header */}
      <div style={{ background: "var(--card)", borderBottom: "1px solid var(--border)", padding: "0.875rem 1.375rem", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
          <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9375rem", color: "var(--foreground)" }}>Create account</span>
          <span style={{ fontFamily: f.b, fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Step 1 of 4</span>
        </div>
        <div style={{ display: "flex", gap: "0.375rem" }}>
          {[1,2,3,4].map((i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i === 1 ? "#2563EB" : "var(--muted)" }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", padding: "1.5rem 1.375rem" }}>
        <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.5rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.5rem" }}>How will you use InfluencIA?</h2>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", marginBottom: "1.375rem" }}>Choose your role to personalise your experience.</p>

        {[
          { role: "creator", label: "I'm a Creator", desc: "Get discovered, collaborate, and get paid.", details: ["No minimum followers", "AI brand matching", "Secure payments"], color: "#7C3AED", bg: "#EDE9FE", selected: true },
          { role: "brand", label: "We're a Brand", desc: "Find authentic creators and measure ROI.", details: ["AI creator matching", "Campaign management", "Live analytics"], color: "#2563EB", bg: "#DBEAFE", selected: false },
        ].map((card) => (
          <div key={card.role} style={{ background: "var(--card)", border: `2px solid ${card.selected ? card.color : "var(--border)"}`, borderRadius: "1rem", padding: "1.25rem", marginBottom: "0.875rem", boxShadow: card.selected ? `0 0 0 4px ${card.color}20` : "none", position: "relative" }}>
            {card.selected && (
              <div style={{ position: "absolute", top: 14, right: 14, width: 22, height: 22, borderRadius: "50%", background: card.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={12} color="#fff" strokeWidth={3} />
              </div>
            )}
            <div style={{ width: 40, height: 40, borderRadius: "0.625rem", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
              <Users size={19} style={{ color: card.color }} />
            </div>
            <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1rem", color: "var(--foreground)", marginBottom: "0.25rem" }}>{card.label}</p>
            <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", marginBottom: "0.875rem" }}>{card.desc}</p>
            {card.details.map((d) => (
              <div key={d} style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.375rem" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: card.color }} />
                <span style={{ fontFamily: f.b, fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{d}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ padding: "1rem 1.375rem 2rem", background: "var(--card)", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
        <button style={{ width: "100%", padding: "0.875rem", borderRadius: "0.625rem", background: "#7C3AED", color: "#fff", border: "none", fontFamily: f.b, fontSize: "0.9375rem", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }}>
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
