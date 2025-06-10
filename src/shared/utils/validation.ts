
export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

export const isMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const isMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const isNumeric = (value: string): boolean => {
  return !isNaN(Number(value)) && !isNaN(parseFloat(value));
};

export const isUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
