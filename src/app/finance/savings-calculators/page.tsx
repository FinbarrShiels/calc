import React from 'react';
import SavingsCalculator from '@/components/SavingsCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Savings Calculator | Plan Your Financial Future',
  description: 'Calculate how your savings will grow over time with our easy-to-use savings calculator. See the power of compound interest and regular contributions.',
};

export default async function SavingsCalculatorPage() {
  const calculator = await getCalculatorById('savings-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Savings Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Calculate how your savings will grow over time with regular contributions and compound interest.
      </p>
      
      <SavingsCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Savings Calculations</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">The Power of Compound Interest</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Compound interest is often called the eighth wonder of the world. It's the process where the interest you earn 
            on your savings also earns interest over time. The more frequently interest is compounded, the more your money grows. 
            This calculator allows you to see how different compounding frequencies affect your savings growth.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Regular Contributions</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Making regular contributions to your savings is one of the most effective ways to build wealth over time. 
            Even small monthly deposits can add up to significant amounts when combined with the power of compound interest. 
            This calculator shows you exactly how your regular contributions grow your savings over your chosen time period.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Savings Goals</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Whether you're saving for a down payment on a house, a child's education, or retirement, understanding how your 
            savings will grow helps you plan effectively. This calculator gives you a clear picture of your future balance 
            based on your current savings plan, helping you adjust your strategy if needed to meet your financial goals.
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