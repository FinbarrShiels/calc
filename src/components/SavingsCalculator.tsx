'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { numericInputProps } from '@/utils/inputUtils';

interface SavingsCalculatorProps {
  calculator?: Calculator;
}

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

interface SavingsData {
  month: number;
  deposit: number;
  interest: number;
  balance: number;
  totalDeposits: number;
  totalInterest: number;
}

type ChartType = 'line' | 'bar';
type ViewType = 'chart' | 'table';
type CompoundFrequency = 'daily' | 'monthly' | 'quarterly' | 'annually';

const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ calculator }) => {
  // Currency options
  const currencyOptions: CurrencyOption[] = [
    { value: 'USD', label: 'USD ($)', symbol: '$' },
    { value: 'EUR', label: 'EUR (€)', symbol: '€' },
    { value: 'GBP', label: 'GBP (£)', symbol: '£' },
    { value: 'JPY', label: 'JPY (¥)', symbol: '¥' },
    { value: 'INR', label: 'INR (₹)', symbol: '₹' }
  ];
  
  // Input state
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [initialDeposit, setInitialDeposit] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(5);
  const [savingsPeriod, setSavingsPeriod] = useState<number>(5);
  const [compoundFrequency, setCompoundFrequency] = useState<CompoundFrequency>('monthly');
  
  // Result state
  const [finalBalance, setFinalBalance] = useState<number>(0);
  const [totalDeposits, setTotalDeposits] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [savingsData, setSavingsData] = useState<SavingsData[]>([]);
  
  // View state
  const [viewType, setViewType] = useState<ViewType>('chart');
  const [chartType, setChartType] = useState<ChartType>('line');
  
  // Chart refs
  const balanceChartRef = useRef<HTMLCanvasElement>(null);
  const balanceChartInstance = useRef<Chart | null>(null);
  const breakdownChartRef = useRef<HTMLCanvasElement>(null);
  const breakdownChartInstance = useRef<Chart | null>(null);
  
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
    setCompoundFrequency(e.target.value as CompoundFrequency);
  };
  
  // Calculate savings
  useEffect(() => {
    calculateSavings();
  }, [initialDeposit, monthlyContribution, annualInterestRate, savingsPeriod, compoundFrequency]);
  
  // Update charts when results change
  useEffect(() => {
    createBalanceChart();
    createBreakdownChart();
    
    return () => {
      if (balanceChartInstance.current) {
        balanceChartInstance.current.destroy();
      }
      if (breakdownChartInstance.current) {
        breakdownChartInstance.current.destroy();
      }
    };
  }, [savingsData, selectedCurrency, chartType]);
  
  // Handle window resize for chart responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (balanceChartInstance.current) {
        balanceChartInstance.current.resize();
      }
      if (breakdownChartInstance.current) {
        breakdownChartInstance.current.resize();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Get number of compounds per year based on frequency
  const getCompoundsPerYear = (): number => {
    switch (compoundFrequency) {
      case 'daily': return 365;
      case 'monthly': return 12;
      case 'quarterly': return 4;
      case 'annually': return 1;
      default: return 12;
    }
  };
  
  // Calculate savings
  const calculateSavings = () => {
    const compoundsPerYear = getCompoundsPerYear();
    const totalMonths = savingsPeriod * 12;
    const monthlyRate = (annualInterestRate / 100) / compoundsPerYear;
    const compoundsPerMonth = compoundsPerYear / 12;
    
    let balance = initialDeposit;
    let totalDeposit = initialDeposit;
    let totalInterestEarned = 0;
    
    const data: SavingsData[] = [];
    
    // Calculate for each month
    for (let month = 1; month <= totalMonths; month++) {
      const monthlyDeposit = monthlyContribution;
      let interestForMonth = 0;
      
      // Apply compound interest for this month
      for (let i = 0; i < compoundsPerMonth; i++) {
        const interest = balance * monthlyRate;
        balance += interest;
        interestForMonth += interest;
      }
      
      // Add monthly contribution at the end of the month
      balance += monthlyDeposit;
      totalDeposit += monthlyDeposit;
      totalInterestEarned += interestForMonth;
      
      // Store data for this month
      data.push({
        month,
        deposit: monthlyDeposit,
        interest: interestForMonth,
        balance,
        totalDeposits: totalDeposit,
        totalInterest: totalInterestEarned
      });
    }
    
    setFinalBalance(balance);
    setTotalDeposits(totalDeposit);
    setTotalInterest(totalInterestEarned);
    setSavingsData(data);
  };
  
  // Create balance chart
  const createBalanceChart = () => {
    if (!balanceChartRef.current) return;
    
    const ctx = balanceChartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (balanceChartInstance.current) {
      balanceChartInstance.current.destroy();
    }
    
    const labels = savingsData.map(data => `Month ${data.month}`);
    const balanceData = savingsData.map(data => data.balance);
    
    const currencySymbol = getCurrencySymbol();
    
    balanceChartInstance.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: 'Balance',
            data: balanceData,
            backgroundColor: 'rgba(59, 130, 246, 0.5)', // blue-500 with opacity
            borderColor: '#3b82f6', // blue-500
            borderWidth: 1,
            fill: chartType === 'line',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
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
              label: function(context) {
                const rawValue = context.raw as number;
                return `Balance: ${currencySymbol}${rawValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
              }
            }
          }
        },
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
              callback: function(value) {
                return currencySymbol + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  };
  
  // Create breakdown chart
  const createBreakdownChart = () => {
    if (!breakdownChartRef.current) return;
    
    const ctx = breakdownChartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (breakdownChartInstance.current) {
      breakdownChartInstance.current.destroy();
    }
    
    const labels = savingsData.map(data => `Month ${data.month}`);
    const depositData = savingsData.map(data => data.totalDeposits);
    const interestData = savingsData.map(data => data.totalInterest);
    
    const currencySymbol = getCurrencySymbol();
    
    breakdownChartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Deposits',
            data: depositData,
            backgroundColor: 'rgba(59, 130, 246, 0.5)', // blue-500 with opacity
            borderColor: '#3b82f6', // blue-500
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'Interest',
            data: interestData,
            backgroundColor: 'rgba(16, 185, 129, 0.5)', // green-500 with opacity
            borderColor: '#10b981', // green-500
            borderWidth: 1,
            stack: 'Stack 0'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
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
              label: function(context) {
                const dataValue = context.raw as number;
                const label = context.dataset.label || '';
                return `${label}: ${currencySymbol}${dataValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
              },
              footer: function(tooltipItems) {
                const total = tooltipItems.reduce((sum, item) => sum + (item.raw as number), 0);
                return `Total: ${currencySymbol}${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // lighter grid lines for dark background
            },
            ticks: {
              color: '#e5e7eb', // text-gray-200
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // lighter grid lines for dark background
            },
            ticks: {
              color: '#e5e7eb', // text-gray-200
              callback: function(value) {
                return currencySymbol + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  };
  
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
          <h2 className="text-xl font-bold text-white mb-4">Savings Calculator Inputs</h2>
          
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
              <label htmlFor="initialDeposit" className="block text-sm font-medium text-gray-300 mb-1">
                Initial Deposit
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{getCurrencySymbol()}</span>
                </div>
                <input
                  id="initialDeposit"
                  type="tel"
                  value={initialDeposit} {...numericInputProps}
                  onChange={(e) => setInitialDeposit(Number(e.target.value))}
                  min="0"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="monthlyContribution" className="block text-sm font-medium text-gray-300 mb-1">
                Monthly Contribution
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{getCurrencySymbol()}</span>
                </div>
                <input
                  id="monthlyContribution"
                  type="tel"
                  value={monthlyContribution} {...numericInputProps}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  min="0"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="annualInterestRate" className="block text-sm font-medium text-gray-300 mb-1">
                Annual Interest Rate
              </label>
              <div className="relative">
                <input
                  id="annualInterestRate"
                  type="tel"
                  value={annualInterestRate} {...numericInputProps}
                  onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
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
              <label htmlFor="savingsPeriod" className="block text-sm font-medium text-gray-300 mb-1">
                Savings Period (Years)
              </label>
              <input
                id="savingsPeriod"
                type="tel"
                value={savingsPeriod} {...numericInputProps}
                onChange={(e) => setSavingsPeriod(Number(e.target.value))}
                min="1"
                max="50"
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-800 p-4 rounded-md border border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-blue-400">Savings Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Final Balance</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(finalBalance)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Deposits</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(totalDeposits)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Interest Earned</p>
                <p className="text-xl font-semibold text-green-400">{formatCurrency(totalInterest)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Interest to Deposit Ratio</p>
                <p className="text-xl font-semibold text-white">
                  {totalDeposits > 0 ? `${(totalInterest / totalDeposits * 100).toFixed(2)}%` : '0%'}
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
                  <h3 className="text-lg font-medium text-blue-400">Savings Growth</h3>
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
                  <canvas ref={balanceChartRef}></canvas>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-blue-400 mb-2">Savings Breakdown</h3>
                <div className="h-80 w-full">
                  <canvas ref={breakdownChartRef}></canvas>
                </div>
              </div>
            </div>
          )}
          
          {viewType === 'table' && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 overflow-x-auto">
              <h3 className="text-lg font-medium text-blue-400 mb-4">Savings Details</h3>
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Month</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Deposit</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Interest</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Balance</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Deposits</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Interest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {savingsData.map((data, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{data.month}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{formatCurrency(data.deposit)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-green-400">{formatCurrency(data.interest)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-400">{formatCurrency(data.balance)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{formatCurrency(data.totalDeposits)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-green-400">{formatCurrency(data.totalInterest)}</td>
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

export default SavingsCalculator; 