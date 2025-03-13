"use client";

import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { decimalInputProps } from '@/utils/inputUtils';


// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const MarginCalculator = () => {
  // State for form inputs
  const [marginType, setMarginType] = useState('gross');
  const [currency, setCurrency] = useState('$');
  const [revenueStr, setRevenueStr] = useState('100000');
  const [cogsStr, setCogsStr] = useState('60000');
  const [operatingExpensesStr, setOperatingExpensesStr] = useState('20000');
  const [otherExpensesStr, setOtherExpensesStr] = useState('5000');
  
  // State for calculated results
  const [grossMargin, setGrossMargin] = useState(0);
  const [salesMargin, setSalesMargin] = useState(0);
  const [netProfitMargin, setNetProfitMargin] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);
  const [operatingProfit, setOperatingProfit] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  
  // Input validation helper
  const handleNumberInput = (
    value: string, 
    setter: React.Dispatch<React.SetStateAction<string>>,
    allowNegative: boolean = false
  ) => {
    // Remove all non-numeric characters except decimal point and negative sign
    let sanitized = value.replace(/[^\d.-]/g, '');
    
    // Handle negative numbers if allowed
    if (!allowNegative && sanitized.includes('-')) {
      sanitized = sanitized.replace(/-/g, '');
    } else if (allowNegative) {
      // Ensure only one negative sign at the beginning
      const hasNegative = sanitized.startsWith('-');
      sanitized = sanitized.replace(/-/g, '');
      if (hasNegative) {
        sanitized = '-' + sanitized;
      }
    }
    
    // Ensure only one decimal point
    const parts = sanitized.split('.');
    if (parts.length > 2) {
      sanitized = parts[0] + '.' + parts.slice(1).join('');
    }
    
    setter(sanitized);
  };
  
  // Calculate margins whenever inputs change
  useEffect(() => {
    const revenue = parseFloat(revenueStr) || 0;
    const cogs = parseFloat(cogsStr) || 0;
    const operatingExpenses = parseFloat(operatingExpensesStr) || 0;
    const otherExpenses = parseFloat(otherExpensesStr) || 0;
    
    // Calculate gross profit and margin
    const grossProfitValue = revenue - cogs;
    const grossMarginValue = revenue > 0 ? (grossProfitValue / revenue) * 100 : 0;
    
    // Calculate operating profit and sales margin
    const operatingProfitValue = grossProfitValue - operatingExpenses;
    const salesMarginValue = revenue > 0 ? (operatingProfitValue / revenue) * 100 : 0;
    
    // Calculate net profit and margin
    const netProfitValue = operatingProfitValue - otherExpenses;
    const netProfitMarginValue = revenue > 0 ? (netProfitValue / revenue) * 100 : 0;
    
    // Update state with calculated values
    setGrossProfit(grossProfitValue);
    setGrossMargin(grossMarginValue);
    setOperatingProfit(operatingProfitValue);
    setSalesMargin(salesMarginValue);
    setNetProfit(netProfitValue);
    setNetProfitMargin(netProfitMarginValue);
  }, [revenueStr, cogsStr, operatingExpensesStr, otherExpensesStr]);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };
  
  // Prepare chart data based on margin type
  const getChartData = () => {
    if (marginType === 'gross') {
      return {
        labels: ['Cost of Goods Sold', 'Gross Profit'],
        datasets: [
          {
            data: [parseFloat(cogsStr) || 0, grossProfit],
            backgroundColor: ['#f87171', '#4ade80'],
            borderColor: ['#ef4444', '#22c55e'],
            borderWidth: 1,
          },
        ],
      };
    } else if (marginType === 'sales') {
      return {
        labels: ['Cost of Goods Sold', 'Operating Expenses', 'Operating Profit'],
        datasets: [
          {
            data: [
              parseFloat(cogsStr) || 0, 
              parseFloat(operatingExpensesStr) || 0, 
              operatingProfit
            ],
            backgroundColor: ['#f87171', '#fbbf24', '#4ade80'],
            borderColor: ['#ef4444', '#f59e0b', '#22c55e'],
            borderWidth: 1,
          },
        ],
      };
    } else {
      return {
        labels: ['Cost of Goods Sold', 'Operating Expenses', 'Other Expenses', 'Net Profit'],
        datasets: [
          {
            data: [
              parseFloat(cogsStr) || 0, 
              parseFloat(operatingExpensesStr) || 0, 
              parseFloat(otherExpensesStr) || 0, 
              netProfit
            ],
            backgroundColor: ['#f87171', '#fbbf24', '#60a5fa', '#4ade80'],
            borderColor: ['#ef4444', '#f59e0b', '#3b82f6', '#22c55e'],
            borderWidth: 1,
          },
        ],
      };
    }
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb', // text-gray-200
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: marginType === 'gross' 
          ? 'Gross Margin Breakdown' 
          : marginType === 'sales' 
            ? 'Sales Margin Breakdown' 
            : 'Net Profit Margin Breakdown',
        color: '#e5e7eb', // text-gray-200
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += formatCurrency(context.parsed);
            }
            return label;
          }
        }
      }
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 text-white dark:text-gray-900 rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="calculator-card-alt rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Margin Calculator</h2>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Margin Type</label>
            <select 
              className="calculator-input"
              value={marginType}
              onChange={(e) => setMarginType(e.target.value)}
            >
              <option value="gross">Gross Margin</option>
              <option value="sales">Sales Margin</option>
              <option value="net">Net Profit Margin</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Currency</label>
            <select 
              className="calculator-input"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
              <option value="₹">INR (₹)</option>
              <option value="¥">JPY (¥)</option>
              <option value="C$">CAD (C$)</option>
              <option value="A$">AUD (A$)</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Revenue</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
              <input
                type="tel"
                className="calculator-input"
                value={revenueStr}
                onChange={(e) => handleNumberInput(e.target.value, setRevenueStr)} {...decimalInputProps}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Cost of Goods Sold (COGS)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
              <input
                type="tel"
                className="calculator-input"
                value={cogsStr}
                onChange={(e) => handleNumberInput(e.target.value, setCogsStr)} {...decimalInputProps}
              />
            </div>
          </div>
          
          {(marginType === 'sales' || marginType === 'net') && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Operating Expenses</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
                <input
                  type="tel"
                  className="calculator-input"
                  value={operatingExpensesStr}
                  onChange={(e) => handleNumberInput(e.target.value, setOperatingExpensesStr)} {...decimalInputProps}
                />
              </div>
            </div>
          )}
          
          {marginType === 'net' && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Other Expenses (taxes, interest, etc.)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
                <input
                  type="tel"
                  className="calculator-input"
                  value={otherExpensesStr}
                  onChange={(e) => handleNumberInput(e.target.value, setOtherExpensesStr)} {...decimalInputProps}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Results */}
        <div className="calculator-card-alt rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Results</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {marginType === 'gross' && (
              <>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm">Gross Profit</h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatCurrency(grossProfit)}</p>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm">Gross Margin</h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatPercentage(grossMargin)}</p>
                </div>
              </>
            )}
            
            {marginType === 'sales' && (
              <>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm">Operating Profit</h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatCurrency(operatingProfit)}</p>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm">Sales Margin</h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatPercentage(salesMargin)}</p>
                </div>
              </>
            )}
            
            {marginType === 'net' && (
              <>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm">Net Profit</h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatCurrency(netProfit)}</p>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm">Net Profit Margin</h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatPercentage(netProfitMargin)}</p>
                </div>
              </>
            )}
          </div>
          
          <div className="h-80 w-full">
            <Pie data={getChartData()} options={chartOptions} />
          </div>
          
          <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-blue-400">Breakdown</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Revenue:</span>
                <span className="text-white dark:text-gray-900 font-medium">{formatCurrency(parseFloat(revenueStr) || 0)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Cost of Goods Sold:</span>
                <span className="text-red-400 font-medium">-{formatCurrency(parseFloat(cogsStr) || 0)}</span>
              </div>
              
              <div className="flex justify-between font-medium">
                <span className="text-gray-300">Gross Profit:</span>
                <span className={grossProfit >= 0 ? "text-green-400" : "text-red-400"}>
                  {formatCurrency(grossProfit)}
                </span>
              </div>
              
              {(marginType === 'sales' || marginType === 'net') && (
                <>
                  <div className="border-t border-gray-600 my-2 pt-2"></div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300">Operating Expenses:</span>
                    <span className="text-yellow-400 font-medium">
                      -{formatCurrency(parseFloat(operatingExpensesStr) || 0)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-300">Operating Profit:</span>
                    <span className={operatingProfit >= 0 ? "text-green-400" : "text-red-400"}>
                      {formatCurrency(operatingProfit)}
                    </span>
                  </div>
                </>
              )}
              
              {marginType === 'net' && (
                <>
                  <div className="border-t border-gray-600 my-2 pt-2"></div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300">Other Expenses:</span>
                    <span className="text-blue-400 font-medium">
                      -{formatCurrency(parseFloat(otherExpensesStr) || 0)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-300">Net Profit:</span>
                    <span className={netProfit >= 0 ? "text-green-400" : "text-red-400"}>
                      {formatCurrency(netProfit)}
                    </span>
                  </div>
                </>
              )}
              
              <div className="border-t border-gray-600 my-2 pt-2"></div>
              
              <div className="flex justify-between font-medium">
                <span className="text-gray-300">
                  {marginType === 'gross' 
                    ? 'Gross Margin:' 
                    : marginType === 'sales' 
                      ? 'Sales Margin:' 
                      : 'Net Profit Margin:'}
                </span>
                <span className="text-green-500">
                  {marginType === 'gross' 
                    ? formatPercentage(grossMargin) 
                    : marginType === 'sales' 
                      ? formatPercentage(salesMargin) 
                      : formatPercentage(netProfitMargin)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 calculator-card p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-blue-400">About Margin Calculations</h2>
        
        <div className="space-y-4 text-gray-300">
          <p>
            Margin calculations help businesses understand their profitability at different operational levels:
          </p>
          
          <div>
            <h3 className="calculator-section-header">Gross Margin</h3>
            <p>
              Gross margin represents the percentage of revenue that exceeds the cost of goods sold (COGS). 
              It shows how efficiently a company can produce and sell its products.
            </p>
            <p className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              Gross Margin = (Revenue - COGS) / Revenue × 100%
            </p>
          </div>
          
          <div>
            <h3 className="calculator-section-header">Sales Margin (Operating Margin)</h3>
            <p>
              Sales margin, also known as operating margin, measures the percentage of revenue that remains 
              after accounting for both COGS and operating expenses. It reflects operational efficiency.
            </p>
            <p className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              Sales Margin = (Revenue - COGS - Operating Expenses) / Revenue × 100%
            </p>
          </div>
          
          <div>
            <h3 className="calculator-section-header">Net Profit Margin</h3>
            <p>
              Net profit margin shows the percentage of revenue that becomes profit after accounting for all expenses, 
              including COGS, operating expenses, interest, taxes, and other costs.
            </p>
            <p className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              Net Profit Margin = Net Profit / Revenue × 100%
            </p>
          </div>
          
          <p>
            Higher margins generally indicate better financial health, but optimal margins vary by industry. 
            Comparing your margins to industry benchmarks can provide valuable insights into your business's performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarginCalculator; 