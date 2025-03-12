'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart } from 'chart.js/auto';
import { numericInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

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
    if (!balanceChartRef.current || savingsData.length === 0) return;
    
    const ctx = balanceChartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (balanceChartInstance.current) {
      balanceChartInstance.current.destroy();
    }
    
    // Filter data to show fewer points for better visualization
    const filterStep = Math.max(1, Math.floor(savingsData.length / 24));
    const filteredData = savingsData.filter((_, index) => index % filterStep === 0 || index === savingsData.length - 1);
    
    const labels = filteredData.map(data => `Month ${data.month}`);
    const balanceData = filteredData.map(data => data.balance);
    const depositsData = filteredData.map(data => data.totalDeposits);
    
    const currencySymbol = getCurrencySymbol();
    
    balanceChartInstance.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: 'Balance',
            data: balanceData,
            backgroundColor: chartType === 'line' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.7)',
            borderColor: 'rgb(34, 197, 94)', // green-500
            borderWidth: 2,
            tension: 0.1
          },
          {
            label: 'Total Deposits',
            data: depositsData,
            backgroundColor: chartType === 'line' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.7)',
            borderColor: 'rgb(59, 130, 246)', // blue-500
            borderWidth: 2,
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(100, 100, 100, 0.2)'
            },
            ticks: {
              color: 'rgb(200, 200, 200)',
              callback: function(value) {
                return currencySymbol + value.toLocaleString();
              }
            },
            title: {
              display: true,
              text: 'Amount',
              color: 'rgb(200, 200, 200)'
            }
          },
          x: {
            grid: {
              color: 'rgba(100, 100, 100, 0.2)'
            },
            ticks: {
              color: 'rgb(200, 200, 200)',
              maxRotation: 45,
              minRotation: 45,
              autoSkip: true,
              maxTicksLimit: 12
            },
            title: {
              display: true,
              text: 'Time',
              color: 'rgb(200, 200, 200)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'rgb(200, 200, 200)'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += currencySymbol + context.parsed.y.toLocaleString();
                }
                return label;
              }
            }
          }
        }
      }
    });
  };
  
  // Create breakdown chart
  const createBreakdownChart = () => {
    if (!breakdownChartRef.current || savingsData.length === 0) return;
    
    const ctx = breakdownChartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (breakdownChartInstance.current) {
      breakdownChartInstance.current.destroy();
    }
    
    const lastMonthData = savingsData[savingsData.length - 1];
    
    breakdownChartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Total Deposits', 'Total Interest'],
        datasets: [
          {
            data: [lastMonthData.totalDeposits, lastMonthData.totalInterest],
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)', // blue-500
              'rgba(249, 115, 22, 0.7)', // orange-500
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(249, 115, 22)',
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
              color: 'rgb(200, 200, 200)'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => (a as number) + (b as number), 0);
                const percentage = Math.round(((value as number) / (total as number)) * 100);
                return `${label}: ${getCurrencySymbol()}${(value as number).toLocaleString()} (${percentage}%)`;
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
    <div className="bg-white dark:bg-gray-800 text-white dark:text-gray-900 rounded-lg shadow-xl p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="calculator-card-alt rounded-lg p-5">
          <h2 className={calculatorSectionHeaderClasses}>Savings Calculator Inputs</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-300 mb-1">
                Currency
              </label>
              <select
                id="currency"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                className={inputClasses}
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
                  className={inputClasses}
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
                  className={inputClasses}
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
                  className={inputClasses}
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
                className={inputClasses}
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
                className={inputClasses}
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-3 text-blue-400">Savings Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Final Balance</p>
                <p className={calculatorSectionHeaderClasses}>{formatCurrency(finalBalance)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Deposits</p>
                <p className={calculatorSectionHeaderClasses}>{formatCurrency(totalDeposits)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Interest Earned</p>
                <p className={calculatorSectionHeaderClasses}>{formatCurrency(totalInterest)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Interest to Deposit Ratio</p>
                <p className="text-xl font-semibold">
                  {totalDeposits > 0 ? `${(totalInterest / totalDeposits * 100).toFixed(2)}%` : '0%'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className={calculatorSectionHeaderClasses}>Results</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewType('chart')}
                className={`px-3 py-1 rounded-md text-sm ${
                  viewType === 'chart' 
                    ? 'bg-blue-600 text-gray-900 dark:text-white-foreground' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-300 hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Chart
              </button>
              <button
                onClick={() => setViewType('table')}
                className={`px-3 py-1 rounded-md text-sm ${
                  viewType === 'table' 
                    ? 'bg-blue-600 text-gray-900 dark:text-white-foreground' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-300 hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Table
              </button>
            </div>
          </div>
          
          {viewType === 'chart' && (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-green-400">Savings Growth</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setChartType('line')}
                      className={`px-2 py-1 rounded-md text-xs ${
                        chartType === 'line' 
                          ? 'bg-green-600 text-gray-900 dark:text-white-foreground' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-300 hover:bg-gray-100 dark:bg-gray-850/80'
                      }`}
                    >
                      Line
                    </button>
                    <button
                      onClick={() => setChartType('bar')}
                      className={`px-2 py-1 rounded-md text-xs ${
                        chartType === 'bar' 
                          ? 'bg-blue-600 text-gray-900 dark:text-white-foreground' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-300 hover:bg-gray-100 dark:bg-gray-850/80'
                      }`}
                    >
                      Bar
                    </button>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4" style={{ height: '300px' }}>
                  <canvas ref={balanceChartRef}></canvas>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 text-orange-400">Deposits vs. Interest</h3>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4" style={{ height: '250px' }}>
                  <canvas ref={breakdownChartRef}></canvas>
                </div>
              </div>
            </div>
          )}
          
          {viewType === 'table' && (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
              <div className="max-h-[550px] overflow-y-auto">
                <table className="calculator-table">
                  <thead className={secondaryButtonClasses}>
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Month
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Deposit
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Interest
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100 dark:bg-gray-800 divide-y divide-gray-600">
                    {savingsData.map((data, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-muted' : 'bg-gray-650'}>
                        <td className="calculator-table-cell">
                          {data.month}
                        </td>
                        <td className="calculator-table-cell">
                          {formatCurrency(data.deposit)}
                        </td>
                        <td className="calculator-table-cell">
                          {formatCurrency(data.interest)}
                        </td>
                        <td className="calculator-table-cell">
                          {formatCurrency(data.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator; 