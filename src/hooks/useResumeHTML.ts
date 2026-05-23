import {useState, useEffect} from 'react';
import {getTemplateById} from '@/templates';
import * as Sentry from '@sentry/react-native';

export const useResumeHTML = (
  resumeData: Resume | undefined,
  templateId: string,
  debounceMs: number = 500,
) => {
  const [html, setHtml] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(true);

  useEffect(() => {
    setIsGenerating(true);

    const handler = setTimeout(() => {
      try {
        if (!resumeData) {
          setHtml('<p style="text-align:center;font-family:sans-serif;margin-top:20px;">No resume data available</p>');
          setIsGenerating(false);
          return;
        }

        const template = getTemplateById(templateId);
        if (!template) {
          setHtml('<p style="text-align:center;font-family:sans-serif;margin-top:20px;">Template not found</p>');
          setIsGenerating(false);
          return;
        }
        
        const generatedHtml = template.getHTML(resumeData) || '';
        setHtml(generatedHtml);
      } catch (error) {
        console.error('Failed to generate HTML', error);
        Sentry.captureException(error, {
          tags: {component: 'useResumeHTML'},
        });
        setHtml('<p style="text-align:center;font-family:sans-serif;margin-top:20px;">Error generating preview</p>');
      } finally {
        setIsGenerating(false);
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [resumeData, templateId, debounceMs]);

  return {html, isGenerating};
};
