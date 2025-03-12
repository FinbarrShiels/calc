"use client";

import CreditCardRepaymentCalculator from '@/components/CreditCardRepaymentCalculator';

export default function CreditCardRepaymentPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Credit Card Repayment Calculator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Calculate how long it will take to pay off your credit card balance and how much interest you'll pay.
        </p>
      </div>
      
      <CreditCardRepaymentCalculator />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Credit Card Repayment</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Credit card debt can be challenging to pay off, especially when making only minimum payments. This calculator helps you understand how different payment strategies affect your total interest paid and time to debt freedom.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Understanding Minimum Payments</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Credit card minimum payments are typically calculated in one of two ways:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li><strong>Percentage of balance:</strong> Usually 1-3% of your outstanding balance (with a minimum dollar amount)</li>
          <li><strong>Fixed amount:</strong> A set dollar amount regardless of balance (as long as your balance exceeds this amount)</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mt-2 mb-4">
          Making only minimum payments can lead to years of debt and significant interest costs. As your balance decreases, so does your minimum payment, extending the time it takes to pay off the debt.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Effective Repayment Strategies</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          To pay off credit card debt more efficiently:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li><strong>Pay more than the minimum:</strong> Even small additional amounts can significantly reduce your repayment time</li>
          <li><strong>Fixed payment amount:</strong> Continue paying the same amount even as your minimum payment decreases</li>
          <li><strong>Target payoff date:</strong> Calculate the payment needed to be debt-free by a specific date</li>
          <li><strong>Debt avalanche:</strong> Focus on highest interest rate cards first while making minimum payments on others</li>
          <li><strong>Debt snowball:</strong> Pay off smallest balances first for psychological wins while making minimum payments on others</li>
          <li><strong>Balance transfer:</strong> Move high-interest debt to a card with a lower or 0% introductory rate (watch for fees)</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">The Cost of Minimum Payments</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Consider this example: A $5,000 balance at 18.99% APR with a 2% minimum payment would:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li>Take approximately 30 years to pay off</li>
          <li>Cost over $7,000 in interest</li>
          <li>Result in total payments of more than $12,000</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          By increasing your payment to a fixed $200 per month, you could:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li>Pay off the debt in about 2.5 years</li>
          <li>Pay only about $1,300 in interest</li>
          <li>Save over $5,700 in interest costs</li>
        </ul>
      </div>
    </div>
  );
} 