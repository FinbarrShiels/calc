'use client';

import React, { useState, useEffect } from 'react';
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

interface CarLoanCalculatorProps {
  calculator?: Calculator;
}

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

interface MonthlyPaymentData {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface YearlyPaymentData {
  year: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

type ViewType = 'chart' | 'table';
type ChartType = 'line' | 'bar';

const CarLoanCalculator: React.FC<CarLoanCalculatorProps> = ({ calculator }) => {
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
  const [carPrice, setCarPrice] = useState<number>(30000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [tradeInValue, setTradeInValue] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(6);
  
  // State for results
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [monthlyPaymentData, setMonthlyPaymentData] = useState<MonthlyPaymentData[]>([]);
  const [yearlyPaymentData, setYearlyPaymentData] = useState<YearlyPaymentData[]>([]);
  
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
  
  // Calculate loan details
  const calculateLoan = () => {
    // Calculate sales tax
    const salesTax = (carPrice * salesTaxRate) / 100;
    
    // Calculate loan amount
    const calculatedLoanAmount = carPrice + salesTax - downPayment - tradeInValue;
    
    // Calculate monthly payment
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    let calculatedMonthlyPayment = 0;
    
    if (monthlyInterestRate === 0) {
      calculatedMonthlyPayment = calculatedLoanAmount / numberOfPayments;
      } else {
      calculatedMonthlyPayment = calculatedLoanAmount * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    }
    
    // Calculate total interest
    const totalPayments = calculatedMonthlyPayment * numberOfPayments;
    const calculatedTotalInterest = totalPayments - calculatedLoanAmount;
    
    // Calculate total cost
    const calculatedTotalCost = downPayment + tradeInValue + totalPayments;
    
    // Update state with calculated values
    setLoanAmount(calculatedLoanAmount);
    setMonthlyPayment(calculatedMonthlyPayment);
    setTotalInterest(calculatedTotalInterest);
    setTotalCost(calculatedTotalCost);
    
    // Generate amortization schedule
    generateAmortizationSchedule(calculatedLoanAmount, monthlyInterestRate, numberOfPayments, calculatedMonthlyPayment);
  };
  
  // Generate amortization schedule
  const generateAmortizationSchedule = (
    loanAmount: number, 
    monthlyInterestRate: number, 
    numberOfPayments: number,
    monthlyPayment: number
  ) => {
    let balance = loanAmount;
    const monthlyData: MonthlyPaymentData[] = [];
    const yearlyData: YearlyPaymentData[] = [];
    
    let yearlyPayment = 0;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    
    // Calculate monthly data
    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      
      balance -= principalPayment;
      
      // Ensure balance doesn't go below zero due to rounding errors
      if (balance < 0) balance = 0;
      
      // Add to monthly data
      monthlyData.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance
      });
      
      // Accumulate yearly totals
      yearlyPayment += monthlyPayment;
      yearlyPrincipal += principalPayment;
      yearlyInterest += interestPayment;
      
      // If end of year or last payment, add to yearly data
      if (month % 12 === 0 || month === numberOfPayments) {
        const year = Math.ceil(month / 12);
        yearlyData.push({
          year,
          payment: yearlyPayment,
          principal: yearlyPrincipal,
          interest: yearlyInterest,
          balance
        });
        
        // Reset yearly accumulators
        yearlyPayment = 0;
        yearlyPrincipal = 0;
        yearlyInterest = 0;
      }
    }
    
    setMonthlyPaymentData(monthlyData);
    setYearlyPaymentData(yearlyData);
  };
  
  // Calculate when inputs change
  useEffect(() => {
    calculateLoan();
  }, [carPrice, downPayment, tradeInValue, loanTerm, interestRate, salesTaxRate]);

