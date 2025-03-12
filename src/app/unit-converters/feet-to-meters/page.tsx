import React from 'react';
import FeetToMetersCalculator from '@/components/FeetToMetersCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Feet to Meters Calculator | Convert ft to m',
  description: 'Convert feet to meters with precision. Easy to use calculator for length conversions between imperial and metric systems.',
};

export default async function FeetToMetersPage() {
  const calculator = await getCalculatorById('feet-to-meters');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Feet to Meters Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert feet to meters with precision. Perfect for converting between imperial and metric measurement systems.
      </p>
      
      <FeetToMetersCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Feet to Meters Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Conversion</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Feet (ft) are units of length in the imperial system, while meters (m) are the base units of length in the metric system. 
            One foot equals exactly 0.3048 meters, and one inch equals 0.0254 meters. This conversion is essential for international 
            communication, scientific work, and converting between measurement systems used in different countries.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Feet to Meters Conversion</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Converting architectural plans and construction measurements</li>
            <li>International travel and understanding foreign measurements</li>
            <li>Scientific calculations and research</li>
            <li>Sports field dimensions and athletic records</li>
            <li>Converting elevation and altitude measurements</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formulas</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Feet to Meters:</strong> Meters = Feet × 0.3048
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Inches to Meters:</strong> Meters = Inches × 0.0254
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Meters to Feet:</strong> Feet = Meters ÷ 0.3048
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Meters to Centimeters:</strong> Centimeters = Meters × 100
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