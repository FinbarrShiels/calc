import React from 'react';
import MetersToFeetInchesCalculator from '@/components/MetersToFeetInchesCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Meters to Feet & Inches Calculator | Convert m to ft and in',
  description: 'Convert meters to feet and inches with precision. Easy to use calculator for length conversions between metric and imperial systems.',
};

export default async function MetersToFeetInchesPage() {
  const calculator = await getCalculatorById('meters-to-feet-inches');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Meters to Feet & Inches Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert meters to feet and inches with precision. Perfect for converting between metric and imperial measurement systems.
      </p>
      
      <MetersToFeetInchesCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Meters to Feet & Inches Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Conversion</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Meters (m) are the base units of length in the metric system, while feet (ft) and inches (in) are units of length in the imperial system. 
            One meter equals approximately 3.28084 feet, or 3 feet and 3.37 inches. This conversion is essential for international 
            communication, construction projects, and converting between measurement systems used in different countries.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Meters to Feet & Inches Conversion</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Converting architectural plans and construction measurements</li>
            <li>International travel and understanding foreign measurements</li>
            <li>Scientific calculations and research</li>
            <li>Sports field dimensions and athletic records</li>
            <li>Converting height measurements between systems</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formulas</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Meters to Feet:</strong> Feet = Meters × 3.28084
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Meters to Inches:</strong> Inches = Meters × 39.3701
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Meters to Feet & Inches:</strong> First convert to total inches, then divide by 12 to get feet (whole number) and remainder for inches
          </p>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            Utility
          </span>
        </div>
      </div>
    </div>
  );
} 