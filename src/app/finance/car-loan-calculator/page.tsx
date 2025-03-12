"use client";

import CarLoanCalculator from '@/components/CarLoanCalculator';

export default function CarLoanCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Car Loan Calculator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Calculate payments, interest, and amortization schedule for your car loan.
        </p>
      </div>
      
      <CarLoanCalculator />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Car Loans</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Car loans are financing options designed to help you purchase a vehicle. They typically have terms ranging from 3 to 7 years, with interest rates that vary based on your credit score, loan term, and whether you're buying a new or used vehicle.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The formula for calculating car loan payments is:
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
          <li>r = Monthly interest rate (annual rate divided by 12)</li>
          <li>n = Total number of payments (term in years multiplied by 12)</li>
        </ul>
      </div>
    </div>
  );
} 