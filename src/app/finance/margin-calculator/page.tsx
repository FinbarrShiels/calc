"use client";

import MarginCalculator from '@/components/MarginCalculator';

export default function MarginCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Margin Calculator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Calculate gross margin, sales margin, and net profit margin for your business to analyze profitability at different operational levels.
        </p>
      </div>
      
      <MarginCalculator />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Understanding Business Margins</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Margin calculations are essential financial metrics that help businesses understand their profitability at various operational levels. These metrics provide insights into how efficiently a company converts revenue into profit.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Types of Margins</h3>
        
        <div className="space-y-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Gross Margin</h4>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Gross margin measures the percentage of revenue that exceeds the direct costs of producing goods or services (COGS). It indicates production efficiency and pricing strategy effectiveness.
            </p>
            <div className="mt-2 bg-white dark:bg-gray-600 p-2 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
              Gross Margin = (Revenue - COGS) / Revenue × 100%
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Sales Margin (Operating Margin)</h4>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Sales margin, also known as operating margin, measures profitability after accounting for both COGS and operating expenses. It reflects how efficiently a company manages its operations.
            </p>
            <div className="mt-2 bg-white dark:bg-gray-600 p-2 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
              Sales Margin = (Revenue - COGS - Operating Expenses) / Revenue × 100%
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Net Profit Margin</h4>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Net profit margin shows the percentage of revenue that becomes profit after accounting for all expenses, including COGS, operating expenses, interest, taxes, and other costs. It's the most comprehensive profitability metric.
            </p>
            <div className="mt-2 bg-white dark:bg-gray-600 p-2 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
              Net Profit Margin = Net Profit / Revenue × 100%
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Using Margin Analysis</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Margin analysis provides valuable insights for business decision-making:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li><strong>Pricing Strategy:</strong> Higher margins may allow for competitive pricing or increased marketing spend</li>
          <li><strong>Cost Control:</strong> Declining margins can signal rising costs that need attention</li>
          <li><strong>Operational Efficiency:</strong> Comparing operating margin to gross margin reveals operational effectiveness</li>
          <li><strong>Industry Benchmarking:</strong> Compare your margins to industry averages to assess performance</li>
          <li><strong>Investment Decisions:</strong> Higher-margin products or services may warrant more investment</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Industry Variations</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Margin expectations vary significantly by industry. For example:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li><strong>Retail:</strong> Often has lower margins (1-5% net profit margin) but relies on volume</li>
          <li><strong>Software/Technology:</strong> Can have very high margins (15-30% net profit margin)</li>
          <li><strong>Manufacturing:</strong> Typically has moderate margins that vary by product complexity</li>
          <li><strong>Services:</strong> Often has higher margins due to lower direct costs</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Use this calculator to track your business margins over time and compare them against industry benchmarks to identify opportunities for improvement.
        </p>
      </div>
    </div>
  );
} 