import React from 'react';
import BakingConversionCalculator from '@/components/BakingConversionCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Baking Ingredient Conversion Calculator | Convert Cooking Measurements',
  description: 'Convert baking ingredients between cups, grams, ounces, pounds, tablespoons, and teaspoons with our easy-to-use baking conversion calculator.',
};

export default async function BakingConversionCalculatorPage() {
  const calculator = await getCalculatorById('baking-conversion');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Baking Conversion Calculator</h1>
      
      <div className="mb-8">
        <BakingConversionCalculator calculator={calculator} />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Baking Ingredient Conversion Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Why Convert Baking Measurements?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Accurate measurements are crucial in baking. Unlike cooking, where you can often adjust ingredients to taste, baking is a science that requires precision. Recipes from different countries often use different measurement systems - US recipes typically use volume measurements (cups, tablespoons), while European recipes often use weight measurements (grams, ounces). Converting between these systems ensures your baked goods turn out as intended.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Weight vs. Volume Measurements</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Weight measurements (grams, ounces) are generally more accurate than volume measurements (cups, tablespoons) because the density of ingredients can vary. For example, a cup of flour can weigh anywhere from 120-150 grams depending on how it's scooped. Professional bakers prefer weight measurements for consistency.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Baking Ingredient Conversions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Ingredient</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">1 Cup</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">1 Tablespoon</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">1 Teaspoon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">All-Purpose Flour</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">125g / 4.4oz</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">8g / 0.3oz</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2.6g / 0.1oz</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Granulated Sugar</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">200g / 7.1oz</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">12.5g / 0.4oz</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">4.2g / 0.15oz</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Brown Sugar (packed)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">220g / 7.8oz</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">13.8g / 0.5oz</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">4.6g / 0.16oz</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Butter</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">227g / 8oz</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">14.2g / 0.5oz</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">4.7g / 0.17oz</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Milk</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">240g / 8.5oz</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">15g / 0.5oz</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">5g / 0.18oz</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Note: These are approximate values. Actual measurements may vary slightly based on factors like humidity, temperature, and how ingredients are measured.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Tips for Accurate Measuring</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">For Volume Measurements</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                <li>For flour: Spoon into measuring cup and level with a knife</li>
                <li>For sugar: Fill the cup and level off</li>
                <li>For brown sugar: Pack firmly into the cup</li>
                <li>For liquids: Use a liquid measuring cup on a flat surface</li>
                <li>For tablespoons/teaspoons: Fill and level off</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">For Weight Measurements</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                <li>Use a digital scale for best accuracy</li>
                <li>Tare (zero) the scale with the container before adding ingredients</li>
                <li>Measure ingredients individually for recipes requiring precision</li>
                <li>Check your scale's accuracy periodically</li>
                <li>Consider the minimum weight your scale can accurately measure</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding Different Flours</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Different types of flour have different protein contents and weights:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>All-Purpose Flour:</strong> Versatile with medium protein content (10-12%)</li>
            <li><strong>Bread Flour:</strong> Higher protein content (12-14%) for chewier textures</li>
            <li><strong>Cake Flour:</strong> Lower protein content (7-9%) for tender cakes</li>
            <li><strong>Pastry Flour:</strong> Slightly higher protein than cake flour (8-9%)</li>
            <li><strong>Whole-Wheat Flour:</strong> Contains the entire wheat kernel, heavier than white flours</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">International Measurement Differences</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Be aware that measurement standards can vary internationally:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>US cup = 236ml</li>
            <li>UK/Commonwealth cup = 250ml</li>
            <li>Australian tablespoon = 20ml (vs. 15ml in US/UK)</li>
            <li>US recipes typically use volume measurements</li>
            <li>European recipes typically use weight measurements</li>
          </ul>
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