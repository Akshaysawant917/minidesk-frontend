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
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Job Tracker",
      description: "Every application in one list. Status, dates, salary, notes—so you always know where things stand.",
      benefit: "Stop losing track of where you applied"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
      title: "Bookmarks",
      description: "Save the pages, tools, and articles worth coming back to. Organized just enough to be useful.",
      benefit: "Save it once, find it anytime"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Commands",
      description: "Your most-used terminal commands, saved and ready to copy. No more digging through history.",
      benefit: "Stop digging through your terminal history"
    }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Six tools. Zero bloat.
          </h2>
          <p className="text-xl text-app/70 max-w-2xl mx-auto">
            MiniDesk doesn't try to do everything. It does a handful of things well, so you can get back to your actual work.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-app p-8 rounded-xl border border-app hover:border-primary/30 hover:-translate-y-1 transition-all group"
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

        {/* Not / Is comparison */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-semibold text-primary">
            Know what you're getting
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-0 rounded-2xl overflow-hidden border border-app">
          {/* What it's not */}
          <div className="p-8 md:p-10 md:border-r border-app">
            <p className="text-xs font-semibold tracking-widest text-app/40 uppercase mb-6">
              Not this
            </p>
            <ul className="space-y-4">
              {[
                "Jira or Asana",
                "A team manager",
                "Analytics heavy",
                "Productivity gamification",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-app/30 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-app/50 line-through decoration-app/20">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* What it is */}
          <div className="p-8 md:p-10 bg-primary/[0.03]">
            <p className="text-xs font-semibold tracking-widest text-primary/60 uppercase mb-6">
              Just this
            </p>
            <ul className="space-y-4">
              {[
                "A quiet place to think",
                "Built for one",
                "Just enough structure",
                "Progress, not points",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-primary shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-app font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}