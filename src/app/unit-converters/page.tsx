import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Unit Converters | Length, Weight, Volume & More',
  description: 'Free online unit converters for length, weight, volume, area, energy and more. Convert between metric and imperial units with our easy-to-use tools.',
};

// This function gets all converter directories from the file system
function getUnitConvertersFromFileSystem() {
  const convertersDir = path.join(process.cwd(), 'src', 'app', 'unit-converters');
  
  try {
    // Read directory and filter out non-directories and page.tsx
    const items = fs.readdirSync(convertersDir, { withFileTypes: true });
    return items
      .filter(item => item.isDirectory() && item.name !== 'page.tsx')
      .map(item => ({
        id: item.name,
        name: formatConverterName(item.name),
        url: `/unit-converters/${item.name}`
      }));
  } catch (error) {
    console.error('Error reading unit-converters directory:', error);
    return [];
  }
}

// Helper function to format converter names
function formatConverterName(dirName: string) {
  // Convert kebab-case to Title Case
  return dirName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function UnitConvertersPage() {
  // Get converters from file system
  const converters = getUnitConvertersFromFileSystem();

  // Define converter categories
  const categories = [
    {
      id: 'length',
      name: 'Height & Length',
      description: 'Convert between different units of length and height',
      converters: converters.filter(c => 
        c.id.includes('centimeters-to-feet') || 
        c.id.includes('centimeters-to-inches') || 
        c.id.includes('feet-to-inches') || 
        c.id.includes('feet-to-meters') || 
        c.id.includes('inches-to-centimeters') || 
        c.id.includes('inches-to-feet') || 
        c.id.includes('meters-to-feet-inches') || 
        c.id.includes('mm-to-inches')
      )
    },
    {
      id: 'weight',
      name: 'Mass & Weight',
      description: 'Convert between different units of mass and weight',
      converters: converters.filter(c => 
        c.id.includes('grams-to-pounds') || 
        c.id.includes('kilos-to-stone') || 
        c.id.includes('kilos-to-pounds') || 
        c.id.includes('micrograms-to-mg') || 
        c.id.includes('micrograms-to-grams') || 
        c.id.includes('milligrams-to-grams') || 
        c.id.includes('ounces-to-pounds') || 
        c.id.includes('stone-to-pounds')
      )
    },
    {
      id: 'volume',
      name: 'Volume',
      description: 'Convert between different units of volume',
      converters: converters.filter(c => 
        c.id.includes('cubic-feet-to-gallons') || 
        c.id.includes('gallons-to-ounces') || 
        c.id.includes('liters-to-gallons') || 
        c.id.includes('liters-to-ounces')
      )
    },
    {
      id: 'volume-weight',
      name: 'Volume to Weight',
      description: 'Convert between volume and weight measurements',
      converters: converters.filter(c => 
        c.id.includes('cubic-yards-to-tons') || 
        c.id.includes('gallons-to-pounds') || 
        c.id.includes('liters-to-tons')
      )
    },
    {
      id: 'force',
      name: 'Force & Torque',
      description: 'Convert between different units of force and torque',
      converters: converters.filter(c => 
        c.id.includes('inch-pounds-to-ft-lb') || 
        c.id.includes('newton-meters-to-ft-lb')
      )
    },
    {
      id: 'area',
      name: 'Area',
      description: 'Convert between different units of area',
      converters: converters.filter(c => 
        c.id.includes('square-ft-and-acres') || 
        c.id.includes('square-meters-to-square-ft')
      )
    },
    {
      id: 'area-volume',
      name: 'Area to Volume',
      description: 'Convert between area and volume measurements',
      converters: converters.filter(c => 
        c.id.includes('square-feet-to-cubic-feet') || 
        c.id.includes('square-feet-to-cubic-yds')
      )
    },
    {
      id: 'energy',
      name: 'Energy & Power',
      description: 'Convert between different units of energy and power',
      converters: converters.filter(c => 
        c.id.includes('amps-to-watts') || 
        c.id.includes('hertz-to-seconds') || 
        c.id.includes('lumens-to-watts') || 
        c.id.includes('watts-to-amps')
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Unit Converters</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Convert between different units of measurement with our free online tools
      </p>
      
      {/* Display each category section */}
      {categories.map(category => (
        <div key={category.id} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">{category.name}</h2>
          {category.converters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.converters.map(converter => (
                <div key={converter.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={converter.url} className="block p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{converter.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No converters found in this category.</p>
          )}
        </div>
      ))}
      
      {/* Display count of converters */}
      <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        Showing {converters.length} unit converters
      </div>
    </div>
  );
} 