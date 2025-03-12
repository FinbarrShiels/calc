import React from 'react';
import CookingConverter from '@/components/CookingConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Cooking Measurement Converter | Convert Kitchen Units',
  description: 'Convert between cooking measurements like cups, tablespoons, teaspoons, milliliters, fluid ounces, and more with our easy-to-use cooking converter.',
};

export default async function CookingConverterPage() {
  const calculator = await getCalculatorById('cooking-converter');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Cooking Measurement Converter</h1>
      
      <div className="mb-8">
        <CookingConverter calculator={calculator} />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Cooking Measurement Converter</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Why Use a Cooking Converter?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Cooking recipes from different countries often use different measurement systems. American recipes typically use volume measurements (cups, tablespoons), while European recipes often use weight (grams) or metric volume (milliliters). This converter helps you follow any recipe regardless of the measurement system used.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Cooking Measurement Conversions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Volume</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Equivalent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 cup</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">16 tablespoons / 48 teaspoons / 240 ml / 8 fl oz</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 tablespoon</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">3 teaspoons / 15 ml / 0.5 fl oz</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 teaspoon</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">5 ml / 0.17 fl oz</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 fluid ounce</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">30 ml / 2 tablespoons / 6 teaspoons</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 pint</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2 cups / 16 fl oz / 480 ml</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 quart</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">4 cups / 32 fl oz / 950 ml</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 gallon</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">16 cups / 128 fl oz / 3.8 liters</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 liter</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1000 ml / 4.2 cups / 33.8 fl oz</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">International Measurement Differences</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Be aware that measurement standards can vary internationally:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>US cup:</strong> 240 ml (8 fl oz)</li>
            <li><strong>UK/Commonwealth cup:</strong> 250 ml (8.8 fl oz)</li>
            <li><strong>Australian tablespoon:</strong> 20 ml (vs. 15 ml in US/UK)</li>
            <li><strong>Japanese cup (1合, ichi-gō):</strong> 180 ml (6.1 fl oz)</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This converter uses US standard measurements as the base for conversions.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Tips for Accurate Measuring</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Use the right tools: liquid measuring cups for liquids, dry measuring cups for dry ingredients</li>
            <li>For dry ingredients, fill the measuring cup and level off with a straight edge</li>
            <li>For liquids, place the measuring cup on a flat surface and read at eye level</li>
            <li>For most accurate results, especially in baking, use weight measurements (grams, ounces)</li>
            <li>When measuring sticky ingredients like honey or molasses, lightly coat the measuring cup with oil first</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Cooking Abbreviations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li><strong>tsp:</strong> teaspoon</li>
                <li><strong>tbsp:</strong> tablespoon</li>
                <li><strong>c:</strong> cup</li>
                <li><strong>pt:</strong> pint</li>
              </ul>
            </div>
            <div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li><strong>qt:</strong> quart</li>
                <li><strong>gal:</strong> gallon</li>
                <li><strong>oz:</strong> ounce</li>
                <li><strong>fl oz:</strong> fluid ounce</li>
              </ul>
            </div>
            <div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li><strong>lb:</strong> pound</li>
                <li><strong>g:</strong> gram</li>
                <li><strong>kg:</strong> kilogram</li>
                <li><strong>ml:</strong> milliliter</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            Food & Cooking
          </span>
        </div>
      </div>
    </div>
  );
} 