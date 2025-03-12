import React from 'react';
import HowMuchFlooringCalculator from '@/components/HowMuchFlooringCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'How Much Flooring Calculator | Calculate Flooring and Tile Requirements',
  description: 'Calculate how much flooring or tiles you need for your project with our easy-to-use calculator. Perfect for planning your next renovation.',
};

export default async function HowMuchFlooringPage() {
  const calculator = await getCalculatorById('how-much-flooring');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">How Much Flooring Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Calculate exactly how much flooring or tiles you need for your project, including wastage for different installation patterns.
      </p>
      
      <HowMuchFlooringCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Flooring Calculations</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How to Measure for Flooring</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            To accurately measure for flooring, follow these steps:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Measure the length and width of each room or section</li>
            <li>Multiply length by width to get the area of each section</li>
            <li>For complex layouts, divide the space into rectangles and add the areas together</li>
            <li>Add appropriate wastage percentage based on your installation pattern</li>
          </ol>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding Wastage</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Different installation patterns require different amounts of extra material:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Straight/Grid Pattern:</strong> 5-10% extra</li>
            <li><strong>Diagonal Pattern:</strong> 10-15% extra</li>
            <li><strong>Herringbone Pattern:</strong> 15-20% extra</li>
            <li><strong>Complex Rooms:</strong> 10-15% extra for rooms with many corners or obstacles</li>
            <li><strong>Tile Size:</strong> Larger tiles typically result in less wastage than smaller tiles</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Flooring Units</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Flooring is typically sold in various units depending on the region and material type:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Square Feet (ft²):</strong> Common in the US and Canada</li>
            <li><strong>Square Meters (m²):</strong> Standard in most other countries</li>
            <li><strong>Square Yards (yd²):</strong> Sometimes used for carpet in the US</li>
            <li><strong>Boxes or Cartons:</strong> Flooring is often sold in boxes covering a specific area</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Tips for Purchasing</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Always buy 5-10% extra flooring beyond your calculated needs for future repairs</li>
            <li>Check the coverage per box and round up to the nearest whole box</li>
            <li>For natural materials like wood or stone, order extra to account for color variations</li>
            <li>Consider ordering samples first to verify color and texture in your space</li>
          </ul>
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