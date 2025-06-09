
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormValidation } from '@/hooks/useFormValidation';
import ValidatedInput from './ValidatedInput';

const ValidatedFormDemo = () => {
  const [formData, setFormData] = useState({
    flowName: '',
    description: '',
    email: '',
    trigger: ''
  });

  const fieldConfigs = {
    flowName: {
      required: true,
      minLength: 3,
      maxLength: 50
    },
    description: {
      required: true,
      minLength: 10,
      maxLength: 200
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    trigger: {
      required: true,
      minLength: 2
    }
  };

  const {
    validateForm,
    getFieldProps,
    showSuccessToast,
    showErrorToast,
    hasErrors
  } = useFormValidation(fieldConfigs);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const fieldProps = getFieldProps(field);
    fieldProps.onChange(value);
  };

  const handleInputBlur = (field: string) => {
    const fieldProps = getFieldProps(field);
    fieldProps.onBlur(formData[field]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = validateForm(formData);
    
    if (isValid) {
      console.log('Form submitted:', formData);
      showSuccessToast('Flow configuration saved successfully!');
      
      // Reset form after successful submission
      setFormData({
        flowName: '',
        description: '',
        email: '',
        trigger: ''
      });
    } else {
      showErrorToast('Please fix the validation errors and try again.');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Enhanced Form Validation Demo</CardTitle>
        <p className="text-sm text-muted-foreground">
          Try leaving fields empty or entering invalid data to see the validation in action.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ValidatedInput
            id="flowName"
            label="Flow Name"
            value={formData.flowName}
            onChange={(value) => handleInputChange('flowName', value)}
            onBlur={() => handleInputBlur('flowName')}
            placeholder="Enter flow name (3-50 characters)"
            required
            {...getFieldProps('flowName')}
          />

          <ValidatedInput
            id="description"
            label="Description"
            value={formData.description}
            onChange={(value) => handleInputChange('description', value)}
            onBlur={() => handleInputBlur('description')}
            placeholder="Describe what this flow does (10-200 characters)"
            required
            {...getFieldProps('description')}
          />

          <ValidatedInput
            id="email"
            label="Notification Email"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            onBlur={() => handleInputBlur('email')}
            placeholder="Enter a valid email address"
            required
            {...getFieldProps('email')}
          />

          <ValidatedInput
            id="trigger"
            label="Trigger Event"
            value={formData.trigger}
            onChange={(value) => handleInputChange('trigger', value)}
            onBlur={() => handleInputBlur('trigger')}
            placeholder="Enter trigger event name"
            required
            {...getFieldProps('trigger')}
          />

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit"
              className="flex-1"
              disabled={hasErrors}
            >
              Save Flow Configuration
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setFormData({
                flowName: '',
                description: '',
                email: '',
                trigger: ''
              })}
            >
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ValidatedFormDemo;
