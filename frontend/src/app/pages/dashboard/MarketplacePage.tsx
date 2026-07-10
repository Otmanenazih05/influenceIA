import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Search, Package, X,
  ChevronDown, ArrowRight, ShoppingBag, Clock,
} from "lucide-react";
import { ProductDrawer } from "../../components/dashboard/ProductDrawer";
import { TiktokIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "../../components/ui/SocialIcons";
import api from "../../../lib/api";
import { useEffect } from "react";

export interface MarketplaceProduct {
  id: string;
  brand: string;
  brandColor: string;
  brandLocation: string;
  name: string;
  category: string;
  description: string;
  platforms: string[];
  giftValue: number;
  contentRequired: string[];
  availability: string;
  spotsLeft: number;
  spotsTotal: number;
  imageGradient: string[];
  turnaround: string;
  whatYouGet: string[];
  requirements: string[];
  applications: number;
  applied?: boolean;
}

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

/* ─── Availability badge ─── */
function AvailBadge({ availability, spotsLeft }: { availability: string; spotsLeft?: number }) {
  const map = {
    available: { text: "Available", color: "#065F46", bg: "#D1FAE5" },
    limited: { text: spotsLeft !== undefined ? `${spotsLeft} spots left` : "Limited", color: "#92400E", bg: "#FEF3C7" },
    full: { text: "Fully booked", color: "#991B1B", bg: "#FEE2E2" },
  } as Record<string, { text: string; color: string; bg: string }>;
  const s = map[availability] ?? map.available;
  return (
    <span style={{ padding: "0.2rem 0.5rem", borderRadius: 999, background: s.bg, color: s.color, fontFamily: f.b, fontSize: "0.68rem", fontWeight: 600, display: "inline-block" }}>
      {s.text}
    </span>
  );
}

/* ─── Platform pip ─── */
function PlatformPip({ p }: { p: string }) {
  const map: Record<string, { color: string; icon: React.ReactNode }> = {
    instagram: { color: "#E1306C", icon: <InstagramIcon size={11} /> },
    tiktok: { color: "#010101", icon: <TiktokIcon size={11} /> },
    youtube: { color: "#FF0000", icon: <YoutubeIcon size={11} /> },
    facebook: { color: "#1877F2", icon: <FacebookIcon size={11} /> },
  };
  const m = map[p];
  if (!m) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: "0.375rem", background: `${m.color}15`, color: m.color }}>
      {m.icon}
    </span>
  );
}

