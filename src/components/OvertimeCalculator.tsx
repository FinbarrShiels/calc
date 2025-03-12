'use client';

import { useState, useEffect } from 'react';
import { decimalInputProps } from '@/utils/inputUtils';

// Currency options
interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export default function OvertimeCalculator() {
  // Input state
  const [hourlyRate, setHourlyRate] = useState<string>('20');
  const [regularHours, setRegularHours] = useState<string>('40');
  const [overtimeHours, setOvertimeHours] = useState<string>('10');
  const [overtimeRate, setOvertimeRate] = useState<string>('1.5');
  const [doubleTimeHours, setDoubleTimeHours] = useState<string>('0');
  const [doubleTimeRate, setDoubleTimeRate] = useState<string>('2');
  const [currency, setCurrency] = useState<string>('USD');
  
  // Results state
  const [regularPay, setRegularPay] = useState<number>(0);
  const [overtimePay, setOvertimePay] = useState<number>(0);
  const [doubleTimePay, setDoubleTimePay] = useState<number>(0);
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
  
  // Calculate overtime pay
  const calculateOvertimePay = () => {
    const hourlyRateValue = parseFloat(hourlyRate) || 0;
    const regularHoursValue = parseFloat(regularHours) || 0;
    const overtimeHoursValue = parseFloat(overtimeHours) || 0;
    const overtimeRateValue = parseFloat(overtimeRate) || 1.5;
    const doubleTimeHoursValue = parseFloat(doubleTimeHours) || 0;
    const doubleTimeRateValue = parseFloat(doubleTimeRate) || 2;
    
    // Calculate pay components
    const calculatedRegularPay = hourlyRateValue * regularHoursValue;
    const calculatedOvertimePay = hourlyRateValue * overtimeHoursValue * overtimeRateValue;
    const calculatedDoubleTimePay = hourlyRateValue * doubleTimeHoursValue * doubleTimeRateValue;
    
    // Set state values
    setRegularPay(calculatedRegularPay);
    setOvertimePay(calculatedOvertimePay);
    setDoubleTimePay(calculatedDoubleTimePay);
    
    // Calculate total pay
    const calculatedTotalPay = calculatedRegularPay + calculatedOvertimePay + calculatedDoubleTimePay;
    setTotalPay(calculatedTotalPay);
    
    // Calculate effective hourly rate
    const totalHours = regularHoursValue + overtimeHoursValue + doubleTimeHoursValue;
    if (totalHours > 0) {
      setEffectiveHourlyRate(calculatedTotalPay / totalHours);
    } else {
      setEffectiveHourlyRate(0);
    }
  };
  
  // Calculate when inputs change
  useEffect(() => {
    calculateOvertimePay();
  }, [hourlyRate, regularHours, overtimeHours, overtimeRate, doubleTimeHours, doubleTimeRate]);
  
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
      <h1 className="text-3xl font-bold text-center mb-2">Overtime Calculator</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Calculate your overtime pay and total earnings
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="calculator-card rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Calculate Your Overtime Pay</h2>
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
                  Hourly Rate ({getCurrencySymbol()})
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
              
              {/* Regular Hours */}
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
              
              {/* Overtime Hours and Rate */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="overtimeHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Overtime Hours
                  </label>
                  <input
                    id="overtimeHours"
                    type="tel"
                    value={overtimeHours}
                    onChange={(e) => handleNumberInput(e.target.value, setOvertimeHours)} {...decimalInputProps}
                    placeholder="Enter overtime hours"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="overtimeRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Overtime Rate Multiplier
                  </label>
                  <input
                    id="overtimeRate"
                    type="tel"
                    value={overtimeRate}
                    onChange={(e) => handleNumberInput(e.target.value, setOvertimeRate)} {...decimalInputProps}
                    placeholder="Enter overtime rate"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500">Standard is 1.5x (time and a half)</p>
                </div>
              </div>
              
              {/* Double Time Hours and Rate */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="doubleTimeHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Double Time Hours
                  </label>
                  <input
                    id="doubleTimeHours"
                    type="tel"
                    value={doubleTimeHours}
                    onChange={(e) => handleNumberInput(e.target.value, setDoubleTimeHours)} {...decimalInputProps}
                    placeholder="Enter double time hours"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500">Hours paid at double time rate (e.g., holidays)</p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="doubleTimeRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Double Time Rate Multiplier
                  </label>
                  <input
                    id="doubleTimeRate"
                    type="tel"
                    value={doubleTimeRate}
                    onChange={(e) => handleNumberInput(e.target.value, setDoubleTimeRate)} {...decimalInputProps}
                    placeholder="Enter double time rate"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500">Standard is 2x (double time)</p>
                </div>
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
                    For {parseFloat(regularHours) + parseFloat(overtimeHours) + parseFloat(doubleTimeHours)} total hours
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Regular Pay</span>
                    <span className="font-bold">{formatCurrency(regularPay)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Overtime Pay</span>
                    <span className="font-bold">{formatCurrency(overtimePay)}</span>
                  </div>
                  
                  {parseFloat(doubleTimeHours) > 0 && (
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Double Time Pay</span>
                      <span className="font-bold">{formatCurrency(doubleTimePay)}</span>
                    </div>
                  )}
                  
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
                      <span>{overtimeHours} × {formatCurrency(parseFloat(hourlyRate) || 0)} × {overtimeRate}</span>
                    </div>
                    {parseFloat(doubleTimeHours) > 0 && (
                      <div className="flex justify-between">
                        <span>Double Time Hours:</span>
                        <span>{doubleTimeHours} × {formatCurrency(parseFloat(hourlyRate) || 0)} × {doubleTimeRate}</span>
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
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">About Overtime Pay</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <p>
                Overtime pay is additional compensation for hours worked beyond the standard work week. 
                In many countries, employers are required to pay overtime at a higher rate than regular hours.
              </p>
              
              <h3 className="text-lg font-medium">Common Overtime Rules</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Time and a Half (1.5x):</strong> The most common overtime rate, typically applied to hours worked beyond 40 per week</li>
                <li><strong>Double Time (2x):</strong> Often applied to work on holidays, Sundays, or after a certain number of overtime hours</li>
                <li><strong>Standard Workweek:</strong> In the US and many countries, overtime applies after 40 hours in a workweek</li>
                <li><strong>Daily Overtime:</strong> Some jurisdictions require overtime pay for hours worked beyond 8 in a single day</li>
              </ul>
              
              <h3 className="text-lg font-medium">Overtime Eligibility</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Non-exempt Employees:</strong> Hourly workers and some salaried employees are typically eligible for overtime pay</li>
                <li><strong>Exempt Employees:</strong> Many salaried professionals, executives, and certain other workers may be exempt from overtime requirements</li>
                <li><strong>Industry Variations:</strong> Some industries have special overtime rules (e.g., healthcare, transportation)</li>
                <li><strong>Local Laws:</strong> Overtime regulations vary by country, state, and local jurisdiction</li>
              </ul>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md mt-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Note:</strong> This calculator provides estimates based on the information you enter. 
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