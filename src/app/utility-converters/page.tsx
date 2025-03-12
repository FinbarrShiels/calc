import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Utility Converters | Acceleration, Data, Energy & More',
  description: 'Free online utility converters for acceleration, data storage, energy, fuel consumption and more. Convert between different units with our easy-to-use tools.',
};

// This function gets all converter directories from the file system
function getUtilityConvertersFromFileSystem() {
  const convertersDir = path.join(process.cwd(), 'src', 'app', 'utility-converters');
  
  try {
    // Read directory and filter out non-directories and page.tsx
    const items = fs.readdirSync(convertersDir, { withFileTypes: true });
    return items
      .filter(item => item.isDirectory() && item.name !== 'page.tsx')
      .map(item => ({
        id: item.name,
        name: formatConverterName(item.name),
        url: `/utility-converters/${item.name}`
      }));
  } catch (error) {
    console.error('Error reading utility-converters directory:', error);
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

export default function UtilityConvertersPage() {
  // Get converters from file system
  const converters = getUtilityConvertersFromFileSystem();

  // Define converter descriptions
  const converterDescriptions: {[key: string]: string} = {
    'acceleration': 'Convert between different units of acceleration',
    'area': 'Convert between square meters, square feet, acres, and more',
    'data-storage': 'Convert between bytes, kilobytes, megabytes, gigabytes, and more',
    'data-transfer-rate': 'Convert between bits per second, bytes per second, and more',
    'energy': 'Convert between joules, calories, kilowatt-hours, and more',
    'fuel-consumption': 'Convert between miles per gallon, kilometers per liter, and more',
    'gold-weight': 'Convert between troy ounces, grams, pennyweights, and more',
    'height': 'Convert between feet, inches, centimeters, meters, and more',
    'length-and-distance': 'Convert between meters, feet, miles, kilometers, and more',
    'liquid-volume': 'Convert between liters, gallons, fluid ounces, and more',
    'mass-and-weight': 'Convert between kilograms, pounds, ounces, and more',
    'power': 'Convert between watts, horsepower, kilowatts, and more',
    'pressure': 'Convert between pascals, bars, psi, atmospheres, and more',
    'temperature': 'Convert between Celsius, Fahrenheit, Kelvin, and more',
    'time': 'Convert between seconds, minutes, hours, days, and more',
    'velocity': 'Convert between meters per second, miles per hour, and more',
    'water-weight': 'Convert between volume and weight of water',
    'weight': 'Convert between kilograms, pounds, tons, and more',
    'weight-to-volume': 'Convert between weight and volume for various substances'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Utility Converters</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Convert between different units of measurement with our free online tools
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {converters.map(converter => (
          <div key={converter.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={converter.url} className="block p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{converter.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {converterDescriptions[converter.id] || 'Convert between different units of measurement'}
              </p>
            </Link>
          </div>
        ))}
      </div>
      
      {/* Display count of converters */}
      <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        Showing {converters.length} utility converters
      </div>
    </div>
  );
} 