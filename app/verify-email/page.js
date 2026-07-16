import { Suspense } from "react";
import VerifyEmailClient from "./VerifyEmailClient";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="text-app/60">Loading verification...</div></div>}>
      <VerifyEmailClient />
    </Suspense>
  );
}
