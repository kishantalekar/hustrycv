import {useState, useEffect} from 'react';
import {analyzeText, AnalysisMatch} from '@/utils/analysis/resumeRules';

export const useTextAnalysis = (text: string, debounceMs: number = 300) => {
  const [issues, setIssues] = useState<AnalysisMatch[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    setIsAnalyzing(true);
    const handler = setTimeout(() => {
      const results = analyzeText(text);
      setIssues(results);
      setIsAnalyzing(false);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [text, debounceMs]);

  return {issues, isAnalyzing};
};
