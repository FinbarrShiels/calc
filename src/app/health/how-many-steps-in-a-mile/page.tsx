import React from 'react';
import StepsCalculator from '@/components/StepsCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'How Many Steps in a Mile Calculator | Calculate Steps per Mile',
  description: 'Calculate how many steps it takes to walk a mile based on your height, stride length, and gender with our easy-to-use steps per mile calculator.',
};

export default async function StepsCalculatorPage() {
  const calculator = await getCalculatorById('how-many-steps-in-a-mile');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <StepsCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Steps per Mile Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How Many Steps Are in a Mile?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            On average, there are approximately 2,000 to 2,500 steps in a mile for adults. However, this number varies significantly based on several factors, primarily your height and stride length. Taller individuals typically have longer strides and therefore take fewer steps to cover the same distance compared to shorter individuals.
          </p>
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
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding Stride Length</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Stride length is the distance covered from the heel print of one foot to the heel print of the same foot when taking a step. It's influenced by several factors:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Height:</strong> Taller people generally have longer strides.</li>
            <li><strong>Gender:</strong> Men typically have longer strides than women of the same height.</li>
            <li><strong>Walking Speed:</strong> Faster walking usually increases stride length.</li>
            <li><strong>Age:</strong> Stride length tends to decrease with age.</li>
            <li><strong>Fitness Level:</strong> More physically fit individuals often have longer strides.</li>
            <li><strong>Terrain:</strong> Uphill walking shortens stride length, while downhill walking can lengthen it.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Steps and Fitness Goals</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Understanding how many steps you take per mile can help you set and track fitness goals:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>10,000 Steps Goal:</strong> A common daily target is 10,000 steps, which is approximately 4-5 miles for most people.</li>
            <li><strong>Distance Tracking:</strong> Knowing your steps per mile helps convert your step count to distance walked.</li>
            <li><strong>Calorie Estimation:</strong> More accurate distance measurements lead to better calorie burn estimates.</li>
            <li><strong>Progress Monitoring:</strong> Track improvements in fitness by monitoring changes in your stride length over time.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How to Measure Your Stride Length</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you want to measure your actual stride length rather than using an estimate:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Mark a starting point on the ground.</li>
            <li>Take 10 normal steps at your usual walking pace.</li>
            <li>Mark your ending position (where the heel of the same foot you started with lands).</li>
            <li>Measure the distance between the starting and ending marks in inches or centimeters.</li>
            <li>Divide this distance by 10 to get your average stride length.</li>
          </ol>
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