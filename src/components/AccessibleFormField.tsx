
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FieldConfig } from './FormValidation';

interface AccessibleFormFieldProps {
  name: string;
  config: FieldConfig;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const AccessibleFormField = ({
  name,
  config,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  className = ""
}: AccessibleFormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = config.type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : config.type;

  const inputId = `field-${name}`;
  const errorId = `${inputId}-error`;
  const descriptionId = `${inputId}-description`;

  return (
    <div className={`space-y-2 ${className}`}>
      <Label 
        htmlFor={inputId}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          error && "text-destructive"
        )}
      >
        {config.label}
        {config.rules.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <div className="relative">
        <Input
          id={inputId}
          name={name}
          type={inputType}
          placeholder={config.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={cn(
            error && errorId,
            config.placeholder && descriptionId
          )}
          className={cn(
            "pr-10",
            error && "border-destructive focus-visible:ring-destructive"
          )}
        />
        
        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        )}
        
        {error && !isPassword && (
          <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-destructive" />
        )}
      </div>
      
      {error && (
        <p 
          id={errorId}
          className="text-sm text-destructive flex items-center gap-1"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
      
      {config.placeholder && !error && (
        <p 
          id={descriptionId}
          className="text-xs text-muted-foreground"
        >
          {getFieldDescription(config)}
        </p>
      )}
    </div>
  );
};

const getFieldDescription = (config: FieldConfig): string => {
  const descriptions: string[] = [];
  
  if (config.rules.minLength) {
    descriptions.push(`Minimum ${config.rules.minLength} characters`);
  }
  
  if (config.rules.maxLength) {
    descriptions.push(`Maximum ${config.rules.maxLength} characters`);
  }
  
  if (config.rules.strongPassword) {
    descriptions.push('Must include uppercase, lowercase, number');
  }
  
  if (config.rules.email) {
    descriptions.push('Valid email format required');
  }
  
  return descriptions.join(', ');
};
