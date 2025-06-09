
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldError } from '@/components/ValidationErrorDisplay';
import { cn } from '@/lib/utils';

interface EnhancedValidatedInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  onBlur?: (value: string) => void;
  onValidate?: (value: string) => string | null;
  className?: string;
}

const EnhancedValidatedInput = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  hasError = false,
  errorMessage = '',
  onBlur,
  onValidate,
  className
}: EnhancedValidatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const displayError = hasError || localError;
  const displayErrorMessage = errorMessage || localError || '';

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setIsFocused(false);
    
    // Validate on blur if validator is provided
    if (onValidate) {
      const validationError = onValidate(currentValue);
      setLocalError(validationError);
    }
    
    // Check required field
    if (required && !currentValue.trim()) {
      setLocalError(`${label} is required`);
    }
    
    if (onBlur) {
      onBlur(currentValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Clear local error when user starts typing again
    if (localError) {
      setLocalError(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    // Clear error when user starts typing
    if (localError && newValue.trim()) {
      setLocalError(null);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label 
        htmlFor={id}
        className={cn(
          "text-sm font-medium",
          displayError && "text-destructive",
          required && "after:content-['*'] after:ml-0.5 after:text-destructive"
        )}
      >
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={cn(
          "transition-colors",
          displayError && "border-destructive bg-destructive/5 focus:border-destructive focus-visible:ring-destructive",
          isFocused && !displayError && "border-primary focus-visible:ring-primary"
        )}
        aria-invalid={displayError}
        aria-describedby={displayError ? `${id}-error` : undefined}
      />
      {displayError && displayErrorMessage && (
        <FieldError message={displayErrorMessage} />
      )}
    </div>
  );
};

export default EnhancedValidatedInput;
