export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Freelance Designer",
      content: "Finally, a tool that doesn't make me feel guilty for having a slow day. MiniDesk just helps me remember what I did without the pressure.",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Software Engineer",
      content: "I've tried Notion, Jira, Asana... MiniDesk is the only one I actually use daily. It's just simple enough to not be overwhelming.",
      avatar: "MR"
    },
    {
      name: "Emily Park",
      role: "Product Manager",
      content: "The 'Today & Later' todo split is brilliant. I finally stopped feeling bad about things I can't do today. This is my calm place.",
      avatar: "EP"
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            What users are saying
          </h2>
          <p className="text-xl text-app/70">
            Real feedback from people who ditched the noise
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-secondary p-8 rounded-xl border border-app hover:border-primary/30 transition-all"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i}
                    className="w-5 h-5 text-yellow-500" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-app/80 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-app font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-primary font-semibold">{testimonial.name}</p>
                  <p className="text-app/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}