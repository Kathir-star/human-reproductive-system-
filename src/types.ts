export interface AnatomicalStructure {
  name: string;
  system: 'female' | 'male';
  location: 'internal' | 'external';
  definition: string;
  extraNotes?: string;
}

export interface Hormone {
  name: string;
  system: 'female' | 'male' | 'both';
  origin: string;
  description: string;
  targetOrgan?: string;
}

export interface MenstrualPhase {
  name: string;
  timing: string;
  description: string;
  details: string;
}

export interface Disease {
  name: string;
  system: 'female' | 'male' | 'both';
  description: string;
  alternativeName?: string;
  clinicalNote?: string;
}

export interface Symptom {
  name: string;
  definition: string;
  genderContext?: 'female' | 'male' | 'both';
}

export interface Procedure {
  name: string;
  definition: string;
  alternativeName?: string;
}

export interface Affix {
  type: 'prefix' | 'suffix';
  affix: string;
  meaning: string;
  example: string;
}

export interface Abbreviation {
  abbrev: string;
  expansion: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'anatomy' | 'physiology' | 'pathology' | 'terminology' | 'abbreviations';
}
