"use client";

import { useState } from "react";

const SKILLS = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "REST API", "Spring"],
  Languages: ["TypeScript", "JavaScript", "Java"],
  DevOps: ["Docker", "CI/CD", "Linux", "Git"],
  Testing: ["Vitest", "TestNG"],
};

type SkillCategory = keyof typeof SKILLS;

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("Frontend");

  return (
    <section
      id="skills"
      className="py-24 min-h-screen flex items-center"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Core Technologies
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto leading-relaxed">
            Tools and technologies I use daily to design, build, and maintain
            scalable web applications — with a strong focus on clarity,
            performance, and long-term maintainability.
          </p>
        </div>

        <div className="flex justify-center gap-8 mb-14 border-b border-white/10">
          {(Object.keys(SKILLS) as SkillCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`pb-4 text-sm md:text-base font-medium transition-all ${
                activeTab === category
                  ? "border-b-2 border-primary text-primary"
                  : "text-secondary/50 hover:text-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div
            key={activeTab}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 animate-slide-in"
            >
            {SKILLS[activeTab].map((skill) => (
                <div
                    key={skill}
                    className="rounded-xl border border-white/10 bg-white p-5 text-center font-medium text-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                    {skill}
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}