const EXPERIENCES = [
  {
    period: "2023 — Present",
    role: "Senior Software Engineer",
    company: "Freelance / Remote",
    highlights: [
      "Designing and building modern web applications using Next.js and TypeScript",
      "Focusing on performance, maintainability, and clean architecture",
      "Working closely with clients to translate requirements into reliable solutions",
    ],
  },
  {
    period: "2021 — 2023",
    role: "Senior Software Engineer",
    company: "Enterprise Projects",
    highlights: [
      "Designing and building modern web applications using Java, AWS, Report Automation",
      "Focusing on performance, maintainability, and clean architecture",
      "Working closely with clients to translate requirements into reliable solutions",
    ],
  },
  {
    period: "2017 — 2020",
    role: "Software Developer",
    company: "Enterprise Projects",
    highlights: [
      "Maintained and improved large-scale Java-based systems",
      "Handled production issues, bug fixes, and system optimizations",
      "Collaborated with cross-functional teams in fast-paced environments",
    ],
  },
  {
    period: "2012 — 2015",
    role: "Junior Software Engineer",
    company: "Early Career",
    highlights: [
      "Built foundational programming skills across backend and frontend stacks",
      "Learned to write maintainable, readable, and testable code",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-24 min-h-screen flex items-center"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Professional Experience
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto leading-relaxed">
            A timeline of my professional journey, focusing on growth,
            responsibility, and the problems I’ve had the opportunity to solve.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-3 top-0 h-full w-px bg-white/10" />

          <div className="space-y-16">
            {EXPERIENCES.map((exp, index) => (
              <div key={index} className="relative pl-12">
                <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>

                <div className="rounded-xl border border-white/10 bg-white p-6 shadow-sm">
                  <span className="text-sm text-gray-500 block mb-1">
                    {exp.period}
                  </span>

                  <h3 className="text-lg font-semibold text-gray-900">
                    {exp.role}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {exp.company}
                  </p>

                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {exp.highlights.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}