import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";
import { Loader2 } from "lucide-react";
import { Footer } from "../components/Footer";

interface Props {
  allowedRoles?: string[]; // Make optional for public routes
}
export default function MainLayout({ allowedRoles }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  // Protected layout variant
  if (allowedRoles) {
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    // (Optional) Role-based access check
    // const hasPermission = user.roles.some((role) =>
    //   allowedRoles.includes(role)
    // );
    // if (!hasPermission) {
    //   return <Navigate to="/unauthorized" replace />;
    // }
  }

  // Common layout (public + protected)
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-2">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
