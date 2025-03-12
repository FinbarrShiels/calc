import React from 'react';
import VolumeCalculator from '@/components/VolumeCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Cubic Feet Calculator | Calculate Volume in Cubic Feet',
  description: 'Calculate volume in cubic feet with our easy-to-use calculator. Convert between cubic feet, cubic meters, cubic yards, gallons, and liters.',
};

export default async function CubicFeetCalculatorPage() {
  const calculator = await getCalculatorById('cubic-feet-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Cubic Feet Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Calculate volume in cubic feet and convert to other volume units like cubic meters, cubic yards, gallons, and liters.
      </p>
      
      <VolumeCalculator calculator={calculator} unit="cubic-feet" />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Cubic Feet</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is a Cubic Foot?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            A cubic foot (ft³) is a unit of volume equal to the space occupied by a cube with sides that are each 1 foot in length. It's commonly used in the United States and other countries that use the imperial system for measuring volume.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Conversions</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>1 cubic foot = 0.0283168 cubic meters</strong></li>
            <li><strong>1 cubic foot = 0.037037 cubic yards</strong></li>
            <li><strong>1 cubic foot = 7.48052 US gallons</strong></li>
            <li><strong>1 cubic foot = 28.3168 liters</strong></li>
            <li><strong>1 cubic foot = 1,728 cubic inches</strong></li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Cubic feet are commonly used for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Measuring construction materials like concrete, gravel, and soil</li>
            <li>Calculating shipping and freight volumes</li>
            <li>Determining refrigerator and freezer capacity</li>
            <li>Measuring natural gas consumption</li>
            <li>Calculating air flow in HVAC systems (CFM - cubic feet per minute)</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Calculating Cubic Feet</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            To calculate the volume in cubic feet:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Measure the length, width, and height in feet</li>
            <li>Multiply these three measurements together: Length × Width × Height</li>
            <li>The result is the volume in cubic feet</li>
          </ol>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            For irregular shapes, divide the object into regular sections, calculate the volume of each section, and add them together.
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