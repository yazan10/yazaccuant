export type Language = 'ar' | 'en' | 'he';
export type Platform = 'instagram' | 'tiktok';

export interface Issue {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface ActionItem {
  step: string;
  details: string;
}

export interface AnalysisResult {
  score: number;
  summary: string;
  profile_audit: {
    bio_check: string;
    visual_coherence: string;
    content_strategy: string;
  };
  problems: Issue[];
  solutions: ActionItem[];
  hashtags: string[];
}