
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';

interface EmailToDriveFiltersProps {
  senderFilter: string;
  subjectFilter: string;
  fileTypes: string[];
  onInputChange: (field: string, value: any) => void;
  onFileTypeToggle: (fileType: string) => void;
}

const EmailToDriveFilters = ({
  senderFilter,
  subjectFilter,
  fileTypes,
  onInputChange,
  onFileTypeToggle
}: EmailToDriveFiltersProps) => {
  const fileTypeOptions = [
    { id: 'pdf', label: 'PDF Documents' },
    { id: 'docx', label: 'Word Documents' },
    { id: 'xlsx', label: 'Excel Spreadsheets' },
    { id: 'pptx', label: 'PowerPoint Presentations' },
    { id: 'jpg', label: 'JPEG Images' },
    { id: 'png', label: 'PNG Images' },
    { id: 'zip', label: 'ZIP Archives' }
  ];

  return (
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
            value={senderFilter}
            onChange={(e) => onInputChange('senderFilter', e.target.value)}
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
            value={subjectFilter}
            onChange={(e) => onInputChange('subjectFilter', e.target.value)}
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
                  checked={fileTypes.includes(option.id)}
                  onCheckedChange={() => onFileTypeToggle(option.id)}
                />
                <Label htmlFor={option.id} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {fileTypes.map((type) => (
              <Badge key={type} variant="secondary">
                {type.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailToDriveFilters;
