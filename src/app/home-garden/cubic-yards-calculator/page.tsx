import React from 'react';
import VolumeCalculator from '@/components/VolumeCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Cubic Yards Calculator | Calculate Volume in Cubic Yards',
  description: 'Calculate volume in cubic yards with our easy-to-use calculator. Convert between cubic yards, cubic feet, cubic meters, gallons, and liters.',
};

export default async function CubicYardsCalculatorPage() {
  const calculator = await getCalculatorById('cubic-yards-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Cubic Yards Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Calculate volume in cubic yards and convert to other volume units like cubic feet, cubic meters, gallons, and liters.
      </p>
      
      <VolumeCalculator calculator={calculator} unit="cubic-yards" />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Cubic Yards</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is a Cubic Yard?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            A cubic yard (yd³) is a unit of volume equal to the space occupied by a cube with sides that are each 1 yard (3 feet) in length. It's commonly used in the United States and other countries that use the imperial system, particularly for measuring large volumes of materials.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Conversions</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>1 cubic yard = 27 cubic feet</strong></li>
            <li><strong>1 cubic yard = 0.764555 cubic meters</strong></li>
            <li><strong>1 cubic yard = 201.974 US gallons</strong></li>
            <li><strong>1 cubic yard = 764.555 liters</strong></li>
            <li><strong>1 cubic yard = 46,656 cubic inches</strong></li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Cubic yards are commonly used for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Measuring bulk materials like concrete, soil, gravel, and mulch</li>
            <li>Calculating dumpster and waste container capacity</li>
            <li>Determining excavation volumes for construction projects</li>
            <li>Measuring large quantities of landscaping materials</li>
            <li>Estimating material requirements for large construction projects</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Calculating Cubic Yards</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            To calculate the volume in cubic yards:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Measure the length, width, and height in yards</li>
            <li>Multiply these three measurements together: Length × Width × Height</li>
            <li>The result is the volume in cubic yards</li>
          </ol>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If your measurements are in feet, multiply the length, width, and height together, then divide by 27 to get cubic yards (since 1 cubic yard = 27 cubic feet).
          </p>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            Math
          </span>
        </div>
      </div>
    </div>
  );
} 