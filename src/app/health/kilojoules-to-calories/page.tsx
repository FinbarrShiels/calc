import React from 'react';
import KilojoulesToCaloriesCalculator from '@/components/KilojoulesToCaloriesCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Kilojoules to Calories Calculator | Convert kJ to Cal',
  description: 'Convert kilojoules (kJ) to calories (cal) and kilocalories (kcal) with our easy-to-use energy conversion calculator. Perfect for nutrition and fitness tracking.',
};

export default async function KilojoulesToCaloriesCalculatorPage() {
  const calculator = await getCalculatorById('kilojoules-to-calories');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <KilojoulesToCaloriesCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Kilojoules to Calories Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding Energy Units</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Both kilojoules (kJ) and calories (cal) are units of energy, but they're used in different contexts and regions around the world:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Kilojoule (kJ):</strong> The standard scientific unit of energy in the International System of Units (SI). It's commonly used for food energy in Australia, New Zealand, and some European countries.</li>
            <li><strong>Calorie (cal):</strong> A non-SI unit of energy. The small calorie (cal) is the amount of energy needed to raise the temperature of 1 gram of water by 1°C.</li>
            <li><strong>Kilocalorie (kcal):</strong> Equal to 1,000 small calories. This is what's commonly referred to as a "Calorie" (with a capital C) in nutrition and food labeling in the United States and many other countries.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formulas</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Conversion</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Kilojoules to Calories (small calories)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 kJ = 239.006 cal</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Kilojoules to Kilocalories (food calories)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 kJ = 0.239006 kcal</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Calories to Kilojoules</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 cal = 0.004184 kJ</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Kilocalories to Kilojoules</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 kcal = 4.184 kJ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Why Convert Between Kilojoules and Calories?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            There are several reasons why you might need to convert between kilojoules and calories:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>International Food Labels:</strong> Food products from different countries may use different energy units.</li>
            <li><strong>Fitness Tracking:</strong> Some fitness apps and devices may display energy in units different from what you're used to.</li>
            <li><strong>Dietary Guidelines:</strong> Nutritional recommendations may be given in either kilojoules or calories depending on the country.</li>
            <li><strong>Scientific Research:</strong> When reading scientific literature, you may need to convert between units to compare findings.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Kilojoules vs. Calories in Different Countries</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Different countries use different energy units on their food labels:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Kilojoules (kJ):</strong> Australia, New Zealand, South Africa, and some European countries</li>
            <li><strong>Kilocalories (kcal):</strong> United States, Canada, United Kingdom, and many European countries</li>
            <li><strong>Both units:</strong> Some countries require both units to be displayed on food labels</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Daily Energy Requirements</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Average daily energy requirements vary based on age, gender, weight, height, and activity level:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Average adult male:</strong> 8,700-10,500 kJ (2,080-2,510 kcal)</li>
            <li><strong>Average adult female:</strong> 7,100-8,400 kJ (1,700-2,000 kcal)</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            These are general guidelines. For personalized recommendations, consult with a healthcare professional or dietitian.
          </p>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
            Health & Fitness
          </span>
        </div>
      </div>
    </div>
  );
} 