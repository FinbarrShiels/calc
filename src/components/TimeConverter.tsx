'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';

interface TimeConverterProps {
  calculator?: Calculator;
}

const TimeConverter: React.FC<TimeConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('h');
  const [toUnit, setToUnit] = useState<string>('min');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Conversion factors to seconds (base unit)
  const unitFactors: Record<string, number> = {
    'ns': 1e-9,                  // nanoseconds
    'μs': 1e-6,                  // microseconds
    'ms': 0.001,                 // milliseconds
    's': 1,                      // seconds (base unit)
    'min': 60,                   // minutes
    'h': 3600,                   // hours
    'd': 86400,                  // days
    'wk': 604800,                // weeks
    'mo': 2629746,               // months (average)
    'yr': 31556952,              // years (average)
  };
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertUnits();
  }, [valueStr, fromUnit, toUnit, precision]);
  
  // Handle from unit change
  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value);
  };
  
  // Handle to unit change
  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value);
  };
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle value input change with proper validation
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setValueStr('');
      return;
    }
    
    // Validate the input is a positive number
    if (/^\d*\.?\d*$/.test(value)) {
      setValueStr(value);
    }
  };
  
  // Convert between units
  const convertUnits = () => {
    const value = valueStr === '' ? 0 : parseFloat(valueStr);
    
    // Convert to seconds first
    const seconds = value * unitFactors[fromUnit];
    
    // Then convert to target unit
    const convertedValue = seconds / unitFactors[toUnit];
    
    setResult(Number(convertedValue.toFixed(precision)));
  };
  
  // Get the display name for a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'ns': return 'ns';
      case 'μs': return 'μs';
      case 'ms': return 'ms';
      case 's': return 's';
      case 'min': return 'min';
      case 'h': return 'h';
      case 'd': return 'd';
      case 'wk': return 'wk';
      case 'mo': return 'mo';
      case 'yr': return 'yr';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'ns': return 'Nanoseconds';
      case 'μs': return 'Microseconds';
      case 'ms': return 'Milliseconds';
      case 's': return 'Seconds';
      case 'min': return 'Minutes';
      case 'h': return 'Hours';
      case 'd': return 'Days';
      case 'wk': return 'Weeks';
      case 'mo': return 'Months';
      case 'yr': return 'Years';
      default: return unit;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Input</h2>
          
          {/* Value Input */}
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Value
            </label>
            <input
              type="tel"
              id="value"
              value={valueStr}
              onChange={handleValueChange}
              {...decimalInputProps}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter value"
            />
          </div>
          
          {/* From Unit Selection */}
          <div>
            <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              From Unit
            </label>
            <select
              id="fromUnit"
              value={fromUnit}
              onChange={handleFromUnitChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="ns">Nanoseconds (ns)</option>
              <option value="μs">Microseconds (μs)</option>
              <option value="ms">Milliseconds (ms)</option>
              <option value="s">Seconds (s)</option>
              <option value="min">Minutes (min)</option>
              <option value="h">Hours (h)</option>
              <option value="d">Days (d)</option>
              <option value="wk">Weeks (wk)</option>
              <option value="mo">Months (mo)</option>
              <option value="yr">Years (yr)</option>
            </select>
          </div>
          
          {/* To Unit Selection */}
          <div>
            <label htmlFor="toUnit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              To Unit
            </label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={handleToUnitChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="ns">Nanoseconds (ns)</option>
              <option value="μs">Microseconds (μs)</option>
              <option value="ms">Milliseconds (ms)</option>
              <option value="s">Seconds (s)</option>
              <option value="min">Minutes (min)</option>
              <option value="h">Hours (h)</option>
              <option value="d">Days (d)</option>
              <option value="wk">Weeks (wk)</option>
              <option value="mo">Months (mo)</option>
              <option value="yr">Years (yr)</option>
            </select>
          </div>
          
          {/* Precision Selection */}
          <div>
            <label htmlFor="precision" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Decimal Places
            </label>
            <select
              id="precision"
              value={precision}
              onChange={handlePrecisionChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
            </select>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Result</h2>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {valueStr || '0'} {getUnitFullName(fromUnit)} equals
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {result.toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision })} {getUnitDisplayName(toUnit)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {getUnitFullName(toUnit)}
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Common Time Conversions</h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>1 minute = 60 seconds</li>
              <li>1 hour = 60 minutes = 3,600 seconds</li>
              <li>1 day = 24 hours = 1,440 minutes = 86,400 seconds</li>
              <li>1 week = 7 days = 168 hours = 604,800 seconds</li>
              <li>1 month (average) = 30.44 days = 2,629,746 seconds</li>
              <li>1 year (average) = 365.24 days = 31,556,952 seconds</li>
              <li>1 millisecond = 0.001 seconds = 1,000 microseconds</li>
              <li>1 microsecond = 0.000001 seconds = 1,000 nanoseconds</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Time Units</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Time is measured in various units depending on the scale:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Small time intervals:</strong> Nanoseconds, microseconds, milliseconds</li>
                <li><strong>Standard time units:</strong> Seconds, minutes, hours</li>
                <li><strong>Calendar units:</strong> Days, weeks, months, years</li>
              </ul>
              <p className="mt-2">Note: Months and years are approximated as 30.44 days and 365.24 days respectively, accounting for leap years.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeConverter; 