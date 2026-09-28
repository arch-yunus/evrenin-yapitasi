export type EraType = 'ancient' | 'classical' | 'quantum' | 'digital';

export interface TimelineEvent {
  id: string;
  year: string;
  yearNumber: number;
  era: EraType;
  title: string;
  titleEn: string;
  thinker: string;
  summary: string;
  summaryEn: string;
  quote?: string;
  quoteAuthor?: string;
  fullDescription: string;
  fullDescriptionEn: string;
  keyConcepts: string[];
  formula?: string;
  impact: string;
  impactEn: string;
  category: 'philosophy' | 'classical-physics' | 'quantum-mechanics' | 'information-theory' | 'cosmology';
  tag: string;
}

export interface Article {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  readTime: string;
  era: EraType;
  authorOrSchool: string;
  summary: string;
  summaryEn: string;
  sections: {
    heading: string;
    headingEn: string;
    content: string;
    contentEn: string;
    formula?: string;
    callout?: string;
    calloutEn?: string;
  }[];
  references: string[];
}

export interface ComparisonDimension {
  id: string;
  feature: string;
  featureEn: string;
  matterView: string;
  matterViewEn: string;
  energyView: string;
  energyViewEn: string;
  informationView: string;
  informationViewEn: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionEn: string;
  options: {
    text: string;
    textEn: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  explanationEn: string;
  category: string;
}
