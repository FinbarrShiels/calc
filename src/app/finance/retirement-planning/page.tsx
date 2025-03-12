import React from 'react';
import RetirementPlanningCalculator from '@/components/RetirementPlanningCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Retirement Planning Calculator | Plan Your Financial Future',
  description: 'Calculate how much you need to save for retirement and create a personalized retirement plan with our easy-to-use calculator.',
};

export default async function RetirementPlanningPage() {
  const calculator = await getCalculatorById('retirement-planning-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Retirement Planning Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Plan your financial future by calculating how much you need to save for retirement and visualize your retirement savings growth over time.
      </p>
      
      <RetirementPlanningCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Retirement Planning</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">The Power of Compound Interest</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            One of the most powerful forces in retirement planning is compound interest. The earlier you start saving, 
            the more time your money has to grow. Even small contributions can grow significantly over decades due to 
            the compounding effect, where you earn interest not only on your initial investment but also on the interest 
            it accumulates.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">The 4% Rule</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The 4% rule is a common guideline in retirement planning. It suggests that retirees can withdraw 4% of their 
            retirement savings in the first year of retirement, then adjust that amount for inflation each year. This 
            approach is designed to provide a steady income while maintaining a high probability that your savings will 
            last for at least 30 years.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Inflation Considerations</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Inflation erodes the purchasing power of your money over time. When planning for retirement, it's important 
            to account for inflation to ensure your savings will maintain their value. A dollar today will not have the 
            same purchasing power in 30 years. This calculator allows you to factor in inflation to get a more realistic 
            picture of your retirement needs.
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