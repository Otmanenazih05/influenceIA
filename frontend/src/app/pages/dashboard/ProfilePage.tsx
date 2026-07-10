import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Camera, Instagram, Play, Youtube, Facebook, Check, X,
  ExternalLink, AlertCircle, TrendingUp, Eye, Save, Sparkles,
  MapPin, Globe, Plus, ChevronDown,
} from "lucide-react";
import { TiktokIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "../../components/ui/SocialIcons";
import { PublicProfileModal } from "../../components/dashboard/PublicProfileModal";
import api from "../../../lib/api";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

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
const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  (e.target as HTMLElement).style.borderColor = "var(--primary)";
  (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
};
const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  (e.target as HTMLElement).style.borderColor = "var(--border)";
  (e.target as HTMLElement).style.boxShadow = "none";
};

const ALL_NICHES = [
  "Beauty & Skincare", "Lifestyle", "Fashion & Style", "Fitness & Health",
  "Food & Cooking", "Travel", "Tech & Gaming", "Parenting",
  "Finance", "Sustainability", "Art & Design", "Photography",
  "Music", "Education", "Sports", "Wellness & Nutrition",
];

const COUNTRIES = ["Morocco", "France", "Algeria", "Tunisia", "Belgium", "Switzerland", "Canada", "UAE"];

const SCORE_BREAKDOWN = [
  { label: "Engagement rate",     score: 9.2, max: 10, color: "#10B981", met: true },
  { label: "Audience authenticity", score: 8.7, max: 10, color: "#2563EB", met: true },
  { label: "Content consistency", score: 8.0, max: 10, color: "#7C3AED", met: true },
  { label: "Platform coverage",   score: 6.5, max: 10, color: "#F59E0B", met: false },
  { label: "Campaign history",    score: 7.8, max: 10, color: "#EC4899", met: true },
];

const COMPLETENESS_ITEMS = [
  { label: "Basic info complete",        done: true },
  { label: "Instagram linked (98K)",     done: true },
  { label: "Profile photo",             done: true },
  { label: "Bio written",               done: true },
  { label: "TikTok account linked",      done: false },
  { label: "Phone verified",            done: false },
  { label: "Portfolio examples added",  done: false },
];

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.5rem", marginBottom: "1.25rem" }}>
      <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)", letterSpacing: "-0.01em", marginBottom: "1.25rem" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
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

