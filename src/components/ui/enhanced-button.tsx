
import { useState, forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(({
  children,
  loading = false,
  loadingText,
  icon,
  iconPosition = 'left',
  disabled,
  className,
  ...props
}, ref) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading && !disabled) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 150);
      props.onClick?.(e);
    }
  };

  const isDisabled = disabled || loading;
  const buttonText = loading && loadingText ? loadingText : children;

  return (
    <Button
      ref={ref}
      disabled={isDisabled}
      className={cn(
        "transition-all duration-150",
        isClicked && "scale-95",
        "active:scale-95",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {buttonText}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="mr-2">{icon}</span>
          )}
          {buttonText}
          {icon && iconPosition === 'right' && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
    </Button>
  );
});

EnhancedButton.displayName = 'EnhancedButton';
