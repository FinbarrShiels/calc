'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart } from 'chart.js/auto';
import { numericInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

interface SavingsGoalsCalculatorProps {
  calculator?: Calculator;
}

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

interface YearlyData {
  year: number;
  contribution: number;
  interest: number;
  balance: number;
  totalContributions: number;
  totalInterest: number;
}

type CompoundingFrequency = 'monthly' | 'quarterly' | 'annually';
type CalculationType = 'timeToReachGoal' | 'contributionToReachGoal';
type ChartType = 'line' | 'bar';
type ViewType = 'chart' | 'table';

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
  const [currentSavings, setCurrentSavings] = useState<number>(5000);
  const [savingsGoal, setSavingsGoal] = useState<number>(25000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(3);
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>('monthly');
  const [calculationType, setCalculationType] = useState<CalculationType>('timeToReachGoal');
  const [targetDate, setTargetDate] = useState<number>(5);
  
  // Result state
  const [timeToReachGoal, setTimeToReachGoal] = useState<number>(0);
  const [requiredContribution, setRequiredContribution] = useState<number>(0);
  const [finalBalance, setFinalBalance] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);
  
  // View state
  const [viewType, setViewType] = useState<ViewType>('chart');
  const [chartType, setChartType] = useState<ChartType>('line');
  
  // Chart refs
  const growthChartRef = useRef<HTMLCanvasElement>(null);
  const growthChartInstance = useRef<Chart | null>(null);
  const breakdownChartRef = useRef<HTMLCanvasElement>(null);
  const breakdownChartInstance = useRef<Chart | null>(null);
  
  // Calculate savings goals
  useEffect(() => {
    calculateSavingsGoal();
  }, [
    currentSavings,
    savingsGoal,
    monthlyContribution,
    annualInterestRate,
    compoundingFrequency,
    calculationType,
    targetDate
  ]);
  
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
        breakdownChartInstance.current.resize();
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
  
  // Handle compounding frequency change
  const handleCompoundingFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCompoundingFrequency(e.target.value as CompoundingFrequency);
  };
  
  // Handle calculation type change
  const handleCalculationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCalculationType(e.target.value as CalculationType);
  };
  
  // Calculate savings goal
  const calculateSavingsGoal = () => {
    // Get compounding periods per year
    let periodsPerYear = 12; // monthly
    if (compoundingFrequency === 'quarterly') periodsPerYear = 4;
    if (compoundingFrequency === 'annually') periodsPerYear = 1;
    
    // Calculate periodic interest rate
    const periodicRate = annualInterestRate / 100 / periodsPerYear;
    
    // Calculate based on calculation type
    if (calculationType === 'timeToReachGoal') {
      // Calculate time to reach goal
      let balance = currentSavings;
      let years = 0;
      let months = 0;
      let totalContrib = 0;
      let totalInt = 0;
      const yearlyDataArray: YearlyData[] = [];
      let yearlyContribution = 0;
      let yearlyInterest = 0;
      
      while (balance < savingsGoal && months < 600) { // Cap at 50 years
        months++;
        
        // Add monthly contribution
        balance += monthlyContribution;
        totalContrib += monthlyContribution;
        yearlyContribution += monthlyContribution;
        
        // Add interest (only on compounding periods)
        if (months % (12 / periodsPerYear) === 0) {
          const interest = balance * periodicRate;
          balance += interest;
          totalInt += interest;
          yearlyInterest += interest;
        }
        
        // Record yearly data
        if (months % 12 === 0) {
          years++;
          yearlyDataArray.push({
            year: years,
            contribution: yearlyContribution,
            interest: yearlyInterest,
            balance: balance,
            totalContributions: totalContrib,
            totalInterest: totalInt
          });
          yearlyContribution = 0;
          yearlyInterest = 0;
        }
      }
      
      // Update state
      setTimeToReachGoal(months / 12);
      setFinalBalance(balance);
      setTotalContributions(totalContrib);
      setTotalInterest(totalInt);
      setYearlyData(yearlyDataArray);
      
    } else {
      // Calculate required contribution to reach goal in target date
      const totalMonths = targetDate * 12;
      
      // Use financial formula to solve for PMT (payment)
      // FV = P(1+r)^n + PMT*((1+r)^n - 1)/r
      // Solve for PMT: PMT = (FV - P(1+r)^n) * r / ((1+r)^n - 1)
      
      // For simplicity, we'll use an iterative approach
      let estimatedContribution = (savingsGoal - currentSavings) / totalMonths;
      let balance = currentSavings;
      let totalContrib = 0;
      let totalInt = 0;
      const yearlyDataArray: YearlyData[] = [];
      let yearlyContribution = 0;
      let yearlyInterest = 0;
      
      // Adjust contribution until we get close to the goal
      for (let i = 0; i < 10; i++) { // Max 10 iterations for refinement
        balance = currentSavings;
        totalContrib = 0;
        totalInt = 0;
        yearlyDataArray.length = 0;
        yearlyContribution = 0;
        yearlyInterest = 0;
        
        for (let month = 1; month <= totalMonths; month++) {
          // Add monthly contribution
          balance += estimatedContribution;
          totalContrib += estimatedContribution;
          yearlyContribution += estimatedContribution;
          
          // Add interest (only on compounding periods)
          if (month % (12 / periodsPerYear) === 0) {
            const interest = balance * periodicRate;
            balance += interest;
            totalInt += interest;
            yearlyInterest += interest;
          }
          
          // Record yearly data
          if (month % 12 === 0) {
            const year = month / 12;
            yearlyDataArray.push({
              year: year,
              contribution: yearlyContribution,
              interest: yearlyInterest,
              balance: balance,
              totalContributions: totalContrib,
              totalInterest: totalInt
            });
            yearlyContribution = 0;
            yearlyInterest = 0;
          }
        }
        
        // Adjust contribution based on final balance
        const diff = savingsGoal - balance;
        if (Math.abs(diff) < 10) break; // Close enough
        
        estimatedContribution += diff / totalMonths;
      }
      
      // Update state
      setRequiredContribution(estimatedContribution);
      setFinalBalance(balance);
      setTotalContributions(totalContrib);
      setTotalInterest(totalInt);
      setYearlyData(yearlyDataArray);
    }
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
    const balanceData = yearlyData.map(data => data.balance);
    const contributionsData = yearlyData.map(data => data.totalContributions);
    const interestData = yearlyData.map(data => data.totalInterest);
    
    const currencySymbol = getCurrencySymbol();
    
    growthChartInstance.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: 'Balance',
            data: balanceData,
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: '#3b82f6', // blue-500
            borderWidth: 2,
            tension: 0.1
          },
          {
            label: 'Contributions',
            data: contributionsData,
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: '#10b981', // emerald-500
            borderWidth: 2,
            tension: 0.1
          },
          {
            label: 'Interest',
            data: interestData,
            backgroundColor: 'rgba(249, 115, 22, 0.2)',
            borderColor: '#f97316', // orange-500
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
    
    // Get final values
    const finalData = yearlyData[yearlyData.length - 1];
    
    breakdownChartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Contributions', 'Interest'],
        datasets: [
          {
            data: [finalData.totalContributions, finalData.totalInterest],
            backgroundColor: [
              '#10b981', // emerald-500
              '#f97316', // orange-500
            ],
            borderColor: [
              '#065f46', // emerald-800
              '#9a3412', // orange-800
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
                const percentage = (value / finalData.balance * 100).toFixed(1);
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
          <h2 className={calculatorSectionHeaderClasses}>Savings Goals Calculator</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-300 mb-1">
                Currency
              </label>
              <select
                id="currency"
                className={inputClasses}
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
              <label htmlFor="calculationType" className="block text-sm font-medium text-gray-300 mb-1">
                Calculation Type
              </label>
              <select
                id="calculationType"
                className={inputClasses}
                value={calculationType}
                onChange={handleCalculationTypeChange}
              >
                <option value="timeToReachGoal">Time to Reach Goal</option>
                <option value="contributionToReachGoal">Contribution to Reach Goal</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="currentSavings" className="block text-sm font-medium text-gray-300 mb-1">
                Current Savings
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{getCurrencySymbol()}</span>
                <input
                  type="tel"
                  id="currentSavings"
                  className={inputClasses}
                  value={currentSavings} {...numericInputProps}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="savingsGoal" className="block text-sm font-medium text-gray-300 mb-1">
                Savings Goal
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{getCurrencySymbol()}</span>
                <input
                  type="tel"
                  id="savingsGoal"
                  className={inputClasses}
                  value={savingsGoal} {...numericInputProps}
                  onChange={(e) => setSavingsGoal(Number(e.target.value))}
                />
              </div>
            </div>
            
            {calculationType === 'timeToReachGoal' ? (
              <div>
                <label htmlFor="monthlyContribution" className="block text-sm font-medium text-gray-300 mb-1">
                  Monthly Contribution
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{getCurrencySymbol()}</span>
                  <input
                    type="tel"
                    id="monthlyContribution"
                    className={inputClasses}
                    value={monthlyContribution} {...numericInputProps}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="targetDate" className="block text-sm font-medium text-gray-300 mb-1">
                  Target Date (Years)
                </label>
                <input
                  type="tel"
                  id="targetDate"
                  className={inputClasses}
                  value={targetDate} {...numericInputProps}
                  onChange={(e) => setTargetDate(Number(e.target.value))}
                  min="1"
                  max="50"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="annualInterestRate" className="block text-sm font-medium text-gray-300 mb-1">
                Annual Interest Rate
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="annualInterestRate"
                  className={inputClasses}
                  value={annualInterestRate} {...numericInputProps}
                  onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
                  step="0.1"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">%</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="compoundingFrequency" className="block text-sm font-medium text-gray-300 mb-1">
                Compounding Frequency
              </label>
              <select
                id="compoundingFrequency"
                className={inputClasses}
                value={compoundingFrequency}
                onChange={handleCompoundingFrequencyChange}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Right Box - Results */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className={calculatorSectionHeaderClasses}>Results</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
            {calculationType === 'timeToReachGoal' ? (
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className={resultLabelClasses}>Time to Reach Goal</div>
                <div className="text-xl sm:text-2xl font-bold text-blue-400">
                  {timeToReachGoal.toFixed(1)} years
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {Math.floor(timeToReachGoal)} years, {Math.round((timeToReachGoal % 1) * 12)} months
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className={resultLabelClasses}>Required Monthly Contribution</div>
                <div className="text-xl sm:text-2xl font-bold text-blue-400">
                  {formatCurrency(requiredContribution)}
                </div>
              </div>
            )}
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Final Balance</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">{formatCurrency(finalBalance)}</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Total Contributions</div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400">{formatCurrency(totalContributions)}</div>
              <div className="text-xs text-gray-400 mt-1">
                {((totalContributions / finalBalance) * 100).toFixed(1)}% of final balance
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Total Interest</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-400">{formatCurrency(totalInterest)}</div>
              <div className="text-xs text-gray-400 mt-1">
                {((totalInterest / finalBalance) * 100).toFixed(1)}% of final balance
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Growth Chart */}
              <div>
                <div className="flex flex-wrap items-center justify-between mb-4">
                  <h3 className={calculatorSectionHeaderClasses}>Savings Growth</h3>
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
                            Contribution
                          </th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Interest
                          </th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Balance
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
                )}
              </div>
            </div>
            
            <div>
              {/* Breakdown Chart */}
              <div>
                <h3 className={calculatorSectionHeaderClasses}>Final Balance Breakdown</h3>
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

export default SavingsGoalsCalculator; 