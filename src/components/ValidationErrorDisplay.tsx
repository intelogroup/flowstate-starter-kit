
import { AlertTriangle } from "lucide-react";

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationErrorDisplayProps {
  errors: ValidationError[];
  className?: string;
}

export const ValidationErrorDisplay = ({ errors, className = "" }: ValidationErrorDisplayProps) => {
  if (errors.length === 0) return null;

  return (
    <div className={`border border-red-200 bg-red-50 dark:bg-red-950 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
        <div className="flex-1">
          <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
            Please fix the following errors:
          </h4>
          <ul className="space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-sm text-red-700 dark:text-red-300">
                <strong>{error.field}:</strong> {error.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

interface FieldErrorProps {
  message: string;
  className?: string;
}

export const FieldError = ({ message, className = "" }: FieldErrorProps) => (
  <div className={`flex items-center gap-2 text-sm text-red-600 dark:text-red-400 mt-1 ${className}`}>
    <AlertTriangle className="w-3 h-3" />
    <span>{message}</span>
  </div>
);
