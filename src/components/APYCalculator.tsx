"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';
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

interface APYCalculatorProps {
  calculator?: Calculator;
}

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

interface CompoundFrequencyOption {
  value: string;
  label: string;
  timesPerYear: number;
}

interface ComparisonData {
  compoundFrequency: string;
  apy: number;
  finalBalance: number;
  interest: number;
}

type ViewType = 'chart' | 'table';
type ChartType = 'bar' | 'line';

const APYCalculator: React.FC<APYCalculatorProps> = ({ calculator }) => {
  // Currency options
  const currencyOptions: CurrencyOption[] = [
    { value: 'USD', label: 'USD ($)', symbol: '$' },
    { value: 'EUR', label: 'EUR (€)', symbol: '€' },
    { value: 'GBP', label: 'GBP (£)', symbol: '£' },
    { value: 'JPY', label: 'JPY (¥)', symbol: '¥' },
    { value: 'INR', label: 'INR (₹)', symbol: '₹' }
  ];
  
  // Compound frequency options
  const compoundFrequencyOptions: CompoundFrequencyOption[] = [
    { value: 'annually', label: 'Annually', timesPerYear: 1 },
    { value: 'semi-annually', label: 'Semi-Annually', timesPerYear: 2 },
    { value: 'quarterly', label: 'Quarterly', timesPerYear: 4 },
    { value: 'monthly', label: 'Monthly', timesPerYear: 12 },
    { value: 'daily', label: 'Daily', timesPerYear: 365 },
    { value: 'continuous', label: 'Continuous', timesPerYear: Infinity }
  ];
  
  // State for inputs
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [principal, setPrincipal] = useState<number>(10000);
  const [nominalRate, setNominalRate] = useState<number>(5);
  const [compoundFrequency, setCompoundFrequency] = useState<string>('annually');
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(1);
  
  // State for results
  const [apy, setAPY] = useState<number>(0);
  const [finalBalance, setFinalBalance] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  
  // View state
  const [viewType, setViewType] = useState<ViewType>('chart');
  const [chartType, setChartType] = useState<ChartType>('bar');
  
  // Get currency symbol
  const getCurrencySymbol = (): string => {
    const currency = currencyOptions.find(c => c.value === selectedCurrency);
    return currency ? currency.symbol : '$';
  };
  
  // Handle currency change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };
  
  // Handle compound frequency change
  const handleCompoundFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCompoundFrequency(e.target.value);
  };
  
  // Calculate APY
  const calculateAPY = (nominal: number, frequency: string): number => {
    const nominalDecimal = nominal / 100;
    const frequencyOption = compoundFrequencyOptions.find(f => f.value === frequency);
    
    if (!frequencyOption) return 0;
    
    if (frequencyOption.timesPerYear === Infinity) {
      // Continuous compounding: APY = e^r - 1
      return (Math.exp(nominalDecimal) - 1) * 100;
    } else {
      // Discrete compounding: APY = (1 + r/n)^n - 1
      return (Math.pow(1 + nominalDecimal / frequencyOption.timesPerYear, frequencyOption.timesPerYear) - 1) * 100;
    }
  };
  
  // Calculate final balance
  const calculateFinalBalance = (principal: number, apy: number, years: number): number => {
    return principal * Math.pow(1 + apy / 100, years);
  };
  
  // Calculate comparison data
  const calculateComparisonData = () => {
    const data: ComparisonData[] = compoundFrequencyOptions.map(option => {
      const calculatedAPY = calculateAPY(nominalRate, option.value);
      const calculatedFinalBalance = calculateFinalBalance(principal, calculatedAPY, investmentPeriod);
      
      return {
        compoundFrequency: option.label,
        apy: calculatedAPY,
        finalBalance: calculatedFinalBalance,
        interest: calculatedFinalBalance - principal
      };
    });
    
    setComparisonData(data);
  };
  
  // Perform calculations when inputs change
  useEffect(() => {
    const calculatedAPY = calculateAPY(nominalRate, compoundFrequency);
    const calculatedFinalBalance = calculateFinalBalance(principal, calculatedAPY, investmentPeriod);
    
    setAPY(calculatedAPY);
    setFinalBalance(calculatedFinalBalance);
    setTotalInterest(calculatedFinalBalance - principal);
    
    calculateComparisonData();
  }, [principal, nominalRate, compoundFrequency, investmentPeriod, selectedCurrency]);
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return getCurrencySymbol() + value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  
  // Format percentage
  const formatPercentage = (value: number): string => {
    return value.toFixed(2) + '%';
  };
  
  // Chart data for APY comparison
  const apyChartData = {
    labels: comparisonData.map(data => data.compoundFrequency),
    datasets: [
      {
        label: 'APY',
        data: comparisonData.map(data => data.apy),
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue-500 with opacity
        borderColor: '#3b82f6', // blue-500
        borderWidth: 1
      }
    ]
  };
  
  // Chart data for balance comparison
  const balanceChartData = {
    labels: comparisonData.map(data => data.compoundFrequency),
    datasets: [
      {
        label: 'Final Balance',
        data: comparisonData.map(data => data.finalBalance),
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // green-500 with opacity
        borderColor: '#10b981', // green-500
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
          color: 'rgba(255, 255, 255, 0.1)', // lighter grid lines for dark background
        },
        ticks: {
          color: '#e5e7eb', // text-gray-200
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // lighter grid lines for dark background
        },
        ticks: {
          color: '#e5e7eb', // text-gray-200
          callback: function(value: any, index: any, values: any) {
            if (chartType === 'bar' && index === 0) {
              return apyChartData.datasets[0].label === 'APY' ? formatPercentage(value) : formatCurrency(value);
            }
            return apyChartData.datasets[0].label === 'APY' ? formatPercentage(value) : formatCurrency(value);
          }
        }
      }
    },
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
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)', // bg-gray-900 with opacity
        titleColor: '#f9fafb', // text-gray-50
        bodyColor: '#f3f4f6', // text-gray-100
        padding: 10,
        borderColor: 'rgba(75, 85, 99, 0.3)', // gray-600 with opacity
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.raw;
            return label === 'APY' 
              ? `${label}: ${formatPercentage(value)}`
              : `${label}: ${formatCurrency(value)}`;
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
          <h2 className="text-xl font-bold text-white mb-4">APY Calculator</h2>
          
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
              <label htmlFor="nominalRate" className="block text-sm font-medium text-gray-300 mb-1">
                Nominal Interest Rate (%)
              </label>
              <div className="relative">
                <input
                  id="nominalRate"
                  type="tel"
                  value={nominalRate} {...numericInputProps}
                  onChange={(e) => setNominalRate(Number(e.target.value))}
                  min="0"
                  max="100"
                  step="0.01"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">%</span>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="compoundFrequency" className="block text-sm font-medium text-gray-300 mb-1">
                Compound Frequency
              </label>
              <select
                id="compoundFrequency"
                value={compoundFrequency}
                onChange={handleCompoundFrequencyChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {compoundFrequencyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="investmentPeriod" className="block text-sm font-medium text-gray-300 mb-1">
                Investment Period (years)
              </label>
              <input
                id="investmentPeriod"
                type="tel"
                value={investmentPeriod} {...numericInputProps}
                onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                min="1"
                max="50"
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mt-6 bg-gray-800 p-4 rounded-md border border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-blue-400">APY Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Nominal Rate</p>
                <p className="text-xl font-semibold text-white">{formatPercentage(nominalRate)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Annual Percentage Yield (APY)</p>
                <p className="text-xl font-semibold text-green-400">{formatPercentage(apy)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Final Balance</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(finalBalance)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Interest</p>
                <p className="text-xl font-semibold text-green-400">{formatCurrency(totalInterest)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Compound Frequency Comparison</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewType('chart')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  viewType === 'chart' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Chart
              </button>
              <button
                onClick={() => setViewType('table')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  viewType === 'table' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Table
              </button>
            </div>
          </div>
          
          {viewType === 'chart' && (
        <div className="space-y-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-blue-400">APY by Compound Frequency</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setChartType('bar');
                        apyChartData.datasets[0].label = 'APY';
                      }}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        chartType === 'bar' && apyChartData.datasets[0].label === 'APY'
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      APY
                    </button>
                    <button
                      onClick={() => {
                        setChartType('bar');
                        apyChartData.datasets[0].label = 'Final Balance';
                      }}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        chartType === 'bar' && apyChartData.datasets[0].label === 'Final Balance'
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Balance
                    </button>
                  </div>
                </div>
                <div className="h-80 w-full">
                  <Bar 
                    data={apyChartData.datasets[0].label === 'APY' ? apyChartData : balanceChartData} 
                    options={chartOptions} 
                  />
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-blue-400 mb-2">What is APY?</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Annual Percentage Yield (APY) is the effective annual rate of return taking into account the effect of compounding interest. 
                  Unlike the nominal interest rate, APY reflects the frequency with which interest is paid.
                </p>
                <p className="text-gray-300 text-sm">
                  The formula for APY is: APY = (1 + r/n)^n - 1, where r is the nominal interest rate and n is the number of compounding periods per year.
                  For continuous compounding, APY = e^r - 1.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Selected Compound Frequency</h3>
                  <p className="text-2xl font-bold text-white">
                    {compoundFrequencyOptions.find(f => f.value === compoundFrequency)?.label || 'Annually'}
                    </p>
                  </div>
                  
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Your APY</h3>
                  <p className="text-2xl font-bold text-green-400">{formatPercentage(apy)}</p>
                  </div>
            </div>
            </div>
          )}
          
          {viewType === 'table' && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 overflow-x-auto">
              <h3 className="text-lg font-medium text-blue-400 mb-4">Compound Frequency Comparison</h3>
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Compound Frequency</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">APY</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Final Balance</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Interest Earned</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {comparisonData.map((data, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{data.compoundFrequency}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-green-400">{formatPercentage(data.apy)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-400">{formatCurrency(data.finalBalance)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-green-400">{formatCurrency(data.interest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="mt-4 bg-gray-900 p-3 rounded-lg border border-gray-700">
                <h4 className="text-md font-medium text-blue-400 mb-1">APY vs. Nominal Rate</h4>
                <p className="text-sm text-gray-300">
                  The more frequently interest is compounded, the higher the APY will be compared to the nominal rate. 
                  Continuous compounding provides the highest possible APY for a given nominal rate.
              </p>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default APYCalculator; 