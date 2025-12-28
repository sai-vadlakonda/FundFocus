import { useState } from "react";
import axios from "axios";

export default function Register({ goToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("child");
  const [parentCode, setParentCode] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setGeneratedCode("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username,
          password,
          role,
          parentCode: role === "child" ? parentCode : undefined,
        }
      );

      setSuccess("Registration successful!");

      // 👨‍👩‍👧 If parent, show generated code
      if (role === "parent" && res.data.parentCode) {
        setGeneratedCode(res.data.parentCode);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>📝 Register to FocusFund</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* ROLE SELECTION */}
          <div style={{ margin: "10px 0" }}>
            <label>
              <input
                type="radio"
                checked={role === "child"}
                onChange={() => setRole("child")}
              />{" "}
              👶 Child
            </label>

            <label style={{ marginLeft: 20 }}>
              <input
                type="radio"
                checked={role === "parent"}
                onChange={() => setRole("parent")}
              />{" "}
              👨‍👩‍👧 Parent
            </label>
          </div>

          {/* PARENT CODE INPUT (ONLY FOR CHILD) */}
          {role === "child" && (
            <input
              placeholder="Enter Parent Code"
              value={parentCode}
              onChange={(e) => setParentCode(e.target.value)}
              required
            />
          )}

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <button className="btn btn-green" type="submit">
            Register
          </button>
        </form>

        {/* SHOW GENERATED PARENT CODE */}
        {generatedCode && (
          <div className="card" style={{ marginTop: 15 }}>
            <h3>🔑 Parent Code</h3>
            <p>
              Share this code with your child:
              <br />
              <strong>{generatedCode}</strong>
            </p>
          </div>
        )}

        <p style={{ marginTop: 12 }}>
          Already have an account?{" "}
          <span className="link" onClick={goToLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
