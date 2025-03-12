const fs = require('fs');
const path = require('path');

const componentsDir = path.join(process.cwd(), 'src', 'components');

// Specific patterns to fix
const readabilityFixes = [
  // Fix nested backgrounds with same color
  {
    pattern: /className="([^"]*\s)?(bg-white|bg-gray-\d+)([^"]*\s)?(dark:bg-gray-\d+)([^"]*)"\s*>\s*<div[^>]*className="([^"]*\s)?(bg-white|bg-gray-\d+)([^"]*\s)?(dark:bg-gray-\d+)/g,
    replacement: (match, p1, p2, p3, p4, p5, p6, p7, p8, p9) => {
      // Keep the outer background, change the inner one to use calculator-card or calculator-card-alt
      return match.replace(
        /(bg-white|bg-gray-\d+)([^"]*\s)?(dark:bg-gray-\d+)([^"]*)"\s*>\s*<div[^>]*className="([^"]*\s)?(bg-white|bg-gray-\d+)([^"]*\s)?(dark:bg-gray-\d+)/,
        `$1$2$3$4">\n      <div className="calculator-card`
      );
    }
  },
  
  // Fix common shadcn class patterns
  {
    pattern: /className="([^"]*\s)?bg-background([^"]*)"/g,
    replacement: 'className="$1bg-white dark:bg-gray-900$2"'
  },
  {
    pattern: /className="([^"]*\s)?bg-card([^"]*)"/g,
    replacement: 'className="$1calculator-card$2"'
  },
  {
    pattern: /className="([^"]*\s)?bg-muted([^"]*)"/g,
    replacement: 'className="$1calculator-bg-secondary$2"'
  },
  {
    pattern: /className="([^"]*\s)?bg-muted\/50([^"]*)"/g,
    replacement: 'className="$1bg-gray-100/50 dark:bg-gray-800/50$2"'
  },
  
  // Fix text colors
  {
    pattern: /className="([^"]*\s)?text-foreground([^"]*)"/g,
    replacement: 'className="$1text-gray-900 dark:text-white$2"'
  },
  {
    pattern: /className="([^"]*\s)?text-primary([^"]*)"/g,
    replacement: 'className="$1calculator-text-primary$2"'
  },
  {
    pattern: /className="([^"]*\s)?text-primary-foreground([^"]*)"/g,
    replacement: 'className="$1text-white dark:text-gray-100$2"'
  },
  {
    pattern: /className="([^"]*\s)?text-muted-foreground([^"]*)"/g,
    replacement: 'className="$1text-gray-500 dark:text-gray-400$2"'
  },
  
  // Fix borders
  {
    pattern: /className="([^"]*\s)?border-border([^"]*)"/g,
    replacement: 'className="$1border-gray-200 dark:border-gray-700$2"'
  },
  
  // Fix specific component patterns
  {
    pattern: /<div className="space-y-4">\s*<h2[^>]*>([^<]+)<\/h2>/g,
    replacement: '<div className="space-y-4">\n      <h2 className="calculator-section-header">$1</h2>'
  },
  
  // Fix table patterns
  {
    pattern: /<table className="([^"]*)">/g,
    replacement: '<table className="calculator-table">'
  },
  {
    pattern: /<th className="([^"]*)">/g,
    replacement: '<th className="calculator-table-header">'
  },
  {
    pattern: /<td className="([^"]*)">/g,
    replacement: '<td className="calculator-table-cell">'
  }
];

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Apply each fix pattern
  for (const fix of readabilityFixes) {
    if (content.match(fix.pattern)) {
      content = content.replace(fix.pattern, fix.replacement);
      modified = true;
    }
  }

  // Apply specific fixes for nested elements with same background
  if (content.includes('bg-white') && content.includes('dark:bg-gray-')) {
    // Alternate between calculator-card and calculator-card-alt for nested elements
    let depth = 0;
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('<div') && lines[i].includes('className=')) {
        depth++;
        if (depth > 1 && lines[i].includes('bg-white') && lines[i].includes('dark:bg-gray-')) {
          // Use alternating card styles based on depth
          const cardClass = depth % 2 === 0 ? 'calculator-card' : 'calculator-card-alt';
          lines[i] = lines[i].replace(/(className="[^"]*)(bg-white[^"]*dark:bg-gray-\d+)([^"]*")/, `$1${cardClass}$3`);
          modified = true;
        }
      }
      if (lines[i].includes('</div>')) {
        depth = Math.max(0, depth - 1);
      }
    }
    content = lines.join('\n');
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
    } else if ((file.endsWith('.tsx') || file.endsWith('.jsx')) && 
               (file.includes('Calculator') || file.includes('Converter'))) {
      fixFile(fullPath);
    }
  });
}

// Start processing
console.log('Fixing calculator readability issues...');
processDirectory(componentsDir);
console.log('Done!'); 