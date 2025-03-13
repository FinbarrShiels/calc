'use client';

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

interface InterestRateCalculatorProps {
  calculator?: Calculator;
}

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

interface YearlyData {
  year: number;
  interestRate: number;
  principal: number;
  interest: number;
  totalAmount: number;
}

type CalculationType = 'rate' | 'principal' | 'time' | 'amount';
type ViewType = 'chart' | 'table';
type ChartType = 'line' | 'bar';

const InterestRateCalculator: React.FC<InterestRateCalculatorProps> = ({ calculator }) => {
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
  const [interestRate, setInterestRate] = useState<number>(5);
  const [time, setTime] = useState<number>(5);
  const [targetAmount, setTargetAmount] = useState<number>(1276.28);
  const [calculationType, setCalculationType] = useState<CalculationType>('rate');
  
  // State for results
  const [calculatedRate, setCalculatedRate] = useState<number>(0);
  const [calculatedPrincipal, setCalculatedPrincipal] = useState<number>(0);
  const [calculatedTime, setCalculatedTime] = useState<number>(0);
  const [calculatedAmount, setCalculatedAmount] = useState<number>(0);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);
  
  // View state
  const [viewType, setViewType] = useState<ViewType>('chart');
  const [chartType, setChartType] = useState<ChartType>('line');
  
  // Get currency symbol
  const getCurrencySymbol = (): string => {
    const currency = currencyOptions.find(c => c.value === selectedCurrency);
    return currency ? currency.symbol : '$';
  };
  
  // Handle currency change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };
  
  // Handle calculation type change
  const handleCalculationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCalculationType(e.target.value as CalculationType);
  };
  
  // Calculate interest rate
  const calculateInterestRate = () => {
    // A = P(1 + r)^t
    // r = (A/P)^(1/t) - 1
    const rate = Math.pow(targetAmount / principal, 1 / time) - 1;
    return rate * 100; // Convert to percentage
  };
  
  // Calculate principal
  const calculatePrincipal = () => {
    // A = P(1 + r)^t
    // P = A / (1 + r)^t
    return targetAmount / Math.pow(1 + interestRate / 100, time);
  };
  
  // Calculate time
  const calculateTime = () => {
    // A = P(1 + r)^t
    // t = log(A/P) / log(1 + r)
    if (interestRate === 0) return 0;
    return Math.log(targetAmount / principal) / Math.log(1 + interestRate / 100);
  };
  
  // Calculate amount
  const calculateAmount = () => {
    // A = P(1 + r)^t
    return principal * Math.pow(1 + interestRate / 100, time);
  };
  
  // Calculate yearly data
  const calculateYearlyData = () => {
    const data: YearlyData[] = [];
    const rate = calculationType === 'rate' ? calculatedRate : interestRate;
    const initialPrincipal = calculationType === 'principal' ? calculatedPrincipal : principal;
    const years = calculationType === 'time' ? calculatedTime : time;
    
    for (let year = 0; year <= Math.ceil(years); year++) {
      const yearFraction = year > years ? years - Math.floor(years) : 1;
      const currentRate = rate / 100;
      const currentAmount = initialPrincipal * Math.pow(1 + currentRate, Math.min(year, years));
      const previousAmount = year === 0 ? initialPrincipal : data[year - 1].totalAmount;
      const yearlyInterest = (currentAmount - previousAmount) * (year === Math.ceil(years) ? yearFraction : 1);
      
      data.push({
        year,
        interestRate: rate,
        principal: initialPrincipal,
        interest: yearlyInterest,
        totalAmount: currentAmount
      });
    }
    
    setYearlyData(data);
  };
  
  // Perform calculations based on selected type
  useEffect(() => {
    try {
      switch (calculationType) {
        case 'rate':
          const rate = calculateInterestRate();
          setCalculatedRate(rate);
          setCalculatedAmount(targetAmount);
          break;
        case 'principal':
          const principal = calculatePrincipal();
          setCalculatedPrincipal(principal);
          setCalculatedAmount(targetAmount);
          break;
        case 'time':
          const time = calculateTime();
          setCalculatedTime(time);
          setCalculatedAmount(targetAmount);
          break;
        case 'amount':
          const amount = calculateAmount();
          setCalculatedAmount(amount);
          break;
      }
      
      calculateYearlyData();
    } catch (error) {
      console.error('Calculation error:', error);
    }
  }, [calculationType, principal, interestRate, time, targetAmount, selectedCurrency]);

  // Format currency
  const formatCurrency = (value: number): string => {
    return getCurrencySymbol() + value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  // Format percentage
  const formatPercentage = (value: number): string => {
    return value.toFixed(2) + '%';
  };
  
  // Format time
  const formatTime = (years: number): string => {
    const wholeYears = Math.floor(years);
    const months = Math.round((years - wholeYears) * 12);
    
    if (wholeYears === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (months === 0) {
      return `${wholeYears} year${wholeYears !== 1 ? 's' : ''}`;
    } else {
      return `${wholeYears} year${wholeYears !== 1 ? 's' : ''} and ${months} month${months !== 1 ? 's' : ''}`;
    }
  };

  // Chart data
  const chartData = {
    labels: yearlyData.map(data => `Year ${data.year}`),
    datasets: [
      {
        label: 'Principal',
        data: yearlyData.map(data => data.principal),
        backgroundColor: 'rgba(59, 130, 246, 0.5)', // blue-500 with opacity
        borderColor: '#3b82f6', // blue-500
        borderWidth: 1,
        stack: 'Stack 0'
      },
      {
        label: 'Interest',
        data: yearlyData.map(data => data.totalAmount - data.principal),
        backgroundColor: 'rgba(16, 185, 129, 0.5)', // green-500 with opacity
        borderColor: '#10b981', // green-500
        borderWidth: 1,
        stack: 'Stack 0'
      }
    ]
  };
  
  // Line chart data
  const lineChartData = {
    labels: yearlyData.map(data => `Year ${data.year}`),
    datasets: [
      {
        label: 'Total Amount',
        data: yearlyData.map(data => data.totalAmount),
        backgroundColor: 'rgba(139, 92, 246, 0.5)', // purple-500 with opacity
        borderColor: '#8b5cf6', // purple-500
        borderWidth: 2,
        tension: 0.1
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
            return `${label}: ${getCurrencySymbol()}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      }
    }
  };
  
  // Stacked chart options
  const stackedChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      x: {
        ...chartOptions.scales.x,
        stacked: true
      },
      y: {
        ...chartOptions.scales.y,
        stacked: true
      }
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-xl p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Interest Rate Calculator</h2>
          
          <div className="mb-4">
            <label htmlFor="calculationType" className="block text-sm font-medium text-gray-300 mb-1">
              Calculate
            </label>
            <select 
              id="calculationType"
              value={calculationType}
              onChange={handleCalculationTypeChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rate">Interest Rate</option>
              <option value="principal">Principal</option>
              <option value="time">Time Period</option>
              <option value="amount">Final Amount</option>
            </select>
          </div>
          
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
          
            {calculationType !== 'principal' && (
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
            )}
            
            {calculationType !== 'rate' && (
              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-300 mb-1">
                  Interest Rate (% per year)
                </label>
            <div className="relative">
              <input
                    id="interestRate"
                type="tel"
                    value={interestRate} {...numericInputProps}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
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
            )}
            
            {calculationType !== 'time' && (
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">
                  Time Period (years)
                </label>
            <input
                  id="time"
              type="tel"
                  value={time} {...numericInputProps}
                  onChange={(e) => setTime(Number(e.target.value))}
                  min="0.1"
                  max="50"
                  step="0.1"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
            )}
            
            {calculationType !== 'amount' && (
              <div>
                <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-300 mb-1">
                  Target Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">{getCurrencySymbol()}</span>
                  </div>
                  <input
                    id="targetAmount"
                    type="tel"
                    value={targetAmount} {...numericInputProps}
                    onChange={(e) => setTargetAmount(Number(e.target.value))}
                    min="0"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 bg-gray-800 p-4 rounded-md border border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-blue-400">Calculation Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Principal Amount</p>
                <p className="text-xl font-semibold text-white">
                  {calculationType === 'principal' ? formatCurrency(calculatedPrincipal) : formatCurrency(principal)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Interest Rate</p>
                <p className="text-xl font-semibold text-white">
                  {calculationType === 'rate' ? formatPercentage(calculatedRate) : formatPercentage(interestRate)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Time Period</p>
                <p className="text-xl font-semibold text-white">
                  {calculationType === 'time' ? formatTime(calculatedTime) : formatTime(time)}
              </p>
            </div>
              <div>
                <p className="text-gray-400 text-sm">Final Amount</p>
                <p className="text-xl font-semibold text-green-400">{formatCurrency(calculatedAmount)}</p>
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
                  <h3 className="text-lg font-medium text-blue-400">Growth Over Time</h3>
              <div className="flex space-x-2">
                <button
                      onClick={() => setChartType('line')}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        chartType === 'line' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Line
                </button>
                <button
                      onClick={() => setChartType('bar')}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        chartType === 'bar' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Bar
                </button>
                  </div>
                </div>
                <div className="h-80 w-full">
                  {chartType === 'line' ? (
                    <Line data={lineChartData} options={chartOptions} />
                  ) : (
                    <Bar data={chartData} options={stackedChartOptions} />
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Principal</h3>
                  <p className="text-2xl font-bold text-white">
                    {calculationType === 'principal' ? formatCurrency(calculatedPrincipal) : formatCurrency(principal)}
                  </p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Interest Earned</h3>
                  <p className="text-2xl font-bold text-green-400">
                    {formatCurrency(calculatedAmount - (calculationType === 'principal' ? calculatedPrincipal : principal))}
                  </p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Final Amount</h3>
                  <p className="text-2xl font-bold text-white">{formatCurrency(calculatedAmount)}</p>
            </div>
            
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Interest Rate</h3>
                  <p className="text-2xl font-bold text-white">
                    {calculationType === 'rate' ? formatPercentage(calculatedRate) : formatPercentage(interestRate)}
                  </p>
                </div>
              </div>
              </div>
            )}
            
          {viewType === 'table' && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 overflow-x-auto">
              <h3 className="text-lg font-medium text-blue-400 mb-4">Yearly Breakdown</h3>
              <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Year</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Interest</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {yearlyData.map((data, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{data.year}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-green-400">
                        {index === 0 ? formatCurrency(0) : formatCurrency(data.interest)}
                      </td>
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

export default InterestRateCalculator; 