"use client";

import AmortizationCalculator from '@/components/AmortizationCalculator';

export default function AmortizationCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Amortization Calculator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Create an amortization schedule for your loans and see how extra payments can save you money.
        </p>
      </div>
      
      <AmortizationCalculator />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Amortization</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Amortization is the process of paying off a debt (often from a loan or mortgage) over time through regular payments. 
          A portion of each payment is for interest while the remaining amount is applied towards the principal balance.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The formula for calculating the monthly payment on an amortized loan is:
        </p>
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md mb-4">
          <p className="font-mono text-gray-700 dark:text-gray-300">PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)</p>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Where:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li>PMT = Monthly payment</li>
          <li>P = Principal (loan amount)</li>
          <li>r = Monthly interest rate (annual rate divided by 12 and converted to decimal)</li>
          <li>n = Total number of payments (loan term in years * 12)</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Benefits of Extra Payments</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Making extra payments towards your loan principal can significantly reduce the total interest paid over the life of the loan and shorten the loan term. 
          Even small additional payments can make a big difference over time.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Understanding Your Amortization Schedule</h3>
        <p className="text-gray-600 dark:text-gray-300">
          An amortization schedule shows the breakdown of each payment, including:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li>Payment amount</li>
          <li>Portion applied to principal</li>
          <li>Portion applied to interest</li>
          <li>Remaining loan balance after each payment</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Early in the loan, a larger portion of each payment goes toward interest. As the loan matures, more of each payment is applied to the principal.
        </p>
      </div>
    </div>
  );
} 