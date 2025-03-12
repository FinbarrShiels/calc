const fs = require('fs');
const path = require('path');

const componentsDir = path.join(process.cwd(), 'src', 'components');

// Improved class mappings from Shadcn to Tailwind with better contrast
const classReplacements = {
  // Background colors with better contrast hierarchy
  'bg-card': 'bg-gray-50 dark:bg-gray-800',
  'bg-primary': 'bg-blue-600 dark:bg-blue-700',
  'bg-secondary': 'bg-gray-200 dark:bg-gray-700',
  'bg-muted': 'bg-gray-100 dark:bg-gray-800',
  'bg-muted/50': 'bg-gray-100/50 dark:bg-gray-800/50',
  'bg-accent': 'bg-blue-50 dark:bg-blue-900',
  'bg-background': 'bg-white dark:bg-gray-900',
  
  // Text colors
  'text-primary': 'text-blue-600 dark:text-blue-400',
  'text-primary-foreground': 'text-white dark:text-gray-100',
  'text-secondary': 'text-gray-700 dark:text-gray-300',
  'text-secondary-foreground': 'text-gray-900 dark:text-gray-100',
  'text-muted-foreground': 'text-gray-500 dark:text-gray-400',
  'text-accent-foreground': 'text-blue-900 dark:text-blue-100',
  'text-foreground': 'text-gray-900 dark:text-white',
  
  // Border colors
  'border-border': 'border-gray-200 dark:border-gray-700',
  'border-input': 'border-gray-300 dark:border-gray-600',
  'border-primary': 'border-blue-600 dark:border-blue-500',
  'border-secondary': 'border-gray-200 dark:border-gray-700',
  
  // Ring colors
  'ring-ring': 'ring-gray-200 dark:ring-gray-700',
  
  // Other
  'hocus:bg-accent': 'hover:bg-blue-50 focus:bg-blue-50 dark:hover:bg-blue-900 dark:focus:bg-blue-900',
};

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Replace class references
  for (const [oldClass, newClass] of Object.entries(classReplacements)) {
    if (content.includes(oldClass)) {
      // Handle className="bg-card" pattern
      const regex1 = new RegExp(`className="([^"]*\\s)?${oldClass}(\\s[^"]*)?"|className='([^']*\\s)?${oldClass}(\\s[^']*)?'`, 'g');
      content = content.replace(regex1, (match) => {
        modified = true;
        return match.replace(oldClass, newClass);
      });
      
      // Handle className={`...${oldClass}...`} pattern
      const regex2 = new RegExp(`\\$\\{[^}]*\\b${oldClass}\\b[^}]*\\}`, 'g');
      content = content.replace(regex2, (match) => {
        modified = true;
        return match.replace(oldClass, newClass);
      });
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
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      fixFile(fullPath);
    }
  });
}

// Start processing
console.log('Fixing Shadcn class references with improved contrast...');
processDirectory(componentsDir);
console.log('Done!'); 