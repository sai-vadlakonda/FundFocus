import { createContext, useContext, useState } from "react";

/**
 * RoleContext
 * Handles role-based access for FocusFund
 * Roles: "child" | "parent"
 */

const RoleContext = createContext();

export function RoleProvider({ children }) {
  // Load role from localStorage (persist after refresh)
  const [role, setRole] = useState(
    localStorage.getItem("focusfund_role")
  );

  // Select role (Child / Parent)
  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("focusfund_role", selectedRole);
  };

  // Reset role (optional – useful for demo / switching)
  const resetRole = () => {
    setRole(null);
    localStorage.removeItem("focusfund_role");
  };

  return (
    <RoleContext.Provider value={{ role, selectRole, resetRole }}>
      {children}
    </RoleContext.Provider>
  );
}

// Custom hook for easy access
export function useRole() {
  return useContext(RoleContext);
}
