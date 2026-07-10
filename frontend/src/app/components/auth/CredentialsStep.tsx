import { useState } from "react";
import { Eye, EyeOff, CheckCircle, XCircle, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

export interface Credentials {
  email: string;
  password: string;
  confirmPassword: string;
}

function scorePassword(pw: string, t: any): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: "", color: "var(--muted)" };
  let score = 0;
  if (pw.length >= 8)  score += 25;
  if (pw.length >= 12) score += 15;
  if (/[A-Z]/.test(pw)) score += 20;
  if (/[0-9]/.test(pw)) score += 20;
  if (/[^A-Za-z0-9]/.test(pw)) score += 20;
  if (score < 40)  return { score, label: t("credentials.pwd_weak"),   color: "#EF4444" };
  if (score < 70)  return { score, label: t("credentials.pwd_fair"),   color: "#F59E0B" };
  if (score < 90)  return { score, label: t("credentials.pwd_good"),   color: "#3B82F6" };
  return { score,                 label: t("credentials.pwd_strong"), color: "#10B981" };
}

const inp: React.CSSProperties = {
  width: "100%", height: "2.75rem",
  padding: "0 2.75rem 0 0.875rem",
  borderRadius: "0.5rem",
  border: "1px solid var(--border)",
  background: "var(--input-background)",
  color: "var(--foreground)",
  fontFamily: f.b, fontSize: "0.9rem",
  outline: "none", boxSizing: "border-box",
  transition: "border-color .15s, box-shadow .15s",
};
const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.target.style.borderColor = "#2563EB";
  e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)";
};
const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  e.target.style.borderColor = "var(--border)";
  e.target.style.boxShadow = "none";
};

function PasswordRequirement({ met, label }: { met: boolean; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
      {met
        ? <CheckCircle size={13} style={{ color: "#10B981", flexShrink: 0 }} />
        : <XCircle size={13} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
      }
      <span style={{ fontFamily: f.b, fontSize: "0.8rem", color: met ? "var(--foreground)" : "var(--muted-foreground)" }}>
        {label}
      </span>
    </div>
  );
}

export function CredentialsStep({
  data,
  role,
  onChange,
}: {
  data: Credentials;
  role: "influencer" | "brand" | null;
  onChange: (d: Partial<Credentials>) => void;
}) {
  const { t } = useTranslation("auth", { keyPrefix: "register" });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const strength = scorePassword(data.password, t);
  const passwordsMatch = data.password === data.confirmPassword && data.confirmPassword.length > 0;

  return (
    <div>
      <div style={{ marginBottom: "1.75rem" }}>
        <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.5rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.375rem" }}>
          {t("credentials.title")}
        </h2>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          {t("credentials.desc")}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Email */}
        <div>
          <label style={{ display: "block", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
            {t("credentials.email")} <span style={{ color: "#EC4899" }}>*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder={t("credentials.email_ph")}
            style={inp}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>

        {/* Password */}
        <div>
          <label style={{ display: "block", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
            {t("credentials.password")} <span style={{ color: "#EC4899" }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPw ? "text" : "password"}
              value={data.password}
              onChange={(e) => onChange({ password: e.target.value })}
              placeholder={t("credentials.password_ph")}
              style={inp}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Strength bar */}
          {data.password.length > 0 && (
            <div style={{ marginTop: "0.625rem" }}>
              <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.5rem" }}>
                {[25, 50, 75, 100].map((threshold) => (
                  <div
                    key={threshold}
                    style={{
                      flex: 1, height: 3, borderRadius: 999,
                      background: strength.score >= threshold ? strength.color : "var(--muted)",
                      transition: "background .3s",
                    }}
                  />
                ))}
              </div>
              <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: strength.color, fontWeight: 500 }}>
                {strength.label}
              </p>
            </div>
          )}

          {/* Requirements */}
          {data.password.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.375rem", marginTop: "0.625rem" }}>
              <PasswordRequirement met={data.password.length >= 8}  label={t("credentials.req_len")} />
              <PasswordRequirement met={/[A-Z]/.test(data.password)} label={t("credentials.req_up")} />
              <PasswordRequirement met={/[0-9]/.test(data.password)} label={t("credentials.req_num")} />
              <PasswordRequirement met={/[^A-Za-z0-9]/.test(data.password)} label={t("credentials.req_spec")} />
            </div>
          )}
        </div>

        {/* Confirm password */}
        <div>
          <label style={{ display: "block", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
            {t("credentials.confirm")} <span style={{ color: "#EC4899" }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showConfirm ? "text" : "password"}
              value={data.confirmPassword}
              onChange={(e) => onChange({ confirmPassword: e.target.value })}
              placeholder={t("credentials.confirm_ph")}
              style={{
                ...inp,
                borderColor: data.confirmPassword.length > 0
                  ? (passwordsMatch ? "#10B981" : "#EF4444")
                  : "var(--border)",
              }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {data.confirmPassword.length > 0 && (
            <p style={{ fontFamily: f.b, fontSize: "0.75rem", marginTop: "0.375rem", color: passwordsMatch ? "#10B981" : "#EF4444", display: "flex", alignItems: "center", gap: 4 }}>
              {passwordsMatch
                ? <><CheckCircle size={12} /> {t("credentials.match_yes")}</>
                : <><XCircle size={12} /> {t("credentials.match_no")}</>}
            </p>
          )}
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontFamily: f.b, fontSize: "0.8rem", color: "var(--muted-foreground)", whiteSpace: "nowrap" }}>{t("credentials.or")}</span>
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
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.183l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
          {t("credentials.google")}
        </button>

        {/* Review summary */}
        <div style={{ padding: "1rem 1.125rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.875rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <Sparkles size={14} style={{ color: role === "influencer" ? "#7C3AED" : "#2563EB" }} />
            <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>
              {t("credentials.summary_title")}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>{t("credentials.summary_type")}</span>
              <span style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)", textTransform: "capitalize" }}>
                {role === "influencer" ? t("credentials.summary_type_creator") : t("credentials.summary_type_brand")}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>{t("credentials.summary_plan")}</span>
              <span style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "#10B981" }}>{t("credentials.summary_plan_value")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>{t("credentials.summary_score")}</span>
              <span style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)" }}>
                {role === "influencer" ? t("credentials.summary_score_creator") : t("credentials.summary_score_brand")}
              </span>
            </div>
          </div>
        </div>

        {/* Terms */}
        <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", textAlign: "center", lineHeight: 1.65 }}>
          {t("credentials.terms_start")}
          <Link to="/terms" style={{ color: "#2563EB", textDecoration: "none" }}>{t("credentials.terms_tos")}</Link>
          {t("credentials.terms_and")}
          <Link to="/privacy" style={{ color: "#2563EB", textDecoration: "none" }}>{t("credentials.terms_privacy")}</Link>{t("credentials.terms_end")}
        </p>
      </div>
    </div>
  );
}
