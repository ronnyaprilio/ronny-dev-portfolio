'use client';

import { useEffect, useRef, useState } from 'react';
import ProjectSectionCard from '@/lib/projects/ProjectSectionCard';
import { Project } from '@/types/project';

interface ProjectSectionProps {
  projects: Project[];
}

const ProjectSection = ({ projects }: ProjectSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
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

  const handleImageZoom = (imageSrc: string) => {
    setZoomedImage(imageSrc);
  };

  const handleZoomClose = () => {
    setZoomedImage(null);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 bg-linear-to-b from-gray-50 to-white min-h-screen"
    >
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of my recent work and creative solutions
          </p>
        </div>

        {projects.length > 0 ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {projects.map((project, index) => (
              <div
                key={project._id}
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <ProjectSectionCard project={project} onImageZoom={handleImageZoom} />
              </div>
            ))}
          </div>
        ) : (
          <div className={`flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg font-medium text-center">
              No projects available at the moment.
            </p>
            <p className="text-gray-400 text-sm text-center mt-1">
              Check back soon for exciting new work!
            </p>
          </div>
        )}
      </div>

      {/* Zoomed Image Overlay */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={handleZoomClose}
        >
          <img
            src={zoomedImage}
            alt="Zoomed project"
            className="max-w-full max-h-full object-contain"
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
            onClick={handleZoomClose}
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
};

export default ProjectSection;