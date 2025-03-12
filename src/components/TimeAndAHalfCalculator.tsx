'use client';

import { useState, useEffect } from 'react';
import { decimalInputProps } from '@/utils/inputUtils';

// Currency options
interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export default function TimeAndAHalfCalculator() {
  // Input state
  const [hourlyRate, setHourlyRate] = useState<string>('20');
  const [regularHours, setRegularHours] = useState<string>('40');
  const [overtimeHours, setOvertimeHours] = useState<string>('10');
  const [currency, setCurrency] = useState<string>('USD');
  
  // Results state
  const [timeAndHalfRate, setTimeAndHalfRate] = useState<number>(0);
  const [regularPay, setRegularPay] = useState<number>(0);
  const [overtimePay, setOvertimePay] = useState<number>(0);
  const [totalPay, setTotalPay] = useState<number>(0);
  const [effectiveHourlyRate, setEffectiveHourlyRate] = useState<number>(0);
  
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
  
  // Calculate time and a half pay
  const calculateTimeAndHalfPay = () => {
    const hourlyRateValue = parseFloat(hourlyRate) || 0;
    const regularHoursValue = parseFloat(regularHours) || 0;
    const overtimeHoursValue = parseFloat(overtimeHours) || 0;
    
    // Calculate time and a half rate (1.5x regular rate)
    const calculatedTimeAndHalfRate = hourlyRateValue * 1.5;
    setTimeAndHalfRate(calculatedTimeAndHalfRate);
    
    // Calculate pay components
    const calculatedRegularPay = hourlyRateValue * regularHoursValue;
    const calculatedOvertimePay = calculatedTimeAndHalfRate * overtimeHoursValue;
    
    // Set state values
    setRegularPay(calculatedRegularPay);
    setOvertimePay(calculatedOvertimePay);
    
    // Calculate total pay
    const calculatedTotalPay = calculatedRegularPay + calculatedOvertimePay;
    setTotalPay(calculatedTotalPay);
    
    // Calculate effective hourly rate
    const totalHours = regularHoursValue + overtimeHoursValue;
    if (totalHours > 0) {
      setEffectiveHourlyRate(calculatedTotalPay / totalHours);
    } else {
      setEffectiveHourlyRate(0);
    }
  };
  
  // Calculate when inputs change
  useEffect(() => {
    calculateTimeAndHalfPay();
  }, [hourlyRate, regularHours, overtimeHours]);
  
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Time and a Half Calculator</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Calculate your overtime pay at 1.5x your regular rate
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="calculator-card rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Calculate Time and a Half Pay</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter your hourly rate and work hours
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
              
              {/* Hourly Rate */}
              <div className="space-y-2">
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Regular Hourly Rate ({getCurrencySymbol()})
                </label>
                <input
                  id="hourlyRate"
                  type="tel"
                  value={hourlyRate}
                  onChange={(e) => handleNumberInput(e.target.value, setHourlyRate)} {...decimalInputProps}
                  placeholder="Enter hourly rate"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              {/* Hours Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="regularHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Regular Hours
                  </label>
                  <input
                    id="regularHours"
                    type="tel"
                    value={regularHours}
                    onChange={(e) => handleNumberInput(e.target.value, setRegularHours)} {...decimalInputProps}
                    placeholder="Enter regular hours"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500">Standard work week is typically 40 hours</p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="overtimeHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Overtime Hours (at 1.5x)
                  </label>
                  <input
                    id="overtimeHours"
                    type="tel"
                    value={overtimeHours}
                    onChange={(e) => handleNumberInput(e.target.value, setOvertimeHours)} {...decimalInputProps}
                    placeholder="Enter overtime hours"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500">Hours that will be paid at time and a half rate</p>
                </div>
              </div>
              
              {/* Time and a Half Rate Display */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Your Time and a Half Rate:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(timeAndHalfRate)}/hour
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Time and a half is calculated as 1.5 × your regular hourly rate
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="calculator-card-alt rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Pay Summary</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your earnings breakdown
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-md">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Pay
                  </div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(totalPay)}
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    For {parseFloat(regularHours) + parseFloat(overtimeHours)} total hours
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Regular Pay</span>
                    <span className="font-bold">{formatCurrency(regularPay)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Overtime Pay (1.5x)</span>
                    <span className="font-bold">{formatCurrency(overtimePay)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-medium">Effective Hourly Rate</span>
                    <span className="font-bold">{formatCurrency(effectiveHourlyRate)}/hour</span>
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <h3 className="text-md font-semibold mb-2">Calculation Details</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Regular Hours:</span>
                      <span>{regularHours} × {formatCurrency(parseFloat(hourlyRate) || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overtime Hours:</span>
                      <span>{overtimeHours} × {formatCurrency(timeAndHalfRate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time and a Half Rate:</span>
                      <span>{formatCurrency(parseFloat(hourlyRate) || 0)} × 1.5</span>
                    </div>
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
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">About Time and a Half Pay</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <p>
                "Time and a half" refers to a pay rate that is 1.5 times an employee's regular hourly wage. 
                It's a common rate for overtime work and is required by law in many jurisdictions.
              </p>
              
              <h3 className="text-lg font-medium">When Time and a Half Applies</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Overtime Hours:</strong> In the US, non-exempt employees must receive at least time and a half for hours worked beyond 40 in a workweek</li>
                <li><strong>Holidays:</strong> Some employers pay time and a half for work on holidays, though this is often a company policy rather than a legal requirement</li>
                <li><strong>Weekends:</strong> Some union contracts or company policies provide time and a half pay for weekend work</li>
                <li><strong>Special Circumstances:</strong> Some industries have specific rules about when time and a half applies</li>
              </ul>
              
              <h3 className="text-lg font-medium">Calculation Example</h3>
              <p>
                If your regular hourly rate is {formatCurrency(20)}, your time and a half rate would be {formatCurrency(30)} per hour.
                If you work 45 hours in a week (40 regular hours and 5 overtime hours), your pay would be:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Regular pay: 40 hours × {formatCurrency(20)} = {formatCurrency(800)}</li>
                <li>Overtime pay: 5 hours × {formatCurrency(30)} = {formatCurrency(150)}</li>
                <li>Total pay: {formatCurrency(800)} + {formatCurrency(150)} = {formatCurrency(950)}</li>
              </ul>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md mt-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Note:</strong> Overtime laws vary by country and jurisdiction. This calculator provides estimates based on the standard time and a half (1.5x) rate. 
                  For specific legal advice about overtime pay in your location, consult with a legal professional or your local labor department.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 