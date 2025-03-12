const fs = require('fs');
const path = require('path');

// Directory containing the components
const componentsDir = path.join(__dirname, '../src/components');

// Function to update imports in a file
function updateImportsInFile(filePath) {
  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file imports from themeUtils
    if (content.includes("from '@/utils/themeUtils'")) {
      // Replace the import with the new one
      content = content.replace(
        /from '@\/utils\/themeUtils'/g, 
        "from '@/utils/theme-utils'"
      );
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated imports in ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
    return false;
  }
}

// Function to process all files in a directory
function processDirectory(directory) {
  let updatedCount = 0;
  
  // Get all files in the directory
  const files = fs.readdirSync(directory);
  
  // Process each file
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      // If it's a directory, process it recursively
      updatedCount += processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      // If it's a TypeScript file, update imports
      if (updateImportsInFile(filePath)) {
        updatedCount++;
      }
    }
  }
  
  return updatedCount;
}

// Start processing the components directory
console.log('Updating imports from themeUtils to theme-utils...');
const updatedCount = processDirectory(componentsDir);
console.log(`Updated imports in ${updatedCount} files.`); 