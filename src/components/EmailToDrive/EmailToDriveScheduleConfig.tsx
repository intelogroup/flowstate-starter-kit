
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, AlertCircle } from 'lucide-react';

interface EmailToDriveScheduleConfigProps {
  schedule: string;
  onInputChange: (field: string, value: any) => void;
}

const EmailToDriveScheduleConfig = ({
  schedule,
  onInputChange
}: EmailToDriveScheduleConfigProps) => {
  return (
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
          <Select value={schedule} onValueChange={(value) => onInputChange('schedule', value)}>
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
  );
};

export default EmailToDriveScheduleConfig;
