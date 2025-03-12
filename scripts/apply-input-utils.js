/**
 * This script automatically updates calculator components to use the inputUtils
 * for numeric keyboards on mobile devices.
 * 
 * Usage:
 * 1. Run this script with Node.js: node scripts/apply-input-utils.js
 * 2. The script will update all calculator components with numeric inputs
 * 3. Review the changes and commit them
 */

const fs = require('fs');
const path = require('path');

// Define the directory to search
const componentsDir = path.join(__dirname, '..', 'src', 'components');

// Find all calculator and converter components
const targetFiles = fs.readdirSync(componentsDir)
  .filter(file => file.endsWith('.tsx') && (
    file.includes('Calculator') || 
    file.includes('calculator') || 
    file.includes('Converter') || 
    file.includes('converter')
  ));

console.log(`Found ${targetFiles.length} calculator and converter components to check.`);

let updatedCount = 0;

// Process each file
targetFiles.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Check if the file already imports inputUtils
  const hasInputUtils = content.includes('inputUtils');
  
  // Check if the file has input fields
  const hasInputFields = content.includes('type="text"') || content.includes('type="number"');
  
  // Skip files that don't need updating
  if (hasInputUtils && !hasInputFields) {
    return;
  }
  
  // Add import statement for inputUtils if not already present
  if (!hasInputUtils) {
    console.log(`Adding inputUtils import to ${file}...`);
    
    // Determine which import to use based on the component
    const hasHandleNumberInput = content.includes('handleNumberInput');
    const hasValueStr = content.includes('valueStr') || content.includes('Str');
    
    let importStatement;
    if (hasHandleNumberInput) {
      importStatement = "import { decimalInputProps } from '@/utils/inputUtils';";
    } else if (hasValueStr) {
      importStatement = "import { decimalInputProps } from '@/utils/inputUtils';";
    } else {
      importStatement = "import { numericInputProps } from '@/utils/inputUtils';";
    }
    
    // Find the import section and add our import
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      // Find the end of the last import statement
      const endOfImportIndex = content.indexOf(';', lastImportIndex) + 1;
      // Insert our import after the last import
      content = content.substring(0, endOfImportIndex) + 
                '\n' + importStatement + 
                content.substring(endOfImportIndex);
    } else {
      // If no import section found, add it after the "use client" directive
      content = content.replace('"use client";', '"use client";\n\n' + importStatement);
    }
  }
  
  // Update input fields
  let updatedContent = content;
  
  // For components with handleNumberInput, use decimalInputProps
  if (content.includes('handleNumberInput')) {
    console.log(`Updating numeric inputs in ${file} with decimalInputProps...`);
    
    // Update inputs with handleNumberInput
    updatedContent = updatedContent.replace(
      /(<input[^>]*)(type=["'])(text|number)(["'][^>]*)(onChange=\{[^}]*handleNumberInput[^}]*\})/g,
      '$1type="tel"$5 {...decimalInputProps}'
    );
    
    // Catch any that might have been missed
    updatedContent = updatedContent.replace(
      /(<input[^>]*)(type=["'])(text|number)(["'][^>]*value=\{[^}]*\}[^>]*)(onChange=\{[^}]*handleNumberInput[^}]*\})/g,
      '$1type="tel"$5 {...decimalInputProps}'
    );
  } 
  // For components with valueStr or similar state variables
  else if (content.includes('valueStr') || /set\w+Str/.test(content)) {
    console.log(`Updating numeric inputs in ${file} with decimalInputProps (valueStr pattern)...`);
    
    // Update inputs with valueStr pattern
    updatedContent = updatedContent.replace(
      /(<input[^>]*)(type=["'])(text|number)(["'][^>]*value=\{)(\w+Str)(\}[^>]*onChange=\{)/g,
      '$1type="tel"$4$5$6'
    );
    
    // Add decimalInputProps after onChange
    updatedContent = updatedContent.replace(
      /(<input[^>]*value=\{\w+Str\}[^>]*onChange=\{[^}]*\})/g,
      '$1 {...decimalInputProps}'
    );
    
    // Handle handleValueChange pattern
    updatedContent = updatedContent.replace(
      /(<input[^>]*)(type=["'])(text|number)(["'][^>]*value=\{)(\w+)(\}[^>]*onChange=\{handle\w+Change\})/g,
      '$1type="tel"$4$5$6 {...decimalInputProps}'
    );
  }
  // For other components, use numericInputProps
  else {
    console.log(`Updating numeric inputs in ${file} with numericInputProps...`);
    
    // For other components, use numericInputProps
    updatedContent = updatedContent.replace(
      /(<input[^>]*)(type=["'])(text|number)(["'][^>]*value=\{[^}]*\})/g,
      '$1type="tel"$4 {...numericInputProps}'
    );
  }
  
  // If we already have inputUtils but still have text/number inputs, update them
  if (hasInputUtils) {
    if (content.includes('decimalInputProps')) {
      updatedContent = updatedContent.replace(
        /(<input[^>]*)(type=["'])(text|number)(["'][^>]*)/g,
        '$1type="tel"$4'
      );
    } else if (content.includes('numericInputProps')) {
      updatedContent = updatedContent.replace(
        /(<input[^>]*)(type=["'])(text|number)(["'][^>]*)/g,
        '$1type="tel"$4'
      );
    }
  }
  
  // Fix any duplicate type attributes
  updatedContent = updatedContent.replace(
    /type="tel"([^>]*)type="tel"/g,
    'type="tel"$1'
  );
  
  // Fix any missing spaces between attributes
  updatedContent = updatedContent.replace(
    /type="tel"onChange/g,
    'type="tel" onChange'
  );
  
  // Fix any extra quotes
  updatedContent = updatedContent.replace(
    /type="tel""/g,
    'type="tel"'
  );
  
  // Fix any issues with inputProps inside onChange
  updatedContent = updatedContent.replace(
    /onChange=\{\s*\{\.\.\.(\w+InputProps)\}([^}]*)\}/g,
    'onChange={$2} {...$1}'
  );
  
  // Write the updated content back to the file if changes were made
  if (updatedContent !== originalContent) {
    fs.writeFileSync(filePath, updatedContent);
    updatedCount++;
  }
});

console.log(`\nUpdated ${updatedCount} calculator and converter components.`);
console.log('\nIMPORTANT: This script made automated changes. Please review them before committing.');
console.log('Some components may need manual adjustments for optimal results.'); 