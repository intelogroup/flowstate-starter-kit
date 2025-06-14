
import { useState, useEffect } from 'react';
import { Template, TemplateCategory } from '../types';
import { Mail, Share, Briefcase, Database } from 'lucide-react';

export const useTemplates = (filters: any) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<TemplateCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      setIsLoading(true);
      
      // Mock data
      setTimeout(() => {
        setCategories([
          {
            id: 'email',
            name: 'Email',
            description: 'Email automation templates',
            icon: Mail,
            templateCount: 12
          },
          {
            id: 'social',
            name: 'Social Media',
            description: 'Social media automation',
            icon: Share,
            templateCount: 8
          },
          {
            id: 'productivity',
            name: 'Productivity',
            description: 'Productivity workflows',
            icon: Briefcase,
            templateCount: 15
          },
          {
            id: 'data',
            name: 'Data Processing',
            description: 'Data automation templates',
            icon: Database,
            templateCount: 6
          }
        ]);

        setTemplates([
          {
            id: 'email-to-drive',
            name: 'Email to Google Drive',
            description: 'Automatically save email attachments to Google Drive with smart filtering and organization',
            category: 'email',
            tags: ['email', 'google-drive', 'automation', 'attachments'],
            difficulty: 'beginner',
            estimatedTime: '10 min',
            usageCount: 1240,
            rating: 4.8
          },
          {
            id: '2',
            name: 'Social Media Scheduler',
            description: 'Schedule posts across multiple social platforms',
            category: 'social',
            tags: ['social-media', 'scheduling', 'multi-platform'],
            difficulty: 'intermediate',
            estimatedTime: '25 min',
            usageCount: 890,
            rating: 4.6
          },
          {
            id: '3',
            name: 'Invoice Processing',
            description: 'Extract data from invoices and update spreadsheets',
            category: 'data',
            tags: ['invoices', 'data-extraction', 'spreadsheets'],
            difficulty: 'advanced',
            estimatedTime: '45 min',
            usageCount: 567,
            rating: 4.9
          }
        ]);

        setIsLoading(false);
      }, 800);
    };

    loadTemplates();
  }, [filters]);

  return { templates, categories, isLoading };
};
