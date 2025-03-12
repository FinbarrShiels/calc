const fs = require('fs');
const path = require('path');

const componentsDir = path.join(process.cwd(), 'src', 'components');

// Class mappings
const classReplacements = {
  'calculatorSectionHeaderClasses': 'calculator-section-header',
  'resultLabelClasses': 'text-sm text-gray-600 dark:text-gray-300',
  'resultValueClasses': 'text-2xl font-semibold text-gray-900 dark:text-white mt-1',
  'calculatorSectionDescriptionClasses': 'text-sm text-gray-600 dark:text-gray-300 mb-4'
};

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Replace class references
  for (const [oldClass, newClass] of Object.entries(classReplacements)) {
    if (content.includes(oldClass)) {
      const regex = new RegExp(`className={${oldClass}}`, 'g');
      content = content.replace(regex, `className="${newClass}"`);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx') && file.includes('Converter') || file.includes('Calculator')) {
      fixFile(fullPath);
    }
  });
}

// Start processing
console.log('Fixing calculator class references...');
processDirectory(componentsDir);
console.log('Done!'); 