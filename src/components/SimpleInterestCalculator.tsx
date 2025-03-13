'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Title,
  Tooltip,
  Legend
);

interface SimpleInterestCalculatorProps {
  calculator?: Calculator;
}

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

interface YearlyData {
  year: number;
  principal: number;
  interest: number;
  totalAmount: number;
}

type CalculationType = 'interest' | 'principal' | 'rate' | 'time';
type ViewType = 'chart' | 'table';

const SimpleInterestCalculator: React.FC<SimpleInterestCalculatorProps> = ({ calculator }) => {
  // Currency options
  const currencyOptions: CurrencyOption[] = [
    { value: 'USD', label: 'USD ($)', symbol: '$' },
    { value: 'EUR', label: 'EUR (€)', symbol: '€' },
    { value: 'GBP', label: 'GBP (£)', symbol: '£' },
    { value: 'JPY', label: 'JPY (¥)', symbol: '¥' },
    { value: 'INR', label: 'INR (₹)', symbol: '₹' }
  ];
  
  // State for inputs
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [principal, setPrincipal] = useState<number>(1000);
  const [rate, setRate] = useState<number>(5);
  const [time, setTime] = useState<number>(5);
  const [calculationType, setCalculationType] = useState<CalculationType>('interest');
  const [viewMode, setViewMode] = useState<ViewType>('chart');
  
  // State for results
  const [interest, setInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);
  
  // Chart data
  const chartData = {
    labels: yearlyData.map(data => `Year ${data.year}`),
    datasets: [
      {
        label: 'Principal',
        data: yearlyData.map(data => data.principal),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
      {
        label: 'Interest',
        data: yearlyData.map(data => data.interest),
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: '#10b981',
        borderWidth: 1,
      },
      {
        label: 'Total Amount',
        data: yearlyData.map(data => data.totalAmount),
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderColor: '#8b5cf6',
        borderWidth: 1,
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
        beginAtZero: true,
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
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${getCurrencySymbol()}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      }
    }
  };
  
  // Get currency symbol
  const getCurrencySymbol = (): string => {
    const currency = currencyOptions.find(c => c.value === selectedCurrency);
    return currency ? currency.symbol : '$';
  };
  
  // Handle currency change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };
  
  // Calculate simple interest
  const calculateSimpleInterest = () => {
    const simpleInterest = (principal * rate * time) / 100;
    const total = principal + simpleInterest;
    
    setInterest(simpleInterest);
    setTotalAmount(total);
    
    calculateYearlyData();
  };

  // Calculate yearly data
  const calculateYearlyData = () => {
    const data: YearlyData[] = [];
    const yearlyInterest = (principal * rate) / 100;
    
    for (let year = 0; year <= time; year++) {
      const interestAccumulated = yearlyInterest * year;
          data.push({
            year,
            principal,
        interest: interestAccumulated,
        totalAmount: principal + interestAccumulated
      });
    }
    
    setYearlyData(data);
  };

  // Calculate when inputs change
  useEffect(() => {
    calculateSimpleInterest();
  }, [principal, rate, time, selectedCurrency]);
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return getCurrencySymbol() + value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-xl p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Simple Interest Calculator</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
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
            
              <div>
                <label htmlFor="principal" className="block text-sm font-medium text-gray-300 mb-1">
                  Principal Amount
                </label>
                <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{getCurrencySymbol()}</span>
                </div>
                  <input
                  id="principal"
                    type="tel"
                    value={principal} {...numericInputProps}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                  min="0"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            
              <div>
              <label htmlFor="rate" className="block text-sm font-medium text-gray-300 mb-1">
                Interest Rate (% per year)
                </label>
                <div className="relative">
                <input
                  id="rate"
                  type="tel"
                  value={rate} {...numericInputProps}
                  onChange={(e) => setRate(Number(e.target.value))}
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
            
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">
                Time Period (years)
              </label>
              <input
                id="time"
                type="tel"
                value={time} {...numericInputProps}
                onChange={(e) => setTime(Number(e.target.value))}
                min="1"
                max="50"
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            </div>
            
          <div className="mt-6 bg-gray-800 p-4 rounded-md border border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-blue-400">Interest Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Principal Amount</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(principal)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Interest Earned</p>
                <p className="text-xl font-semibold text-green-400">{formatCurrency(interest)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Amount</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(totalAmount)}</p>
          </div>
          <div>
                <p className="text-gray-400 text-sm">Interest to Principal Ratio</p>
                <p className="text-xl font-semibold text-white">
                  {principal > 0 ? `${(interest / principal * 100).toFixed(2)}%` : '0%'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Results</h2>
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
              <h3 className="text-lg font-medium text-blue-400 mb-2">Interest Growth</h3>
              <div className="h-80 w-full">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          )}
          
          {viewMode === 'table' && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 overflow-x-auto">
              <h3 className="text-lg font-medium text-blue-400 mb-4">Yearly Breakdown</h3>
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Year</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Principal</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Interest</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {yearlyData.map((data, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{data.year}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{formatCurrency(data.principal)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-green-400">{formatCurrency(data.interest)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-400">{formatCurrency(data.totalAmount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleInterestCalculator; 