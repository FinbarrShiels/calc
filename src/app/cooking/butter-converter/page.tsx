import React from 'react';
import ButterConverter from '@/components/ButterConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Butter Converter | Convert Between Sticks, Cups, Grams, Pounds, Tablespoons',
  description: 'Convert butter measurements between sticks, cups, grams, pounds, tablespoons, and more with our easy-to-use butter converter calculator.',
};

export default async function ButterConverterPage() {
  const calculator = await getCalculatorById('butter-converter');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Butter Converter</h1>
      
      <div className="mb-8">
        <ButterConverter calculator={calculator} />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Butter Converter</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding Butter Measurements</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Butter is sold and measured differently around the world. In the US, butter typically comes in 1/2 pound (227g) packages divided into 4 sticks, while in Europe and many other countries, butter is sold by weight (250g, 500g blocks). This converter helps you translate between different butter measurements to ensure your recipes turn out perfectly.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Butter Measurement Equivalents</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">US Sticks</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">US Cups</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Tablespoons</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Grams</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Ounces</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Pounds</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">¼ stick</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">⅛ cup</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2 tbsp</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">28g</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 oz</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">0.06 lb</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">½ stick</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">¼ cup</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">4 tbsp</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">57g</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2 oz</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">0.13 lb</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 stick</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">½ cup</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">8 tbsp</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">113g</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">4 oz</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">0.25 lb</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2 sticks</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 cup</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">16 tbsp</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">227g</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">8 oz</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">0.5 lb</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">4 sticks</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2 cups</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">32 tbsp</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">454g</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">16 oz</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 lb</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">International Butter Packaging</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Butter is packaged differently around the world, which can make recipe conversion challenging:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>United States:</strong> Typically sold in 1-pound boxes containing 4 sticks (each stick is ¼ pound or ½ cup).</li>
            <li><strong>Europe:</strong> Usually sold in 250g or 500g blocks, without stick markings.</li>
            <li><strong>Australia/New Zealand:</strong> Commonly sold in 250g or 500g blocks with measurement markings on the wrapper.</li>
            <li><strong>Canada:</strong> Often sold in 454g (1 pound) packages, sometimes with markings for ¼ cup portions.</li>
            <li><strong>UK:</strong> Typically sold in 250g blocks, with some brands offering measurement markings on the wrapper.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Tips for Measuring Butter</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">For Sticks with Wrappers</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                <li>Use the measurement markings on the wrapper</li>
                <li>Most US butter wrappers have tablespoon and cup markings</li>
                <li>Cut along the appropriate line for precise measurements</li>
                <li>Keep butter cold for easier cutting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">For Block Butter</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                <li>Use a kitchen scale for most accurate measurements</li>
                <li>Some blocks have measurement markings on the wrapper</li>
                <li>For tablespoon measurements, use a tablespoon measure to scoop</li>
                <li>For softened butter, pack firmly into measuring cups</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Butter Substitutions</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you need to substitute butter in a recipe, here are some common alternatives and their conversion ratios:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Substitute</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Ratio</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Best Used For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Margarine</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1:1</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Baking, cooking, spreading</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Coconut Oil</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1:1</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Baking, sautéing</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Olive Oil</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">¾:1</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Cooking, some baking</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Applesauce</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">½:1</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Sweet baked goods</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Greek Yogurt</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">½:1</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Baking, creamy dishes</td>
                </tr>
              </tbody>
            </table>
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