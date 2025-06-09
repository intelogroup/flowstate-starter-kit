
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DynamicDataPicker from "./DynamicDataPicker";

interface DataField {
  key: string;
  label: string;
  type: string;
  example?: string;
}

interface DataStep {
  stepId: string;
  stepName: string;
  stepType: string;
  fields: DataField[];
}

interface DynamicInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  availableData?: DataStep[];
  error?: string;
  className?: string;
}

const DynamicInput = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  availableData = [],
  error,
  className = ""
}: DynamicInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleDataSelect = (placeholder: string) => {
    const newValue = inputValue + placeholder;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={label} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className="relative flex items-center gap-2">
        <Input
          id={label}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={error ? "border-destructive" : ""}
        />
        {availableData.length > 0 && (
          <DynamicDataPicker
            availableData={availableData}
            onSelect={handleDataSelect}
            variant="outline"
            size="sm"
          />
        )}
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default DynamicInput;
