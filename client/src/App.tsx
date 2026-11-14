import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SiteLayout } from "./components/layout/SiteLayout";
import { AuthProvider } from "./context/AuthContext";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Quote = lazy(() => import("./pages/Quote"));
const Careers = lazy(() => import("./pages/Careers"));
const Legal = lazy(() => import("./pages/Legal"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

function PageLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-paper">
      <div className="text-center">
        <span className="mx-auto block size-10 animate-spin rounded-full border-2 border-ink/15 border-t-gold" />
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-steel">
          MN Consulting Engineering
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="a-propos" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="realisations" element={<Projects />} />
              <Route path="realisations/:slug" element={<ProjectDetail />} />
              <Route path="contact" element={<Contact />} />
              <Route path="devis" element={<Quote />} />
              <Route path="carrieres" element={<Careers />} />
              <Route path="mentions-legales" element={<Legal />} />
              <Route path="politique-confidentialite" element={<Privacy />} />
              <Route path="plan-du-site" element={<Sitemap />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