  // Format currency
  const formatCurrency = (value: number): string => {
    return getCurrencySymbol() + value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  
  // Format percentage
  const formatPercentage = (value: number): string => {
    return value.toFixed(2) + '%';
  };
  
  // Chart data for payment breakdown
  const paymentChartData = {
    labels: yearlyPaymentData.map(data => `Year ${data.year}`),
    datasets: [
      {
        label: 'Principal',
        data: yearlyPaymentData.map(data => data.principal),
        backgroundColor: 'rgba(59, 130, 246, 0.5)', // blue-500 with opacity
        borderColor: '#3b82f6', // blue-500
        borderWidth: 1,
        stack: 'Stack 0'
      },
      {
        label: 'Interest',
        data: yearlyPaymentData.map(data => data.interest),
        backgroundColor: 'rgba(239, 68, 68, 0.5)', // red-500 with opacity
        borderColor: '#ef4444', // red-500
        borderWidth: 1,
        stack: 'Stack 0'
      }
    ]
  };
  
  // Chart data for balance
  const balanceChartData = {
    labels: yearlyPaymentData.map(data => `Year ${data.year}`),
    datasets: [
      {
        label: 'Remaining Balance',
        data: yearlyPaymentData.map(data => data.balance),
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
          <h2 className="text-xl font-bold text-white mb-4">Car Loan Calculator</h2>
          
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
              <label htmlFor="carPrice" className="block text-sm font-medium text-gray-300 mb-1">
                Car Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{getCurrencySymbol()}</span>
                </div>
                <input
                  id="carPrice"
                  type="tel"
                  value={carPrice} {...numericInputProps}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  min="0"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
          </div>
        </div>
          
            <div>
              <label htmlFor="downPayment" className="block text-sm font-medium text-gray-300 mb-1">
                Down Payment
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{getCurrencySymbol()}</span>
                </div>
            <input
                  id="downPayment"
              type="tel"
                  value={downPayment} {...numericInputProps}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  min="0"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
            <div>
              <label htmlFor="tradeInValue" className="block text-sm font-medium text-gray-300 mb-1">
                Trade-In Value
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{getCurrencySymbol()}</span>
                </div>
            <input
                  id="tradeInValue"
              type="tel"
                  value={tradeInValue} {...numericInputProps}
                  onChange={(e) => setTradeInValue(Number(e.target.value))}
                  min="0"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
          </div>
        </div>
        
            <div>
              <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-300 mb-1">
                Loan Term (years)
              </label>
              <input
                id="loanTerm"
                type="tel"
                value={loanTerm} {...numericInputProps}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                min="1"
                max="10"
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
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
        
            <div>
              <label htmlFor="salesTaxRate" className="block text-sm font-medium text-gray-300 mb-1">
                Sales Tax Rate (%)
              </label>
              <div className="relative">
          <input
                  id="salesTaxRate"
                  type="tel"
                  value={salesTaxRate} {...numericInputProps}
                  onChange={(e) => setSalesTaxRate(Number(e.target.value))}
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
          </div>
          
          <div className="mt-6 bg-gray-800 p-4 rounded-md border border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-blue-400">Loan Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Loan Amount</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(loanAmount)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Monthly Payment</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(monthlyPayment)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Interest</p>
                <p className="text-xl font-semibold text-red-400">{formatCurrency(totalInterest)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Cost</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(totalCost)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Loan Breakdown</h2>
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
                  <h3 className="text-lg font-medium text-blue-400">Payment Breakdown</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setChartType('bar')}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        chartType === 'bar' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Payments
                    </button>
                    <button
                      onClick={() => setChartType('line')}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        chartType === 'line' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Balance
                    </button>
                  </div>
                </div>
                <div className="h-80 w-full">
                  {chartType === 'bar' ? (
                    <Bar data={paymentChartData} options={stackedChartOptions} />
                  ) : (
                    <Line data={balanceChartData} options={chartOptions} />
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Loan Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Car Price:</span>
                      <span className="text-white">{formatCurrency(carPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Sales Tax ({formatPercentage(salesTaxRate)}):</span>
                      <span className="text-white">{formatCurrency((carPrice * salesTaxRate) / 100)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Down Payment:</span>
                      <span className="text-white">{formatCurrency(downPayment)}</span>
          </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Trade-In Value:</span>
                      <span className="text-white">{formatCurrency(tradeInValue)}</span>
          </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Loan Amount:</span>
                      <span className="text-white">{formatCurrency(loanAmount)}</span>
          </div>
          </div>
        </div>
        
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Payment Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monthly Payment:</span>
                      <span className="text-white">{formatCurrency(monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total Payments:</span>
                      <span className="text-white">{formatCurrency(monthlyPayment * loanTerm * 12)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total Interest:</span>
                      <span className="text-red-400">{formatCurrency(totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Loan Term:</span>
                      <span className="text-white">{loanTerm} years</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {viewType === 'table' && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 overflow-x-auto">
              <h3 className="text-lg font-medium text-blue-400 mb-4">Yearly Amortization Schedule</h3>
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Year</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Payment</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Principal</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Interest</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {yearlyPaymentData.map((data, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{data.year}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{formatCurrency(data.payment)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-400">{formatCurrency(data.principal)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-red-400">{formatCurrency(data.interest)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{formatCurrency(data.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="mt-4 bg-gray-900 p-3 rounded-lg border border-gray-700">
                <h4 className="text-md font-medium text-blue-400 mb-1">Car Loan Tips</h4>
                <p className="text-sm text-gray-300">
                  Consider making a larger down payment to reduce your monthly payments and total interest. 
                  Shop around for the best interest rates, and remember that shorter loan terms typically have lower interest rates but higher monthly payments.
                </p>
              </div>
            </div>
          )}
          </div>
      </div>
    </div>
  );
};

export default CarLoanCalculator; 