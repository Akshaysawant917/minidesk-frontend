import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 leading-tight">
          Your day, your way.
          <br />
          <span className="text-app/60">No pressure.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-app/70 mb-10 max-w-xl mx-auto leading-relaxed">
          Notes, todos, job hunt, commands, bookmarks, and worklogs — one calm
          dashboard, zero productivity guilt.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-secondary rounded-lg text-lg font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            Start Using MiniDesk
          </Link>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-app/50 text-sm mb-16">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span>No team bloat</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Private & secure</span>
          </div>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="relative w-full max-w-5xl">
        {/* Ambient blurred glow behind the card */}
        <div className="absolute -inset-x-10 -inset-y-10 -z-10">
          <div className="w-full h-full bg-gradient-to-tr from-gray-300/40 via-gray-200/30 to-transparent blur-3xl rounded-full"></div>
        </div>

        <div className="rounded-2xl bg-gray-100 p-3 md:p-4 shadow-2xl ring-1 ring-gray-200">
          <div className="rounded-xl overflow-hidden ring-1 ring-black/5">
            {/* Screenshot */}
            <Image
              src="/hero.png"
              alt="MiniDesk dashboard showing todos, notes, and job tracker"
              width={1600}
              height={1000}
              className="w-full h-auto block"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}