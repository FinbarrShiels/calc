'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart } from 'chart.js/auto';
import { numericInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

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
            label: 'Retirement Balance',
            data: balanceData,
            backgroundColor: chartType === 'line' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.7)',
            borderColor: 'rgb(34, 197, 94)', // green-500
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
              text: 'Balance',
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
              maxTicksLimit: 10
            },
            title: {
              display: true,
              text: 'Age',
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
  
  const createBreakdownChart = () => {
    if (!breakdownChartRef.current || yearlyData.length === 0) return;
    
    const ctx = breakdownChartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (breakdownChartInstance.current) {
      breakdownChartInstance.current.destroy();
    }
    
    const lastYearData = yearlyData[yearlyData.length - 1];
    
    breakdownChartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Total Contributions', 'Total Interest'],
        datasets: [
          {
            data: [lastYearData.totalContributions, lastYearData.totalInterest],
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
          <h2 className={calculatorSectionHeaderClasses}>Retirement Planning Inputs</h2>
          
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
                className={inputClasses}
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
                className={inputClasses}
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
                  className={inputClasses}
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
                  className={inputClasses}
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
                  className={inputClasses}
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
                  className={inputClasses}
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
                  className={inputClasses}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-3 text-blue-400">Retirement Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Years Until Retirement</p>
                <p className="text-xl font-semibold">{retirementAge - currentAge} years</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Retirement Balance</p>
                <p className={calculatorSectionHeaderClasses}>{formatCurrency(retirementBalance)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Annual Retirement Income</p>
                <p className={calculatorSectionHeaderClasses}>{formatCurrency(annualRetirementIncome)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Monthly Retirement Income</p>
                <p className={calculatorSectionHeaderClasses}>{formatCurrency(annualRetirementIncome / 12)}</p>
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
                  <h3 className="text-lg font-medium text-green-400">Balance Growth</h3>
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
                  <canvas ref={growthChartRef}></canvas>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 text-orange-400">Contributions vs. Interest</h3>
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
                        Age
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Year
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Contribution
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
                    {yearlyData.map((data, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-muted' : 'bg-gray-650'}>
                        <td className="calculator-table-cell">
                          {data.age}
                        </td>
                        <td className="calculator-table-cell">
                          {data.year}
                        </td>
                        <td className="calculator-table-cell">
                          {formatCurrency(data.contribution)}
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

export default RetirementPlanningCalculator; 