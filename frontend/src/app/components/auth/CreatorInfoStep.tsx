import { useState } from "react";
import { ChevronDown, X, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

export interface CreatorInfo {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  phone: string;
  niches: string[];
  isAdult: boolean;
  termsAccepted: boolean;
}

const ALL_NICHES = [
  "Beauty & Skincare", "Lifestyle", "Fashion", "Fitness & Health",
  "Food & Cooking", "Travel", "Tech & Gaming", "Parenting",
  "Finance", "Sustainability", "Art & Design", "Photography",
  "Music", "Education", "Sports",
];

const COUNTRIES = [
  "Morocco", "France", "Algeria", "Tunisia", "Senegal",
  "Ivory Coast", "Belgium", "Switzerland", "Canada",
];

const inp: React.CSSProperties = {
  width: "100%", height: "2.625rem",
  padding: "0 0.875rem",
  borderRadius: "0.5rem",
  border: "1px solid var(--border)",
  background: "var(--input-background)",
  color: "var(--foreground)",
  fontFamily: f.b, fontSize: "0.875rem",
  outline: "none", boxSizing: "border-box",
  transition: "border-color .15s, box-shadow .15s",
};
const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  (e.target as HTMLElement).style.borderColor = "#2563EB";
  (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)";
};
const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  (e.target as HTMLElement).style.borderColor = "var(--border)";
  (e.target as HTMLElement).style.boxShadow = "none";
};

