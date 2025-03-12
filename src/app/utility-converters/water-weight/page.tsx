import React from 'react';
import WaterWeightConverter from '@/components/WaterWeightConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Water Weight Converter | Convert Between Water Volume and Weight',
  description: 'Convert between water volume and weight with our easy-to-use converter. Gallons to pounds, liters to kilograms, and more.',
};

export default async function WaterWeightPage() {
  const calculator = await getCalculatorById('water-weight');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Water Weight Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between water volume and weight with precision. Perfect for engineering, construction, and everyday calculations.
      </p>
      
      <WaterWeightConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Water Weight</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Water Density</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The density of water varies slightly with temperature, but for most practical purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>At 4°C (39.2°F): Water has its maximum density of exactly 1 g/cm³ or 1 kg/L.</li>
            <li>At 20°C (68°F): Water has a density of approximately 0.9982 g/cm³.</li>
            <li>At 100°C (212°F): Water has a density of approximately 0.9584 g/cm³.</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This converter uses the standard density of 1 kg/L (or 8.34 lb/gal) for calculations.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Water Weight Conversions</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>1 liter of water = 1 kilogram</li>
            <li>1 gallon (US) of water = 8.34 pounds</li>
            <li>1 cubic foot of water = 62.4 pounds</li>
            <li>1 cubic meter of water = 1,000 kilograms (1 metric ton)</li>
            <li>1 milliliter of water = 1 gram</li>
            <li>1 fluid ounce (US) of water = 29.57 grams</li>
            <li>1 cup (US) of water = 236.6 grams</li>
            <li>1 pint (US) of water = 473.2 grams</li>
            <li>1 quart (US) of water = 946.4 grams</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Applications</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Converting between water volume and weight is useful in many contexts:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Construction:</strong> Calculating the weight of water in tanks, pools, or containers.</li>
            <li><strong>Engineering:</strong> Designing water systems and calculating loads.</li>
            <li><strong>Transportation:</strong> Determining the weight of water being transported.</li>
            <li><strong>Cooking:</strong> Converting between volume and weight measurements in recipes.</li>
            <li><strong>Gardening:</strong> Calculating the weight of water needed for irrigation.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Water Weight vs. Other Liquids</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Different liquids have different densities compared to water:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Milk is slightly heavier than water (about 1.03 times).</li>
            <li>Gasoline is lighter than water (about 0.75 times).</li>
            <li>Vegetable oil is lighter than water (about 0.92 times).</li>
            <li>Honey is heavier than water (about 1.4 times).</li>
            <li>Seawater is slightly heavier than freshwater (about 1.025 times).</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            For other liquids, use our Weight to Volume converter which accounts for different material densities.
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