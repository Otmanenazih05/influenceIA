import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  User, Lock, Bell, Globe, Trash2, ChevronRight, Eye, EyeOff,
  Check, Shield, Smartphone, LogOut, AlertTriangle, Download,
  Mail, X,
} from "lucide-react";
import api from "../../../lib/api";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

type SettingsSection = "account" | "security" | "notifications" | "preferences" | "danger";

const NAV_ITEMS: { id: SettingsSection; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "account",       label: "Account",           icon: <User size={16} />,        desc: "Name, email, phone" },
  { id: "security",      label: "Password & Security",icon: <Lock size={16} />,        desc: "Password, 2FA, sessions" },
  { id: "notifications", label: "Notifications",      icon: <Bell size={16} />,        desc: "Email and push settings" },
  { id: "preferences",   label: "Preferences",        icon: <Globe size={16} />,       desc: "Language, timezone" },
  { id: "danger",        label: "Account management", icon: <Trash2 size={16} />,      desc: "Export, delete account" },
];

const inp: React.CSSProperties = {
  width: "100%", height: "2.625rem", padding: "0 0.875rem",
  borderRadius: "0.5rem", border: "1px solid var(--border)",
  background: "var(--input-background)", color: "var(--foreground)",
  fontFamily: f.b, fontSize: "0.875rem", outline: "none",
  boxSizing: "border-box", transition: "border-color .15s, box-shadow .15s",
};
const onF = (e: React.FocusEvent<HTMLElement>) => { (e.target as HTMLElement).style.borderColor = "var(--primary)"; (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; };
const onB = (e: React.FocusEvent<HTMLElement>) => { (e.target as HTMLElement).style.borderColor = "var(--border)"; (e.target as HTMLElement).style.boxShadow = "none"; };

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>{label}</label>
      {children}
      {hint && <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.25rem" }}>{hint}</p>}
    </div>
  );
}

function Toggle({ value, onChange, label, sub }: { value: boolean; onChange: (v: boolean) => void; label: string; sub?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "0.75rem 0" }}>
      <div>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)", fontWeight: 400 }}>{label}</p>
        {sub && <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)" }}>{sub}</p>}
      </div>
      <button
        role="switch" aria-checked={value} aria-label={label}
        onClick={() => onChange(!value)}
        style={{ width: 42, height: 24, borderRadius: 999, border: "none", cursor: "pointer", background: value ? "var(--primary)" : "var(--switch-background)", position: "relative", flexShrink: 0, transition: "background .2s" }}
      >
        <div style={{ position: "absolute", top: 2, left: value ? 20 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left .2s" }} />
      </button>
    </div>
  );
}

function SaveBar({ onSave, saving }: { onSave: () => void; saving: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border)" }}>
      <button
        onClick={onSave}
        style={{ padding: "0.5625rem 1.25rem", borderRadius: "0.5rem", border: "none", background: saving ? "#10B981" : "var(--primary)", color: "#fff", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.375rem", boxShadow: "0 2px 8px rgba(37,99,235,0.2)", transition: "background .2s" }}
      >
        {saving ? <><Check size={14} /> Saved!</> : "Save changes"}
      </button>
    </div>
  );
}

/* ─── Account section ─── */
function AccountSection() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
  });

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get('/api/auth/me');
        const user = res.data.data;
        const nameParts = (user.name || "").split(" ");
        setAccount({
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          email: user.email || "",
          phone: user.influencer_profile?.phone || user.brand_profile?.phone || "",
          username: user.email?.split('@')[0] || "",
        });
      } catch(e) {} finally { setLoading(false); }
    };
    fetchMe();
  }, []);

  const save = async () => { 
    try {
      await api.put('/api/influencer/profile', {
        full_name: `${account.firstName} ${account.lastName}`.trim(),
        phone: account.phone,
      });
      setSaved(true); 
      setTimeout(() => setSaved(false), 2000); 
    } catch (e) {
      alert("Failed to save account details.");
    }
  };

  if (loading) return <div style={{ padding: "2rem", color: "var(--muted-foreground)" }}>Loading...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
        <Field label="First name">
          <input type="text" value={account.firstName} onChange={e=>setAccount(a=>({...a, firstName: e.target.value}))} style={inp} onFocus={onF} onBlur={onB} />
        </Field>
        <Field label="Last name">
          <input type="text" value={account.lastName} onChange={e=>setAccount(a=>({...a, lastName: e.target.value}))} style={inp} onFocus={onF} onBlur={onB} />
        </Field>
      </div>
      <Field label="Email address" hint="Used for notifications, login, and payment confirmations.">
        <input type="email" value={account.email} readOnly style={{ ...inp, background: "var(--muted)", cursor: "not-allowed" }} onFocus={onF} onBlur={onB} />
      </Field>
      <Field label="Phone number" hint="For account verification only — not shown publicly.">
        <input type="tel" value={account.phone} onChange={e=>setAccount(a=>({...a, phone: e.target.value}))} style={inp} onFocus={onF} onBlur={onB} />
      </Field>
      <Field label="Public username">
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>@</span>
          <input type="text" value={account.username} readOnly style={{ ...inp, paddingLeft: "1.875rem", background: "var(--muted)", cursor: "not-allowed" }} onFocus={onF} onBlur={onB} />
        </div>
      </Field>
      <SaveBar onSave={save} saving={saved} />
    </div>
  );
}

