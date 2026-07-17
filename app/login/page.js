"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { login } from "@/api/auth.api";
import Nav from '@/components/home/Nav';
import Footer from '@/components/home/Footer';
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
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

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const data = await login(email, password);

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
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 grid md:grid-cols-[3fr_2fr] bg-[var(--background)] pt-18 min-h-screen">
        {/* Left: image */}
        <div className="hidden md:block relative">
          <Image
            src="/signup.png"
            alt="MiniDesk"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right: form */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-semibold mb-2 text-primary">
              Login to MiniDesk
            </h1>
            <p className="text-sm text-primary/60 mb-8">
              Welcome back. Enter your details to continue.
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
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
                onClick={handleLogin}
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--primary)] text-secondary py-2.5 rounded-lg font-medium disabled:opacity-60 cursor-pointer hover:opacity-90 transition-opacity"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-sm text-center mt-6 text-primary">
              Don&rsquo;t have an account?{" "}
              <a href="/signup" className="text-[var(--primary)] hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}