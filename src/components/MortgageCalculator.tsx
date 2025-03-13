'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart } from 'chart.js/auto';
import { numericInputProps } from '@/utils/inputUtils';


interface MortgageCalculatorProps {
  calculator?: Calculator;
}

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  totalInterestPaid: number;
}

type ChartType = 'line' | 'bar';
type ViewType = 'chart' | 'table';

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ calculator }) => {
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
  const [homePrice, setHomePrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  
  // Result state
  const [loanAmount, setLoanAmount] = useState<number>(240000);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalLoanCost, setTotalLoanCost] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  
  // View state
  const [viewType, setViewType] = useState<ViewType>('chart');
  const [chartType, setChartType] = useState<ChartType>('line');
  
  // Chart ref
  const growthChartRef = useRef<HTMLCanvasElement>(null);
  const growthChartInstance = useRef<Chart | null>(null);
  
  // Get currency symbol
  const getCurrencySymbol = (): string => {
    const currency = currencyOptions.find(c => c.value === selectedCurrency);
    return currency ? currency.symbol : '$';
  };
  
  // Handle currency change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };
  
  // Calculate mortgage details
  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, interestRate, loanTerm]);
  
  // Update chart when results change or currency changes or chart type changes
  useEffect(() => {
    createGrowthChart();
    
    return () => {
      if (growthChartInstance.current) {
        growthChartInstance.current.destroy();
      }
    };
  }, [loanAmount, totalLoanCost, totalInterest, selectedCurrency, chartType]);
  
  // Handle window resize for chart responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (growthChartInstance.current) {
        growthChartInstance.current.resize();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const calculateMortgage = () => {
    // Calculate principal (loan amount minus down payment)
    const principal = homePrice - downPayment;
    setLoanAmount(principal);
    
    // Calculate monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    
    // Calculate number of payments
    const numberOfPayments = loanTerm * 12;
    
    // Calculate monthly payment
    let monthlyPaymentValue = 0;
    if (monthlyRate > 0) {
      monthlyPaymentValue = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
      monthlyPaymentValue = principal / numberOfPayments;
    }
    
    // Calculate total payment and interest
    const totalPaymentValue = monthlyPaymentValue * numberOfPayments;
    const totalInterestValue = totalPaymentValue - principal;
    
    // Update state
    setMonthlyPayment(monthlyPaymentValue);
    setTotalLoanCost(totalPaymentValue);
    setTotalInterest(totalInterestValue);
    
    // Generate amortization schedule
    generateAmortizationSchedule(principal, monthlyRate, monthlyPaymentValue, numberOfPayments);
  };
  
  const generateAmortizationSchedule = (
    principal: number, 
    monthlyRate: number, 
    monthlyPaymentValue: number, 
    numberOfPayments: number
  ) => {
    let balance = principal;
    let totalInterestPaid = 0;
    const schedule: AmortizationRow[] = [];
    
    for (let month = 1; month <= numberOfPayments; month++) {
      if (balance <= 0) break;
      
      const interestPayment = balance * monthlyRate;
      let principalPayment = monthlyPaymentValue - interestPayment;
      
      // Adjust final payment if needed
      if (principalPayment > balance) {
        principalPayment = balance;
      }
      
      balance -= principalPayment;
      totalInterestPaid += interestPayment;
      
      // Ensure balance doesn't go below 0
      if (balance < 0) balance = 0;
      
      schedule.push({
        month,
        payment: monthlyPaymentValue,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: balance,
        totalInterestPaid
      });
      
      // Limit to 420 months (35 years) for performance
      if (month >= 420) break;
    }
    
    setAmortizationSchedule(schedule);
  };
  
  const createGrowthChart = () => {
    if (!growthChartRef.current) return;
    
    const ctx = growthChartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (growthChartInstance.current) {
      growthChartInstance.current.destroy();
    }
    
    // Use monthly data for more detailed chart
    const labels = amortizationSchedule.map(row => `Month ${row.month}`);
    
    // Filter data to show fewer points for better visualization
    // For loans > 10 years, show every 6 months
    const filterStep = loanTerm > 10 ? 6 : 3;
    const filteredData = amortizationSchedule.filter((_, index) => index % filterStep === 0);
    const filteredLabels = filteredData.map(row => `Month ${row.month}`);
    
    const balanceData = filteredData.map(row => row.remainingBalance);
    const interestData = filteredData.map(row => row.totalInterestPaid);
    
    const currencySymbol = getCurrencySymbol();
    
    growthChartInstance.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels: filteredLabels,
        datasets: [
          {
            label: 'Remaining Balance',
            data: balanceData,
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: '#3b82f6', // blue-500
            borderWidth: 2,
            tension: 0.1
          },
          {
            label: 'Total Interest Paid',
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
            text: 'Mortgage Repayment Schedule',
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
          <h2 className="calculator-section-header">Mortgage Calculator</h2>
          
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
              <label htmlFor="homePrice" className="block text-sm font-medium text-gray-300 mb-1">
                Home Price
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{getCurrencySymbol()}</span>
                <input
                  type="tel"
                  id="homePrice"
                  className="calculator-input"
                  value={homePrice} {...numericInputProps}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="downPayment" className="block text-sm font-medium text-gray-300 mb-1">
                Down Payment
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{getCurrencySymbol()}</span>
                <input
                  type="tel"
                  id="downPayment"
                  className="calculator-input"
                  value={downPayment} {...numericInputProps}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="interestRate" className="block text-sm font-medium text-gray-300 mb-1">
                Annual Interest Rate (APR)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="interestRate"
                  className="calculator-input"
                  value={interestRate} {...numericInputProps}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">%</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-300 mb-1">
                Loan Term (Years)
              </label>
              <select
                id="loanTerm"
                className="calculator-input"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
              >
                <option value={10}>10 years</option>
                <option value={15}>15 years</option>
                <option value={20}>20 years</option>
                <option value={25}>25 years</option>
                <option value={30}>30 years</option>
                <option value={35}>35 years</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Right Box - Results */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="calculator-section-header">Results</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Loan Cost</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">{formatCurrency(totalLoanCost)}</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Interest</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">{formatCurrency(totalInterest)}</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Loan Amount</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-400">{formatCurrency(loanAmount)}</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Monthly Payment</div>
              <div className="text-xl sm:text-2xl font-bold text-purple-400">{formatCurrency(monthlyPayment)}</div>
            </div>
          </div>
          
          <div>
            {/* Repayment Schedule Title and Toggle Buttons */}
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h3 className="calculator-section-header">Repayment Schedule</h3>
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
                <canvas ref={growthChartRef}></canvas>
              </div>
            )}
            
            {/* Table View */}
            {viewType === 'table' && (
              <div className="overflow-x-auto">
                <table className="calculator-table">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Month
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Payment
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Principal
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Interest
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Remaining Balance
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Total Interest Paid
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                    {/* Show first 12 months, then yearly intervals */}
                    {amortizationSchedule.slice(0, 12).map((row) => (
                      <tr key={row.month} className="hover:bg-muted">
                        <td className="calculator-table-cell">{row.month}</td>
                        <td className="calculator-table-cell">{formatCurrency(row.payment)}</td>
                        <td className="calculator-table-cell">{formatCurrency(row.principal)}</td>
                        <td className="calculator-table-cell">{formatCurrency(row.interest)}</td>
                        <td className="calculator-table-cell">{formatCurrency(row.remainingBalance)}</td>
                        <td className="calculator-table-cell">{formatCurrency(row.totalInterestPaid)}</td>
                      </tr>
                    ))}
                    {/* Show yearly data after first year */}
                    {amortizationSchedule
                      .filter((row) => row.month > 12 && row.month % 12 === 0)
                      .slice(0, 10) // Limit to 10 years for performance
                      .map((row) => (
                        <tr key={row.month} className="hover:bg-muted bg-gray-750">
                          <td className="calculator-table-cell">Year {row.month / 12}</td>
                          <td className="calculator-table-cell">{formatCurrency(row.payment)}</td>
                          <td className="calculator-table-cell">{formatCurrency(row.principal)}</td>
                          <td className="calculator-table-cell">{formatCurrency(row.interest)}</td>
                          <td className="calculator-table-cell">{formatCurrency(row.remainingBalance)}</td>
                          <td className="calculator-table-cell">{formatCurrency(row.totalInterestPaid)}</td>
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

export default MortgageCalculator; 