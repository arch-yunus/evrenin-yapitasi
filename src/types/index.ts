export type EraType = 'ancient' | 'classical' | 'quantum' | 'digital';

export interface TimelineEvent {
  id: string;
  year: string;
  yearNumber?: number;
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
  category?: 'philosophy' | 'classical-physics' | 'quantum-mechanics' | 'information-theory' | 'cosmology';
  tag: string;
}

export interface GlossaryItem {
  term: string;
  termEn: string;
  category: 'ancient' | 'quantum' | 'information' | 'cosmology';
  defTr: string;
  defEn: string;
}

export interface ComparisonDimension {
  id: string;
  feature: string;
  featureEn: string;
  matter: string;
  matterEn: string;
  energy: string;
  energyEn: string;
  information: string;
  informationEn: string;
}

export interface QuizQuestion {
  id: number;
  category?: string;
  question: string;
  questionEn: string;
  options: {
    text: string;
    textEn: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  explanationEn: string;
}

export interface CosmicScaleItem {
  id: string;
  nameTr: string;
  nameEn: string;
  sizeMeters: number;
  massKg: number;
  bits: number;
  descTr: string;
  descEn: string;
}
