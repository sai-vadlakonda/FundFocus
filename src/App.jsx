import { AuthProvider, useAuth } from "./context/AuthContext";
import { TokenProvider } from "./context/TokenContext";

import AuthPage from "./pages/AuthPage";
import ChildView from "./pages/ChildView";
import ParentView from "./pages/ParentView";

import { Toaster } from "react-hot-toast"; // ✅ ADD THIS

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) return <AuthPage />;

  return user.role === "child" ? <ChildView /> : <ParentView />;
}

export default function App() {
  return (
    <AuthProvider>
      <TokenProvider>

        {/* ✅ REQUIRED FOR TOASTS */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "12px",
              fontWeight: "600",
            },
          }}
        />

        <AppContent />
      </TokenProvider>
    </AuthProvider>
  );
}
