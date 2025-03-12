/**
 * Utility functions for input fields
 */

/**
 * Common props to apply to numeric input fields to ensure they show a numeric keyboard on mobile
 * 
 * Usage:
 * <input
 *   type="tel"
 *   {...numericInputProps}
 *   value={value}
 *   onChange={(e) => handleChange(e.target.value)}
 * />
 */
export const numericInputProps = {
  inputMode: 'numeric' as const,
  pattern: '[0-9]*',
  autoComplete: 'off',
  autoCorrect: 'off',
  spellCheck: false,
};

/**
 * Common props to apply to decimal input fields to ensure they show a numeric keyboard on mobile
 * 
 * Usage:
 * <input
 *   type="tel"
 *   {...decimalInputProps}
 *   value={value}
 *   onChange={(e) => handleChange(e.target.value)}
 * />
 */
export const decimalInputProps = {
  inputMode: 'decimal' as const,
  pattern: '[0-9]*\\.?[0-9]*',
  autoComplete: 'off',
  autoCorrect: 'off',
  spellCheck: false,
};

/**
 * Common props to apply to integer input fields that can be negative
 * 
 * Usage:
 * <input
 *   type="tel"
 *   {...negativeIntegerInputProps}
 *   value={value}
 *   onChange={(e) => handleChange(e.target.value)}
 * />
 */
export const negativeIntegerInputProps = {
  inputMode: 'numeric' as const,
  pattern: '-?[0-9]*',
  autoComplete: 'off',
  autoCorrect: 'off',
  spellCheck: false,
};

/**
 * Common props to apply to decimal input fields that can be negative
 * 
 * Usage:
 * <input
 *   type="tel"
 *   {...negativeDecimalInputProps}
 *   value={value}
 *   onChange={(e) => handleChange(e.target.value)}
 * />
 */
export const negativeDecimalInputProps = {
  inputMode: 'decimal' as const,
  pattern: '-?[0-9]*\\.?[0-9]*',
  autoComplete: 'off',
  autoCorrect: 'off',
  spellCheck: false,
}; 