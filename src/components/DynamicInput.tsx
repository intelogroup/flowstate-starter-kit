
import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DynamicDataPicker from './DynamicDataPicker';
import { FlowStep } from '@/hooks/useDynamicDataMapping';
import { cn } from '@/lib/utils';

interface DynamicInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  availableSteps: FlowStep[];
  multiline?: boolean;
  className?: string;
  disabled?: boolean;
  type?: string;
}

const DynamicInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, DynamicInputProps>(
  ({ value, onChange, placeholder, availableSteps, multiline = false, className, disabled, type = "text" }, ref) => {
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    const insertDynamicData = (placeholder: string) => {
      const input = inputRef.current;
      if (!input) return;

      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      
      const newValue = value.slice(0, start) + placeholder + value.slice(end);
      onChange(newValue);

      // Set cursor position after the inserted placeholder
      setTimeout(() => {
        const newCursorPos = start + placeholder.length;
        input.setSelectionRange(newCursorPos, newCursorPos);
        input.focus();
      }, 0);
    };

    const InputComponent = multiline ? Textarea : Input;

    return (
      <div className="relative">
        <InputComponent
          ref={inputRef as any}
          type={multiline ? undefined : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn("pr-10", className)}
          disabled={disabled}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <DynamicDataPicker
            availableSteps={availableSteps}
            onSelect={insertDynamicData}
            variant="braces"
            size="sm"
          />
        </div>
      </div>
    );
  }
);

DynamicInput.displayName = "DynamicInput";

export default DynamicInput;