/* ─── Product card ─── */
function ProductCard({
  product,
  onOpen,
}: {
  product: MarketplaceProduct;
  onOpen: (p: MarketplaceProduct) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onOpen(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--card)",
        border: `1px solid ${hovered ? "rgba(37,99,235,0.2)" : "var(--border)"}`,
        borderRadius: "0.875rem",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all .15s",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.09)" : "var(--shadow-xs)",
        transform: hovered ? "translateY(-2px)" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Product image */}
      <div
        style={{
          height: 140,
          background: `linear-gradient(135deg, ${product.imageGradient[0]}, ${product.imageGradient[1]})`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
        <div style={{ width: 48, height: 48, borderRadius: "0.875rem", background: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
          <Package size={22} style={{ color: product.brandColor }} />
        </div>
        {/* Availability overlay */}
        {product.availability === "full" && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.8125rem", color: "#fff", background: "rgba(0,0,0,0.6)", padding: "0.375rem 0.75rem", borderRadius: 999 }}>
              Fully booked
            </span>
          </div>
        )}
        {product.availability === "limited" && (
          <div style={{ position: "absolute", top: 8, right: 8 }}>
            <span style={{ fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700, color: "#92400E", background: "#FEF3C7", padding: "0.2rem 0.5rem", borderRadius: 999 }}>
              {product.spotsLeft} left
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "0.875rem 1rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {/* Brand + category */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600, color: product.brandColor }}>{product.brand}</p>
          <span style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>{product.category}</span>
        </div>

        {/* Product name */}
        <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", lineHeight: 1.35 }}>
          {product.name}
        </p>

        {/* Description */}
        <p style={{ fontFamily: f.b, fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {product.description}
        </p>

        {/* Content expected */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.375rem", marginTop: 2 }}>
          <span style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)", lineHeight: 1.5, flex: 1, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {product.contentRequired[0]}
          </span>
        </div>
      </div>

      {/* Card footer */}
      <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {product.platforms.slice(0, 3).map((p) => <PlatformPip key={p} p={p} />)}
          <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>
            {product.giftValue} <span style={{ fontWeight: 400, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>MAD</span>
          </span>
        </div>
        <AvailBadge availability={product.availability} spotsLeft={product.spotsLeft} />
      </div>
    </div>
  );
}

/* ─── Filter pill ─── */
function FilterPill({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isActive = value !== "";
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.4375rem 0.875rem", borderRadius: "2rem", border: `1.5px solid ${isActive ? "var(--primary)" : "var(--border)"}`, background: isActive ? "#EFF6FF" : "var(--card)", color: isActive ? "var(--primary)" : "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: isActive ? 500 : 400, whiteSpace: "nowrap" }}
      >
        {isActive ? value : label}
        {isActive
          ? <button onClick={(e) => { e.stopPropagation(); onChange(""); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "var(--primary)" }}><X size={12} /></button>
          : <ChevronDown size={13} style={{ opacity: 0.5 }} />
        }
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 20 }} />
          <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 30, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.625rem", padding: "0.375rem", minWidth: 180, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
            {options.map((opt) => (
              <button key={opt} onClick={() => { onChange(opt === value ? "" : opt); setOpen(false); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "0.5rem 0.75rem", borderRadius: "0.375rem", background: opt === value ? "var(--secondary)" : "none", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", color: opt === value ? "var(--secondary-foreground)" : "var(--foreground)", fontWeight: opt === value ? 500 : 400 }}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Empty state ─── */
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div style={{ textAlign: "center", padding: "5rem 2rem", gridColumn: "1 / -1" }}>
      <div style={{ width: 64, height: 64, borderRadius: "1.25rem", background: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
        <ShoppingBag size={28} style={{ color: "var(--muted-foreground)" }} />
      </div>
      <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.0625rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>
        No products found
      </p>
      <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.65, maxWidth: "32ch", margin: "0 auto 1.25rem" }}>
        Try different filters or check back later for new product opportunities.
      </p>
      <button
        onClick={onReset}
        style={{ padding: "0.5625rem 1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem" }}
      >
        Clear filters
      </button>
    </div>
  );
}

const REALISTIC_PRODUCTS: MarketplaceProduct[] = [
  {
    id: "static1",
    brand: "GlowLab Morocco",
    brandColor: "#BE185D",
    brandLocation: "Casablanca, MA",
    name: "Vitamin C Brightening Serum",
    category: "Beauty",
    description: "Our best-selling 15% Vitamin C Brightening Serum. Packaged in light-shielding amber glass to preserve potency. Brightens skin tone, reduces hyperpigmentation, and boosts collagen production.",
    platforms: ["instagram"],
    giftValue: 350,
    contentRequired: ["1 Instagram Reel showcasing morning application routine", "2 Stories highlighting texture and 7-day skin results"],
    availability: "available",
    spotsLeft: 8,
    spotsTotal: 12,
    imageGradient: ["#FDF2F8", "#FCE7F3"],
    turnaround: "10 days",
    whatYouGet: ["Full size Vitamin C Serum (30ml)", "GlowLab signature organic cotton canvas pouch", "Exclusive 15% discount code for your followers"],
    requirements: ["Minimum 5k followers on Instagram", "Active skincare or beauty content niche", "Must be located in Morocco"],
    applications: 14
  },
  {
    id: "static2",
    brand: "AtlasBrand",
    brandColor: "#1E3A8A",
    brandLocation: "Rabat, MA",
    name: "SS24 Premium Linen Outfit Set",
    category: "Fashion",
    description: "Premium unisex linen shirt and trousers set. Ethically crafted from organic French flax. Light, breathable, and designed with a relaxed modern fit perfect for Moroccan summer styling.",
    platforms: ["instagram", "tiktok"],
    giftValue: 850,
    contentRequired: ["1 Outfit styling Reel or TikTok styling lookbook video", "1 High-quality Instagram feed photo post in sunny lighting"],
    availability: "limited",
    spotsLeft: 2,
    spotsTotal: 5,
    imageGradient: ["#EFF6FF", "#DBEAFE"],
    turnaround: "14 days",
    whatYouGet: ["1 Organic Linen Shirt (size & color of choice)", "1 Matching Linen Trousers", "VIP early-access code for the AW24 collection drop"],
    requirements: ["Minimum 10k followers", "Strong fashion lookbook aesthetic", "Morocco or France location"],
    applications: 28
  },
  {
    id: "static3",
    brand: "NovaBio",
    brandColor: "#065F46",
    brandLocation: "Marrakech, MA",
    name: "Organic Plant-Based Protein Powder",
    category: "Wellness",
    description: "Premium vegan protein blend formulated with raw superfoods, maca root, and pea protein. Smooth texture, gourmet vanilla bean flavor, and 100% organic with zero artificial sweeteners.",
    platforms: ["instagram"],
    giftValue: 420,
    contentRequired: ["1 Reel featuring a healthy breakfast smoothie recipe tutorial", "1 Story sharing your post-workout recovery shake routine"],
    availability: "available",
    spotsLeft: 6,
    spotsTotal: 10,
    imageGradient: ["#E6F4EA", "#CEEAD6"],
    turnaround: "12 days",
    whatYouGet: ["1kg Vegan Protein Tub (Vanilla)", "NovaBio eco-friendly shaker bottle", "Print recipe book containing superfood breakfast ideas"],
    requirements: ["Minimum 3k followers on Instagram", "Active post frequency in fitness, nutrition, or wellness", "Enthusiastic daily advocate of a healthy lifestyle"],
    applications: 9
  },
  {
    id: "static4",
    brand: "VertMaroc",
    brandColor: "#0F766E",
    brandLocation: "Agadir, MA",
    name: "HydroGlow Rosewater Face Mask",
    category: "Beauty",
    description: "Intense hydration cooling gel mask formulated with organic Moroccan rosewater, aloe extract, and hyaluronic acid. Calms redness and provides instant plumpness.",
    platforms: ["instagram", "tiktok"],
    giftValue: 290,
    contentRequired: ["1 TikTok first-impressions unboxing and texture application", "1 Instagram Story showing skin glow before and after washing off"],
    availability: "available",
    spotsLeft: 12,
    spotsTotal: 15,
    imageGradient: ["#F0FDFA", "#CCFBF1"],
    turnaround: "7 days",
    whatYouGet: ["3 HydroGlow Face Mask Tubs (50ml each)", "Rose quartz facial roller application tool"],
    requirements: ["Aesthetic and clean product styling", "Comfortable posting high-res close-up face videos", "Located in Morocco or France"],
    applications: 5
  },
  {
    id: "static5",
    brand: "Marrakesh Craft",
    brandColor: "#B45309",
    brandLocation: "Marrakech, MA",
    name: "Urban Nomad Leather Backpack",
    category: "Fashion",
    description: "Handcrafted camel leather backpack featuring a built-in padded laptop sleeve and solid brass hardware. Blends traditional Moroccan leathercraft with modern urban utility.",
    platforms: ["instagram", "youtube"],
    giftValue: 1200,
    contentRequired: ["1 Travel/lifestyle Reels integration (unboxing + pack test)", "1 Instagram Story demonstrating laptop fit and zipper compartments"],
    availability: "limited",
    spotsLeft: 1,
    spotsTotal: 3,
    imageGradient: ["#FEF3C7", "#FDE68A"],
    turnaround: "20 days",
    whatYouGet: ["1 Handcrafted Leather Backpack in Tan", "Custom embossed monogram luggage tag with your initials"],
    requirements: ["Minimum 15k followers", "Travel, outdoor lifestyle, or daily vlogger", "High-quality video shooting capacity"],
    applications: 32
  },
  {
    id: "static6",
    brand: "TechMa",
    brandColor: "#1F2937",
    brandLocation: "Casablanca, MA",
    name: "SmartFit Noise-Cancelling Earbuds v2",
    category: "Tech",
    description: "Sweatproof active wireless earbuds featuring hybrid active noise cancellation (ANC), custom ambient mode, 30-hour battery life, and secure ear hook locks.",
    platforms: ["tiktok"],
    giftValue: 650,
    contentRequired: ["1 TikTok review video including sound check and workout durability test"],
    availability: "available",
    spotsLeft: 4,
    spotsTotal: 8,
    imageGradient: ["#F3F4F6", "#E5E7EB"],
    turnaround: "10 days",
    whatYouGet: ["SmartFit Earbuds v2 (Carbon Black)", "Custom silicone protective case hook", "USB-C fast charging lanyard"],
    requirements: ["Running, fitness, or tech gadget review niche", "Must post at least 3 videos/week on TikTok"],
    applications: 19
  },
  {
    id: "static7",
    brand: "Moroccan Gold",
    brandColor: "#D97706",
    brandLocation: "Essaouira, MA",
    name: "PureArgan Restorative Hair Oil",
    category: "Beauty",
    description: "100% pure cold-pressed organic argan oil infused with rosemary and lavender essential oils. Deeply restores dry hair, stimulates growth, and adds a brilliant shine.",
    platforms: ["instagram"],
    giftValue: 240,
    contentRequired: ["1 Instagram Reel showing hair oiling routine", "1 Story detailing texture and scent profile"],
    availability: "available",
    spotsLeft: 15,
    spotsTotal: 20,
    imageGradient: ["#FFFDF5", "#FEF3C7"],
    turnaround: "8 days",
    whatYouGet: ["1 bottle of PureArgan Hair Oil (100ml)", "Wood wide-tooth detangling comb"],
    requirements: ["Minimum 4k followers on Instagram", "Haircare or beauty content focus", "Based in Morocco"],
    applications: 8
  },
  {
    id: "static8",
    brand: "Café du Sud",
    brandColor: "#78350F",
    brandLocation: "Ouarzazate, MA",
    name: "Nomad Travel Coffee Press",
    category: "Food & Drink",
    description: "Double-walled vacuum insulated travel French press. Keeps your coffee piping hot while traveling through the Atlas mountains or on your daily commute.",
    platforms: ["instagram", "tiktok"],
    giftValue: 490,
    contentRequired: ["1 lifestyle brewing tutorial video (Reels or TikTok)", "2 high-quality aesthetic travel photos"],
    availability: "available",
    spotsLeft: 5,
    spotsTotal: 8,
    imageGradient: ["#FDF6F0", "#F5EBE6"],
    turnaround: "12 days",
    whatYouGet: ["1 Nomad Travel Coffee Press (Matte Black)", "250g bag of fresh medium-roast Atlas blend coffee beans"],
    requirements: ["Travel, coffee culture, or daily lifestyle creator", "Morocco or France location"],
    applications: 11
  },
  {
    id: "static9",
    brand: "AtlasBrand Sport",
    brandColor: "#059669",
    brandLocation: "Rabat, MA",
    name: "Atlas Active Wear Compression Set",
    category: "Sport",
    description: "High-performance seamless compression top and high-waist leggings set. Moisture-wicking recycled fabric designed for heavy workouts or outdoor running.",
    platforms: ["instagram"],
    giftValue: 790,
    contentRequired: ["1 workout Reel showing the set in motion", "1 Story sharing fit and comfort review"],
    availability: "limited",
    spotsLeft: 3,
    spotsTotal: 6,
    imageGradient: ["#ECFDF5", "#D1FAE5"],
    turnaround: "14 days",
    whatYouGet: ["1 Atlas Active Wear Top", "1 Matching Compression Leggings", "Custom brand gym towel"],
    requirements: ["Minimum 8k followers", "Fitness, yoga, or running niche", "Active lifestyle focus"],
    applications: 21
  },
  {
    id: "static10",
    brand: "Casa Home",
    brandColor: "#E11D48",
    brandLocation: "Casablanca, MA",
    name: "Aromatic Soy Candle Duo",
    category: "Home",
    description: "Hand-poured soy wax candles in ceramic vessels. Infused with cedarwood, amber, and orange blossom essential oils. Clean burn for up to 45 hours.",
    platforms: ["instagram"],
    giftValue: 380,
    contentRequired: ["1 cozy home styling Reel / vlog inclusion", "1 Story showing the candles lit in your space"],
    availability: "available",
    spotsLeft: 9,
    spotsTotal: 10,
    imageGradient: ["#FFF5F5", "#FED7D7"],
    turnaround: "10 days",
    whatYouGet: ["1 Cedarwood & Amber Soy Candle", "1 Orange Blossom Soy Candle", "Box of long safety matches"],
    requirements: ["Home decor, aesthetic vlogs, or lifestyle creator", "Warm cozy visual style"],
    applications: 4
  },
  {
    id: "static11",
    brand: "GlowLab Morocco",
    brandColor: "#BE185D",
    brandLocation: "Casablanca, MA",
    name: "Hydrating Lip Balm Set",
    category: "Beauty",
    description: "A trio of ultra-hydrating lip balms enriched with organic shea butter and Moroccan honey. Includes Mint, Coconut, and Berry flavors.",
    platforms: ["instagram", "tiktok"],
    giftValue: 180,
    contentRequired: ["1 TikTok showing application and hydration test", "1 Story sharing swatches"],
    availability: "available",
    spotsLeft: 18,
    spotsTotal: 20,
    imageGradient: ["#FDF2F8", "#FBCFE8"],
    turnaround: "5 days",
    whatYouGet: ["3-piece GlowLab Lip Balm Set", "GlowLab lip scrub applicator tool"],
    requirements: ["Active posting frequency", "Aesthetic lip swatch or makeup focus"],
    applications: 6
  },
  {
    id: "static12",
    brand: "TechMa",
    brandColor: "#1F2937",
    brandLocation: "Casablanca, MA",
    name: "SmartHome LED Ambient Strip",
    category: "Tech",
    description: "Smart app-controlled RGB LED strip lights. Synergizes with music, features custom presets, and upgrades your desk or room setup aesthetics instantly.",
    platforms: ["tiktok"],
    giftValue: 320,
    contentRequired: ["1 setup transformation TikTok (before/after room upgrade)"],
    availability: "full",
    spotsLeft: 0,
    spotsTotal: 10,
    imageGradient: ["#F5F3FF", "#EDE9FE"],
    turnaround: "7 days",
    whatYouGet: ["5-meter Smart LED Strip", "Power adapter & remote control"],
    requirements: ["Gaming, desk setup, or tech decor creator", "Minimum 5k followers on TikTok"],
    applications: 17
  }
];

/* ─── Main page ─── */
export function MarketplacePage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(REALISTIC_PRODUCTS);
    setLoading(false);
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (categoryFilter) list = list.filter((p) => p.category === categoryFilter);
    if (platformFilter) list = list.filter((p) => p.platforms.includes(platformFilter.toLowerCase() as any));
    if (availabilityFilter) {
      if (availabilityFilter === "Available") list = list.filter((p) => p.availability === "available");
      if (availabilityFilter === "Limited") list = list.filter((p) => p.availability === "limited");
      if (availabilityFilter === "Full") list = list.filter((p) => p.availability === "full");
    }

    return list;
  }, [products, search, categoryFilter, platformFilter, availabilityFilter]);

  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setPlatformFilter("");
    setAvailabilityFilter("");
  };

  const availableCount = products.filter((p) => p.availability !== "full").length;
  const activeFilterCount = [categoryFilter, platformFilter, availabilityFilter].filter(Boolean).length;

  return (
    <div style={{ padding: "1.75rem 1.5rem 3rem" }}>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
            {isFr ? "Marketplace" : "Marketplace"}
          </h1>
          <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            {isFr
              ? "Collaborations offerte & troc - recevez des produits en echange de contenu authentique"
              : "Gifted & barter collaborations \u2014 receive products in exchange for authentic content"}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <div style={{ padding: "0.375rem 0.875rem", borderRadius: "2rem", background: "#D1FAE5", color: "#065F46", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
            {availableCount} {isFr ? "produits disponibles" : "products available"}
          </div>
        </div>
      </div>

      {/* Intro callout */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.06), rgba(37,99,235,0.04))",
          border: "1px solid rgba(124,58,237,0.15)",
          borderRadius: "0.875rem",
          padding: "1rem 1.25rem",
          display: "flex", alignItems: "flex-start", gap: "0.875rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ width: 36, height: 36, borderRadius: "0.625rem", background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ShoppingBag size={17} style={{ color: "#7C3AED" }} />
        </div>
        <div>
          <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9rem", color: "var(--foreground)", marginBottom: "0.25rem" }}>
            {isFr ? "Comment fonctionne le Marketplace" : "How Marketplace works"}
          </p>
          <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>
            {isFr
              ? "Les marques offrent des produits en echange de contenu authentique. Pas d'argent - vous recevez le produit, le testez, et creez du contenu. Les places sont limitees, postulez tot."
              : "Brands offer products in exchange for honest content. No money changes hands \u2014 you receive the product, test it, and create content. Availability is limited, so apply early."}
          </p>
        </div>
      </div>

      {/* Search + filters */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.875rem", flexWrap: "wrap", alignItems: "center" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 240px", maxWidth: 360 }}>
          <Search size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
          <input
            type="search"
            placeholder="Search products, brands…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", height: "2.375rem", paddingLeft: "2.25rem", paddingRight: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
            onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
            onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <FilterPill label="Category" options={["Beauty", "Fashion", "Wellness", "Food & Drink", "Tech", "Home", "Sport"]} value={categoryFilter} onChange={setCategoryFilter} />
          <FilterPill label="Platform" options={["Instagram", "TikTok", "YouTube"]} value={platformFilter} onChange={setPlatformFilter} />
          <FilterPill label="Availability" options={["Available", "Limited", "Full"]} value={availabilityFilter} onChange={setAvailabilityFilter} />
          {activeFilterCount > 0 && (
            <button onClick={resetFilters} style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.4375rem 0.75rem", borderRadius: "2rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem" }}>
              <X size={13} /> Clear {activeFilterCount}
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", marginBottom: "1.25rem" }}>
        {filtered.length} {isFr ? `produit${filtered.length !== 1 ? "s" : ""} trouve${filtered.length !== 1 ? "s" : ""}` : `product${filtered.length !== 1 ? "s" : ""} found`}
      </p>

      {/* Product grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1rem",
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "var(--muted-foreground)", gridColumn: "1 / -1" }}>Loading products...</div>
        ) : filtered.length > 0 ? (
          filtered.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={setSelectedProduct} />
          ))
        ) : (
          <EmptyState onReset={resetFilters} />
        )}
      </div>

      {/* Product drawer */}
      <ProductDrawer
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
