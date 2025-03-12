/**
 * This script fixes the issue with onChange attributes in input fields
 * where the inputProps were incorrectly placed inside the onChange attribute.
 * 
 * Usage:
 * 1. Run this script with Node.js: node scripts/fix-onChange-issue.js
 * 2. The script will fix all components with the issue
 */

const fs = require('fs');
const path = require('path');

// Define the directory to search
const componentsDir = path.join(__dirname, '..', 'src', 'components');

// Find all components
const allFiles = fs.readdirSync(componentsDir)
  .filter(file => file.endsWith('.tsx'));

console.log(`Found ${allFiles.length} components to check.`);

let updatedCount = 0;

// Process each file
allFiles.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Check if the file has the issue
  const hasIssue = content.includes('onChange={ {...') || 
                  content.includes('onChange={...') || 
                  content.includes('onChange={ ...') || 
                  content.includes('onChange={...');
  
  if (!hasIssue) {
    return;
  }
  
  console.log(`Fixing onChange issue in ${file}...`);
  
  // Fix the issue
  let updatedContent = content;
  
  // Fix the issue with inputProps inside onChange
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

console.log(`\nFixed ${updatedCount} components.`);
console.log('\nIMPORTANT: This script made automated changes. Please review them before committing.'); 