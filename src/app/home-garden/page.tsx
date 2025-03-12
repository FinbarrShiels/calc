import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Home & Garden Calculators | Volume, Flooring, Energy & More',
  description: 'Free online calculators for home and garden projects. Calculate volume, flooring needs, electricity costs, and more with our easy-to-use tools.',
};

// This function gets all calculator directories from the file system
function getHomeGardenCalculatorsFromFileSystem() {
  const calculatorsDir = path.join(process.cwd(), 'src', 'app', 'home-garden');
  
  try {
    // Read directory and filter out non-directories and page.tsx
    const items = fs.readdirSync(calculatorsDir, { withFileTypes: true });
    return items
      .filter(item => item.isDirectory() && item.name !== 'page.tsx')
      .map(item => ({
        id: item.name,
        name: formatCalculatorName(item.name),
        url: `/home-garden/${item.name}`
      }));
  } catch (error) {
    console.error('Error reading home-garden directory:', error);
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

export default function HomeGardenPage() {
  // Get calculators from file system
  const calculators = getHomeGardenCalculatorsFromFileSystem();

  // Define calculator descriptions
  const calculatorDescriptions: {[key: string]: string} = {
    'cubic-feet-calculator': 'Calculate volume in cubic feet for various shapes',
    'cubic-meters-calculator': 'Calculate volume in cubic meters for various shapes',
    'cubic-yards-calculator': 'Calculate volume in cubic yards for landscaping materials',
    'electricity-cost-calculator': 'Estimate electricity costs for appliances and devices',
    'gravel-calculator': 'Calculate how much gravel you need for your project',
    'how-much-flooring': 'Calculate flooring materials needed for your space',
    'led-savings-calculator': 'Calculate energy savings from switching to LED lighting',
    'miles-per-kwh-calculator': 'Calculate electric vehicle efficiency in miles per kilowatt-hour',
    'mpge-calculator': 'Calculate Miles Per Gallon equivalent for electric vehicles',
    'mulch-calculator': 'Calculate how much mulch you need for your garden beds',
    'square-footage': 'Calculate the square footage of rooms and spaces'
  };

  // Group calculators into categories
  const categories = [
    {
      id: 'volume',
      name: 'Volume Calculators',
      calculators: calculators.filter(c => 
        c.id.includes('cubic-feet') || 
        c.id.includes('cubic-meters') || 
        c.id.includes('cubic-yards')
      )
    },
    {
      id: 'landscaping',
      name: 'Landscaping & Garden',
      calculators: calculators.filter(c => 
        c.id.includes('gravel') || 
        c.id.includes('mulch')
      )
    },
    {
      id: 'home',
      name: 'Home Improvement',
      calculators: calculators.filter(c => 
        c.id.includes('flooring') || 
        c.id.includes('square-footage')
      )
    },
    {
      id: 'energy',
      name: 'Energy & Electricity',
      calculators: calculators.filter(c => 
        c.id.includes('electricity') || 
        c.id.includes('led') || 
        c.id.includes('miles-per-kwh') || 
        c.id.includes('mpge')
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Home & Garden Calculators</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Tools to help with your home improvement and gardening projects
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
                      {calculatorDescriptions[calculator.id] || 'Calculate and plan your home and garden projects'}
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
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Other Calculators</h2>
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
                      {calculatorDescriptions[calculator.id] || 'Calculate and plan your home and garden projects'}
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
        Showing {calculators.length} home & garden calculators
      </div>
    </div>
  );
} 