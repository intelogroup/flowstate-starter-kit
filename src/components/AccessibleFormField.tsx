
import { useState } from 'react';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { Label } from '@/components/ui/label';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FieldConfig {
  label: string;
  type?: string;
  placeholder?: string;
  rules?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
    email?: boolean;
    strongPassword?: boolean;
  };
}

interface AccessibleFormFieldProps {
  name: string;
  config: FieldConfig;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  showValidation?: boolean;
  className?: string;
}

export const AccessibleFormField = ({
  name,
  config,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  showValidation = true,
  className
}: AccessibleFormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = config.type === 'password';
  const hasError = !!error;
  const isValid = showValidation && !hasError && value.length > 0;
  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;
  const helpId = `${fieldId}-help`;

  const getAriaDescribedBy = () => {
    const ids = [];
    if (hasError) ids.push(errorId);
    if (config.rules?.required) ids.push(helpId);
    return ids.length > 0 ? ids.join(' ') : undefined;
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label 
        htmlFor={fieldId}
        className={cn(
          "text-sm font-medium leading-6 tracking-wide",
          hasError && "text-destructive",
          config.rules?.required && "after:content-['*'] after:ml-1 after:text-destructive after:font-bold"
        )}
      >
        {config.label}
      </Label>
      
      {/* Help text for required fields */}
      {config.rules?.required && (
        <p id={helpId} className="sr-only">
          This field is required
        </p>
      )}
      
      <div className="relative group">
        <EnhancedInput
          id={fieldId}
          name={name}
          type={isPassword ? (showPassword ? 'text' : 'password') : config.type || 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          placeholder={config.placeholder}
          disabled={disabled}
          hasError={hasError}
          isValid={isValid}
          aria-invalid={hasError}
          aria-describedby={getAriaDescribedBy()}
          aria-required={config.rules?.required}
          autoComplete={
            config.type === 'email' ? 'email' :
            config.type === 'password' ? 'current-password' :
            name === 'fullName' ? 'name' :
            undefined
          }
          className={cn(
            isPassword && "pr-12"
          )}
        />
        
        {/* Password visibility toggle */}
        {isPassword && (
          <EnhancedButton
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent/50"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </EnhancedButton>
        )}
        
        {/* Validation indicator */}
        {showValidation && value.length > 0 && !isPassword && (
          <div 
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            aria-hidden="true"
          >
            {hasError ? (
              <AlertTriangle className="h-4 w-4 text-destructive" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
          </div>
        )}
      </div>
      
      {/* Error message */}
      {hasError && (
        <div 
          id={errorId} 
          className="flex items-start gap-2 text-sm text-destructive"
          role="alert"
          aria-live="polite"
        >
          <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
