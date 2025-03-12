/**
 * This script helps identify calculator components that need to be updated
 * to use the new inputUtils for numeric keyboards on mobile devices.
 * 
 * Usage:
 * 1. Run this script with Node.js: node scripts/update-input-fields.js
 * 2. The script will output a list of files that need to be updated
 * 3. Follow the instructions in src/utils/README.md to update each file
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define the directory to search
const componentsDir = path.join(__dirname, '..', 'src', 'components');

// Find all calculator components
const calculatorFiles = fs.readdirSync(componentsDir)
  .filter(file => file.endsWith('.tsx') && (file.includes('Calculator') || file.includes('calculator')));

console.log(`Found ${calculatorFiles.length} calculator components to check:`);

// Check each file for input fields that need to be updated
calculatorFiles.forEach(file => {
  const filePath = path.join(componentsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file already imports inputUtils
  const hasInputUtils = content.includes('inputUtils');
  
  // Check if the file has input fields
  const hasInputFields = content.includes('type="text"') || content.includes('type="number"');
  
  // Check if the file has numeric input fields that need to be updated
  const needsUpdate = hasInputFields && !hasInputUtils;
  
  if (needsUpdate) {
    console.log(`- ${file} needs to be updated`);
    
    // Count the number of input fields
    const inputFieldCount = (content.match(/type="text"|type="number"/g) || []).length;
    console.log(`  Contains ${inputFieldCount} input fields`);
    
    // Check if the file has a handleNumberInput function
    const hasHandleNumberInput = content.includes('handleNumberInput');
    if (hasHandleNumberInput) {
      console.log('  Has handleNumberInput function - likely needs decimalInputProps');
    }
    
    // Check if the file has integer-only inputs
    const hasIntegerOnlyRegex = content.includes('/^\\d*$/');
    if (hasIntegerOnlyRegex) {
      console.log('  Has integer-only validation - likely needs numericInputProps');
    }
    
    console.log('');
  }
});

console.log('\nTo update these files:');
console.log('1. Import the appropriate utility function:');
console.log('   import { decimalInputProps, numericInputProps } from \'@/utils/inputUtils\';');
console.log('2. Change input type from "text" or "number" to "tel":');
console.log('   <input type="tel" ... />');
console.log('3. Add the appropriate props to each input field:');
console.log('   <input type="tel" {...decimalInputProps} />');
console.log('4. See src/utils/README.md for more details');
console.log('\nIMPORTANT: Using type="tel" is crucial for showing numeric keyboards on mobile devices!'); 