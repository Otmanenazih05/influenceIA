import { useState } from "react";
import { Send, Paperclip, Smile, Image, Check, CheckCheck } from "lucide-react";
import { SectionHeader, SubSection, DSCard } from "./DSLayout";

const conversations = [
  { name: "Sarah Benjelloun", preview: "Parfait ! Je prépare le contenu pour...", time: "14:32", unread: 3, online: true, avatar: "S", color: "#2563EB" },
  { name: "Youssef El Amrani", preview: "Merci pour le brief, j'ai quelques...", time: "12:15", unread: 0, online: false, avatar: "Y", color: "#7C3AED" },
  { name: "Lina Zahra", preview: "Le post sera publié demain à 18h", time: "Hier", unread: 1, online: true, avatar: "L", color: "#EC4899" },
  { name: "Omar Boutaleb", preview: "Voici les statistiques du dernier...", time: "Lun", unread: 0, online: false, avatar: "O", color: "#10B981" },
];

interface Message {
  id: number;
  text: string;
  sent: boolean;
  time: string;
  status: "sent" | "delivered" | "read";
}

const initialMessages: Message[] = [
  { id: 1, text: "Bonjour ! J'ai vu votre campagne de lancement produit. C'est exactement ce que je recherche.", sent: false, time: "14:28", status: "read" },
  { id: 2, text: "Bonjour Sarah ! Merci de votre intérêt. Votre profil correspond parfaitement à notre cible.", sent: true, time: "14:30", status: "read" },
  { id: 3, text: "Pouvez-vous partager le brief créatif ? Je voudrais m'assurer que la vision est alignée.", sent: false, time: "14:31", status: "delivered" },
  { id: 4, text: "Bien sûr, je vous envoie le document. Le ton doit être authentique, lifestyle, et inspirer confiance.", sent: true, time: "14:32", status: "delivered" },
];

function ChatBubble({ message }: { message: Message }) {
  const { text, sent, time, status } = message;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: sent ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: "0.5rem",
        marginBottom: "0.75rem",
      }}
    >
      {!sent && (
        <div
          style={{
            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #2563EB, #7C3AED)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.7rem", color: "#fff" }}>S</span>
        </div>
      )}
      <div style={{ maxWidth: "70%" }}>
        <div
          style={{
            padding: "0.625rem 0.875rem",
            borderRadius: sent ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
            background: sent ? "var(--primary)" : "var(--card)",
            color: sent ? "#fff" : "var(--foreground)",
            border: sent ? "none" : "1px solid var(--border)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
          }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.5 }}>
            {text}
          </p>
        </div>
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: sent ? "flex-end" : "flex-start",
            gap: "0.25rem", marginTop: "0.25rem",
          }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "var(--muted-foreground)" }}>
            {time}
          </span>
          {sent && (
            status === "read"
              ? <CheckCheck size={12} style={{ color: "var(--brand-blue)" }} />
              : <CheckCheck size={12} style={{ color: "var(--muted-foreground)" }} />
          )}
        </div>
      </div>
    </div>
  );
}

