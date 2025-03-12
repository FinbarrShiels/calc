import React from 'react';
import StepsToCaloriesCalculator from '@/components/StepsToCaloriesCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Steps to Calories Calculator | Convert Steps to Calories Burned',
  description: 'Calculate how many calories you burn based on your step count, weight, and walking intensity with our easy-to-use steps to calories calculator.',
};

export default async function StepsToCaloriesCalculatorPage() {
  const calculator = await getCalculatorById('steps-to-calories');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <StepsToCaloriesCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Steps to Calories Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How Many Calories Do Steps Burn?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The number of calories burned from walking depends on several factors, including your weight, walking speed, terrain, and individual metabolism. On average, a person burns about 0.04 calories per step, but this can vary significantly based on these factors.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            For a more accurate calculation, our calculator takes into account your weight and walking intensity, as these are the two most significant factors affecting calorie burn during walking.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Average Calories Burned by Step Count</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Step Count</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Approximate Distance</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Calories Burned (150 lb person)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1,000 steps</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">0.5 miles (0.8 km)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">40-45 calories</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2,000 steps</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 mile (1.6 km)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">80-90 calories</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">5,000 steps</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2.5 miles (4 km)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">200-225 calories</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">10,000 steps</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">5 miles (8 km)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">400-450 calories</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">15,000 steps</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">7.5 miles (12 km)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">600-675 calories</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">20,000 steps</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">10 miles (16 km)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">800-900 calories</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Note: These are approximate values. Actual calorie burn varies based on individual factors.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Factors Affecting Calorie Burn</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Body Weight:</strong> Heavier individuals burn more calories performing the same activity as lighter individuals.</li>
            <li><strong>Walking Speed:</strong> Faster walking burns more calories per step than slower walking.</li>
            <li><strong>Terrain:</strong> Walking uphill or on uneven surfaces requires more energy and burns more calories.</li>
            <li><strong>Age:</strong> Metabolism generally slows with age, affecting calorie burn.</li>
            <li><strong>Fitness Level:</strong> More physically fit individuals may burn fewer calories doing the same activity due to increased efficiency.</li>
            <li><strong>Body Composition:</strong> Individuals with more muscle mass tend to burn more calories, even at rest.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Walking Intensity Levels</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Intensity</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Typical Speed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Casual</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Strolling, window shopping, very relaxed pace</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2-2.5 mph (3.2-4 km/h)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Average</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Normal walking pace, comfortable conversation possible</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2.5-3.5 mph (4-5.6 km/h)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Brisk</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Purposeful walking, slightly elevated heart rate</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">3.5-4.5 mph (5.6-7.2 km/h)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Power</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Very fast walking, arms swinging, challenging to maintain</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">4.5-5.5 mph (7.2-8.8 km/h)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Steps and Weight Loss</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            To lose one pound of weight, you need to create a calorie deficit of approximately 3,500 calories. Walking can be an effective part of a weight loss strategy:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>10,000 steps daily (approximately 400-500 calories) could lead to about 1 pound of weight loss every 7-10 days, assuming no changes in diet.</li>
            <li>Combining increased step count with dietary changes can accelerate weight loss.</li>
            <li>Consistency is key—maintaining a regular walking routine over time yields the best results.</li>
            <li>Gradually increasing your daily step count is more sustainable than dramatic increases.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Tips to Increase Your Daily Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
              <li>Take the stairs instead of elevators or escalators</li>
              <li>Park farther away from entrances</li>
              <li>Walk during phone calls or meetings</li>
              <li>Set hourly reminders to get up and move</li>
              <li>Take a short walk during lunch breaks</li>
            </ul>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
              <li>Walk to nearby destinations instead of driving</li>
              <li>Use a treadmill desk if possible</li>
              <li>Take the longer route when possible</li>
              <li>Walk your dog more frequently or for longer</li>
              <li>Join a walking group or challenge</li>
            </ul>
          </div>
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