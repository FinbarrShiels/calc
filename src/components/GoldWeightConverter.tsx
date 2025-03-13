'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface GoldWeightConverterProps {
  calculator?: Calculator;
}

const GoldWeightConverter: React.FC<GoldWeightConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('oz_t');
  const [toUnit, setToUnit] = useState<string>('g');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Conversion factors to grams (base unit)
  const unitFactors: Record<string, number> = {
    'g': 1,                      // grams (base unit)
    'kg': 1000,                  // kilograms
    'oz_t': 31.1035,             // troy ounces
    'oz': 28.3495,               // ounces (avoirdupois)
    'lb': 453.592,               // pounds
    'dwt': 1.55517,              // pennyweight (1/20 troy ounce)
    'grain': 0.06479891,         // grains (1/480 troy ounce)
    'tola': 11.6638,             // tola (India)
    'tael': 37.429,              // tael (Hong Kong)
    'baht': 15.244,              // baht (Thailand)
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
    
    // Convert to grams first
    const grams = value * unitFactors[fromUnit];
    
    // Then convert to target unit
    const convertedValue = grams / unitFactors[toUnit];
    
    setResult(Number(convertedValue.toFixed(precision)));
  };
  
  // Get the display name for a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'g': return 'g';
      case 'kg': return 'kg';
      case 'oz_t': return 'oz t';
      case 'oz': return 'oz';
      case 'lb': return 'lb';
      case 'dwt': return 'dwt';
      case 'grain': return 'grain';
      case 'tola': return 'tola';
      case 'tael': return 'tael';
      case 'baht': return 'baht';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'g': return 'Grams';
      case 'kg': return 'Kilograms';
      case 'oz_t': return 'Troy Ounces';
      case 'oz': return 'Ounces';
      case 'lb': return 'Pounds';
      case 'dwt': return 'Pennyweight';
      case 'grain': return 'Grains';
      case 'tola': return 'Tola';
      case 'tael': return 'Tael';
      case 'baht': return 'Baht';
      default: return unit;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Input</h2>
          
          {/* Value Input */}
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Value
            </label>
            <input
              type="tel"
              id="value"
              value={valueStr}
              onChange={handleValueChange} {...decimalInputProps}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
              placeholder="Enter value"
            />
          </div>
          
          {/* From Unit Selection */}
          <div>
            <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              From Unit
            </label>
            <select
              id="fromUnit"
              value={fromUnit}
              onChange={handleFromUnitChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              <option value="g">Grams (g)</option>
              <option value="kg">Kilograms (kg)</option>
              <option value="oz_t">Troy Ounces (oz t)</option>
              <option value="oz">Ounces (oz)</option>
              <option value="lb">Pounds (lb)</option>
              <option value="dwt">Pennyweight (dwt)</option>
              <option value="grain">Grains</option>
              <option value="tola">Tola (India)</option>
              <option value="tael">Tael (China)</option>
              <option value="baht">Baht (Thailand)</option>
            </select>
          </div>
          
          {/* To Unit Selection */}
          <div>
            <label htmlFor="toUnit" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              To Unit
            </label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={handleToUnitChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              <option value="g">Grams (g)</option>
              <option value="kg">Kilograms (kg)</option>
              <option value="oz_t">Troy Ounces (oz t)</option>
              <option value="oz">Ounces (oz)</option>
              <option value="lb">Pounds (lb)</option>
              <option value="dwt">Pennyweight (dwt)</option>
              <option value="grain">Grains</option>
              <option value="tola">Tola (India)</option>
              <option value="tael">Tael (China)</option>
              <option value="baht">Baht (Thailand)</option>
            </select>
          </div>
          
          {/* Precision Selection */}
          <div>
            <label htmlFor="precision" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Decimal Places
            </label>
            <select
              id="precision"
              value={precision}
              onChange={handlePrecisionChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Result</h2>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {valueStr || '0'} {getUnitFullName(fromUnit)} equals
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {result.toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision })} {getUnitDisplayName(toUnit)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {getUnitFullName(toUnit)}
            </div>
          </div>
          
          <div className="calculator-button">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Common Gold Weight Conversions</h3>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li>1 troy ounce = 31.1035 grams</li>
              <li>1 troy ounce = 20 pennyweight (dwt)</li>
              <li>1 troy ounce = 480 grains</li>
              <li>1 tael (Hong Kong) = 37.429 grams</li>
              <li>1 tola (India) = 11.6638 grams</li>
              <li>1 baht (Thailand) = 15.244 grams</li>
            </ul>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Gold Weight Systems</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p>Gold is traditionally weighed using the troy weight system, which differs from the avoirdupois system used for everyday items.</p>
              <p className="mt-2">The troy ounce (oz t) is the standard unit for precious metals trading worldwide.</p>
              <p className="mt-2">Regional units like tola (India), tael (China), and baht (Thailand) are still commonly used in their respective regions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldWeightConverter; 