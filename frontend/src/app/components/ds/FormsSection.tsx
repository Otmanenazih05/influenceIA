import { useState } from "react";
import { Eye, EyeOff, Search, ChevronDown, Calendar, Check } from "lucide-react";
import { SectionHeader, SubSection, DSCard, Label } from "./DSLayout";

function FieldWrapper({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
        {label}
      </label>
      {children}
      {hint && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.25rem" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

const inputBase: React.CSSProperties = {
  width: "100%",
  height: "2.375rem",
  padding: "0 0.75rem",
  borderRadius: "0.5rem",
  border: "1px solid var(--border)",
  background: "var(--input-background)",
  color: "var(--foreground)",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.875rem",
  fontWeight: 400,
  outline: "none",
  transition: "border-color 0.15s",
  boxSizing: "border-box",
};

export function FormsSection() {
  const [showPw, setShowPw] = useState(false);
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState("instagram");
  const [toggled, setToggled] = useState(true);

  return (
    <div>
      <SectionHeader
        title="Form Inputs"
        description="All input components with their states: default, focus, filled, error, disabled."
      />

      <SubSection title="Text Inputs">
        <DSCard>
          <div className="grid sm:grid-cols-2 gap-5">
            <FieldWrapper label="Full Name" hint="Used as your public display name">
              <input
                type="text"
                placeholder="Your Name"
                defaultValue="Sarah Benjelloun"
                style={inputBase}
                onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
              />
            </FieldWrapper>
            <FieldWrapper label="Email" hint="example@email.com">
              <input
                type="email"
                placeholder="example@email.com"
                style={inputBase}
                onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
              />
            </FieldWrapper>
            <FieldWrapper label="Error State">
              <input
                type="text"
                defaultValue="invalid-email"
                style={{ ...inputBase, borderColor: "var(--destructive)", boxShadow: "0 0 0 3px rgba(239,68,68,0.12)" }}
              />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--destructive)", marginTop: "0.25rem" }}>
                Please enter a valid email address.
              </p>
            </FieldWrapper>
            <FieldWrapper label="Disabled State">
              <input
                type="text"
                value="Not editable"
                disabled
                style={{ ...inputBase, opacity: 0.5, cursor: "not-allowed" }}
              />
            </FieldWrapper>
          </div>
        </DSCard>
      </SubSection>

      <SubSection title="Password Field">
        <DSCard className="max-w-sm">
          <FieldWrapper label="Password" hint="Minimum 8 characters">
            <div style={{ position: "relative" }}>
              <input
                type={showPw ? "text" : "password"}
                defaultValue="securepass123"
                style={{ ...inputBase, paddingRight: "2.5rem" }}
                onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
              />
              <button
                onClick={() => setShowPw(!showPw)}
                style={{ position: "absolute", right: "0.625rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </FieldWrapper>
        </DSCard>
      </SubSection>

      <SubSection title="Search & Select">
        <DSCard>
          <div className="grid sm:grid-cols-2 gap-5">
            <FieldWrapper label="Search">
              <div style={{ position: "relative" }}>
                <Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }} />
                <input
                  type="search"
                  placeholder="Search influencers…"
                  style={{ ...inputBase, paddingLeft: "2.25rem" }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </FieldWrapper>

            <FieldWrapper label="Platform">
              <div style={{ position: "relative" }}>
                <select
                  style={{ ...inputBase, appearance: "none", paddingRight: "2.25rem", cursor: "pointer" }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                >
                  <option>Instagram</option>
                  <option>TikTok</option>
                  <option>YouTube</option>
                  <option>LinkedIn</option>
                </select>
                <ChevronDown size={14} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
              </div>
            </FieldWrapper>

            <FieldWrapper label="Budget Range">
              <div style={{ position: "relative" }}>
                <select
                  style={{ ...inputBase, appearance: "none", paddingRight: "2.25rem", cursor: "pointer" }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                >
                  <option value="">Select budget…</option>
                  <option>5 000 – 20 000 MAD</option>
                  <option>20 000 – 50 000 MAD</option>
                  <option>50 000+ MAD</option>
                </select>
                <ChevronDown size={14} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
              </div>
            </FieldWrapper>

            <FieldWrapper label="Date Picker">
              <div style={{ position: "relative" }}>
                <Calendar size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
                <input
                  type="date"
                  defaultValue="2024-05-20"
                  style={{ ...inputBase, paddingLeft: "2.25rem" }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </FieldWrapper>
          </div>
        </DSCard>
      </SubSection>

      <SubSection title="Textarea">
        <DSCard className="max-w-lg">
          <FieldWrapper label="Campaign Brief" hint="Describe your campaign goals, tone, and requirements.">
            <textarea
              rows={4}
              placeholder="Describe your campaign…"
              defaultValue="Launching a new skincare line targeting women aged 25–40. Looking for authentic content creators in the beauty and wellness niche."
              style={{
                ...inputBase,
                height: "auto",
                padding: "0.625rem 0.75rem",
                resize: "vertical",
                lineHeight: 1.6,
              }}
              onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
              onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
            />
          </FieldWrapper>
        </DSCard>
      </SubSection>

      <SubSection title="Checkbox, Radio & Toggle">
        <DSCard>
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Checkbox */}
            <div>
              <Label>Checkbox</Label>
              <div className="space-y-2 mt-1">
                {[
                  { label: "Instagram", checked: true },
                  { label: "TikTok", checked: true },
                  { label: "YouTube", checked: false },
                ].map((item) => (
                  <label key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                    <div
                      style={{
                        width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                        border: item.checked ? "none" : "2px solid var(--border)",
                        background: item.checked ? "var(--primary)" : "var(--input-background)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      {item.checked && <Check size={11} color="#fff" strokeWidth={3} />}
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "var(--foreground)" }}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Radio */}
            <div>
              <Label>Radio</Label>
              <div className="space-y-2 mt-1">
                {["instagram", "tiktok", "youtube"].map((platform) => (
                  <label key={platform} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }} onClick={() => setRadio(platform)}>
                    <div
                      style={{
                        width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                        border: radio === platform ? "none" : "2px solid var(--border)",
                        background: radio === platform ? "var(--primary)" : "var(--input-background)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: radio === platform ? "inset 0 0 0 3px var(--primary-foreground)" : "none",
                      }}
                    />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "var(--foreground)", textTransform: "capitalize" }}>
                      {platform}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Toggle */}
            <div>
              <Label>Toggle</Label>
              <div className="space-y-3 mt-1">
                {[
                  { label: "Email notifications", on: toggled },
                  { label: "Public profile", on: true },
                  { label: "Two-factor auth", on: false },
                ].map((item, i) => (
                  <label key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", cursor: "pointer" }} onClick={() => i === 0 && setToggled(!toggled)}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "var(--foreground)" }}>
                      {item.label}
                    </span>
                    <div
                      style={{
                        width: 36, height: 20, borderRadius: 999, flexShrink: 0,
                        background: item.on ? "var(--primary)" : "var(--switch-background)",
                        position: "relative",
                        transition: "background 0.2s",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 2, left: item.on ? 18 : 2,
                          width: 16, height: 16, borderRadius: "50%",
                          background: "#fff",
                          transition: "left 0.2s",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        }}
                      />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </DSCard>
      </SubSection>
    </div>
  );
}
