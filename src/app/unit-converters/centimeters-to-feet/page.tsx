import React from 'react';
import CentimetersToFeetCalculator from '@/components/CentimetersToFeetCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Centimeters to Feet Calculator | Convert cm to ft and inches',
  description: 'Convert between centimeters and feet/inches with precision. Easy to use calculator for height conversions and measurements.',
};

export default async function CentimetersToFeetPage() {
  const calculator = await getCalculatorById('centimeters-to-feet');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Centimeters to Feet Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between centimeters and feet/inches with precision. Perfect for height conversions and measurements.
      </p>
      
      <CentimetersToFeetCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Length Conversions</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding Centimeters and Feet</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Centimeters (cm) and feet (ft) are units of length in the metric and imperial systems, respectively. 
            One foot equals exactly 30.48 centimeters, and one inch equals 2.54 centimeters. While the metric system 
            is used in most countries worldwide, the imperial system (feet and inches) is still commonly used in the 
            United States and, to some extent, in the United Kingdom and Canada, especially for human height.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Centimeter to Feet Conversion</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Converting height measurements between international systems</li>
            <li>Understanding product dimensions when shopping internationally</li>
            <li>Converting measurements for construction and home improvement projects</li>
            <li>Interpreting medical records from different countries</li>
            <li>Converting clothing and shoe sizes for international shopping</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formulas</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Centimeters to Feet:</strong> Feet = Centimeters ÷ 30.48
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Centimeters to Inches:</strong> Inches = Centimeters ÷ 2.54
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Feet to Centimeters:</strong> Centimeters = Feet × 30.48
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Inches to Centimeters:</strong> Centimeters = Inches × 2.54
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