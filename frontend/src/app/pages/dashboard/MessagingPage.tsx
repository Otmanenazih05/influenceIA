import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Send, Paperclip, Search, X, ChevronDown, CheckCheck, Check, Instagram, DollarSign, Calendar, ExternalLink, Info, ArrowLeft, Building, Globe, Phone, MapPin, User } from "lucide-react";
import api from "../../../lib/api";
import { CampaignDrawer } from "../../components/dashboard/CampaignDrawer";
import type { Campaign } from "./CampaignsPage";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

interface Message {
  id: number; role: "brand" | "creator" | "system";
  text: string; time: string; read: boolean;
}
interface Conversation {
  id: string; brand: string; brandColor: string;
  campaignId: string;
  campaign: string; campaignBudget: number; campaignPlatforms: string[];
  campaignStatus: "accepted" | "in_progress" | "revision" | "completed" | "pending";
  lastMessage: string; lastTime: string; unread: number;
  messages: Message[];
  otherParticipant: {
    id: string;
    name: string;
    avatar: string | null;
    type: "brand" | "influencer";
    industry?: string;
    website?: string;
    phone?: string;
    country?: string;
    city?: string;
    description?: string;
    bio?: string;
    niches?: string[];
    ai_score?: number;
  };
}

// Removed mock conversations
const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  accepted:    { label: "Accepted",    color: "#1D4ED8", bg: "#DBEAFE" },
  in_progress: { label: "In progress", color: "#5B21B6", bg: "#EDE9FE" },
  revision:    { label: "Revision",    color: "#C2410C", bg: "#FFEDD5" },
  completed:   { label: "Completed",   color: "#065F46", bg: "#D1FAE5" },
  pending:     { label: "Pending",     color: "#92400E", bg: "#FEF3C7" },
};

function ConversationItem({ conv, active, onClick, onViewProfile }: { conv: Conversation; active: boolean; onClick: () => void; onViewProfile?: () => void }) {
  const sc = STATUS_CONFIG[conv.campaignStatus];
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "flex-start", gap: "0.75rem",
        padding: "0.875rem 1rem",
        background: active ? "var(--sidebar-accent)" : "transparent",
        border: "none", cursor: "pointer", textAlign: "left", width: "100%",
        borderRight: active ? "2px solid var(--primary)" : "2px solid transparent",
        transition: "background .12s",
      }}
    >
      <div 
        onClick={(e) => { e.stopPropagation(); onViewProfile?.(); }}
        title="View profile details"
        style={{ width: 40, height: 40, borderRadius: "50%", background: `${conv.brandColor}22`, display: "flex", alignItems: "center", justifyContent: "center", color: conv.brandColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.9375rem", flexShrink: 0, position: "relative", cursor: "pointer" }}
      >
        {conv.brand[0]}
        {conv.unread > 0 && (
          <span style={{ position: "absolute", top: -3, right: -3, width: 16, height: 16, borderRadius: "50%", background: "var(--primary)", color: "#fff", fontFamily: f.b, fontSize: "0.6rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--card)" }}>
            {conv.unread}
          </span>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.375rem", marginBottom: "0.2rem" }}>
          <p 
            onClick={(e) => { e.stopPropagation(); onViewProfile?.(); }}
            title="View profile details"
            className="hover:underline"
            style={{ fontFamily: f.b, fontWeight: conv.unread > 0 ? 600 : 500, fontSize: "0.875rem", color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, cursor: "pointer" }}
          >
            {conv.brand}
          </p>
          <span style={{ fontFamily: f.b, fontSize: "0.68rem", color: "var(--muted-foreground)", flexShrink: 0 }}>{conv.lastTime.split(" · ")[0]}</span>
        </div>
        <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "0.25rem" }}>
          {conv.campaign}
        </p>
        <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: conv.unread > 0 ? "var(--foreground)" : "var(--muted-foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: conv.unread > 0 ? 500 : 400 }}>
          {conv.lastMessage}
        </p>
      </div>
    </button>
  );
}

