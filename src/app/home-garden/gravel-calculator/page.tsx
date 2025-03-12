import React from 'react';
import GravelCalculator from '@/components/GravelCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Gravel Calculator | Calculate Gravel Volume, Weight, and Cost',
  description: 'Calculate how much gravel, sand, or gravel-sand mix you need for your project. Estimate volume, weight, and total cost with our easy-to-use calculator.',
};

export default async function GravelCalculatorPage() {
  const calculator = await getCalculatorById('gravel-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <GravelCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Gravel Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How to Calculate Gravel Needs</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Calculating the amount of gravel needed for your project involves determining the volume of the area to be filled:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Measure the width, length, and depth of the area</li>
            <li>Calculate the volume (width × length × depth)</li>
            <li>Convert to the appropriate unit (cubic yards or cubic meters)</li>
            <li>Factor in the material density to determine weight</li>
            <li>Add 5-10% extra for settling and spillage</li>
          </ol>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our calculator handles these calculations automatically, providing you with accurate estimates for your project.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Material Types and Uses</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Material</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Common Uses</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Typical Density</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Gravel (1/4"-2")</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Driveways, walkways, drainage</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">~1.4 tons per cubic yard</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Gravel-Sand Mix</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Base layers, patio foundations</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">~1.5 tons per cubic yard</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Sand</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Playgrounds, sandboxes, paver base</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">~1.3 tons per cubic yard</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Recommended Depths</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Different applications require different depths of gravel:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Driveways:</strong> 4-6 inches (10-15 cm) for light vehicles, 8-12 inches (20-30 cm) for heavy vehicles</li>
            <li><strong>Walkways:</strong> 2-3 inches (5-7.5 cm) over a compacted base</li>
            <li><strong>Landscaping:</strong> 2-4 inches (5-10 cm) for decorative purposes</li>
            <li><strong>Drainage:</strong> 4-8 inches (10-20 cm) depending on water flow requirements</li>
            <li><strong>Patio Base:</strong> 4-6 inches (10-15 cm) of compacted gravel before adding sand and pavers</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Buying Tips</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            When purchasing gravel or sand:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Most suppliers sell by the cubic yard or cubic meter</li>
            <li>Delivery is usually more economical for orders over 1 cubic yard</li>
            <li>Ask about minimum delivery quantities</li>
            <li>Compare prices between suppliers, as they can vary significantly</li>
            <li>Consider delivery fees, which may be based on distance</li>
            <li>Ask if the supplier can place the material exactly where you need it</li>
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