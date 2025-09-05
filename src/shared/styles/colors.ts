export const colors = {
  // Primary Colors
  white: 'var(--color-white)',
  black: 'var(--color-black)',

  // Gray Scale
  gray50: 'var(--color-gray-50)',
  gray100: 'var(--color-gray-100)',
  gray200: 'var(--color-gray-200)',
  gray300: 'var(--color-gray-300)',
  gray400: 'var(--color-gray-400)',
  gray500: 'var(--color-gray-500)',
  gray600: 'var(--color-gray-600)',
  gray700: 'var(--color-gray-700)',
  gray800: 'var(--color-gray-800)',
  gray900: 'var(--color-gray-900)',

  // Text Colors
  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',

  // Background Colors
  backgroundLight: 'var(--color-background-light)',
  backgroundDark: 'var(--color-background-dark)',
  formBackground: 'var(--color-form-background)',
  inputBackground: 'var(--color-input-background)',

  // Border Colors
  borderLight: 'var(--color-border-light)',

  // Shadow Colors
  shadowLight: 'var(--color-shadow-light)',

  // Hover Colors
  buttonHover: 'var(--color-button-hover)',
  // Focus Colors
  buttonFocus: 'var(--color-button-focus)',
  // Button Colors
  buttonPrimary: 'var(--color-button-primary)',
  buttonSecondary: 'var(--color-button-secondary)',

  // Error Colors
  errorText: 'var(--color-error-text)',
  errorBorder: 'var(--color-error-border)',
  successText: 'var(--color-success-text)',
} as const;

export type ColorKey = keyof typeof colors;
