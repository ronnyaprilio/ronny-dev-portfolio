'use client';

import { useEffect, useRef, useState } from 'react';
import { Experience, ExperienceSectionProps } from "@/types/experience";

export default function ExperienceSection({experiences }: ExperienceSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experiences"
      className="py-24 bg-linear-to-b from-slate-900 to-gray-900 text-white min-h-screen"
    >
      <div className="container mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional Journey
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A timeline of my professional journey, focusing on growth,
            responsibility, and the problems I've had the opportunity to solve.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className={`absolute left-8 top-0 h-full w-0.5 bg-linear-to-b from-emerald-400 to-teal-400 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative pl-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${500 + index * 200}ms` }}>
                <div className={`absolute left-4 top-6 w-8 h-8 rounded-full bg-linear-to-r from-emerald-400 to-teal-400 flex items-center justify-center shadow-lg transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: `${600 + index * 200}ms` }}>
                  <div className="w-3 h-3 rounded-full bg-slate-900"></div>
                </div>

                <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm font-medium rounded-full mb-2 border border-emerald-500/30">
                        {exp.period}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-gray-300 font-medium">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3 text-gray-300">
                    {exp.highlights.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="leading-relaxed">{item}</span>
                      </li>
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