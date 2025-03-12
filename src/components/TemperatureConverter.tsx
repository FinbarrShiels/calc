'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';

interface TemperatureConverterProps {
  calculator?: Calculator;
}

const TemperatureConverter: React.FC<TemperatureConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('0');
  const [fromUnit, setFromUnit] = useState<string>('c');
  const [toUnit, setToUnit] = useState<string>('f');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
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
    
    // Allow empty input and negative numbers for temperature
    if (value === '' || value === '-') {
      setValueStr(value);
      return;
    }
    
    // Validate the input is a number (can be negative)
    if (/^-?\d*\.?\d*$/.test(value)) {
      setValueStr(value);
    }
  };
  
  // Convert to Kelvin (base unit)
  const convertToKelvin = (value: number, unit: string): number => {
    switch (unit) {
      case 'c':
        return value + 273.15;
      case 'f':
        return (value + 459.67) * (5/9);
      case 'k':
        return value;
      case 'r':
        return value * (5/9);
      case 're':
        return (value * 1.25) + 273.15;
      default:
        return value;
    }
  };
  
  // Convert from Kelvin to target unit
  const convertFromKelvin = (kelvin: number, unit: string): number => {
    switch (unit) {
      case 'c':
        return kelvin - 273.15;
      case 'f':
        return kelvin * (9/5) - 459.67;
      case 'k':
        return kelvin;
      case 'r':
        return kelvin * (9/5);
      case 're':
        return (kelvin - 273.15) * 0.8;
      default:
        return kelvin;
    }
  };
  
  // Convert between units
  const convertUnits = () => {
    const value = valueStr === '' || valueStr === '-' ? 0 : parseFloat(valueStr);
    
    // Convert to Kelvin first
    const kelvin = convertToKelvin(value, fromUnit);
    
    // Then convert from Kelvin to target unit
    const convertedValue = convertFromKelvin(kelvin, toUnit);
    
    setResult(Number(convertedValue.toFixed(precision)));
  };
  
  // Get the display name for a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'c': return '°C';
      case 'f': return '°F';
      case 'k': return 'K';
      case 'r': return '°R';
      case 're': return '°Ré';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'c': return 'Celsius';
      case 'f': return 'Fahrenheit';
      case 'k': return 'Kelvin';
      case 'r': return 'Rankine';
      case 're': return 'Réaumur';
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
              <option value="c">Celsius (°C)</option>
              <option value="f">Fahrenheit (°F)</option>
              <option value="k">Kelvin (K)</option>
              <option value="r">Rankine (°R)</option>
              <option value="re">Réaumur (°Ré)</option>
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
              <option value="c">Celsius (°C)</option>
              <option value="f">Fahrenheit (°F)</option>
              <option value="k">Kelvin (K)</option>
              <option value="r">Rankine (°R)</option>
              <option value="re">Réaumur (°Ré)</option>
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
            </select>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Result</h2>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {valueStr || '0'} {getUnitDisplayName(fromUnit)} equals
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {result.toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision })} {getUnitDisplayName(toUnit)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {getUnitFullName(toUnit)}
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Common Temperature Conversions</h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>Water freezes at 0°C = 32°F = 273.15K</li>
              <li>Water boils at 100°C = 212°F = 373.15K</li>
              <li>Room temperature is about 20-25°C = 68-77°F</li>
              <li>Body temperature is about 37°C = 98.6°F</li>
              <li>Absolute zero is 0K = -273.15°C = -459.67°F</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Temperature Scales</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Celsius (°C):</strong> Used in most countries worldwide. Water freezes at 0°C and boils at 100°C at standard pressure.</li>
                <li><strong>Fahrenheit (°F):</strong> Used primarily in the United States. Water freezes at 32°F and boils at 212°F at standard pressure.</li>
                <li><strong>Kelvin (K):</strong> The SI unit of temperature. 0K is absolute zero, the theoretical lowest possible temperature. No degree symbol is used.</li>
                <li><strong>Rankine (°R):</strong> An absolute temperature scale like Kelvin, but using Fahrenheit degrees. 0°R is absolute zero.</li>
                <li><strong>Réaumur (°Ré):</strong> A historical scale where water freezes at 0°Ré and boils at 80°Ré. Rarely used today.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter; 