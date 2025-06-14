
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Folder } from 'lucide-react';
import ValidatedInput from '../ValidatedInput';

interface EmailToDriveDriveConfigProps {
  folderPath: string;
  duplicateHandling: string;
  maxFileSize: number;
  flowName: string;
  onInputChange: (field: string, value: any) => void;
  onInputBlur: (field: string) => void;
  getFieldProps: (field: string) => any;
}

const EmailToDriveDriveConfig = ({
  folderPath,
  duplicateHandling,
  maxFileSize,
  flowName,
  onInputChange,
  onInputBlur,
  getFieldProps
}: EmailToDriveDriveConfigProps) => {
  const generateFolderPath = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const path = `/EmailAttachments/${flowName || 'MyFlow'}/${year}/${month}`;
    onInputChange('folderPath', path);
  };

  return (
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
            value={folderPath}
            onChange={(value) => onInputChange('folderPath', value)}
            onBlur={() => onInputBlur('folderPath')}
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
          <Select value={duplicateHandling} onValueChange={(value) => onInputChange('duplicateHandling', value)}>
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
            value={maxFileSize}
            onChange={(e) => onInputChange('maxFileSize', parseInt(e.target.value) || 25)}
            min="1"
            max="100"
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailToDriveDriveConfig;