function Field({ label, hint, children, required }: { label: string; hint?: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
      <label style={{ fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>
        {label} {required && <span style={{ color: "#EC4899" }}>*</span>}
      </label>
      {children}
      {hint && <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{hint}</p>}
    </div>
  );
}

export function CreatorInfoStep({
  data,
  onChange,
}: {
  data: CreatorInfo;
  onChange: (d: Partial<CreatorInfo>) => void;
}) {
  const { t } = useTranslation("auth", { keyPrefix: "register" });
  const [nicheInput, setNicheInput] = useState("");

  const toggleNiche = (n: string) => {
    const current = data.niches;
    if (current.includes(n)) {
      onChange({ niches: current.filter((x) => x !== n) });
    } else if (current.length < 4) {
      onChange({ niches: [...current, n] });
    }
  };

  const filtered = ALL_NICHES.filter(
    (n) => n.toLowerCase().includes(nicheInput.toLowerCase()) && !data.niches.includes(n)
  );

  return (
    <div>
      <div style={{ marginBottom: "1.75rem" }}>
        <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.5rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.375rem" }}>
          {t("creator_info.title")}
        </h2>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          {t("creator_info.desc")}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
        {/* Name row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
          <Field label={t("creator_info.fields.first_name")} required>
            <input
              type="text" placeholder="Yasmine" value={data.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              style={inp} onFocus={onFocus} onBlur={onBlur}
            />
          </Field>
          <Field label={t("creator_info.fields.last_name")} required>
            <input
              type="text" placeholder="Benali" value={data.lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
              style={inp} onFocus={onFocus} onBlur={onBlur}
            />
          </Field>
        </div>

        {/* Country + City */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
          <Field label={t("creator_info.fields.country")} required>
            <div style={{ position: "relative" }}>
              <select
                value={data.country}
                onChange={(e) => onChange({ country: e.target.value })}
                style={{ ...inp, appearance: "none", paddingRight: "2.25rem", cursor: "pointer" }}
                onFocus={onFocus}
                onBlur={onBlur}
              >
                <option value="">{t("creator_info.fields.country_ph")}</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
            </div>
          </Field>
          <Field label={t("creator_info.fields.city")}>
            <input
              type="text" placeholder="Casablanca" value={data.city}
              onChange={(e) => onChange({ city: e.target.value })}
              style={inp} onFocus={onFocus} onBlur={onBlur}
            />
          </Field>
        </div>

        {/* Phone */}
        <Field label={t("creator_info.fields.phone")} hint={t("creator_info.fields.phone_hint")}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div style={{ position: "relative", width: 100, flexShrink: 0 }}>
              <select
                style={{ ...inp, appearance: "none", paddingRight: "1.75rem", cursor: "pointer", width: "100%" }}
                onFocus={onFocus} onBlur={onBlur}
              >
                <option>+212</option>
                <option>+33</option>
                <option>+1</option>
                <option>+44</option>
              </select>
              <ChevronDown size={12} style={{ position: "absolute", right: "0.5rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
            </div>
            <input
              type="tel" placeholder="06 12 34 56 78" value={data.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              style={{ ...inp, flex: 1 }} onFocus={onFocus} onBlur={onBlur}
            />
          </div>
        </Field>

        {/* Niches */}
        <Field label={t("creator_info.fields.niches")} hint={`${t("creator_info.fields.niches_hint")} ${data.niches.length}/4 ${t("creator_info.fields.niches_selected")}`} required>
          {/* Selected chips */}
          {data.niches.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "0.5rem" }}>
              {data.niches.map((n) => (
                <span
                  key={n}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.375rem",
                    padding: "0.25rem 0.625rem", borderRadius: 999,
                    background: "#EDE9FE", color: "#5B21B6",
                    fontFamily: f.b, fontSize: "0.8rem", fontWeight: 500,
                  }}
                >
                  {n}
                  <button onClick={() => toggleNiche(n)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0, color: "#7C3AED" }}>
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
          {/* Search input */}
          {data.niches.length < 4 && (
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder={t("creator_info.fields.niches_ph")}
                value={nicheInput}
                onChange={(e) => setNicheInput(e.target.value)}
                style={inp}
                onFocus={onFocus}
                onBlur={(e) => {
                  onBlur(e);
                  setTimeout(() => setNicheInput(""), 150);
                }}
              />
              {nicheInput && filtered.length > 0 && (
                <div
                  style={{
                    position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
                    background: "var(--card)", border: "1px solid var(--border)",
                    borderRadius: "0.5rem", padding: "0.375rem",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 10,
                    maxHeight: 160, overflowY: "auto",
                  }}
                >
                  {filtered.slice(0, 6).map((n) => (
                    <button
                      key={n}
                      onMouseDown={() => toggleNiche(n)}
                      style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "0.5rem 0.75rem", borderRadius: "0.375rem",
                        background: "none", border: "none", cursor: "pointer",
                        fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)",
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Quick tags */}
          {!nicheInput && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginTop: "0.5rem" }}>
              {ALL_NICHES.filter(n => !data.niches.includes(n)).slice(0, 8).map((n) => (
                <button
                  key={n}
                  onClick={() => toggleNiche(n)}
                  disabled={data.niches.length >= 4}
                  style={{
                    padding: "0.25rem 0.625rem", borderRadius: 999, cursor: "pointer",
                    background: "var(--muted)", color: "var(--muted-foreground)",
                    border: "1px solid var(--border)",
                    fontFamily: f.b, fontSize: "0.75rem",
                    opacity: data.niches.length >= 4 ? 0.4 : 1,
                    transition: "all .15s",
                  }}
                >
                  + {n}
                </button>
              ))}
            </div>
          )}
        </Field>

        {/* Legal */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", padding: "1rem", background: "var(--background)", borderRadius: "0.625rem", border: "1px solid var(--border)" }}>
          {[
            {
              key: "isAdult" as const,
              label: t("creator_info.legal.adult"),
              required: true,
            },
            {
              key: "termsAccepted" as const,
              label: t("creator_info.legal.terms"),
              required: true,
            },
          ].map((item) => (
            <label key={item.key} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", cursor: "pointer" }}>
              <div
                onClick={() => onChange({ [item.key]: !data[item.key] })}
                style={{
                  width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 2,
                  border: `2px solid ${data[item.key] ? "#7C3AED" : "var(--border)"}`,
                  background: data[item.key] ? "#7C3AED" : "var(--input-background)",
                  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  transition: "all .15s",
                }}
              >
                {data[item.key] && <Check size={11} color="#fff" strokeWidth={3} />}
              </div>
              <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)", lineHeight: 1.5 }}>
                {item.label}
                {item.required && <span style={{ color: "#EC4899", marginLeft: 2 }}>*</span>}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
