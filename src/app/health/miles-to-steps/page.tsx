import React from 'react';
import MilesToStepsCalculator from '@/components/MilesToStepsCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Miles to Steps Calculator | Convert Distance to Step Count',
  description: 'Convert miles or kilometers to steps with our easy-to-use calculator. Personalize results based on your height, stride length, and gender.',
};

export default async function MilesToStepsCalculatorPage() {
  const calculator = await getCalculatorById('miles-to-steps');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <MilesToStepsCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Miles to Steps Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How Many Steps Are in a Mile?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            On average, there are approximately 2,000 to 2,500 steps in a mile for adults. However, this number varies significantly based on several factors, primarily your height and stride length. Taller individuals typically have longer strides and therefore take fewer steps to cover the same distance compared to shorter individuals.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Factors Affecting Steps per Mile</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Height:</strong> Taller people generally have longer strides and take fewer steps per mile.</li>
            <li><strong>Gender:</strong> On average, women take more steps per mile than men of the same height due to differences in stride length.</li>
            <li><strong>Walking Speed:</strong> Faster walking typically increases stride length, resulting in fewer steps per mile.</li>
            <li><strong>Terrain:</strong> Walking uphill, on sand, or on uneven surfaces often shortens stride length, increasing the number of steps needed.</li>
            <li><strong>Age:</strong> Stride length tends to decrease with age, leading to more steps per mile for older adults.</li>
            <li><strong>Fitness Level:</strong> More physically fit individuals often have longer, more efficient strides.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Average Steps per Mile by Height</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Height</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Average Steps per Mile (Men)</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Average Steps per Mile (Women)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">5'0" (152 cm)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2,371</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2,486</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">5'3" (160 cm)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2,286</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2,379</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">5'6" (168 cm)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2,205</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2,272</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">5'9" (175 cm)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2,125</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2,186</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">6'0" (183 cm)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2,052</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2,107</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">6'3" (191 cm)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,985</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2,034</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Distance Conversions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Distance</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Approximate Steps (Average Adult)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1/4 mile (0.4 km)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">500 - 600 steps</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1/2 mile (0.8 km)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,000 - 1,200 steps</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 mile (1.6 km)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2,000 - 2,500 steps</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">3 miles (4.8 km)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">6,000 - 7,500 steps</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">5 miles (8 km)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">10,000 - 12,500 steps</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">10 miles (16 km)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">20,000 - 25,000 steps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Using Step Count for Fitness Goals</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Converting miles to steps can be useful for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Setting Daily Step Goals:</strong> Many health organizations recommend 10,000 steps per day (approximately 4-5 miles) for general fitness.</li>
            <li><strong>Tracking Progress:</strong> If you know a route's distance, you can estimate how many steps you'll take.</li>
            <li><strong>Planning Workouts:</strong> Convert target distances to step counts for pedometer-based exercise planning.</li>
            <li><strong>Comparing Activity Levels:</strong> Steps provide a standardized way to compare different activities.</li>
          </ul>
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