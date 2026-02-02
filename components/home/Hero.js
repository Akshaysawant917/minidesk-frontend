import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm text-app">Your calm work companion</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 leading-tight">
          Your day, your way.
          <br />
          <span className="text-app/60">No pressure.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-app/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          MiniDesk is a personal dashboard that helps you track your work, thoughts, and todos—without the productivity guilt.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link 
            href="/signup" 
            className="w-full sm:w-auto px-8 py-4 bg-primary text-secondary rounded-lg text-lg font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            Start Using MiniDesk
          </Link>
          <Link 
            href="#features" 
            className="w-full sm:w-auto px-8 py-4 border-2 border-app text-app rounded-lg text-lg font-medium hover:bg-secondary transition-colors"
          >
            See How It Works
          </Link>
        </div>

        {/* Social Proof / Trust Signal */}
        <div className="flex items-center justify-center gap-8 text-app/50 text-sm mb-10">
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
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Self-hosted ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}