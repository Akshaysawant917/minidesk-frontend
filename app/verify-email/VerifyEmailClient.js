"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmail } from "@/api/auth.api";
import Nav from '@/components/home/Nav';
import Footer from '@/components/home/Footer';

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("No verification token found. Please check your email link.");
        return;
      }

      try {
        await verifyEmail(token);
        setStatus("success");
        setMessage("Email verified successfully! Redirecting to login...");

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (err) {
        setStatus("error");
        if (err.response?.data?.error) {
          setMessage(err.response.data.error);
        } else {
          setMessage("Email verification failed. The link may have expired.");
        }
      }
    };

    verify();
  }, [token, router]);

  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="w-full max-w-sm border border-[var(--border)] rounded p-6 text-center">
          {status === "loading" && (
            <>
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <h1 className="text-2xl font-semibold text-primary mb-2">
                Verifying email...
              </h1>
              <p className="text-primary/70">Please wait while we verify your email address.</p>
            </>
          )}

          {status === "success" && (
            <>
              <h1 className="text-2xl font-semibold text-primary mb-4">
                ✓ Email verified!
              </h1>
              <p className="text-primary mb-6">
                {message}
              </p>
              <p className="text-sm text-primary/70">
                Redirecting to login...
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <h1 className="text-2xl font-semibold text-red-500 mb-4">
                Verification failed
              </h1>
              <p className="text-primary mb-6">
                {message}
              </p>
              <div className="space-y-2">
                <a href="/signup" className="block text-[var(--primary)] hover:underline">
                  Try signing up again
                </a>
                <a href="/login" className="block text-[var(--primary)] hover:underline">
                  Back to login
                </a>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
