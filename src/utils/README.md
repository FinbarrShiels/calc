# Input Utilities

This directory contains utility functions for input fields in the calculator components.

## Numeric Keyboard on Mobile Devices

To ensure that numeric input fields show a numeric keyboard on mobile devices, we've created utility functions in `inputUtils.ts` that provide the necessary HTML attributes.

### Available Utilities

- `numericInputProps`: For integer input fields (no decimals)
- `decimalInputProps`: For decimal input fields
- `negativeIntegerInputProps`: For integer input fields that can be negative
- `negativeDecimalInputProps`: For decimal input fields that can be negative

### How to Use

1. Import the appropriate utility function from `@/utils/inputUtils`
2. Set the input type to `tel` (this is crucial for mobile keyboards)
3. Apply the utility props to your input field using the spread operator

```tsx
import { decimalInputProps } from '@/utils/inputUtils';

// In your component:
<input
  type="tel"
  value={value}
  onChange={(e) => handleChange(e.target.value)}
  {...decimalInputProps}
/>
```

### Implementation Details

The utility functions add the following HTML attributes to input fields:

- `inputMode`: Specifies the type of input mechanism that is most helpful for users (`numeric` or `decimal`)
- `pattern`: Provides a regular expression for validation and helps mobile browsers determine which keyboard to show
- `autoComplete`, `autoCorrect`, and `spellCheck`: Disable unwanted text assistance features

### Why `type="tel"` Instead of `type="number"`?

We use `type="tel"` for numeric inputs because:

1. It consistently shows a numeric keypad on iOS and Android devices
2. Unlike `type="number"`, it doesn't add unwanted spinner controls
3. It allows for custom validation logic while still showing the right keyboard
4. It works better with decimal points and special characters than `type="number"`

### Example

```tsx
// For a decimal input field:
<input
  type="tel"
  value={value}
  onChange={(e) => handleChange(e.target.value)}
  {...decimalInputProps}
/>

// For an integer input field:
<input
  type="tel"
  value={value}
  onChange={(e) => handleChange(e.target.value)}
  {...numericInputProps}
/>
```

### Notes

- The combination of `type="tel"` and `inputMode="numeric"` provides the most consistent numeric keyboard experience across devices
- The `pattern` attribute helps with HTML5 validation but doesn't replace JavaScript validation in your handlers
- For existing components using `type="text"`, be sure to change them to `type="tel"` when adding these utilities 