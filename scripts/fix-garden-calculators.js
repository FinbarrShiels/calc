const fs = require('fs');
const path = require('path');

// Target files to fix
const targetFiles = [
  'MulchCalculator.tsx',
  'GravelCalculator.tsx',
  'SquareMetersToSquareFtCalculator.tsx',
  'SquareFootageCalculator.tsx',
  'SquareFeetToCubicYdsCalculator.tsx',
  'SquareFeetToCubicFeetCalculator.tsx',
  'SquareFeetToAcresCalculator.tsx',
  'FlooringCalculator.tsx',
  'HowMuchFlooringCalculator.tsx',
  'PricePerSquareFootCalculator.tsx'
];

// Class replacements - expanded to include all common theme utility classes
const classReplacements = {
  // Result classes
  'resultLabelClasses': 'text-sm text-gray-600 dark:text-gray-300',
  'resultValueClasses': 'text-2xl font-semibold text-gray-900 dark:text-white mt-1',
  'resultDisplayClasses': 'calculator-result',
  
  // Button classes
  'buttonClasses': 'calculator-button',
  'secondaryButtonClasses': 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold py-2 px-4 rounded-md transition duration-200',
  'currencyButtonActiveClasses': 'bg-blue-600 text-white',
  'currencyButtonInactiveClasses': 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
  
  // Input classes
  'inputClasses': 'calculator-input',
  'selectClasses': 'calculator-select',
  'labelClasses': 'calculator-label',
  'inputPrefixClasses': 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400',
  'inputSuffixClasses': 'absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400',
  
  // Container classes
  'cardClasses': 'calculator-card',
  'calculatorSectionHeaderClasses': 'calculator-section-header'
};

// Process each file
targetFiles.forEach(fileName => {
  const filePath = path.join(process.cwd(), 'src', 'components', fileName);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Replace import statement
    if (content.includes('from \'@/utils/themeUtils\'')) {
      content = content.replace(/import\s*{[^}]*}\s*from\s*'@\/utils\/themeUtils';/, '');
      modified = true;
    }
    
    // Replace class references
    for (const [oldClass, newClass] of Object.entries(classReplacements)) {
      const regex = new RegExp(`className={${oldClass}}`, 'g');
      if (content.match(regex)) {
        content = content.replace(regex, `className="${newClass}"`);
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${fileName}`);
    } else {
      console.log(`No changes needed for ${fileName}`);
    }
  } else {
    console.log(`File not found: ${fileName}`);
  }
});

console.log('Done!'); 