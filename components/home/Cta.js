import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary to-primary/80 text-app p-12 md:p-16 rounded-2xl text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-app/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-app/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to calm your workday?
            </h2>
            <p className="text-xl text-app/80 mb-8 max-w-2xl mx-auto">
              Join others who've ditched productivity anxiety for simple, thoughtful tracking.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/signup" 
                className="w-full sm:w-auto px-8 py-4 bg-app text-primary rounded-lg text-lg font-medium hover:bg-app/90 transition-colors shadow-lg"
              >
                Get Started Free
              </Link>
              <Link 
                href="#features" 
                className="w-full sm:w-auto px-8 py-4 border-2 border-app text-app rounded-lg text-lg font-medium hover:bg-app/10 transition-colors"
              >
                Learn More
              </Link>
            </div>

            <p className="mt-6 text-app/60 text-sm">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}