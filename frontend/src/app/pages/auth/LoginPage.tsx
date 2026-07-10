import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../../../lib/api";
import { useAuth } from "../../../contexts/AuthContext";
import { Eye, EyeOff, ArrowRight, Sparkles, TrendingUp, Star, Zap } from "lucide-react";
import { Logo } from "../../components/ui/Logo";
import { useTranslation } from "react-i18next";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

/* ─── Left panel brand panel ─── */
function BrandPanel() {
  const { t } = useTranslation("auth");
  const scoreR = 36;
  const scoreCirc = 2 * Math.PI * scoreR;
  const scoreFill = (87 / 100) * scoreCirc;

  return (
    <div
      style={{
        background: "#0B1628",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "3.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient gradients */}
      <div style={{ position: "absolute", top: -80, left: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
        <Logo iconSize={28} textSize="0.9375rem" />
      </Link>

      {/* Headline */}
      <div style={{ marginTop: "4rem", zIndex: 1 }}>
        <p style={{ fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.875rem" }}>
          {t("brand_panel.subtitle")}
        </p>
        <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.875rem", color: "#fff", lineHeight: 1.2, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
          {t("brand_panel.title1")}
          <span style={{ background: "linear-gradient(135deg, #60A5FA, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {t("brand_panel.title_highlight")}
          </span>
        </h2>
        <p style={{ fontFamily: f.b, fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
          {t("brand_panel.desc")}
        </p>
      </div>

      {/* Product UI snippets */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "1rem", zIndex: 1, paddingTop: "2.5rem" }}>
        {/* Creator score card */}
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0.875rem",
            padding: "1rem 1.125rem",
            backdropFilter: "blur(8px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <svg width={56} height={56} viewBox="0 0 80 80">
              <circle cx={40} cy={40} r={scoreR} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={6} />
              <circle cx={40} cy={40} r={scoreR} fill="none" stroke="#60A5FA" strokeWidth={6} strokeLinecap="round"
                strokeDasharray={`${scoreFill} ${scoreCirc - scoreFill}`}
                strokeDashoffset={scoreCirc / 4}
              />
              <text x={40} y={45} textAnchor="middle" style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1rem", fill: "#fff" }}>87</text>
            </svg>
            <div>
              <p style={{ fontFamily: f.b, fontWeight: 600, fontSize: "0.875rem", color: "#fff" }}>{t("brand_panel.card1.name")}</p>
              <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>{t("brand_panel.card1.info")}</p>
              <div style={{ display: "flex", gap: "0.375rem", marginTop: "0.375rem" }}>
                <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "rgba(96,165,250,0.15)", color: "#60A5FA", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600 }}>{t("brand_panel.card1.badge1")}</span>
                <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "rgba(167,139,250,0.15)", color: "#A78BFA", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600 }}>{t("brand_panel.card1.badge2")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign ROI card */}
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0.875rem",
            padding: "1rem 1.125rem",
            backdropFilter: "blur(8px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.25rem" }}>{t("brand_panel.card2.label")}</p>
              <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9rem", color: "#fff" }}>{t("brand_panel.card2.title")}</p>
              <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{t("brand_panel.card2.info")}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", justifyContent: "flex-end" }}>
                <TrendingUp size={13} style={{ color: "#34D399" }} />
                <span style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1.375rem", color: "#34D399", letterSpacing: "-0.03em" }}>3.7×</span>
              </div>
              <p style={{ fontFamily: f.b, fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>{t("brand_panel.card2.roi")}</p>
            </div>
          </div>
        </div>

        {/* Match badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.375rem", flex: 1 }}>
            {[0, 1, 2].map((idx) => (
              <div key={idx} style={{ flex: 1, padding: "0.625rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.5rem", textAlign: "center" }}>
                <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>{t(`brand_panel.metrics.${idx}.label`)}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.6rem", color: "rgba(255,255,255,0.4)" }}>{t(`brand_panel.metrics.${idx}.sub`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "1.5rem",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", gap: "0.625rem" }}>
          {[...Array(5)].map((_, i) => <Star key={i} size={12} style={{ color: "#FBBF24", fill: "#FBBF24" }} />)}
        </div>
        <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginTop: "0.625rem", fontStyle: "italic" }}>
          {t("brand_panel.testimonial.text")}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginTop: "0.875rem" }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.7rem", color: "#fff" }}>K</span>
          </div>
          <div>
            <p style={{ fontFamily: f.b, fontWeight: 600, fontSize: "0.8rem", color: "rgba(255,255,255,0.8)" }}>{t("brand_panel.testimonial.author")}</p>
            <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>{t("brand_panel.testimonial.role")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Input ─── */
const inp: React.CSSProperties = {
  width: "100%", height: "2.75rem",
  padding: "0 0.875rem",
  borderRadius: "0.5rem",
  border: "1px solid var(--border)",
  background: "var(--input-background)",
  color: "var(--foreground)",
  fontFamily: f.b, fontSize: "0.9rem",
  outline: "none", boxSizing: "border-box",
  transition: "border-color .15s, box-shadow .15s",
};
const focus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.target.style.borderColor = "#2563EB";
  e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)";
};
const blur = (e: React.FocusEvent<HTMLInputElement>) => {
  e.target.style.borderColor = "var(--border)";
  e.target.style.boxShadow = "none";
};

export function LoginPage() {
  const { t } = useTranslation("auth");
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/api/auth/login", { email, password });
      login(response.data.access_token, response.data.data);

      // Redirect based on role
      if (response.data.data?.role === "brand") {
        navigate("/brand");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "var(--card)" }}>
      {/* Left brand panel — hidden on mobile */}
      <div className="hidden lg:block" style={{ flexShrink: 0, width: "46%" }}>
        <BrandPanel />
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflowY: "auto", background: "var(--card)", minHeight: "100vh" }}>
        <div
          style={{
            width: "100%",
            maxWidth: 460,
            padding: "3rem 2.5rem",
          }}
        >
          {/* Mobile-only logo */}
          <div className="flex lg:hidden" style={{ display: "flex", alignItems: "center", marginBottom: "2.5rem" }}>
            <Logo iconSize={30} textSize="1rem" />
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.75rem", color: "var(--foreground)", letterSpacing: "-0.03em", marginBottom: "0.375rem" }}>
              {t("login.title")}
            </h1>
            <p style={{ fontFamily: f.b, fontSize: "0.9rem", color: "var(--muted-foreground)" }}>
              {t("login.desc")}
            </p>
          </div>

          {/* Form */}
          <form style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }} onSubmit={handleLogin}>
            {error && (
              <div style={{ padding: "0.75rem", borderRadius: "0.5rem", background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B", fontFamily: f.b, fontSize: "0.875rem" }}>
                {error}
              </div>
            )}
            <div>
              <label style={{ display: "block", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
                {t("login.email_label")}
              </label>
              <input
                type="email"
                placeholder={t("login.email_ph")}
                style={inp}
                onFocus={focus}
                onBlur={blur}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.375rem" }}>
                <label style={{ fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>
                  {t("login.password_label")}
                </label>
                <Link to="/forgot-password" style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "#2563EB", textDecoration: "none" }}>
                  {t("login.forgot_password")}
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  placeholder={t("login.password_ph")}
                  style={{ ...inp, paddingRight: "2.75rem" }}
                  onFocus={focus}
                  onBlur={blur}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div
                style={{
                  width: 18, height: 18, borderRadius: 4, border: "2px solid var(--border)",
                  background: "var(--input-background)", cursor: "pointer", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              />
              <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                {t("login.remember")}
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%", padding: "0.75rem", borderRadius: "0.625rem",
                background: isLoading ? "var(--muted)" : "#2563EB",
                color: isLoading ? "var(--muted-foreground)" : "#fff",
                border: "none", cursor: isLoading ? "default" : "pointer",
                fontFamily: f.b, fontSize: "0.9375rem", fontWeight: 500,
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                boxShadow: isLoading ? "none" : "var(--shadow-primary)",
                transition: "opacity .15s",
              }}
            >
              {isLoading ? t("login.btn_loading") : t("login.btn")} {!isLoading && <ArrowRight size={16} />}
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <span style={{ fontFamily: f.b, fontSize: "0.8rem", color: "var(--muted-foreground)", whiteSpace: "nowrap" }}>{t("login.or")}</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            {/* Google */}
            <button
              type="button"
              style={{
                width: "100%", padding: "0.75rem", borderRadius: "0.625rem",
                border: "1px solid var(--border)", background: "var(--card)", cursor: "pointer",
                fontFamily: f.b, fontSize: "0.9rem", fontWeight: 500, color: "var(--foreground)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.625rem",
              }}
            >
              {/* Google icon */}
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.183l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" />
                <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" />
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" />
              </svg>
              {t("login.google")}
            </button>
          </form>

          <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", textAlign: "center", marginTop: "1.75rem" }}>
            {t("login.no_account")}
            <Link to="/register" style={{ color: "#2563EB", fontWeight: 500, textDecoration: "none" }}>
              {t("login.create")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
