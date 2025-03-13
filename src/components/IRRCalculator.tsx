'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps, decimalInputProps } from '@/utils/inputUtils';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IRRCalculatorProps {
  calculator?: Calculator;
}

interface CashFlow {
  id: number;
  year: number;
  amount: number;
}

type ViewType = 'chart' | 'table';

const IRRCalculator: React.FC<IRRCalculatorProps> = ({ calculator }) => {
  // Currency options
  const currencyOptions = [
    { value: 'USD', label: 'USD ($)', symbol: '$' },
    { value: 'EUR', label: 'EUR (€)', symbol: '€' },
    { value: 'GBP', label: 'GBP (£)', symbol: '£' },
    { value: 'JPY', label: 'JPY (¥)', symbol: '¥' },
    { value: 'INR', label: 'INR (₹)', symbol: '₹' }
  ];

  // State for inputs
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([
    { id: 0, year: 0, amount: -10000 },
    { id: 1, year: 1, amount: 3000 },
    { id: 2, year: 2, amount: 4000 },
    { id: 3, year: 3, amount: 5000 },
    { id: 4, year: 4, amount: 6000 }
  ]);
  const [nextId, setNextId] = useState(5);
  const [testRate, setTestRate] = useState<number>(10);
  const [viewMode, setViewMode] = useState<ViewType>('chart');

  // State for results
  const [irr, setIrr] = useState<number | null>(null);
  const [npv, setNpv] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get currency symbol
  const getCurrencySymbol = (): string => {
    const currency = currencyOptions.find(c => c.value === selectedCurrency);
    return currency ? currency.symbol : '$';
  };

  // Handle currency change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };

  // Add new cash flow
  const addCashFlow = () => {
    const newYear = cashFlows.length > 0 ? Math.max(...cashFlows.map(cf => cf.year)) + 1 : 0;
    setCashFlows([...cashFlows, { id: nextId, year: newYear, amount: 0 }]);
    setNextId(nextId + 1);
  };

  // Remove cash flow
  const removeCashFlow = (id: number) => {
    if (cashFlows.length <= 1) {
      setError('You need at least one cash flow');
      return;
    }
    setCashFlows(cashFlows.filter(cf => cf.id !== id));
  };

  // Update cash flow
  const updateCashFlow = (id: number, field: 'year' | 'amount', value: number) => {
    setCashFlows(cashFlows.map(cf => 
      cf.id === id ? { ...cf, [field]: value } : cf
    ));
  };

  // Calculate NPV
  const calculateNPV = (rate: number): number => {
    return cashFlows.reduce((acc, cf) => {
      return acc + cf.amount / Math.pow(1 + rate / 100, cf.year);
    }, 0);
  };

  // Calculate IRR using Newton-Raphson method
  const calculateIRR = () => {
    // Check if we have at least one positive and one negative cash flow
    const hasPositive = cashFlows.some(cf => cf.amount > 0);
    const hasNegative = cashFlows.some(cf => cf.amount < 0);
    
    if (!hasPositive || !hasNegative) {
      setError('IRR calculation requires at least one positive and one negative cash flow');
      setIrr(null);
      return;
    }

    let rate = 10; // Initial guess
    let npvValue = calculateNPV(rate);
    let iteration = 0;
    const maxIterations = 100;
    const tolerance = 0.0001;

    while (Math.abs(npvValue) > tolerance && iteration < maxIterations) {
      // Calculate NPV derivative
      const delta = 0.1;
      const npvPlus = calculateNPV(rate + delta);
      const derivative = (npvPlus - npvValue) / delta;
      
      // Newton-Raphson step
      if (derivative === 0) break;
      rate = rate - npvValue / derivative;
      
      // Check if rate is reasonable
      if (rate < -100 || rate > 1000) {
        setError('IRR calculation did not converge to a reasonable value');
        setIrr(null);
        return;
      }
      
      npvValue = calculateNPV(rate);
      iteration++;
    }

    if (iteration === maxIterations) {
      setError('IRR calculation did not converge');
      setIrr(null);
    } else {
      setError(null);
      setIrr(parseFloat(rate.toFixed(2)));
    }
  };

  // Calculate when inputs change
  useEffect(() => {
    try {
      calculateIRR();
      const calculatedNPV = calculateNPV(testRate);
      setNpv(parseFloat(calculatedNPV.toFixed(2)));
    } catch (err) {
      setError('Error in calculation');
      setIrr(null);
      setNpv(null);
    }
  }, [cashFlows, testRate]);

  // Format currency
  const formatCurrency = (value: number): string => {
    return getCurrencySymbol() + value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  // Chart data
  const chartData = {
    labels: cashFlows.map(cf => `Year ${cf.year}`),
    datasets: [
      {
        label: 'Cash Flow',
        data: cashFlows.map(cf => cf.amount),
        backgroundColor: cashFlows.map(cf => 
          cf.amount >= 0 ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)'
        ),
        borderColor: cashFlows.map(cf => 
          cf.amount >= 0 ? '#10b981' : '#ef4444'
        ),
        borderWidth: 1
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#e5e7eb',
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#e5e7eb',
          callback: function(value: any) {
            return getCurrencySymbol() + value.toLocaleString();
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#f9fafb',
        bodyColor: '#f3f4f6',
        padding: 10,
        borderColor: 'rgba(75, 85, 99, 0.3)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            return `Cash Flow: ${getCurrencySymbol()}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-xl p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">IRR Calculator</h2>
          
          <div className="mb-4">
            <label htmlFor="currency" className="block text-sm font-medium text-gray-300 mb-1">
              Currency
            </label>
            <select
              id="currency"
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currencyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="testRate" className="block text-sm font-medium text-gray-300 mb-1">
              Test Rate (for NPV calculation)
            </label>
            <div className="relative">
              <input
                id="testRate"
                type="tel"
                value={testRate} {...numericInputProps}
                onChange={(e) => setTestRate(Number(e.target.value))}
                min="0"
                max="100"
                step="0.1"
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-400">%</span>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-blue-400">Cash Flows</h3>
              <button
                onClick={addCashFlow}
                className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Cash Flow
              </button>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
              <div className="grid grid-cols-12 gap-2 mb-2 text-xs font-medium text-gray-300 uppercase">
                <div className="col-span-3">Year</div>
                <div className="col-span-7">Amount</div>
                <div className="col-span-2"></div>
              </div>
              
              {cashFlows.map((cf, index) => (
                <div key={cf.id} className="grid grid-cols-12 gap-2 mb-2 items-center">
                  <div className="col-span-3">
                    <input
                      type="tel"
                      value={cf.year} {...numericInputProps}
                      onChange={(e) => updateCashFlow(cf.id, 'year', Number(e.target.value))}
                      min="0"
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-1 px-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-7">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-sm">{getCurrencySymbol()}</span>
                      </div>
                      <input
                        type="tel"
                        value={cf.amount} {...numericInputProps}
                        onChange={(e) => updateCashFlow(cf.id, 'amount', Number(e.target.value))}
                        className={`w-full bg-gray-700 border border-gray-600 rounded-md py-1 pl-6 pr-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          cf.amount < 0 ? 'text-red-400' : 'text-green-400'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 text-right">
                    <button
                      onClick={() => removeCashFlow(cf.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded-md text-xs hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              
              {error && (
                <div className="mt-2 text-red-400 text-sm">{error}</div>
              )}
            </div>
          </div>
          
          <div className="mt-6 bg-gray-800 p-4 rounded-md border border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-blue-400">Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Internal Rate of Return (IRR)</p>
                <p className="text-xl font-semibold text-white">
                  {irr !== null ? `${irr.toFixed(2)}%` : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Net Present Value (NPV) at {testRate}%</p>
                <p className={`text-xl font-semibold ${npv !== null && npv >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {npv !== null ? formatCurrency(npv) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Cash Flow Visualization</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('chart')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  viewMode === 'chart' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Chart
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  viewMode === 'table' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Table
              </button>
            </div>
          </div>
          
          {viewMode === 'chart' && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-medium text-blue-400 mb-2">Cash Flow Chart</h3>
              <div className="h-80 w-full">
                <Bar data={chartData} options={chartOptions} />
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
                  <h4 className="text-md font-medium text-blue-400 mb-1">What is IRR?</h4>
                  <p className="text-sm text-gray-300">
                    Internal Rate of Return (IRR) is the discount rate that makes the net present value (NPV) of all cash flows equal to zero. It represents the annualized rate of return for an investment.
                  </p>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
                  <h4 className="text-md font-medium text-blue-400 mb-1">How to Interpret?</h4>
                  <p className="text-sm text-gray-300">
                    A higher IRR indicates a more profitable investment. If IRR is greater than your required rate of return, the investment may be worthwhile.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {viewMode === 'table' && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 overflow-x-auto">
              <h3 className="text-lg font-medium text-blue-400 mb-4">Cash Flow Details</h3>
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Year</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cash Flow</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Present Value at {testRate}%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {cashFlows.sort((a, b) => a.year - b.year).map((cf, index) => {
                    const presentValue = cf.amount / Math.pow(1 + testRate / 100, cf.year);
                    return (
                      <tr key={cf.id} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{cf.year}</td>
                        <td className={`px-4 py-2 whitespace-nowrap text-sm ${cf.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(cf.amount)}
                        </td>
                        <td className={`px-4 py-2 whitespace-nowrap text-sm ${presentValue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(presentValue)}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="bg-gray-700">
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-white">Total</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-white">
                      {formatCurrency(cashFlows.reduce((sum, cf) => sum + cf.amount, 0))}
                    </td>
                    <td className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${npv !== null && npv >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {npv !== null ? formatCurrency(npv) : 'N/A'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IRRCalculator; 