"use client";

import { useState } from "react";
import { login } from "@/api/auth.api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    setLoading(true);

    try {
      const data = await login(username, password);

      // store JWT
      localStorage.setItem("token", data.token);

      // redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="w-full max-w-sm border border-[var(--border)] rounded p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Login to MiniDesk
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-[var(--border)] rounded px-3 py-2 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[var(--border)] rounded px-3 py-2 outline-none"
          />

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white py-2 rounded disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[var(--primary)]">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
