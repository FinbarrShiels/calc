import React from 'react';
import SimpleInterestCalculator from '@/components/SimpleInterestCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Simple Interest Calculator | Calculate Interest, Principal, Rate, or Time',
  description: 'Calculate simple interest, principal amount, interest rate, or time period using the simple interest formula. Visualize growth over time with interactive charts.',
};

export default async function SimpleInterestCalculatorPage() {
  const calculator = await getCalculatorById('simple-interest-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Simple Interest Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Calculate simple interest, principal amount, interest rate, or time period using the simple interest formula. Visualize growth over time with interactive charts.
      </p>
      
      <SimpleInterestCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Simple Interest</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is Simple Interest?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Simple interest is a method of calculating interest where the interest amount is based only on the initial principal. 
            Unlike compound interest, simple interest does not earn interest on previously earned interest. It's calculated using 
            the formula: Interest = Principal × Rate × Time, where the rate is expressed as a decimal or percentage and time is 
            typically in years.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Applications of Simple Interest</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Simple interest is commonly used in various financial scenarios:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Short-term loans and borrowing</li>
            <li>Car loans and some personal loans</li>
            <li>Treasury bills and some bonds</li>
            <li>Some savings accounts and certificates of deposit (CDs)</li>
            <li>Calculating interest on late payments or penalties</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Simple vs. Compound Interest</h3>
          <p className="text-gray-600 dark:text-gray-300">
            While simple interest is straightforward and easy to calculate, it generally results in less growth over time compared 
            to compound interest. With simple interest, the interest amount remains the same each period because it's always 
            calculated on the original principal. In contrast, compound interest calculates interest on both the principal and 
            previously earned interest, leading to exponential growth over time. For long-term investments, compound interest 
            typically provides better returns.
          </p>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            Finance
          </span>
        </div>
      </div>
    </div>
  );
} 