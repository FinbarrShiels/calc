"use client";

import LoanPayoffCalculator from '@/components/LoanPayoffCalculator';

export default function LoanPayoffCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Loan Payoff Calculator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Calculate how long it will take to pay off your loan and see how extra payments can save you money and time.
        </p>
      </div>
      
      <LoanPayoffCalculator />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Loan Payoff Strategies</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Paying off loans efficiently can save you thousands in interest and help you become debt-free sooner. This calculator helps you explore different payoff strategies and see their impact on your loan.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">The Power of Extra Payments</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Making extra payments on your loan can dramatically reduce both the time to payoff and the total interest paid. Even small additional amounts can make a significant difference over time because:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li>Extra payments go directly toward reducing your principal balance</li>
          <li>Reducing principal means less interest accrues on future payments</li>
          <li>The effect compounds over time, accelerating your payoff</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          For example, on a $20,000 loan at 5% interest with a 5-year term:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li>Standard monthly payment: $377.42</li>
          <li>Adding just $50 extra per month saves $290 in interest and pays off the loan 7 months earlier</li>
          <li>Adding $100 extra per month saves $530 in interest and pays off the loan 13 months earlier</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Fixed Payment vs. Target Date Strategies</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This calculator offers two main approaches to loan payoff:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li><strong>Fixed Payment Strategy:</strong> You decide how much to pay each period (minimum payment plus any extra amount). The calculator shows how long it will take to pay off the loan.</li>
          <li><strong>Target Date Strategy:</strong> You specify when you want to be debt-free, and the calculator determines the payment amount required to reach that goal.</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Tips for Faster Loan Payoff</h3>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li><strong>Round up payments:</strong> Round your minimum payment up to the nearest $50 or $100</li>
          <li><strong>Make bi-weekly payments:</strong> Pay half your monthly amount every two weeks, resulting in 26 half-payments (13 full payments) per year</li>
          <li><strong>Apply windfalls:</strong> Use tax refunds, bonuses, or gifts to make one-time extra payments</li>
          <li><strong>Refinance strategically:</strong> If you can qualify for a significantly lower interest rate, refinancing may help (but be careful of fees)</li>
          <li><strong>Maintain payment amounts:</strong> If you've paid off one debt, redirect that payment amount to remaining debts</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Important Considerations</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Before making extra payments, check these factors:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li>Verify your loan has no prepayment penalties</li>
          <li>Specify that extra payments should be applied to principal, not future payments</li>
          <li>Consider whether you have higher-interest debt to prioritize first</li>
          <li>Ensure you have adequate emergency savings before accelerating debt payoff</li>
        </ul>
      </div>
    </div>
  );
} 