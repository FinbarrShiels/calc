import React from 'react';
import StepsToKmCalculator from '@/components/StepsToKmCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Steps to Kilometers Calculator | Convert Step Count to Distance',
  description: 'Convert your steps to kilometers with our easy-to-use calculator. Personalize results based on your height, stride length, and gender.',
};

export default async function StepsToKmCalculatorPage() {
  const calculator = await getCalculatorById('steps-to-km');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <StepsToKmCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Steps to Kilometers Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How Many Steps Are in a Kilometer?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            On average, there are approximately 1,250 to 1,550 steps in a kilometer for adults. However, this number varies significantly based on several factors, primarily your height and stride length. Taller individuals typically have longer strides and therefore take fewer steps to cover the same distance compared to shorter individuals.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Factors Affecting Steps per Kilometer</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Height:</strong> Taller people generally have longer strides and take fewer steps per kilometer.</li>
            <li><strong>Gender:</strong> On average, women take more steps per kilometer than men of the same height due to differences in stride length.</li>
            <li><strong>Walking Speed:</strong> Faster walking typically increases stride length, resulting in fewer steps per kilometer.</li>
            <li><strong>Terrain:</strong> Walking uphill, on sand, or on uneven surfaces often shortens stride length, increasing the number of steps needed.</li>
            <li><strong>Age:</strong> Stride length tends to decrease with age, leading to more steps per kilometer for older adults.</li>
            <li><strong>Fitness Level:</strong> More physically fit individuals often have longer, more efficient strides.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Average Steps per Kilometer by Height</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Height</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Average Steps per Kilometer (Men)</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Average Steps per Kilometer (Women)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">152 cm (5'0")</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,473</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,545</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">160 cm (5'3")</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,420</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,478</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">168 cm (5'6")</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,370</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,412</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">175 cm (5'9")</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,320</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,358</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">183 cm (6'0")</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,275</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,309</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">191 cm (6'3")</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,233</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,264</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Step Count Conversions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Step Count</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Approximate Distance (Average Adult)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,000 steps</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">0.7 - 0.8 km (0.4 - 0.5 miles)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2,000 steps</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1.4 - 1.6 km (0.8 - 1.0 miles)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">5,000 steps</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">3.5 - 4.0 km (2.2 - 2.5 miles)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">10,000 steps</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">7.0 - 8.0 km (4.3 - 5.0 miles)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">15,000 steps</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">10.5 - 12.0 km (6.5 - 7.5 miles)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">20,000 steps</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">14.0 - 16.0 km (8.7 - 10.0 miles)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Using Step Count for Fitness Goals</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Converting steps to kilometers can be useful for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Setting Daily Step Goals:</strong> Many health organizations recommend 10,000 steps per day (approximately 7-8 kilometers) for general fitness.</li>
            <li><strong>Tracking Progress:</strong> If you know your step count, you can estimate how far you've walked.</li>
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