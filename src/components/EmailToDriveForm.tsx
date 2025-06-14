
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useFormValidation } from '@/hooks/useFormValidation';
import EmailToDriveBasicConfig from './EmailToDrive/EmailToDriveBasicConfig';
import EmailToDriveFilters from './EmailToDrive/EmailToDriveFilters';
import EmailToDriveDriveConfig from './EmailToDrive/EmailToDriveDriveConfig';
import EmailToDriveScheduleConfig from './EmailToDrive/EmailToDriveScheduleConfig';

interface EmailToDriveFormData {
  flowName: string;
  description: string;
  senderFilter: string;
  subjectFilter: string;
  folderPath: string;
  schedule: string;
  fileTypes: string[];
  enabled: boolean;
  duplicateHandling: string;
  maxFileSize: number;
}

interface EmailToDriveFormProps {
  onSubmit: (data: EmailToDriveFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<EmailToDriveFormData>;
  isLoading?: boolean;
}

const EmailToDriveForm = ({
  onSubmit,
  onCancel,
  initialData = {},
  isLoading = false
}: EmailToDriveFormProps) => {
  const [formData, setFormData] = useState<EmailToDriveFormData>({
    flowName: '',
    description: '',
    senderFilter: '',
    subjectFilter: '',
    folderPath: '',
    schedule: 'realtime',
    fileTypes: ['pdf', 'docx', 'xlsx'],
    enabled: true,
    duplicateHandling: 'skip',
    maxFileSize: 25,
    ...initialData
  });

  const fieldConfigs = {
    flowName: {
      required: true,
      minLength: 3,
      maxLength: 50
    },
    description: {
      required: false,
      maxLength: 200
    },
    folderPath: {
      required: false,
      maxLength: 100
    }
  };

  const {
    validateForm,
    getFieldProps,
    showSuccessToast,
    showErrorToast,
    hasErrors
  } = useFormValidation(fieldConfigs);

  const handleInputChange = (field: keyof EmailToDriveFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field in fieldConfigs) {
      const fieldProps = getFieldProps(field);
      fieldProps.onChange(String(value));
    }
  };

  const handleInputBlur = (field: keyof EmailToDriveFormData) => {
    if (field in fieldConfigs) {
      const fieldProps = getFieldProps(field);
      fieldProps.onBlur(String(formData[field]));
    }
  };

  const handleFileTypeToggle = (fileType: string) => {
    setFormData(prev => ({
      ...prev,
      fileTypes: prev.fileTypes.includes(fileType)
        ? prev.fileTypes.filter(type => type !== fileType)
        : [...prev.fileTypes, fileType]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationData = {
      flowName: formData.flowName,
      description: formData.description,
      folderPath: formData.folderPath
    };

    const isValid = validateForm(validationData);
    
    if (isValid) {
      onSubmit(formData);
      showSuccessToast('Email to Drive flow configured successfully!');
    } else {
      showErrorToast('Please fix the validation errors and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <EmailToDriveBasicConfig
        flowName={formData.flowName}
        description={formData.description}
        enabled={formData.enabled}
        onInputChange={handleInputChange}
        onInputBlur={handleInputBlur}
        getFieldProps={getFieldProps}
      />

      <EmailToDriveFilters
        senderFilter={formData.senderFilter}
        subjectFilter={formData.subjectFilter}
        fileTypes={formData.fileTypes}
        onInputChange={handleInputChange}
        onFileTypeToggle={handleFileTypeToggle}
      />

      <EmailToDriveDriveConfig
        folderPath={formData.folderPath}
        duplicateHandling={formData.duplicateHandling}
        maxFileSize={formData.maxFileSize}
        flowName={formData.flowName}
        onInputChange={handleInputChange}
        onInputBlur={handleInputBlur}
        getFieldProps={getFieldProps}
      />

      <EmailToDriveScheduleConfig
        schedule={formData.schedule}
        onInputChange={handleInputChange}
      />

      {/* Form Actions */}
      <div className="flex gap-3 pt-4">
        <Button 
          type="submit"
          className="flex-1"
          disabled={hasErrors || isLoading}
        >
          {isLoading ? 'Configuring...' : 'Save Configuration'}
        </Button>
        {onCancel && (
          <Button 
            type="button" 
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default EmailToDriveForm;
