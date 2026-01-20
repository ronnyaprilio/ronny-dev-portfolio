export interface Experience {
  _id: string;
  period: string;
  role: string;
  company: string;
  highlights: string[];
}

export interface ExperienceSectionProps {
  experiences: Experience[];
}