function ChatListItem({ item, active }: { item: typeof conversations[0]; active: boolean }) {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: "0.75rem",
        padding: "0.75rem 1rem",
        background: active ? "var(--secondary)" : "transparent",
        cursor: "pointer",
        borderRadius: "0.5rem",
        transition: "background 0.15s",
      }}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div
          style={{
            width: 38, height: 38, borderRadius: "50%",
            background: `${item.color}22`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: item.color,
            fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.9rem",
          }}
        >
          {item.avatar}
        </div>
        {item.online && (
          <span
            style={{
              position: "absolute", bottom: 1, right: 1,
              width: 8, height: 8, borderRadius: "50%",
              background: "var(--brand-success)",
              border: "2px solid var(--card)",
            }}
          />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>
            {item.name}
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "var(--muted-foreground)", flexShrink: 0, marginLeft: 4 }}>
            {item.time}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 1 }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "var(--muted-foreground)",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1,
            }}
          >
            {item.preview}
          </p>
          {item.unread > 0 && (
            <span
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 18, height: 18, borderRadius: "50%",
                background: "var(--primary)", color: "#fff",
                fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700,
                flexShrink: 0, marginLeft: 4,
              }}
            >
              {item.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function InputComposer({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <div
      style={{
        display: "flex", alignItems: "flex-end", gap: "0.5rem",
        padding: "0.75rem 1rem",
        borderTop: "1px solid var(--border)",
        background: "var(--card)",
      }}
    >
      <div style={{ display: "flex", gap: "0.375rem" }}>
        {[<Paperclip key="p" size={16} />, <Image key="i" size={16} />, <Smile key="s" size={16} />].map((Icon, i) => (
          <button
            key={i}
            style={{
              width: 32, height: 32, borderRadius: "0.5rem",
              background: "var(--muted)", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--muted-foreground)",
            }}
          >
            {Icon}
          </button>
        ))}
      </div>
      <div
        style={{
          flex: 1,
          border: "1px solid var(--border)",
          borderRadius: "0.75rem",
          background: "var(--input-background)",
          display: "flex", alignItems: "center",
          padding: "0.375rem 0.75rem",
        }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && value.trim()) { onSend(value); setValue(""); } }}
          placeholder="Écrire un message…"
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            fontFamily: "'Inter', sans-serif", fontSize: "0.875rem",
            color: "var(--foreground)",
          }}
        />
      </div>
      <button
        onClick={() => { if (value.trim()) { onSend(value); setValue(""); } }}
        style={{
          width: 36, height: 36, borderRadius: "0.625rem",
          background: value.trim() ? "var(--primary)" : "var(--muted)",
          border: "none", cursor: value.trim() ? "pointer" : "default",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: value.trim() ? "#fff" : "var(--muted-foreground)",
          transition: "all 0.15s",
          flexShrink: 0,
        }}
      >
        <Send size={15} />
      </button>
    </div>
  );
}

export function MessagingSection() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [activeConv, setActiveConv] = useState(0);

  const handleSend = (text: string) => {
    setMessages([...messages, {
      id: messages.length + 1,
      text,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    }]);
  };

  return (
    <div>
      <SectionHeader
        title="Messaging UI"
        description="Chat list, message bubbles, and input composer patterns for brand–influencer conversations."
      />

      <SubSection title="Full Chat Interface">
        <div
          className="bg-card border border-border rounded-xl overflow-hidden flex"
          style={{ height: 480, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
        >
          {/* Left: conversation list */}
          <div
            style={{
              width: 240, flexShrink: 0,
              borderRight: "1px solid var(--border)",
              display: "flex", flexDirection: "column",
              background: "var(--card)",
            }}
          >
            <div style={{ padding: "0.875rem 1rem", borderBottom: "1px solid var(--border)" }}>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>
                Messages
              </p>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem" }}>
              {conversations.map((conv, i) => (
                <ChatListItem key={i} item={conv} active={activeConv === i} />
              ))}
            </div>
          </div>

          {/* Right: message thread */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Header */}
            <div
              style={{
                padding: "0.875rem 1.125rem",
                borderBottom: "1px solid var(--border)",
                display: "flex", alignItems: "center", gap: "0.75rem",
                background: "var(--card)",
              }}
            >
              <div
                style={{
                  width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                  background: "#2563EB22",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#2563EB",
                  fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.875rem",
                }}
              >
                S
              </div>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>
                  Sarah Benjelloun
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--brand-success)" }}>
                  En ligne
                </p>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{ flex: 1, overflowY: "auto", padding: "1rem 1.125rem", background: "var(--background)" }}
            >
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
            </div>

            {/* Composer */}
            <InputComposer onSend={handleSend} />
          </div>
        </div>
      </SubSection>

      <SubSection title="Chat Bubble Styles">
        <DSCard>
          <div style={{ maxWidth: 360 }}>
            {initialMessages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
          </div>
        </DSCard>
      </SubSection>

      <SubSection title="Chat List Items">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {conversations.map((conv, i) => (
            <div key={i} style={{ borderBottom: i < conversations.length - 1 ? "1px solid var(--border)" : "none" }}>
              <ChatListItem item={conv} active={i === 0} />
            </div>
          ))}
        </div>
      </SubSection>
    </div>
  );
}
