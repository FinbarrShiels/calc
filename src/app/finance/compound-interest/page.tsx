"use client";

import Link from 'next/link';
import CompoundInterestCalculator from '@/components/CompoundInterestCalculator';

export default function CompoundInterestPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Compound Interest Calculator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Calculate how your investments will grow over time with compound interest.
        </p>
      </div>
      
      <CompoundInterestCalculator />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Compound Interest</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Compound interest is the addition of interest to the principal sum of a loan or deposit, or in other words, interest on interest. It is the result of reinvesting interest, rather than paying it out, so that interest in the next period is then earned on the principal sum plus previously accumulated interest.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The formula for compound interest is:
        </p>
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md mb-4">
          <p className="font-mono text-gray-700 dark:text-gray-300">A = P(1 + r/n)^(nt)</p>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Where:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li>A = Final amount</li>
          <li>P = Principal (initial investment)</li>
          <li>r = Annual interest rate (decimal)</li>
          <li>n = Number of times interest is compounded per year</li>
          <li>t = Time (in years)</li>
        </ul>
      </div>
    </div>
  );
} 