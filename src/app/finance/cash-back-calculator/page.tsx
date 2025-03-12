"use client";

import CashBackCalculator from '@/components/CashBackCalculator';

export default function CashBackCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cash Back Calculator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Calculate how much you can earn from cash back credit cards based on your spending habits.
        </p>
      </div>
      
      <CashBackCalculator />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Cash Back Rewards</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Cash back rewards are a type of credit card benefit that returns a small percentage of your purchases back to you as a reward. This calculator helps you estimate how much you can earn from cash back rewards based on your spending habits.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Types of Cash Back Programs</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          There are several types of cash back programs offered by credit card companies:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li><strong>Flat-rate cash back:</strong> The same percentage back on all purchases (e.g., 1.5% or 2% on everything)</li>
          <li><strong>Tiered/category cash back:</strong> Different percentages back depending on spending categories (e.g., 3% on groceries, 2% on gas, 1% on everything else)</li>
          <li><strong>Rotating categories:</strong> Higher cash back percentages in categories that change quarterly (e.g., 5% on restaurants in Q1, 5% on gas in Q2)</li>
          <li><strong>Sign-up bonuses:</strong> One-time cash rewards for meeting a minimum spending requirement within a specified time period</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Maximizing Cash Back Rewards</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          To get the most out of cash back credit cards:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li>Choose cards that reward your highest spending categories</li>
          <li>Consider using multiple cards strategically for different purchase types</li>
          <li>Pay your balance in full each month to avoid interest charges that outweigh rewards</li>
          <li>Compare annual fees against potential rewards to ensure net positive value</li>
          <li>Look for cards with sign-up bonuses to boost your initial earnings</li>
          <li>Set calendar reminders for rotating category activation if applicable</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Important Considerations</h3>
        <p className="text-gray-600 dark:text-gray-300">
          When evaluating cash back credit cards, consider:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li><strong>Annual fees:</strong> Does the cash back earned outweigh any annual fee?</li>
          <li><strong>Spending caps:</strong> Some cards limit how much you can earn in bonus categories</li>
          <li><strong>Redemption options:</strong> How easily can you redeem your cash back? (Statement credit, direct deposit, gift cards, etc.)</li>
          <li><strong>Foreign transaction fees:</strong> If you travel internationally, these fees can offset your rewards</li>
          <li><strong>APR:</strong> If you carry a balance, high interest rates will quickly negate any cash back benefits</li>
        </ul>
      </div>
    </div>
  );
} 