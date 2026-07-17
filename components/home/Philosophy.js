export default function Philosophy() {
  const principles = [
    {
      title: "Calm tracking",
      subtitle: "not pressure tracking",
      description: "No notifications, no streaks, no urgent badges. Your dashboard is there when you need it, silent when you don't.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.63 13A17.89 17.89 0 0118 8m-6 8a3 3 0 01-3-3M4 4l16 16M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      )
    },
    {
      title: "Memory-first",
      subtitle: "not productivity-obsessed",
      description: "We help you remember what you did, not measure how much. Some days you ship code. Some days you think. Both matter.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l2.5 2.5M21 12a9 9 0 11-9-9 9 9 0 019 9z" />
        </svg>
      )
    },
    {
      title: "Personal space",
      subtitle: "not team surveillance",
      description: "This is your workspace. No managers, no shared boards, no status updates. Just you and your work.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      )
    }
  ];

  return (
    <section id="philosophy" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Built on a different philosophy
          </h2>
          <p className="text-xl text-app/70 max-w-2xl mx-auto">
            Most productivity tools make you feel bad. MiniDesk is built to help you feel grounded.
          </p>
        </div>

        {/* Principles */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="p-8 bg-secondary rounded-2xl border border-app hover:border-primary/30 hover:-translate-y-1 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                {principle.icon}
              </div>
              <p className="text-xs font-medium tracking-wide text-app/40 line-through decoration-app/30 mb-2">
                {principle.subtitle}
              </p>
              <h3 className="text-2xl font-semibold text-primary mb-3">
                {principle.title}
              </h3>
              <p className="text-app/70 leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote/Manifesto */}
        <div className="relative bg-primary text-secondary rounded-2xl px-8 py-16 md:py-20 text-center overflow-hidden">
          <span className="pointer-events-none select-none absolute top-4 left-6 md:left-10 text-8xl md:text-9xl font-serif text-secondary/10 leading-none">
            &ldquo;
          </span>
          <blockquote className="relative text-2xl md:text-4xl font-medium leading-snug max-w-3xl mx-auto mb-6">
            The best productivity tool is the one that doesn&apos;t make you feel guilty for being human.
          </blockquote>
          <p className="relative text-secondary/60 text-sm tracking-widest uppercase">
            The MiniDesk Philosophy
          </p>
        </div>
      </div>
    </section>
  );
}