/* ─── Security section ─── */
function SecuritySection() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pwd, setPwd] = useState({ current: "", new: "", confirm: "" });

  const save = async () => { 
    if (pwd.new !== pwd.confirm) {
      alert("New passwords don't match.");
      return;
    }
    if (pwd.new.length < 8) {
      alert("Password too short.");
      return;
    }
    try {
      await api.put('/api/auth/password', {
        current_password: pwd.current,
        new_password: pwd.new,
        new_password_confirmation: pwd.confirm,
      });
      setSaved(true); 
      setPwd({ current: "", new: "", confirm: "" });
      setTimeout(() => setSaved(false), 2000); 
    } catch(e: any) {
      alert(e.response?.data?.message || "Failed to update password");
    }
  };

  const sessions = [
    { device: "MacBook Pro — Safari", location: "Casablanca, MA", time: "Active now", current: true },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Change password */}
      <div>
        <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "1rem" }}>Change password</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <Field label="Current password">
            <div style={{ position: "relative" }}>
              <input type={showCurrent ? "text" : "password"} value={pwd.current} onChange={e=>setPwd(p=>({...p, current: e.target.value}))} placeholder="Enter current password" style={{ ...inp, paddingRight: "2.5rem" }} onFocus={onF} onBlur={onB} />
              <button aria-label={showCurrent ? "Hide password" : "Show password"} onClick={() => setShowCurrent(!showCurrent)} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}>
                {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </Field>
          <Field label="New password" hint="Minimum 8 characters.">
            <div style={{ position: "relative" }}>
              <input type={showNew ? "text" : "password"} value={pwd.new} onChange={e=>setPwd(p=>({...p, new: e.target.value}))} placeholder="Enter new password" style={{ ...inp, paddingRight: "2.5rem" }} onFocus={onF} onBlur={onB} />
              <button aria-label={showNew ? "Hide password" : "Show password"} onClick={() => setShowNew(!showNew)} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}>
                {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </Field>
          <Field label="Confirm new password">
            <input type="password" value={pwd.confirm} onChange={e=>setPwd(p=>({...p, confirm: e.target.value}))} placeholder="Repeat new password" style={inp} onFocus={onF} onBlur={onB} />
          </Field>
        </div>
        <SaveBar onSave={save} saving={saved} />
      </div>

      {/* 2FA */}
      <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
        <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>
          Two-factor authentication
        </h3>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem", background: twoFA ? "#ECFDF5" : "var(--background)", border: `1px solid ${twoFA ? "#A7F3D0" : "var(--border)"}`, borderRadius: "0.75rem" }}>
          <div style={{ width: 36, height: 36, borderRadius: "0.625rem", background: twoFA ? "#10B981" : "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: twoFA ? "#fff" : "var(--muted-foreground)" }}>
            {twoFA ? <Shield size={18} /> : <Smartphone size={18} />}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.9rem", color: "var(--foreground)", marginBottom: "0.25rem" }}>
              {twoFA ? "2FA is enabled" : "Enable two-factor authentication"}
            </p>
            <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
              {twoFA ? "Your account is protected with an authenticator app." : "Add an extra layer of protection to your account with an authenticator app or SMS."}
            </p>
          </div>
          <button
            onClick={() => setTwoFA(!twoFA)}
            style={{ padding: "0.4375rem 0.875rem", borderRadius: "0.5rem", border: `1px solid ${twoFA ? "#A7F3D0" : "var(--border)"}`, background: twoFA ? "#ECFDF5" : "var(--card)", color: twoFA ? "#065F46" : "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, flexShrink: 0 }}
          >
            {twoFA ? "Disable" : "Enable"}
          </button>
        </div>
      </div>

      {/* Active sessions */}
      <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
        <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>Active sessions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {sessions.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.75rem 1rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem" }}>
              <div style={{ width: 34, height: 34, borderRadius: "0.5rem", background: s.current ? "#DBEAFE" : "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", color: s.current ? "#1D4ED8" : "var(--muted-foreground)", flexShrink: 0 }}>
                <Smartphone size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>
                  {s.device}
                  {s.current && <span style={{ marginLeft: 8, padding: "0.1rem 0.4rem", borderRadius: 999, background: "#DBEAFE", color: "#1D4ED8", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700 }}>This device</span>}
                </p>
                <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{s.location} · {s.time}</p>
              </div>
              {!s.current && (
                <button style={{ padding: "0.3rem 0.625rem", borderRadius: "0.375rem", border: "1px solid #FECACA", background: "#FEF2F2", color: "#991B1B", cursor: "pointer", fontFamily: f.b, fontSize: "0.75rem" }}>
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Notifications section ─── */
function NotificationsSection() {
  const [prefs, setPrefs] = useState({
    emailCampaignInvite: true,
    emailApplicationUpdate: true,
    emailPayment: true,
    emailMarketing: false,
    pushNewMessage: true,
    pushDeadlineReminder: true,
    pushPaymentReleased: true,
    pushNewCampaignMatch: true,
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get('/api/auth/me');
        const user = res.data.data;
        if (user.influencer_profile?.preferences) {
           setPrefs(p => ({ ...p, ...user.influencer_profile.preferences }));
        }
      } catch(e) {} finally { setLoading(false); }
    };
    fetchMe();
  }, []);

  const set = (key: keyof typeof prefs) => setPrefs((p) => ({ ...p, [key]: !p[key] }));
  const save = async () => { 
    try {
      await api.put('/api/influencer/preferences', { preferences: prefs });
      setSaved(true); 
      setTimeout(() => setSaved(false), 2000); 
    } catch(e) {
      alert("Failed to save preferences.");
    }
  };

  if (loading) return <div style={{ padding: "2rem", color: "var(--muted-foreground)" }}>Loading...</div>;

  return (
    <div>
      <div style={{ marginBottom: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <Mail size={15} style={{ color: "var(--muted-foreground)" }} />
          <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>Email notifications</h3>
        </div>
        <div style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "0 1rem" }}>
          {[
            { key: "emailCampaignInvite" as const,    label: "Campaign invitations",     sub: "When a brand directly invites you to a campaign" },
            { key: "emailApplicationUpdate" as const, label: "Application updates",       sub: "When your application status changes" },
            { key: "emailPayment" as const,           label: "Payments & escrow",         sub: "Payment releases, escrow funding, withdrawals" },
            { key: "emailMarketing" as const,         label: "Platform news & tips",      sub: "Product updates, guides, and new features" },
          ].map((item, i, arr) => (
            <div key={item.key} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
              <Toggle value={prefs[item.key]} onChange={() => set(item.key)} label={item.label} sub={item.sub} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <Smartphone size={15} style={{ color: "var(--muted-foreground)" }} />
          <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>Push notifications</h3>
        </div>
        <div style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "0 1rem" }}>
          {[
            { key: "pushNewMessage" as const,         label: "New messages",              sub: "When a brand sends you a message" },
            { key: "pushDeadlineReminder" as const,   label: "Deadline reminders",        sub: "24h and 48h before content is due" },
            { key: "pushPaymentReleased" as const,    label: "Payment released",          sub: "When escrow is released to your wallet" },
            { key: "pushNewCampaignMatch" as const,   label: "New campaign matches",      sub: "When a new campaign matches your profile" },
          ].map((item, i, arr) => (
            <div key={item.key} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
              <Toggle value={prefs[item.key]} onChange={() => set(item.key)} label={item.label} sub={item.sub} />
            </div>
          ))}
        </div>
      </div>
      <SaveBar onSave={save} saving={saved} />
    </div>
  );
}

/* ─── Preferences section ─── */
function PreferencesSection() {
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const selStyle: React.CSSProperties = { ...inp, appearance: "none", paddingRight: "2rem", cursor: "pointer" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
        <Field label="Display language">
          <div style={{ position: "relative" }}>
            <select defaultValue="fr" style={selStyle} onFocus={onF} onBlur={onB}>
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
            <ChevronRight size={13} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%) rotate(90deg)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
          </div>
        </Field>
        <Field label="Timezone">
          <div style={{ position: "relative" }}>
            <select defaultValue="Africa/Casablanca" style={selStyle} onFocus={onF} onBlur={onB}>
              <option value="Africa/Casablanca">Africa/Casablanca (GMT+1)</option>
              <option value="Europe/Paris">Europe/Paris (GMT+2)</option>
              <option value="America/New_York">America/New_York (GMT-5)</option>
            </select>
            <ChevronRight size={13} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%) rotate(90deg)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
          </div>
        </Field>
      </div>
      <Field label="Currency display">
        <div style={{ position: "relative" }}>
          <select defaultValue="MAD" style={{ ...selStyle, width: "auto", minWidth: 200 }} onFocus={onF} onBlur={onB}>
            <option value="MAD">MAD — Moroccan Dirham</option>
            <option value="EUR">EUR — Euro</option>
            <option value="USD">USD — US Dollar</option>
          </select>
          <ChevronRight size={13} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%) rotate(90deg)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
        </div>
      </Field>
      <SaveBar onSave={save} saving={saved} />
    </div>
  );
}

/* ─── Danger section ─── */
function DangerSection() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Export */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "1rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.75rem" }}>
        <div>
          <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.9rem", color: "var(--foreground)", marginBottom: "0.25rem" }}>Export your data</p>
          <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>Download a full copy of your profile, applications, messages, and earnings history.</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", flexShrink: 0 }}>
          <Download size={14} /> Request export
        </button>
      </div>

      {/* Deactivate */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "1rem", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "0.75rem" }}>
        <div>
          <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.9rem", color: "#92400E", marginBottom: "0.25rem" }}>Deactivate account</p>
          <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "#A16207" }}>Hide your profile temporarily. You can reactivate at any time.</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #FCD34D", background: "#FFFBEB", color: "#92400E", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", flexShrink: 0 }}>
          <LogOut size={14} /> Deactivate
        </button>
      </div>

      {/* Delete */}
      <div style={{ padding: "1rem", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: confirmDelete ? "1.25rem" : 0 }}>
          <AlertTriangle size={18} style={{ color: "#EF4444", flexShrink: 0, marginTop: 1 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: f.b, fontWeight: 600, fontSize: "0.9rem", color: "#991B1B", marginBottom: "0.25rem" }}>Delete account</p>
            <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "#7F1D1D", lineHeight: 1.6 }}>
              Permanently delete your account and all associated data. This action cannot be undone. Any pending payments will be processed first.
            </p>
          </div>
          {!confirmDelete && (
            <button
              onClick={() => setConfirmDelete(true)}
              style={{ padding: "0.4375rem 0.875rem", borderRadius: "0.5rem", border: "1px solid #FECACA", background: "#FEE2E2", color: "#991B1B", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, flexShrink: 0 }}
            >
              Delete account
            </button>
          )}
        </div>
        {confirmDelete && (
          <div>
            <p style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "#991B1B", marginBottom: "0.5rem" }}>
              Type <strong>DELETE</strong> to confirm
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                placeholder="Type DELETE"
                style={{ ...inp, borderColor: "#FECACA", background: "#fff" }}
                onFocus={onF}
                onBlur={onB}
              />
              <button
                disabled={confirmInput !== "DELETE"}
                style={{ padding: "0 1rem", borderRadius: "0.5rem", border: "none", background: confirmInput === "DELETE" ? "#EF4444" : "var(--muted)", color: confirmInput === "DELETE" ? "#fff" : "var(--muted-foreground)", cursor: confirmInput === "DELETE" ? "pointer" : "default", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, flexShrink: 0 }}
              >
                Confirm delete
              </button>
              <button
                aria-label="Cancel deletion"
                onClick={() => { setConfirmDelete(false); setConfirmInput(""); }}
                style={{ width: 38, height: 38, borderRadius: "0.5rem", border: "1px solid #FECACA", background: "#FEF2F2", color: "#991B1B", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              >
                <X size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export function SettingsPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [section, setSection] = useState<SettingsSection>("account");

  const SECTION_CONTENT: Record<SettingsSection, { title: string; desc: string; content: React.ReactNode }> = {
    account:       { title: isFr ? "Informations du compte" : "Account information",     desc: isFr ? "Mettez a jour vos informations personnelles et votre identite." : "Update your personal details and public identity.",          content: <AccountSection /> },
    security:      { title: isFr ? "Mot de passe & Securite" : "Password & Security",     desc: isFr ? "Gerez votre mot de passe et les sessions actives." : "Manage your password, two-factor auth, and active sessions.", content: <SecuritySection /> },
    notifications: { title: isFr ? "Preferences de notification" : "Notification preferences", desc: isFr ? "Controlez ce que vous recevez et quand." : "Control what you hear about and when.",                    content: <NotificationsSection /> },
    preferences:   { title: isFr ? "Langue & preferences" : "Language & preferences",  desc: isFr ? "Langue d'affichage, fuseau horaire et devise." : "Display language, timezone, and currency settings.",         content: <PreferencesSection /> },
    danger:        { title: isFr ? "Gestion du compte" : "Account management",      desc: isFr ? "Exportez vos donnees ou supprimez definitivement votre compte." : "Export your data or permanently delete your account.",       content: <DangerSection /> },
  };

  const current = SECTION_CONTENT[section];

  return (
    <div style={{ padding: "1.75rem 1.5rem 4rem" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
          {isFr ? "Parametres" : "Settings"}
        </h1>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          {isFr ? "Gerez votre compte, securite et preferences" : "Manage your account, security, and preferences"}
        </p>
      </div>

      <div style={{ gap: "1.5rem", alignItems: "start" }} className="flex flex-col lg:grid lg:grid-cols-[240px_1fr]">
        {/* Nav */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", overflow: "hidden", padding: "0.375rem" }}>
          {NAV_ITEMS.map((item) => {
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  width: "100%", padding: "0.75rem 0.875rem",
                  background: active ? "var(--secondary)" : "transparent",
                  border: "none", borderRadius: "0.5rem",
                  cursor: "pointer", textAlign: "left",
                  color: active ? "var(--secondary-foreground)" : "var(--muted-foreground)",
                  transition: "all .12s",
                  marginBottom: "0.125rem",
                }}
              >
                <span style={{ color: active ? "var(--secondary-foreground)" : "var(--muted-foreground)", opacity: active ? 1 : 0.7 }}>{item.icon}</span>
                <div>
                  <p style={{ fontFamily: f.b, fontSize: "0.875rem", fontWeight: active ? 500 : 400, color: active ? "var(--secondary-foreground)" : "var(--foreground)", lineHeight: 1.2 }}>
                    {item.label}
                  </p>
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
            <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.125rem", color: "var(--foreground)", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
              {current.title}
            </h2>
            <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>{current.desc}</p>
          </div>
          {current.content}
        </div>
      </div>
    </div>
  );
}
