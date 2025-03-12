import React from 'react';
import InchesToFeetCalculator from '@/components/InchesToFeetCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Inches to Feet Calculator | Convert in to ft',
  description: 'Convert inches to feet with precision. Easy to use calculator for length conversions within the imperial system.',
};

export default async function InchesToFeetPage() {
  const calculator = await getCalculatorById('inches-to-feet');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Inches to Feet Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert inches to feet with precision. Perfect for length conversions within the imperial measurement system.
      </p>
      
      <InchesToFeetCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Inches to Feet Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Conversion</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Inches (in) and feet (ft) are both units of length in the imperial system. One foot equals exactly 12 inches. 
            This conversion is commonly used in the United States and, to some extent, in the United Kingdom and Canada, 
            especially for human height, construction measurements, and various everyday applications.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Inches to Feet Conversion</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Converting height measurements (e.g., 72 inches to 6 feet)</li>
            <li>Construction and carpentry measurements</li>
            <li>Interior design and furniture dimensions</li>
            <li>Converting between different imperial measurements</li>
            <li>Sports statistics and measurements</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formulas</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Inches to Decimal Feet:</strong> Feet = Inches ÷ 12
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Inches to Feet and Inches:</strong> Feet = floor(Inches ÷ 12), Remaining Inches = Inches % 12
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Feet to Inches:</strong> Inches = Feet × 12
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