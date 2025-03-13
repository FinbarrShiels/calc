'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart } from 'chart.js/auto';
import { numericInputProps } from '@/utils/inputUtils';


interface MortgageRefinanceCalculatorProps {
  calculator?: Calculator;
}

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

interface ComparisonRow {
  month: number;
  currentPayment: number;
  currentBalance: number;
  currentInterest: number;
  newPayment: number;
  newBalance: number;
  newInterest: number;
  monthlySavings: number;
  cumulativeSavings: number;
}

type ChartType = 'line' | 'bar';
type ViewType = 'chart' | 'table';

const MortgageRefinanceCalculator: React.FC<MortgageRefinanceCalculatorProps> = ({ calculator }) => {
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
  const [currentLoanBalance, setCurrentLoanBalance] = useState<number>(250000);
  const [currentInterestRate, setCurrentInterestRate] = useState<number>(5.5);
  const [currentLoanTerm, setCurrentLoanTerm] = useState<number>(25);
  const [newInterestRate, setNewInterestRate] = useState<number>(4.0);
  const [newLoanTerm, setNewLoanTerm] = useState<number>(30);
  const [closingCosts, setClosingCosts] = useState<number>(5000);
  
  // Result state
  const [currentMonthlyPayment, setCurrentMonthlyPayment] = useState<number>(0);
  const [newMonthlyPayment, setNewMonthlyPayment] = useState<number>(0);
  const [monthlySavings, setMonthlySavings] = useState<number>(0);
  const [totalInterestSavings, setTotalInterestSavings] = useState<number>(0);
  const [breakEvenMonths, setBreakEvenMonths] = useState<number>(0);
  const [comparisonSchedule, setComparisonSchedule] = useState<ComparisonRow[]>([]);
  
  // View state
  const [viewType, setViewType] = useState<ViewType>('chart');
  const [chartType, setChartType] = useState<ChartType>('line');
  
  // Chart ref
  const comparisonChartRef = useRef<HTMLCanvasElement>(null);
  const comparisonChartInstance = useRef<Chart | null>(null);
  
  // Get currency symbol
  const getCurrencySymbol = (): string => {
    const currency = currencyOptions.find(c => c.value === selectedCurrency);
    return currency ? currency.symbol : '$';
  };
  
  // Handle currency change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };
  
  // Calculate refinance details
  useEffect(() => {
    calculateRefinance();
  }, [currentLoanBalance, currentInterestRate, currentLoanTerm, newInterestRate, newLoanTerm, closingCosts]);
  
  // Update chart when results change or currency changes or chart type changes
  useEffect(() => {
    createComparisonChart();
    
    return () => {
      if (comparisonChartInstance.current) {
        comparisonChartInstance.current.destroy();
      }
    };
  }, [comparisonSchedule, selectedCurrency, chartType]);
  
  // Handle window resize for chart responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (comparisonChartInstance.current) {
        comparisonChartInstance.current.resize();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const calculateRefinance = () => {
    // Calculate current monthly payment
    const currentMonthlyRate = currentInterestRate / 100 / 12;
    const currentNumberOfPayments = currentLoanTerm * 12;
    
    let currentPayment = 0;
    if (currentMonthlyRate > 0) {
      currentPayment = currentLoanBalance * (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentNumberOfPayments)) / 
                      (Math.pow(1 + currentMonthlyRate, currentNumberOfPayments) - 1);
    } else {
      currentPayment = currentLoanBalance / currentNumberOfPayments;
    }
    
    // Calculate new monthly payment
    const newMonthlyRate = newInterestRate / 100 / 12;
    const newNumberOfPayments = newLoanTerm * 12;
    
    let newPayment = 0;
    if (newMonthlyRate > 0) {
      newPayment = currentLoanBalance * (newMonthlyRate * Math.pow(1 + newMonthlyRate, newNumberOfPayments)) / 
                  (Math.pow(1 + newMonthlyRate, newNumberOfPayments) - 1);
    } else {
      newPayment = currentLoanBalance / newNumberOfPayments;
    }
    
    // Calculate monthly savings
    const savings = currentPayment - newPayment;
    
    // Calculate break-even point
    const breakEven = savings > 0 ? Math.ceil(closingCosts / savings) : 0;
    
    // Generate comparison schedule
    const schedule = generateComparisonSchedule(
      currentLoanBalance, 
      currentMonthlyRate, 
      currentPayment, 
      currentNumberOfPayments,
      newMonthlyRate,
      newPayment,
      newNumberOfPayments
    );
    
    // Calculate total interest savings
    const totalCurrentInterest = schedule.reduce((total, row) => total + row.currentInterest, 0);
    const totalNewInterest = schedule.reduce((total, row) => total + row.newInterest, 0);
    const interestSavings = totalCurrentInterest - totalNewInterest - closingCosts;
    
    // Update state
    setCurrentMonthlyPayment(currentPayment);
    setNewMonthlyPayment(newPayment);
    setMonthlySavings(savings);
    setTotalInterestSavings(interestSavings);
    setBreakEvenMonths(breakEven);
    setComparisonSchedule(schedule);
  };
  
  const generateComparisonSchedule = (
    loanBalance: number,
    currentRate: number,
    currentPayment: number,
    currentTerm: number,
    newRate: number,
    newPayment: number,
    newTerm: number
  ) => {
    const schedule: ComparisonRow[] = [];
    
    let currentBalance = loanBalance;
    let newBalance = loanBalance;
    let cumulativeSavings = 0;
    
    // Use the shorter term for comparison
    const maxMonths = Math.max(currentTerm, newTerm);
    
    for (let month = 1; month <= maxMonths; month++) {
      // Calculate current loan details
      let currentInterest = 0;
      let currentPrincipal = 0;
      
      if (currentBalance > 0) {
        currentInterest = currentBalance * currentRate;
        currentPrincipal = currentPayment - currentInterest;
        
        // Adjust final payment if needed
        if (currentPrincipal > currentBalance) {
          currentPrincipal = currentBalance;
        }
        
        currentBalance -= currentPrincipal;
        
        // Ensure balance doesn't go below 0
        if (currentBalance < 0) currentBalance = 0;
      }
      
      // Calculate new loan details
      let newInterest = 0;
      let newPrincipal = 0;
      
      if (newBalance > 0) {
        newInterest = newBalance * newRate;
        newPrincipal = newPayment - newInterest;
        
        // Adjust final payment if needed
        if (newPrincipal > newBalance) {
          newPrincipal = newBalance;
        }
        
        newBalance -= newPrincipal;
        
        // Ensure balance doesn't go below 0
        if (newBalance < 0) newBalance = 0;
      }
      
      // Calculate monthly savings
      const monthlySaving = currentBalance > 0 ? currentPayment - newPayment : 0;
      cumulativeSavings += monthlySaving;
      
      // Add to schedule
      schedule.push({
        month,
        currentPayment: currentBalance > 0 ? currentPayment : 0,
        currentBalance,
        currentInterest,
        newPayment: newBalance > 0 ? newPayment : 0,
        newBalance,
        newInterest,
        monthlySavings: monthlySaving,
        cumulativeSavings
      });
      
      // Limit to 420 months (35 years) for performance
      if (month >= 420) break;
    }
    
    return schedule;
  };
  
  const createComparisonChart = () => {
    if (!comparisonChartRef.current) return;
    
    const ctx = comparisonChartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (comparisonChartInstance.current) {
      comparisonChartInstance.current.destroy();
    }
    
    // Filter data to show fewer points for better visualization
    const filterStep = Math.max(1, Math.floor(comparisonSchedule.length / 24));
    const filteredData = comparisonSchedule.filter((_, index) => index % filterStep === 0);
    
    const labels = filteredData.map(row => `Month ${row.month}`);
    const currentBalanceData = filteredData.map(row => row.currentBalance);
    const newBalanceData = filteredData.map(row => row.newBalance);
    const savingsData = filteredData.map(row => row.cumulativeSavings);
    
    const currencySymbol = getCurrencySymbol();
    
    comparisonChartInstance.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: 'Current Loan Balance',
            data: currentBalanceData,
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: '#3b82f6', // blue-500
            borderWidth: 2,
            tension: 0.1
          },
          {
            label: 'New Loan Balance',
            data: newBalanceData,
            backgroundColor: 'rgba(249, 115, 22, 0.2)',
            borderColor: '#f97316', // orange-500
            borderWidth: 2,
            tension: 0.1
          },
          {
            label: 'Cumulative Savings',
            data: savingsData,
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: '#10b981', // emerald-500
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
              color: 'rgba(255, 255, 255, 0.7)',
              maxRotation: 45,
              minRotation: 45,
              autoSkip: true,
              maxTicksLimit: 12
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
          title: {
            display: true,
            text: 'Mortgage Refinance Comparison',
            color: 'rgba(255, 255, 255, 0.9)',
            font: {
              size: 14
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
          <h2 className="calculator-section-header">Mortgage Refinance Calculator</h2>
          
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
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <h3 className="text-md font-medium text-gray-300 mb-3">Current Mortgage</h3>
              
              <div className="space-y-3">
                <div>
                  <label htmlFor="currentLoanBalance" className="block text-sm font-medium text-gray-300 mb-1">
                    Current Loan Balance
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{getCurrencySymbol()}</span>
                    <input
                      type="tel"
                      id="currentLoanBalance"
                      className="calculator-input"
                      value={currentLoanBalance} {...numericInputProps}
                      onChange={(e) => setCurrentLoanBalance(Number(e.target.value))}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="currentInterestRate" className="block text-sm font-medium text-gray-300 mb-1">
                    Current Interest Rate
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="currentInterestRate"
                      className="calculator-input"
                      value={currentInterestRate} {...numericInputProps}
                      onChange={(e) => setCurrentInterestRate(Number(e.target.value))}
                      step="0.125"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">%</span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="currentLoanTerm" className="block text-sm font-medium text-gray-300 mb-1">
                    Remaining Term (Years)
                  </label>
                  <input
                    type="tel"
                    id="currentLoanTerm"
                    className="calculator-input"
                    value={currentLoanTerm} {...numericInputProps}
                    onChange={(e) => setCurrentLoanTerm(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <h3 className="text-md font-medium text-gray-300 mb-3">New Mortgage</h3>
              
              <div className="space-y-3">
                <div>
                  <label htmlFor="newInterestRate" className="block text-sm font-medium text-gray-300 mb-1">
                    New Interest Rate
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="newInterestRate"
                      className="calculator-input"
                      value={newInterestRate} {...numericInputProps}
                      onChange={(e) => setNewInterestRate(Number(e.target.value))}
                      step="0.125"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">%</span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="newLoanTerm" className="block text-sm font-medium text-gray-300 mb-1">
                    New Loan Term (Years)
                  </label>
                  <select
                    id="newLoanTerm"
                    className="calculator-input"
                    value={newLoanTerm}
                    onChange={(e) => setNewLoanTerm(Number(e.target.value))}
                  >
                    <option value={10}>10 years</option>
                    <option value={15}>15 years</option>
                    <option value={20}>20 years</option>
                    <option value={25}>25 years</option>
                    <option value={30}>30 years</option>
                    <option value={35}>35 years</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="closingCosts" className="block text-sm font-medium text-gray-300 mb-1">
                    Closing Costs
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{getCurrencySymbol()}</span>
                    <input
                      type="tel"
                      id="closingCosts"
                      className="calculator-input"
                      value={closingCosts} {...numericInputProps}
                      onChange={(e) => setClosingCosts(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Box - Results */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="calculator-section-header">Refinance Analysis</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Current Monthly Payment</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">{formatCurrency(currentMonthlyPayment)}</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">New Monthly Payment</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-400">{formatCurrency(newMonthlyPayment)}</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Monthly Savings</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">{formatCurrency(monthlySavings)}</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Break-Even Point</div>
              <div className="text-xl sm:text-2xl font-bold text-purple-400">
                {breakEvenMonths > 0 ? `${breakEvenMonths} months` : 'N/A'}
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg sm:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Interest Savings</div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400">{formatCurrency(totalInterestSavings)}</div>
              <div className="text-xs text-gray-400 mt-1">(After closing costs)</div>
            </div>
          </div>
          
          <div>
            {/* Comparison Schedule Title and Toggle Buttons */}
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h3 className="calculator-section-header">Loan Comparison</h3>
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
            
            {/* Chart View */}
            {viewType === 'chart' && (
              <div className="h-64 sm:h-80">
                <canvas ref={comparisonChartRef}></canvas>
              </div>
            )}
            
            {/* Table View */}
            {viewType === 'table' && (
              <div className="overflow-x-auto">
                <table className="calculator-table">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Period
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Current Balance
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        New Balance
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Monthly Savings
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Cumulative Savings
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                    {/* Show yearly data */}
                    {comparisonSchedule
                      .filter(row => row.month % 12 === 0)
                      .slice(0, 15) // Limit to 15 years for performance
                      .map((row) => (
                        <tr key={row.month} className="hover:bg-muted">
                          <td className="calculator-table-cell">Year {row.month / 12}</td>
                          <td className="calculator-table-cell">{formatCurrency(row.currentBalance)}</td>
                          <td className="calculator-table-cell">{formatCurrency(row.newBalance)}</td>
                          <td className="calculator-table-cell">{formatCurrency(row.monthlySavings)}</td>
                          <td className="calculator-table-cell">{formatCurrency(row.cumulativeSavings)}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageRefinanceCalculator; 