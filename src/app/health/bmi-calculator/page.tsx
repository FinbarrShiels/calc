import React from 'react';
import BMICalculator from '@/components/BMICalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'BMI Calculator | Calculate Your Body Mass Index',
  description: 'Calculate your Body Mass Index (BMI) to assess your weight relative to your height and understand what it means for your health.',
};

export default async function BMICalculatorPage() {
  const calculator = await getCalculatorById('bmi-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BMICalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About BMI Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is BMI?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Body Mass Index (BMI) is a numerical value of your weight in relation to your height. It's a commonly used indicator to categorize individuals as underweight, normal weight, overweight, or obese.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            BMI is calculated by dividing your weight in kilograms by the square of your height in meters (kg/m²). It provides a simple numeric measure that can help assess potential health risks related to weight.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">BMI Categories</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">BMI Range</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Weight Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Health Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Below 18.5</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Underweight</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Increased risk for some health problems</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">18.5 - 24.9</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Normal weight</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Lowest risk for health problems</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">25.0 - 29.9</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Overweight</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Increased risk for health problems</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">30.0 - 34.9</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Obesity (Class 1)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">High risk for health problems</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">35.0 - 39.9</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Obesity (Class 2)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Very high risk for health problems</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">40.0 and above</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Obesity (Class 3)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Extremely high risk for health problems</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Limitations of BMI</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            While BMI is a useful tool for assessing weight status in the general population, it has several limitations:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>It doesn't distinguish between fat, muscle, and bone mass</li>
            <li>It doesn't account for body fat distribution</li>
            <li>It may not be accurate for athletes, elderly individuals, or pregnant women</li>
            <li>It doesn't consider factors like ethnicity, which can affect healthy BMI ranges</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            For a more comprehensive assessment of health, BMI should be used alongside other measurements like waist circumference, body fat percentage, and consideration of lifestyle factors.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">BMI for Children and Teens</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            For children and teenagers (aged 2-19), BMI is calculated the same way as for adults, but the interpretation is different. For youth, BMI is age- and sex-specific and is often referred to as "BMI-for-age." Instead of fixed categories, children's BMI results are given as a percentile comparing them to other children of the same age and sex.
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