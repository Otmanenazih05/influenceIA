import { createBrowserRouter } from "react-router";
import { MobileShowcasePage } from "./pages/MobileShowcasePage";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { ForInfluencersPage } from "./pages/ForInfluencersPage";
import { ForBrandsPage } from "./pages/ForBrandsPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgotPasswordPage, TermsPage, PrivacyPage } from "./pages/InfoPages";
// ─── Influencer dashboard ───
import { DashboardShell } from "./pages/dashboard/DashboardShell";
import { OverviewPage } from "./pages/dashboard/OverviewPage";
import { CampaignsPage } from "./pages/dashboard/CampaignsPage";
import { ApplicationsPage } from "./pages/dashboard/ApplicationsPage";
import { MarketplacePage } from "./pages/dashboard/MarketplacePage";
import { EarningsPage } from "./pages/dashboard/EarningsPage";
import { CalendarPage } from "./pages/dashboard/CalendarPage";
import { CoachPage } from "./pages/dashboard/CoachPage";
import { ProfilePage } from "./pages/dashboard/ProfilePage";
import { MessagingPage } from "./pages/dashboard/MessagingPage";
import { SettingsPage } from "./pages/dashboard/SettingsPage";
// ─── Brand dashboard ───
import { BrandShell } from "./pages/brand/BrandShell";
import { BrandOverviewPage } from "./pages/brand/BrandOverviewPage";
import { CampaignsListPage } from "./pages/brand/CampaignsListPage";
import { CreateCampaignPage } from "./pages/brand/CreateCampaignPage";
import { CampaignDetailPage } from "./pages/brand/CampaignDetailPage";
import { CreatorsPage } from "./pages/brand/CreatorsPage";
import { BrandPaymentsPage } from "./pages/brand/BrandPaymentsPage";
import { BrandMessagingPage } from "./pages/brand/BrandMessagingPage";
import { BrandSettingsPage } from "./pages/brand/BrandSettingsPage";
import { BrandAnalyticsPage } from "./pages/brand/BrandAnalyticsPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true,       Component: HomePage },
      { path: "influencers", Component: ForInfluencersPage },
      { path: "brands",      Component: ForBrandsPage },
      { path: "contact",     Component: ContactPage },
      { path: "terms",       Component: TermsPage },
      { path: "privacy",     Component: PrivacyPage },
      { path: "*",           Component: NotFoundPage },
    ],
  },
  { path: "/mobile",   Component: MobileShowcasePage },
  { path: "/login",    Component: LoginPage },
  { path: "/register", Component: RegisterPage },
  { path: "/forgot-password", Component: ForgotPasswordPage },
  {
    path: "/dashboard",
    Component: () => (
      <ProtectedRoute allowedRoles={['influencer']}>
        <DashboardShell />
      </ProtectedRoute>
    ),
    children: [
      { index: true,          Component: OverviewPage },
      { path: "campaigns",    Component: CampaignsPage },
      { path: "applications", Component: ApplicationsPage },
      { path: "marketplace",  Component: MarketplacePage },
      { path: "earnings",     Component: EarningsPage },
      { path: "calendar",     Component: CalendarPage },
      { path: "coach",        Component: CoachPage },
      { path: "profile",      Component: ProfilePage },
      { path: "messaging",    Component: MessagingPage },
      { path: "settings",     Component: SettingsPage },
    ],
  },
  {
    path: "/brand",
    Component: () => (
      <ProtectedRoute allowedRoles={['brand']}>
        <BrandShell />
      </ProtectedRoute>
    ),
    children: [
      { index: true,              Component: BrandOverviewPage },
      { path: "campaigns",        Component: CampaignsListPage },
      { path: "campaigns/new",    Component: CreateCampaignPage },
      { path: "campaigns/:id",    Component: CampaignDetailPage },
      { path: "creators",         Component: CreatorsPage },
      { path: "payments",         Component: BrandPaymentsPage },
      { path: "messaging",        Component: BrandMessagingPage },
      { path: "settings",         Component: BrandSettingsPage },
      { path: "analytics",        Component: BrandAnalyticsPage },
    ],
  },
]);
