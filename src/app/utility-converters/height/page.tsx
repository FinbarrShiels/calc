import React from 'react';
import HeightConverter from '@/components/HeightConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Height Converter | Convert Between Feet, Inches, Centimeters, and More',
  description: 'Convert between different height units with our easy-to-use converter. Feet, inches, centimeters, meters, and more.',
};

export default async function HeightPage() {
  const calculator = await getCalculatorById('height');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Height Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different height units with precision. Perfect for international travelers, medical professionals, and anyone working with height measurements.
      </p>
      
      <HeightConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Height Measurement</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Metric vs. Imperial Systems</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Height is commonly measured using two different systems around the world:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Metric System:</strong> Used in most countries worldwide, primarily using centimeters or meters.</li>
            <li><strong>Imperial/US Customary System:</strong> Used in the United States and, to some extent, in the United Kingdom and Canada, primarily using feet and inches.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Height Units</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Centimeters (cm):</strong> The most common metric unit for measuring human height.</li>
            <li><strong>Meters (m):</strong> Used for taller heights or in scientific contexts.</li>
            <li><strong>Millimeters (mm):</strong> Used for precise measurements, often in medical contexts.</li>
            <li><strong>Feet (ft):</strong> A common imperial unit for height.</li>
            <li><strong>Inches (in):</strong> Used alongside feet in the imperial system.</li>
            <li><strong>Feet & Inches (ft' in"):</strong> The standard format for expressing height in the US and UK.</li>
            <li><strong>Yards (yd):</strong> Occasionally used for height, equal to 3 feet.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Conversions</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>1 foot = 12 inches = 30.48 centimeters</li>
            <li>1 inch = 2.54 centimeters</li>
            <li>1 meter = 100 centimeters = 3.28084 feet</li>
            <li>1 yard = 3 feet = 91.44 centimeters</li>
            <li>5 feet 10 inches = 177.8 centimeters</li>
            <li>6 feet = 182.88 centimeters</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Height Measurement in Different Contexts</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Medical:</strong> Often uses centimeters or meters regardless of location.</li>
            <li><strong>Sports:</strong> May use either system depending on the country and sport.</li>
            <li><strong>Construction:</strong> Uses the local standard system, often with more precise measurements.</li>
            <li><strong>Aviation:</strong> Uses feet for altitude measurements worldwide.</li>
          </ul>
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