"use client";

import MillionToBillionConverter from '@/components/MillionToBillionConverter';

export default function MillionToBillionConverterPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Million to Billion Converter</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Convert between millions, billions, and trillions to understand large numbers in perspective.
        </p>
      </div>
      
      <MillionToBillionConverter />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Understanding Large Numbers</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Large numbers like millions, billions, and trillions are used frequently in finance, economics, and science, but their scale can be difficult to comprehend. This converter helps you understand the relationships between these large numbers.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">The Scale of Large Numbers</h3>
        
        <div className="space-y-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Million (10^6)</h4>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              A million is 1,000,000 (one thousand thousand). In financial terms, many professionals earn a million dollars over their career. A million seconds is about 11.5 days.
            </p>
            <div className="mt-2 bg-white dark:bg-gray-600 p-2 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
              1,000,000 = 10^6 = 1 million
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Billion (10^9)</h4>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              A billion is 1,000,000,000 (one thousand million). Many large companies are valued in billions. A billion seconds is about 31.7 years.
            </p>
            <div className="mt-2 bg-white dark:bg-gray-600 p-2 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
              1,000,000,000 = 10^9 = 1,000 million = 1 billion
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Trillion (10^12)</h4>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              A trillion is 1,000,000,000,000 (one thousand billion or one million million). National economies and government budgets are often measured in trillions. A trillion seconds is about 31,700 years.
            </p>
            <div className="mt-2 bg-white dark:bg-gray-600 p-2 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
              1,000,000,000,000 = 10^12 = 1,000 billion = 1,000,000 million = 1 trillion
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Real-World Examples</h3>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li><strong>Million:</strong> Average lifetime earnings of a college graduate, price of a luxury home</li>
          <li><strong>Billion:</strong> Annual revenue of a Fortune 500 company, net worth of many celebrities</li>
          <li><strong>Trillion:</strong> GDP of large countries, total global stock market value</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">International Number Systems</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          It's worth noting that different countries use different systems for naming large numbers:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li><strong>Short Scale (US, UK, etc.):</strong> Billion = 10^9, Trillion = 10^12</li>
          <li><strong>Long Scale (Some European countries):</strong> Billion = 10^12, Trillion = 10^18</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          This converter uses the short scale system, which is most common in financial and business contexts internationally.
        </p>
      </div>
    </div>
  );
} 