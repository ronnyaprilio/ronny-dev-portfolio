export interface Experience {
  _id: string;
  displayOrder: number;
  period: string;
  role: string;
  company: string;
  highlights: string[];
}

export interface ExperienceSectionProps {
  experiences: Experience[];
}