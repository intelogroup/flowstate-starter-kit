
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Mail, Folder, Clock, Filter, FileText, AlertCircle } from 'lucide-react';
import { useFormValidation } from '@/hooks/useFormValidation';
import ValidatedInput from './ValidatedInput';

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

  const fileTypeOptions = [
    { id: 'pdf', label: 'PDF Documents' },
    { id: 'docx', label: 'Word Documents' },
    { id: 'xlsx', label: 'Excel Spreadsheets' },
    { id: 'pptx', label: 'PowerPoint Presentations' },
    { id: 'jpg', label: 'JPEG Images' },
    { id: 'png', label: 'PNG Images' },
    { id: 'zip', label: 'ZIP Archives' }
  ];

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

  const generateFolderPath = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const path = `/EmailAttachments/${formData.flowName || 'MyFlow'}/${year}/${month}`;
    handleInputChange('folderPath', path);
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
      {/* Basic Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Basic Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ValidatedInput
            id="flowName"
            label="Flow Name"
            value={formData.flowName}
            onChange={(value) => handleInputChange('flowName', value)}
            onBlur={() => handleInputBlur('flowName')}
            placeholder="e.g., Invoice Attachments to Drive"
            required
            {...getFieldProps('flowName')}
          />

          <ValidatedInput
            id="description"
            label="Description"
            value={formData.description}
            onChange={(value) => handleInputChange('description', value)}
            onBlur={() => handleInputBlur('description')}
            placeholder="Optional description of what this flow does"
            {...getFieldProps('description')}
          />

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.enabled}
              onCheckedChange={(checked) => handleInputChange('enabled', checked)}
            />
            <Label className="text-sm">
              {formData.enabled ? 'Flow Enabled' : 'Flow Disabled'}
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Email Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-green-600" />
            Email Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="senderFilter" className="text-sm font-medium">
              Sender Email Filter
            </Label>
            <Input
              id="senderFilter"
              value={formData.senderFilter}
              onChange={(e) => handleInputChange('senderFilter', e.target.value)}
              placeholder="e.g., invoices@company.com or leave empty for all"
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Only process emails from this sender (optional)
            </p>
          </div>

          <div>
            <Label htmlFor="subjectFilter" className="text-sm font-medium">
              Subject Keywords
            </Label>
            <Input
              id="subjectFilter"
              value={formData.subjectFilter}
              onChange={(e) => handleInputChange('subjectFilter', e.target.value)}
              placeholder="e.g., invoice, receipt, document"
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Filter emails containing these keywords in subject (optional)
            </p>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">File Types to Save</Label>
            <div className="grid grid-cols-2 gap-2">
              {fileTypeOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={formData.fileTypes.includes(option.id)}
                    onCheckedChange={() => handleFileTypeToggle(option.id)}
                  />
                  <Label htmlFor={option.id} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {formData.fileTypes.map((type) => (
                <Badge key={type} variant="secondary">
                  {type.toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drive Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-purple-600" />
            Google Drive Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="folderPath" className="text-sm font-medium">
                Folder Path
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateFolderPath}
                className="h-6 text-xs"
              >
                Auto-generate
              </Button>
            </div>
            <ValidatedInput
              id="folderPath"
              label=""
              value={formData.folderPath}
              onChange={(value) => handleInputChange('folderPath', value)}
              onBlur={() => handleInputBlur('folderPath')}
              placeholder="/EmailAttachments/2024/12"
              {...getFieldProps('folderPath')}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave empty to auto-generate: /EmailAttachments/FlowName/YYYY/MM
            </p>
          </div>

          <div>
            <Label htmlFor="duplicateHandling" className="text-sm font-medium">
              Duplicate File Handling
            </Label>
            <Select value={formData.duplicateHandling} onValueChange={(value) => handleInputChange('duplicateHandling', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="skip">Skip duplicates</SelectItem>
                <SelectItem value="overwrite">Overwrite existing</SelectItem>
                <SelectItem value="rename">Auto-rename with timestamp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="maxFileSize" className="text-sm font-medium">
              Maximum File Size (MB)
            </Label>
            <Input
              id="maxFileSize"
              type="number"
              value={formData.maxFileSize}
              onChange={(e) => handleInputChange('maxFileSize', parseInt(e.target.value) || 25)}
              min="1"
              max="100"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Schedule Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            Schedule & Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="schedule" className="text-sm font-medium">
              Processing Schedule
            </Label>
            <Select value={formData.schedule} onValueChange={(value) => handleInputChange('schedule', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time (as emails arrive)</SelectItem>
                <SelectItem value="15min">Every 15 minutes</SelectItem>
                <SelectItem value="hourly">Every hour</SelectItem>
                <SelectItem value="daily">Daily at 9 AM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800 dark:text-blue-200">
                  Real-time Processing
                </p>
                <p className="text-blue-700 dark:text-blue-300 mt-1">
                  Your flow will automatically process new emails with attachments as they arrive in your inbox.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
