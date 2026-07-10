import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Calendar, Clock, DollarSign, Megaphone, Link } from "lucide-react";
import api from "../../../lib/api";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

type EventType = "deadline" | "submission" | "publication" | "payment" | "briefing";
const EVENT_CONFIG: Record<EventType, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  deadline:    { label: "Deadline",    icon: <Calendar size={12} />,  color: "#991B1B", bg: "#FEE2E2" },
  submission:  { label: "Submission",  icon: <Link size={12} />,      color: "#5B21B6", bg: "#EDE9FE" },
  publication: { label: "Goes live",   icon: <Megaphone size={12} />, color: "#1D4ED8", bg: "#DBEAFE" },
  payment:     { label: "Payment",     icon: <DollarSign size={12} />,color: "#065F46", bg: "#D1FAE5" },
  briefing:    { label: "Briefing",    icon: <Clock size={12} />,     color: "#92400E", bg: "#FEF3C7" },
};

interface CalEvent {
  id: string; date: string; title: string; type: string; color: string; brand: string;
}

function EventChip({ event, onClick }: { event: CalEvent; onClick: () => void }) {
  const typeKey = event.type as EventType;
  const cfg = EVENT_CONFIG[typeKey] ?? { color: event.color, bg: `${event.color}18`, label: event.type, icon: <Calendar size={12} /> };
  return (
    <div
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{
        display: "flex", alignItems: "center", gap: "0.2rem",
        padding: "0.175rem 0.375rem", borderRadius: "0.25rem",
        background: cfg.bg, cursor: "pointer",
        overflow: "hidden", whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: cfg.color, flexShrink: 0 }}>{cfg.icon}</span>
      <span style={{ fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600, color: cfg.color, overflow: "hidden", textOverflow: "ellipsis" }}>
        {event.brand.split(" ")[0]}
      </span>
    </div>
  );
}

function EventRow({ event }: { event: CalEvent }) {
  const typeKey = event.type as EventType;
  const cfg = EVENT_CONFIG[typeKey] ?? { color: event.color, bg: `${event.color}18`, label: event.type, icon: <Calendar size={12} /> };
  const date = new Date(event.date);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0.875rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem", borderLeft: `3px solid ${event.color}` }}>
      <div style={{ textAlign: "center", flexShrink: 0, minWidth: 36 }}>
        <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1rem", color: "var(--foreground)", lineHeight: 1 }}>{date.getDate()}</p>
        <p style={{ fontFamily: f.b, fontSize: "0.65rem", color: "var(--muted-foreground)", textTransform: "uppercase" }}>{MONTHS[date.getMonth()].slice(0, 3)}</p>
      </div>
      <div style={{ width: 1, height: 36, background: "var(--border)", flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", padding: "0.1rem 0.4rem", borderRadius: 999, background: cfg.bg, color: cfg.color, fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600 }}>
            {cfg.icon}{cfg.label}
          </span>
        </div>
        <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 2 }}>{event.title}</p>
      </div>
    </div>
  );
}

