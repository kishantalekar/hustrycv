import {useState} from 'react';
import {AIService} from '@/services/ai';

export type TransformAction = 'shorten' | 'expand' | 'quantify' | 'rewrite';

export interface TransformResult {
  original: string;
  transformed: string;
}

const TRANSFORM_PROMPTS: Record<TransformAction, string> = {
  shorten: `Shorten the following text while preserving key achievements and metrics. Keep all numbers. Maintain a professional tone. Return ONLY the shortened text without markdown, quotes, or conversational filler. Original: "{{TEXT}}"`,
  expand: `Expand the following text to add more professional detail and elaborate on the impact. Return ONLY the expanded text without markdown, quotes, or conversational filler. Original: "{{TEXT}}"`,
  quantify: `Add specific, realistic (but impressive) placeholder metrics to this text. Use formats like "Increased X by 20%" or "Managed team of 5". Return ONLY the improved text without markdown, quotes, or conversational filler. Original: "{{TEXT}}"`,
  rewrite: `Rewrite the following text to use stronger action verbs and a more professional tone. Return ONLY the rewritten text without markdown, quotes, or conversational filler. Original: "{{TEXT}}"`,
};

export const useAITransform = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'preview'>('idle');
  const [result, setResult] = useState<TransformResult | null>(null);

  const transformText = async (action: TransformAction, currentText: string) => {
    if (!currentText.trim()) return;
    
    setStatus('loading');
    
    // Strip HTML from current text for the AI to process cleanly
    const plainText = currentText.replace(/<[^>]*>?/gm, '');
    const prompt = TRANSFORM_PROMPTS[action].replace('{{TEXT}}', plainText);

    try {
      const aiService = AIService.getInstance();
      const res = await aiService.execute<string>({
        prompt,
        type: 'text',
      });

      if (res && res.data) {
        setResult({
          original: currentText,
          // If the original was HTML, we are losing formatting here. 
          // For resume bullets, this is usually acceptable or we can just return plain text and let the editor handle it.
          transformed: res.data.trim(),
        });
        setStatus('preview');
      } else {
        setStatus('idle');
      }
    } catch (error) {
      console.error('Transform error:', error);
      setStatus('idle');
    }
  };

  const accept = () => {
    setStatus('idle');
  };

  const discard = () => {
    setResult(null);
    setStatus('idle');
  };

  return {status, result, transformText, accept, discard};
};
