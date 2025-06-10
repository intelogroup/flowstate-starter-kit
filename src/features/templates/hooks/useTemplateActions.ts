
import { useCallback } from 'react';

export const useTemplateActions = () => {
  const useTemplate = useCallback((templateId: string) => {
    console.log(`Using template: ${templateId}`);
  }, []);

  const previewTemplate = useCallback((templateId: string) => {
    console.log(`Previewing template: ${templateId}`);
  }, []);

  const favoriteTemplate = useCallback((templateId: string) => {
    console.log(`Favoriting template: ${templateId}`);
  }, []);

  return {
    useTemplate,
    previewTemplate,
    favoriteTemplate
  };
};
