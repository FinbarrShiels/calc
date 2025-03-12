import React from 'react';
import WeightConverter from '@/components/WeightConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Weight Converter | Convert Between Kilograms, Pounds, Ounces, and More',
  description: 'Convert between different weight units with our easy-to-use converter. Kilograms, pounds, ounces, stones, and more.',
};

export default async function WeightPage() {
  const calculator = await getCalculatorById('weight');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Weight Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different weight units with precision. Perfect for fitness, cooking, shipping, and everyday calculations.
      </p>
      
      <WeightConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Weight Units</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Weight Units</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Weight is measured in various units depending on the region and context:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Kilogram (kg):</strong> The SI base unit of mass.</li>
            <li><strong>Gram (g):</strong> 1/1000 of a kilogram, used for smaller masses.</li>
            <li><strong>Milligram (mg):</strong> 1/1000 of a gram, used in medicine and science.</li>
            <li><strong>Microgram (μg):</strong> 1/1000000 of a gram, used in scientific contexts.</li>
            <li><strong>Pound (lb):</strong> Imperial and US customary unit, approximately 0.454 kg.</li>
            <li><strong>Ounce (oz):</strong> 1/16 of a pound, used for smaller weights in imperial systems.</li>
            <li><strong>Stone (st):</strong> Used primarily in the UK and Ireland, equal to 14 pounds.</li>
            <li><strong>Ton (metric):</strong> 1,000 kilograms.</li>
            <li><strong>Ton (US/short):</strong> 2,000 pounds (approximately 907 kg).</li>
            <li><strong>Ton (UK/long):</strong> 2,240 pounds (approximately 1,016 kg).</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Weight in Different Contexts</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Personal Weight:</strong> Stones, pounds, or kilograms depending on the country.</li>
            <li><strong>Cooking:</strong> Grams, ounces, or pounds depending on the recipe and region.</li>
            <li><strong>Medicine:</strong> Milligrams or micrograms for precise dosing.</li>
            <li><strong>Shipping:</strong> Pounds, kilograms, or tons depending on the size and region.</li>
            <li><strong>Science:</strong> Primarily metric units (kg, g, mg, μg).</li>
            <li><strong>Industry:</strong> Tons (metric, short, or long) for large quantities.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Weight Conversions</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>1 kilogram = 1,000 grams</li>
            <li>1 kilogram = 2.20462 pounds</li>
            <li>1 pound = 0.453592 kilograms</li>
            <li>1 pound = 16 ounces</li>
            <li>1 stone = 14 pounds</li>
            <li>1 stone = 6.35029 kilograms</li>
            <li>1 ounce = 28.3495 grams</li>
            <li>1 gram = 0.035274 ounces</li>
            <li>1 metric ton = 1,000 kilograms</li>
            <li>1 US ton (short) = 2,000 pounds</li>
            <li>1 UK ton (long) = 2,240 pounds</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Weight vs. Mass</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Technically, units like kilograms measure mass, not weight. Weight is the force exerted on an object due to gravity and varies depending on location. However, in everyday usage, "weight" and "mass" are often used interchangeably, and this converter follows that convention.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            On Earth, a mass of 1 kg experiences a weight force of approximately 9.8 newtons.
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