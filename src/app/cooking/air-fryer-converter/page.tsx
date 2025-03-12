import React from 'react';
import AirFryerConverter from '@/components/AirFryerConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Air Fryer Converter | Convert Oven Recipes to Air Fryer',
  description: 'Convert conventional and fan oven cooking times and temperatures to air fryer settings with our easy-to-use air fryer converter calculator.',
};

export default async function AirFryerConverterPage() {
  const calculator = await getCalculatorById('air-fryer-converter');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Air Fryer Converter</h1>
      
      <div className="mb-8">
        <AirFryerConverter calculator={calculator} />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Air Fryer Converter</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Converting Oven Recipes to Air Fryer</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Air fryers cook food faster than conventional ovens due to their smaller size and more efficient hot air circulation. When converting recipes from a traditional oven to an air fryer, you'll typically need to reduce both the temperature and cooking time. This calculator helps you make those adjustments for perfect results.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">General Conversion Guidelines</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Aspect</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Conversion Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Temperature</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Reduce by 25°F (15°C) from conventional oven temperature</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Cooking Time</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Reduce by approximately 20-30%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Food Arrangement</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Single layer works best; avoid overcrowding</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Oil Usage</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Reduce oil by 70-80% compared to deep frying</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Factors Affecting Air Fryer Cooking</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Air Fryer Size and Model:</strong> Different models may cook at slightly different rates.</li>
            <li><strong>Food Quantity:</strong> Cooking larger amounts may require longer cooking times or cooking in batches.</li>
            <li><strong>Food Size and Thickness:</strong> Thicker pieces require longer cooking times.</li>
            <li><strong>Starting Temperature:</strong> Frozen foods will take longer than room temperature foods.</li>
            <li><strong>Desired Doneness:</strong> Personal preference for how well-done you want your food.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Air Fryer Cooking Times</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Meat & Poultry</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li><strong>Chicken wings:</strong> 380°F (190°C) for 20-25 minutes</li>
                <li><strong>Chicken breasts:</strong> 370°F (185°C) for 15-20 minutes</li>
                <li><strong>Hamburgers:</strong> 375°F (190°C) for 10-15 minutes</li>
                <li><strong>Steak:</strong> 400°F (200°C) for 10-15 minutes</li>
                <li><strong>Pork chops:</strong> 375°F (190°C) for 12-15 minutes</li>
                <li><strong>Bacon:</strong> 350°F (175°C) for 8-10 minutes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Vegetables & Sides</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li><strong>French fries:</strong> 380°F (190°C) for 15-20 minutes</li>
                <li><strong>Roasted vegetables:</strong> 375°F (190°C) for 10-15 minutes</li>
                <li><strong>Frozen mozzarella sticks:</strong> 360°F (180°C) for 6-8 minutes</li>
                <li><strong>Frozen pizza:</strong> 350°F (175°C) for 8-10 minutes</li>
                <li><strong>Baked potatoes:</strong> 400°F (200°C) for 30-40 minutes</li>
                <li><strong>Garlic bread:</strong> 350°F (175°C) for 3-5 minutes</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Air Fryer Tips for Best Results</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Preheat Your Air Fryer:</strong> For most recipes, preheating for 3-5 minutes helps achieve better results.</li>
            <li><strong>Don't Overcrowd:</strong> Arrange food in a single layer with space between pieces for proper air circulation.</li>
            <li><strong>Shake or Flip:</strong> Shake the basket or flip food halfway through cooking for even browning.</li>
            <li><strong>Use a Light Coating of Oil:</strong> A light spray or brush of oil helps achieve crispiness.</li>
            <li><strong>Check Early:</strong> Since air fryers cook quickly, check food a few minutes before the estimated cooking time.</li>
            <li><strong>Use Foil or Parchment Paper:</strong> For easier cleanup, but make sure it doesn't block air circulation.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Foods That Work Well in an Air Fryer</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>Frozen foods (fries, nuggets)</li>
                <li>Chicken wings and drumsticks</li>
                <li>Breaded foods</li>
                <li>Roasted vegetables</li>
              </ul>
            </div>
            <div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>Bacon</li>
                <li>Hamburgers</li>
                <li>Fish fillets</li>
                <li>Reheating pizza</li>
              </ul>
            </div>
            <div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>Toasted nuts</li>
                <li>Potato chips</li>
                <li>Meatballs</li>
                <li>Cookies and small desserts</li>
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