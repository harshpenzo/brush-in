export interface PostVariation {
  content: string;
  format: string;
  formatDescription: string;
  engagementTip: string;
  characterCount: number;
  hook: string;
}

export interface PostGenerationResult {
  variations: PostVariation[];
  metadata: {
    topic: string;
    tone: string;
    industry: string;
  };
}
