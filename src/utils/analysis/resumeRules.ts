export type Severity = 'info' | 'warning' | 'error';

export interface AnalysisMatch {
  id: string;
  originalText: string;
  replacementText?: string;
  message: string;
  severity: Severity;
  startIndex?: number;
  endIndex?: number;
}

export interface AnalysisRule {
  id: string;
  severity: Severity;
  evaluate: (text: string) => AnalysisMatch[];
}

export const resumeRules: AnalysisRule[] = [
  {
    id: 'passive-voice',
    severity: 'warning',
    evaluate: (text: string) => {
      const matches: AnalysisMatch[] = [];
      const regex = /\b(was|were|been|being|is|are|am)\s+(\w+ed|built|made|done)\b/gi;
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          id: `passive-voice-${match.index}`,
          originalText: match[0],
          message: 'Passive voice detected. Use active voice for stronger impact.',
          severity: 'warning',
          startIndex: match.index,
          endIndex: match.index + match[0].length,
        });
      }
      return matches;
    },
  },
  {
    id: 'weak-verb',
    severity: 'error',
    evaluate: (text: string) => {
      const matches: AnalysisMatch[] = [];
      const weakVerbs = ['helped', 'assisted', 'participated in', 'worked on', 'responsible for', 'handled'];
      
      weakVerbs.forEach(verb => {
        const regex = new RegExp(`\\b${verb}\\b`, 'gi');
        let match;
        while ((match = regex.exec(text)) !== null) {
          matches.push({
            id: `weak-verb-${match.index}`,
            originalText: match[0],
            replacementText: 'Orchestrated', // Simple auto-suggestion
            message: `Weak verb "${match[0]}". Suggestion: Orchestrated, Led, or Designed.`,
            severity: 'error',
            startIndex: match.index,
            endIndex: match.index + match[0].length,
          });
        }
      });
      return matches;
    },
  },
  {
    id: 'no-quantification',
    severity: 'info',
    evaluate: (text: string) => {
      // Split by newlines or sentences to evaluate bullet points
      const sentences = text.split(/(?<=[.!?])\s+|<li>|<\/p>|<p>|<br>/gi).filter(s => s.trim().length > 10);
      const matches: AnalysisMatch[] = [];
      
      sentences.forEach(sentence => {
        const cleanSentence = sentence.replace(/<[^>]*>?/gm, '').trim();
        if (cleanSentence.length > 20 && !/\d/.test(cleanSentence)) {
          // No numbers found in a significant sentence
          matches.push({
            id: `no-quantification-${Math.random()}`,
            originalText: cleanSentence.substring(0, 30) + '...',
            message: 'No metrics found. Try to quantify your impact (e.g., "Increased X by 20%").',
            severity: 'info',
          });
        }
      });
      return matches;
    },
  },
  {
    id: 'too-long',
    severity: 'warning',
    evaluate: (text: string) => {
      const cleanText = text.replace(/<[^>]*>?/gm, '').trim();
      const matches: AnalysisMatch[] = [];
      if (cleanText.length > 300) { // arbitrary length for a single block/bullet
        matches.push({
          id: 'too-long',
          originalText: 'Text block',
          message: 'This text is quite long. Recruiters prefer concise, punchy bullet points.',
          severity: 'warning',
        });
      }
      return matches;
    },
  }
];

export const analyzeText = (text: string): AnalysisMatch[] => {
  if (!text || text.trim().length === 0) return [];
  
  const allMatches: AnalysisMatch[] = [];
  for (const rule of resumeRules) {
    allMatches.push(...rule.evaluate(text));
  }
  
  // Deduplicate or sort if necessary
  return allMatches;
};
