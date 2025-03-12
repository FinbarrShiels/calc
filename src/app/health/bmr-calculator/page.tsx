import React from 'react';
import BMRCalculator from '@/components/BMRCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'BMR Calculator | Calculate Your Basal Metabolic Rate',
  description: 'Calculate your Basal Metabolic Rate (BMR) to understand your daily calorie needs at rest using different formulas including Mifflin-St Jeor and Harris-Benedict.',
};

export default async function BMRCalculatorPage() {
  const calculator = await getCalculatorById('bmr-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BMRCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About BMR Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is BMR?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Basal Metabolic Rate (BMR) is the number of calories your body needs to accomplish its most basic life-sustaining functions, like breathing, circulation, and cell production. In other words, it's the amount of energy expended per day at rest.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your BMR represents the minimum amount of energy needed to keep your body functioning, including breathing and keeping your heart beating. It does not include the calories you need for your daily activities or exercise.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">BMR Calculation Methods</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            There are several formulas used to calculate BMR:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Mifflin-St Jeor Equation:</strong> Considered the most accurate formula for most people.</li>
            <li><strong>Harris-Benedict Equation:</strong> One of the earliest equations developed (revised in 1984).</li>
            <li><strong>Katch-McArdle Formula:</strong> Takes into account lean body mass, which can be more accurate for athletic individuals.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How to Use Your BMR</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Your BMR is just the starting point for understanding your caloric needs. To estimate your total daily calorie requirements, you need to multiply your BMR by an activity factor:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Sedentary (little or no exercise):</strong> BMR × 1.2</li>
            <li><strong>Lightly active (light exercise 1-3 days/week):</strong> BMR × 1.375</li>
            <li><strong>Moderately active (moderate exercise 3-5 days/week):</strong> BMR × 1.55</li>
            <li><strong>Very active (hard exercise 6-7 days/week):</strong> BMR × 1.725</li>
            <li><strong>Extra active (very hard exercise & physical job):</strong> BMR × 1.9</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The resulting number is your Total Daily Energy Expenditure (TDEE), which estimates how many calories you burn per day when exercise is taken into account.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Factors Affecting BMR</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Several factors can influence your BMR:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Age:</strong> BMR decreases as you age</li>
            <li><strong>Body composition:</strong> More muscle mass increases BMR</li>
            <li><strong>Gender:</strong> Men typically have higher BMRs than women</li>
            <li><strong>Genetics:</strong> Some people naturally have higher or lower BMRs</li>
            <li><strong>Hormones:</strong> Thyroid issues can significantly impact BMR</li>
            <li><strong>Climate:</strong> Living in extreme temperatures can increase BMR</li>
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