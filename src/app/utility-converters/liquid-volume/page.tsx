import React from 'react';
import LiquidVolumeConverter from '@/components/LiquidVolumeConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Liquid Volume Converter | Convert Between Liters, Gallons, and More',
  description: 'Convert between different liquid volume units with our easy-to-use converter. Liters, gallons, fluid ounces, cups, and more.',
};

export default async function LiquidVolumePage() {
  const calculator = await getCalculatorById('liquid-volume');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Liquid Volume Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different liquid volume units with precision. Perfect for cooking, baking, chemistry, and international travel.
      </p>
      
      <LiquidVolumeConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Liquid Volume Units</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Metric System</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The metric system is used in most countries worldwide for measuring liquid volume:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Milliliter (ml):</strong> The basic unit for small volumes of liquid, equal to 1 cubic centimeter.</li>
            <li><strong>Liter (L):</strong> The standard metric unit for liquid volume, equal to 1,000 milliliters.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">US Customary System</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The US customary system is used primarily in the United States:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Fluid Ounce (US):</strong> The basic unit for small volumes, approximately 29.57 milliliters.</li>
            <li><strong>Cup (US):</strong> 8 US fluid ounces, approximately 236.59 milliliters.</li>
            <li><strong>Pint (US):</strong> 2 US cups or 16 US fluid ounces, approximately 473.18 milliliters.</li>
            <li><strong>Quart (US):</strong> 2 US pints or 32 US fluid ounces, approximately 946.35 milliliters.</li>
            <li><strong>Gallon (US):</strong> 4 US quarts or 128 US fluid ounces, approximately 3.79 liters.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Imperial System</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The imperial system is used primarily in the United Kingdom and some Commonwealth countries:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Fluid Ounce (UK):</strong> The basic unit for small volumes, approximately 28.41 milliliters.</li>
            <li><strong>Cup (UK):</strong> 10 UK fluid ounces, approximately 284.13 milliliters.</li>
            <li><strong>Pint (UK):</strong> 20 UK fluid ounces, approximately 568.26 milliliters.</li>
            <li><strong>Quart (UK):</strong> 2 UK pints or 40 UK fluid ounces, approximately 1.14 liters.</li>
            <li><strong>Gallon (UK):</strong> 4 UK quarts or 160 UK fluid ounces, approximately 4.55 liters.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">US vs. UK Measurements</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            It's important to note that US and UK liquid volume measurements use the same names but represent different volumes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>1 US fluid ounce = 29.5735 milliliters</li>
            <li>1 UK fluid ounce = 28.4131 milliliters</li>
            <li>1 US gallon = 3.78541 liters</li>
            <li>1 UK gallon = 4.54609 liters</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Applications</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Cooking and Baking:</strong> Converting between different recipe measurements.</li>
            <li><strong>Chemistry and Medicine:</strong> Precise measurement of liquids for experiments or medication.</li>
            <li><strong>Beverages:</strong> Understanding different bottle and serving sizes.</li>
            <li><strong>Fuel:</strong> Converting between gallons and liters for vehicle fuel.</li>
            <li><strong>International Travel:</strong> Understanding liquid measurements in different countries.</li>
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