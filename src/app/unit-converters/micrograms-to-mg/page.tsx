import React from 'react';
import MicrogramsToMgCalculator from '@/components/MicrogramsToMgCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Micrograms to Milligrams Calculator | Convert μg to mg',
  description: 'Convert micrograms to milligrams with precision. Easy to use calculator for weight conversions in the metric system.',
};

export default async function MicrogramsToMgPage() {
  const calculator = await getCalculatorById('micrograms-to-mg');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Micrograms to Milligrams Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert micrograms to milligrams with precision. Perfect for pharmaceutical, scientific, and nutritional calculations.
      </p>
      
      <MicrogramsToMgCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Micrograms to Milligrams Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Conversion</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Micrograms (μg) and milligrams (mg) are both units of mass in the metric system. 
            One microgram equals 0.001 milligrams, or one milligram equals 1,000 micrograms. 
            This conversion is essential for precise measurements in scientific, medical, and pharmaceutical applications.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Micrograms to Milligrams Conversion</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Pharmaceutical dosage calculations</li>
            <li>Laboratory and scientific research</li>
            <li>Nutritional and dietary supplement analysis</li>
            <li>Medical and healthcare applications</li>
            <li>Chemical formulations and analysis</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formulas</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Micrograms to Milligrams:</strong> Milligrams = Micrograms × 0.001
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Milligrams to Micrograms:</strong> Micrograms = Milligrams × 1,000
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Metric Prefixes:</strong> 1 milligram (mg) = 10<sup>-3</sup> grams, 1 microgram (μg) = 10<sup>-6</sup> grams
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