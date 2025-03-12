"use client";

import HowLongToSaveCalculator from '@/components/HowLongToSaveCalculator';

export default function HowLongToSavePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">How Long to Save Calculator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Calculate how long it will take to reach your savings goal based on your contributions and interest rate.
        </p>
      </div>
      
      <HowLongToSaveCalculator />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Savings Goals</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Setting a savings goal is an important step in financial planning. This calculator helps you determine how long it will take to reach your target amount based on your initial savings, regular contributions, and expected interest rate.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">The Power of Regular Contributions</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Making regular contributions to your savings is one of the most effective ways to reach your financial goals faster. Even small, consistent deposits can significantly reduce the time needed to reach your target amount.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          For example, if you start with $1,000 and want to save $10,000:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li>With no additional contributions and a 5% interest rate, it would take about 47 years</li>
          <li>With $100 monthly contributions and the same interest rate, you'd reach your goal in just 7 years</li>
          <li>Increasing your monthly contribution to $500 would reduce the time to only 1.5 years</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">The Impact of Interest Rates</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          The interest rate on your savings can dramatically affect how quickly you reach your goal. Higher interest rates mean your money works harder for you, generating more earnings over time.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Consider a scenario where you're saving $200 monthly with a $1,000 starting balance to reach $25,000:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li>At 1% interest: approximately 9 years and 10 months</li>
          <li>At 5% interest: approximately 8 years and 3 months</li>
          <li>At 10% interest: approximately 6 years and 11 months</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Tips for Reaching Your Savings Goals Faster</h3>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li><strong>Increase your contribution amount:</strong> Even small increases can make a big difference over time</li>
          <li><strong>Contribute more frequently:</strong> Switching from monthly to bi-weekly or weekly contributions can help your money grow faster</li>
          <li><strong>Find higher interest rates:</strong> Shop around for savings accounts, CDs, or investment options with better returns</li>
          <li><strong>Make one-time additional contributions:</strong> When you receive bonuses, tax refunds, or gifts, consider adding them to your savings</li>
          <li><strong>Automate your savings:</strong> Set up automatic transfers to ensure consistent contributions</li>
          <li><strong>Reduce unnecessary expenses:</strong> Redirect money from discretionary spending to your savings goal</li>
        </ul>
      </div>
    </div>
  );
} 