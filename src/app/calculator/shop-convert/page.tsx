import React from 'react';
import ShopConvertCalculator from '@/components/ShopConvertCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Shop Convert | Square Yard to Square Meter Price Calculator',
  description: 'Convert flooring prices from square yards to square meters and calculate total costs for your flooring project.',
};

export default async function ShopConvertPage() {
  const calculator = await getCalculatorById('shop-convert');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ShopConvertCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Square Yard to Square Meter Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Conversion</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Converting between square yards and square meters is essential when comparing flooring prices internationally or when working with different measurement systems:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>1 square yard = 0.836 square meters</strong></li>
            <li><strong>1 square meter = 1.196 square yards</strong></li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This means that a square meter is about 20% larger than a square yard. When comparing prices, it's important to convert them to the same unit to make an accurate comparison.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How to Use This Calculator</h3>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Enter the price per square yard in the first input field</li>
            <li>Enter the number of square meters needed for your project in the second field</li>
            <li>The calculator will automatically convert the price to square meters</li>
            <li>It will also calculate the total cost based on your area requirements</li>
          </ol>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Why This Matters</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Different countries and manufacturers use different measurement systems:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Square Yards:</strong> Commonly used in the US and UK for carpet and some flooring materials</li>
            <li><strong>Square Meters:</strong> Used in most European countries and in international trade</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            By converting between these units and calculating the total cost, you can make accurate price comparisons and budget properly for your flooring project.
          </p>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            Home & Garden
          </span>
        </div>
      </div>
    </div>
  );
} 