/* ─── Month grid view ─── */
function MonthView({
  year, month,
  selectedDay, onDayClick, events
}: {
  year: number; month: number;
  selectedDay: number | null; onDayClick: (d: number) => void;
  events: CalEvent[];
}) {
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells: { day: number | null; isCurrentMonth: boolean }[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push({ day: prevMonthDays - firstDayOfMonth + 1 + i, isCurrentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, isCurrentMonth: true });
  }
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) cells.push({ day: i, isCurrentMonth: false });
  }

  const eventsForDay = (d: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    return events.filter((e) => e.date === dateStr);
  };

  return (
    <div>
      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 1, marginBottom: "0.25rem" }}>
        {DAYS.map((d) => (
          <div key={d} style={{ textAlign: "center", padding: "0.5rem 0", fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {d}
          </div>
        ))}
      </div>
      {/* Day cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "2px" }}>
        {cells.map((cell, i) => {
          const isToday = isCurrentMonth && cell.isCurrentMonth && cell.day === today.getDate();
          const isSelected = selectedDay === cell.day && cell.isCurrentMonth;
          const events = cell.isCurrentMonth && cell.day ? eventsForDay(cell.day) : [];
          return (
            <div
              key={i}
              onClick={() => cell.isCurrentMonth && cell.day && onDayClick(cell.day)}
              style={{
                minHeight: 80, padding: "0.375rem", borderRadius: "0.375rem",
                background: isSelected ? "#EFF6FF" : "var(--card)",
                border: `1px solid ${isSelected ? "rgba(37,99,235,0.3)" : isToday ? "var(--primary)" : "var(--border)"}`,
                cursor: cell.isCurrentMonth ? "pointer" : "default",
                transition: "background .12s",
                opacity: cell.isCurrentMonth ? 1 : 0.35,
              }}
            >
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                background: isToday ? "var(--primary)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "0.25rem",
              }}>
                <span style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: isToday ? 700 : 400, color: isToday ? "#fff" : cell.isCurrentMonth ? "var(--foreground)" : "var(--muted-foreground)" }}>
                  {cell.day}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                {events.slice(0, 2).map((ev) => (
                  <EventChip key={ev.id} event={ev} onClick={() => {}} />
                ))}
                {events.length > 2 && (
                  <span style={{ fontFamily: f.b, fontSize: "0.65rem", color: "var(--muted-foreground)" }}>+{events.length - 2} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Week view ─── */
function WeekView({ year, month, weekStart, events }: { year: number; month: number; weekStart: Date; events: CalEvent[] }) {
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    days.push(d);
  }
  const today = new Date();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "0.5rem" }}>
      {days.map((day) => {
        const isToday = day.toDateString() === today.toDateString();
        const dateStr = `${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,"0")}-${String(day.getDate()).padStart(2,"0")}`;
        const dayEvents = events.filter((e) => e.date === dateStr);
        return (
          <div key={dateStr} style={{ background: "var(--card)", border: `1px solid ${isToday ? "var(--primary)" : "var(--border)"}`, borderRadius: "0.625rem", overflow: "hidden" }}>
            <div style={{ padding: "0.5rem", textAlign: "center", borderBottom: "1px solid var(--border)", background: isToday ? "var(--primary)" : "var(--muted)" }}>
              <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: isToday ? "#fff" : "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {DAYS[day.getDay()]}
              </p>
              <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.125rem", color: isToday ? "#fff" : "var(--foreground)" }}>{day.getDate()}</p>
            </div>
            <div style={{ padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem", minHeight: 100 }}>
              {dayEvents.map((ev) => {
                const typeKey = ev.type as EventType;
                const cfg = EVENT_CONFIG[typeKey] ?? { color: ev.color, bg: `${ev.color}18`, label: ev.type, icon: null };
                return (
                  <div key={ev.id} style={{ padding: "0.375rem 0.5rem", borderRadius: "0.25rem", background: cfg.bg, borderLeft: `2px solid ${cfg.color}` }}>
                    <p style={{ fontFamily: f.b, fontSize: "0.7rem", fontWeight: 600, color: cfg.color }}>{ev.brand.split(" ")[0]}</p>
                    <p style={{ fontFamily: f.b, fontSize: "0.65rem", color: cfg.color, opacity: 0.8, lineHeight: 1.3 }}>{cfg.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CalendarPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const todayDate = new Date();
  const [year, setYear] = useState(todayDate.getFullYear());
  const [month, setMonth] = useState(todayDate.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(todayDate.getDate());
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [appsRes, paymentsRes] = await Promise.all([
          api.get('/api/applications/mine'),
          api.get('/api/payments/influencer-summary')
        ]);
        
        const apps = appsRes.data.data || appsRes.data;
        const evts: CalEvent[] = [];
        
        apps.forEach((a: any) => {
          if (a.status === "accepted" || a.status === "revision") {
            const deadlineDate = a.campaign?.submission_deadline 
              ? new Date(a.campaign.submission_deadline) 
              : a.campaign?.application_deadline 
                ? new Date(a.campaign.application_deadline) 
                : null;
            if (deadlineDate) {
              evts.push({
                id: `deadline-${a.id}`,
                date: deadlineDate.toISOString().split('T')[0],
                title: `${a.campaign?.title} Deadline`,
                type: 'deadline',
                color: '#991B1B',
                brand: a.campaign?.brand_profile?.company_name || 'Brand'
              });
            }
          }
        });
        
        // Use in_escrow transactions as payment events
        const paymentsData = paymentsRes.data.data;
        const payments = (paymentsData?.transactions?.data || []).filter((p: any) => p.status === 'in_escrow');
        payments.forEach((p: any) => {
           const paymentDate = p.created_at ? new Date(p.created_at) : new Date();
           paymentDate.setDate(paymentDate.getDate() + 14); // Expected payment date 14 days later
           evts.push({
             id: `payment-${p.id}`,
             date: paymentDate.toISOString().split('T')[0],
             title: `Payment: ${p.amount} MAD`,
             type: 'payment',
             color: '#065F46',
             brand: 'Payment'
           });
        });
        
        setEvents(evts);
      } catch (err) {
        console.error("Failed to load calendar events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const weekStart = new Date(year, month, 1);
  const prevMonth = () => { if (month === 0) { setMonth(11); setYear((y) => y - 1); } else setMonth((m) => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear((y) => y + 1); } else setMonth((m) => m + 1); };

  const selectedDayEvents = selectedDay
    ? events.filter((e) => e.date === `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`)
    : [];

  const upcomingEvents = events
    .filter((e) => e.date >= `${year}-${String(month + 1).padStart(2, "0")}-01`)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  const eventTypeCounts = events.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] ?? 0) + 1; return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ padding: "1.75rem 1.5rem 3rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
            {isFr ? "Calendrier" : "Calendar"}
          </h1>
          <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            {isFr ? "Echeances, soumissions et dates de paiement" : "Campaign deadlines, submissions, and payment dates"}
          </p>
        </div>
        {/* View toggle */}
        <div style={{ display: "flex", gap: 0, background: "var(--muted)", borderRadius: "0.5rem", padding: "0.25rem" }}>
          {(["month", "week"] as const).map((v) => (
            <button key={v} onClick={() => setViewMode(v)}
              style={{ padding: "0.375rem 0.875rem", borderRadius: "0.375rem", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, background: viewMode === v ? "var(--card)" : "transparent", color: viewMode === v ? "var(--foreground)" : "var(--muted-foreground)", boxShadow: viewMode === v ? "0 1px 3px rgba(0,0,0,0.08)" : "none", transition: "all .15s", textTransform: "capitalize" }}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
        {Object.entries(EVENT_CONFIG).map(([key, cfg]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", padding: "0.175rem 0.5rem", borderRadius: 999, background: cfg.bg, color: cfg.color, fontFamily: f.b, fontSize: "0.7rem", fontWeight: 600 }}>
              {cfg.icon}{cfg.label}
            </span>
            <span style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>({eventTypeCounts[key] ?? 0})</span>
          </div>
        ))}
      </div>

      <div style={{ gap: "1.25rem", alignItems: "start" }} className="flex flex-col lg:grid lg:grid-cols-[1fr_280px]">

        {/* Calendar main */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.25rem" }}>
          {/* Month nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <button onClick={prevMonth} style={{ width: 32, height: 32, borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--muted)", border: "none", cursor: "pointer", color: "var(--muted-foreground)" }}>
              <ChevronLeft size={16} />
            </button>
            <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.0625rem", color: "var(--foreground)", letterSpacing: "-0.015em" }}>
              {MONTHS[month]} {year}
            </h2>
            <button onClick={nextMonth} style={{ width: 32, height: 32, borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--muted)", border: "none", cursor: "pointer", color: "var(--muted-foreground)" }}>
              <ChevronRight size={16} />
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "var(--muted-foreground)" }}>Loading calendar data...</div>
          ) : viewMode === "month"
            ? <MonthView year={year} month={month} selectedDay={selectedDay} onDayClick={setSelectedDay} events={events} />
            : <WeekView year={year} month={month} weekStart={weekStart} events={events} />
          }

          {/* Selected day events */}
          {selectedDay && selectedDayEvents.length > 0 && viewMode === "month" && (
            <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border)" }}>
              <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>
                {selectedDay} {MONTHS[month]}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {selectedDayEvents.map((ev) => {
                  const typeKey = ev.type as EventType;
                  const cfg = EVENT_CONFIG[typeKey] ?? { color: ev.color, bg: `${ev.color}18`, label: ev.type, icon: null };
                  return (
                    <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0.875rem", background: cfg.bg, border: `1px solid ${cfg.color}30`, borderRadius: "0.5rem" }}>
                      <span style={{ color: cfg.color }}>{cfg.icon}</span>
                      <span style={{ fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: cfg.color, flex: 1 }}>{ev.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: upcoming */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.125rem" }}>
            <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "1rem" }}>
              {isFr ? "A venir" : "Upcoming"}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {upcomingEvents.map((ev) => <EventRow key={ev.id} event={ev} />)}
            </div>
          </div>

          {/* Summary */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.125rem" }}>
            <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>
              {isFr ? "Ce mois" : "This month"}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { label: "Deadlines",    value: eventTypeCounts["deadline"] ?? 0,    color: "#EF4444" },
                { label: "Submissions",  value: eventTypeCounts["submission"] ?? 0,  color: "#7C3AED" },
                { label: "Payments",     value: eventTypeCounts["payment"] ?? 0,     color: "#10B981" },
                { label: "Publications", value: eventTypeCounts["publication"] ?? 0, color: "#2563EB" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
                    <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>{item.label}</span>
                  </div>
                  <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9375rem", color: "var(--foreground)" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
