import React from 'react';
import OvenTemperatureConverter from '@/components/OvenTemperatureConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Oven Temperature Converter | Convert Between Fahrenheit, Celsius, Gas Mark',
  description: 'Convert oven temperatures between Fahrenheit, Celsius, Celsius (Fan/Convection), and Gas Mark with our easy-to-use oven temperature converter.',
};

export default async function OvenTemperatureConverterPage() {
  const calculator = await getCalculatorById('oven-temperatures');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Oven Temperature Converter</h1>
      
      <div className="mb-8">
        <OvenTemperatureConverter calculator={calculator} />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Oven Temperature Converter</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding Oven Temperature Scales</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Different countries and recipes use different temperature scales for oven cooking. This converter helps you translate between Fahrenheit (°F), Celsius (°C), Celsius Fan/Convection, and Gas Mark settings to ensure your recipes turn out perfectly regardless of where they originated.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Oven Temperature Conversions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Fahrenheit (°F)</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Celsius (°C)</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Celsius Fan (°C)</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Gas Mark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Very Low</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">275°F</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">140°C</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">120°C</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Low</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">300°F</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">150°C</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">130°C</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Moderate</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">325-350°F</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">160-180°C</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">140-160°C</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">3-4</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Moderately Hot</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">375-400°F</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">190-200°C</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">170-180°C</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">5-6</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Hot</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">425-450°F</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">220-230°C</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">200-210°C</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">7-8</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Very Hot</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">475-500°F</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">240-260°C</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">220-240°C</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">9-10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding Fan/Convection Ovens</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Fan or convection ovens use a fan to circulate hot air around the food, resulting in more even cooking and often faster cooking times. When converting a standard recipe to a fan oven, the general rule is to reduce the temperature by about 20°C (or 25°F) from the conventional oven temperature.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This is because the circulating air transfers heat more efficiently to the food, so a lower temperature achieves the same cooking effect. You may also find that cooking times are reduced by approximately 10-15%.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">About Gas Mark</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Gas Mark is a temperature scale used on gas ovens in the UK, Ireland, and some Commonwealth countries. The scale ranges from ¼ to 10, with each mark representing a specific temperature. Gas Mark 4, for example, is approximately 350°F or 180°C.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The Gas Mark system was developed in the 1940s and 1950s when gas ovens became common in households. While many modern gas ovens now display temperatures in Celsius or Fahrenheit, older recipes and cookbooks may still reference Gas Mark settings.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Temperature Conversion Formulas</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Fahrenheit to Celsius:</strong> (°F - 32) × 5/9 = °C</li>
            <li><strong>Celsius to Fahrenheit:</strong> (°C × 9/5) + 32 = °F</li>
            <li><strong>Conventional to Fan/Convection:</strong> °C - 20 = °C Fan (approximate)</li>
            <li><strong>Gas Mark to Celsius:</strong> (Gas Mark × 25) + 135 = °C (approximate)</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Tips for Accurate Oven Temperatures</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Use an Oven Thermometer:</strong> Many ovens run hotter or cooler than their set temperature. An oven thermometer can help you verify the actual temperature.</li>
            <li><strong>Preheat Thoroughly:</strong> Allow your oven to preheat for at least 10-15 minutes before baking to ensure it reaches the desired temperature.</li>
            <li><strong>Avoid Opening the Door:</strong> Each time you open the oven door, the temperature can drop significantly. Use the oven light to check on food when possible.</li>
            <li><strong>Position Racks Properly:</strong> For most baking, the middle rack provides the most even heat distribution.</li>
            <li><strong>Adjust for Dark Pans:</strong> Dark-colored pans absorb more heat. Consider reducing the temperature by 25°F when using dark pans.</li>
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