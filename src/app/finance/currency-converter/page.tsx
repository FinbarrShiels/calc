"use client";

import CurrencyConverterCalculator from '@/components/CurrencyConverterCalculator';

export default function CurrencyConverterPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Currency Converter Calculator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Convert between different currencies and view historical exchange rate trends.
        </p>
      </div>
      
      <CurrencyConverterCalculator />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Currency Exchange</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Currency exchange rates represent the value of one currency in terms of another. These rates fluctuate constantly due to various economic factors, including inflation, interest rates, political stability, and market speculation.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Types of Exchange Rates</h3>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li><strong>Spot Rate:</strong> The current market rate for immediate exchange of currencies</li>
          <li><strong>Forward Rate:</strong> A rate agreed upon today for a future transaction</li>
          <li><strong>Fixed Rate:</strong> A rate set by a country's central bank rather than determined by market forces</li>
          <li><strong>Floating Rate:</strong> A rate that fluctuates based on supply and demand in the foreign exchange market</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Factors Affecting Exchange Rates</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Several factors influence currency exchange rates:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li><strong>Interest Rates:</strong> Higher interest rates typically attract foreign investment, increasing demand for the currency</li>
          <li><strong>Inflation:</strong> Lower inflation rates generally lead to a stronger currency</li>
          <li><strong>Economic Performance:</strong> Strong economic growth often strengthens a country's currency</li>
          <li><strong>Political Stability:</strong> Stable political environments tend to attract investment and strengthen currency</li>
          <li><strong>Trade Balance:</strong> Countries with trade surpluses typically have stronger currencies</li>
          <li><strong>Public Debt:</strong> High public debt can lead to inflation and currency depreciation</li>
          <li><strong>Speculation:</strong> Market sentiment and trader activity can cause short-term fluctuations</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Currency Conversion Tips</h3>
        <p className="text-gray-600 dark:text-gray-300">
          When converting currencies, keep these tips in mind:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li>Compare rates from different providers before making large conversions</li>
          <li>Be aware of additional fees that may not be included in the quoted exchange rate</li>
          <li>Consider timing for large conversions, as rates can fluctuate significantly</li>
          <li>For travel, a mix of payment methods (cash, cards) often provides the best value</li>
          <li>Online currency converters typically offer better rates than airport exchange kiosks</li>
          <li>Some credit cards offer favorable exchange rates with no foreign transaction fees</li>
        </ul>
      </div>
    </div>
  );
} 