import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { TokenProvider } from "./context/TokenContext";
import { ThemeProvider } from "./context/ThemeContext";

import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <TokenProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />
        </TokenProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
