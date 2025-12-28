import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login({ goToRegister }) {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card glass">
        <div className="auth-header">
          <h2>🔐 Login to <span>FocusFund</span></h2>
          <p>Track habits. Earn focus. Spend wisely.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>

        <p className="auth-footer">
          New here?{" "}
          <span className="auth-link" onClick={goToRegister}>
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}