function CampaignContextCard({ conv }: { conv: Conversation }) {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [open, setOpen] = useState(true);
  const sc = STATUS_CONFIG[conv.campaignStatus] || STATUS_CONFIG.pending;
  const statusLabel = isFr ? {
    accepted: "Acceptée",
    in_progress: "En cours",
    revision: "Révision",
    completed: "Terminée",
    pending: "En attente"
  }[conv.campaignStatus] || sc.label : sc.label;

  return (
    <div style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.75rem", overflow: "hidden", flexShrink: 0 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.625rem 0.875rem", background: "none", border: "none", cursor: "pointer" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Info size={13} style={{ color: "var(--muted-foreground)" }} />
          <span style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)" }}>{isFr ? "Contexte de la campagne" : "Campaign context"}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: sc.bg, color: sc.color, fontFamily: f.b, fontSize: "0.68rem", fontWeight: 600 }}>{statusLabel}</span>
          <ChevronDown size={13} style={{ color: "var(--muted-foreground)", transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
        </div>
      </button>
      {open && (
        <div style={{ padding: "0 0.875rem 0.875rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.375rem" }}>{conv.campaign}</p>
            <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
              {conv.campaignPlatforms.map((p) => (
                <span key={p} style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "var(--muted)", color: "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.72rem", fontWeight: 500 }}>{p}</span>
              ))}
              <span style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontFamily: f.h, fontWeight: 600, fontSize: "0.8125rem", color: "var(--foreground)" }}>
                <DollarSign size={11} style={{ color: "var(--muted-foreground)" }} />{conv.campaignBudget.toLocaleString()} MAD
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MessageBubble({ msg, brandColor, brandName, onViewBrand }: { msg: Message; brandColor: string; brandName: string; onViewBrand?: () => void }) {
  if (msg.role === "system") {
    return (
      <div style={{ textAlign: "center", padding: "0.5rem 1rem" }}>
        <span style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)", padding: "0.2rem 0.75rem", borderRadius: 999, background: "var(--muted)" }}>
          {msg.text}
        </span>
      </div>
    );
  }
  const isBrand = msg.role === "brand";
  return (
    <div style={{ display: "flex", gap: "0.625rem", flexDirection: isBrand ? "row" : "row-reverse", alignItems: "flex-end", marginBottom: "0.75rem" }}>
      {isBrand && (
        <div 
          onClick={onViewBrand}
          title="View brand details"
          style={{ width: 28, height: 28, borderRadius: "50%", background: `${brandColor}22`, display: "flex", alignItems: "center", justifyContent: "center", color: brandColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.7rem", flexShrink: 0, cursor: onViewBrand ? "pointer" : "default" }}
        >
          {brandName[0]}
        </div>
      )}
      <div style={{ maxWidth: "72%" }}>
        <div style={{
          padding: "0.625rem 0.875rem",
          borderRadius: isBrand ? "0.875rem 0.875rem 0.875rem 0.25rem" : "0.875rem 0.875rem 0.25rem 0.875rem",
          background: isBrand ? "var(--card)" : "var(--primary)",
          border: isBrand ? "1px solid var(--border)" : "none",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: isBrand ? "var(--foreground)" : "#fff", lineHeight: 1.65 }}>{msg.text}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.25rem", justifyContent: isBrand ? "flex-start" : "flex-end" }}>
          <span style={{ fontFamily: f.b, fontSize: "0.68rem", color: "var(--muted-foreground)" }}>{msg.time.split(" · ")[1]}</span>
          {!isBrand && (msg.read ? <CheckCheck size={12} style={{ color: "var(--primary)" }} /> : <Check size={12} style={{ color: "var(--muted-foreground)" }} />)}
        </div>
      </div>
    </div>
  );
}

export function MessagingPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [showMobileChat, setShowMobileChat] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  const handleViewCampaign = async (campaignId: string) => {
    if (!campaignId) {
      alert(isFr ? "Aucune campagne associée à cette discussion." : "No campaign associated with this conversation.");
      return;
    }
    try {
      const res = await api.get(`/api/campaigns/${campaignId}`);
      const c = res.data.data;
      const mappedCampaign: Campaign = {
        id: c.id.toString(),
        brand: c.brand_profile?.company_name || "Brand",
        brandIndustry: c.brand_profile?.industry || "Lifestyle",
        brandColor: c.brand_color || "#2563EB",
        country: c.brand_profile?.country || "Morocco",
        title: c.title,
        brief: c.brief,
        platforms: c.platforms || [],
        budget: c.budget || 0,
        matchScore: c.match_score || 85,
        deadline: c.submission_deadline || c.publication_date || "",
        spotsLeft: (c.spots_total || 10) - (c.spots_filled || 0),
        type: (c.campaign_type || "paid") as any,
        status: c.status === "active" ? "open" : "closing",
        saved: false,
        niche: c.niches?.[0] || "General"
      };
      setSelectedCampaign(mappedCampaign);
    } catch (err) {
      console.error("Failed to load campaign detail", err);
      alert(isFr ? "Impossible de charger les détails de la campagne." : "Failed to load campaign details.");
    }
  };

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get('/api/auth/me');
        setCurrentUser(res.data.data);
      } catch(e) {}
    };
    fetchMe();
  }, []);

  useEffect(() => {
    const fetchConvs = async () => {
      try {
        const res = await api.get('/api/conversations');
        // ConversationResource returns: other_participant, latest_message, campaign, unread_count
        const convs = res.data.data.map((c: any) => ({
          id: c.id.toString(),
          brand: c.other_participant?.name || "Brand",
          brandColor: "#2563EB",
          campaignId: c.campaign_id ? c.campaign_id.toString() : "",
          campaign: c.campaign?.title || "General",
          campaignBudget: c.campaign?.budget || 0,
          campaignPlatforms: c.campaign?.platforms || ["Instagram"],
          campaignStatus: c.campaign?.status || "pending",
          lastMessage: c.latest_message?.body || "",
          lastTime: c.latest_message?.created_at ? new Date(c.latest_message.created_at).toLocaleString() : "",
          unread: c.unread_count || 0,
          messages: [],
          otherParticipant: c.other_participant
        }));
        setConversations(convs);
        if (convs.length > 0) setActiveId(convs[0].id);
      } catch (err) {
        console.error("Failed to load conversations", err);
      }
    };
    fetchConvs();
  }, []);

  useEffect(() => {
    if (!activeId || !currentUser) return;
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/api/conversations/${activeId}/messages`);
        const msgs = res.data.data.map((m: any) => ({
          id: m.id,
          role: m.is_mine ? "creator" : "brand",
          text: m.body,
          time: new Date(m.created_at).toLocaleString(),
          read: !!m.read_at
        })).reverse(); // API returns newest first due to pagination order
        setMessages(prev => ({ ...prev, [activeId]: msgs }));
        
        // Mark as read if there are unread
        const unreadCount = conversations.find(c => c.id === activeId)?.unread || 0;
        if (unreadCount > 0) {
           await api.put(`/api/conversations/${activeId}/read`);
           setConversations(prev => prev.map(c => c.id === activeId ? { ...c, unread: 0 } : c));
        }
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };
    fetchMessages();
  }, [activeId, currentUser]);

  useEffect(() => {
    if (activeId) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [activeId]);

  const active = conversations.find((c) => c.id === activeId);
  const threadMessages = messages[activeId] ?? [];

  const filteredConvs = conversations.filter((c) =>
    !search.trim() || c.brand.toLowerCase().includes(search.toLowerCase()) || c.campaign.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = async () => {
    if (!draft.trim()) return;
    try {
      const res = await api.post(`/api/conversations/${activeId}/messages`, { body: draft.trim() });
      const m = res.data.data;
      const newMsg: Message = { 
        id: m.id, 
        role: "creator", 
        text: m.body, 
        time: new Date(m.created_at).toLocaleString(), 
        read: false 
      };
      setMessages((prev) => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), newMsg] }));
      setDraft("");
    } catch(err) {
      console.error(err);
      alert(isFr ? "Échec de l'envoi du message" : "Failed to send message");
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeId]);

  const convListEl = (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--card)", borderRight: "1px solid var(--border)" }}>
      <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.0625rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>Messages</h2>
        <div style={{ position: "relative" }}>
          <Search size={13} style={{ position: "absolute", left: "0.625rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }} />
          <input
            type="search" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={isFr ? "Rechercher des conversations..." : "Search conversations…"}
            style={{ width: "100%", height: "2rem", paddingLeft: "2rem", paddingRight: search ? "2rem" : "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.8125rem", outline: "none", boxSizing: "border-box" }}
            onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; }}
            onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ position: "absolute", right: "0.5rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}>
              <X size={12} />
            </button>
          )}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {filteredConvs.map((conv) => (
          <div key={conv.id} style={{ borderBottom: "1px solid var(--border)" }}>
            <ConversationItem conv={conv} active={activeId === conv.id}
              onClick={() => { setActiveId(conv.id); setShowMobileChat(true); }}
              onViewProfile={() => setSelectedProfile(conv.otherParticipant)}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const chatPanelEl = (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--background)" }}>
      {active ? (
        <>
          {/* Chat header */}
          <div style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid var(--border)", background: "var(--card)", flexShrink: 0, display: "flex", alignItems: "center", gap: "0.875rem" }}>
            <button
              className="flex lg:hidden"
              onClick={() => setShowMobileChat(false)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--foreground)", display: "flex", padding: "0.25rem" }}
            >
              <ArrowLeft size={18} />
            </button>
            <div 
              onClick={() => setSelectedProfile(active.otherParticipant)}
              title={isFr ? "Voir le profil" : "View profile"}
              style={{ width: 38, height: 38, borderRadius: "50%", background: `${active.brandColor}22`, display: "flex", alignItems: "center", justifyContent: "center", color: active.brandColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.9375rem", flexShrink: 0, cursor: "pointer" }}
            >
              {active.brand[0]}
            </div>
            <div 
              style={{ flex: 1, cursor: "pointer" }} 
              onClick={() => setSelectedProfile(active.otherParticipant)} 
              title={isFr ? "Voir le profil" : "View profile"}
            >
              <p style={{ fontFamily: f.b, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }} className="hover:underline">{active.brand}</p>
              <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{active.campaign}</p>
            </div>
            <button 
              onClick={() => handleViewCampaign(active.campaignId)}
              style={{ padding: "0.375rem 0.75rem", borderRadius: "0.375rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.78rem", display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              <ExternalLink size={12} /> {isFr ? "Voir la campagne" : "View campaign"}
            </button>
          </div>

          {/* Campaign context */}
          <div style={{ padding: "0.75rem 1.25rem", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
            <CampaignContextCard conv={active} />
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem" }}>
            {threadMessages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} brandColor={active.brandColor} brandName={active.brand} onViewBrand={() => setSelectedProfile(active.otherParticipant)} />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Composer */}
          <div style={{ padding: "0.875rem 1.25rem", borderTop: "1px solid var(--border)", background: "var(--card)", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
              <button style={{ width: 34, height: 34, borderRadius: "0.5rem", background: "var(--muted)", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Paperclip size={15} />
              </button>
              <div style={{ flex: 1, border: "1px solid var(--border)", borderRadius: "0.75rem", background: "var(--input-background)", display: "flex", alignItems: "flex-end", padding: "0.5rem 0.875rem" }}>
                <textarea
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder={isFr ? "Écrire un message... (Entrée pour envoyer, Maj+Entrée pour saut de ligne)" : "Write a message… (Enter to send, Shift+Enter for new line)"}
                  rows={1}
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)", resize: "none", lineHeight: 1.6, maxHeight: 120, overflowY: "auto" }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!draft.trim()}
                style={{ width: 38, height: 38, borderRadius: "0.625rem", background: draft.trim() ? "var(--primary)" : "var(--muted)", border: "none", cursor: draft.trim() ? "pointer" : "default", color: draft.trim() ? "#fff" : "var(--muted-foreground)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: draft.trim() ? "var(--shadow-primary)" : "none" }}
              >
                <Send size={15} />
              </button>
            </div>
            <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)", marginTop: "0.375rem", textAlign: "right" }}>
              {isFr ? "Entrée pour envoyer · Maj+Entrée pour saut de ligne" : "Enter to send · Shift+Enter for new line"}
            </p>
          </div>
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--muted-foreground)" }}>
          {isFr ? "Sélectionnez une conversation pour commencer à échanger" : "Select a conversation to start messaging"}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ height: "calc(100vh - 4rem)", padding: 0 }} className="flex flex-col lg:grid lg:grid-cols-[300px_1fr]">
      {/* List (visible on desktop or on mobile if no active chat) */}
      <div className={`${showMobileChat ? "hidden" : "flex"} lg:flex flex-col`} style={{ height: "100%" }}>
        {convListEl}
      </div>
      {/* Chat panel (visible on desktop or on mobile if active chat) */}
      <div className={`${showMobileChat ? "flex" : "hidden"} lg:flex flex-col`} style={{ height: "100%" }}>
        {chatPanelEl}
      </div>
      <CampaignDrawer campaign={selectedCampaign} onClose={() => setSelectedCampaign(null)} />
      
      {selectedProfile && (
        <>
          {/* Backdrop */}
          <div 
            onClick={() => setSelectedProfile(null)} 
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, backdropFilter: "blur(4px)" }} 
          />

          {/* Modal Card */}
          <div 
            style={{ 
              position: "fixed", 
              top: "50%", 
              left: "50%", 
              transform: "translate(-50%, -50%)", 
              width: "min(500px, 90vw)", 
              maxHeight: "85vh", 
              background: "var(--card)", 
              borderRadius: "1.25rem", 
              boxShadow: "0 20px 50px rgba(0,0,0,0.15)", 
              border: "1px solid var(--border)", 
              zIndex: 101, 
              display: "flex", 
              flexDirection: "column", 
              overflow: "hidden",
              animation: "profileFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <style>{`
              @keyframes profileFadeIn {
                from { transform: translate(-50%, -46%) scale(0.97); opacity: 0; }
                to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
              }
            `}</style>
            
            {/* Header */}
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--sidebar-background)" }}>
              <h3 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.125rem", color: "var(--foreground)", margin: 0 }}>
                {isFr ? "Profil du partenaire" : "Partner Profile"}
              </h3>
              <button 
                onClick={() => setSelectedProfile(null)} 
                style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--muted)", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Content Body */}
            <div style={{ padding: "1.5rem", overflowY: "auto", flex: 1 }}>
              
              {/* Header profile details */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div 
                  style={{ 
                    width: 64, 
                    height: 64, 
                    borderRadius: "50%", 
                    background: selectedProfile.avatar ? "transparent" : "#2563EB22", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    color: "#2563EB", 
                    fontFamily: f.h, 
                    fontWeight: 700, 
                    fontSize: "1.75rem", 
                    flexShrink: 0,
                    border: "2px solid var(--border)",
                    overflow: "hidden"
                  }}
                >
                  {selectedProfile.avatar ? (
                    <img src={selectedProfile.avatar} alt={selectedProfile.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    selectedProfile.name[0]
                  )}
                </div>
                <div>
                  <h4 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.25rem", color: "var(--foreground)", margin: "0 0 0.25rem" }}>
                    {selectedProfile.name}
                  </h4>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span style={{ 
                      padding: "0.15rem 0.625rem", 
                      borderRadius: 999, 
                      background: selectedProfile.type === "brand" ? "#DBEAFE" : "#EDE9FE", 
                      color: selectedProfile.type === "brand" ? "#1D4ED8" : "#5B21B6", 
                      fontFamily: f.b, 
                      fontSize: "0.72rem", 
                      fontWeight: 600,
                      textTransform: "capitalize"
                    }}>
                      {selectedProfile.type === "brand" ? (isFr ? "Marque" : "Brand") : (isFr ? "Créateur" : "Creator")}
                    </span>
                    
                    {selectedProfile.type === "brand" && selectedProfile.industry && (
                      <span style={{ padding: "0.15rem 0.625rem", borderRadius: 999, background: "var(--muted)", color: "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.72rem", fontWeight: 500 }}>
                        {selectedProfile.industry}
                      </span>
                    )}

                    {selectedProfile.type === "influencer" && selectedProfile.ai_score !== undefined && (
                      <span style={{ padding: "0.15rem 0.625rem", borderRadius: 999, background: "#D1FAE5", color: "#065F46", fontFamily: f.b, fontSize: "0.72rem", fontWeight: 700 }}>
                        IA Score: {selectedProfile.ai_score}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description/Bio */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h5 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", margin: "0 0 0.5rem" }}>
                  About
                </h5>
                <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.6, margin: 0 }}>
                  {selectedProfile.type === "brand" 
                    ? (selectedProfile.description || (isFr ? "Aucune description fournie." : "No description provided."))
                    : (selectedProfile.bio || (isFr ? "Aucune biographie fournie." : "No bio provided."))
                  }
                </p>
              </div>

              {/* Details grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", padding: "1rem 1.25rem", background: "var(--background)", borderRadius: "0.875rem", border: "1px solid var(--border)", marginBottom: "1rem" }}>
                
                {/* Location */}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <MapPin size={16} style={{ color: "var(--muted-foreground)", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <span style={{ display: "block", fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)", textTransform: "uppercase", fontWeight: 600 }}>
                      {isFr ? "Localisation" : "Location"}
                    </span>
                    <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)", fontWeight: 500 }}>
                      {selectedProfile.city || selectedProfile.country
                        ? `${selectedProfile.city || ""}${selectedProfile.city && selectedProfile.country ? ", " : ""}${selectedProfile.country || ""}`
                        : (isFr ? "Non spécifié" : "Not specified")
                      }
                    </span>
                  </div>
                </div>

                {/* Website/Niches */}
                {selectedProfile.type === "brand" ? (
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Globe size={16} style={{ color: "var(--muted-foreground)", flexShrink: 0, marginTop: 2 }} />
                    <div style={{ minWidth: 0 }}>
                      <span style={{ display: "block", fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)", textTransform: "uppercase", fontWeight: 600 }}>
                        Website
                      </span>
                      {selectedProfile.website ? (
                        <a 
                          href={selectedProfile.website.startsWith("http") ? selectedProfile.website : `https://${selectedProfile.website}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--primary)", textDecoration: "none", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                          className="hover:underline"
                        >
                          {selectedProfile.website.replace(/^https?:\/\/(www\.)?/, "")}
                        </a>
                      ) : (
                        <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                          N/A
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <User size={16} style={{ color: "var(--muted-foreground)", flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <span style={{ display: "block", fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)", textTransform: "uppercase", fontWeight: 600 }}>
                        Niches
                      </span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginTop: 2 }}>
                        {selectedProfile.niches && selectedProfile.niches.length > 0 ? (
                          selectedProfile.niches.map((n: string) => (
                            <span key={n} style={{ padding: "0.1rem 0.375rem", borderRadius: 999, background: "var(--muted)", color: "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.68rem", fontWeight: 500 }}>
                              {n}
                            </span>
                          ))
                        ) : (
                          <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                            N/A
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {selectedProfile.type === "brand" && (
                  <div style={{ display: "flex", gap: "0.5rem", gridColumn: "span 2", borderTop: "1px solid var(--border)", paddingTop: "0.75rem", marginTop: "0.25rem" }}>
                    <Phone size={16} style={{ color: "var(--muted-foreground)", flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <span style={{ display: "block", fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)", textTransform: "uppercase", fontWeight: 600 }}>
                        {isFr ? "Téléphone" : "Phone"}
                      </span>
                      <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)", fontWeight: 500 }}>
                        {selectedProfile.phone || "N/A"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}
