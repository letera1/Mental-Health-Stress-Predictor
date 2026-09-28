import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { ThemeProvider } from "../providers/theme/ThemeProvider";

const Dashboard = lazy(() => import("../pages/dashboard/DashboardPage"));
const Predict = lazy(() => import("../pages/assessment/AssessmentPage"));
const About = lazy(() => import("../pages/about/AboutPage"));
const Resource = lazy(() => import("../pages/resources/ResourcesPage"));
const Settings = lazy(() => import("../pages/settings/SettingsPage"));

function RouteFallback() {
  return (
    <div className="animate-pulse">
      <div className="h-20 border-b border-line bg-surface" />
      <div className="space-y-4 p-4 sm:p-6 lg:p-8">
        <div className="h-28 rounded-xl bg-muted-surface" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-52 rounded-xl bg-muted-surface" />
          <div className="h-52 rounded-xl bg-muted-surface" />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex min-h-screen bg-canvas text-body">
          <Sidebar />
          <main className="min-w-0 flex-1 pt-14 lg:pt-0">
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/predict" element={<Predict />} />
                <Route path="/about" element={<About />} />
                <Route path="/resources" element={<Resource />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
