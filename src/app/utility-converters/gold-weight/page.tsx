import React from 'react';
import GoldWeightConverter from '@/components/GoldWeightConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Gold Weight Converter | Convert Between Troy Ounces, Grams, and More',
  description: 'Convert between different gold weight units with our easy-to-use converter. Troy ounces, grams, pennyweight, and more.',
};

export default async function GoldWeightPage() {
  const calculator = await getCalculatorById('gold-weight');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Gold Weight Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different gold weight units with precision. Perfect for jewelers, precious metals traders, and collectors.
      </p>
      
      <GoldWeightConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Gold Weight Units</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Troy Weight System</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Gold and other precious metals are traditionally weighed using the troy weight system, which differs from the 
            avoirdupois system used for everyday items. The troy ounce (oz t) is the standard unit for precious metals trading worldwide.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Troy Ounce (oz t):</strong> The standard unit for precious metals, equal to 31.1035 grams.</li>
            <li><strong>Pennyweight (dwt):</strong> 1/20 of a troy ounce, equal to 1.55517 grams.</li>
            <li><strong>Grain:</strong> 1/480 of a troy ounce, equal to 0.06479891 grams.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Regional Gold Weight Units</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Different regions of the world have traditional units for measuring gold:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Tola:</strong> Used in India and South Asia, equal to 11.6638 grams.</li>
            <li><strong>Tael (Hong Kong):</strong> Used in China and East Asia, equal to 37.429 grams.</li>
            <li><strong>Baht:</strong> Used in Thailand, equal to 15.244 grams.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Metric and Imperial Units</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Gram (g):</strong> The basic metric unit of mass, commonly used for gold.</li>
            <li><strong>Kilogram (kg):</strong> 1,000 grams, used for larger quantities of gold.</li>
            <li><strong>Ounce (oz):</strong> The avoirdupois ounce, equal to 28.3495 grams (not commonly used for gold).</li>
            <li><strong>Pound (lb):</strong> The avoirdupois pound, equal to 453.592 grams (not commonly used for gold).</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Conversions</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>1 troy ounce = 31.1035 grams</li>
            <li>1 troy ounce = 20 pennyweight</li>
            <li>1 troy ounce = 480 grains</li>
            <li>1 kilogram = 32.1507 troy ounces</li>
            <li>1 tael (Hong Kong) = 1.20337 troy ounces</li>
            <li>1 tola = 0.375 troy ounces</li>
            <li>1 baht = 0.4901 troy ounces</li>
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