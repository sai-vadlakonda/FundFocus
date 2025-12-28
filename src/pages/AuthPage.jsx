import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // login | register

  return (
    <>
      {mode === "login" ? (
        <Login goToRegister={() => setMode("register")} />
      ) : (
        <Register goToLogin={() => setMode("login")} />
      )}
    </>
  );
}
