"use client";

import { useState } from "react";
import Image from "next/image";
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
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 grid md:grid-cols-2 bg-[var(--background)] pt-16">
          <div className="hidden md:block relative">
            <Image
              src="/signup.png"
              alt="MiniDesk"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-sm text-center">
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
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 grid md:grid-cols-[3fr_2fr] bg-[var(--background)] pt-18 min-h-screen">
        {/* Left: image */}
        <div className="hidden md:block relative ">
          <Image
            src="/signup2.png"
            alt="MiniDesk"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right: form */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-semibold mb-2 text-primary">
              Sign up
            </h1>
            <p className="text-sm text-primary/60 mb-8">
              Welcome to MiniDesk. Create an account to get started.
            </p>

            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block text-sm text-primary/70 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[var(--border)] rounded-lg px-3 py-2.5 outline-none text-primary bg-[var(--background)] focus:border-primary/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-primary/70 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-[var(--border)] rounded-lg px-3 py-2.5 outline-none text-primary bg-[var(--background)] focus:border-primary/50 transition-colors"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">
                  {error}
                </p>
              )}

              <button
                onClick={handleSignup}
                disabled={loading}
                type="submit"
                className="w-full bg-[var(--primary)] text-secondary py-2.5 rounded-lg font-medium disabled:opacity-60 cursor-pointer hover:opacity-90 transition-opacity"
              >
                {loading ? "Creating account..." : "Sign up"}
              </button>
            </form>

            <p className="text-sm text-center mt-6 text-primary">
              Already have an account?{" "}
              <a href="/login" className="text-[var(--primary)] hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}