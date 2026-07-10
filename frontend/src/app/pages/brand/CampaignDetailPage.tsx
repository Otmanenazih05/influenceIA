import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft, CheckCircle, XCircle, ExternalLink, AlertCircle,
  Users, TrendingUp, Calendar, CreditCard,
  Zap, MessageSquare, Star, Check, X, ChevronDown,
} from "lucide-react";
import { TiktokIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "../../components/ui/SocialIcons";
import {
  brandCampaigns, mockSubmissions,
  type BrandApplicant, type ContentSubmission,
} from "../../data/brandCampaigns";
import api from "../../../lib/api";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

const STATUS_CFG: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  draft:     { label: "Draft",     color: "#6B7280", bg: "var(--muted)", dot: "#9CA3AF" },
  active:    { label: "Active",    color: "#065F46", bg: "#D1FAE5",      dot: "#10B981" },
  reviewing: { label: "Reviewing", color: "#92400E", bg: "#FEF3C7",      dot: "#F59E0B" },
  paused:    { label: "Paused",    color: "#1D4ED8", bg: "#DBEAFE",      dot: "#2563EB" },
  completed: { label: "Completed", color: "#5B21B6", bg: "#EDE9FE",      dot: "#7C3AED" },
};

function PlatformPip({ p }: { p: string }) {
  const map: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
    instagram: { color: "#E1306C", icon: <InstagramIcon size={11} />, label: "IG" },
    tiktok:    { color: "#010101", icon: <TiktokIcon size={11} />,      label: "TK" },
    youtube:   { color: "#FF0000", icon: <YoutubeIcon size={11} />,   label: "YT" },
    facebook:  { color: "#1877F2", icon: <FacebookIcon size={11} />,  label: "FB" },
  };
  const m = map[p];
  if (!m) return null;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", padding: "0.175rem 0.5rem", borderRadius: 999, background: `${m.color}14`, color: m.color, fontFamily: f.b, fontSize: "0.68rem", fontWeight: 700 }}>{m.icon}{m.label}</span>;
}

