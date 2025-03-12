import React from 'react';
import MassAndWeightConverter from '@/components/MassAndWeightConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Mass and Weight Converter | Convert Between Kilograms, Pounds, and More',
  description: 'Convert between different mass and weight units with our easy-to-use converter. Kilograms, pounds, stones, ounces, and more.',
};

export default async function MassAndWeightPage() {
  const calculator = await getCalculatorById('mass-and-weight');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Mass and Weight Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different mass and weight units with precision. Perfect for science, cooking, fitness tracking, and international travel.
      </p>
      
      <MassAndWeightConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Mass and Weight Units</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Mass vs. Weight</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Mass is a measure of the amount of matter in an object, while weight is a measure of the force of gravity acting on that mass. 
            On Earth, mass and weight are often used interchangeably, but they are different physical quantities. An object's mass remains 
            constant regardless of location, while its weight varies depending on the gravitational field.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Metric System</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The metric system is used in most countries worldwide for measuring mass:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Kilogram (kg):</strong> The base unit of mass in the SI system.</li>
            <li><strong>Gram (g):</strong> 1/1000 of a kilogram, used for smaller masses.</li>
            <li><strong>Milligram (mg):</strong> 1/1000 of a gram, used for very small masses.</li>
            <li><strong>Metric Ton (t):</strong> 1,000 kilograms, used for very large masses.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Imperial/US Customary System</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The imperial and US customary systems are used primarily in the United States and, to some extent, in the United Kingdom:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Pound (lb):</strong> The basic unit of weight in the imperial system.</li>
            <li><strong>Ounce (oz):</strong> 1/16 of a pound, used for smaller weights.</li>
            <li><strong>Stone (st):</strong> 14 pounds, commonly used in the UK for human body weight.</li>
            <li><strong>US Ton:</strong> 2,000 pounds, used in the United States.</li>
            <li><strong>UK Ton:</strong> 2,240 pounds, also called a "long ton".</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Specialized Units</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Carat (ct):</strong> 0.2 grams, used for measuring gemstones and precious metals.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Conversions</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>1 kilogram = 2.20462 pounds</li>
            <li>1 pound = 0.453592 kilograms</li>
            <li>1 pound = 16 ounces</li>
            <li>1 stone = 14 pounds = 6.35029 kilograms</li>
            <li>1 metric ton = 1,000 kilograms = 2,204.62 pounds</li>
            <li>1 US ton = 2,000 pounds = 907.185 kilograms</li>
            <li>1 UK ton = 2,240 pounds = 1,016.05 kilograms</li>
            <li>1 carat = 0.2 grams = 200 milligrams</li>
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