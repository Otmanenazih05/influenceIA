import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft, ArrowRight, Check,
  Plus, X, ChevronDown, Sparkles, CheckCircle, Zap, Loader2
} from "lucide-react";
import { TiktokIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "../../components/ui/SocialIcons";
import api from "../../../lib/api";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

const STEPS = [
  { label: "Brief",       short: "Brief" },
  { label: "Platforms",   short: "Platforms" },
  { label: "Deliverables", short: "Deliver." },
  { label: "Creators",    short: "Creators" },
  { label: "Location",    short: "Location" },
  { label: "Budget",      short: "Budget" },
  { label: "Deadlines",   short: "Dates" },
  { label: "Review",      short: "Review" },
];

const NICHES = ["Beauty & Skincare", "Lifestyle", "Fashion & Style", "Fitness & Health", "Food & Cooking", "Travel", "Tech & Gaming", "Parenting", "Finance", "Sustainability", "Art & Design", "Photography", "Music", "Education", "Sports"];
const OBJECTIVES = ["Brand awareness", "Product launch", "Sales & conversions", "App downloads", "Community building", "Event promotion", "Rebranding"];
const INDUSTRIES = ["Beauty & Cosmetics", "Fashion & Apparel", "Food & Beverage", "Health & Wellness", "Tech & Software", "Travel & Hospitality", "Finance & Banking", "Education", "Sports & Fitness", "Home & Lifestyle", "Automotive", "Media & Entertainment", "Retail"];
const COUNTRIES = ["Morocco", "France", "Algeria", "Tunisia", "Belgium", "Switzerland", "Canada", "UAE", "Senegal", "Ivory Coast"];

interface Draft {
  title: string; category: string; objectives: string[]; brief: string; campaignType: string;
  platforms: string[]; formats: Record<string, string[]>;
  deliverables: { platform: string; type: string; count: number; specs: string }[]; contentGuidelines: string;
  niches: string[]; followerTiers: string[]; genderPref: string; minEngagement: string;
  creatorLocations: string[]; audienceLocation: string; language: string;
  totalBudget: string; budgetPerCreator: string; paymentModel: string; budgetNote: string;
  applicationDeadline: string; submissionDeadline: string; publicationDate: string; campaignEnd: string;
}

const EMPTY: Draft = {
  title: "", category: "", objectives: [], brief: "", campaignType: "paid",
  platforms: [], formats: {},
  deliverables: [], contentGuidelines: "",
  niches: [], followerTiers: [], genderPref: "all", minEngagement: "3",
  creatorLocations: [], audienceLocation: "Morocco", language: "French, Darija",
  totalBudget: "", budgetPerCreator: "", paymentModel: "fixed", budgetNote: "",
  applicationDeadline: "", submissionDeadline: "", publicationDate: "", campaignEnd: "",
};

const inp: React.CSSProperties = { width: "100%", height: "2.625rem", padding: "0 0.875rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--input-background)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.875rem", outline: "none", boxSizing: "border-box", transition: "border-color .15s" };
const onF = (e: React.FocusEvent<any>) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; };
const onB = (e: React.FocusEvent<any>) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; };

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
        {label}{required && <span style={{ color: "#EC4899", marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {hint && <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.25rem" }}>{hint}</p>}
    </div>
  );
}

function ToggleChip({ label, selected, onClick, color }: { label: string; selected: boolean; onClick: () => void; color?: string }) {
  return (
    <button aria-pressed={selected} onClick={onClick} style={{ padding: "0.3125rem 0.875rem", borderRadius: "2rem", border: `1.5px solid ${selected ? (color ?? "var(--primary)") : "var(--border)"}`, background: selected ? `${color ?? "#2563EB"}12` : "var(--card)", color: selected ? (color ?? "var(--primary)") : "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: selected ? 500 : 400, transition: "all .15s", whiteSpace: "nowrap" }}>
      {selected && <Check size={10} style={{ marginRight: 4 }} />}{label}
    </button>
  );
}

/* ─── Steps ─── */
function Step1({ draft, set }: { draft: Draft; set: (d: Partial<Draft>) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <Field label="Campaign title" required hint="Use a specific, descriptive name. This is shown to creators.">
        <input type="text" value={draft.title} onChange={(e) => set({ title: e.target.value })} placeholder="e.g. Summer Skincare Lancement 2024" style={inp} onFocus={onF} onBlur={onB} />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
        <Field label="Campaign type" required>
          <div style={{ position: "relative" }}>
            <select value={draft.campaignType} onChange={(e) => set({ campaignType: e.target.value })} style={{ ...inp, appearance: "none", paddingRight: "2rem", cursor: "pointer" }} onFocus={onF} onBlur={onB}>
              <option value="paid">Paid collaboration</option>
              <option value="gifted">Gifted / Product seeding</option>
              <option value="ambassador">Ambassador programme</option>
              <option value="affiliate">Affiliate / Commission</option>
            </select>
            <ChevronDown size={13} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
          </div>
        </Field>
        <Field label="Industry / Category" required>
          <div style={{ position: "relative" }}>
            <select value={draft.category} onChange={(e) => set({ category: e.target.value })} style={{ ...inp, appearance: "none", paddingRight: "2rem", cursor: "pointer" }} onFocus={onF} onBlur={onB}>
              <option value="">Select category</option>
              {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
            </select>
            <ChevronDown size={13} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
          </div>
        </Field>
      </div>
      <Field label="Campaign objectives" hint="Select all that apply.">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
          {OBJECTIVES.map((obj) => (
            <ToggleChip key={obj} label={obj} selected={draft.objectives.includes(obj)}
              onClick={() => set({ objectives: draft.objectives.includes(obj) ? draft.objectives.filter((o) => o !== obj) : [...draft.objectives, obj] })}
            />
          ))}
        </div>
      </Field>
      <Field label="Campaign brief" required hint="Describe your brand, what the campaign is about, tone, and what authentic content looks like to you. This is your pitch to creators.">
        <textarea rows={5} value={draft.brief} onChange={(e) => set({ brief: e.target.value })} placeholder="Tell creators about your brand, the campaign goal, the content tone you're looking for, and any key messages or themes you want them to convey…" style={{ ...inp, height: "auto", padding: "0.75rem 0.875rem", resize: "vertical", lineHeight: 1.7 }} onFocus={onF} onBlur={onB} />
        <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: draft.brief.length > 600 ? "#EF4444" : "var(--muted-foreground)", textAlign: "right", marginTop: 2 }}>{draft.brief.length}/600</p>
      </Field>
    </div>
  );
}

function Step2({ draft, set }: { draft: Draft; set: (d: Partial<Draft>) => void }) {
  const platforms = [
    { id: "instagram", label: "Instagram", icon: <InstagramIcon size={20} />, color: "#E1306C", formats: ["Reels", "Stories", "Posts", "Carousels", "Live"] },
    { id: "tiktok",    label: "TikTok",    icon: <TiktokIcon size={20} />,      color: "#010101", formats: ["Short videos", "Duets", "Stitches"] },
    { id: "youtube",   label: "YouTube",   icon: <YoutubeIcon size={20} />,   color: "#FF0000", formats: ["Shorts", "Long-form vlog", "Review video"] },
    { id: "facebook",  label: "Facebook",  icon: <FacebookIcon size={20} />,  color: "#1877F2", formats: ["Reels", "Stories", "Posts", "Live"] },
  ];
  const togglePlatform = (id: string) => {
    const next = draft.platforms.includes(id) ? draft.platforms.filter((p) => p !== id) : [...draft.platforms, id];
    set({ platforms: next });
  };
  const toggleFormat = (platform: string, fmt: string) => {
    const cur = draft.formats[platform] ?? [];
    set({ formats: { ...draft.formats, [platform]: cur.includes(fmt) ? cur.filter((f) => f !== fmt) : [...cur, fmt] } });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Select the platforms where you want content published, then specify the format types for each.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.875rem" }}>
        {platforms.map((p) => {
          const selected = draft.platforms.includes(p.id);
          return (
            <div key={p.id} style={{ border: `2px solid ${selected ? p.color : "var(--border)"}`, borderRadius: "0.875rem", overflow: "hidden", background: "var(--card)", boxShadow: selected ? `0 0 0 3px ${p.color}20` : "none", transition: "all .15s" }}>
              <button aria-pressed={selected} onClick={() => togglePlatform(p.id)} style={{ width: "100%", padding: "1rem", display: "flex", alignItems: "center", gap: "0.75rem", background: selected ? `${p.color}08` : "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ color: p.color }}>{p.icon}</span>
                <span style={{ fontFamily: f.b, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>{p.label}</span>
                {selected && <CheckCircle size={16} style={{ marginLeft: "auto", color: p.color }} />}
              </button>
              {selected && (
                <div style={{ padding: "0 1rem 1rem" }}>
                  <p style={{ fontFamily: f.b, fontSize: "0.72rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.5rem" }}>Content formats</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                    {p.formats.map((fmt) => {
                      const fmtSelected = (draft.formats[p.id] ?? []).includes(fmt);
                      return (
                        <button aria-pressed={fmtSelected} key={fmt} onClick={() => toggleFormat(p.id, fmt)} style={{ padding: "0.2rem 0.625rem", borderRadius: 999, border: `1.5px solid ${fmtSelected ? p.color : "var(--border)"}`, background: fmtSelected ? `${p.color}12` : "var(--muted)", color: fmtSelected ? p.color : "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.75rem", fontWeight: fmtSelected ? 600 : 400 }}>
                          {fmt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Step3({ draft, set }: { draft: Draft; set: (d: Partial<Draft>) => void }) {
  const addDeliverable = () => {
    set({ deliverables: [...draft.deliverables, { platform: draft.platforms[0] ?? "instagram", type: "Reel", count: 1, specs: "" }] });
  };
  const updateDel = (i: number, upd: Partial<typeof draft.deliverables[0]>) => {
    const next = [...draft.deliverables];
    next[i] = { ...next[i], ...upd };
    set({ deliverables: next });
  };
  const removeDel = (i: number) => set({ deliverables: draft.deliverables.filter((_, idx) => idx !== i) });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
          <div>
            <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>Content deliverables</p>
            <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>Define exactly what each creator must deliver.</p>
          </div>
          <button onClick={addDeliverable} style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.4375rem 0.875rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem" }}>
            <Plus size={13} /> Add deliverable
          </button>
        </div>
        {draft.deliverables.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2.5rem", background: "var(--background)", border: "1px dashed var(--border)", borderRadius: "0.75rem" }}>
            <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", marginBottom: "0.625rem" }}>No deliverables added yet</p>
            <button onClick={addDeliverable} style={{ padding: "0.4375rem 0.875rem", borderRadius: "0.5rem", background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem" }}>
              + Add your first deliverable
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {draft.deliverables.map((d, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto auto", gap: "0.625rem", alignItems: "center", padding: "0.875rem 1rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem" }}>
                <div style={{ position: "relative" }}>
                  <select value={d.platform} onChange={(e) => updateDel(i, { platform: e.target.value })} style={{ ...inp, appearance: "none", paddingRight: "1.75rem" }} onFocus={onF} onBlur={onB}>
                    {draft.platforms.map((p) => <option key={p} value={p} style={{ textTransform: "capitalize" }}>{p}</option>)}
                  </select>
                  <ChevronDown size={12} style={{ position: "absolute", right: "0.5rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
                </div>
                <input type="text" value={d.type} onChange={(e) => updateDel(i, { type: e.target.value })} placeholder="e.g. Reel (60s)" style={inp} onFocus={onF} onBlur={onB} />
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <button aria-label="Decrease quantity" onClick={() => updateDel(i, { count: Math.max(1, d.count - 1) })} style={{ width: 28, height: 28, borderRadius: "0.375rem", border: "1px solid var(--border)", background: "var(--card)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>−</button>
                  <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1rem", color: "var(--foreground)", minWidth: 20, textAlign: "center" }}>{d.count}</span>
                  <button aria-label="Increase quantity" onClick={() => updateDel(i, { count: d.count + 1 })} style={{ width: 28, height: 28, borderRadius: "0.375rem", border: "1px solid var(--border)", background: "var(--card)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>+</button>
                </div>
                <button aria-label="Remove deliverable" onClick={() => removeDel(i)} style={{ width: 28, height: 28, borderRadius: "0.375rem", border: "1px solid #FECACA", background: "#FEF2F2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#991B1B" }}>
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Field label="Content guidelines" hint="Share your brand voice, dos and don'ts, product mentions, hashtags, and any mandatory elements.">
        <textarea rows={4} value={draft.contentGuidelines} onChange={(e) => set({ contentGuidelines: e.target.value })} placeholder="e.g. Content must feel authentic and personal. Product should be featured in the first 5 seconds. Use hashtag #GlowLabMA. Avoid competitor mentions…" style={{ ...inp, height: "auto", padding: "0.75rem 0.875rem", resize: "vertical", lineHeight: 1.65 }} onFocus={onF} onBlur={onB} />
      </Field>
    </div>
  );
}

function Step4({ draft, set }: { draft: Draft; set: (d: Partial<Draft>) => void }) {
  const tiers = [
    { id: "nano",  label: "Nano creators",  range: "500 – 10K followers",  desc: "Highest engagement, hyper-niche audiences, most cost-effective" },
    { id: "micro", label: "Micro creators", range: "10K – 100K followers", desc: "Strong trust, niche focus, great conversion rates" },
    { id: "macro", label: "Macro creators", range: "100K – 1M followers",  desc: "Broad reach, established content quality" },
    { id: "mega",  label: "Mega creators",  range: "1M+ followers",        desc: "Maximum visibility, premium campaigns" },
  ];
  const toggleTier = (id: string) => {
    set({ followerTiers: draft.followerTiers.includes(id) ? draft.followerTiers.filter((t) => t !== id) : [...draft.followerTiers, id] });
  };
  const toggleNiche = (n: string) => {
    set({ niches: draft.niches.includes(n) ? draft.niches.filter((x) => x !== n) : [...draft.niches, n] });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Field label="Creator niches" hint="Select relevant content categories.">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
          {NICHES.map((n) => <ToggleChip key={n} label={n} selected={draft.niches.includes(n)} onClick={() => toggleNiche(n)} />)}
        </div>
      </Field>
      <Field label="Follower tier" hint="Select the creator size categories you want to target. We recommend including nano and micro for most campaigns.">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginTop: "0.25rem" }}>
          {tiers.map((t) => {
            const selected = draft.followerTiers.includes(t.id);
            return (
              <button key={t.id} onClick={() => toggleTier(t.id)} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem 1rem", borderRadius: "0.75rem", border: `1.5px solid ${selected ? "var(--primary)" : "var(--border)"}`, background: selected ? "#EFF6FF" : "var(--card)", cursor: "pointer", textAlign: "left", transition: "all .15s" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selected ? "var(--primary)" : "var(--border)"}`, background: selected ? "var(--primary)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{t.label} <span style={{ fontWeight: 400, color: "var(--muted-foreground)" }}>· {t.range}</span></p>
                  <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)" }}>{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", padding: "0.75rem 1rem", background: "#EDE9FE", border: "1px solid #DDD6FE", borderRadius: "0.625rem" }}>
          <Sparkles size={14} style={{ color: "#7C3AED", flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "#5B21B6", lineHeight: 1.6 }}>
            Campaigns combining nano + micro creators typically achieve 3–6× better ROI than macro-only campaigns.
          </p>
        </div>
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
        <Field label="Creator gender preference">
          <div style={{ position: "relative" }}>
            <select value={draft.genderPref} onChange={(e) => set({ genderPref: e.target.value })} style={{ ...inp, appearance: "none", paddingRight: "2rem" }} onFocus={onF} onBlur={onB}>
              <option value="all">No preference</option>
              <option value="female">Female creators</option>
              <option value="male">Male creators</option>
            </select>
            <ChevronDown size={13} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
          </div>
        </Field>
        <Field label="Minimum engagement rate (%)" hint="Recommended: 3% or higher.">
          <input type="number" value={draft.minEngagement} onChange={(e) => set({ minEngagement: e.target.value })} min={0} max={20} step={0.5} style={inp} onFocus={onF} onBlur={onB} />
        </Field>
      </div>
    </div>
  );
}

function Step5({ draft, set }: { draft: Draft; set: (d: Partial<Draft>) => void }) {
  const toggleLoc = (c: string) => {
    set({ creatorLocations: draft.creatorLocations.includes(c) ? draft.creatorLocations.filter((x) => x !== c) : [...draft.creatorLocations, c] });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <Field label="Creator location" hint="Where must the creators be based?">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
          {COUNTRIES.map((c) => <ToggleChip key={c} label={c} selected={draft.creatorLocations.includes(c)} onClick={() => toggleLoc(c)} />)}
        </div>
      </Field>
      <Field label="Target audience location" hint="Where is your target consumer? This filters creators by audience demographics.">
        <input type="text" value={draft.audienceLocation} onChange={(e) => set({ audienceLocation: e.target.value })} placeholder="e.g. Morocco, France" style={inp} onFocus={onF} onBlur={onB} />
      </Field>
      <Field label="Content language">
        <input type="text" value={draft.language} onChange={(e) => set({ language: e.target.value })} placeholder="e.g. French, Darija, Arabic" style={inp} onFocus={onF} onBlur={onB} />
      </Field>
    </div>
  );
}

function Step6({ draft, set }: { draft: Draft; set: (d: Partial<Draft>) => void }) {
  const models = [
    { id: "fixed",       label: "Fixed fee per creator",  desc: "Set a flat rate for each creator. Most predictable." },
    { id: "milestone",   label: "Milestone-based",        desc: "Pay in stages: on signing, on submission, on approval." },
    { id: "gifted",      label: "Gifted / Barter",        desc: "Creators receive products in exchange for content. No cash." },
    { id: "hybrid",      label: "Hybrid (fee + product)", desc: "Cash fee plus a product gift." },
    { id: "affiliate",   label: "Affiliate commission",   desc: "Creators earn a % on every sale they drive." },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <Field label="Total campaign budget (MAD)" hint="This is split across all accepted creators." required>
        <div style={{ position: "relative" }}>
          <input type="number" value={draft.totalBudget} onChange={(e) => set({ totalBudget: e.target.value })} placeholder="25 000" style={{ ...inp, paddingRight: "3.5rem" }} onFocus={onF} onBlur={onB} />
          <span style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>MAD</span>
        </div>
      </Field>
      <Field label="Budget per creator (MAD)" hint="Approximate range per individual creator.">
        <input type="text" value={draft.budgetPerCreator} onChange={(e) => set({ budgetPerCreator: e.target.value })} placeholder="e.g. 3 000 – 5 000" style={inp} onFocus={onF} onBlur={onB} />
      </Field>
      <Field label="Payment model" required>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {models.map((m) => (
            <button key={m.id} onClick={() => set({ paymentModel: m.id })} style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.875rem 1rem", borderRadius: "0.625rem", border: `1.5px solid ${draft.paymentModel === m.id ? "var(--primary)" : "var(--border)"}`, background: draft.paymentModel === m.id ? "#EFF6FF" : "var(--card)", cursor: "pointer", textAlign: "left", transition: "all .15s" }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${draft.paymentModel === m.id ? "var(--primary)" : "var(--border)"}`, background: draft.paymentModel === m.id ? "var(--primary)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {draft.paymentModel === m.id && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />}
              </div>
              <div>
                <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{m.label}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)" }}>{m.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}

function Step7({ draft, set }: { draft: Draft; set: (d: Partial<Draft>) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", marginBottom: "-0.5rem" }}>Set clear dates for each phase. Creators will see these when reviewing your campaign.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
        <Field label="Application deadline" hint="Last date creators can apply.">
          <input type="date" value={draft.applicationDeadline} onChange={(e) => set({ applicationDeadline: e.target.value })} style={inp} onFocus={onF} onBlur={onB} />
        </Field>
        <Field label="Content submission deadline" hint="When creators must submit their content.">
          <input type="date" value={draft.submissionDeadline} onChange={(e) => set({ submissionDeadline: e.target.value })} style={inp} onFocus={onF} onBlur={onB} />
        </Field>
        <Field label="Target publication date" hint="When the content should go live.">
          <input type="date" value={draft.publicationDate} onChange={(e) => set({ publicationDate: e.target.value })} style={inp} onFocus={onF} onBlur={onB} />
        </Field>
        <Field label="Campaign end date" hint="When reporting is finalized.">
          <input type="date" value={draft.campaignEnd} onChange={(e) => set({ campaignEnd: e.target.value })} style={inp} onFocus={onF} onBlur={onB} />
        </Field>
      </div>
      <div style={{ padding: "1rem", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "0.625rem" }}>
        <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "#1E40AF", lineHeight: 1.65 }}>
          <strong>Tip:</strong> Leave at least 72 hours between the application deadline and submission deadline. This gives you time to review and brief accepted creators properly.
        </p>
      </div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "0.625rem 0", borderBottom: "1px solid var(--border)", gap: "1rem" }}>
      <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", flexShrink: 0, minWidth: 140 }}>{label}</span>
      <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--foreground)", textAlign: "right" }}>{value}</span>
    </div>
  );
}

function Step8({ draft }: { draft: Draft }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem 1.25rem", background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: "0.875rem", marginBottom: "1.5rem" }}>
        <CheckCircle size={20} style={{ color: "#10B981", flexShrink: 0 }} />
        <div>
          <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "#065F46" }}>Campaign is ready to publish</p>
          <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "#047857" }}>Review the details below and publish when ready. You can also save as a draft.</p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        {[
          { title: "Campaign details", items: [
            { label: "Title", value: draft.title || "—" },
            { label: "Type", value: draft.campaignType || "—" },
            { label: "Category", value: draft.category || "—" },
            { label: "Objectives", value: draft.objectives.join(", ") || "—" },
          ]},
          { title: "Platforms & content", items: [
            { label: "Platforms", value: draft.platforms.join(", ") || "—" },
            { label: "Deliverables", value: draft.deliverables.length > 0 ? `${draft.deliverables.length} item${draft.deliverables.length !== 1 ? "s" : ""}` : "—" },
          ]},
          { title: "Targeting", items: [
            { label: "Niches", value: draft.niches.join(", ") || "—" },
            { label: "Creator tiers", value: draft.followerTiers.join(", ") || "—" },
            { label: "Min. engagement", value: draft.minEngagement ? `${draft.minEngagement}%` : "—" },
            { label: "Locations", value: draft.creatorLocations.join(", ") || "—" },
          ]},
          { title: "Budget & dates", items: [
            { label: "Total budget", value: draft.totalBudget ? `${Number(draft.totalBudget).toLocaleString()} MAD` : "—" },
            { label: "Payment model", value: draft.paymentModel || "—" },
            { label: "Applications close", value: draft.applicationDeadline || "—" },
            { label: "Submission due", value: draft.submissionDeadline || "—" },
          ]},
        ].map((section) => (
          <div key={section.title} style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1rem 1.125rem" }}>
            <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>{section.title}</p>
            {section.items.map((item) => <ReviewItem key={item.label} label={item.label} value={item.value} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main ─── */
export function CreateCampaignPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [published, setPublished] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string>("");
  
  const navigate = useNavigate();
  const set = (d: Partial<Draft>) => setDraft((prev) => ({ ...prev, ...d }));

  const canContinue = (): boolean => {
    if (step === 0) return !!(draft.title && draft.category && draft.brief);
    if (step === 1) return draft.platforms.length > 0;
    if (step === 2) return draft.deliverables.length > 0;
    if (step === 3) return draft.niches.length > 0 && draft.followerTiers.length > 0;
    if (step === 4) return draft.creatorLocations.length > 0;
    if (step === 5) return !!(draft.totalBudget && draft.paymentModel);
    if (step === 6) return !!(draft.applicationDeadline && draft.submissionDeadline);
    return true;
  };

  const stepComponents = [
    <Step1 draft={draft} set={set} />,
    <Step2 draft={draft} set={set} />,
    <Step3 draft={draft} set={set} />,
    <Step4 draft={draft} set={set} />,
    <Step5 draft={draft} set={set} />,
    <Step6 draft={draft} set={set} />,
    <Step7 draft={draft} set={set} />,
    <Step8 draft={draft} />,
  ];

  const localizedSteps = STEPS.map((stepItem) => {
    let label = stepItem.label;
    let short = stepItem.short;
    if (isFr) {
      if (stepItem.label === "Brief") { label = "Brief"; short = "Brief"; }
      else if (stepItem.label === "Platforms") { label = "Plateformes"; short = "Platef."; }
      else if (stepItem.label === "Deliverables") { label = "Livrables"; short = "Livrables"; }
      else if (stepItem.label === "Creators") { label = "Créateurs"; short = "Créateurs"; }
      else if (stepItem.label === "Location") { label = "Localisation"; short = "Local."; }
      else if (stepItem.label === "Budget") { label = "Budget"; short = "Budget"; }
      else if (stepItem.label === "Deadlines") { label = "Échéances"; short = "Dates"; }
      else if (stepItem.label === "Review") { label = "Vérification"; short = "Vérif."; }
    }
    return { label, short };
  });

  if (published) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: "2rem" }}>
        <div style={{ textAlign: "center", maxWidth: 460 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", boxShadow: "0 8px 24px rgba(37,99,235,0.3)" }}>
            <Zap size={28} color="#fff" />
          </div>
          <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.5rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.625rem" }}>
            {isFr ? "Campagne en ligne !" : "Campaign is live!"}
          </h2>
          <p style={{ fontFamily: f.b, fontSize: "0.9375rem", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "2rem" }}>
            {isFr ? `"${draft.title}" a été publiée. Le matching par IA est maintenant en cours pour trouver les meilleurs créateurs pour votre campagne.` : `"${draft.title}" has been published. AI matching is now running to find the best creators for your campaign.`}
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <button onClick={() => navigate("/brand/campaigns")} style={{ padding: "0.6875rem 1.5rem", borderRadius: "0.5rem", background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.9rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {isFr ? "Voir mes campagnes" : "View my campaigns"} <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handlePublish = async () => {
    setIsPublishing(true);
    setError("");
    try {
      const selectedTier = draft.followerTiers[0] || "any";
      const mappedTier = selectedTier === "mega" ? "macro" : selectedTier;

      await api.post("/api/campaigns", {
        title: draft.title,
        brief: draft.brief + (draft.contentGuidelines ? "\n\nGuidelines: " + draft.contentGuidelines : ""),
        campaign_type: draft.campaignType,
        payment_model: draft.paymentModel,
        budget: Number(draft.totalBudget) || 0,
        platforms: draft.platforms,
        niches: draft.niches,
        follower_tier: mappedTier,
        min_followers: 0,
        min_engagement_rate: Number(draft.minEngagement) || 0,
        target_countries: draft.creatorLocations,
        target_gender: draft.genderPref,
        deliverables: draft.deliverables.map(d => `${d.count} ${d.type} on ${d.platform}`),
        application_deadline: draft.applicationDeadline || null,
        submission_deadline: draft.submissionDeadline || null,
        publication_date: draft.publicationDate || null,
        campaign_end: draft.campaignEnd || null,
        status: "active",
        spots_total: 10
      });
      setPublished(true);
    } catch (err: any) {
      const apiError = err.response?.data;
      if (apiError?.errors) {
        const errorList = Object.values(apiError.errors).flat().join(" ");
        setError(`${apiError.message} ${errorList}`);
      } else {
        setError(apiError?.message || (isFr ? "Échec de la publication" : "Failed to publish campaign"));
      }
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsPublishing(true);
    setError("");
    try {
      const selectedTier = draft.followerTiers[0] || "any";
      const mappedTier = selectedTier === "mega" ? "macro" : selectedTier;

      await api.post("/api/campaigns", {
        title: draft.title || "Untitled Draft",
        brief: draft.brief || "Draft Brief",
        campaign_type: draft.campaignType,
        payment_model: draft.paymentModel,
        budget: Number(draft.totalBudget) || 0,
        platforms: draft.platforms.length > 0 ? draft.platforms : ["instagram"],
        niches: draft.niches,
        follower_tier: mappedTier,
        min_followers: 0,
        min_engagement_rate: Number(draft.minEngagement) || 0,
        target_countries: draft.creatorLocations,
        target_gender: draft.genderPref,
        deliverables: draft.deliverables.map(d => `${d.count} ${d.type} on ${d.platform}`),
        application_deadline: draft.applicationDeadline || null,
        submission_deadline: draft.submissionDeadline || null,
        publication_date: draft.publicationDate || null,
        campaign_end: draft.campaignEnd || null,
        status: "draft",
        spots_total: 10
      });
      navigate("/brand/campaigns");
    } catch (err: any) {
      const apiError = err.response?.data;
      if (apiError?.errors) {
        const errorList = Object.values(apiError.errors).flat().join(" ");
        setError(`${apiError.message} ${errorList}`);
      } else {
        setError(apiError?.message || (isFr ? "Échec de l'enregistrement du brouillon" : "Failed to save draft"));
      }
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div style={{ padding: "1.75rem 1.5rem 4rem", maxWidth: 760, margin: "0 auto" }}>
      {/* Stepper */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: "2.5rem", overflowX: "auto" }}>
        {localizedSteps.map((s, i) => (
          <div key={s.short} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: i < step ? "var(--primary)" : i === step ? "var(--primary)" : "var(--muted)", border: `2px solid ${i <= step ? "var(--primary)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s", boxShadow: i === step ? "0 0 0 4px rgba(37,99,235,0.15)" : "none" }}>
                {i < step ? <Check size={14} color="#fff" strokeWidth={2.5} /> : <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.75rem", color: i <= step ? "#fff" : "var(--muted-foreground)" }}>{i + 1}</span>}
              </div>
              <span style={{ fontFamily: f.b, fontSize: "0.68rem", color: i === step ? "var(--foreground)" : "var(--muted-foreground)", fontWeight: i === step ? 600 : 400, whiteSpace: "nowrap" }}>{s.short}</span>
            </div>
            {i < localizedSteps.length - 1 && <div style={{ width: 36, height: 2, background: i < step ? "var(--primary)" : "var(--border)", marginBottom: 18, flexShrink: 0, transition: "background .2s" }} />}
          </div>
        ))}
      </div>

      {error && (
        <div style={{ padding: "1rem", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "0.5rem", color: "#991B1B", fontFamily: f.b, fontSize: "0.875rem", marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      {/* Card */}
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: "1.25rem" }}>
        <div style={{ marginBottom: "1.75rem" }}>
          <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.25rem", color: "var(--foreground)", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>{localizedSteps[step].label}</h2>
          <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>
            {isFr ? `Étape ${step + 1} sur ${localizedSteps.length}` : `Step ${step + 1} of ${localizedSteps.length}`}
          </p>
        </div>
        {stepComponents[step]}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
        {step > 0 ? (
          <button onClick={() => setStep((s) => s - 1)} style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.625rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem" }}>
            <ArrowLeft size={15} /> {isFr ? "Retour" : "Back"}
          </button>
        ) : (
          <button onClick={() => navigate("/brand/campaigns")} style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.625rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem" }}>
            <ArrowLeft size={15} /> {isFr ? "Annuler" : "Cancel"}
          </button>
        )}
        <div style={{ display: "flex", gap: "0.625rem" }}>
          {step === localizedSteps.length - 1 ? (
            <>
              <button onClick={handleSaveDraft} style={{ padding: "0.6875rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem" }}>
                {isFr ? "Enregistrer comme brouillon" : "Save as draft"}
              </button>
              <button disabled={isPublishing} onClick={handlePublish} style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.6875rem 1.5rem", borderRadius: "0.5rem", background: isPublishing ? "var(--muted)" : "var(--primary)", color: isPublishing ? "var(--muted-foreground)" : "#fff", border: "none", cursor: isPublishing ? "default" : "pointer", fontFamily: f.b, fontSize: "0.9rem", fontWeight: 500, boxShadow: isPublishing ? "none" : "var(--shadow-primary)" }}>
                {isPublishing ? (isFr ? "Publication..." : "Publishing...") : (isFr ? "Publier la campagne" : "Publish campaign")} {!isPublishing && <Zap size={15} />}
              </button>
            </>
          ) : (
            <button onClick={() => setStep((s) => s + 1)} disabled={!canContinue()} style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.6875rem 1.5rem", borderRadius: "0.5rem", background: canContinue() ? "var(--primary)" : "var(--muted)", color: canContinue() ? "#fff" : "var(--muted-foreground)", border: "none", cursor: canContinue() ? "pointer" : "default", fontFamily: f.b, fontSize: "0.9rem", fontWeight: 500, boxShadow: canContinue() ? "var(--shadow-primary)" : "none" }}>
              {isFr ? "Continuer" : "Continue"} <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
