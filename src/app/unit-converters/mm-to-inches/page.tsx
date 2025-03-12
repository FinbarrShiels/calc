import React from 'react';
import MmToInchesCalculator from '@/components/MmToInchesCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Millimeters to Inches Calculator | Convert mm to in',
  description: 'Convert millimeters to inches with precision. Easy to use calculator for length conversions between metric and imperial systems.',
};

export default async function MmToInchesPage() {
  const calculator = await getCalculatorById('mm-to-inches');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Millimeters to Inches Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert millimeters to inches with precision. Perfect for converting between metric and imperial measurement systems.
      </p>
      
      <MmToInchesCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Millimeters to Inches Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Conversion</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Millimeters (mm) are units of length in the metric system, while inches (in) are units of length in the imperial system. 
            One millimeter equals exactly 0.0393701 inches, and one inch equals 25.4 millimeters. This conversion is essential for 
            international communication, engineering, manufacturing, and converting between measurement systems used in different countries.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Millimeters to Inches Conversion</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Engineering and manufacturing measurements</li>
            <li>Woodworking and construction</li>
            <li>Electronics and hardware specifications</li>
            <li>International product dimensions</li>
            <li>Converting between metric and imperial tools</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formulas</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Millimeters to Inches:</strong> Inches = Millimeters × 0.0393701
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Inches to Millimeters:</strong> Millimeters = Inches × 25.4
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Fractional Inches:</strong> For practical applications, decimal inches are often converted to the nearest fraction (e.g., ¼, ½, ¾)
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