import { useState, useEffect } from "react";
import {
  X, ExternalLink, Check, AlertCircle, Clock, Send,
  Upload, CheckCircle, XCircle, ArrowRight, ChevronRight,
  Instagram, Play, Youtube, Facebook, MessageSquare,
} from "lucide-react";
import type { Application } from "../../pages/dashboard/ApplicationsPage";
import api from "../../../lib/api";

export interface ContentItem {
  id: string;
  deliverable: string;
  status: "pending" | "submitted" | "revision" | "approved";
  url?: string;
  submittedAt?: string;
  revisionNote?: string;
}

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

const STATUS_CONFIG = {
  pending:     { label: "Pending",   color: "#92400E", bg: "#FEF3C7", dot: "#F59E0B" },
  shortlisted: { label: "Shortlisted", color: "#1D4ED8", bg: "#DBEAFE", dot: "#2563EB" },
  accepted:    { label: "Accepted",  color: "#1D4ED8", bg: "#DBEAFE", dot: "#2563EB" },
  submitted:   { label: "Submitted", color: "#5B21B6", bg: "#EDE9FE", dot: "#7C3AED" },
  revision:    { label: "Revision",  color: "#C2410C", bg: "#FFEDD5", dot: "#F97316" },
  approved:    { label: "Approved",  color: "#065F46", bg: "#D1FAE5", dot: "#10B981" },
  completed:   { label: "Completed", color: "#065F46", bg: "#D1FAE5", dot: "#10B981" },
  rejected:    { label: "Rejected",  color: "#991B1B", bg: "#FEE2E2", dot: "#EF4444" },
} as const;

import { TiktokIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "../ui/SocialIcons";

function PlatformIcon({ p }: { p: string }) {
  const map: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
    instagram: { icon: <InstagramIcon size={12} />, color: "#E1306C", label: "IG" },
    tiktok:    { icon: <TiktokIcon size={12} />,      color: "#010101", label: "TK" },
    youtube:   { icon: <YoutubeIcon size={12} />,   color: "#FF0000", label: "YT" },
    facebook:  { icon: <FacebookIcon size={12} />,  color: "#1877F2", label: "FB" },
  };
  const m = map[p];
  if (!m) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", padding: "0.175rem 0.5rem", borderRadius: 999, background: `${m.color}14`, color: m.color, fontFamily: f.b, fontSize: "0.68rem", fontWeight: 700 }}>
      {m.icon}{m.label}
    </span>
  );
}

