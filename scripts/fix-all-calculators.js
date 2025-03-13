const fs = require('fs');
const path = require('path');

const componentsDir = path.join(process.cwd(), 'src', 'components');

// Class replacements - comprehensive list of all theme utility classes
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

// Process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Check if file imports from themeUtils
    if (content.includes('from \'@/utils/themeUtils\'')) {
      // Replace import statement
      content = content.replace(/import\s*{[^}]*}\s*from\s*'@\/utils\/themeUtils';/, '');
      modified = true;
      
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
        console.log(`Updated ${path.basename(filePath)}`);
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Process all files in the components directory
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let updatedCount = 0;
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other non-component directories
      if (!file.startsWith('.') && file !== 'node_modules') {
        updatedCount += processDirectory(fullPath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      if (processFile(fullPath)) {
        updatedCount++;
      }
    }
  });
  
  return updatedCount;
}

console.log('Fixing theme utility classes in all calculator components...');
const updatedCount = processDirectory(componentsDir);
console.log(`Done! Updated ${updatedCount} files.`); 