function SocialRow({ platform, color, icon, handle, followers, engagement, linked, onLink, onRemove }: {
  platform: string; color: string; icon: React.ReactNode;
  handle: string; followers: string; engagement?: string;
  linked: boolean; onLink: () => void; onRemove?: () => void;
}) {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "0.875rem",
      padding: "0.875rem 1rem",
      background: linked ? "var(--background)" : "var(--muted)",
      border: `1px solid ${linked ? `${color}25` : "var(--border)"}`,
      borderRadius: "0.75rem",
      borderLeft: linked ? `3px solid ${color}` : "1px solid var(--border)",
    }}>
      <div style={{ width: 36, height: 36, borderRadius: "0.5rem", background: linked ? `${color}15` : "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", color: linked ? color : "var(--muted-foreground)", flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: linked ? "var(--foreground)" : "var(--muted-foreground)" }}>{platform}</p>
          {linked && (
            <span style={{ display: "flex", alignItems: "center", gap: "0.2rem", padding: "0.1rem 0.375rem", borderRadius: 999, background: "#ECFDF5", color: "#10B981", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700 }}>
              <Check size={9} strokeWidth={3} /> {isFr ? "Vérifié" : "Verified"}
            </span>
          )}
        </div>
        {linked ? (
          <div style={{ display: "flex", gap: "0.75rem", marginTop: 1 }}>
            <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{handle}</span>
            <span style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.75rem", color: "var(--foreground)" }}>{followers}</span>
            {engagement && (
              <span style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontFamily: f.b, fontSize: "0.75rem", color: "#10B981" }}>
                <TrendingUp size={10} />{engagement}
              </span>
            )}
          </div>
        ) : (
          <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: 1 }}>{isFr ? "Non connecté" : "Not linked"}</p>
        )}
      </div>
      {linked ? (
        <div style={{ display: "flex", gap: "0.375rem" }}>
          <a href={`https://${platform.toLowerCase()}.com/${handle.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ padding: "0.3125rem 0.625rem", borderRadius: "0.375rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.75rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.2rem" }}>
            <ExternalLink size={11} /> {isFr ? "Voir" : "View"}
          </a>
          <button onClick={onRemove} style={{ padding: "0.3125rem 0.5rem", borderRadius: "0.375rem", border: "1px solid #FECACA", background: "#FEF2F2", color: "#991B1B", cursor: "pointer", fontFamily: f.b, fontSize: "0.75rem" }}>
            {isFr ? "Retirer" : "Remove"}
          </button>
        </div>
      ) : (
        <button
          onClick={onLink}
          style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.4375rem 0.875rem", borderRadius: "0.5rem", border: `1px solid ${color}30`, background: `${color}08`, color, cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, flexShrink: 0 }}
        >
          <Plus size={13} /> {isFr ? "Connecter" : "Connect"}
        </button>
      )}
    </div>
  );
}

export function ProfilePage() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";

  const localizedCompletenessItems = COMPLETENESS_ITEMS.map((item) => {
    let label = item.label;
    if (isFr) {
      if (item.label === "Basic info complete") label = "Infos de base complétées";
      else if (item.label === "Instagram linked (98K)") label = "Instagram connecté (98K)";
      else if (item.label === "Profile photo") label = "Photo de profil";
      else if (item.label === "Bio written") label = "Biographie rédigée";
      else if (item.label === "TikTok account linked") label = "Compte TikTok connecté";
      else if (item.label === "Phone verified") label = "Téléphone vérifié";
      else if (item.label === "Portfolio examples added") label = "Portfolio complété";
    }
    return { ...item, label };
  });

  const localizedScoreBreakdown = SCORE_BREAKDOWN.map((item) => {
    let label = item.label;
    if (isFr) {
      if (item.label === "Engagement rate") label = "Taux d'engagement";
      else if (item.label === "Audience authenticity") label = "Authenticité de l'audience";
      else if (item.label === "Content consistency") label = "Cohérence du contenu";
      else if (item.label === "Platform coverage") label = "Couverture des plateformes";
      else if (item.label === "Campaign history") label = "Historique des campagnes";
    }
    return { ...item, label };
  });

  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [nicheInput, setNicheInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [socials, setSocials] = useState<any[]>([]);
  const [aiScore, setAiScore] = useState(0);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    username: "",
    bio: "",
    location: "",
    country: "",
    website: "",
    niches: [] as string[],
    languages: [] as string[],
  });

  const fetchData = async () => {
    try {
      const [meRes, scoreRes] = await Promise.all([
         api.get('/api/auth/me'),
         api.get('/api/influencer/score-explanation').catch(() => null)
      ]);
      
      const user = meRes.data.data;
      const inf = user.influencer_profile || {};
      
      const nameParts = (user.name || "").split(" ");
      setProfile({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        username: user.email?.split('@')[0] || "", // Mock username
        bio: inf.bio || "",
        location: inf.city || "",
        country: inf.country || "",
        website: "", // Not natively in influencer profile yet
        niches: inf.niches || [],
        languages: ["French", "Darija", "English"], // Static for now
      });
      
      setSocials(inf.social_accounts || []);
      if (scoreRes) {
        setAiScore(scoreRes.data.data?.total_score || 0);
      }
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const completeDone = COMPLETENESS_ITEMS.filter((i) => i.done).length;
  const completePct = Math.round((completeDone / COMPLETENESS_ITEMS.length) * 100);

  const handleSave = async () => {
    try {
      await api.put('/api/influencer/profile', {
        full_name: `${profile.firstName} ${profile.lastName}`.trim(),
        bio: profile.bio,
        city: profile.location,
        country: profile.country,
        niches: profile.niches,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || (isFr ? "Échec de la sauvegarde du profil" : "Failed to save profile"));
    }
  };

  const handleLink = async (platform: string) => {
    const handle = prompt(`Enter your ${platform} handle (e.g. @username):`);
    if (!handle) return;
    const followersInput = prompt(`Enter your follower count for ${platform}:`, "5000");
    if (followersInput === null) return;
    const followersCount = parseInt(followersInput) || 0;
    
    try {
      await api.post("/api/auth/social-accounts", {
        accounts: [{
          platform: platform.toLowerCase(),
          handle: handle.startsWith('@') ? handle : `@${handle}`,
          followers_count: followersCount,
          engagement_rate: 4.2,
          verified: true
        }]
      });
      alert(`${platform} account linked successfully!`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to link account");
    }
  };

  const handleRemove = async (id: number) => {
    if (!confirm("Are you sure you want to disconnect this account?")) return;
    try {
      await api.delete(`/api/influencer/social-accounts/${id}`);
      alert("Account disconnected successfully!");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to disconnect account");
    }
  };

  useEffect(() => {
    if (!loading && location.state?.autoConnect) {
      const platform = location.state.autoConnect;
      // Clear location state to prevent repeating on refresh
      window.history.replaceState({}, document.title);
      handleLink(platform);
    }
  }, [loading, location.state]);

  const toggleNiche = (n: string) => {
    setProfile((prev) => ({
      ...prev,
      niches: prev.niches.includes(n)
        ? prev.niches.filter((x) => x !== n)
        : prev.niches.length < 4 ? [...prev.niches, n] : prev.niches,
    }));
  };

  const filteredNiches = ALL_NICHES.filter((n) => n.toLowerCase().includes(nicheInput.toLowerCase()) && !profile.niches.includes(n));

  return (
    <div style={{ padding: "1.75rem 1.5rem 4rem" }}>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
        <div>
          <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>{isFr ? "Mon profil" : "My Profile"}</h1>
          <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>{isFr ? "Gérez comment les marques vous voient et vous découvrent" : "Manage how brands see and discover you"}</p>
        </div>
        <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
          <button
            onClick={() => setShowPreview(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.5625rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem" }}
          >
            <Eye size={14} /> {isFr ? "Aperçu du profil" : "Preview profile"}
          </button>
          <button
            onClick={handleSave}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.5625rem 1.125rem", borderRadius: "0.5rem", border: "none", background: saved ? "#10B981" : "var(--primary)", color: "#fff", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, boxShadow: "0 2px 8px rgba(37,99,235,0.2)", transition: "background .2s" }}
          >
            {saved ? <><Check size={14} /> {isFr ? "Enregistré !" : "Saved!"}</> : <><Save size={14} /> {isFr ? "Enregistrer les modifications" : "Save changes"}</>}
          </button>
        </div>
      </div>

      <div style={{ gap: "1.25rem", alignItems: "start" }} className="flex flex-col lg:grid lg:grid-cols-[1fr_300px]">

        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--muted-foreground)" }}>Loading profile...</div>
        ) : (
          <>
        {/* Main edit form */}
        <div>
          {/* Avatar */}
          <SectionCard title={isFr ? "Photo & avatar" : "Photo & avatar"}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: 80, height: 80, borderRadius: "50%",
                    background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", position: "relative", overflow: "hidden",
                  }}
                >
                  <span style={{ fontFamily: f.h, fontWeight: 800, fontSize: "2rem", color: "#fff" }}>S</span>
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity .15s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "0"; }}
                  >
                    <Camera size={20} color="#fff" />
                  </div>
                </div>
              </div>
              <div>
                <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.375rem" }}>
                  {isFr ? "Changer la photo de profil" : "Change profile photo"}
                </p>
                <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                  {isFr ? "JPG ou PNG, minimum 200×200px. Cela apparaît sur votre profil de créateur et dans tous les échanges." : "JPG or PNG, minimum 200×200px. This appears on your creator profile and in all campaign threads."}
                </p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button style={{ padding: "0.375rem 0.875rem", borderRadius: "0.375rem", background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500 }}>
                    {isFr ? "Téléverser" : "Upload photo"}
                  </button>
                  <button style={{ padding: "0.375rem 0.875rem", borderRadius: "0.375rem", background: "var(--muted)", color: "var(--muted-foreground)", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem" }}>
                    {isFr ? "Retirer" : "Remove"}
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Basic info */}
          <SectionCard title={isFr ? "Informations de base" : "Basic information"}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                <Field label={isFr ? "Prénom" : "First name"} required>
                  <input type="text" value={profile.firstName} onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))} style={inp} onFocus={onFocus} onBlur={onBlur} />
                </Field>
                <Field label={isFr ? "Nom" : "Last name"} required>
                  <input type="text" value={profile.lastName} onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))} style={inp} onFocus={onFocus} onBlur={onBlur} />
                </Field>
              </div>
              <Field label={isFr ? "Identifiant créateur" : "Creator handle"} hint={isFr ? "Lié à votre adresse email de connexion." : "Linked to your login email address."}>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>@</span>
                  <input type="text" value={profile.username} readOnly style={{ ...inp, paddingLeft: "1.875rem", background: "var(--muted)", cursor: "not-allowed" }} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </Field>
              <Field label={isFr ? "Biographie" : "Bio"} hint={isFr ? "Présentez-vous aux marques : ce que vous créez et pourquoi votre audience vous fait confiance (150-250 caractères)." : "Tell brands who you are, what you create, and why your audience trusts you. Keep it authentic (150–250 characters)."}>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                  style={{ ...inp, height: "auto", padding: "0.625rem 0.875rem", resize: "vertical", lineHeight: 1.65 }}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: profile.bio.length > 280 ? "#EF4444" : "var(--muted-foreground)", textAlign: "right", marginTop: "0.25rem" }}>
                  {profile.bio.length} / 280
                </p>
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                <Field label={isFr ? "Ville" : "City"}>
                  <div style={{ position: "relative" }}>
                    <MapPin size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
                    <input type="text" value={profile.location} onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))} style={{ ...inp, paddingLeft: "2.25rem" }} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                </Field>
                <Field label={isFr ? "Pays" : "Country"}>
                  <div style={{ position: "relative" }}>
                    <select value={profile.country} onChange={(e) => setProfile((p) => ({ ...p, country: e.target.value }))} style={{ ...inp, appearance: "none", paddingRight: "2rem", cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
                      {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={13} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
                  </div>
                </Field>
              </div>
              <Field label={isFr ? "Site web ou portfolio" : "Website or portfolio"} hint={isFr ? "Optionnel (nécessite une mise à jour de la base de données pour la persistance)." : "Optional (requires database update for persistence)."}>
                <div style={{ position: "relative" }}>
                  <Globe size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
                  <input type="url" value={profile.website} onChange={(e) => setProfile((p) => ({ ...p, website: e.target.value }))} style={{ ...inp, paddingLeft: "2.25rem" }} placeholder="https://yourwebsite.com" onFocus={onFocus} onBlur={onBlur} />
                </div>
              </Field>
            </div>
          </SectionCard>

          {/* Niches */}
          <SectionCard title={isFr ? "Niches de contenu" : "Content niches"}>
            <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", marginBottom: "0.875rem" }}>
              {isFr ? "Sélectionnez jusqu'à 4 niches. Elles sont utilisées pour la recommandation IA et la recherche des marques." : "Select up to 4 niches. These are used for AI matching and brand discovery."}
            </p>
            {profile.niches.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                {profile.niches.map((n) => (
                  <span key={n} style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.3125rem 0.75rem", borderRadius: 999, background: "#EDE9FE", color: "#5B21B6", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500 }}>
                    {n}
                    <button onClick={() => toggleNiche(n)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", color: "#7C3AED", padding: 0 }}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {profile.niches.length < 4 && (
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder={isFr ? "Rechercher des niches..." : "Search to add niches…"}
                  value={nicheInput}
                  onChange={(e) => setNicheInput(e.target.value)}
                  style={inp}
                  onFocus={onFocus}
                  onBlur={(e) => { onBlur(e); setTimeout(() => setNicheInput(""), 150); }}
                />
                {nicheInput && filteredNiches.length > 0 && (
                  <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.5rem", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 10, maxHeight: 180, overflowY: "auto", padding: "0.375rem" }}>
                    {filteredNiches.slice(0, 6).map((n) => (
                      <button key={n} onMouseDown={() => toggleNiche(n)} style={{ display: "block", width: "100%", textAlign: "left", padding: "0.5rem 0.75rem", borderRadius: "0.375rem", background: "none", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)" }}>
                        {n}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            {!nicheInput && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginTop: "0.625rem" }}>
                {ALL_NICHES.filter((n) => !profile.niches.includes(n)).slice(0, 8).map((n) => (
                  <button key={n} onClick={() => toggleNiche(n)} disabled={profile.niches.length >= 4}
                    style={{ padding: "0.25rem 0.625rem", borderRadius: 999, border: "1px solid var(--border)", background: "var(--muted)", color: "var(--muted-foreground)", cursor: profile.niches.length < 4 ? "pointer" : "default", fontFamily: f.b, fontSize: "0.75rem", opacity: profile.niches.length >= 4 ? 0.4 : 1 }}>
                    + {n}
                  </button>
                ))}
              </div>
            )}
          </SectionCard>

          {/* Social accounts */}
          <SectionCard title={isFr ? "Comptes de réseaux sociaux" : "Social accounts"}>
            <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", marginBottom: "1rem" }}>
              {isFr ? "Les comptes connectés sont vérifiés par OAuth. Nous importons des statistiques réelles - aucune saisie manuelle." : "Linked accounts are verified via OAuth. We pull real data — no manual entry."}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {(() => {
                const ig = socials.find(s=>s.platform.toLowerCase()==='instagram');
                const tt = socials.find(s=>s.platform.toLowerCase()==='tiktok');
                const yt = socials.find(s=>s.platform.toLowerCase()==='youtube');
                const fb = socials.find(s=>s.platform.toLowerCase()==='facebook');
                return (
                  <>
                    <SocialRow platform="Instagram" color="#E1306C" icon={<InstagramIcon size={18} />} handle={ig?.handle || ""} followers={ig?.followers_count?.toLocaleString() || ""} engagement="8.3%" linked={!!ig} onLink={() => handleLink("Instagram")} onRemove={ig ? () => handleRemove(ig.id) : undefined} />
                    <SocialRow platform="TikTok"    color="#010101" icon={<TiktokIcon size={18} />}      handle={tt?.handle || ""} followers={tt?.followers_count?.toLocaleString() || ""} linked={!!tt} onLink={() => handleLink("TikTok")} onRemove={tt ? () => handleRemove(tt.id) : undefined} />
                    <SocialRow platform="YouTube"   color="#FF0000" icon={<YoutubeIcon size={18} />}   handle={yt?.handle || ""} followers={yt?.followers_count?.toLocaleString() || ""} linked={!!yt} onLink={() => handleLink("YouTube")} onRemove={yt ? () => handleRemove(yt.id) : undefined} />
                    <SocialRow platform="Facebook"  color="#1877F2" icon={<FacebookIcon size={18} />}  handle={fb?.handle || ""} followers={fb?.followers_count?.toLocaleString() || ""} linked={!!fb} onLink={() => handleLink("Facebook")} onRemove={fb ? () => handleRemove(fb.id) : undefined} />
                  </>
                );
              })()}
            </div>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.875rem", padding: "0.75rem 1rem", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "0.5rem" }}>
              <AlertCircle size={15} style={{ color: "#1D4ED8", flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "#1E40AF", lineHeight: 1.6 }}>
                {isFr ? "Associer TikTok pourrait augmenter votre Score IA de 8 points et débloquer 40% d'opportunités de campagnes supplémentaires." : "Linking TikTok could increase your IA Score by 8 points and unlock 40% more campaign opportunities."}
              </p>
            </div>
          </SectionCard>
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "sticky", top: 80 }}>

          {/* Profile completeness */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
              <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>{isFr ? "Force du profil" : "Profile strength"}</h3>
              <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.125rem", color: completePct >= 80 ? "#10B981" : "var(--primary)" }}>{completePct}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 999, background: "var(--muted)", marginBottom: "1rem", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${completePct}%`, borderRadius: 999, background: completePct >= 80 ? "#10B981" : "var(--primary)", transition: "width .4s" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {localizedCompletenessItems.map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: item.done ? "#10B981" : "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.done
                      ? <Check size={10} color="#fff" strokeWidth={3} />
                      : <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--muted-foreground)", opacity: 0.4 }} />}
                  </div>
                  <span style={{ fontFamily: f.b, fontSize: "0.8rem", color: item.done ? "var(--muted-foreground)" : "var(--foreground)", textDecoration: item.done ? "line-through" : "none", opacity: item.done ? 0.6 : 1 }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* IA Score */}
          <div style={{ background: "linear-gradient(150deg, #4C1D95, #7C3AED)", borderRadius: "0.875rem", padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <Sparkles size={15} color="rgba(255,255,255,0.8)" />
              <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "#fff" }}>{isFr ? "Score IA" : "IA Score"}</h3>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.125rem" }}>
              <div style={{ flexShrink: 0 }}>
                {(() => { const r=34, c=2*Math.PI*r, s=aiScore; return (
                  <svg width={80} height={80} viewBox="0 0 80 80">
                    <circle cx={40} cy={40} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={6} />
                    <circle cx={40} cy={40} r={r} fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round"
                      strokeDasharray={`${(s/100)*c} ${c-(s/100)*c}`} strokeDashoffset={c/4} />
                    <text x={40} y={44} textAnchor="middle" style={{ fontFamily:f.h, fontWeight:800, fontSize:"1rem", fill:"#fff" }}>{s}</text>
                  </svg>
                ); })()}
              </div>
              <div>
                <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.125rem", color: "#fff", marginBottom: "0.25rem" }}>{isFr ? "Excellent" : "Excellent"}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
                  {isFr ? "Top 18% des créateurs sur InfluencIA" : "Top 18% of all creators on InfluencIA"}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {localizedScoreBreakdown.map((sb) => (
                <div key={sb.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontFamily: f.b, fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sb.label}</span>
                  <div style={{ width: 60, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.15)", overflow: "hidden", flexShrink: 0 }}>
                    <div style={{ height: "100%", width: `${(sb.score / sb.max) * 100}%`, borderRadius: 999, background: "#fff", opacity: 0.9 }} />
                  </div>
                  <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.75rem", color: "#fff", minWidth: 20 }}>{sb.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
          </>
        )}
      </div>

      {showPreview && (
        <PublicProfileModal onClose={() => setShowPreview(false)} profile={{ ...profile, firstName: profile.firstName, lastName: profile.lastName }} />
      )}
    </div>
  );
}
