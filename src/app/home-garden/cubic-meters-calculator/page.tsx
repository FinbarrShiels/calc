import React from 'react';
import VolumeCalculator from '@/components/VolumeCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Cubic Meters Calculator | Calculate Volume in Cubic Meters',
  description: 'Calculate volume in cubic meters with our easy-to-use calculator. Convert between cubic meters, cubic feet, cubic yards, gallons, and liters.',
};

export default async function CubicMetersCalculatorPage() {
  const calculator = await getCalculatorById('cubic-meters-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Cubic Meters Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Calculate volume in cubic meters and convert to other volume units like cubic feet, cubic yards, gallons, and liters.
      </p>
      
      <VolumeCalculator calculator={calculator} unit="cubic-meters" />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Cubic Meters</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is a Cubic Meter?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            A cubic meter (m³) is the SI (International System of Units) unit of volume. It represents the space occupied by a cube with sides that are each 1 meter in length. It's the standard unit of volume in most countries that use the metric system.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Conversions</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>1 cubic meter = 35.3147 cubic feet</strong></li>
            <li><strong>1 cubic meter = 1.30795 cubic yards</strong></li>
            <li><strong>1 cubic meter = 264.172 US gallons</strong></li>
            <li><strong>1 cubic meter = 1,000 liters</strong></li>
            <li><strong>1 cubic meter = 1,000,000 cubic centimeters</strong></li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Cubic meters are commonly used for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Measuring construction materials like concrete, sand, and gravel</li>
            <li>Calculating water consumption and storage</li>
            <li>Determining shipping container volumes</li>
            <li>Measuring large-scale liquid and gas volumes</li>
            <li>Calculating excavation volumes in construction</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Calculating Cubic Meters</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            To calculate the volume in cubic meters:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Measure the length, width, and height in meters</li>
            <li>Multiply these three measurements together: Length × Width × Height</li>
            <li>The result is the volume in cubic meters</li>
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