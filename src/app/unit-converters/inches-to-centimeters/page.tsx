import React from 'react';
import InchesToCentimetersCalculator from '@/components/InchesToCentimetersCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Inches to Centimeters Calculator | Convert in to cm',
  description: 'Convert inches to centimeters with precision. Easy to use calculator for length conversions between imperial and metric systems.',
};

export default async function InchesToCentimetersPage() {
  const calculator = await getCalculatorById('inches-to-centimeters');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Inches to Centimeters Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert inches to centimeters with precision. Perfect for converting between imperial and metric measurement systems.
      </p>
      
      <InchesToCentimetersCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Inches to Centimeters Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Conversion</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Inches (in) are units of length in the imperial system, while centimeters (cm) are units in the metric system. 
            One inch equals exactly 2.54 centimeters. This conversion is essential for international communication, 
            product specifications, and converting between measurement systems used in different countries.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Inches to Centimeters Conversion</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Converting screen sizes for electronic devices (TVs, monitors, smartphones)</li>
            <li>International shopping for clothing and shoes</li>
            <li>Understanding product dimensions from different countries</li>
            <li>Converting measurements in technical drawings and blueprints</li>
            <li>DIY projects using tools and materials from different measurement systems</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formulas</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Inches to Centimeters:</strong> Centimeters = Inches × 2.54
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Centimeters to Inches:</strong> Inches = Centimeters ÷ 2.54
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Centimeters to Meters:</strong> Meters = Centimeters ÷ 100
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