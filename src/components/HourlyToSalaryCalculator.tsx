'use client';

import { useState, useEffect } from 'react';
import { decimalInputProps } from '@/utils/inputUtils';

// Currency options
interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export default function HourlyToSalaryCalculator() {
  // Input state
  const [hourlyRate, setHourlyRate] = useState<string>('20');
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('40');
  const [weeksPerYear, setWeeksPerYear] = useState<string>('52');
  const [daysPerWeek, setDaysPerWeek] = useState<string>('5');
  const [overtimeRate, setOvertimeRate] = useState<string>('1.5');
  const [overtimeHours, setOvertimeHours] = useState<string>('0');
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');
  const [currency, setCurrency] = useState<string>('USD');
  
  // Results state
  const [annualSalary, setAnnualSalary] = useState<number>(0);
  const [monthlySalary, setMonthlySalary] = useState<number>(0);
  const [biweeklySalary, setBiweeklySalary] = useState<number>(0);
  const [weeklySalary, setWeeklySalary] = useState<number>(0);
  const [dailySalary, setDailySalary] = useState<number>(0);
  
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
  
  // Calculate salary
  const calculateSalary = () => {
    const hourlyRateValue = parseFloat(hourlyRate) || 0;
    const hoursPerWeekValue = parseFloat(hoursPerWeek) || 0;
    const weeksPerYearValue = parseFloat(weeksPerYear) || 0;
    const daysPerWeekValue = parseFloat(daysPerWeek) || 0;
    const overtimeRateValue = parseFloat(overtimeRate) || 1.5;
    const overtimeHoursValue = parseFloat(overtimeHours) || 0;
    
    // Calculate regular hours and pay
    const regularHours = hoursPerWeekValue - overtimeHoursValue;
    const regularPay = regularHours * hourlyRateValue;
    
    // Calculate overtime pay
    const overtimePay = overtimeHoursValue * hourlyRateValue * overtimeRateValue;
    
    // Calculate weekly salary
    const weeklyPay = regularPay + overtimePay;
    setWeeklySalary(weeklyPay);
    
    // Calculate other time periods
    setBiweeklySalary(weeklyPay * 2);
    setMonthlySalary(weeklyPay * weeksPerYearValue / 12);
    setAnnualSalary(weeklyPay * weeksPerYearValue);
    
    // Calculate daily salary (assuming equal distribution of hours)
    if (daysPerWeekValue > 0) {
      setDailySalary(weeklyPay / daysPerWeekValue);
    } else {
      setDailySalary(0);
    }
  };
  
  // Calculate when inputs change
  useEffect(() => {
    calculateSalary();
  }, [hourlyRate, hoursPerWeek, weeksPerYear, daysPerWeek, overtimeRate, overtimeHours]);
  
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
      <h1 className="text-3xl font-bold text-center mb-2">Hourly to Salary Calculator</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Convert your hourly wage to annual, monthly, and weekly salary
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="calculator-card rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Calculate Your Salary</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter your hourly rate and work schedule details
              </p>
            </div>
            
            {/* Currency Selection */}
            <div className="px-6 pt-6 pb-2">
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
            </div>
            
            {/* Tab Buttons - Improved for mobile */}
            <div className="px-6 pt-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  className={`py-3 px-4 rounded-md text-center font-medium text-sm transition-colors ${
                    activeTab === 'basic'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setActiveTab('basic')}
                >
                  Basic Options
                </button>
                <button
                  className={`py-3 px-4 rounded-md text-center font-medium text-sm transition-colors ${
                    activeTab === 'advanced'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setActiveTab('advanced')}
                >
                  Advanced Options
                </button>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              {/* Basic Tab Content */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>
                  
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
                </div>
              )}
              
              {/* Advanced Tab Content */}
              {activeTab === 'advanced' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="overtimeHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Overtime Hours Per Week
                      </label>
                      <input
                        id="overtimeHours"
                        type="tel"
                        value={overtimeHours}
                        onChange={(e) => handleNumberInput(e.target.value, setOvertimeHours)} {...decimalInputProps}
                        placeholder="Overtime hours"
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
                        placeholder="Overtime multiplier"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <p className="text-xs text-gray-500">Standard is 1.5x (time and a half)</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="hoursPerWeekAdv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Hours Per Week
                      </label>
                      <input
                        id="hoursPerWeekAdv"
                        type="tel"
                        value={hoursPerWeek}
                        onChange={(e) => handleNumberInput(e.target.value, setHoursPerWeek)} {...decimalInputProps}
                        placeholder="Hours per week"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="daysPerWeekAdv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Days Per Week
                      </label>
                      <input
                        id="daysPerWeekAdv"
                        type="tel"
                        value={daysPerWeek}
                        onChange={(e) => handleNumberInput(e.target.value, setDaysPerWeek)} {...decimalInputProps}
                        placeholder="Days per week"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="weeksPerYearAdv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Weeks Per Year
                      </label>
                      <input
                        id="weeksPerYearAdv"
                        type="tel"
                        value={weeksPerYear}
                        onChange={(e) => handleNumberInput(e.target.value, setWeeksPerYear)} {...decimalInputProps}
                        placeholder="Weeks per year"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="calculator-card-alt rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Salary Breakdown</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Based on {hoursPerWeek} hours per week, {weeksPerYear} weeks per year
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-md">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Annual Salary
                  </div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(annualSalary)}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Monthly</span>
                    <span className="font-bold">{formatCurrency(monthlySalary)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Bi-weekly</span>
                    <span className="font-bold">{formatCurrency(biweeklySalary)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Weekly</span>
                    <span className="font-bold">{formatCurrency(weeklySalary)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Daily</span>
                    <span className="font-bold">{formatCurrency(dailySalary)}</span>
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <h3 className="text-md font-semibold mb-2">Calculation Details</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Hourly Rate:</span>
                      <span>{formatCurrency(parseFloat(hourlyRate) || 0)}/hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Regular Hours:</span>
                      <span>{parseFloat(hoursPerWeek) - parseFloat(overtimeHours) || 0}/week</span>
                    </div>
                    {parseFloat(overtimeHours) > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span>Overtime Hours:</span>
                          <span>{overtimeHours}/week</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Overtime Rate:</span>
                          <span>{overtimeRate}x</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span>Work Schedule:</span>
                      <span>{daysPerWeek} days/week, {weeksPerYear} weeks/year</span>
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
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">About Hourly to Salary Conversion</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <p>
                Converting your hourly wage to an annual salary helps you understand your total earnings and compare job offers. 
                The standard formula is: <strong>Hourly Rate × Hours Per Week × Weeks Per Year = Annual Salary</strong>.
              </p>
              
              <h3 className="text-lg font-medium">Common Work Schedules</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Full-time:</strong> 40 hours per week, 52 weeks per year (2,080 hours annually)</li>
                <li><strong>Part-time:</strong> 20-30 hours per week, 52 weeks per year (1,040-1,560 hours annually)</li>
                <li><strong>Seasonal:</strong> Full-time hours for a limited period (e.g., 3 months = 13 weeks)</li>
              </ul>
              
              <h3 className="text-lg font-medium">Considerations</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Paid Time Off:</strong> Some employers offer paid vacation, which affects your total working weeks</li>
                <li><strong>Overtime:</strong> Hours worked beyond 40 per week may be paid at a higher rate (typically 1.5x)</li>
                <li><strong>Benefits:</strong> Health insurance, retirement plans, and other benefits add value beyond your salary</li>
                <li><strong>Taxes:</strong> Your take-home pay will be less than your gross salary due to income taxes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 