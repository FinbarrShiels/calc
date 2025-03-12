import React from 'react';
import WalkingTimeCalculator from '@/components/WalkingTimeCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'How Long to Walk a Mile Calculator | Calculate Walking Time',
  description: 'Calculate how long it takes to walk a mile based on your pace, age, fitness level, and terrain with our easy-to-use walking time calculator.',
};

export default async function WalkingTimeCalculatorPage() {
  const calculator = await getCalculatorById('how-long-to-walk-a-mile');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <WalkingTimeCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Walking Time Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How Long Does It Take to Walk a Mile?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The average person takes about 15-20 minutes to walk a mile at a moderate pace (3 mph). However, this can vary significantly based on several factors including your walking speed, age, fitness level, terrain, and whether you're walking for leisure or exercise.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Average Walking Speeds by Age and Fitness Level</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Age Group</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Casual Pace (mph)</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Brisk Pace (mph)</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Power Walking (mph)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">20-29</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2.8 - 3.0</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">3.5 - 4.0</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">4.5 - 5.0</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">30-39</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2.7 - 3.0</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">3.4 - 3.9</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">4.3 - 4.8</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">40-49</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2.6 - 2.9</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">3.2 - 3.8</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">4.0 - 4.6</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">50-59</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2.5 - 2.8</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">3.0 - 3.6</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">3.8 - 4.4</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">60-69</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2.4 - 2.7</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2.8 - 3.4</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">3.5 - 4.1</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">70+</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2.2 - 2.5</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">2.6 - 3.2</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">3.2 - 3.8</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Factors Affecting Walking Time</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Fitness Level:</strong> More physically fit individuals typically walk faster.</li>
            <li><strong>Age:</strong> Walking speed tends to decrease with age.</li>
            <li><strong>Terrain:</strong> Walking uphill, on sand, or on uneven surfaces takes longer than walking on flat, paved surfaces.</li>
            <li><strong>Weather Conditions:</strong> Wind, rain, snow, or extreme temperatures can slow walking pace.</li>
            <li><strong>Purpose:</strong> Walking for exercise is typically faster than casual strolling.</li>
            <li><strong>Height and Stride Length:</strong> Taller people with longer legs generally have longer strides and walk faster.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Health Benefits of Walking</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Walking is one of the most accessible forms of exercise with numerous health benefits:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Improves cardiovascular health</li>
            <li>Helps maintain a healthy weight</li>
            <li>Strengthens bones and muscles</li>
            <li>Improves balance and coordination</li>
            <li>Reduces stress and improves mood</li>
            <li>Lowers risk of chronic diseases like heart disease, stroke, and type 2 diabetes</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Walking for Weight Loss</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Walking can be an effective part of a weight loss program. A 155-pound person burns approximately 232 calories walking at a moderate pace (3.5 mph) for one hour. To maximize calorie burn, consider increasing your pace, adding inclines to your route, or incorporating interval training by alternating between faster and slower walking speeds.
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