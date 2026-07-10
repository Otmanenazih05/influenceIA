import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Sparkles, TrendingUp, Users, Link, Star, Zap, ArrowRight,
  MessageSquare, Send, CheckCircle, AlertCircle, BarChart2,
  ChevronRight, RefreshCw, X,
} from "lucide-react";
import api from "../../../lib/api";
import { useEffect } from "react";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

/* ─── Score ring ─── */
function ScoreRing({ score }: { score: number }) {
  const r = 48, circ = 2 * Math.PI * r;
  return (
    <svg width={112} height={112} viewBox="0 0 112 112">
      <circle cx={56} cy={56} r={r} fill="none" stroke="rgba(124,58,237,0.12)" strokeWidth={8} />
      <circle cx={56} cy={56} r={r} fill="none" stroke="#7C3AED" strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${(score / 100) * circ} ${circ - (score / 100) * circ}`}
        strokeDashoffset={circ / 4}
      />
      <text x={56} y={52} textAnchor="middle" style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1.5rem", fill: "var(--foreground)" }}>{score}</text>
      <text x={56} y={68} textAnchor="middle" style={{ fontFamily: f.b, fontSize: "0.65rem", fill: "var(--muted-foreground)" }}>/100</text>
    </svg>
  );
}

/* ─── Insights data ─── */
type InsightPriority = "critical" | "high" | "medium" | "opportunity";
interface Insight {
  id: string;
  priority: InsightPriority;
  category: string;
  title: string;
  description: string;
  impact: string;
  scoreImpact?: number;
  actionLabel: string;
  actionPath: string;
  done?: boolean;
}

const insights: Insight[] = [
  {
    id: "i1",
    priority: "critical",
    category: "Account",
    title: "Link your TikTok account",
    description: "You have Instagram linked but TikTok is missing. Many brand campaigns on InfluencIA require at least two platforms, and your TikTok would significantly increase match rates.",
    impact: "Increases IA Score by ~8 points. Unlocks 40% more campaign opportunities.",
    scoreImpact: 8,
    actionLabel: "Link TikTok",
    actionPath: "/dashboard/profile",
    done: false,
  },
  {
    id: "i2",
    priority: "critical",
    category: "Applications",
    title: "2 campaign invitations need your reply",
    description: "GlowLab Morocco and AtlasBrand have sent you direct invitations. Direct invitations have a higher acceptance rate than open applications — don't let these expire.",
    impact: "Direct invitations expire after 5 days. These were sent 3 days ago.",
    actionLabel: "View invitations",
    actionPath: "/dashboard/campaigns",
    done: false,
  },
  {
    id: "i3",
    priority: "high",
    category: "Profile",
    title: "Add portfolio examples to your profile",
    description: "Your profile is missing portfolio examples. Brands are 3× more likely to invite creators who have 2+ content samples showcasing their best work.",
    impact: "Increases IA Score by ~5 points and brand invitation rate by 3×.",
    scoreImpact: 5,
    actionLabel: "Add portfolio",
    actionPath: "/dashboard/profile",
    done: false,
  },
  {
    id: "i4",
    priority: "high",
    category: "Opportunity",
    title: "Zara.ma campaign closes in 3 days",
    description: "The Zara.ma Autumn Preview campaign (7 500 MAD, 84% match) closes on June 30. You haven't applied yet — only 1 spot remains.",
    impact: "7 500 MAD potential earnings. High match. Last spot available.",
    actionLabel: "Apply now",
    actionPath: "/dashboard/campaigns",
    done: false,
  },
  {
    id: "i5",
    priority: "medium",
    category: "Profile",
    title: "Verify your phone number",
    description: "Verified phone numbers increase trust scores with brands and unlock priority support. It takes less than 2 minutes.",
    impact: "Increases IA Score by ~2 points.",
    scoreImpact: 2,
    actionLabel: "Verify now",
    actionPath: "/dashboard/settings",
    done: false,
  },
  {
    id: "i6",
    priority: "medium",
    category: "Growth",
    title: "Your engagement rate is exceptional",
    description: "Your 8.3% engagement rate puts you in the top 12% of creators on InfluencIA. Brands searching for high-engagement nano creators will see your profile first.",
    impact: "You qualify for premium campaigns with stricter engagement requirements.",
    actionLabel: "Browse premium campaigns",
    actionPath: "/dashboard/campaigns",
    done: false,
  },
  {
    id: "i7",
    priority: "opportunity",
    category: "Strategy",
    title: "Your response rate can be improved",
    description: "You've responded to 73% of brand messages within 24 hours. Brands prefer creators with 80%+ response rates and may skip over others when inviting collaborators.",
    impact: "Reaching 80%+ response rate can increase invitations by ~25%.",
    actionLabel: "View messages",
    actionPath: "/dashboard/messaging",
    done: false,
  },
];

const PRIORITY_CONFIG: Record<InsightPriority, { label: string; color: string; bg: string; border: string }> = {
  critical:    { label: "Action needed",    color: "#991B1B", bg: "#FEE2E2", border: "#FECACA" },
  high:        { label: "Recommended",      color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE" },
  medium:      { label: "Suggested",        color: "#5B21B6", bg: "#EDE9FE", border: "#DDD6FE" },
  opportunity: { label: "Opportunity",      color: "#065F46", bg: "#ECFDF5", border: "#A7F3D0" },
};

/* ─── Chat ─── */
interface ChatMessage {
  id: number;
  role: "user" | "coach";
  text: string;
}

const QUICK_QUESTIONS = [
  "How can I improve my IA Score?",
  "Which campaign should I apply to first?",
  "How does escrow payment work?",
  "What content performs best for brands?",
];

const COACH_RESPONSES: Record<string, string> = {
  "How can I improve my IA Score?":
    "Your IA Score of 87 is already excellent — you're in the top 18% of creators. To push higher:\n\n1. Link your TikTok (+8 pts) — this is the biggest immediate win\n2. Add portfolio examples (+5 pts)\n3. Verify your phone (+2 pts)\n4. Complete 2 more brand campaigns (+4–6 pts from performance data)\n\nAt 100, you'll unlock VIP brand invitations and premium-tier campaigns.",

  "Which campaign should I apply to first?":
    "Based on your profile, I'd prioritize in this order:\n\n1. GlowLab Morocco (96% match, 5 000 MAD) — Excellent fit, active invitation\n2. AtlasBrand (88% match, 3 500 MAD) — Already accepted, ready to submit\n3. Zara.ma (84% match, 7 500 MAD) — Closes in 3 days, only 1 spot left\n\nGlowLab is your strongest fit. Start there.",

  "How does escrow payment work?":
    "Escrow means the brand deposits your full payment into a secure account before any work begins. Here's the flow:\n\n1. Brand accepts your application\n2. Brand funds the escrow (you can see this in Earnings)\n3. You create and submit content\n4. Brand approves the content\n5. Payment releases to your InfluencIA wallet within 48h\n6. You withdraw to your bank or mobile wallet\n\nYou're always protected — payment is guaranteed before you start.",

  "What content performs best for brands?":
    "Based on campaign performance data across InfluencIA:\n\n• Reels with natural lighting and real environments outperform studio shots by 2.4×\n• First 3 seconds are critical — start with the product or a surprising moment\n• Voiceover in Darija or French performs 40% better for Moroccan brands vs subtitles\n• Morning posts (7–9am) and evening posts (7–9pm) get the most reach\n• Stories with polls or link stickers have 60% higher swipe-up rates\n\nYour 8.3% engagement already shows you're doing this well!",
};

const getDefaultResponse = (q: string) =>
  `Great question about "${q}". Based on your profile and current campaigns, I'd recommend focusing on strengthening your TikTok presence and responding to the 2 pending invitations. Let me know if you want more specific guidance on any area — score improvement, content strategy, or campaign selection.`;

function CoachChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "coach",
      text: "Hi Sarah! I'm your AI Coach. I've analyzed your profile and have 7 personalized recommendations ready. Ask me anything about improving your score, which campaigns to prioritize, or how the platform works.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const response = COACH_RESPONSES[text] ?? getDefaultResponse(text);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "coach", text: response }]);
      setLoading(false);
    }, 900);
  };

  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", display: "flex", flexDirection: "column", height: 520 }}>
      <div style={{ padding: "1rem 1.125rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.625rem", flexShrink: 0 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #2563EB)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Sparkles size={15} color="#fff" />
        </div>
        <div>
          <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>AI Coach</p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
            <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>Online · powered by InfluencIA</p>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.125rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: "flex", gap: "0.625rem", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
            {msg.role === "coach" && (
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #2563EB)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                <Sparkles size={12} color="#fff" />
              </div>
            )}
            <div
              style={{
                maxWidth: "82%",
                padding: "0.625rem 0.875rem",
                borderRadius: msg.role === "user" ? "0.875rem 0.875rem 0.25rem 0.875rem" : "0.875rem 0.875rem 0.875rem 0.25rem",
                background: msg.role === "user" ? "var(--primary)" : "var(--background)",
                border: msg.role === "user" ? "none" : "1px solid var(--border)",
              }}
            >
              <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: msg.role === "user" ? "#fff" : "var(--foreground)", lineHeight: 1.65, whiteSpace: "pre-line" }}>
                {msg.text}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #2563EB)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Sparkles size={12} color="#fff" />
            </div>
            <div style={{ display: "flex", gap: "0.3rem", padding: "0.625rem 0.875rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.875rem 0.875rem 0.875rem 0.25rem" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--muted-foreground)", animation: `bounce 1s ${i * 0.2}s infinite` }} />
              ))}
              <style>{`@keyframes bounce { 0%,100%{opacity:.3} 50%{opacity:1} }`}</style>
            </div>
          </div>
        )}
      </div>

      {/* Quick questions */}
      {messages.length <= 1 && (
        <div style={{ padding: "0 1.125rem 0.75rem", display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
          {QUICK_QUESTIONS.map((q) => (
            <button key={q} onClick={() => sendMessage(q)}
              style={{ padding: "0.3125rem 0.75rem", borderRadius: "2rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.78rem", whiteSpace: "nowrap" }}>
              {q}
            </button>
          ))}
        </div>
      )}

      <div style={{ padding: "0.75rem 1.125rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.5rem", flexShrink: 0 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") sendMessage(input); }}
          placeholder="Ask your AI Coach anything…"
          style={{ flex: 1, height: "2.375rem", padding: "0 0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--input-background)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.875rem", outline: "none" }}
          onFocus={(e) => { e.target.style.borderColor = "#7C3AED"; }}
          onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          style={{ width: 38, height: 38, borderRadius: "0.5rem", background: input.trim() ? "#7C3AED" : "var(--muted)", border: "none", cursor: input.trim() ? "pointer" : "default", color: input.trim() ? "#fff" : "var(--muted-foreground)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}

/* ─── Insight card ─── */
function InsightCard({ insight, onDismiss, onAction }: { insight: Insight; onDismiss: (id: string) => void; onAction: (path: string) => void }) {
  const cfg = PRIORITY_CONFIG[insight.priority];
  return (
    <div style={{ background: "var(--card)", border: `1px solid ${insight.priority === "critical" ? cfg.border : "var(--border)"}`, borderRadius: "0.875rem", padding: "1.125rem", position: "relative", overflow: "hidden" }}>
      {insight.priority === "critical" && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #EF4444, #F97316)" }} />
      )}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.625rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ padding: "0.175rem 0.5rem", borderRadius: 999, background: cfg.bg, color: cfg.color, fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {cfg.label}
          </span>
          <span style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)" }}>{insight.category}</span>
          {insight.scoreImpact && (
            <span style={{ display: "flex", alignItems: "center", gap: "0.2rem", padding: "0.15rem 0.4rem", borderRadius: 999, background: "#EDE9FE", color: "#5B21B6", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700 }}>
              <TrendingUp size={10} />+{insight.scoreImpact} pts
            </span>
          )}
        </div>
      </div>
      <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.375rem" }}>
        {insight.title}
      </p>
      <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.65, marginBottom: "0.75rem" }}>
        {insight.description}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
        <Zap size={12} style={{ color: "#F59E0B", flexShrink: 0 }} />
        <span style={{ fontFamily: f.b, fontSize: "0.78rem", color: "#92400E" }}>{insight.impact}</span>
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => onDismiss(insight.id)}
          style={{ padding: "0.4375rem 0.875rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem" }}
        >
          Dismiss
        </button>
        <button
          onClick={() => onAction(insight.actionPath)}
          style={{ flex: 1, padding: "0.4375rem 0.875rem", borderRadius: "0.5rem", border: "none", background: insight.priority === "critical" ? "#EF4444" : insight.priority === "opportunity" ? "#10B981" : "var(--primary)", color: "#fff", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem" }}
        >
          {insight.actionLabel} <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export function CoachPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const navigate = useNavigate();
  const [filterPriority, setFilterPriority] = useState<InsightPriority | "all">("all");
  const [activeInsights, setActiveInsights] = useState<Insight[]>(insights);
  const [activeGuide, setActiveGuide] = useState<any | null>(null);

  const guidesData = [
    {
      id: "g1",
      icon: <BarChart2 size={14} />,
      title: isFr ? "Comment le score IA est calculé" : "How the IA Score is calculated",
      sub: isFr ? "Lecture : 5 min" : "5 min read",
      content: (
        <div>
          <p style={{ marginBottom: "1rem" }}>
            {isFr 
              ? "Votre score IA représente votre note globale et votre pertinence pour les campagnes de marque. Il est calculé en fonction de 4 dimensions clés :"
              : "Your IA Score represents your overall creator rating and suitability for premium brand campaigns. It is dynamically computed by our AI using four key dimensions:"
            }
          </p>
          <ul style={{ paddingLeft: "1.25rem", margin: "0 0 1.25rem", listStyleType: "disc" }}>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>{isFr ? "Engagement (40%)" : "Engagement Quality (40%)"}</strong>: {isFr 
                ? "Calculé en comparant votre moyenne de likes, commentaires et vues avec votre nombre d'abonnés." 
                : "Calculated by comparing your average likes, comments, views, and shares with your total follower counts."
              }
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>{isFr ? "Connexion des comptes (30%)" : "Account Connection (30%)"}</strong>: {isFr 
                ? "Vérifie vos profils de réseaux sociaux associés. Lier plus de comptes renforce la confiance." 
                : "Integrates and verifies multiple social media profiles (Instagram, TikTok, YouTube, Facebook). Linking more active accounts builds verification trust."
              }
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>{isFr ? "Profil complet (20%)" : "Profile Completeness (20%)"}</strong>: {isFr 
                ? "Avoir une photo de profil, une biographie, un numéro vérifié et des exemples de portfolio." 
                : "Having an avatar, complete bio, phone verification, and at least 2 content samples in your portfolio shows professionalism."
              }
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>{isFr ? "Régularité (10%)" : "Variance & Consistency (10%)"}</strong>: {isFr 
                ? "Évalue votre calendrier de publication et la qualité réelle de votre audience." 
                : "Evaluates your posting schedule stability and audience authenticity to filter out bot interactions."
              }
            </li>
          </ul>
          <p>
            <strong>{isFr ? "Astuce :" : "Pro Tip:"}</strong> {isFr 
              ? "Associez vos comptes manquants pour augmenter immédiatement votre score !" 
              : "Link your missing social channels under your settings to instantly boost your score!"
            }
          </p>
        </div>
      )
    },
    {
      id: "g2",
      icon: <MessageSquare size={14} />,
      title: isFr ? "Rédiger des messages d'accroche percutants" : "Writing winning pitch messages",
      sub: isFr ? "Lecture : 3 min" : "3 min read",
      content: (
        <div>
          <p style={{ marginBottom: "1rem" }}>
            {isFr 
              ? "Lorsque vous postulez à une campagne sur InfluencIA, votre message d'accroche est votre première impression :"
              : "When applying to a brand campaign on InfluencIA, your cover letter or pitch message is your first impression. Here is the framework for a high-converting pitch:"
            }
          </p>
          <ol style={{ paddingLeft: "1.25rem", margin: "0 0 1.25rem", listStyleType: "decimal" }}>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>{isFr ? "Accroche personnalisée" : "Personalized Hook"}</strong>: {isFr 
                ? "Adressez-vous directement à la marque et dites ce que vous aimez dans leurs produits." 
                : "Address the brand or campaign name directly and mention what you love about their products."
              }
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>{isFr ? "Statistiques clés" : "Key Metrics"}</strong>: {isFr 
                ? "Indiquez votre plateforme principale et votre taux d'engagement moyen." 
                : "State your main platform, total followers, and engagement rate clearly."
              }
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>{isFr ? "Idée de création" : "Creative Idea"}</strong>: {isFr 
                ? "Suggérez brièvement comment vous comptez présenter leur produit." 
                : "Suggest a brief concept of how you plan to showcase their product. Brands love creators who bring ideas to the table!"
              }
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>{isFr ? "Appel à l'action" : "Call to Action"}</strong>: {isFr 
                ? "Soyez bref, professionnel, et invitez à la discussion." 
                : "Keep it brief, professional, and invite the brand to check your content sample."
              }
            </li>
          </ol>
          <p>
            {isFr 
              ? "Évitez le copier-coller. Les messages personnalisés ont un taux d'acceptation 4 fois plus élevé !" 
              : "Avoid copy-pasting generic messages. Custom pitches receive up to 4× higher acceptance rates!"
            }
          </p>
        </div>
      )
    },
    {
      id: "g3",
      icon: <Star size={14} />,
      title: isFr ? "Créer du contenu que les marques adorent" : "Creating content brands love",
      sub: isFr ? "Lecture : 8 min" : "8 min read",
      content: (
        <div>
          <p style={{ marginBottom: "1rem" }}>
            {isFr 
              ? "Maintenir d'excellentes relations avec les marques conduit à des partenariats à long terme :"
              : "Maintaining long-term relationships with brands leads to recurring contracts and ambassador deals. Follow these content creation standards:"
            }
          </p>
          <ul style={{ paddingLeft: "1.25rem", margin: "0 0 1.25rem", listStyleType: "disc" }}>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>{isFr ? "Haute résolution" : "Crystal Clear Resolution"}</strong>: {isFr 
                ? "Filmez en 1080p ou 4K avec une bonne lumière naturelle." 
                : "Record in 1080p or 4K with good natural light. High visual fidelity represents the brand value professionally."
              }
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>{isFr ? "Accroche immédiate" : "Immediate Hook"}</strong>: {isFr 
                ? "Présentez le produit ou la marque dès les 3 premières secondes." 
                : "Integrate the product or brand within the first 3 seconds of the video to maintain viewer attention."
              }
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>{isFr ? "Respecter le brief" : "Follow Guidelines"}</strong>: {isFr 
                ? "Suivez attentivement les consignes de la campagne." 
                : "Carefully check the deliverables brief. If they asked for a specific hashtag or link, make sure it is included."
              }
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>{isFr ? "Audio professionnel" : "Professional Audio"}</strong>: {isFr 
                ? "Assurez-vous que votre voix est claire et audible." 
                : "Ensure your voiceover or background music is clean and doesn't drown out key brand mentions."
              }
            </li>
          </ul>
        </div>
      )
    }
  ];

  const [score, setScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState<{ label: string; score: number; max: number; color: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const res = await api.get('/api/influencer/score-explanation');
        const data = res.data.data;
        setScore(data.total_score || 0);
        
        const breakdown = [
          { label: "Engagement", score: data.engagement_score || 0, max: 40, color: "#10B981" },
          { label: "Account connection", score: data.accounts_score || 0, max: 30, color: "#2563EB" },
          { label: "Profile completeness", score: data.completeness_score || 0, max: 20, color: "#7C3AED" },
          { label: "Variance", score: data.variance_score || 0, max: 10, color: "#F59E0B" }
        ];
        setScoreBreakdown(breakdown);
      } catch (err) {
        console.error("Failed to fetch score", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScore();
  }, []);

  const dismiss = (id: string) => setActiveInsights((prev) => prev.filter((i) => i.id !== id));
  const filtered = activeInsights.filter((i) => filterPriority === "all" || i.priority === filterPriority);
  const criticalCount = activeInsights.filter((i) => i.priority === "critical").length;

  return (
    <div style={{ padding: "1.75rem 1.5rem 3rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
          {isFr ? "Coach IA" : "AI Coach"}
        </h1>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          {isFr ? "Conseils personnalises pour ameliorer votre score et vos revenus" : "Personalized guidance to grow your score and earnings"}
        </p>
      </div>

      <div style={{ gap: "1.5rem", alignItems: "start" }} className="flex flex-col xl:grid xl:grid-cols-[1fr_360px]">

        {/* Left: Score + Insights */}
        <div>
          {/* Score summary */}
          <div style={{ background: "linear-gradient(150deg, #4C1D95, #7C3AED)", borderRadius: "0.875rem", padding: "1.5rem", marginBottom: "1.25rem", boxShadow: "0 8px 24px rgba(124,58,237,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
              <ScoreRing score={score} />
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>IA Score</p>
                <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.5rem", color: "#fff", marginBottom: "0.25rem" }}>{score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs work"}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  Your score is calculated dynamically based on your profile completeness, connected social accounts, and engagement rate.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {scoreBreakdown.map((sb) => (
                    <div key={sb.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "rgba(255,255,255,0.65)", minWidth: 130 }}>{sb.label}</span>
                      <div style={{ flex: 1, height: 5, borderRadius: 999, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(sb.score / sb.max) * 100}%`, borderRadius: 999, background: sb.color }} />
                      </div>
                      <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.8125rem", color: "#fff", minWidth: 24 }}>{sb.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Filter + count */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>
                {filtered.length} insight{filtered.length !== 1 ? "s" : ""}
              </h2>
              {criticalCount > 0 && (
                <span style={{ padding: "0.175rem 0.5rem", borderRadius: 999, background: "#FEE2E2", color: "#991B1B", fontFamily: f.b, fontSize: "0.72rem", fontWeight: 700 }}>
                  {criticalCount} need action
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
              {(["all", "critical", "high", "medium", "opportunity"] as const).map((p) => (
                <button key={p} onClick={() => setFilterPriority(p)}
                  style={{ padding: "0.3rem 0.75rem", borderRadius: "2rem", border: `1px solid ${filterPriority === p ? "var(--primary)" : "var(--border)"}`, background: filterPriority === p ? "#EFF6FF" : "var(--card)", color: filterPriority === p ? "var(--primary)" : "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.78rem", fontWeight: filterPriority === p ? 500 : 400, textTransform: "capitalize", whiteSpace: "nowrap" }}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Insight cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {filtered.length > 0 ? (
              filtered.map((ins) => (
                <InsightCard
                  key={ins.id}
                  insight={ins}
                  onDismiss={dismiss}
                  onAction={(path) => {
                    if (path === "/dashboard/profile" && ins.actionLabel === "Link TikTok") {
                      navigate(path, { state: { autoConnect: "TikTok" } });
                    } else {
                      navigate(path);
                    }
                  }}
                />
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "3rem 2rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem" }}>
                <CheckCircle size={32} style={{ color: "#10B981", display: "block", margin: "0 auto 0.75rem" }} />
                <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>All caught up!</p>
                <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", marginBottom: "1rem" }}>No active insights for this filter. Check back as your profile evolves.</p>
                <button onClick={() => setFilterPriority("all")} style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem" }}>
                  <RefreshCw size={13} /> View all insights
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Chat */}
        <div>
          <CoachChat />

          {/* Resource links */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.125rem", marginTop: "1rem" }}>
            <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.875rem" }}>
              {isFr ? "Guides & astuces" : "Guides & tips"}
            </h3>
            {guidesData.map((item) => (
              <button 
                key={item.id} 
                onClick={() => setActiveGuide(item)}
                style={{ display: "flex", alignItems: "center", gap: "0.625rem", width: "100%", padding: "0.625rem 0", borderRadius: "0", border: "none", borderBottom: "1px solid var(--border)", background: "none", cursor: "pointer", textAlign: "left" }}
              >
                <span style={{ color: "var(--primary)", display: "flex", alignItems: "center" }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)" }}>{item.title}</p>
                  <p style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)" }}>{item.sub}</p>
                </div>
                <ChevronRight size={13} style={{ color: "var(--muted-foreground)" }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guide Details Modal */}
      {activeGuide && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
          <div onClick={() => setActiveGuide(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", width: "100%", maxWidth: 500, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.75rem", boxShadow: "0 20px 50px rgba(0,0,0,0.22)", zIndex: 1, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "var(--primary)", display: "flex", alignItems: "center" }}>{activeGuide.icon}</span>
                <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.125rem", color: "var(--foreground)" }}>{activeGuide.title}</p>
              </div>
              <button onClick={() => setActiveGuide(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}>
                <X size={18} />
              </button>
            </div>
            
            <div style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>
              {activeGuide.content}
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
              <button 
                onClick={() => setActiveGuide(null)} 
                style={{ padding: "0.5rem 1.25rem", borderRadius: "0.5rem", border: "none", background: "var(--primary)", color: "#fff", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500 }}
              >
                {isFr ? "Fermer" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
