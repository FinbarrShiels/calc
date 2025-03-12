'use client';

import { useState, useEffect } from 'react';
import { decimalInputProps } from '@/utils/inputUtils';

// Currency options
interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export default function SalaryToHourlyCalculator() {
  // Input state
  const [annualSalary, setAnnualSalary] = useState<string>('50000');
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('40');
  const [weeksPerYear, setWeeksPerYear] = useState<string>('52');
  const [daysPerWeek, setDaysPerWeek] = useState<string>('5');
  const [currency, setCurrency] = useState<string>('USD');
  
  // Results state
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [dailyRate, setDailyRate] = useState<number>(0);
  const [weeklyRate, setWeeklyRate] = useState<number>(0);
  const [monthlyRate, setMonthlyRate] = useState<number>(0);
  
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
  
  // Preset work schedules
  const presetSchedules = [
    { label: 'Full-time (40h/week)', hours: '40', weeks: '52', days: '5' },
    { label: 'Part-time (20h/week)', hours: '20', weeks: '52', days: '3' },
    { label: 'Part-time (30h/week)', hours: '30', weeks: '52', days: '4' },
    { label: 'Seasonal (40h/week, 3 months)', hours: '40', weeks: '13', days: '5' },
    { label: 'Contract (40h/week, 6 months)', hours: '40', weeks: '26', days: '5' },
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
  
  // Apply preset schedule
  const applyPresetSchedule = (preset: { hours: string; weeks: string; days: string }) => {
    setHoursPerWeek(preset.hours);
    setWeeksPerYear(preset.weeks);
    setDaysPerWeek(preset.days);
  };
  
  // Calculate hourly rate
  const calculateHourlyRate = () => {
    const annualSalaryValue = parseFloat(annualSalary) || 0;
    const hoursPerWeekValue = parseFloat(hoursPerWeek) || 0;
    const weeksPerYearValue = parseFloat(weeksPerYear) || 0;
    const daysPerWeekValue = parseFloat(daysPerWeek) || 0;
    
    // Calculate total working hours per year
    const totalHoursPerYear = hoursPerWeekValue * weeksPerYearValue;
    
    // Calculate rates
    if (totalHoursPerYear > 0) {
      setHourlyRate(annualSalaryValue / totalHoursPerYear);
      setWeeklyRate(annualSalaryValue / weeksPerYearValue);
      setMonthlyRate(annualSalaryValue / 12);
      
      if (daysPerWeekValue > 0) {
        setDailyRate(annualSalaryValue / (weeksPerYearValue * daysPerWeekValue));
      } else {
        setDailyRate(0);
      }
    } else {
      setHourlyRate(0);
      setDailyRate(0);
      setWeeklyRate(0);
      setMonthlyRate(0);
    }
  };
  
  // Calculate when inputs change
  useEffect(() => {
    calculateHourlyRate();
  }, [annualSalary, hoursPerWeek, weeksPerYear, daysPerWeek]);
  
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
      <h1 className="text-3xl font-bold text-center mb-2">Salary to Hourly Calculator</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Convert your annual salary to hourly, daily, and weekly rates
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="calculator-card rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Calculate Your Hourly Rate</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter your annual salary and work schedule details
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
              
              {/* Annual Salary Input */}
              <div className="space-y-2">
                <label htmlFor="annualSalary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Annual Salary ({getCurrencySymbol()})
                </label>
                <input
                  id="annualSalary"
                  type="tel"
                  value={annualSalary}
                  onChange={(e) => handleNumberInput(e.target.value, setAnnualSalary)} {...decimalInputProps}
                  placeholder="Enter annual salary"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              {/* Work Schedule */}
              <div className="space-y-2">
                <label htmlFor="presetSchedule" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Work Schedule
                </label>
                <select
                  id="presetSchedule"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  onChange={(e) => {
                    const preset = presetSchedules.find(p => p.label === e.target.value);
                    if (preset) applyPresetSchedule(preset);
                  }}
                >
                  <option value="">Select schedule</option>
                  {presetSchedules.map((preset) => (
                    <option key={preset.label} value={preset.label}>
                      {preset.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Work Schedule Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="hoursPerWeek" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Hours Per Week
                  </label>
                  <input
                    id="hoursPerWeek"
                    type="tel"
                    value={hoursPerWeek}
                    onChange={(e) => handleNumberInput(e.target.value, setHoursPerWeek)} {...decimalInputProps}
                    placeholder="Hours per week"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="daysPerWeek" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Days Per Week
                  </label>
                  <input
                    id="daysPerWeek"
                    type="tel"
                    value={daysPerWeek}
                    onChange={(e) => handleNumberInput(e.target.value, setDaysPerWeek)} {...decimalInputProps}
                    placeholder="Days per week"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="weeksPerYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Weeks Per Year
                  </label>
                  <input
                    id="weeksPerYear"
                    type="tel"
                    value={weeksPerYear}
                    onChange={(e) => handleNumberInput(e.target.value, setWeeksPerYear)} {...decimalInputProps}
                    placeholder="Weeks per year"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              {/* Total Hours Per Year */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Hours Per Year:</span>
                  <span className="font-bold">{(parseFloat(hoursPerWeek) || 0) * (parseFloat(weeksPerYear) || 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="calculator-card-alt rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Rate Breakdown</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Based on {annualSalary} {currency} annual salary
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-md">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Hourly Rate
                  </div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(hourlyRate)}/hour
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Daily</span>
                    <span className="font-bold">{formatCurrency(dailyRate)}/day</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Weekly</span>
                    <span className="font-bold">{formatCurrency(weeklyRate)}/week</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Monthly</span>
                    <span className="font-bold">{formatCurrency(monthlyRate)}/month</span>
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <h3 className="text-md font-semibold mb-2">Calculation Details</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Annual Salary:</span>
                      <span>{formatCurrency(parseFloat(annualSalary) || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Work Schedule:</span>
                      <span>{hoursPerWeek} hours/week, {daysPerWeek} days/week</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Working Weeks:</span>
                      <span>{weeksPerYear} weeks/year</span>
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
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">About Salary to Hourly Conversion</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <p>
                Converting your annual salary to an hourly rate helps you understand your earnings on a more granular level. 
                The standard formula is: <strong>Annual Salary ÷ (Hours Per Week × Weeks Per Year) = Hourly Rate</strong>.
              </p>
              
              <h3 className="text-lg font-medium">Common Work Schedules</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Full-time:</strong> 40 hours per week, 52 weeks per year (2,080 hours annually)</li>
                <li><strong>Part-time:</strong> 20-30 hours per week, 52 weeks per year (1,040-1,560 hours annually)</li>
                <li><strong>Seasonal:</strong> Full-time hours for a limited period (e.g., 3 months = 13 weeks)</li>
              </ul>
              
              <h3 className="text-lg font-medium">Considerations</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Paid Time Off:</strong> If you receive paid vacation, sick days, or holidays, these are included in your annual salary</li>
                <li><strong>Benefits:</strong> Your total compensation may include health insurance, retirement plans, and other benefits not reflected in the hourly rate</li>
                <li><strong>Taxes:</strong> The calculated rates are gross amounts before taxes and deductions</li>
                <li><strong>Overtime:</strong> This calculator assumes a standard work schedule without overtime pay</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 