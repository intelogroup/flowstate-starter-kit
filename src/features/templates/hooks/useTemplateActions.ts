
import { useNavigate } from 'react-router-dom';
import { Template } from '../types';

export const useTemplateActions = () => {
  const navigate = useNavigate();

  const handleUseTemplate = (template: Template) => {
    console.log('Using template:', template.name);
    
    // Route to specific template configuration
    if (template.id === 'email-to-drive') {
      navigate('/email-to-drive');
    } else {
      // For other templates, show a placeholder or redirect to a generic form
      console.log(`Template ${template.name} configuration not yet implemented`);
    }
  };

  const handlePreviewTemplate = (template: Template) => {
    console.log('Previewing template:', template.name);
    // Could open a modal with template details
  };

  return {
    handleUseTemplate,
    handlePreviewTemplate
  };
};
