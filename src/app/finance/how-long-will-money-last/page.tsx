"use client";

import HowLongWillMoneyLastCalculator from '@/components/HowLongWillMoneyLastCalculator';

export default function HowLongWillMoneyLastPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">How Long Will My Money Last Calculator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Calculate how long your savings will last based on regular withdrawals, interest rates, and optional inflation adjustments.
        </p>
      </div>
      
      <HowLongWillMoneyLastCalculator />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Retirement Withdrawals</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Understanding how long your savings will last is crucial for retirement planning. This calculator helps you estimate the longevity of your nest egg based on your withdrawal strategy, interest earnings, and inflation considerations.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">The 4% Rule and Sustainable Withdrawal Rates</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The "4% rule" is a common guideline in retirement planning, suggesting that withdrawing 4% of your initial balance annually (adjusted for inflation) should provide a sustainable income for approximately 30 years. However, this rule has limitations and may not be appropriate for everyone.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Factors that affect your sustainable withdrawal rate include:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li>Your investment portfolio's expected returns</li>
          <li>Your planned retirement duration</li>
          <li>Market volatility and sequence of returns</li>
          <li>Inflation expectations</li>
          <li>Your flexibility to adjust withdrawals as needed</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">The Impact of Inflation</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Inflation erodes purchasing power over time, meaning the same dollar amount will buy less in the future. For long-term planning, it's crucial to account for inflation in your withdrawal strategy.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          For example, with 2.5% annual inflation:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li>$1,000 today will have the purchasing power of about $780 in 10 years</li>
          <li>$1,000 today will have the purchasing power of about $610 in 20 years</li>
          <li>$1,000 today will have the purchasing power of about $475 in 30 years</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          By adjusting your withdrawals for inflation, you maintain consistent purchasing power throughout retirement.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Strategies to Make Your Money Last Longer</h3>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li><strong>Dynamic withdrawal strategies:</strong> Adjust withdrawal amounts based on market performance</li>
          <li><strong>Bucket strategy:</strong> Divide your portfolio into short-term, medium-term, and long-term buckets</li>
          <li><strong>Delay Social Security:</strong> Waiting to claim benefits can increase your guaranteed lifetime income</li>
          <li><strong>Part-time work:</strong> Even modest income during early retirement can significantly extend your savings</li>
          <li><strong>Optimize asset allocation:</strong> Balance growth potential with stability based on your time horizon</li>
          <li><strong>Consider annuities:</strong> Guaranteed income products can provide longevity insurance</li>
          <li><strong>Manage taxes efficiently:</strong> Strategic withdrawals from different account types can reduce tax burden</li>
          <li><strong>Reduce fixed expenses:</strong> Lower baseline costs provide more flexibility during market downturns</li>
        </ul>
      </div>
    </div>
  );
} 