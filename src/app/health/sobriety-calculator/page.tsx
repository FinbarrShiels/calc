import React from 'react';
import SobrietyCalculator from '@/components/SobrietyCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Sobriety Calculator | Track Your Sober Time',
  description: 'Calculate and track your sobriety time with our easy-to-use sobriety calculator. See your progress in years, months, days, hours, and more.',
};

export default async function SobrietyCalculatorPage() {
  const calculator = await getCalculatorById('sobriety-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SobrietyCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Sobriety Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Why Track Sobriety Time?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Tracking your sobriety time can be a powerful motivational tool in recovery. It provides a tangible measure of your progress and serves as a reminder of your commitment to a healthier lifestyle. Many people find that watching their sober days accumulate helps reinforce their decision to remain substance-free.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Sobriety Milestones</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Milestone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Significance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">24 Hours</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">The first day is often the hardest. Making it 24 hours is a significant achievement.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 Week</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Physical withdrawal symptoms often begin to subside. Sleep may improve.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 Month</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Many people notice improved mental clarity, energy levels, and mood stability.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">90 Days</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">The brain begins to heal more significantly. New habits are becoming established.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">6 Months</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Many people report significant improvements in relationships and work performance.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1 Year</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">A major milestone. You've navigated through all seasonal triggers and annual events.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">5 Years</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Relapse rates drop significantly after 5 years of continuous sobriety.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Benefits of Sobriety</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Maintaining sobriety can lead to numerous physical, mental, and social benefits:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Physical Benefits</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                <li>Improved liver function</li>
                <li>Better sleep quality</li>
                <li>Increased energy levels</li>
                <li>Stronger immune system</li>
                <li>Weight normalization</li>
                <li>Reduced risk of various diseases</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Mental Benefits</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                <li>Improved mental clarity</li>
                <li>Reduced anxiety and depression</li>
                <li>Better memory function</li>
                <li>Increased emotional stability</li>
                <li>Enhanced problem-solving abilities</li>
                <li>Greater self-esteem</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Social Benefits</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                <li>Improved relationships</li>
                <li>Better work performance</li>
                <li>Financial stability</li>
                <li>More authentic connections</li>
                <li>Increased reliability</li>
                <li>Positive role modeling</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Tips for Maintaining Sobriety</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Build a Support Network:</strong> Connect with others in recovery through support groups, therapy, or sober communities.</li>
            <li><strong>Identify Triggers:</strong> Recognize situations, people, or emotions that trigger cravings and develop strategies to manage them.</li>
            <li><strong>Practice Self-Care:</strong> Prioritize sleep, nutrition, exercise, and stress management.</li>
            <li><strong>Develop Healthy Coping Mechanisms:</strong> Find constructive ways to deal with stress and difficult emotions.</li>
            <li><strong>Set Goals:</strong> Establish short and long-term goals that give your life meaning and purpose beyond sobriety.</li>
            <li><strong>Celebrate Milestones:</strong> Acknowledge and celebrate your sobriety achievements, no matter how small.</li>
            <li><strong>Practice Mindfulness:</strong> Stay present and aware of your thoughts and feelings without judgment.</li>
            <li><strong>Help Others:</strong> Supporting others in their recovery journey can strengthen your own commitment to sobriety.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">If You Experience a Relapse</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Recovery is not always a linear process, and relapses can happen. If you experience a relapse, remember:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>A relapse doesn't erase your previous progress</li>
            <li>Be compassionate with yourself</li>
            <li>Reach out for help immediately</li>
            <li>Learn from the experience to strengthen your recovery</li>
            <li>Recommit to your sobriety journey</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Remember that seeking professional help is always recommended for substance use disorders. This calculator is a tool for motivation and tracking, not a substitute for professional treatment or support.
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