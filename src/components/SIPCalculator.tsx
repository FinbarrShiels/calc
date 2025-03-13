'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart } from 'chart.js/auto';
import { numericInputProps } from '@/utils/inputUtils';


interface SIPCalculatorProps {
  calculator?: Calculator;
}

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

interface YearlyData {
  year: number;
  investment: number;
  interest: number;
  totalInvestment: number;
  futureValue: number;
  inflationAdjustedValue: number;
}

type ChartType = 'line' | 'bar';
type ViewType = 'chart' | 'table';

const SIPCalculator: React.FC<SIPCalculatorProps> = ({ calculator }) => {
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
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(1000);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(12);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
  const [inflationRate, setInflationRate] = useState<number>(3);
  const [stepUpRate, setStepUpRate] = useState<number>(0);
  
  // Result state
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [estimatedReturns, setEstimatedReturns] = useState<number>(0);
  const [futureValue, setFutureValue] = useState<number>(0);
  const [inflationAdjustedValue, setInflationAdjustedValue] = useState<number>(0);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);
  
  // View state
  const [viewType, setViewType] = useState<ViewType>('chart');
  const [chartType, setChartType] = useState<ChartType>('line');
  
  // Chart refs
  const growthChartRef = useRef<HTMLCanvasElement>(null);
  const growthChartInstance = useRef<Chart | null>(null);
  const breakdownChartRef = useRef<HTMLCanvasElement>(null);
  const breakdownChartInstance = useRef<Chart | null>(null);
  
  // Calculate SIP
  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturnRate, investmentPeriod, inflationRate, stepUpRate]);
  
  // Update charts when data changes
  useEffect(() => {
    if (yearlyData.length > 0) {
      createGrowthChart();
      createBreakdownChart();
    }
    
    return () => {
      if (growthChartInstance.current) {
        growthChartInstance.current.destroy();
      }
      if (breakdownChartInstance.current) {
        breakdownChartInstance.current.destroy();
      }
    };
  }, [yearlyData, chartType, selectedCurrency]);
  
  // Handle window resize for chart responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (growthChartInstance.current) {
        growthChartInstance.current.resize();
      }
      if (breakdownChartInstance.current) {
        breakdownChartInstance.current.destroy();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Get currency symbol
  const getCurrencySymbol = (): string => {
    const currency = currencyOptions.find(c => c.value === selectedCurrency);
    return currency ? currency.symbol : '$';
  };
  
  // Handle currency change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };
  
  // Calculate SIP
  const calculateSIP = () => {
    // Convert annual rates to monthly
    const monthlyRate = expectedReturnRate / 100 / 12;
    const monthlyInflationRate = inflationRate / 100 / 12;
    
    // Initialize variables
    let totalInvested = 0;
    let futureVal = 0;
    let inflationAdjustedVal = 0;
    const data: YearlyData[] = [];
    
    // Calculate for each year
    for (let year = 1; year <= investmentPeriod; year++) {
      let yearlyInvestment = 0;
      let yearlyInterest = 0;
      let currentMonthlyInvestment = monthlyInvestment;
      
      // Calculate for each month in the year
      for (let month = 1; month <= 12; month++) {
        // Apply step-up at the beginning of each year (except first year)
        if (month === 1 && year > 1 && stepUpRate > 0) {
          currentMonthlyInvestment = monthlyInvestment * Math.pow(1 + stepUpRate / 100, year - 1);
        }
        
        // Add monthly investment
        yearlyInvestment += currentMonthlyInvestment;
        totalInvested += currentMonthlyInvestment;
        
        // Calculate interest for this month
        const interestForMonth = (futureVal + currentMonthlyInvestment) * monthlyRate;
        yearlyInterest += interestForMonth;
        
        // Update future value
        futureVal += currentMonthlyInvestment + interestForMonth;
      }
      
      // Calculate inflation-adjusted value
      inflationAdjustedVal = futureVal / Math.pow(1 + inflationRate / 100, year);
      
      // Add yearly data
      data.push({
        year,
        investment: yearlyInvestment,
        interest: yearlyInterest,
        totalInvestment: totalInvested,
        futureValue: futureVal,
        inflationAdjustedValue: inflationAdjustedVal
      });
    }
    
    // Update state
    setTotalInvestment(totalInvested);
    setEstimatedReturns(futureVal - totalInvested);
    setFutureValue(futureVal);
    setInflationAdjustedValue(inflationAdjustedVal);
    setYearlyData(data);
  };
  
  // Create growth chart
  const createGrowthChart = () => {
    if (!growthChartRef.current) return;
    
    const ctx = growthChartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (growthChartInstance.current) {
      growthChartInstance.current.destroy();
    }
    
    const labels = yearlyData.map(data => `Year ${data.year}`);
    const investmentData = yearlyData.map(data => data.totalInvestment);
    const futureValueData = yearlyData.map(data => data.futureValue);
    const inflationAdjustedData = yearlyData.map(data => data.inflationAdjustedValue);
    
    const currencySymbol = getCurrencySymbol();
    
    growthChartInstance.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: 'Total Investment',
            data: investmentData,
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: '#3b82f6', // blue-500
            borderWidth: 2,
            tension: 0.1
          },
          {
            label: 'Future Value',
            data: futureValueData,
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: '#10b981', // emerald-500
            borderWidth: 2,
            tension: 0.1
          },
          {
            label: 'Inflation Adjusted Value',
            data: inflationAdjustedData,
            backgroundColor: 'rgba(249, 115, 22, 0.2)',
            borderColor: '#f97316', // orange-500
            borderWidth: 2,
            tension: 0.1,
            borderDash: [5, 5]
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
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              callback: function(value) {
                return currencySymbol + value.toLocaleString();
              }
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'rgba(255, 255, 255, 0.7)',
              boxWidth: 12,
              padding: 10
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.raw as number;
                return `${context.dataset.label}: ${currencySymbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
              }
            }
          }
        }
      }
    });
  };
  
  // Create breakdown chart
  const createBreakdownChart = () => {
    if (!breakdownChartRef.current || yearlyData.length === 0) return;
    
    const ctx = breakdownChartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (breakdownChartInstance.current) {
      breakdownChartInstance.current.destroy();
    }
    
    const currencySymbol = getCurrencySymbol();
    
    breakdownChartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Total Investment', 'Estimated Returns'],
        datasets: [
          {
            data: [totalInvestment, estimatedReturns],
            backgroundColor: [
              '#3b82f6', // blue-500
              '#10b981', // emerald-500
            ],
            borderColor: [
              '#1e40af', // blue-800
              '#065f46', // emerald-800
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
            position: 'top',
            labels: {
              color: 'rgba(255, 255, 255, 0.7)',
              boxWidth: 12,
              padding: 10
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.raw as number;
                const percentage = (value / futureValue * 100).toFixed(1);
                return `${context.label}: ${currencySymbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  };
  
  // Format currency
  const formatCurrency = (value: number): string => {
    const symbol = getCurrencySymbol();
    return `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 p-6">
        {/* Left Box - Inputs */}
        <div className="calculator-card-alt p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="calculator-section-header">SIP Calculator</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-300 mb-1">
                Currency
              </label>
              <select
                id="currency"
                className="calculator-input"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
              >
                {currencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="monthlyInvestment" className="block text-sm font-medium text-gray-300 mb-1">
                Monthly Investment
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{getCurrencySymbol()}</span>
                <input
                  type="tel"
                  id="monthlyInvestment"
                  className="calculator-input"
                  value={monthlyInvestment} {...numericInputProps}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="expectedReturnRate" className="block text-sm font-medium text-gray-300 mb-1">
                Expected Annual Return Rate
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="expectedReturnRate"
                  className="calculator-input"
                  value={expectedReturnRate} {...numericInputProps}
                  onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
                  step="0.1"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">%</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="investmentPeriod" className="block text-sm font-medium text-gray-300 mb-1">
                Investment Period (Years)
              </label>
              <input
                type="tel"
                id="investmentPeriod"
                className="calculator-input"
                value={investmentPeriod} {...numericInputProps}
                onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                min="1"
                max="40"
              />
            </div>
            
            <div>
              <label htmlFor="inflationRate" className="block text-sm font-medium text-gray-300 mb-1">
                Expected Inflation Rate
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="inflationRate"
                  className="calculator-input"
                  value={inflationRate} {...numericInputProps}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  step="0.1"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">%</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="stepUpRate" className="block text-sm font-medium text-gray-300 mb-1">
                Annual Step-Up Rate
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="stepUpRate"
                  className="calculator-input"
                  value={stepUpRate} {...numericInputProps}
                  onChange={(e) => setStepUpRate(Number(e.target.value))}
                  step="0.1"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Annual increase in your monthly investment amount</p>
            </div>
          </div>
        </div>
        
        {/* Right Box - Results */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="calculator-section-header">Results</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Investment</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">{formatCurrency(totalInvestment)}</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Estimated Returns</div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400">{formatCurrency(estimatedReturns)}</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Future Value</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">{formatCurrency(futureValue)}</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Inflation Adjusted Value</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-400">{formatCurrency(inflationAdjustedValue)}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Growth Chart */}
              <div>
                <div className="flex flex-wrap items-center justify-between mb-4">
                  <h3 className="calculator-section-header">Investment Growth</h3>
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    <div className="flex rounded-md overflow-hidden">
                      <button
                        className={`px-4 py-1 text-sm font-medium ${viewType === 'table' ? 'bg-gray-600 text-gray-900 dark:text-white-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-300'}`}
                        onClick={() => setViewType('table')}
                      >
                        Table
                      </button>
                      <button
                        className={`px-4 py-1 text-sm font-medium ${viewType === 'chart' ? 'bg-blue-600 text-gray-900 dark:text-white-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-300'}`}
                        onClick={() => setViewType('chart')}
                      >
                        Chart
                      </button>
                    </div>
                    
                    {viewType === 'chart' && (
                      <div className="flex rounded-md overflow-hidden">
                        <button
                          className={`px-4 py-1 text-sm font-medium ${chartType === 'line' ? 'bg-blue-600 text-gray-900 dark:text-white-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-300'}`}
                          onClick={() => setChartType('line')}
                        >
                          Line
                        </button>
                        <button
                          className={`px-4 py-1 text-sm font-medium ${chartType === 'bar' ? 'bg-blue-600 text-gray-900 dark:text-white-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-300'}`}
                          onClick={() => setChartType('bar')}
                        >
                          Bar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {viewType === 'chart' && (
                  <div className="h-64 sm:h-80">
                    <canvas ref={growthChartRef}></canvas>
                  </div>
                )}
                
                {viewType === 'table' && (
                  <div className="overflow-x-auto">
                    <table className="calculator-table">
                      <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Year
                          </th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Investment
                          </th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Interest
                          </th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Future Value
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                        {yearlyData.map((data) => (
                          <tr key={data.year} className="hover:bg-muted">
                            <td className="calculator-table-cell">
                              Year {data.year}
                            </td>
                            <td className="calculator-table-cell">
                              {formatCurrency(data.totalInvestment)}
                            </td>
                            <td className="calculator-table-cell">
                              {formatCurrency(data.futureValue - data.totalInvestment)}
                            </td>
                            <td className="calculator-table-cell">
                              {formatCurrency(data.futureValue)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              {/* Breakdown Chart */}
              <div>
                <h3 className="calculator-section-header">Investment Breakdown</h3>
                <div className="h-64">
                  <canvas ref={breakdownChartRef}></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator; 