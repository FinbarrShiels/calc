import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Cooking Calculators & Converters | Kitchen Measurement Tools',
  description: 'Free online cooking calculators and converters. Convert between cups, grams, ounces, tablespoons, and more for precise cooking and baking.',
};

// This function gets all calculator directories from the file system
function getCookingCalculatorsFromFileSystem() {
  const calculatorsDir = path.join(process.cwd(), 'src', 'app', 'cooking');
  
  try {
    // Read directory and filter out non-directories and page.tsx
    const items = fs.readdirSync(calculatorsDir, { withFileTypes: true });
    return items
      .filter(item => item.isDirectory() && item.name !== 'page.tsx')
      .map(item => ({
        id: item.name,
        name: formatCalculatorName(item.name),
        url: `/cooking/${item.name}`
      }));
  } catch (error) {
    console.error('Error reading cooking directory:', error);
    return [];
  }
}

// Helper function to format calculator names
function formatCalculatorName(dirName: string) {
  // Convert kebab-case to Title Case
  return dirName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function CookingPage() {
  // Get calculators from file system
  const calculators = getCookingCalculatorsFromFileSystem();

  // Define calculator descriptions
  const calculatorDescriptions: {[key: string]: string} = {
    'cooking-converter': 'Convert between various cooking measurements',
    'air-fryer-converter': 'Convert traditional oven recipes for air fryer cooking',
    'baking-conversions': 'Convert common baking measurements',
    'butter-converter': 'Convert between sticks, cups, tablespoons, and grams of butter',
    'cups-to-grams': 'Convert cup measurements to grams for various ingredients',
    'cups-to-ml': 'Convert cups to milliliters for liquid ingredients',
    'cups-to-ounces': 'Convert cups to fluid ounces or weight ounces',
    'cups-to-tablespoons': 'Convert cups to tablespoons for precise measurements',
    'grams-to-cups': 'Convert gram measurements to cups for various ingredients',
    'grams-to-ounces': 'Convert grams to ounces for weight measurements',
    'grams-to-tablespoons': 'Convert grams to tablespoons for various ingredients',
    'grams-to-teaspoons': 'Convert grams to teaspoons for small measurements',
    'ml-to-grams': 'Convert milliliters to grams for liquid ingredients',
    'ounces-to-ml': 'Convert fluid ounces to milliliters',
    'ounces-to-grams': 'Convert ounces to grams for weight measurements',
    'oven-temperatures': 'Convert between Fahrenheit, Celsius, and gas mark oven temperatures',
    'pints-to-cups': 'Convert pints to cups for liquid measurements',
    'pounds-and-cups': 'Convert between pounds and cups for various ingredients',
    'quarts-to-cups': 'Convert quarts to cups for liquid measurements',
    'tablespoons-to-teaspoons': 'Convert tablespoons to teaspoons for small measurements',
    'teaspoons-to-grams': 'Convert teaspoons to grams for various ingredients',
    'teaspoons-to-ml': 'Convert teaspoons to milliliters for liquid ingredients'
  };

  // Group calculators into categories
  const categories = [
    {
      id: 'general',
      name: 'General Cooking Converters',
      calculators: calculators.filter(c => 
        c.id.includes('cooking-converter') || 
        c.id.includes('baking-conversions') || 
        c.id.includes('air-fryer-converter') || 
        c.id.includes('oven-temperatures')
      )
    },
    {
      id: 'cups',
      name: 'Cup Conversions',
      calculators: calculators.filter(c => 
        c.id.includes('cups-to-') || 
        c.id.includes('-to-cups') || 
        c.id.includes('pounds-and-cups')
      )
    },
    {
      id: 'grams',
      name: 'Gram Conversions',
      calculators: calculators.filter(c => 
        c.id.includes('grams-to-') || 
        c.id.includes('-to-grams')
      )
    },
    {
      id: 'small-measures',
      name: 'Small Measurement Conversions',
      calculators: calculators.filter(c => 
        c.id.includes('tablespoons') || 
        c.id.includes('teaspoons')
      )
    },
    {
      id: 'liquid',
      name: 'Liquid Measurement Conversions',
      calculators: calculators.filter(c => 
        c.id.includes('ml') || 
        c.id.includes('ounces') || 
        c.id.includes('pints') || 
        c.id.includes('quarts')
      )
    },
    {
      id: 'specific',
      name: 'Specific Ingredient Converters',
      calculators: calculators.filter(c => 
        c.id.includes('butter')
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Cooking Calculators & Converters</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Tools to help with precise measurements in cooking and baking
      </p>
      
      {/* Display each category section */}
      {categories.map(category => (
        <div key={category.id} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">{category.name}</h2>
          {category.calculators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.calculators.map(calculator => (
                <div key={calculator.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={calculator.url} className="block p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{calculator.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {calculatorDescriptions[calculator.id] || 'Convert between cooking measurements'}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No calculators found in this category.</p>
          )}
        </div>
      ))}
      
      {/* Display all calculators if any don't fit in categories */}
      {calculators.some(calc => 
        !categories.some(cat => 
          cat.calculators.some(c => c.id === calc.id)
        )
      ) && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Other Converters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators
              .filter(calc => 
                !categories.some(cat => 
                  cat.calculators.some(c => c.id === calc.id)
                )
              )
              .map(calculator => (
                <div key={calculator.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={calculator.url} className="block p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{calculator.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {calculatorDescriptions[calculator.id] || 'Convert between cooking measurements'}
                    </p>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      )}
      
      {/* Display count of calculators */}
      <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        Showing {calculators.length} cooking calculators and converters
      </div>
    </div>
  );
} 