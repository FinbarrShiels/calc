import React from 'react';
import SavingsGoalsCalculator from '@/components/SavingsGoalsCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Savings Goals Calculator | Plan Your Financial Targets',
  description: 'Calculate how long it will take to reach your savings goals or how much you need to save monthly to reach your target by a specific date.',
};

export default async function SavingsGoalsCalculatorPage() {
  const calculator = await getCalculatorById('savings-goals');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Savings Goals Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Calculate how long it will take to reach your savings goals or how much you need to save monthly to reach your target by a specific date.
      </p>
      
      <SavingsGoalsCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Savings Goals</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Setting Realistic Savings Goals</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Setting realistic savings goals is an important part of financial planning. Whether you're saving for a down payment on a house, 
            a new car, education, or an emergency fund, having a clear target and timeline can help you stay motivated and on track. 
            This calculator can help you determine how long it will take to reach your goal with your current savings plan, or how much 
            you need to save each month to reach your goal by a specific date.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">The Power of Compound Interest</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Compound interest is one of the most powerful forces in finance. It's the interest you earn on both your original money and 
            on the interest you keep accumulating. The more frequently interest is compounded, the more you'll earn over time. 
            This calculator allows you to see how different compounding frequencies (monthly, quarterly, or annually) affect your savings growth.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Tips for Reaching Your Savings Goals</h3>
          <p className="text-gray-600 dark:text-gray-300">
            <ul className="list-disc pl-5 space-y-1">
              <li>Automate your savings by setting up automatic transfers to your savings account</li>
              <li>Look for high-yield savings accounts or other investment vehicles to maximize your interest</li>
              <li>Regularly review and adjust your savings plan as your income or expenses change</li>
              <li>Consider increasing your contributions over time, especially after paying off debts or receiving raises</li>
              <li>Break larger goals into smaller milestones to track your progress and stay motivated</li>
            </ul>
          </p>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            Finance
          </span>
        </div>
      </div>
    </div>
  );
} 