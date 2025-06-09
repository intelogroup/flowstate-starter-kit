import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Save, Play } from 'lucide-react';
import DynamicInput from './DynamicInput';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  description: string;
  trigger: string;
  actions: Array<{
    type: string;
    config: Record<string, string>;
  }>;
}

const FlowConfigurationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    trigger: '',
    actions: [{ type: '', config: {} }]
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (fieldName: string, value: string): string | null => {
    switch (fieldName) {
      case 'name':
        if (!value.trim()) return 'Flow name is required';
        if (value.length < 3) return 'Flow name must be at least 3 characters';
        return null;
      case 'description':
        if (!value.trim()) return 'Description is required';
        return null;
      case 'trigger':
        if (!value) return 'Please select a trigger';
        return null;
      default:
        return null;
    }
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const handleFieldBlur = (fieldName: string, value: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    const error = validateField(fieldName, value);
    setErrors(prev => ({ ...prev, [fieldName]: error || '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Validate required fields
    const fieldsToValidate = ['name', 'description', 'trigger'];
    
    fieldsToValidate.forEach(fieldName => {
      const value = formData[fieldName as keyof FormData] as string;
      const error = validateField(fieldName, value);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    // Validate actions
    formData.actions.forEach((action, index) => {
      if (!action.type) {
        newErrors[`action_${index}_type`] = 'Please select an action type';
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    return isValid;
  };

  const handleSave = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const isValid = validateForm();
      
      if (!isValid) {
        toast({
          title: "Validation Error",
          description: "Please fix the errors and try again",
          variant: "destructive",
          duration: 4000,
        });
        return;
      }

      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Flow saved successfully",
        description: `"${formData.name}" has been saved to your flows`,
        duration: 3000,
      });
      
      console.log('Flow saved:', formData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save flow. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestRun = async () => {
    const isValid = validateForm();
    
    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before testing",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    toast({
      title: "Test run started",
      description: `Testing "${formData.name}" flow...`,
      duration: 3000,
    });
  };

  const addAction = () => {
    setFormData(prev => ({
      ...prev,
      actions: [...prev.actions, { type: '', config: {} }]
    }));
  };

  const updateAction = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.map((action, i) => 
        i === index 
          ? field === 'type' 
            ? { ...action, type: value }
            : { ...action, config: { ...action.config, [field]: value } }
          : action
      )
    }));
  };

  const getFieldClassName = (fieldName: string) => {
    return cn(
      "transition-colors",
      touched[fieldName] && errors[fieldName] && "border-red-500 bg-red-50 dark:bg-red-950/20 focus:border-red-500"
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Flow Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Flow Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                onBlur={(e) => handleFieldBlur('name', e.target.value)}
                placeholder="e.g., Email to Drive Backup"
                className={getFieldClassName('name')}
              />
              {touched.name && errors.name && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                onBlur={(e) => handleFieldBlur('description', e.target.value)}
                placeholder="Describe what this flow does..."
                className={getFieldClassName('description')}
              />
              {touched.description && errors.description && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description}
                </div>
              )}
            </div>
          </div>

          {/* Trigger Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Trigger</h3>
            <div className="space-y-2">
              <Label>When this happens *</Label>
              <Select 
                value={formData.trigger} 
                onValueChange={(value) => handleFieldChange('trigger', value)}
              >
                <SelectTrigger className={getFieldClassName('trigger')}>
                  <SelectValue placeholder="Select a trigger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gmail-new-email">New Gmail Email</SelectItem>
                  <SelectItem value="google-drive-new-file">New Google Drive File</SelectItem>
                  <SelectItem value="calendar-event">Calendar Event</SelectItem>
                  <SelectItem value="webhook">Webhook</SelectItem>
                </SelectContent>
              </Select>
              {touched.trigger && errors.trigger && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.trigger}
                </div>
              )}
            </div>
          </div>

          {/* Actions Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Actions</h3>
            {formData.actions.map((action, index) => (
              <Card key={index}>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Action Type *</Label>
                    <Select 
                      value={action.type} 
                      onValueChange={(value) => updateAction(index, 'type', value)}
                    >
                      <SelectTrigger 
                        className={cn(
                          "transition-colors",
                          errors[`action_${index}_type`] && "border-red-500"
                        )}
                      >
                        <SelectValue placeholder="Select an action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="save-to-drive">Save to Google Drive</SelectItem>
                        <SelectItem value="send-email">Send Email</SelectItem>
                        <SelectItem value="create-calendar-event">Create Calendar Event</SelectItem>
                        <SelectItem value="send-slack-message">Send Slack Message</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors[`action_${index}_type`] && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors[`action_${index}_type`]}
                      </div>
                    )}
                  </div>

                  {action.type && (
                    <div className="space-y-4">
                      {action.type === 'save-to-drive' && (
                        <>
                          <div className="space-y-2">
                            <Label>Folder Path</Label>
                            <DynamicInput
                              label="Folder Path"
                              value={action.config.folderPath || ''}
                              onChange={(value) => updateAction(index, 'folderPath', value)}
                              placeholder="/My Files/Backups"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>File Name</Label>
                            <DynamicInput
                              label="File Name"
                              value={action.config.fileName || ''}
                              onChange={(value) => updateAction(index, 'fileName', value)}
                              placeholder="{{email.subject}}_{{date}}"
                            />
                          </div>
                        </>
                      )}

                      {action.type === 'send-email' && (
                        <>
                          <div className="space-y-2">
                            <Label>To</Label>
                            <DynamicInput
                              label="To"
                              value={action.config.to || ''}
                              onChange={(value) => updateAction(index, 'to', value)}
                              placeholder="recipient@example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Subject</Label>
                            <DynamicInput
                              label="Subject"
                              value={action.config.subject || ''}
                              onChange={(value) => updateAction(index, 'subject', value)}
                              placeholder="Flow notification: {{trigger.data}}"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Message</Label>
                            <Textarea
                              value={action.config.message || ''}
                              onChange={(e) => updateAction(index, 'message', e.target.value)}
                              placeholder="Hello, this is an automated message..."
                            />
                          </div>
                        </>
                      )}

                      {action.type === 'send-slack-message' && (
                        <>
                          <div className="space-y-2">
                            <Label>Channel</Label>
                            <DynamicInput
                              label="Channel"
                              value={action.config.channel || ''}
                              onChange={(value) => updateAction(index, 'channel', value)}
                              placeholder="#general"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Message</Label>
                            <DynamicInput
                              label="Message"
                              value={action.config.message || ''}
                              onChange={(value) => updateAction(index, 'message', value)}
                              placeholder="New email received: {{email.subject}}"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            <Button variant="outline" onClick={addAction}>
              + Add Another Action
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t">
            <Button 
              onClick={handleSave} 
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : 'Save Flow'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleTestRun}
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Test Run
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlowConfigurationForm;
