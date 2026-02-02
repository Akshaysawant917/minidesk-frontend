"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // token payload decode (no library — simple MVP decode)
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );
      setUsername(payload.username || "");
    } catch {
      setUsername("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="max-w-2xl space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-1">
          Settings
        </h2>
        <p className="text-sm text-gray-500">
          Account & app preferences
        </p>
      </div>

      {/* Account Card */}
      <div className="border border-[var(--border)] rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-lg">
          Account
        </h3>

        <div>
          <label className="text-xs text-primary">
            Username
          </label>
          <div className="mt-1 px-3 py-2 border rounded text-sm ">
            {username || "—"}
          </div>
        </div>

        <p className="text-xs text-gray-500">
          Username login only (MVP mode).  
          Email & recovery will be added later.
        </p>
      </div>

      {/* App Info */}
      <div className="border border-[var(--border)] rounded-xl p-6 space-y-3">
        <h3 className="font-semibold text-lg">
          MiniDesk
        </h3>

        <InfoRow label="Version" value="MVP v1" />
        <InfoRow label="Mode" value="Local-first" />
        <InfoRow label="Auth" value="JWT (username)" />
      </div>

      {/* Danger Zone */}
      <div className="border border-red-200 rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-lg text-red-600">
          Danger Zone
        </h3>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700 cursor-pointer"
        >
          Logout
        </button>

        <p className="text-xs text-gray-500">
          This will remove your local session token.
        </p>
      </div>

    </div>
  );
}

/* ---------- helpers ---------- */

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
