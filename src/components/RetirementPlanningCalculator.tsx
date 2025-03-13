'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { numericInputProps } from '@/utils/inputUtils';

interface RetirementPlanningCalculatorProps {
  calculator?: Calculator;
}

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

interface YearlyData {
  year: number;
  age: number;
  contribution: number;
  balance: number;
  interest: number;
  totalContributions: number;
  totalInterest: number;
}

type ChartType = 'line' | 'bar';
type ViewType = 'chart' | 'table';

const RetirementPlanningCalculator: React.FC<RetirementPlanningCalculatorProps> = ({ calculator }) => {
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
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [annualContribution, setAnnualContribution] = useState<number>(6000);
  const [expectedReturn, setExpectedReturn] = useState<number>(7);
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  const [withdrawalRate, setWithdrawalRate] = useState<number>(4);
  
  // Result state
  const [retirementBalance, setRetirementBalance] = useState<number>(0);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);
  const [annualRetirementIncome, setAnnualRetirementIncome] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  // View state
  const [viewType, setViewType] = useState<ViewType>('chart');
  const [chartType, setChartType] = useState<ChartType>('line');
  
  // Chart ref
  const growthChartRef = useRef<HTMLCanvasElement>(null);
  const growthChartInstance = useRef<Chart | null>(null);
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
  
  // Calculate retirement details
  useEffect(() => {
    calculateRetirement();
  }, [currentAge, retirementAge, currentSavings, annualContribution, expectedReturn, inflationRate, withdrawalRate]);
  
  // Update charts when results change or currency changes or chart type changes
  useEffect(() => {
    createGrowthChart();
    createBreakdownChart();
    
    return () => {
      if (growthChartInstance.current) {
        growthChartInstance.current.destroy();
      }
      if (breakdownChartInstance.current) {
        breakdownChartInstance.current.destroy();
      }
    };
  }, [yearlyData, selectedCurrency, chartType]);
  
  // Handle window resize for chart responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (growthChartInstance.current) {
        growthChartInstance.current.resize();
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
  
  const calculateRetirement = () => {
    if (currentAge >= retirementAge) {
      setYearlyData([]);
      setRetirementBalance(0);
      setAnnualRetirementIncome(0);
      setTotalContributions(0);
      setTotalInterest(0);
      return;
    }
    
    const years = retirementAge - currentAge;
    const data: YearlyData[] = [];
    
    let balance = currentSavings;
    let totalContrib = currentSavings;
    let totalInt = 0;
    
    // Calculate yearly growth
    for (let i = 0; i <= years; i++) {
      const age = currentAge + i;
      const yearlyContribution = i === 0 ? 0 : annualContribution; // No contribution in first year (already counted in currentSavings)
      const interest = balance * (expectedReturn / 100);
      
      balance += interest + yearlyContribution;
      totalContrib += yearlyContribution;
      totalInt += interest;
      
      data.push({
        year: i,
        age,
        contribution: yearlyContribution,
        balance,
        interest,
        totalContributions: totalContrib,
        totalInterest: totalInt
      });
    }
    
    setYearlyData(data);
    setRetirementBalance(balance);
    setAnnualRetirementIncome(balance * (withdrawalRate / 100));
    setTotalContributions(totalContrib);
    setTotalInterest(totalInt);
  };
  
  const createGrowthChart = () => {
    if (!growthChartRef.current) return;
    
    const ctx = growthChartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (growthChartInstance.current) {
      growthChartInstance.current.destroy();
    }
    
    const labels = yearlyData.map(data => `Age ${data.age}`);
    const balanceData = yearlyData.map(data => data.balance);
    
    const currencySymbol = getCurrencySymbol();
    
    growthChartInstance.current = new Chart(ctx, {
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
  
  const createBreakdownChart = () => {
    if (!breakdownChartRef.current) return;
    
    const ctx = breakdownChartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (breakdownChartInstance.current) {
      breakdownChartInstance.current.destroy();
    }
    
    const labels = yearlyData.map(data => `Age ${data.age}`);
    const contributionsData = yearlyData.map(data => data.totalContributions);
    const interestData = yearlyData.map(data => data.totalInterest);
    
    const currencySymbol = getCurrencySymbol();
    
    breakdownChartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Contributions',
            data: contributionsData,
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
          <h2 className="text-xl font-bold text-white mb-4">Retirement Planning Inputs</h2>
          
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
              <label htmlFor="currentAge" className="block text-sm font-medium text-gray-300 mb-1">
                Current Age
              </label>
              <input
                id="currentAge"
                type="tel"
                value={currentAge} {...numericInputProps}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                min="18"
                max="100"
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="retirementAge" className="block text-sm font-medium text-gray-300 mb-1">
                Retirement Age
              </label>
              <input
                id="retirementAge"
                type="tel"
                value={retirementAge} {...numericInputProps}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                min={currentAge + 1}
                max="100"
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="currentSavings" className="block text-sm font-medium text-gray-300 mb-1">
                Current Savings
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{getCurrencySymbol()}</span>
                </div>
                <input
                  id="currentSavings"
                  type="tel"
                  value={currentSavings} {...numericInputProps}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  min="0"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="annualContribution" className="block text-sm font-medium text-gray-300 mb-1">
                Annual Contribution
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{getCurrencySymbol()}</span>
                </div>
                <input
                  id="annualContribution"
                  type="tel"
                  value={annualContribution} {...numericInputProps}
                  onChange={(e) => setAnnualContribution(Number(e.target.value))}
                  min="0"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="expectedReturn" className="block text-sm font-medium text-gray-300 mb-1">
                Expected Annual Return
              </label>
              <div className="relative">
                <input
                  id="expectedReturn"
                  type="tel"
                  value={expectedReturn} {...numericInputProps}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  min="0"
                  max="30"
                  step="0.1"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">%</span>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="inflationRate" className="block text-sm font-medium text-gray-300 mb-1">
                Inflation Rate
              </label>
              <div className="relative">
                <input
                  id="inflationRate"
                  type="tel"
                  value={inflationRate} {...numericInputProps}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  min="0"
                  max="20"
                  step="0.1"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">%</span>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="withdrawalRate" className="block text-sm font-medium text-gray-300 mb-1">
                Annual Withdrawal Rate
              </label>
              <div className="relative">
                <input
                  id="withdrawalRate"
                  type="tel"
                  value={withdrawalRate} {...numericInputProps}
                  onChange={(e) => setWithdrawalRate(Number(e.target.value))}
                  min="0"
                  max="20"
                  step="0.1"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-800 p-4 rounded-md border border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-blue-400">Retirement Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Years Until Retirement</p>
                <p className="text-xl font-semibold text-white">{retirementAge - currentAge} years</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Retirement Balance</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(retirementBalance)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Annual Retirement Income</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(annualRetirementIncome)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Monthly Retirement Income</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(annualRetirementIncome / 12)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Results</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewType('chart')}
                className={`px-4 py-1 rounded-md ${
                  viewType === 'chart' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Chart
              </button>
              <button
                onClick={() => setViewType('table')}
                className={`px-4 py-1 rounded-md ${
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
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Balance Growth</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setChartType('line')}
                      className={`px-4 py-1 rounded-md ${
                        chartType === 'line' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Line
                    </button>
                    <button
                      onClick={() => setChartType('bar')}
                      className={`px-4 py-1 rounded-md ${
                        chartType === 'bar' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Bar
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700" style={{ height: '300px' }}>
                  <canvas ref={growthChartRef}></canvas>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Breakdown</h3>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700" style={{ height: '300px' }}>
                  <canvas ref={breakdownChartRef}></canvas>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Final Balance</h3>
                  <p className="text-2xl font-bold text-white">{formatCurrency(retirementBalance)}</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Total Contributions</h3>
                  <p className="text-2xl font-bold text-white">{formatCurrency(totalContributions)}</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Total Interest</h3>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(totalInterest)}</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Years to Retirement</h3>
                  <p className="text-2xl font-bold text-white">{retirementAge - currentAge} years</p>
                </div>
              </div>
            </div>
          )}
          
          {viewType === 'table' && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-900 text-gray-300">
                  <tr>
                    <th className="px-4 py-3">Year</th>
                    <th className="px-4 py-3">Age</th>
                    <th className="px-4 py-3">Contribution</th>
                    <th className="px-4 py-3">Interest</th>
                    <th className="px-4 py-3">Balance</th>
                    <th className="px-4 py-3">Total Contributions</th>
                    <th className="px-4 py-3">Total Interest</th>
                    </tr>
                  </thead>
                <tbody>
                    {yearlyData.map((data, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-900 bg-opacity-50' : ''}>
                      <td className="px-4 py-2 text-gray-300">{data.year}</td>
                      <td className="px-4 py-2 text-gray-300">{data.age}</td>
                      <td className="px-4 py-2 text-gray-300">{formatCurrency(data.contribution)}</td>
                      <td className="px-4 py-2 text-green-400">{formatCurrency(data.interest)}</td>
                      <td className="px-4 py-2 text-blue-400">{formatCurrency(data.balance)}</td>
                      <td className="px-4 py-2 text-gray-300">{formatCurrency(data.totalContributions)}</td>
                      <td className="px-4 py-2 text-green-400">{formatCurrency(data.totalInterest)}</td>
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

export default RetirementPlanningCalculator; 