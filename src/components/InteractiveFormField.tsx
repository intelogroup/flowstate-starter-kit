
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface InteractiveFormFieldProps {
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'multiselect' | 'switch' | 'checkbox' | 'tags' | 'dropdown';
  label: string;
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  options?: Option[];
  required?: boolean;
  disabled?: boolean;
  description?: string;
  className?: string;
}

const InteractiveFormField = ({
  type,
  label,
  value,
  onChange = () => {},
  placeholder,
  options = [],
  required = false,
  disabled = false,
  description,
  className
}: InteractiveFormFieldProps) => {
  const [localValue, setLocalValue] = useState(value || '');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(value || []);
  const [tagInput, setTagInput] = useState('');

  const handleChange = (newValue: any) => {
    setLocalValue(newValue);
    onChange(newValue);
  };

  const addTag = () => {
    if (tagInput.trim() && !selectedTags.includes(tagInput.trim())) {
      const newTags = [...selectedTags, tagInput.trim()];
      setSelectedTags(newTags);
      onChange(newTags);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = selectedTags.filter(tag => tag !== tagToRemove);
    setSelectedTags(newTags);
    onChange(newTags);
  };

  const renderField = () => {
    switch (type) {
      case 'password':
        return (
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              value={localValue}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            </Button>
          </div>
        );

      case 'textarea':
        return (
          <Textarea
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={4}
          />
        );

      case 'select':
        return (
          <Select value={localValue} onValueChange={handleChange} disabled={disabled}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect':
        return (
          <Card>
            <CardContent className="p-3">
              <div className="space-y-2">
                {options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.value}
                      checked={selectedTags.includes(option.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          const newTags = [...selectedTags, option.value];
                          setSelectedTags(newTags);
                          onChange(newTags);
                        } else {
                          removeTag(option.value);
                        }
                      }}
                      disabled={disabled}
                    />
                    <Label htmlFor={option.value} className="text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'switch':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={localValue}
              onCheckedChange={handleChange}
              disabled={disabled}
            />
            <Label className="text-sm">{localValue ? 'Enabled' : 'Disabled'}</Label>
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={localValue}
              onCheckedChange={handleChange}
              disabled={disabled}
            />
            <Label className="text-sm">{label}</Label>
          </div>
        );

      case 'tags':
        return (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder={placeholder || "Enter tag and press Enter"}
                disabled={disabled}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTag}
                disabled={disabled || !tagInput.trim()}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-3 w-3 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeTag(tag)}
                    disabled={disabled}
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        );

      case 'dropdown':
        return (
          <div className="relative">
            <Button
              variant="outline"
              className="w-full justify-between"
              disabled={disabled}
            >
              {localValue || placeholder}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        );

      default:
        return (
          <Input
            type={type}
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {type !== 'checkbox' && (
        <Label className={cn("text-sm font-medium", required && "after:content-['*'] after:ml-1 after:text-destructive")}>
          {label}
        </Label>
      )}
      {renderField()}
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default InteractiveFormField;
