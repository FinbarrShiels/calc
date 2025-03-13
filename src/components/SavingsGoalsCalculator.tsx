'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { numericInputProps } from '@/utils/inputUtils';

interface SavingsGoalsCalculatorProps {
  calculator?: Calculator;
}

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

interface GoalData {
  month: number;
  deposit: number;
  interest: number;
  balance: number;
  totalDeposits: number;
  totalInterest: number;
  percentComplete: number;
}

type ChartType = 'line' | 'bar';
type ViewType = 'chart' | 'table';
type CompoundFrequency = 'daily' | 'monthly' | 'quarterly' | 'annually';

const SavingsGoalsCalculator: React.FC<SavingsGoalsCalculatorProps> = ({ calculator }) => {
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
  const [initialSavings, setInitialSavings] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(5);
  const [targetAmount, setTargetAmount] = useState<number>(10000);
  const [compoundFrequency, setCompoundFrequency] = useState<CompoundFrequency>('monthly');
  
  // Result state
  const [timeToReachGoal, setTimeToReachGoal] = useState<number>(0);
  const [totalDeposits, setTotalDeposits] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [goalData, setGoalData] = useState<GoalData[]>([]);
  const [isGoalReached, setIsGoalReached] = useState<boolean>(false);
  
  // View state
  const [viewType, setViewType] = useState<ViewType>('chart');
  const [chartType, setChartType] = useState<ChartType>('line');
  
  // Chart refs
  const progressChartRef = useRef<HTMLCanvasElement>(null);
  const progressChartInstance = useRef<Chart | null>(null);
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
  
  // Calculate goal progress
  useEffect(() => {
    calculateGoalProgress();
  }, [initialSavings, monthlyContribution, annualInterestRate, targetAmount, compoundFrequency]);
  
  // Update charts when results change
  useEffect(() => {
    createProgressChart();
      createBreakdownChart();
    
    return () => {
      if (progressChartInstance.current) {
        progressChartInstance.current.destroy();
      }
      if (breakdownChartInstance.current) {
        breakdownChartInstance.current.destroy();
      }
    };
  }, [goalData, selectedCurrency, chartType]);
  
  // Handle window resize for chart responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (progressChartInstance.current) {
        progressChartInstance.current.resize();
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
  
  // Calculate goal progress
  const calculateGoalProgress = () => {
    if (targetAmount <= initialSavings) {
      setTimeToReachGoal(0);
      setTotalDeposits(initialSavings);
      setTotalInterest(0);
      setGoalData([]);
      setIsGoalReached(true);
      return;
    }
    
    const compoundsPerYear = getCompoundsPerYear();
    const monthlyRate = (annualInterestRate / 100) / compoundsPerYear;
    const compoundsPerMonth = compoundsPerYear / 12;
    
    let balance = initialSavings;
    let totalDeposit = initialSavings;
    let totalInterestEarned = 0;
    let month = 0;
    let goalReached = false;
    
    const data: GoalData[] = [];
    
    // Maximum 50 years (600 months) to prevent infinite loops
    const maxMonths = 600;
    
    while (balance < targetAmount && month < maxMonths) {
      month++;
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
      
      const percentComplete = Math.min(100, (balance / targetAmount) * 100);
      
      // Store data for this month
      data.push({
        month,
        deposit: monthlyDeposit,
        interest: interestForMonth,
        balance,
        totalDeposits: totalDeposit,
        totalInterest: totalInterestEarned,
        percentComplete
      });
      
      if (balance >= targetAmount) {
        goalReached = true;
        break;
      }
    }
    
    setTimeToReachGoal(month);
    setTotalDeposits(totalDeposit);
    setTotalInterest(totalInterestEarned);
    setGoalData(data);
    setIsGoalReached(goalReached);
  };
  
  // Create progress chart
  const createProgressChart = () => {
    if (!progressChartRef.current) return;
    
    const ctx = progressChartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (progressChartInstance.current) {
      progressChartInstance.current.destroy();
    }
    
    const labels = goalData.map(data => `Month ${data.month}`);
    const balanceData = goalData.map(data => data.balance);
    const targetLine = goalData.map(() => targetAmount);
    
    const currencySymbol = getCurrencySymbol();
    
    progressChartInstance.current = new Chart(ctx, {
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
          },
          {
            label: 'Target',
            data: targetLine,
            backgroundColor: 'rgba(239, 68, 68, 0.2)', // red-500 with opacity
            borderColor: 'rgba(239, 68, 68, 0.7)', // red-500 with opacity
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0,
            type: 'line'
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
                const label = context.dataset.label || '';
                return `${label}: ${currencySymbol}${rawValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
    if (!breakdownChartRef.current || goalData.length === 0) return;
    
    const ctx = breakdownChartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (breakdownChartInstance.current) {
      breakdownChartInstance.current.destroy();
    }
    
    const lastData = goalData[goalData.length - 1];
    
    const currencySymbol = getCurrencySymbol();
    
    breakdownChartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Initial Savings', 'Contributions', 'Interest'],
        datasets: [
          {
            data: [initialSavings, lastData.totalDeposits - initialSavings, lastData.totalInterest],
            backgroundColor: [
              'rgba(16, 185, 129, 0.7)', // green-500 with opacity
              'rgba(59, 130, 246, 0.7)', // blue-500 with opacity
              'rgba(245, 158, 11, 0.7)', // yellow-500 with opacity
            ],
            borderColor: [
              '#10b981', // green-500
              '#3b82f6', // blue-500
              '#f59e0b', // yellow-500
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
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
                const label = context.label || '';
                const total = lastData.balance;
                const percentage = Math.round((dataValue / total) * 100);
                return `${label}: ${currencySymbol}${dataValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${percentage}%)`;
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
  
  // Format time
  const formatTime = (months: number): string => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} and ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-xl p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Savings Goal Calculator</h2>
          
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
            
            <div>
              <label htmlFor="initialSavings" className="block text-sm font-medium text-gray-300 mb-1">
                Initial Savings
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{getCurrencySymbol()}</span>
                </div>
                <input
                  id="initialSavings"
                  type="tel"
                  value={initialSavings} {...numericInputProps}
                  onChange={(e) => setInitialSavings(Number(e.target.value))}
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
            <h3 className="text-lg font-medium mb-3 text-blue-400">Goal Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Time to Reach Goal</p>
                <p className="text-xl font-semibold text-white">
                  {isGoalReached ? formatTime(timeToReachGoal) : 'Goal not reachable'}
                </p>
                </div>
              <div>
                <p className="text-gray-400 text-sm">Final Balance</p>
                <p className="text-xl font-semibold text-white">
                  {isGoalReached && goalData.length > 0 ? formatCurrency(goalData[goalData.length - 1].balance) : '-'}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Contributions</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(totalDeposits)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Interest Earned</p>
                <p className="text-xl font-semibold text-green-400">{formatCurrency(totalInterest)}</p>
              </div>
            </div>
            
            {goalData.length > 0 && (
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                  <div 
                    className="bg-blue-600 h-4 rounded-full" 
                    style={{ width: `${Math.min(100, (goalData[goalData.length - 1].balance / targetAmount) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-300 text-right">
                  {Math.min(100, Math.round((goalData[goalData.length - 1].balance / targetAmount) * 100))}% of goal
                </p>
              </div>
            )}
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
                  <h3 className="text-lg font-medium text-blue-400">Goal Progress</h3>
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
                  <canvas ref={progressChartRef}></canvas>
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
              <h3 className="text-lg font-medium text-blue-400 mb-4">Goal Progress Details</h3>
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Month</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Deposit</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Interest</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Balance</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">% Complete</th>
                        </tr>
                      </thead>
                <tbody className="divide-y divide-gray-700">
                  {goalData.map((data, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{data.month}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{formatCurrency(data.deposit)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-green-400">{formatCurrency(data.interest)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-400">{formatCurrency(data.balance)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{data.percentComplete.toFixed(1)}%</td>
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

export default SavingsGoalsCalculator; 