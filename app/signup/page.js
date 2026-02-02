"use client";

import { useState } from "react";
import { signup } from "@/api/auth.api";
import Nav from '@/components/home/Nav';
import Footer from '@/components/home/Footer';

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    setLoading(true);

    try {
      await signup(username, password);

      // success → go to login
      window.location.href = "/login";
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Signup failed");
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
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Create account
          </h1>

          <form onSubmit={handleSignup} className="space-y-4">
      
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
              onClick={handleSignup}
              disabled={loading}
              type="submit"
              className="w-full bg-[var(--primary)] text-white py-2 rounded disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-[var(--primary)]">
              Login
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
