import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Send, Paperclip, Search, X, CheckCheck, Check, ExternalLink, ChevronDown, ArrowLeft, Info, DollarSign, Calendar, MoreHorizontal, FileText, Loader2 } from "lucide-react";
import { brandCampaigns } from "../../data/brandCampaigns";
import { CreatorDrawer } from "../../components/brand/CreatorDrawer";
import type { Creator } from "../../data/creators";
import api from "../../../lib/api";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

type Msg = { id: number; role: "brand" | "creator"; text: string; time: string; read: boolean };
type Conv = { id: string; creator: string; creatorColor: string; campaignId: string; campaign: string; unread: number; lastMessage: string; lastTime: string; _raw?: any };

function ConvItem({ conv, active, onClick, onViewProfile }: { conv: Conv; active: boolean; onClick: () => void; onViewProfile: (influencerProfileId: number | string) => void }) {
  return (
    <button onClick={onClick}
      style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.875rem 1rem", background: active ? "var(--sidebar-accent)" : "transparent", border: "none", cursor: "pointer", textAlign: "left", width: "100%", borderRight: `2px solid ${active ? "var(--primary)" : "transparent"}`, transition: "background .12s" }}>
      <div 
        onClick={(e) => {
          e.stopPropagation();
          if (conv._raw?.other_participant?.id) {
            onViewProfile(conv._raw.other_participant.id);
          }
        }} 
        style={{ position: "relative", flexShrink: 0, cursor: "pointer" }}
      >
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${conv.creatorColor}22`, display: "flex", alignItems: "center", justifyContent: "center", color: conv.creatorColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.9375rem" }}>
          {conv.creator[0]}
        </div>
        {conv.unread > 0 && (
          <span style={{ position: "absolute", top: -3, right: -3, width: 16, height: 16, borderRadius: "50%", background: "var(--primary)", color: "#fff", fontFamily: f.b, fontSize: "0.6rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--card)" }}>
            {conv.unread}
          </span>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "0.25rem", marginBottom: "0.125rem" }}>
          <p 
            onClick={(e) => {
              e.stopPropagation();
              if (conv._raw?.other_participant?.id) {
                onViewProfile(conv._raw.other_participant.id);
              }
            }} 
            style={{ fontFamily: f.b, fontWeight: conv.unread > 0 ? 600 : 500, fontSize: "0.875rem", color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor: "pointer" }}
            onMouseEnter={(el) => { (el.target as HTMLElement).style.textDecoration = "underline"; }}
            onMouseLeave={(el) => { (el.target as HTMLElement).style.textDecoration = "none"; }}
          >
            {conv.creator}
          </p>
          <span style={{ fontFamily: f.b, fontSize: "0.68rem", color: "var(--muted-foreground)", flexShrink: 0 }}>{conv.lastTime.split(" · ")[0]}</span>
        </div>
        <p style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--primary)", marginBottom: "0.125rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{conv.campaign}</p>
        <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: conv.unread > 0 ? "var(--foreground)" : "var(--muted-foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: conv.unread > 0 ? 500 : 400 }}>
          {conv.lastMessage}
        </p>
      </div>
    </button>
  );
}

function CampaignContext({ conv }: { conv: Conv }) {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [open, setOpen] = useState(true);
  const campaign = brandCampaigns.find((c) => c.id === conv.campaignId);
  if (!campaign) return null;
  return (
    <div style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.75rem", overflow: "hidden", flexShrink: 0 }}>
      <button onClick={() => setOpen((o) => !o)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.625rem 0.875rem", background: "none", border: "none", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Info size={13} style={{ color: "var(--muted-foreground)" }} />
          <span style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)" }}>{isFr ? "Contexte de la campagne" : "Campaign context"}</span>
        </div>
        <ChevronDown size={13} style={{ color: "var(--muted-foreground)", transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
      </button>
      {open && (
        <div style={{ padding: "0 0.875rem 0.875rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
          <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", flex: "0 0 100%" }}>{campaign.title || conv.campaign}</p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)" }}>
              <DollarSign size={11} />{(campaign.budget || 0).toLocaleString()} MAD
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)" }}>
              <Calendar size={11} />{isFr ? "Échéance" : "Due"} {campaign.deadline || "TBD"}
            </span>
            <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "#D1FAE5", color: "#065F46", fontFamily: f.b, fontSize: "0.68rem", fontWeight: 600 }}>{isFr ? "Active" : "Active"}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function MessageBubble({ msg, conv }: { msg: Msg; conv: Conv }) {
  const isBrand = msg.role === "brand";
  return (
    <div style={{ display: "flex", gap: "0.5rem", flexDirection: isBrand ? "row-reverse" : "row", alignItems: "flex-end", marginBottom: "0.75rem" }}>
      {!isBrand && (
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: `${conv.creatorColor}22`, display: "flex", alignItems: "center", justifyContent: "center", color: conv.creatorColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.68rem", flexShrink: 0 }}>
          {conv.creator[0]}
        </div>
      )}
      <div style={{ maxWidth: "72%" }}>
        <div style={{
          padding: "0.625rem 0.875rem",
          borderRadius: isBrand ? "0.875rem 0.875rem 0.25rem 0.875rem" : "0.875rem 0.875rem 0.875rem 0.25rem",
          background: isBrand ? "var(--primary)" : "var(--card)",
          border: isBrand ? "none" : "1px solid var(--border)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: isBrand ? "#fff" : "var(--foreground)", lineHeight: 1.65 }}>{msg.text}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.25rem", justifyContent: isBrand ? "flex-end" : "flex-start" }}>
          <span style={{ fontFamily: f.b, fontSize: "0.65rem", color: "var(--muted-foreground)" }}>{msg.time.split(" · ")[1] ?? msg.time}</span>
          {isBrand && (msg.read ? <CheckCheck size={12} style={{ color: "var(--primary)" }} /> : <Check size={12} style={{ color: "var(--muted-foreground)" }} />)}
        </div>
      </div>
    </div>
  );
}

export function BrandMessagingPage() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const stateInfluencerProfileId = location.state?.influencerProfileId;
  const stateTargetUserId = location.state?.targetUserId;
  const stateCampaignId = location.state?.campaignId;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [conversations, setConversations] = useState<Conv[]>([]);
  const [messages, setMessages] = useState<Record<string, Msg[]>>({});
  const [showMobileChat, setShowMobileChat] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [isViewingProfile, setIsViewingProfile] = useState(false);

  const handleViewProfile = async (influencerProfileId: number | string) => {
    setIsViewingProfile(true);
    try {
      const res = await api.get(`/api/creators/${influencerProfileId}`);
      const p = res.data;
      
      const socials = p.social_accounts || [];
      const primarySocial = socials[0] || {};
      const followers = primarySocial.followers_count || 0;
      
      let t = "nano";
      if (followers >= 10000 && followers < 100000) t = "micro";
      if (followers >= 100000) t = "macro";
      
      const formatNum = (num: number) => num >= 1000000 ? (num/1000000).toFixed(1) + 'M' : num >= 1000 ? (num/1000).toFixed(1) + 'K' : String(num);

      const platformsObj: any = {};
      socials.forEach((s: any) => {
        platformsObj[s.platform] = { followers: formatNum(s.followers_count || 0), link: s.profile_url || "#" };
      });
      if (Object.keys(platformsObj).length === 0) {
        platformsObj["instagram"] = { followers: "0", link: "#" };
      }

      const mappedCreator: Creator = {
        id: String(p.id),
        name: p.full_name || p.user?.name || "Creator",
        handle: primarySocial.handle || "@unknown",
        avatar: (p.full_name || p.user?.name || "C")[0].toUpperCase(),
        color: "#2563EB",
        gradient: ["#3B82F6", "#1D4ED8"] as [string, string],
        location: p.country || "Unknown",
        country: p.country || "Unknown",
        followerTier: t as any,
        totalFollowers: formatNum(followers),
        totalFollowersRaw: followers,
        topEngagement: (primarySocial.engagement_rate || 0) + "%",
        pastCollabs: 0,
        verified: false,
        saved: false,
        iaScore: p.ai_score || 0,
        matchScore: 0,
        niches: p.niches || [],
        platforms: platformsObj,
        primaryPlatform: primarySocial.platform || "instagram",
        bio: p.bio || "",
        audienceDemographics: {
          genderSplit: { female: 60, male: 40 },
          ageGroups: [
            { label: "18-24", pct: 30 },
            { label: "25-34", pct: 45 },
            { label: "35-44", pct: 25 },
          ],
          topLocations: [
            { label: p.country || "Local", pct: 80 },
          ],
          languages: ["English", "French"],
        },
        scoreBreakdown: [
          { label: "Engagement Quality", score: 8.5, color: "#2563EB" },
          { label: "Audience Authenticity", score: 9.0, color: "#10B981" },
          { label: "Brand Safety", score: 9.5, color: "#7C3AED" },
        ],
        responseRate: 90,
        completionRate: 95,
        brandRating: 4.8,
        contentSamples: [],
      };
      
      setSelectedCreator(mappedCreator);
    } catch (err) {
      console.error(err);
      alert("Failed to load creator profile details.");
    } finally {
      setIsViewingProfile(false);
    }
  };

  useEffect(() => {
    const fetchConvs = async () => {
      try {
        const res = await api.get("/api/conversations");
        const convs = (res.data.data || []).map((c: any) => ({
          id: String(c.id),
          creator: c.other_participant?.name || "Creator",
          creatorColor: "#2563EB",
          campaignId: String(c.campaign_id || c.campaign?.id || ""),
          campaign: c.campaign?.title || "Direct Message",
          unread: c.unread_count || 0,
          lastMessage: c.latest_message?.body || "Start a conversation",
          lastTime: c.latest_message?.created_at ? new Date(c.latest_message.created_at).toLocaleDateString() : "",
          _raw: c
        }));
        setConversations(convs);
        
        if (stateInfluencerProfileId) {
          const match = convs.find(c => 
            String(c._raw?.other_participant?.id) === String(stateInfluencerProfileId) &&
            String(c.campaignId || "") === String(stateCampaignId || "")
          );
          if (match) {
            setActiveId(match.id);
            return;
          } else if (stateTargetUserId) {
            try {
              const startRes = await api.post("/api/conversations", {
                target_user_id: stateTargetUserId,
                campaign_id: stateCampaignId
              });
              const rawNewConv = startRes.data.data;
              const newConv = {
                id: String(rawNewConv.id),
                creator: rawNewConv.other_participant?.name || "Creator",
                creatorColor: "#2563EB",
                campaignId: String(rawNewConv.campaign_id || rawNewConv.campaign?.id || ""),
                campaign: rawNewConv.campaign?.title || "Direct Message",
                unread: 0,
                lastMessage: "Start a conversation",
                lastTime: "",
                _raw: rawNewConv
              };
              setConversations(prev => {
                if (prev.some(c => String(c.id) === String(newConv.id))) {
                  return prev;
                }
                return [newConv, ...prev];
              });
              setActiveId(newConv.id);
              return;
            } catch (errStart) {
              console.error("Failed to start new conversation", errStart);
            }
          }
        }
        
        if (convs.length > 0) setActiveId(convs[0].id);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConvs();
  }, []);

  useEffect(() => {
    if (!activeId) return;
    const fetchMsgs = async () => {
      try {
        const res = await api.get(`/api/conversations/${activeId}/messages`);
        const msgs = (res.data.data || []).reverse().map((m: any) => ({
          id: m.id,
          role: m.is_mine ? "brand" : "creator",
          text: m.body,
          time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: !!m.read_at
        }));
        setMessages(prev => ({ ...prev, [activeId]: msgs }));

        const conv = conversations.find(c => c.id === activeId);
        if (conv && conv.unread > 0) {
          await api.put(`/api/conversations/${activeId}/read`);
          setConversations(prev => prev.map(c => c.id === activeId ? { ...c, unread: 0 } : c));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMsgs();
  }, [activeId]);

  const active = conversations.find((c) => c.id === activeId);
  const threadMessages = activeId ? (messages[activeId] ?? []) : [];

  const filteredConvs = conversations.filter((c) =>
    !search.trim() || c.creator.toLowerCase().includes(search.toLowerCase()) || c.campaign.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnread = conversations.reduce((s, c) => s + c.unread, 0);

  const handleSend = async () => {
    if (!draft.trim() || !activeId) return;
    try {
      const res = await api.post(`/api/conversations/${activeId}/messages`, { body: draft.trim() });
      const m = res.data.data;
      const newMsg: Msg = {
        id: m.id,
        role: "brand",
        text: m.body,
        time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      };
      setMessages(prev => ({ ...prev, [activeId]: [...(prev[activeId] || []), newMsg] }));
      setConversations(prev => prev.map(c => c.id === activeId ? { ...c, lastMessage: newMsg.text, lastTime: "Just now" } : c));
      setDraft("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, activeId]);
  useEffect(() => {
    if (activeId) {
      // Focus input with a small delay to make sure UI is fully rendered
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [activeId]);
  const convListEl = (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--card)", borderRight: "1px solid var(--border)" }}>
      <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
          <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.0625rem", color: "var(--foreground)" }}>{isFr ? "Messages" : "Messages"}</h2>
          {totalUnread > 0 && <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "#DBEAFE", color: "var(--primary)", fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600 }}>{totalUnread} {isFr ? "nouveau(x)" : "new"}</span>}
        </div>
        <div style={{ position: "relative" }}>
          <Search size={13} style={{ position: "absolute", left: "0.625rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }} />
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={isFr ? "Rechercher des conversations..." : "Search conversations…"}
            style={{ width: "100%", height: "2rem", paddingLeft: "2rem", paddingRight: search ? "2rem" : "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.8125rem", outline: "none", boxSizing: "border-box" }}
            onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; }}
            onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
          />
          {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: "0.5rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}><X size={12} /></button>}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {filteredConvs.map((conv, i) => (
          <div key={conv.id} style={{ borderBottom: i < filteredConvs.length - 1 ? "1px solid var(--border)" : "none" }}>
            <ConvItem conv={conv} active={activeId === conv.id} onClick={() => { setActiveId(conv.id); setShowMobileChat(true); }} onViewProfile={handleViewProfile} />
          </div>
        ))}
      </div>
    </div>
  );

  const chatPanelEl = !active ? (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--muted-foreground)" }}>{isFr ? "Sélectionnez une conversation pour commencer à échanger" : "Select a conversation to start chatting"}</div>
  ) : (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--background)" }}>
      {/* Chat header */}
      <div style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid var(--border)", background: "var(--card)", flexShrink: 0, display: "flex", alignItems: "center", gap: "0.875rem" }}>
        <button className="flex lg:hidden" onClick={() => setShowMobileChat(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--foreground)", display: "flex" }}>
          <ArrowLeft size={18} />
        </button>
        <div 
          onClick={() => {
            if (active._raw?.other_participant?.id) {
              handleViewProfile(active._raw.other_participant.id);
            }
          }} 
          style={{ display: "flex", alignItems: "center", gap: "0.875rem", cursor: "pointer", flex: 1 }} 
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }} 
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
        >
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${active.creatorColor}22`, display: "flex", alignItems: "center", justifyContent: "center", color: active.creatorColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>
            {active.creator[0]}
          </div>
          <div>
            <p style={{ fontFamily: f.b, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", margin: 0 }}>
              {active.creator}
            </p>
            <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--primary)", margin: 0 }}>
              {active.campaign}
            </p>
          </div>
        </div>
        <button style={{ padding: "0.375rem 0.75rem", borderRadius: "0.375rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.78rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <ExternalLink size={12} /> {isFr ? "Campagne" : "Campaign"}
        </button>
      </div>

      {/* Campaign context */}
      <div style={{ padding: "0.75rem 1.25rem", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <CampaignContext conv={active} />
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem" }}>
        {threadMessages.map((msg) => <MessageBubble key={msg.id} msg={msg} conv={active} />)}
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <div style={{ padding: "0.875rem 1.25rem", borderTop: "1px solid var(--border)", background: "var(--card)", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
          <div style={{ flex: 1, border: "1px solid var(--border)", borderRadius: "0.75rem", background: "var(--input-background)", display: "flex", alignItems: "flex-end", padding: "0.5rem 0.875rem" }}>
            <textarea
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder={isFr ? "Écrire un message au créateur... (Entrée pour envoyer)" : "Write a message to the creator… (Enter to send)"}
              rows={1}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)", resize: "none", lineHeight: 1.6, maxHeight: 100, overflowY: "auto" }}
            />
          </div>
          <button onClick={handleSend} disabled={!draft.trim()}
            style={{ width: 38, height: 38, borderRadius: "0.625rem", background: draft.trim() ? "var(--primary)" : "var(--muted)", border: "none", cursor: draft.trim() ? "pointer" : "default", color: draft.trim() ? "#fff" : "var(--muted-foreground)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: draft.trim() ? "var(--shadow-primary)" : "none" }}>
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );

  if (isLoading) return <div style={{ padding: "3rem", color: "var(--muted-foreground)" }}>{isFr ? "Chargement..." : "Loading..."}</div>;

  return (
    <div style={{ height: "calc(100vh - 60px)", display: "flex", overflow: "hidden" }}>
      <div className="hidden lg:flex" style={{ width: "100%", height: "100%" }}>
        <div style={{ width: 300, flexShrink: 0 }}>{convListEl}</div>
        <div style={{ flex: 1, overflow: "hidden" }}>{chatPanelEl}</div>
      </div>
      <div className="flex lg:hidden" style={{ width: "100%", height: "100%" }}>
        {showMobileChat ? <div style={{ width: "100%" }}>{chatPanelEl}</div> : <div style={{ width: "100%" }}>{convListEl}</div>}
      </div>
      
      {/* Profile Detail Drawer */}
      <CreatorDrawer creator={selectedCreator} onClose={() => setSelectedCreator(null)} />

      {/* Loading Overlay */}
      {isViewingProfile && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
          <div style={{ padding: "1rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem", boxShadow: "var(--shadow-md)" }}>
            <Loader2 size={16} className="animate-spin" style={{ color: "var(--primary)" }} />
            <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)" }}>{isFr ? "Chargement du profil..." : "Loading profile..."}</span>
          </div>
        </div>
      )}
    </div>
  );
}
