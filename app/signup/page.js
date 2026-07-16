"use client";

import { useState } from "react";
import { signup } from "@/api/auth.api";
import Nav from '@/components/home/Nav';
import Footer from '@/components/home/Footer';

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      await signup(email, password);
      setSignupSuccess(true);
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

  if (signupSuccess) {
    return (
      <>
        <Nav />
        <main className="min-h-screen flex items-center justify-center bg-[var(--background)]">
          <div className="w-full max-w-sm border border-[var(--border)] rounded p-6 text-center">
            <h1 className="text-2xl font-semibold mb-4 text-primary">
              Check your email
            </h1>
            <p className="text-primary mb-4">
              We've sent a verification link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-primary/70 mb-6">
              Click the link in the email to verify your account and get started.
            </p>
            <a href="/login" className="text-[var(--primary)] hover:underline">
              Back to login
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="w-full max-w-sm border border-[var(--border)] rounded p-6">
          <h1 className="text-2xl font-semibold mb-6 text-center text-primary">
            Create account
          </h1>

          <form onSubmit={handleSignup} className="space-y-4">
      
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onClick={handleSignup}
              disabled={loading}
              type="submit"
              className="w-full bg-[var(--primary)] text-secondary py-2 rounded disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-primary">
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
