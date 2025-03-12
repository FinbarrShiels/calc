"use client";

import InvestmentCalculator from '@/components/InvestmentCalculator';

export default function InvestmentCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Investment Calculator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Project the growth of your investments over time with adjustable parameters for contributions, interest rates, inflation, and taxes.
        </p>
      </div>
      
      <InvestmentCalculator />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Investment Growth</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Understanding how your investments grow over time is essential for effective financial planning. This calculator helps you visualize the potential growth of your investments based on various factors including initial investment, regular contributions, interest rates, and more.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">The Power of Compound Interest</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Compound interest is often called the "eighth wonder of the world" because of its powerful effect on wealth accumulation. When your investments generate returns, and those returns are reinvested to generate their own returns, your money can grow exponentially over time.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The frequency of compounding can significantly impact your investment growth. More frequent compounding (e.g., daily vs. annually) results in slightly higher returns over long periods.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">The Impact of Regular Contributions</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Making regular contributions to your investments is one of the most effective strategies for building wealth. Even small, consistent contributions can lead to significant growth over time due to:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li>Dollar-cost averaging, which reduces the impact of market volatility</li>
          <li>Compounding returns on each contribution over time</li>
          <li>Building the habit of consistent saving and investing</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Increasing your contributions over time (even by small percentages) can dramatically accelerate your investment growth. This calculator allows you to model annual increases in your contribution amount to reflect salary increases or growing financial capacity.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Understanding Inflation and Taxes</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          When planning for long-term financial goals, it's important to consider the effects of inflation and taxes:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li><strong>Inflation</strong> erodes the purchasing power of your money over time. A dollar today will buy less in the future due to rising prices.</li>
          <li><strong>Taxes</strong> reduce your effective investment returns. Different investment accounts and assets are taxed at different rates and times.</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This calculator allows you to see both nominal and inflation-adjusted values to give you a more realistic picture of your future purchasing power. It also provides an estimate of after-tax values based on your specified tax rate.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Investment Strategies for Different Time Horizons</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Your investment approach should align with your time horizon:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li><strong>Short-term (1-3 years):</strong> Focus on capital preservation with lower-risk investments like high-yield savings accounts, CDs, or short-term bonds</li>
          <li><strong>Medium-term (3-10 years):</strong> Consider a balanced approach with a mix of stocks, bonds, and other assets to balance growth and stability</li>
          <li><strong>Long-term (10+ years):</strong> Typically can afford to take more risk with a higher allocation to growth investments like stocks or equity funds</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Remember that historical returns are not guarantees of future performance. It's generally advisable to adjust your investment strategy as you approach your financial goals to protect your accumulated wealth.
        </p>
      </div>
    </div>
  );
} 