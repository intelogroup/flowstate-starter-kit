
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedValue?: string;
}

export class SecureValidator {
  private static readonly MAX_INPUT_LENGTH = 1000;
  private static readonly EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  static sanitizeInput(input: string): string {
    if (!input || typeof input !== 'string') return '';
    
    return input
      .trim()
      .slice(0, this.MAX_INPUT_LENGTH) // Prevent excessively long inputs
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/data:/gi, '') // Remove data: protocol
      .replace(/vbscript:/gi, ''); // Remove vbscript: protocol
  }

  static validateEmail(email: string): ValidationResult {
    const sanitized = this.sanitizeInput(email).toLowerCase();
    const errors: string[] = [];

    if (!sanitized) {
      errors.push('Email is required');
      return { isValid: false, errors };
    }

    if (sanitized.length > 254) {
      errors.push('Email address is too long');
    }

    if (!this.EMAIL_REGEX.test(sanitized)) {
      errors.push('Please enter a valid email address');
    }

    // Check for potentially malicious patterns
    if (sanitized.includes('..') || sanitized.startsWith('.') || sanitized.endsWith('.')) {
      errors.push('Email format is invalid');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: sanitized
    };
  }

  static validatePassword(password: string): ValidationResult {
    const errors: string[] = [];

    if (!password) {
      errors.push('Password is required');
      return { isValid: false, errors };
    }

    if (password.length < 12) {
      errors.push('Password must be at least 12 characters long');
    }

    if (password.length > 128) {
      errors.push('Password is too long (maximum 128 characters)');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*(),.?":{}|<>[\]\\\/`~_+=\-]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    // Check for common weak patterns
    if (/(.)\1{3,}/.test(password)) {
      errors.push('Password cannot contain more than 3 consecutive identical characters');
    }

    if (/123456|abcdef|qwerty|password|admin|welcome|letmein|monkey|dragon/i.test(password)) {
      errors.push('Password contains common patterns and is not secure');
    }

    // Check for keyboard patterns
    const keyboardPatterns = [
      'qwertyuiop', 'asdfghjkl', 'zxcvbnm', 
      '1234567890', '0987654321',
      'qwerty', 'asdfgh', 'zxcvbn'
    ];

    const lowerPassword = password.toLowerCase();
    for (const pattern of keyboardPatterns) {
      if (lowerPassword.includes(pattern) && pattern.length >= 6) {
        errors.push('Password cannot contain keyboard patterns');
        break;
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateName(name: string): ValidationResult {
    const sanitized = this.sanitizeInput(name);
    const errors: string[] = [];

    if (!sanitized) {
      errors.push('Name is required');
      return { isValid: false, errors };
    }

    if (sanitized.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (sanitized.length > 100) {
      errors.push('Name is too long (maximum 100 characters)');
    }

    // Only allow letters, spaces, hyphens, and apostrophes
    if (!/^[a-zA-Z\s'-]+$/.test(sanitized)) {
      errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
    }

    // Prevent names that are all numbers or special characters
    if (!/[a-zA-Z]/.test(sanitized)) {
      errors.push('Name must contain at least one letter');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: sanitized
    };
  }

  static validateRequired(value: string, fieldName: string): ValidationResult {
    const sanitized = this.sanitizeInput(value);
    
    if (!sanitized) {
      return {
        isValid: false,
        errors: [`${fieldName} is required`]
      };
    }

    return {
      isValid: true,
      errors: [],
      sanitizedValue: sanitized
    };
  }

  static validateLength(value: string, min: number, max: number, fieldName: string): ValidationResult {
    const sanitized = this.sanitizeInput(value);
    const errors: string[] = [];

    if (sanitized.length < min) {
      errors.push(`${fieldName} must be at least ${min} characters long`);
    }

    if (sanitized.length > max) {
      errors.push(`${fieldName} must be no more than ${max} characters long`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: sanitized
    };
  }

  static getRateLimitKey(action: string, identifier: string): string {
    return `rate_limit_${action}_${identifier}`;
  }

  static checkRateLimit(action: string, identifier: string, maxAttempts: number, windowMs: number): boolean {
    const key = this.getRateLimitKey(action, identifier);
    const attempts = JSON.parse(sessionStorage.getItem(key) || '[]');
    const now = Date.now();
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter((timestamp: number) => 
      now - timestamp < windowMs
    );

    if (recentAttempts.length >= maxAttempts) {
      return false; // Rate limit exceeded
    }

    // Record this attempt
    recentAttempts.push(now);
    sessionStorage.setItem(key, JSON.stringify(recentAttempts));
    
    return true;
  }
}

export const secureValidation = SecureValidator;
