export default function Philosophy() {
  const principles = [
    {
      title: "Calm tracking",
      subtitle: "not pressure tracking",
      description: "No notifications, no streaks, no urgent badges. Your dashboard is there when you need it, silent when you don't."
    },
    {
      title: "Memory-first",
      subtitle: "not productivity-obsessed",
      description: "We help you remember what you did, not measure how much. Some days you ship code. Some days you think. Both matter."
    },
    {
      title: "Personal space",
      subtitle: "not team surveillance",
      description: "This is your workspace. No managers, no shared boards, no status updates. Just you and your work."
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
        <div className="space-y-12 mb-16">
          {principles.map((principle, index) => (
            <div 
              key={index}
              className="flex flex-col md:flex-row gap-6 items-start p-8 bg-secondary rounded-xl border border-app hover:border-primary/30 transition-all"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-xl">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-primary mb-2">
                  {principle.title}
                  <span className="text-app/50 text-lg ml-3">{principle.subtitle}</span>
                </h3>
                <p className="text-app/70 leading-relaxed text-lg">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote/Manifesto */}
        <div className="bg-primary text-secondary p-12 rounded-xl text-center">
          <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-4">
            "The best productivity tool is the one that doesn't make you feel guilty for being human."
          </blockquote>
          <p className="text-app/70">— The MiniDesk Philosophy</p>
        </div>
      </div>
    </section>
  );
}