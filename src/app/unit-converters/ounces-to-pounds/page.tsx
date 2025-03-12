import React from 'react';
import OuncesToPoundsCalculator from '@/components/OuncesToPoundsCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Ounces to Pounds Calculator | Convert oz to lb',
  description: 'Convert ounces to pounds with precision. Easy to use calculator for weight conversions in the imperial system.',
};

export default async function OuncesToPoundsPage() {
  const calculator = await getCalculatorById('ounces-to-pounds');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Ounces to Pounds Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert ounces to pounds with precision. Perfect for cooking, shipping, and other weight measurements.
      </p>
      
      <OuncesToPoundsCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Ounces to Pounds Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Conversion</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Ounces (oz) and pounds (lb) are both units of weight in the imperial system. 
            One ounce equals 0.0625 pounds (1/16 of a pound), or one pound equals 16 ounces. 
            This conversion is commonly used in cooking, shipping, and everyday weight measurements in the United States and other countries that use the imperial system.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Ounces to Pounds Conversion</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Cooking and recipe measurements</li>
            <li>Shipping and postage calculations</li>
            <li>Grocery shopping and food packaging</li>
            <li>Baby weight tracking</li>
            <li>Fitness and weight management</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formulas</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Ounces to Pounds:</strong> Pounds = Ounces × 0.0625
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Pounds to Ounces:</strong> Ounces = Pounds × 16
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Mixed Units:</strong> To express in pounds and ounces, divide the total ounces by 16 to get whole pounds, and the remainder is the ounces
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