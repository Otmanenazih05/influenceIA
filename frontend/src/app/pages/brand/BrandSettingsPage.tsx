import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Building2, CreditCard, Users, Bell, Shield, ChevronRight,
  Eye, EyeOff, Check, X, Plus, Trash2, AlertTriangle, Download,
} from "lucide-react";
import api from "../../../lib/api";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };
type Section = "company" | "billing" | "team" | "notifications" | "account";

const NAV: { id: Section; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "company",       label: "Company info",       icon: <Building2 size={16} />, desc: "Brand name, industry, logo" },
  { id: "billing",       label: "Billing & plan",     icon: <CreditCard size={16} />,desc: "Plan, payment method, invoices" },
  { id: "team",          label: "Team & permissions", icon: <Users size={16} />,     desc: "Members, roles, access" },
  { id: "notifications", label: "Notifications",      icon: <Bell size={16} />,      desc: "Alerts, campaign updates" },
  { id: "account",       label: "Account & security", icon: <Shield size={16} />,    desc: "Password, 2FA, data" },
];

const INDUSTRIES = ["Beauty & Cosmetics", "Fashion & Apparel", "Food & Beverage", "Health & Wellness", "Tech & Software", "Travel & Hospitality", "Finance", "Education", "Sports & Fitness", "Home & Lifestyle", "Retail & E-Commerce", "Media & Entertainment", "Other"];

const inp: React.CSSProperties = {
  width: "100%", height: "2.625rem", padding: "0 0.875rem",
  borderRadius: "0.5rem", border: "1px solid var(--border)",
  background: "var(--input-background)", color: "var(--foreground)",
  fontFamily: f.b, fontSize: "0.875rem", outline: "none",
  boxSizing: "border-box", transition: "border-color .15s",
};
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

function Toggle({ value, onChange, label, sub }: { value: boolean; onChange: () => void; label: string; sub?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "0.75rem 0" }}>
      <div>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)" }}>{label}</p>
        {sub && <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)" }}>{sub}</p>}
      </div>
      <button role="switch" aria-checked={value} aria-label={label} onClick={onChange} style={{ width: 42, height: 24, borderRadius: 999, border: "none", cursor: "pointer", background: value ? "var(--primary)" : "var(--switch-background)", position: "relative", flexShrink: 0, transition: "background .2s" }}>
        <div style={{ position: "absolute", top: 2, left: value ? 20 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left .2s" }} />
      </button>
    </div>
  );
}

function SaveBar({ onSave, saving }: { onSave: () => void; saving: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border)" }}>
      <button onClick={onSave} style={{ padding: "0.5625rem 1.25rem", borderRadius: "0.5rem", border: "none", background: saving ? "#10B981" : "var(--primary)", color: "#fff", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.375rem", transition: "background .2s" }}>
        {saving ? <><Check size={14} /> Saved!</> : "Save changes"}
      </button>
    </div>
  );
}

/* ─── Sections ─── */
function CompanySection({ profile, onUpdate }: { profile: any; onUpdate: (data: any) => Promise<void> }) {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    company_name: profile?.company_name || "",
    contact_name: profile?.contact_name || "",
    industry: profile?.industry || "Beauty & Cosmetics",
    website: profile?.website || "",
    description: profile?.description || "",
    phone: profile?.phone || "",
    email: profile?.user?.email || "",
  });

  const handleSave = async () => {
    try {
      await onUpdate({
        company_name: form.company_name,
        contact_name: form.contact_name,
        industry: form.industry,
        website: form.website,
        description: form.description,
        phone: form.phone,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update profile settings.");
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        <div style={{ width: 72, height: 72, borderRadius: "0.875rem", background: "#1E40AF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", position: "relative", overflow: "hidden" }}>
          <span style={{ fontFamily: f.h, fontWeight: 800, fontSize: "2rem", color: "#fff" }}>G</span>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0 }} onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "0"; }}>
            <span style={{ fontFamily: f.b, fontSize: "0.7rem", color: "#fff", fontWeight: 600 }}>Change</span>
          </div>
        </div>
        <div>
          <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.25rem" }}>Company logo</p>
          <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: "0.625rem" }}>PNG or SVG, min 200×200px. Appears on all campaign materials.</p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button style={{ padding: "0.375rem 0.75rem", borderRadius: "0.375rem", background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500 }}>Upload logo</button>
            <button style={{ padding: "0.375rem 0.75rem", borderRadius: "0.375rem", background: "var(--muted)", color: "var(--muted-foreground)", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem" }}>Remove</button>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
        <Field label="Company name" required>
          <input type="text" value={form.company_name} onChange={e => setForm({...form, company_name: e.target.value})} style={inp} onFocus={onF} onBlur={onB} />
        </Field>
        <Field label="Contact name" hint="Point of contact">
          <input type="text" value={form.contact_name} onChange={e => setForm({...form, contact_name: e.target.value})} style={inp} onFocus={onF} onBlur={onB} />
        </Field>
      </div>
      <Field label="Industry" required>
        <div style={{ position: "relative" }}>
          <select value={form.industry} onChange={e => setForm({...form, industry: e.target.value})} style={{ ...inp, appearance: "none", paddingRight: "2rem", cursor: "pointer" }} onFocus={onF} onBlur={onB}>
            {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
          </select>
          <ChevronRight size={13} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%) rotate(90deg)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
        </div>
      </Field>
      <Field label="Company website">
        <input type="url" value={form.website} onChange={e => setForm({...form, website: e.target.value})} style={inp} onFocus={onF} onBlur={onB} />
      </Field>
      <Field label="Company description" hint="Shown on your brand profile that creators see.">
        <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={{ ...inp, height: "auto", padding: "0.625rem 0.875rem", resize: "vertical", lineHeight: 1.65 }} onFocus={onF} onBlur={onB} />
      </Field>
      <Field label="Business contact phone" required>
        <input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={inp} onFocus={onF} onBlur={onB} />
      </Field>
      <SaveBar onSave={handleSave} saving={saved} />
    </div>
  );
}

function BillingSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Current plan */}
      <div>
        <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.875rem" }}>Current plan</h3>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.125rem 1.25rem", background: "linear-gradient(135deg, #1E40AF, #2563EB)", borderRadius: "0.875rem", boxShadow: "0 4px 16px rgba(37,99,235,0.2)" }}>
          <div>
            <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.125rem", color: "#fff", marginBottom: "0.25rem" }}>Growth Plan</p>
            <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "rgba(255,255,255,0.7)" }}>999 MAD / month · Renews 1 juillet 2024</p>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.625rem", flexWrap: "wrap" }}>
              {["Unlimited campaigns", "AI matching", "Advanced analytics", "Priority support"].map((f2) => (
                <span key={f2} style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", fontFamily: f.b, fontSize: "0.68rem", fontWeight: 500 }}>{f2}</span>
              ))}
            </div>
          </div>
          <button style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.12)", color: "#fff", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, flexShrink: 0 }}>
            Upgrade
          </button>
        </div>
      </div>
      {/* Payment method */}
      <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
        <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.875rem" }}>Payment method</h3>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "0.5rem", background: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
              <CreditCard size={16} />
            </div>
            <div>
              <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>Visa ending in 4521</p>
              <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Expires 09 / 2026</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.375rem" }}>
            <button style={{ padding: "0.3rem 0.625rem", borderRadius: "0.375rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.75rem" }}>Edit</button>
          </div>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginTop: "0.625rem", background: "none", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", color: "var(--primary)", fontWeight: 500 }}>
          <Plus size={13} /> Add payment method
        </button>
      </div>
      {/* Invoices */}
      <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
        <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.875rem" }}>Recent invoices</h3>
        <div style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.75rem", overflow: "hidden" }}>
          {[
            { date: "1 juin 2024",  amount: "999 MAD",  status: "Upcoming",  period: "Growth · Jul 2024" },
            { date: "1 mai 2024",   amount: "999 MAD",  status: "Paid",      period: "Growth · Jun 2024" },
            { date: "1 avr 2024",   amount: "999 MAD",  status: "Paid",      period: "Growth · May 2024" },
          ].map((inv, i, arr) => (
            <div key={inv.date} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div>
                <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)", fontWeight: 500 }}>{inv.period}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{inv.date}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>{inv.amount}</p>
                <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: inv.status === "Paid" ? "#D1FAE5" : "#FEF3C7", color: inv.status === "Paid" ? "#065F46" : "#92400E", fontFamily: f.b, fontSize: "0.7rem", fontWeight: 600 }}>{inv.status}</span>
                {inv.status === "Paid" && <button aria-label="Download invoice" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}><Download size={14} /></button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamSection() {
  const [members, setMembers] = useState([
    { id: "m1", name: "Karim El Fassi",   email: "karim@glowlab.ma",       role: "Admin",            avatar: "K", color: "#2563EB", you: true },
    { id: "m2", name: "Nour Benaissa",    email: "nour@glowlab.ma",        role: "Campaign Manager", avatar: "N", color: "#7C3AED", you: false },
    { id: "m3", name: "Imane Tahiri",     email: "imane@glowlab.ma",       role: "Viewer",           avatar: "I", color: "#EC4899", you: false },
  ]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Viewer");
  const roleColors: Record<string, { bg: string; color: string }> = {
    "Admin":            { bg: "#DBEAFE", color: "#1D4ED8" },
    "Campaign Manager": { bg: "#EDE9FE", color: "#5B21B6" },
    "Viewer":           { bg: "var(--muted)", color: "var(--muted-foreground)" },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.875rem" }}>Team members ({members.length})</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {members.map((m) => {
            const rc = roleColors[m.role] ?? roleColors["Viewer"];
            return (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.75rem 1rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${m.color}22`, display: "flex", alignItems: "center", justifyContent: "center", color: m.color, fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", flexShrink: 0 }}>{m.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{m.name}</p>
                    {m.you && <span style={{ padding: "0.1rem 0.4rem", borderRadius: 999, background: "#DBEAFE", color: "var(--primary)", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700 }}>You</span>}
                  </div>
                  <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{m.email}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ padding: "0.2rem 0.625rem", borderRadius: 999, background: rc.bg, color: rc.color, fontFamily: f.b, fontSize: "0.72rem", fontWeight: 600 }}>{m.role}</span>
                  {!m.you && (
                    <button aria-label="Remove team member" onClick={() => setMembers((prev) => prev.filter((x) => x.id !== m.id))} style={{ width: 28, height: 28, borderRadius: "0.375rem", border: "1px solid #FECACA", background: "#FEF2F2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#991B1B" }}>
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ paddingTop: "1.25rem", borderTop: "1px solid var(--border)" }}>
        <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.875rem" }}>Invite a team member</h3>
        <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
          <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="colleague@glowlab.ma" style={{ ...inp, flex: "1 1 220px" }} onFocus={onF} onBlur={onB} />
          <div style={{ position: "relative", flexShrink: 0 }}>
            <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} style={{ ...inp, width: 160, appearance: "none", paddingRight: "1.75rem", cursor: "pointer" }} onFocus={onF} onBlur={onB}>
              <option>Admin</option>
              <option>Campaign Manager</option>
              <option>Viewer</option>
            </select>
            <ChevronRight size={12} style={{ position: "absolute", right: "0.5rem", top: "50%", transform: "translateY(-50%) rotate(90deg)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
          </div>
          <button
            disabled={!inviteEmail.trim()}
            style={{ padding: "0 1rem", borderRadius: "0.5rem", background: inviteEmail.trim() ? "var(--primary)" : "var(--muted)", color: inviteEmail.trim() ? "#fff" : "var(--muted-foreground)", border: "none", cursor: inviteEmail.trim() ? "pointer" : "default", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, flexShrink: 0, height: "2.625rem" }}
          >
            Send invite
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationsSection() {
  const [prefs, setPrefs] = useState({
    emailNewApplicant: true, emailSubmission: true, emailPaymentRelease: true,
    emailWeeklyReport: true, emailMarketing: false,
    pushNewApplicant: true, pushRevisionNeeded: true, pushDeadline: true, pushPayment: true,
  });
  const [saved, setSaved] = useState(false);
  const toggle = (key: keyof typeof prefs) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div>
      <div style={{ marginBottom: "1.75rem" }}>
        <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.875rem" }}>Email notifications</h3>
        <div style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "0 1rem" }}>
          {([
            { key: "emailNewApplicant" as const,    label: "New campaign applicant",  sub: "When a creator applies to your campaign" },
            { key: "emailSubmission" as const,      label: "Content submission",       sub: "When a creator submits content for review" },
            { key: "emailPaymentRelease" as const,  label: "Escrow & payments",        sub: "Payment releases and fund confirmations" },
            { key: "emailWeeklyReport" as const,    label: "Weekly performance report",sub: "Campaign summary every Monday" },
            { key: "emailMarketing" as const,       label: "Platform news & tips",     sub: "Product updates and best practices" },
          ]).map((item, i, arr) => (
            <div key={item.key} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
              <Toggle value={prefs[item.key]} onChange={() => toggle(item.key)} label={item.label} sub={item.sub} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.875rem" }}>Push notifications</h3>
        <div style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "0 1rem" }}>
          {([
            { key: "pushNewApplicant" as const,   label: "New applicant",      sub: "Instant alert when creator applies" },
            { key: "pushRevisionNeeded" as const, label: "Content revision",    sub: "When revision is needed on submitted content" },
            { key: "pushDeadline" as const,       label: "Deadline reminders", sub: "24h before application or submission deadlines" },
            { key: "pushPayment" as const,        label: "Escrow updates",      sub: "Funds secured or payment released" },
          ]).map((item, i, arr) => (
            <div key={item.key} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
              <Toggle value={prefs[item.key]} onChange={() => toggle(item.key)} label={item.label} sub={item.sub} />
            </div>
          ))}
        </div>
      </div>
      <SaveBar onSave={() => setSaved(true)} saving={saved} />
    </div>
  );
}

function AccountSection() {
  const [showPw, setShowPw] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [delInput, setDelInput] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "1rem" }}>Change password</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <Field label="Current password">
            <div style={{ position: "relative" }}>
              <input id="currPw" type={showPw ? "text" : "password"} placeholder="Current password" style={{ ...inp, paddingRight: "2.5rem" }} onFocus={onF} onBlur={onB} />
              <button aria-label={showPw ? "Hide password" : "Show password"} onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </Field>
          <Field label="New password" hint="Minimum 8 characters.">
            <input id="newPw" type="password" placeholder="New password" style={inp} onFocus={onF} onBlur={onB} />
          </Field>
          <Field label="Confirm new password">
            <input id="confPw" type="password" placeholder="Repeat password" style={inp} onFocus={onF} onBlur={onB} />
          </Field>
        </div>
        <SaveBar onSave={async () => {
          const c = (document.getElementById("currPw") as HTMLInputElement).value;
          const n = (document.getElementById("newPw") as HTMLInputElement).value;
          const conf = (document.getElementById("confPw") as HTMLInputElement).value;
          if (n !== conf) return alert("Passwords don't match");
          try {
            await api.put("/api/auth/password", { current_password: c, new_password: n, new_password_confirmation: conf });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          } catch(err: any) {
            alert(err.response?.data?.message || "Failed");
          }
        }} saving={saved} />
      </div>
      <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
        <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.875rem" }}>Data & account</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.75rem" }}>
            <div>
              <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.9rem", color: "var(--foreground)", marginBottom: "0.25rem" }}>Export brand data</p>
              <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>Download campaigns, creator contacts, transactions, and messages.</p>
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", flexShrink: 0 }}>
              <Download size={14} /> Export
            </button>
          </div>
          <div style={{ padding: "1rem", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: confirmDel ? "1.25rem" : 0 }}>
              <AlertTriangle size={17} style={{ color: "#EF4444", flexShrink: 0, marginTop: 1 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: f.b, fontWeight: 600, fontSize: "0.9rem", color: "#991B1B", marginBottom: "0.25rem" }}>Delete brand account</p>
                <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "#7F1D1D", lineHeight: 1.6 }}>Permanently deletes your account, campaigns, and all creator data. This cannot be undone.</p>
              </div>
              {!confirmDel && <button onClick={() => setConfirmDel(true)} style={{ padding: "0.4375rem 0.875rem", borderRadius: "0.5rem", border: "1px solid #FECACA", background: "#FEE2E2", color: "#991B1B", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, flexShrink: 0 }}>Delete account</button>}
            </div>
            {confirmDel && (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input type="text" value={delInput} onChange={(e) => setDelInput(e.target.value)} placeholder="Type DELETE" style={{ ...inp, borderColor: "#FECACA", background: "#fff", flex: 1 }} onFocus={onF} onBlur={onB} />
                <button disabled={delInput !== "DELETE"} style={{ padding: "0 1rem", borderRadius: "0.5rem", border: "none", background: delInput === "DELETE" ? "#EF4444" : "var(--muted)", color: delInput === "DELETE" ? "#fff" : "var(--muted-foreground)", cursor: delInput === "DELETE" ? "pointer" : "default", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, flexShrink: 0 }}>
                  Confirm
                </button>
                <button aria-label="Cancel deletion" onClick={() => { setConfirmDel(false); setDelInput(""); }} style={{ width: 36, height: 36, borderRadius: "0.5rem", border: "1px solid #FECACA", background: "#FEF2F2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#991B1B", flexShrink: 0 }}><X size={14} /></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrandSettingsPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [section, setSection] = useState<Section>("company");
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setProfile(res.data.data.brand_profile);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (data: any) => {
    const res = await api.put("/api/brand/profile", data);
    setProfile(res.data.data);
  };

  const content: Record<Section, { title: string; desc: string; node: React.ReactNode }> = {
    company:       { title: isFr ? "Informations de l'entreprise" : "Company information",    desc: isFr ? "Votre identite de marque vue par les createurs." : "Your brand identity as seen by creators and the platform.",   node: <CompanySection profile={profile} onUpdate={handleUpdate} /> },
    billing:       { title: isFr ? "Facturation & plan" : "Billing & plan",         desc: isFr ? "Gerez votre abonnement et vos factures." : "Manage your subscription, payment method, and invoices.",      node: <BillingSection /> },
    team:          { title: isFr ? "Equipe & permissions" : "Team & permissions",     desc: isFr ? "Invitez des membres et gerez leurs acces." : "Invite team members and manage their platform access.",         node: <TeamSection /> },
    notifications: { title: isFr ? "Notifications" : "Notification settings", desc: isFr ? "Controlez quand et comment InfluencIA vous contacte." : "Control when and how InfluencIA contacts you.",               node: <NotificationsSection /> },
    account:       { title: isFr ? "Compte & securite" : "Account & security",     desc: isFr ? "Mot de passe, donnees et suppression du compte." : "Password, account data, and deletion settings.",              node: <AccountSection /> },
  };
  const curr = content[section];

  if (isLoading) return <div style={{ padding: "3rem", color: "var(--muted-foreground)" }}>Loading...</div>;

  return (
    <div style={{ padding: "1.75rem 1.5rem 4rem" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
          {isFr ? "Parametres" : "Settings"}
        </h1>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          {isFr ? "Gerez votre compte marque, equipe et preferences" : "Manage your brand account, team, and preferences"}
        </p>
      </div>
      <div style={{ gap: "1.5rem", alignItems: "start" }} className="flex flex-col lg:grid lg:grid-cols-[240px_1fr]">
        {/* Nav */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", overflow: "hidden", padding: "0.375rem" }}>
          {NAV.map((item) => {
            const active = section === item.id;
            return (
              <button key={item.id} onClick={() => setSection(item.id)}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "100%", padding: "0.75rem 0.875rem", background: active ? "var(--secondary)" : "transparent", border: "none", borderRadius: "0.5rem", cursor: "pointer", textAlign: "left", color: active ? "var(--secondary-foreground)" : "var(--muted-foreground)", transition: "all .12s", marginBottom: "0.125rem" }}>
                <span style={{ opacity: active ? 1 : 0.7 }}>{item.icon}</span>
                <div>
                  <p style={{ fontFamily: f.b, fontSize: "0.875rem", fontWeight: active ? 500 : 400, color: active ? "var(--secondary-foreground)" : "var(--foreground)", lineHeight: 1.2 }}>{item.label}</p>
                  <p style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)", marginTop: 1 }}>{item.desc}</p>
                </div>
                {active && <ChevronRight size={13} style={{ marginLeft: "auto", color: "var(--secondary-foreground)", opacity: 0.6 }} />}
              </button>
            );
          })}
        </div>
        {/* Content */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.75rem" }}>
          <div style={{ marginBottom: "1.75rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--border)" }}>
            <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.125rem", color: "var(--foreground)", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>{curr.title}</h2>
            <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>{curr.desc}</p>
          </div>
          {curr.node}
        </div>
      </div>
    </div>
  );
}
