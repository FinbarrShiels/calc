import React from 'react';
import CentimetersToInchesCalculator from '@/components/CentimetersToInchesCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Centimeters to Inches Calculator | Convert cm to inches',
  description: 'Convert centimeters to inches with precision. Easy to use calculator for length conversions and measurements.',
};

export default async function CentimetersToInchesPage() {
  const calculator = await getCalculatorById('centimeters-to-inches');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Centimeters to Inches Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert centimeters to inches with precision. Perfect for length conversions and measurements.
      </p>
      
      <CentimetersToInchesCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Centimeters to Inches Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Conversion</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Centimeters (cm) and inches (in) are units of length in the metric and imperial systems, respectively. 
            One inch equals exactly 2.54 centimeters. This conversion is widely used when dealing with international 
            measurements, especially in fields like fashion, construction, and product specifications.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Centimeter to Inch Conversion</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Converting clothing measurements for international sizing</li>
            <li>Understanding product dimensions when shopping internationally</li>
            <li>Converting screen sizes for electronic devices</li>
            <li>Working with tools and materials from different countries</li>
            <li>Converting measurements in technical drawings and blueprints</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formula</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Centimeters to Inches:</strong> Inches = Centimeters ÷ 2.54
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Inches to Centimeters:</strong> Centimeters = Inches × 2.54
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