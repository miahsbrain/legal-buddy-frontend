import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Navbar at the top */}
      <Navbar />
      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Optional footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
