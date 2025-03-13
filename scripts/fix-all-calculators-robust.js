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
    
    // Check if file contains any of the class names we're looking for
    const containsClassNames = Object.keys(classReplacements).some(className => 
      content.includes(className)
    );
    
    if (containsClassNames) {
      // Replace import statement if it exists
      if (content.includes('from \'@/utils/themeUtils\'')) {
        content = content.replace(/import\s*{[^}]*}\s*from\s*'@\/utils\/themeUtils';/, '');
        modified = true;
      }
      
      // Replace class references in different formats
      for (const [oldClass, newClass] of Object.entries(classReplacements)) {
        // Format: className={resultLabelClasses}
        const regex1 = new RegExp(`className={${oldClass}}`, 'g');
        if (content.match(regex1)) {
          content = content.replace(regex1, `className="${newClass}"`);
          modified = true;
        }
        
        // Format: className={`${resultLabelClasses}`}
        const regex2 = new RegExp(`className={\`\\\${${oldClass}}\`}`, 'g');
        if (content.match(regex2)) {
          content = content.replace(regex2, `className="${newClass}"`);
          modified = true;
        }
        
        // Format: className={`${resultLabelClasses} additional-class`}
        const regex3 = new RegExp(`className={\`\\\${${oldClass}}([^}]*)\`}`, 'g');
        if (content.match(regex3)) {
          content = content.replace(regex3, (match, additionalClasses) => {
            return `className="${newClass}${additionalClasses}"`;
          });
          modified = true;
        }
        
        // Format: className={\`additional-class \${resultLabelClasses}\`}
        const regex4 = new RegExp(`className={\`([^}]*)\\\${${oldClass}}\`}`, 'g');
        if (content.match(regex4)) {
          content = content.replace(regex4, (match, additionalClasses) => {
            return `className="${additionalClasses}${newClass}"`;
          });
          modified = true;
        }
        
        // Format: className={\`\${someCondition ? resultLabelClasses : otherClass}\`}
        const regex5 = new RegExp(`(className={\`[^}]*)\\\${[^}]*\\?\\s*${oldClass}\\s*:[^}]*}([^}]*\`})`, 'g');
        if (content.match(regex5)) {
          content = content.replace(regex5, (match, before, after) => {
            // This is a complex case, so we'll just add a comment for manual review
            return `${before}${newClass}${after} {/* REVIEW: Replaced conditional class */}`;
          });
          modified = true;
        }
        
        // Direct variable reference without className
        const regex6 = new RegExp(`\\b${oldClass}\\b(?!.*className)`, 'g');
        if (content.match(regex6)) {
          // Add a constant at the top of the file
          if (!content.includes(`const ${oldClass} = "${newClass}";`)) {
            const importStatements = content.match(/import [^;]+;/g) || [];
            const lastImport = importStatements[importStatements.length - 1];
            if (lastImport) {
              content = content.replace(
                lastImport,
                `${lastImport}\n\n// Added by fix-all-calculators script\nconst ${oldClass} = "${newClass}";`
              );
            } else {
              content = `// Added by fix-all-calculators script\nconst ${oldClass} = "${newClass}";\n\n${content}`;
            }
            modified = true;
          }
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