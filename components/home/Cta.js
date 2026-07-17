import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-app p-12 md:p-20 text-center">
          {/* Background decoration */}
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-app/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-app/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Ready to calm your workday?
            </h2>
            <p className="text-xl text-app/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join others who've ditched productivity anxiety for simple, thoughtful tracking.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-9 py-4 bg-app text-primary rounded-lg text-lg font-medium hover:bg-app/90 transition-colors shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                href="#features"
                className="group inline-flex items-center gap-1.5 text-lg font-medium text-app/80 hover:text-app transition-colors"
              >
                Learn more
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <p className="mt-8 inline-flex items-center gap-2 text-app/60 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No credit card required &nbsp;·&nbsp; Free forever plan available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}