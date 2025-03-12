import React from 'react';
import StoneToPoundsCalculator from '@/components/StoneToPoundsCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Stone to Pounds Calculator | Convert st to lb',
  description: 'Convert stone to pounds with precision. Easy to use calculator for weight conversions in the imperial system.',
};

export default async function StoneToPoundsPage() {
  const calculator = await getCalculatorById('stone-to-pounds');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Stone to Pounds Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert stone to pounds with precision. Perfect for weight measurements in the UK and other countries using the stone unit.
      </p>
      
      <StoneToPoundsCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Stone to Pounds Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Conversion</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Stone (st) and pounds (lb) are both units of weight in the imperial system. 
            One stone equals exactly 14 pounds. The stone unit is commonly used in the United Kingdom and Ireland for measuring human body weight, 
            while pounds are used more widely in the United States and other countries.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Stone to Pounds Conversion</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Body weight measurements in the UK and Ireland</li>
            <li>International fitness and health tracking</li>
            <li>Medical and healthcare applications</li>
            <li>Weight loss and fitness goals</li>
            <li>Converting between different measurement systems</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formulas</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Stone to Pounds:</strong> Pounds = Stone × 14
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Pounds to Stone:</strong> Stone = Pounds ÷ 14
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Stone to Kilograms:</strong> Kilograms = Stone × 6.35029
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