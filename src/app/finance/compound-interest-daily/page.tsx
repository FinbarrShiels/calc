"use client";

import CompoundInterestCalculator from '@/components/CompoundInterestCalculator';

export default function CompoundInterestDailyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Compound Interest Calculator (Daily)</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Calculate how your investments will grow over time with daily compound interest.
        </p>
      </div>
      
      <CompoundInterestCalculator defaultCompoundFrequency="Daily (365/yr)" />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Daily Compound Interest</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Daily compound interest is the addition of interest to the principal sum of a loan or deposit on a daily basis. This means that interest is calculated and added to your balance every day, rather than monthly, quarterly, or annually.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The formula for compound interest with daily compounding is:
        </p>
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md mb-4">
          <p className="font-mono text-gray-700 dark:text-gray-300">A = P(1 + r/365)^(365t)</p>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Where:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li>A = Final amount</li>
          <li>P = Principal (initial investment)</li>
          <li>r = Annual interest rate (decimal)</li>
          <li>t = Time (in years)</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Benefits of Daily Compounding</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Daily compounding offers several advantages over less frequent compounding periods:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li>Higher effective annual yield</li>
          <li>Faster growth of your investment</li>
          <li>More frequent reinvestment of interest</li>
          <li>Greater long-term returns due to the power of compounding</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Daily vs. Monthly Compounding</h3>
        <p className="text-gray-600 dark:text-gray-300">
          While the difference between daily and monthly compounding may seem small in the short term, it can lead to significantly higher returns over longer investment periods. For example, a $10,000 investment at 5% interest for 30 years would yield approximately $43,219 with monthly compounding, but about $44,402 with daily compounding—a difference of over $1,180.
        </p>
      </div>
    </div>
  );
} 