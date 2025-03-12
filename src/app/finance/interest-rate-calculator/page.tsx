"use client";

import InterestRateCalculator from '@/components/InterestRateCalculator';

export default function InterestRateCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interest Rate Calculator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Calculate the interest rate needed to reach your financial goals based on your initial investment, regular contributions, and time period.
        </p>
      </div>
      
      <InterestRateCalculator />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Interest Rate Calculations</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          When planning for financial goals, it's important to understand what interest rate you need to achieve your target amount. This calculator helps you determine the required rate of return based on your initial investment, regular contributions, and time horizon.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Understanding Required Rate of Return</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The required rate of return is the minimum annual percentage return you need to earn on your investments to reach a specific financial goal within your desired timeframe. This rate takes into account:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li>Your initial investment amount</li>
          <li>Any additional regular contributions you plan to make</li>
          <li>The target amount you want to reach</li>
          <li>The time period available to reach your goal</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Realistic Expectations</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          When using this calculator, it's important to consider whether the required interest rate is realistic based on available investment options:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li><strong>1-3%:</strong> Typically achievable with high-yield savings accounts, CDs, or conservative bond investments</li>
          <li><strong>4-6%:</strong> May be achievable with balanced portfolios of stocks and bonds</li>
          <li><strong>7-10%:</strong> Historically possible with diversified stock portfolios over long time periods</li>
          <li><strong>Above 10%:</strong> Generally requires higher-risk investments, specialized strategies, or exceptional market conditions</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          If your required rate of return seems unrealistically high, you may need to adjust your expectations by:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li>Increasing your initial investment</li>
          <li>Making larger or more frequent contributions</li>
          <li>Extending your time horizon</li>
          <li>Adjusting your target amount</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">The Impact of Compound Frequency</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The frequency at which interest compounds can significantly affect your results. More frequent compounding (e.g., monthly vs. annually) will result in faster growth and a slightly lower required interest rate to reach the same goal.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Accounting for Inflation and Taxes</h3>
        <p className="text-gray-600 dark:text-gray-300">
          When setting your target amount, consider the effects of inflation, which will reduce the purchasing power of your money over time. Additionally, remember that investment returns are typically subject to taxes, which can reduce your effective rate of return.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          For long-term goals, you may want to increase your target amount to account for inflation, or consider the required rate of return in real (inflation-adjusted) terms.
        </p>
      </div>
    </div>
  );
} 