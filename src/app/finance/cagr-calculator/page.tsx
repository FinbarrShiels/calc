"use client";

import CAGRCalculator from '@/components/CAGRCalculator';

export default function CAGRCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CAGR Calculator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Calculate the Compound Annual Growth Rate (CAGR) of your investments and see projected growth over time.
        </p>
      </div>
      
      <CAGRCalculator />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About CAGR</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Compound Annual Growth Rate (CAGR) is a measure of the mean annual growth rate of an investment over a specified time period longer than one year. It represents one of the most accurate ways to calculate and determine returns for anything that can rise or fall in value over time.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The formula for CAGR is:
        </p>
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md mb-4">
          <p className="font-mono text-gray-700 dark:text-gray-300">CAGR = (Final Value / Initial Value)^(1/years) - 1</p>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Where:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li>Final Value = The ending value of your investment</li>
          <li>Initial Value = The starting value of your investment</li>
          <li>Years = The number of years between the initial and final values</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">When to Use CAGR</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          CAGR is particularly useful in the following scenarios:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li>Comparing the performance of different investments over the same time period</li>
          <li>Comparing the performance of the same investment over different time periods</li>
          <li>Evaluating the historical performance of an investment</li>
          <li>Projecting the future value of an investment assuming a consistent growth rate</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Limitations of CAGR</h3>
        <p className="text-gray-600 dark:text-gray-300">
          While CAGR is a useful metric, it has some limitations:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li>It assumes a steady growth rate over the entire period, which may not reflect actual year-to-year volatility</li>
          <li>It only considers the beginning and ending values, ignoring any fluctuations in between</li>
          <li>It doesn't account for the timing of additional investments or withdrawals</li>
          <li>Past performance is not indicative of future results</li>
        </ul>
      </div>
    </div>
  );
} 