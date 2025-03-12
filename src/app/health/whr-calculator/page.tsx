import React from 'react';
import WHRCalculator from '@/components/WHRCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'WHR Calculator | Waist-to-Hip Ratio Calculator',
  description: 'Calculate your Waist-to-Hip Ratio (WHR) to assess your body fat distribution and potential health risks with our easy-to-use calculator.',
};

export default async function WHRCalculatorPage() {
  const calculator = await getCalculatorById('whr-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <WHRCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Waist-to-Hip Ratio (WHR) Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is Waist-to-Hip Ratio?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Waist-to-Hip Ratio (WHR) is a measurement of the proportion of your waist circumference to your hip circumference. It's used to assess how fat is distributed around your body and is a useful indicator of health risk related to being overweight or obese.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            WHR is calculated by dividing your waist measurement by your hip measurement. The result gives an indication of whether you're carrying too much weight around your middle, which is associated with a higher risk of certain health conditions.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">WHR Health Risk Categories</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Gender</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Low Risk</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Moderate Risk</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">High Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Men</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">0.95 or below</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">0.96 to 1.0</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1.0+</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Women</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">0.80 or below</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">0.81 to 0.85</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">0.85+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Source: World Health Organization (WHO)
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How to Measure Waist and Hip Circumference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Waist Measurement</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                <li>Stand up straight and breathe out gently</li>
                <li>Find the bottom of your ribs and the top of your hips</li>
                <li>Place the tape measure midway between these points, usually around your navel</li>
                <li>Ensure the tape is snug but not compressing the skin</li>
                <li>Take the measurement after breathing out normally</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Hip Measurement</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                <li>Stand with feet close together</li>
                <li>Find the widest part of your buttocks</li>
                <li>Place the tape measure around this widest part</li>
                <li>Ensure the tape is level all the way around</li>
                <li>The tape should be snug but not tight</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Health Implications of WHR</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            WHR is an indicator of body fat distribution. People with more weight around their waist ("apple-shaped") face higher health risks than those with more weight around their hips ("pear-shaped").
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            A high WHR is associated with an increased risk of:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Type 2 diabetes</li>
            <li>Heart disease</li>
            <li>High blood pressure</li>
            <li>Stroke</li>
            <li>Some types of cancer</li>
            <li>Metabolic syndrome</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">WHR vs. BMI</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            While Body Mass Index (BMI) is a useful tool for assessing overall body weight relative to height, WHR provides additional information about fat distribution. Some key differences:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Aspect</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">WHR</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">BMI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Measures</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Fat distribution</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Overall body weight relative to height</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Calculation</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Waist circumference ÷ Hip circumference</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Weight (kg) ÷ Height² (m²)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Strengths</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Better predictor of health risks related to visceral fat</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Simple to calculate, widely used</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Limitations</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Doesn't account for overall body size</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Doesn't distinguish between fat and muscle</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Tips to Improve Your WHR</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Regular Exercise:</strong> Include both cardiovascular exercise and strength training in your routine.</li>
            <li><strong>Healthy Diet:</strong> Focus on a balanced diet rich in fruits, vegetables, lean proteins, and whole grains.</li>
            <li><strong>Reduce Added Sugars:</strong> Limit consumption of sugary beverages and processed foods.</li>
            <li><strong>Manage Stress:</strong> Chronic stress can contribute to abdominal fat accumulation.</li>
            <li><strong>Adequate Sleep:</strong> Aim for 7-9 hours of quality sleep per night.</li>
            <li><strong>Limit Alcohol:</strong> Excessive alcohol consumption can lead to increased abdominal fat.</li>
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