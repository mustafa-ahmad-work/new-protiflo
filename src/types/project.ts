export interface LocalizedString {
  ar: string;
  en: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectWorkflowStep {
  step?: number;
  title: string;
  desc: string;
}

export interface ProjectCustomSection {
  title: string;
  content: string;
}

export interface ProjectItem {
  id: number | string;
  slug?: string;
  title: LocalizedString;
  category: LocalizedString;
  summary: LocalizedString;
  description: LocalizedString;
  thumbnail: string;
  heroImage?: string;
  images?: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  role?: LocalizedString;
  duration?: LocalizedString;
  year?: string;
  metrics?: ProjectMetric[];
  workflow?: {
    ar?: ProjectWorkflowStep[];
    en?: ProjectWorkflowStep[];
  };
  features?: {
    ar?: string[];
    en?: string[];
  };
  customSections?: {
    ar?: ProjectCustomSection[];
    en?: ProjectCustomSection[];
  };
  overview?: LocalizedString;
  challenge?: LocalizedString;
  solution?: LocalizedString;
  backendHighlights?: LocalizedString[];
  frontendHighlights?: LocalizedString[];
}

export interface TranslatedProjectItem {
  id: number | string;
  slug?: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  thumbnail: string;
  heroImage?: string;
  images?: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  role?: string;
  duration?: string;
  year?: string;
  metrics?: ProjectMetric[];
  workflow?: ProjectWorkflowStep[];
  features?: string[];
  customSections?: ProjectCustomSection[];
  overview?: string;
  challenge?: string;
  solution?: string;
  backendHighlights?: string[];
  frontendHighlights?: string[];
}
