
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';
import ValidatedInput from '../ValidatedInput';

interface EmailToDriveBasicConfigProps {
  flowName: string;
  description: string;
  enabled: boolean;
  onInputChange: (field: string, value: any) => void;
  onInputBlur: (field: string) => void;
  getFieldProps: (field: string) => any;
}

const EmailToDriveBasicConfig = ({
  flowName,
  description,
  enabled,
  onInputChange,
  onInputBlur,
  getFieldProps
}: EmailToDriveBasicConfigProps) => {
  return (
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
          value={flowName}
          onChange={(value) => onInputChange('flowName', value)}
          onBlur={() => onInputBlur('flowName')}
          placeholder="e.g., Invoice Attachments to Drive"
          required
          {...getFieldProps('flowName')}
        />

        <ValidatedInput
          id="description"
          label="Description"
          value={description}
          onChange={(value) => onInputChange('description', value)}
          onBlur={() => onInputBlur('description')}
          placeholder="Optional description of what this flow does"
          {...getFieldProps('description')}
        />

        <div className="flex items-center space-x-2">
          <Switch
            checked={enabled}
            onCheckedChange={(checked) => onInputChange('enabled', checked)}
          />
          <Label className="text-sm">
            {enabled ? 'Flow Enabled' : 'Flow Disabled'}
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailToDriveBasicConfig;
