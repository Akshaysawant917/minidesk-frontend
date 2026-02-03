"use client";

import { useState, useEffect } from "react";
import { login } from "@/api/auth.api";
import Nav from '@/components/home/Nav';
import Footer from '@/components/home/Footer';
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
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
      router.replace("/dashboard");
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
    <>
      <Nav />
      <main className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="w-full max-w-sm border border-[var(--border)] rounded p-6">
          <h1 className="text-2xl font-semibold mb-6 text-center text-primary">
            Login to MiniDesk
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-[var(--border)] rounded px-3 py-2 outline-none text-primary"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[var(--border)] rounded px-3 py-2 outline-none text-primary"
            />

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              onClick={handleLogin}
               type="submit"  
              disabled={loading}
              className="w-full bg-[var(--primary)] text-secondary py-2 rounded disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-sm text-center mt-4 text-primary">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[var(--primary)]">
              Sign up
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