/* ─── Milestone tracker ─── */
function MilestoneTracker({ milestones }: { milestones: any[] }) {
  return (
    <div style={{ overflowX: "auto", paddingBottom: 4 }}>
      <div style={{ display: "flex", alignItems: "flex-start", minWidth: "fit-content" }}>
        {milestones.map((m, i) => (
          <div key={m.id} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem", minWidth: 80, textAlign: "center" }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: m.status === "done" ? "var(--primary)" : m.status === "current" ? "var(--card)" : "var(--muted)",
                border: `2px solid ${m.status === "done" ? "var(--primary)" : m.status === "current" ? "var(--primary)" : "var(--border)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: m.status === "current" ? "0 0 0 4px rgba(37,99,235,0.15)" : "none",
              }}>
                {m.status === "done" ? <Check size={13} color="#fff" strokeWidth={2.5} /> : (
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.status === "current" ? "var(--primary)" : "var(--border)" }} />
                )}
              </div>
              <span style={{ fontFamily: f.b, fontSize: "0.7rem", color: m.status === "upcoming" ? "var(--muted-foreground)" : "var(--foreground)", fontWeight: m.status === "current" ? 600 : 400, lineHeight: 1.3 }}>
                {m.label}
              </span>
              <span style={{ fontFamily: f.b, fontSize: "0.65rem", color: "var(--muted-foreground)" }}>{m.date}</span>
            </div>
            {i < milestones.length - 1 && (
              <div style={{ width: 40, height: 2, background: m.status === "done" ? "var(--primary)" : "var(--border)", marginBottom: 34, flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Content item row ─── */
function ContentItemRow({
  item,
  onChange,
}: {
  item: ContentItem;
  onChange: (id: string, url: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item.url || "");

  useEffect(() => {
    setDraft(item.url || "");
  }, [item.url]);

  const statusMap = {
    pending:  { icon: <Clock size={13} />,        color: "#92400E",  bg: "#FEF3C7",  label: "Pending" },
    submitted:{ icon: <CheckCircle size={13} />,  color: "#5B21B6",  bg: "#EDE9FE",  label: "Submitted" },
    revision: { icon: <AlertCircle size={13} />,  color: "#C2410C",  bg: "#FFEDD5",  label: "Needs revision" },
    approved: { icon: <CheckCircle size={13} />,  color: "#065F46",  bg: "#D1FAE5",  label: "Approved ✓" },
  };
  const s = statusMap[item.status];

  return (
    <div style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem", padding: "0.875rem 1rem", borderLeft: item.status === "approved" ? "3px solid #10B981" : item.status === "revision" ? "3px solid #F97316" : "3px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: 8 }}>
        <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)", flex: 1 }}>{item.deliverable}</p>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.175rem 0.5rem", borderRadius: 999, background: s.bg, color: s.color, fontFamily: f.b, fontSize: "0.7rem", fontWeight: 600, flexShrink: 0 }}>
          {s.icon} {s.label}
        </span>
      </div>

      {item.status === "revision" && item.revisionNote && (
        <div style={{ display: "flex", gap: "0.5rem", padding: "0.5rem 0.75rem", background: "#FFEDD5", border: "1px solid #FED7AA", borderRadius: "0.375rem", marginBottom: 8 }}>
          <AlertCircle size={13} style={{ color: "#C2410C", flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontFamily: f.b, fontSize: "0.8rem", color: "#7C2D12", lineHeight: 1.55 }}>{item.revisionNote}</p>
        </div>
      )}

      {item.status === "approved" && item.url && (
        <a href={item.url} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontFamily: f.b, fontSize: "0.8rem", color: "var(--primary)", textDecoration: "none" }}>
          <ExternalLink size={12} /> View submitted content
        </a>
      )}

      {item.status !== "approved" && (
        <div>
          {editing || !item.url ? (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="url"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Paste your content URL (Instagram, TikTok, Drive…)"
                style={{ flex: 1, height: "2.25rem", padding: "0 0.75rem", borderRadius: "0.375rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.8125rem", outline: "none" }}
                onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
              />
              <button
                onClick={() => { onChange(item.id, draft); setEditing(false); }}
                disabled={!draft.trim()}
                style={{ padding: "0 0.875rem", borderRadius: "0.375rem", background: draft.trim() ? "var(--primary)" : "var(--muted)", color: draft.trim() ? "#fff" : "var(--muted-foreground)", border: "none", cursor: draft.trim() ? "pointer" : "default", fontFamily: f.b, fontSize: "0.8rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem" }}
              >
                <Upload size={13} /> Submit
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <a href={item.url} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontFamily: f.b, fontSize: "0.8rem", color: "var(--primary)", textDecoration: "none" }}>
                <ExternalLink size={12} /> {item.url.slice(0, 42)}{item.url.length > 42 ? "…" : ""}
              </a>
              <button onClick={() => setEditing(true)} style={{ padding: "0.2rem 0.5rem", borderRadius: "0.25rem", border: "1px solid var(--border)", background: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>
                Edit
              </button>
            </div>
          )}
          {item.submittedAt && <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)", marginTop: "0.25rem" }}>Submitted {item.submittedAt}</p>}
        </div>
      )}
    </div>
  );
}

/* ─── Main drawer ─── */
export function ApplicationDrawer({ application: initialApp, onClose }: { application: Application | null; onClose: () => void }) {
  const [application, setApplication] = useState<Application | null>(initialApp);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setApplication(initialApp);
    if (initialApp) {
      // Fetch full details
      setLoading(true);
      api.get(`/api/applications/${initialApp.id}`).then((res) => {
        const data = res.data.data;
        const deliverables = data.campaign?.deliverables || [];
        const submissions = data.content_submissions || [];
        
        const items = deliverables.map((d: string, index: number) => {
          const sub = submissions.find((s: any) => s.deliverable_label === d);
          return {
            id: sub?.id?.toString() || `del-${index}`,
            deliverable: d,
            status: sub ? sub.status : "pending",
            url: sub?.content_url,
            submittedAt: sub?.submitted_at ? new Date(sub.submitted_at).toLocaleDateString() : undefined,
            revisionNote: sub?.revision_note
          };
        });
        setContentItems(items);
        setApplication((prev: any) => ({
           ...prev,
           ...data,
           brandIndustry: data.campaign?.brand_profile?.industry || 'Beauty & Cosmetics',
           deliverables,
           revisions: data.revisions || [],
           milestones: data.milestones || []
        }));
      }).catch(console.error).finally(() => setLoading(false));
    }
  }, [initialApp]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!application) return null;

  const sc = STATUS_CONFIG[(application as any).status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.pending;
  
  const handleContentChange = async (id: string, url: string) => {
    const item = contentItems.find(c => c.id === id);
    if (!item) return;
    try {
      await api.post(`/api/applications/${application.id}/submissions`, {
        deliverable_label: item.deliverable,
        content_url: url
      });
      setContentItems((prev) => prev.map((ci) => ci.id === id ? { ...ci, url, status: "submitted" as const, submittedAt: "Just now" } : ci));
    } catch (e) {
      console.error(e);
      alert("Failed to submit content");
    }
  };

  const submittedCount = contentItems.filter((c) => c.status !== "pending").length;
  const totalCount = ((application as any).deliverables || []).length;
  const progressPct = totalCount > 0 ? Math.round((submittedCount / totalCount) * 100) : 0;

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 60, backdropFilter: "blur(2px)" }} />
      <div
        style={{
          position: "fixed", top: 0, right: 0,
          width: "min(640px, 100vw)", height: "100vh",
          background: "var(--card)",
          zIndex: 70, display: "flex", flexDirection: "column",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
          borderLeft: "1px solid var(--border)",
          animation: "slideIn .22s ease",
        }}
      >
        <style>{`@keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>

        {/* Header */}
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "0.625rem", background: `${application.brandColor}18`, display: "flex", alignItems: "center", justifyContent: "center", color: application.brandColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", flexShrink: 0 }}>
              {application.brand[0]}
            </div>
            <div>
              <p style={{ fontFamily: f.b, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>{application.brand}</p>
              <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{application.brandIndustry}</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ padding: "0.25rem 0.75rem", borderRadius: 999, background: sc.bg, color: sc.color, fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600 }}>
              {sc.label}
            </span>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--muted)", border: "none", cursor: "pointer", color: "var(--muted-foreground)" }}>
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 1.25rem" }}>

          {/* Campaign summary */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.25rem", color: "var(--foreground)", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
              {application.campaignTitle}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
              {(application as any).platforms?.map((p: string) => <PlatformIcon key={p} p={p} />)}
              <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                Applied {(application as any).appliedDate || (application as any).applied_at} · Due {(application as any).deadline}
              </span>
            </div>
            <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.7 }}>{(application as any).brief || (application as any).campaign?.brief}</p>

            {/* Payment + deadline row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.625rem", marginTop: "0.875rem" }}>
              {[
                { label: "Payment",    value: `${(application as any).payment?.toLocaleString() || (application as any).campaign?.budget} MAD` },
                { label: "Model",      value: ((application as any).paymentModel || (application as any).campaign?.payment_model || "").split(" · ")[0] },
                { label: "Match",      value: `${(application as any).matchScore || (application as any).match_score || 0}%` },
              ].map((item) => (
                <div key={item.label} style={{ padding: "0.625rem 0.75rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.5rem" }}>
                  <p style={{ fontFamily: f.b, fontSize: "0.68rem", color: "var(--muted-foreground)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{item.label}</p>
                  <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9375rem", color: "var(--foreground)" }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone tracker */}
          <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>Progress</h3>
            </div>
            <MilestoneTracker milestones={(application as any).milestones || []} />
          </div>

          {/* Content submission */}
          {application.status !== "pending" && application.status !== "rejected" && (
            <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>
                  Content Submission
                </h3>
                <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                  {submittedCount}/{totalCount} submitted
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ height: 5, borderRadius: 999, background: "var(--muted)", marginBottom: "0.875rem", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progressPct}%`, borderRadius: 999, background: progressPct === 100 ? "#10B981" : "var(--primary)", transition: "width .4s ease" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {contentItems.map((ci) => (
                  <ContentItemRow key={ci.id} item={ci} onChange={handleContentChange} />
                ))}
              </div>
            </div>
          )}

          {/* Revision / message thread */}
          {((application as any).revisions || []).length > 0 && (
            <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
                <MessageSquare size={14} style={{ color: "var(--muted-foreground)" }} />
                <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>Messages</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {((application as any).revisions || []).map((note: any) => (
                  <div key={note.id} style={{ display: "flex", gap: "0.625rem", flexDirection: note.from === "creator" ? "row-reverse" : "row" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: note.from === "brand" ? `${application.brandColor}22` : "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: f.h, fontWeight: 700, fontSize: "0.65rem", color: note.from === "brand" ? application.brandColor : "#fff", flexShrink: 0 }}>
                      {note.author[0]}
                    </div>
                    <div style={{ maxWidth: "80%" }}>
                      <div style={{ padding: "0.625rem 0.875rem", borderRadius: note.from === "creator" ? "0.875rem 0.875rem 0.25rem 0.875rem" : "0.875rem 0.875rem 0.875rem 0.25rem", background: note.from === "creator" ? "var(--primary)" : "var(--background)", border: note.from === "creator" ? "none" : "1px solid var(--border)" }}>
                        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: note.from === "creator" ? "#fff" : "var(--foreground)", lineHeight: 1.6 }}>{note.message}</p>
                      </div>
                      <p style={{ fontFamily: f.b, fontSize: "0.68rem", color: "var(--muted-foreground)", marginTop: "0.25rem", textAlign: note.from === "creator" ? "right" : "left" }}>
                        {note.author} · {note.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply input */}
              {application.status !== "rejected" && application.status !== "completed" && (
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.875rem" }}>
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Reply to brand…"
                    style={{ flex: 1, height: "2.375rem", padding: "0 0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--input-background)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.875rem", outline: "none" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                  />
                  <button
                    onClick={() => setReplyText("")}
                    disabled={!replyText.trim()}
                    style={{ width: 38, height: 38, borderRadius: "0.5rem", background: replyText.trim() ? "var(--primary)" : "var(--muted)", border: "none", cursor: replyText.trim() ? "pointer" : "default", color: replyText.trim() ? "#fff" : "var(--muted-foreground)", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <Send size={15} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Rejected state */}
          {application.status === "rejected" && (
            <div style={{ padding: "1rem", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "0.625rem" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <XCircle size={16} style={{ color: "#991B1B", flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "#991B1B", marginBottom: "0.25rem" }}>Application not selected</p>
                  <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "#7F1D1D", lineHeight: 1.6 }}>
                    This campaign selected other creators. Strengthen your profile and try again on the next campaign.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
