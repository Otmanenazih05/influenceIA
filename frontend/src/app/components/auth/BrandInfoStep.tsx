import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

export interface BrandInfo {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
}

const INDUSTRIES = [
  "Beauty & Cosmetics", "Fashion & Apparel", "Food & Beverage",
  "Health & Wellness", "Tech & Software", "Travel & Hospitality",
  "Finance & Banking", "Education & E-Learning", "Sports & Fitness",
  "Home & Lifestyle", "Automotive", "Media & Entertainment",
  "Retail & E-Commerce", "B2B Services", "Other",
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

function Field({ label, children, required, hint }: { label: string; children: React.ReactNode; required?: boolean; hint?: string }) {
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

export function BrandInfoStep({
  data,
  onChange,
}: {
  data: BrandInfo;
  onChange: (d: Partial<BrandInfo>) => void;
}) {
  const { t } = useTranslation("auth", { keyPrefix: "register" });
  return (
    <div>
      <div style={{ marginBottom: "1.75rem" }}>
        <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.5rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.375rem" }}>
          {t("brand_info.title")}
        </h2>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          {t("brand_info.desc")}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
        {/* Company + contact name */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
          <Field label={t("brand_info.fields.company")} required>
            <input
              type="text" placeholder={t("brand_info.fields.company_ph")} value={data.companyName}
              onChange={(e) => onChange({ companyName: e.target.value })}
              style={inp} onFocus={onFocus} onBlur={onBlur}
            />
          </Field>
          <Field label={t("brand_info.fields.contact")} required>
            <input
              type="text" placeholder={t("brand_info.fields.contact_ph")} value={data.contactName}
              onChange={(e) => onChange({ contactName: e.target.value })}
              style={inp} onFocus={onFocus} onBlur={onBlur}
            />
          </Field>
        </div>

        {/* Email */}
        <Field label={t("brand_info.fields.email")} required hint={t("brand_info.fields.email_hint")}>
          <input
            type="email" placeholder="karim@glowlab.ma" value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            style={inp} onFocus={onFocus} onBlur={onBlur}
          />
        </Field>

        {/* Phone + Website */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
          <Field label={t("brand_info.fields.phone")}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <div style={{ position: "relative", width: 80, flexShrink: 0 }}>
                <select
                  style={{ ...inp, appearance: "none", paddingRight: "1.5rem", cursor: "pointer", width: "100%", paddingLeft: "0.5rem" }}
                  onFocus={onFocus} onBlur={onBlur}
                >
                  <option>+212</option>
                  <option>+33</option>
                  <option>+1</option>
                </select>
                <ChevronDown size={11} style={{ position: "absolute", right: "0.375rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
              </div>
              <input
                type="tel" placeholder="06 00 00 00 00" value={data.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                style={{ ...inp, flex: 1 }} onFocus={onFocus} onBlur={onBlur}
              />
            </div>
          </Field>
          <Field label={t("brand_info.fields.website")}>
            <input
              type="url" placeholder="https://glowlab.ma" value={data.website}
              onChange={(e) => onChange({ website: e.target.value })}
              style={inp} onFocus={onFocus} onBlur={onBlur}
            />
          </Field>
        </div>

        {/* Industry */}
        <Field label={t("brand_info.fields.industry")} required hint={t("brand_info.fields.industry_hint")}>
          <div style={{ position: "relative" }}>
            <select
              value={data.industry}
              onChange={(e) => onChange({ industry: e.target.value })}
              style={{ ...inp, appearance: "none", paddingRight: "2.25rem", cursor: "pointer" }}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              <option value="">{t("brand_info.fields.industry_ph")}</option>
              {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
            </select>
            <ChevronDown size={14} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
          </div>
        </Field>

        {/* Brand size hint */}
        <div
          style={{
            display: "flex", gap: "0.75rem", padding: "1rem",
            background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "0.625rem",
          }}
        >
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            <span style={{ fontFamily: f.h, fontWeight: 800, fontSize: "0.6rem", color: "#fff" }}>i</span>
          </div>
          <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "#1E40AF", lineHeight: 1.6 }}>
            {t("brand_info.hint")}
          </p>
        </div>
      </div>
    </div>
  );
}
