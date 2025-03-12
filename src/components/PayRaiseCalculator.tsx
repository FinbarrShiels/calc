'use client';

import { useState, useEffect } from 'react';
import { decimalInputProps } from '@/utils/inputUtils';

// Currency options
interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export default function PayRaiseCalculator() {
  // Input state
  const [currentSalary, setCurrentSalary] = useState<string>('50000');
  const [raiseType, setRaiseType] = useState<'percentage' | 'amount'>('percentage');
  const [raisePercentage, setRaisePercentage] = useState<string>('5');
  const [raiseAmount, setRaiseAmount] = useState<string>('2500');
  const [payPeriod, setPayPeriod] = useState<'yearly' | 'monthly' | 'biweekly' | 'weekly' | 'hourly'>('yearly');
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('40');
  const [currency, setCurrency] = useState<string>('USD');
  
  // Results state
  const [newSalary, setNewSalary] = useState<number>(0);
  const [raiseTotal, setRaiseTotal] = useState<number>(0);
  const [newYearlySalary, setNewYearlySalary] = useState<number>(0);
  const [newMonthlySalary, setNewMonthlySalary] = useState<number>(0);
  const [newBiweeklySalary, setNewBiweeklySalary] = useState<number>(0);
  const [newWeeklySalary, setNewWeeklySalary] = useState<number>(0);
  const [newHourlySalary, setNewHourlySalary] = useState<number>(0);
  
  // Currency options
  const currencies: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  ];
  
  // Handle number input with validation
  const handleNumberInput = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    // Allow empty input
    if (value === '') {
      setter('');
      return;
    }

    // Handle special cases for decimal input
    if (value === '.' || value === '0.') {
      setter('0.');
      return;
    }

    // Validate the input format (positive numbers only)
    const regex = /^\d*\.?\d*$/;
    if (regex.test(value)) {
      setter(value);
    }
  };
  
  // Calculate raise and new salary
  const calculateRaise = () => {
    const currentSalaryValue = parseFloat(currentSalary) || 0;
    let calculatedRaiseAmount = 0;
    
    // Calculate raise amount based on type
    if (raiseType === 'percentage') {
      const percentageValue = parseFloat(raisePercentage) || 0;
      calculatedRaiseAmount = currentSalaryValue * (percentageValue / 100);
    } else {
      calculatedRaiseAmount = parseFloat(raiseAmount) || 0;
    }
    
    // Calculate new salary
    const calculatedNewSalary = currentSalaryValue + calculatedRaiseAmount;
    setNewSalary(calculatedNewSalary);
    setRaiseTotal(calculatedRaiseAmount);
    
    // Convert to yearly salary based on pay period
    let yearlyValue = 0;
    switch (payPeriod) {
      case 'yearly':
        yearlyValue = calculatedNewSalary;
        break;
      case 'monthly':
        yearlyValue = calculatedNewSalary * 12;
        break;
      case 'biweekly':
        yearlyValue = calculatedNewSalary * 26;
        break;
      case 'weekly':
        yearlyValue = calculatedNewSalary * 52;
        break;
      case 'hourly':
        const hours = parseFloat(hoursPerWeek) || 0;
        yearlyValue = calculatedNewSalary * hours * 52;
        break;
    }
    
    // Calculate all pay periods
    setNewYearlySalary(yearlyValue);
    setNewMonthlySalary(yearlyValue / 12);
    setNewBiweeklySalary(yearlyValue / 26);
    setNewWeeklySalary(yearlyValue / 52);
    
    const hours = parseFloat(hoursPerWeek) || 0;
    if (hours > 0) {
      setNewHourlySalary(yearlyValue / (hours * 52));
    } else {
      setNewHourlySalary(0);
    }
  };
  
  // Calculate when inputs change
  useEffect(() => {
    calculateRaise();
  }, [currentSalary, raiseType, raisePercentage, raiseAmount, payPeriod, hoursPerWeek]);
  
  // Get currency symbol
  const getCurrencySymbol = (): string => {
    const currencyObj = currencies.find(c => c.code === currency);
    return currencyObj ? currencyObj.symbol : '$';
  };
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currencyDisplay: 'symbol'
    }).format(value);
  };
  
  // Get pay period label
  const getPayPeriodLabel = (period: string): string => {
    switch (period) {
      case 'yearly': return 'year';
      case 'monthly': return 'month';
      case 'biweekly': return 'two weeks';
      case 'weekly': return 'week';
      case 'hourly': return 'hour';
      default: return period;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Pay Raise Calculator</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Calculate your new salary after a pay raise or promotion
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="calculator-card rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Calculate Your Pay Raise</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter your current salary and raise details
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Currency Selection */}
              <div className="space-y-2">
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Currency
                </label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.code} - {curr.name} ({curr.symbol})
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Current Salary and Pay Period */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="currentSalary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Current Salary ({getCurrencySymbol()})
                  </label>
                  <input
                    id="currentSalary"
                    type="tel"
                    value={currentSalary}
                    onChange={(e) => handleNumberInput(e.target.value, setCurrentSalary)} {...decimalInputProps}
                    placeholder="Enter current salary"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="payPeriod" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Pay Period
                  </label>
                  <select
                    id="payPeriod"
                    value={payPeriod}
                    onChange={(e) => setPayPeriod(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="yearly">Yearly</option>
                    <option value="monthly">Monthly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="weekly">Weekly</option>
                    <option value="hourly">Hourly</option>
                  </select>
                </div>
              </div>
              
              {/* Hours per week (only for hourly) */}
              {payPeriod === 'hourly' && (
                <div className="space-y-2">
                  <label htmlFor="hoursPerWeek" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Hours Per Week
                  </label>
                  <input
                    id="hoursPerWeek"
                    type="tel"
                    value={hoursPerWeek}
                    onChange={(e) => handleNumberInput(e.target.value, setHoursPerWeek)} {...decimalInputProps}
                    placeholder="Enter hours per week"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              )}
              
              {/* Raise Type Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Raise Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className={`py-3 px-4 rounded-md text-center font-medium text-sm transition-colors ${
                      raiseType === 'percentage'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setRaiseType('percentage')}
                  >
                    Percentage (%)
                  </button>
                  <button
                    className={`py-3 px-4 rounded-md text-center font-medium text-sm transition-colors ${
                      raiseType === 'amount'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setRaiseType('amount')}
                  >
                    Fixed Amount
                  </button>
                </div>
              </div>
              
              {/* Raise Input (Percentage or Amount) */}
              {raiseType === 'percentage' ? (
                <div className="space-y-2">
                  <label htmlFor="raisePercentage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Raise Percentage (%)
                  </label>
                  <input
                    id="raisePercentage"
                    type="tel"
                    value={raisePercentage}
                    onChange={(e) => handleNumberInput(e.target.value, setRaisePercentage)} {...decimalInputProps}
                    placeholder="Enter percentage"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <div className="flex justify-between pt-2">
                    <button 
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                      onClick={() => setRaisePercentage('3')}
                    >
                      3%
                    </button>
                    <button 
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                      onClick={() => setRaisePercentage('5')}
                    >
                      5%
                    </button>
                    <button 
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                      onClick={() => setRaisePercentage('10')}
                    >
                      10%
                    </button>
                    <button 
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                      onClick={() => setRaisePercentage('15')}
                    >
                      15%
                    </button>
                    <button 
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                      onClick={() => setRaisePercentage('20')}
                    >
                      20%
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label htmlFor="raiseAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Raise Amount ({getCurrencySymbol()})
                  </label>
                  <input
                    id="raiseAmount"
                    type="tel"
                    value={raiseAmount}
                    onChange={(e) => handleNumberInput(e.target.value, setRaiseAmount)} {...decimalInputProps}
                    placeholder="Enter amount"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="calculator-card-alt rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Results</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your new salary after the raise
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-md">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    New {payPeriod} Salary
                  </div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(newSalary)}
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      per {getPayPeriodLabel(payPeriod)}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex justify-between">
                    <span>Raise Amount:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(raiseTotal)} 
                      {raiseType === 'percentage' && ` (${raisePercentage}%)`}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-md font-semibold text-gray-800 dark:text-white">Salary Breakdown</h3>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Yearly</span>
                    <span className="font-bold">{formatCurrency(newYearlySalary)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Monthly</span>
                    <span className="font-bold">{formatCurrency(newMonthlySalary)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Bi-weekly</span>
                    <span className="font-bold">{formatCurrency(newBiweeklySalary)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Weekly</span>
                    <span className="font-bold">{formatCurrency(newWeeklySalary)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Hourly</span>
                    <span className="font-bold">{formatCurrency(newHourlySalary)}</span>
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <h3 className="text-md font-semibold mb-2">Calculation Details</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Current Salary:</span>
                      <span>{formatCurrency(parseFloat(currentSalary) || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Raise:</span>
                      <span>
                        {raiseType === 'percentage' 
                          ? `${raisePercentage}%` 
                          : formatCurrency(parseFloat(raiseAmount) || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pay Period:</span>
                      <span className="capitalize">{payPeriod}</span>
                    </div>
                    {payPeriod === 'hourly' && (
                      <div className="flex justify-between">
                        <span>Hours Per Week:</span>
                        <span>{hoursPerWeek}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="calculator-card rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">About Pay Raises</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <p>
                A pay raise or salary increase is an increase in the amount of compensation paid for your work. 
                Raises can be calculated as a percentage of your current salary or as a fixed amount.
              </p>
              
              <h3 className="text-lg font-medium">Common Pay Raise Percentages</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Cost of Living Adjustment (COLA):</strong> Typically 1-3% to account for inflation</li>
                <li><strong>Performance-Based Raise:</strong> Usually 3-7% for meeting or exceeding expectations</li>
                <li><strong>Promotion:</strong> Often 10-20% when taking on a higher position or more responsibilities</li>
                <li><strong>Market Adjustment:</strong> Variable percentage to align salary with current market rates</li>
              </ul>
              
              <h3 className="text-lg font-medium">Considerations</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Taxes:</strong> A raise may push you into a higher tax bracket, affecting your take-home pay</li>
                <li><strong>Timing:</strong> Pay raises typically occur during annual reviews, promotions, or job changes</li>
                <li><strong>Negotiation:</strong> Research market rates for your position to negotiate effectively</li>
                <li><strong>Total Compensation:</strong> Consider benefits, bonuses, and other perks alongside your base salary</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 