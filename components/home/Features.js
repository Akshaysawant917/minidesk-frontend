export default function Features() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Work Logs",
      description: "One daily reflection of what you actually did. Not a timeline, not a tracker—just a simple end-of-day note.",
      benefit: "Remember your week without reconstructing it"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Todos (Today & Later)",
      description: "Two simple lists. What matters today, and what can wait. No priority levels, no due dates, no guilt.",
      benefit: "Focus on now, park the rest"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: "Quick Notes",
      description: "A scratchpad for thoughts, ideas, links, anything. No folders, no tags—just capture and move on.",
      benefit: "Your brain doesn't need folders"
    }
  ];

  // Add new features here as you build them
  const comingSoon = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Secret Notes",
      description: "Encrypted notes for sensitive information."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
      title: "Bookmarks",
      description: "Save and organize important links."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Job Tracker",
      description: "Track applications and interviews."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      title: "Documents Vault",
      description: "Secure Documents management built-in."
    }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Three things. That's it.
          </h2>
          <p className="text-xl text-app/70 max-w-2xl mx-auto">
            MiniDesk doesn't try to do everything. It does three things well, so you can get back to your actual work.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-app p-8 rounded-xl border border-app hover:border-primary/30 transition-all group"
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-app/70 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <div className="pt-4 border-t border-app">
                <p className="text-sm text-primary font-medium">
                  → {feature.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-primary mb-2">
              Coming Soon
            </h3>
            <p className="text-app/60">
              More thoughtful features on the way
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {comingSoon.map((feature, index) => (
              <div 
                key={index}
                className="bg-app/50 p-6 rounded-lg border border-app/50 relative"
              >
                <span className="absolute top-3 right-3 text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  Soon
                </span>
                <div className="text-primary/60 mb-3">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-primary mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-app/60">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Anti-feature callout */}
        <div className="mt-16 p-8 bg-app rounded-xl border-2 border-primary/20">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              What MiniDesk is NOT
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-app/70">
              <div className="flex items-center gap-2">
                <span className="text-red-500">✗</span>
                <span>Not Jira or Asana</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">✗</span>
                <span>Not a team manager</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">✗</span>
                <span>Not analytics heavy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">✗</span>
                <span>Not productivity gamification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}