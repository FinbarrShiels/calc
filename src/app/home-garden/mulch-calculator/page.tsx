import React from 'react';
import MulchCalculator from '@/components/MulchCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Mulch Calculator | Calculate Mulch Volume and Bags Needed',
  description: 'Calculate how much mulch you need for your garden or landscaping project. Estimate volume in cubic yards, cubic feet, and number of bags required.',
};

export default async function MulchCalculatorPage() {
  const calculator = await getCalculatorById('mulch-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <MulchCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Mulch Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How to Calculate Mulch Needs</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Calculating the amount of mulch needed for your landscaping project involves determining the volume of the area to be covered:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Measure the width and length of the area (or calculate the total square footage)</li>
            <li>Decide on the depth of mulch you want to apply (typically 2-4 inches)</li>
            <li>Calculate the volume (area × depth)</li>
            <li>Convert to the appropriate unit (cubic yards, cubic feet, or cubic meters)</li>
          </ol>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our calculator handles these calculations automatically, providing you with accurate estimates for your project.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Types of Mulch</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Mulch Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Benefits</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Shredded Hardwood</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Decomposes slowly, adds nutrients</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Flower beds, around trees</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Pine Bark</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Acidic, good for acid-loving plants</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Azaleas, rhododendrons, blueberries</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Cedar Chips</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Aromatic, insect repellent</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Paths, playgrounds, vegetable gardens</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Rubber Mulch</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Long-lasting, doesn't decompose</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Playgrounds, high-traffic areas</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Compost</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Highly nutritious, improves soil</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Vegetable gardens, annual beds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Benefits of Mulching</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Weed suppression:</strong> Reduces weed growth by blocking sunlight</li>
            <li><strong>Moisture retention:</strong> Helps soil retain moisture, reducing watering needs</li>
            <li><strong>Temperature regulation:</strong> Insulates soil from extreme temperatures</li>
            <li><strong>Erosion control:</strong> Prevents soil erosion from rain and wind</li>
            <li><strong>Soil improvement:</strong> Organic mulches decompose and add nutrients to soil</li>
            <li><strong>Aesthetic appeal:</strong> Creates a neat, finished look to garden beds</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Application Tips</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Remove weeds before applying mulch</li>
            <li>Apply mulch to a depth of 2-4 inches (5-10 cm)</li>
            <li>Keep mulch 2-3 inches away from plant stems and tree trunks to prevent rot</li>
            <li>Refresh mulch annually, adding 1-2 inches as needed</li>
            <li>For large areas, consider buying mulch in bulk rather than bags</li>
            <li>One cubic yard of mulch covers approximately 100 square feet at 3 inches deep</li>
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