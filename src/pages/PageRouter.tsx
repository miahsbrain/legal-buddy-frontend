import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import MainLayout from "./MainLayout";
import LoginPage from "../routes/Login";
import SignupPage from "../routes/Signup";
import DashboardPage from "../routes/Dashboard";
import PricingPage from "../routes/Pricing";
import UploadPage from "../routes/Upload";
import SummaryPage from "../routes/Summary";
import LandingPage from "../routes/Landing";
import DemoPage from "../routes/Demo";
import { AboutPage } from "../routes/About";

export default function PageRouter() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Protected Routes */}
          <Route element={<MainLayout allowedRoles={["user"]} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/summary/:id" element={<SummaryPage />} />
          </Route>

          {/* Public Routes */}
          <Route element={<MainLayout />}>
            {" "}
            {/* No allowedRoles */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
