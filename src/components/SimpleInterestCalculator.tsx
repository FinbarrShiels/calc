'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart } from 'chart.js/auto';
import { numericInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

interface SimpleInterestCalculatorProps {
  calculator?: Calculator;
}

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

interface YearlyData {
  year: number;
  principal: number;
  interest: number;
  totalAmount: number;
}

type CalculationType = 'interest' | 'principal' | 'rate' | 'time';

const SimpleInterestCalculator: React.FC<SimpleInterestCalculatorProps> = ({ calculator }) => {
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
  const [principal, setPrincipal] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [timePeriod, setTimePeriod] = useState<number>(3);
  const [calculationType, setCalculationType] = useState<CalculationType>('interest');
  
  // Result state
  const [simpleInterest, setSimpleInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);
  
  // Chart ref
  const growthChartRef = useRef<HTMLCanvasElement>(null);
  const growthChartInstance = useRef<Chart | null>(null);
  
  // Calculate simple interest
  useEffect(() => {
    calculateSimpleInterest();
  }, [principal, interestRate, timePeriod, calculationType]);
  
  // Update chart when data changes
  useEffect(() => {
    if (yearlyData.length > 0) {
      createGrowthChart();
    }
    
    return () => {
      if (growthChartInstance.current) {
        growthChartInstance.current.destroy();
      }
    };
  }, [yearlyData, selectedCurrency]);
  
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
  
  // Get currency symbol
  const getCurrencySymbol = (): string => {
    const currency = currencyOptions.find(c => c.value === selectedCurrency);
    return currency ? currency.symbol : '$';
  };
  
  // Handle currency change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };
  
  // Handle calculation type change
  const handleCalculationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCalculationType(e.target.value as CalculationType);
  };
  
  // Calculate simple interest
  const calculateSimpleInterest = () => {
    let interest = 0;
    let amount = 0;
    let calculatedPrincipal = principal;
    let calculatedRate = interestRate;
    let calculatedTime = timePeriod;
    const data: YearlyData[] = [];
    
    switch (calculationType) {
      case 'interest':
        // Calculate interest
        interest = (principal * interestRate * timePeriod) / 100;
        amount = principal + interest;
        
        // Generate yearly data
        for (let year = 0; year <= timePeriod; year++) {
          const yearlyInterest = (principal * interestRate * year) / 100;
          data.push({
            year,
            principal,
            interest: yearlyInterest,
            totalAmount: principal + yearlyInterest
          });
        }
        break;
        
      case 'principal':
        // Calculate principal (P = I / (R * T))
        if (interestRate > 0 && timePeriod > 0) {
          calculatedPrincipal = (simpleInterest * 100) / (interestRate * timePeriod);
          amount = calculatedPrincipal + simpleInterest;
          
          // Generate yearly data
          for (let year = 0; year <= timePeriod; year++) {
            const yearlyInterest = (calculatedPrincipal * interestRate * year) / 100;
            data.push({
              year,
              principal: calculatedPrincipal,
              interest: yearlyInterest,
              totalAmount: calculatedPrincipal + yearlyInterest
            });
          }
        }
        break;
        
      case 'rate':
        // Calculate rate (R = (I * 100) / (P * T))
        if (principal > 0 && timePeriod > 0) {
          calculatedRate = (simpleInterest * 100) / (principal * timePeriod);
          amount = principal + simpleInterest;
          
          // Generate yearly data
          for (let year = 0; year <= timePeriod; year++) {
            const yearlyInterest = (principal * calculatedRate * year) / 100;
            data.push({
              year,
              principal,
              interest: yearlyInterest,
              totalAmount: principal + yearlyInterest
            });
          }
        }
        break;
        
      case 'time':
        // Calculate time (T = (I * 100) / (P * R))
        if (principal > 0 && interestRate > 0) {
          calculatedTime = (simpleInterest * 100) / (principal * interestRate);
          amount = principal + simpleInterest;
          
          // Generate yearly data
          for (let year = 0; year <= Math.ceil(calculatedTime); year++) {
            const yearlyInterest = (principal * interestRate * Math.min(year, calculatedTime)) / 100;
            data.push({
              year,
              principal,
              interest: yearlyInterest,
              totalAmount: principal + yearlyInterest
            });
          }
        }
        break;
    }
    
    // Update state
    setSimpleInterest(interest);
    setTotalAmount(amount);
    setYearlyData(data);
    
    // Update input state for calculated values
    if (calculationType === 'principal') {
      setPrincipal(calculatedPrincipal);
    } else if (calculationType === 'rate') {
      setInterestRate(calculatedRate);
    } else if (calculationType === 'time') {
      setTimePeriod(calculatedTime);
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
    const principalData = yearlyData.map(data => data.principal);
    const interestData = yearlyData.map(data => data.interest);
    const totalData = yearlyData.map(data => data.totalAmount);
    
    const currencySymbol = getCurrencySymbol();
    
    growthChartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Principal',
            data: principalData,
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: '#3b82f6', // blue-500
            borderWidth: 1
          },
          {
            label: 'Interest',
            data: interestData,
            backgroundColor: 'rgba(249, 115, 22, 0.5)',
            borderColor: '#f97316', // orange-500
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          },
          y: {
            stacked: true,
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
              },
              footer: function(tooltipItems) {
                const total = tooltipItems.reduce((sum, item) => sum + (item.raw as number), 0);
                return `Total: ${currencySymbol}${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
          <h2 className={calculatorSectionHeaderClasses}>Simple Interest Calculator</h2>
          
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
                <option value="interest">Calculate Interest</option>
                <option value="principal">Calculate Principal</option>
                <option value="rate">Calculate Rate</option>
                <option value="time">Calculate Time</option>
              </select>
            </div>
            
            {calculationType !== 'principal' && (
              <div>
                <label htmlFor="principal" className="block text-sm font-medium text-gray-300 mb-1">
                  Principal Amount
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{getCurrencySymbol()}</span>
                  <input
                    type="tel"
                    id="principal"
                    className={inputClasses}
                    value={principal} {...numericInputProps}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                  />
                </div>
              </div>
            )}
            
            {calculationType !== 'rate' && (
              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-300 mb-1">
                  Annual Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="interestRate"
                    className={inputClasses}
                    value={interestRate} {...numericInputProps}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    step="0.1"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">%</span>
                </div>
              </div>
            )}
            
            {calculationType !== 'time' && (
              <div>
                <label htmlFor="timePeriod" className="block text-sm font-medium text-gray-300 mb-1">
                  Time Period (Years)
                </label>
                <input
                  type="tel"
                  id="timePeriod"
                  className={inputClasses}
                  value={timePeriod} {...numericInputProps}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  step="0.1"
                />
              </div>
            )}
            
            {calculationType !== 'interest' && (
              <div>
                <label htmlFor="simpleInterest" className="block text-sm font-medium text-gray-300 mb-1">
                  Simple Interest
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{getCurrencySymbol()}</span>
                  <input
                    type="tel"
                    id="simpleInterest"
                    className={inputClasses}
                    value={simpleInterest} {...numericInputProps}
                    onChange={(e) => setSimpleInterest(Number(e.target.value))}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Box - Results */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className={calculatorSectionHeaderClasses}>Results</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Principal Amount</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">{formatCurrency(principal)}</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Simple Interest</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-400">{formatCurrency(simpleInterest)}</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Total Amount</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">{formatCurrency(totalAmount)}</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>
                {calculationType === 'rate' ? 'Interest Rate' : 
                 calculationType === 'time' ? 'Time Period' : 
                 'Interest Rate × Time'}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-purple-400">
                {calculationType === 'rate' ? `${interestRate.toFixed(2)}%` : 
                 calculationType === 'time' ? `${timePeriod.toFixed(2)} years` : 
                 `${interestRate}% × ${timePeriod} years`}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className={calculatorSectionHeaderClasses}>Growth Over Time</h3>
            <div className="h-64 sm:h-80">
              <canvas ref={growthChartRef}></canvas>
            </div>
            
            <div className="mt-6">
              <h3 className={calculatorSectionHeaderClasses}>Simple Interest Formula</h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-white dark:text-gray-900 text-center text-lg">
                  {calculationType === 'interest' ? 'I = P × R × T' : 
                   calculationType === 'principal' ? 'P = I ÷ (R × T)' : 
                   calculationType === 'rate' ? 'R = I ÷ (P × T)' : 
                   'T = I ÷ (P × R)'}
                </p>
                <p className="text-gray-400 text-center text-sm mt-2">
                  Where: I = Interest, P = Principal, R = Rate (%), T = Time (years)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleInterestCalculator; 