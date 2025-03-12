import React from 'react';
import KilosToPoundsCalculator from '@/components/KilosToPoundsCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Kilograms to Pounds Calculator | Convert kg to lb',
  description: 'Convert kilograms to pounds with precision. Easy to use calculator for weight conversions between metric and imperial systems.',
};

export default async function KilosToPoundsPage() {
  const calculator = await getCalculatorById('kilos-to-pounds');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Kilograms to Pounds Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert kilograms to pounds with precision. Perfect for converting between metric and imperial weight measurements.
      </p>
      
      <KilosToPoundsCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Kilograms to Pounds Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Conversion</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Kilograms (kg) are units of mass in the metric system, while pounds (lb) are units of weight in the imperial system. 
            One kilogram equals approximately 2.20462 pounds, and one pound equals 0.453592 kilograms. This conversion is essential for 
            international communication, fitness tracking, shipping, and converting between measurement systems used in different countries.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Kilograms to Pounds Conversion</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Body weight measurements and fitness tracking</li>
            <li>International shipping and logistics</li>
            <li>Cooking and recipe conversions</li>
            <li>Medical and healthcare applications</li>
            <li>International trade and commerce</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formulas</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Kilograms to Pounds:</strong> Pounds = Kilograms × 2.20462
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Pounds to Kilograms:</strong> Kilograms = Pounds × 0.453592
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Kilograms to Ounces:</strong> Ounces = Kilograms × 35.27396
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