/* ─── Creator applicant card ─── */
function ApplicantCard({
  applicant, onAction,
}: {
  applicant: BrandApplicant;
  onAction: (id: string, action: "accept" | "reject" | "shortlist") => void;
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const statusMap = isFr ? {
    pending:     { label: "En attente de revue",  color: "#92400E", bg: "#FEF3C7" },
    shortlisted: { label: "Présélectionné",     color: "#1D4ED8", bg: "#DBEAFE" },
    accepted:    { label: "Accepté",        color: "#065F46", bg: "#D1FAE5" },
    rejected:    { label: "Non sélectionné",    color: "#991B1B", bg: "#FEE2E2" },
    submitted:   { label: "Contenu soumis",    color: "#5B21B6", bg: "#EDE9FE" },
    revision:    { label: "Révision demandée",  color: "#C2410C", bg: "#FFEDD5" },
    approved:    { label: "Approuvé",        color: "#065F46", bg: "#D1FAE5" },
    completed:   { label: "Terminé",         color: "#065F46", bg: "#D1FAE5" },
  } : {
    pending:     { label: "Pending review",  color: "#92400E", bg: "#FEF3C7" },
    shortlisted: { label: "Shortlisted",     color: "#1D4ED8", bg: "#DBEAFE" },
    accepted:    { label: "Accepted",        color: "#065F46", bg: "#D1FAE5" },
    rejected:    { label: "Not selected",    color: "#991B1B", bg: "#FEE2E2" },
    submitted:   { label: "Content submitted", color: "#5B21B6", bg: "#EDE9FE" },
    revision:    { label: "Revision requested",color: "#C2410C", bg: "#FFEDD5" },
    approved:    { label: "Approved",        color: "#065F46", bg: "#D1FAE5" },
    completed:   { label: "Completed",       color: "#065F46", bg: "#D1FAE5" },
  };
  const st = statusMap[applicant.status as keyof typeof statusMap] || { label: applicant.status, color: "#6B7280", bg: "#F3F4F6" };
  const matchColor = applicant.matchScore >= 90 ? "#10B981" : applicant.matchScore >= 80 ? "#2563EB" : applicant.matchScore >= 70 ? "#7C3AED" : "#6B7280";
  const scoreColor = applicant.iaScore >= 80 ? "#7C3AED" : applicant.iaScore >= 70 ? "#2563EB" : "#6B7280";

  return (
    <div style={{
      background: "var(--card)", border: `1px solid ${applicant.status === "rejected" ? "#FECACA" : "var(--border)"}`,
      borderRadius: "0.875rem", padding: "1.125rem 1.25rem",
      opacity: applicant.status === "rejected" ? 0.6 : 1,
    }}>
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${applicant.color}22`, display: "flex", alignItems: "center", justifyContent: "center", color: applicant.color, fontFamily: f.h, fontWeight: 700, fontSize: "1.0625rem", flexShrink: 0 }}>
            {applicant.avatar}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <p style={{ fontFamily: f.b, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>{applicant.name}</p>
              {applicant.pastCollabs > 0 && (
                <span style={{ padding: "0.1rem 0.4rem", borderRadius: 999, background: "#ECFDF5", color: "#065F46", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600 }}>
                  {applicant.pastCollabs} {isFr ? "collabs passées" : "past collabs"}
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <span style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)" }}>{applicant.handle}</span>
              <PlatformPip p={applicant.platform} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
          <span style={{ padding: "0.2rem 0.625rem", borderRadius: 999, background: st.bg, color: st.color, fontFamily: f.b, fontSize: "0.72rem", fontWeight: 600 }}>{st.label}</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.875rem" }}>
        {[
          { label: "Followers", value: applicant.followers },
          { label: "Engagement", value: applicant.engagement },
          {
            label: "Match", value: (
              <span style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                <Zap size={11} style={{ color: matchColor }} />
                <span style={{ color: matchColor, fontWeight: 700 }}>{applicant.matchScore}%</span>
              </span>
            )
          },
          {
            label: "IA Score", value: (
              <span style={{ color: scoreColor, fontWeight: 700 }}>{applicant.iaScore}</span>
            )
          },
        ].map((m) => (
          <div key={m.label} style={{ padding: "0.5rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.5rem", textAlign: "center" }}>
            <p style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)", marginBottom: 2 }}>{m.label}</p>
            <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Bio */}
      <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: "0.875rem" }}>
        {applicant.bio}
      </p>
      <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)", marginBottom: "0.875rem" }}>
        📍 {applicant.location} · {applicant.niche}
      </p>

      {/* Actions */}
      {(applicant.status === "pending" || applicant.status === "shortlisted") && (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => onAction(applicant.id, "reject")}
            style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.4375rem 0.875rem", borderRadius: "0.5rem", border: "1px solid #FECACA", background: "#FEF2F2", color: "#991B1B", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem" }}
          >
            <XCircle size={13} /> Decline
          </button>
          {applicant.status === "pending" && (
            <button
              onClick={() => onAction(applicant.id, "shortlist")}
              style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.4375rem 0.875rem", borderRadius: "0.5rem", border: "1px solid #BFDBFE", background: "#EFF6FF", color: "#1D4ED8", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem" }}
            >
              <Star size={13} /> Shortlist
            </button>
          )}
          <button
            onClick={() => onAction(applicant.id, "accept")}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem", padding: "0.4375rem 0.875rem", borderRadius: "0.5rem", border: "none", background: "var(--primary)", color: "#fff", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, boxShadow: "0 2px 6px rgba(37,99,235,0.2)" }}
          >
            <CheckCircle size={13} /> Accept
          </button>
        </div>
      )}
      {applicant.status !== "pending" && applicant.status !== "shortlisted" && applicant.status !== "rejected" && (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => navigate("/brand/messaging", { 
              state: { 
                influencerProfileId: applicant.influencerProfileId,
                targetUserId: applicant.targetUserId,
                campaignId: id
              } 
            })}
            style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.4375rem 0.875rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem" }}
          >
            <MessageSquare size={13} /> Message
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.4375rem 0.875rem", borderRadius: "0.5rem", background: "#D1FAE5", color: "#065F46", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500 }}>
            <Check size={13} /> Collaboration active
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Submission row ─── */
function SubmissionRow({ sub, onAction }: { sub: any; onAction: (id: string, action: "approve" | "revision", note?: string) => void }) {
  const [revNote, setRevNote] = useState("");
  const [showRevision, setShowRevision] = useState(false);
  const statusMap: Record<string, { label: string; color: string; bg: string }> = {
    pending:  { label: "Awaiting review", color: "#92400E", bg: "#FEF3C7" },
    submitted: { label: "Awaiting review", color: "#92400E", bg: "#FEF3C7" },
    pending_review: { label: "Awaiting review", color: "#92400E", bg: "#FEF3C7" },
    approved: { label: "Approved",        color: "#065F46", bg: "#D1FAE5" },
    revision: { label: "Revision requested", color: "#C2410C", bg: "#FFEDD5" },
    revision_requested: { label: "Revision requested", color: "#C2410C", bg: "#FFEDD5" },
  };
  const st = statusMap[sub.status] || { label: "Awaiting review", color: "#92400E", bg: "#FEF3C7" };
  return (
    <div style={{ padding: "1rem 1.125rem", borderBottom: "1px solid var(--border)", background: sub.status === "revision" ? "#FFFBEB" : "transparent" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: `${sub.creatorColor}22`, display: "flex", alignItems: "center", justifyContent: "center", color: sub.creatorColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>
          {sub.creatorName[0]}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{sub.creatorName} — {sub.deliverable}</p>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: 2, flexWrap: "wrap" }}>
                <a href={sub.url} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", fontFamily: f.b, fontSize: "0.78rem", color: "var(--primary)", textDecoration: "none" }}>
                  <ExternalLink size={11} /> View content
                </a>
                <span style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)" }}>Submitted {sub.submittedAt}</span>
              </div>
            </div>
            <span style={{ padding: "0.2rem 0.625rem", borderRadius: 999, background: st.bg, color: st.color, fontFamily: f.b, fontSize: "0.72rem", fontWeight: 600, flexShrink: 0 }}>{st.label}</span>
          </div>
          {sub.status === "revision" && sub.revisionNote && (
            <div style={{ display: "flex", gap: "0.5rem", padding: "0.5rem 0.75rem", background: "#FFEDD5", border: "1px solid #FED7AA", borderRadius: "0.375rem", marginTop: "0.625rem" }}>
              <AlertCircle size={13} style={{ color: "#C2410C", flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontFamily: f.b, fontSize: "0.8rem", color: "#7C2D12" }}>{sub.revisionNote}</p>
            </div>
          )}
          {(sub.status === "pending" || sub.status === "submitted" || sub.status === "pending_review") && (
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
              <button onClick={() => setShowRevision(!showRevision)} style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.375rem 0.75rem", borderRadius: "0.375rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem" }}>
                <AlertCircle size={12} /> Request revision
              </button>
              <button onClick={() => onAction(sub.id, "approve")} style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.375rem 0.875rem", borderRadius: "0.375rem", border: "none", background: "#10B981", color: "#fff", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500 }}>
                <CheckCircle size={12} /> Approve content
              </button>
            </div>
          )}
          {showRevision && (
            <div style={{ marginTop: "0.625rem", display: "flex", gap: "0.5rem" }}>
              <input type="text" value={revNote} onChange={(e) => setRevNote(e.target.value)} placeholder="Describe what needs to change…" style={{ flex: 1, height: "2.25rem", padding: "0 0.75rem", borderRadius: "0.375rem", border: "1px solid var(--border)", background: "var(--input-background)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.8125rem", outline: "none" }} onFocus={(e) => { e.target.style.borderColor = "#F97316"; }} onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }} />
              <button onClick={() => { onAction(sub.id, "revision", revNote); setShowRevision(false); setRevNote(""); }} style={{ padding: "0 0.875rem", borderRadius: "0.375rem", background: "#F97316", color: "#fff", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, flexShrink: 0 }}>
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main ─── */
type Tab = "applicants" | "accepted" | "submissions" | "payments";

export function CampaignDetailPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const { id } = useParams();
  const [campaign, setCampaign] = useState<any>(null);
  const [tab, setTab] = useState<Tab>("applicants");
  const [applicants, setApplicants] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "shortlisted" | "accepted" | "rejected">("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const [cRes, aRes] = await Promise.all([
          api.get(`/api/campaigns/${id}`),
          api.get(`/api/campaigns/${id}/applications`)
        ]);
        setCampaign(cRes.data.data);
        
        const apps = (aRes.data.data || []).map((app: any) => {
          const profile = app.influencer_profile || {};
          const socials = profile.social_accounts || [];
          return {
            id: app.id,
            name: profile.full_name || "Creator",
            handle: socials[0]?.handle || "@unknown",
            platform: socials[0]?.platform || "instagram",
            followers: socials[0]?.followers_count || 0,
            engagement: (socials[0]?.engagement_rate || 0) + "%",
            location: profile.country || "Unknown",
            niche: (profile.niches || [])[0] || "General",
            pastCollabs: 0,
            matchScore: app.match_score || 0,
            iaScore: profile.ai_score || 0,
            bio: profile.bio || "",
            status: app.status,
            color: "#1D4ED8",
            avatar: (profile.full_name || "C")[0].toUpperCase(),
            influencerProfileId: profile.id,
            targetUserId: profile.user_id,
            payment: app.payment
          };
        });
        setApplicants(apps);

        // Extract real submissions — only those with actual content_url (meaning creator has submitted)
        const allSubs: any[] = [];
        (aRes.data.data || []).forEach((app: any) => {
          const profile = app.influencer_profile || {};
          const appSubs = (app.content_submissions || []).filter((sub: any) =>
            // Only include submissions that have an actual URL (meaning creator submitted content)
            sub.content_url && sub.content_url.trim() !== ""
          );

          appSubs.forEach((sub: any) => {
            allSubs.push({
              id: sub.id.toString(),
              applicationId: app.id.toString(),
              creatorName: profile.full_name || "Creator",
              creatorColor: "#1D4ED8",
              deliverable: sub.deliverable_label || "Post",
              url: sub.content_url || "",
              status: sub.status,
              submittedAt: sub.submitted_at ? new Date(sub.submitted_at).toLocaleDateString() : new Date().toLocaleDateString(),
              revisionNote: sub.revision_note || ""
            });
          });
        });
        setSubmissions(allSubs);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleApplicantAction = async (appId: string, action: "accept" | "reject" | "shortlist") => {
    const statusMap = { accept: "accepted", reject: "rejected", shortlist: "shortlisted" };
    const newStatus = statusMap[action];
    try {
      await api.put(`/api/campaigns/${id}/applications/${appId}`, { status: newStatus });
      setApplicants((prev) => prev.map((a) => a.id === appId ? { ...a, status: newStatus } : a));
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmissionAction = async (subId: string, action: "approve" | "revision", note?: string) => {
    const apiStatus = action === "approve" ? "approved" : "revision";
    try {
      await api.put(`/api/submissions/${subId}`, {
        status: apiStatus,
        revision_note: note
      });
      setSubmissions((prev) => prev.map((s) => s.id === subId ? { ...s, status: apiStatus, revisionNote: note || "" } : s));
    } catch (err) {
      console.error(err);
      alert("Failed to update submission status: " + ((err as any).response?.data?.message || "Error"));
    }
  };

  const handleInitiatePayment = async (appId: string, amount: number) => {
    try {
      const res = await api.post(`/api/applications/${appId}/payments/initiate`, { amount });
      const newPayment = res.data.data;
      setApplicants((prev) => prev.map((a) => a.id === appId ? { ...a, payment: newPayment } : a));
      alert("Payment initiated successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to initiate payment: " + ((err as any).response?.data?.message || "Error"));
    }
  };

  const handleFundPayment = async (paymentId: number, appId: string) => {
    try {
      const res = await api.put(`/api/payments/${paymentId}/fund`);
      const updatedPayment = res.data.data;
      setApplicants((prev) => prev.map((a) => a.id === appId ? { ...a, payment: updatedPayment } : a));
      alert("Escrow funded successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to fund escrow: " + ((err as any).response?.data?.message || "Error"));
    }
  };

  const handleReleasePayment = async (paymentId: number, appId: string) => {
    try {
      const res = await api.put(`/api/payments/${paymentId}/release`);
      const updatedPayment = res.data.data;
      setApplicants((prev) => prev.map((a) => a.id === appId ? { ...a, payment: updatedPayment } : a));
      alert("Payment released successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to release payment: " + ((err as any).response?.data?.message || "Error"));
    }
  };

  if (isLoading) return <div style={{ padding: "3rem", color: "var(--muted-foreground)" }}>{isFr ? "Chargement..." : "Loading..."}</div>;
  if (!campaign) return <div style={{ padding: "3rem", color: "#EF4444" }}>{isFr ? "Campagne introuvable." : "Campaign not found."}</div>;

  const sc = STATUS_CFG[campaign.status] ?? STATUS_CFG.draft;
  const scLabel = isFr ? {
    draft: "Brouillon",
    active: "Active",
    reviewing: "En revue",
    paused: "En pause",
    completed: "Terminée"
  }[campaign.status as string] || sc.label : sc.label;
  const filteredApplicants = applicants.filter((a) => filterStatus === "all" || a.status === filterStatus);
  const acceptedApplicants = applicants.filter((a) => ["accepted", "submitted", "revision", "approved", "completed"].includes(a.status));
  const pendingSubmissions = submissions.filter((s) => s.status === "submitted" || s.status === "pending_review").length;
  // submittedCount = all submissions shown in the submissions tab (already filtered to have content_url)
  const submittedCount = submissions.length;
  const tabCounts: Record<Tab, number> = {
    // Show total applicants on badge (not just pending/shortlisted — all states visible)
    applicants:  applicants.length,
    accepted:    acceptedApplicants.length,
    submissions: submissions.length,
    payments:    acceptedApplicants.length,
  };

  const payments = acceptedApplicants.map((a) => ({
    ...a,
    paymentStatus: a.payment ? a.payment.status : null,
    paymentId: a.payment ? a.payment.id : null,
    amount: a.payment ? a.payment.amount : Math.floor((campaign.budget || 0) / (campaign.spots_total || 1)),
  }));

  return (
    <div style={{ padding: "1.75rem 1.5rem 4rem" }}>
      <Link to="/brand/campaigns" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", textDecoration: "none", marginBottom: "1.25rem" }}>
        <ArrowLeft size={14} /> {isFr ? "Toutes les campagnes" : "All campaigns"}
      </Link>

      {/* Campaign header */}
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.375rem 1.5rem", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.375rem" }}>
              <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.025em" }}>{campaign.title}</h1>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3,rem", padding: "0.25rem 0.75rem", borderRadius: 999, background: sc.bg, color: sc.color, fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: sc.dot }} />{scLabel}
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
              {campaign.platforms.map((p: string) => <PlatformPip key={p} p={p} />)}
              <span style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)" }}>
                {isFr ? (campaign.category === "Beauty" ? "Beauté" : campaign.category === "Fashion" ? "Mode" : campaign.category) : campaign.category}
              </span>
              <span style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Calendar size={11} /> {isFr ? "Échéance" : "Due"} {campaign.submission_deadline ? new Date(campaign.submission_deadline).toLocaleDateString() : campaign.application_deadline ? new Date(campaign.application_deadline).toLocaleDateString() : "—"}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.625rem" }}>
            <button style={{ padding: "0.5rem 0.875rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem" }}>
              {isFr ? "Modifier la campagne" : "Edit campaign"}
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem" }}>
          {[
            { icon: <Users size={15} />,      label: isFr ? "Candidats" : "Applicants",    value: String(campaign.applicants_count ?? applicants.length),    color: "#2563EB", bg: "#DBEAFE" },
            { icon: <CheckCircle size={15} />, label: isFr ? "Spots pourvus" : "Spots filled",      value: `${campaign.accepted_count ?? acceptedApplicants.length}/${campaign.spots_total || 0}`, color: "#10B981", bg: "#D1FAE5" },
            { icon: <TrendingUp size={15} />,  label: isFr ? "Soumis" : "Submitted",       value: String(submittedCount),     color: "#7C3AED", bg: "#EDE9FE" },
            { icon: <AlertCircle size={15} />, label: isFr ? "À revoir" : "Need review",   value: String(campaign.pending_approvals_count ?? pendingSubmissions), color: (campaign.pending_approvals_count ?? pendingSubmissions) > 0 ? "#C2410C" : "#10B981", bg: (campaign.pending_approvals_count ?? pendingSubmissions) > 0 ? "#FFEDD5" : "#D1FAE5" },
            { icon: <CreditCard size={15} />,  label: isFr ? "Budget" : "Budget",          value: `${((campaign.budget || 0) / 1000).toFixed(0)}K MAD`, color: "#92400E", bg: "#FEF3C7" },
            { icon: <TrendingUp size={15} />,  label: isFr ? "ROI" : "ROI",                value: campaign.roi ? `${campaign.roi}×` : "—", color: "#065F46", bg: "#D1FAE5" },
          ].map((m) => (
            <div key={m.label} style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.75rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem" }}>
              <div style={{ width: 30, height: 30, borderRadius: "0.5rem", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", color: m.color, flexShrink: 0 }}>{m.icon}</div>
              <div>
                <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9375rem", color: "var(--foreground)" }}>{m.value}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>{m.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: "1.25rem", overflowX: "auto" }}>
        {(["applicants", "accepted", "submissions", "payments"] as Tab[]).map((t) => {
          const labels: Record<Tab, string> = isFr ? {
            applicants: "Candidats",
            accepted: "Acceptés",
            submissions: "Soumissions",
            payments: "Paiements"
          } : {
            applicants: "Applicants",
            accepted: "Accepted",
            submissions: "Submissions",
            payments: "Payments"
          };
          const urgent = t === "submissions" && pendingSubmissions > 0;
          return (
            <button key={t} onClick={() => setTab(t)}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.625rem 1.125rem", background: "transparent", border: "none", borderBottom: `2px solid ${tab === t ? "var(--primary)" : "transparent"}`, marginBottom: -1, cursor: "pointer", color: tab === t ? "var(--primary)" : "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.9rem", fontWeight: tab === t ? 500 : 400, whiteSpace: "nowrap" }}>
              {labels[t]}
              <span style={{ padding: "0.1rem 0.4rem", borderRadius: 999, background: urgent ? "#FFEDD5" : tab === t ? "#DBEAFE" : "var(--muted)", color: urgent ? "#C2410C" : tab === t ? "var(--primary)" : "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.7rem", fontWeight: 600 }}>
                {tabCounts[t]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {tab === "applicants" && (
        <div>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            {(["all", "pending", "shortlisted", "accepted", "rejected"] as const).map((s) => {
              const sLabels: Record<string, string> = isFr ? {
                all: "Tout",
                pending: "En attente",
                shortlisted: "Présélectionné",
                accepted: "Accepté",
                rejected: "Refusé"
              } : {
                all: "All",
                pending: "Pending",
                shortlisted: "Shortlisted",
                accepted: "Accepted",
                rejected: "Rejected"
              };
              return (
                <button key={s} onClick={() => setFilterStatus(s)}
                  style={{ padding: "0.3rem 0.75rem", borderRadius: "2rem", border: `1.5px solid ${filterStatus === s ? "var(--primary)" : "var(--border)"}`, background: filterStatus === s ? "#EFF6FF" : "var(--card)", color: filterStatus === s ? "var(--primary)" : "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: filterStatus === s ? 500 : 400 }}>
                  {sLabels[s]} ({applicants.filter((a) => s === "all" || a.status === s).length})
                </button>
              );
            })}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {filteredApplicants.map((a) => <ApplicantCard key={a.id} applicant={a} onAction={handleApplicantAction} />)}
          </div>
        </div>
      )}

      {tab === "accepted" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {acceptedApplicants.length > 0
            ? acceptedApplicants.map((a) => <ApplicantCard key={a.id} applicant={a} onAction={handleApplicantAction} />)
            : <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem" }}>
                <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                  {isFr ? "Aucun créateur accepté pour l'instant. Veuillez examiner l'onglet des candidats." : "No creators accepted yet. Review the applicants tab."}
                </p>
              </div>
          }
        </div>
      )}

      {tab === "submissions" && (
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", overflow: "hidden" }}>
          {submissions.length > 0
            ? submissions.map((s) => <SubmissionRow key={s.id} sub={s} onAction={handleSubmissionAction} />)
            : <div style={{ padding: "3rem", textAlign: "center" }}>
                <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                  {isFr ? "Aucun contenu soumis pour l'instant." : "No content submitted yet."}
                </p>
              </div>
          }
        </div>
      )}

      {tab === "payments" && (
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", overflow: "hidden" }}>
          {payments.length === 0
            ? <div style={{ padding: "3rem", textAlign: "center" }}><p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>{isFr ? "Aucun enregistrement de paiement pour l'instant." : "No payment records yet."}</p></div>
            : payments.map((p, i) => {
                const hasApproved = submissions.some((s) => String(s.applicationId) === String(p.id) && s.status === "approved");
                const statusMap: Record<string, { label: string; color: string; bg: string }> = isFr ? {
                  pending:   { label: "En attente", color: "#92400E", bg: "#FEF3C7" },
                  in_escrow: { label: "En séquestre", color: "#5B21B6", bg: "#EDE9FE" },
                  released:  { label: "Libéré", color: "#065F46", bg: "#D1FAE5" },
                } : {
                  pending:   { label: "Pending", color: "#92400E", bg: "#FEF3C7" },
                  in_escrow: { label: "In escrow", color: "#5B21B6", bg: "#EDE9FE" },
                  released:  { label: "Released", color: "#065F46", bg: "#D1FAE5" },
                };
                const currentStatus = p.paymentStatus ? (statusMap[p.paymentStatus] || { label: p.paymentStatus, color: "#6B7280", bg: "var(--muted)" }) : { label: isFr ? "Non initié" : "Not initiated", color: "#6B7280", bg: "var(--muted)" };
                return (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.875rem 1.125rem", borderBottom: i < payments.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${p.color}22`, display: "flex", alignItems: "center", justifyContent: "center", color: p.color, fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", flexShrink: 0 }}>{p.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{p.name}</p>
                      <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{p.handle} · {isFr ? "Frais fixes" : "Fixed fee"}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", flexShrink: 0 }}>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9375rem", color: "var(--foreground)" }}>{p.amount.toLocaleString()} MAD</p>
                        <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: currentStatus.bg, color: currentStatus.color, fontFamily: f.b, fontSize: "0.7rem", fontWeight: 600 }}>{currentStatus.label}</span>
                      </div>
                      
                      {/* Interactive Escrow Control Buttons */}
                      {!p.paymentStatus && (
                        <button
                          onClick={() => handleInitiatePayment(p.id, p.amount)}
                          style={{ padding: "0.375rem 0.75rem", borderRadius: "0.375rem", border: "none", background: "var(--primary)", color: "#fff", cursor: "pointer", fontFamily: f.b, fontSize: "0.75rem", fontWeight: 500 }}
                        >
                          {isFr ? "Initier" : "Initiate"}
                        </button>
                      )}
                      {p.paymentStatus === "pending" && (
                        <button
                          onClick={() => handleFundPayment(p.paymentId, p.id)}
                          style={{ padding: "0.375rem 0.75rem", borderRadius: "0.375rem", border: "none", background: "#2563EB", color: "#fff", cursor: "pointer", fontFamily: f.b, fontSize: "0.75rem", fontWeight: 500 }}
                        >
                          {isFr ? "Financer" : "Fund"}
                        </button>
                      )}
                      {p.paymentStatus === "in_escrow" && (
                        <button
                          onClick={() => handleReleasePayment(p.paymentId, p.id)}
                          disabled={!hasApproved}
                          style={{
                            padding: "0.375rem 0.75rem", borderRadius: "0.375rem", border: "none",
                            background: hasApproved ? "#10B981" : "var(--muted)",
                            color: hasApproved ? "#fff" : "var(--muted-foreground)",
                            cursor: hasApproved ? "pointer" : "default",
                            fontFamily: f.b, fontSize: "0.75rem", fontWeight: 500
                          }}
                        >
                          {isFr ? "Libérer" : "Release"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
          }
        </div>
      )}
    </div>
  );
}
