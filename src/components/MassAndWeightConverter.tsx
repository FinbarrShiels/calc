'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface MassAndWeightConverterProps {
  calculator?: Calculator;
}

const MassAndWeightConverter: React.FC<MassAndWeightConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('kg');
  const [toUnit, setToUnit] = useState<string>('lb');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Conversion factors to grams (base unit)
  const unitFactors: Record<string, number> = {
    'kg': 1000,                  // kilograms
    'g': 1,                      // grams (base unit)
    'mg': 0.001,                 // milligrams
    'lb': 453.59237,             // pounds
    'oz': 28.349523125,          // ounces
    'st': 6350.29318,            // stones
    'ton': 1000000,              // metric tons
    'ton_us': 907184.74,         // US tons (short tons)
    'ton_uk': 1016046.9088,      // UK tons (long tons)
    'ct': 0.2,                   // carats
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
      case 'kg': return 'kg';
      case 'g': return 'g';
      case 'mg': return 'mg';
      case 'lb': return 'lb';
      case 'oz': return 'oz';
      case 'st': return 'st';
      case 'ton': return 't';
      case 'ton_us': return 'ton (US)';
      case 'ton_uk': return 'ton (UK)';
      case 'ct': return 'ct';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'kg': return 'Kilograms';
      case 'g': return 'Grams';
      case 'mg': return 'Milligrams';
      case 'lb': return 'Pounds';
      case 'oz': return 'Ounces';
      case 'st': return 'Stones';
      case 'ton': return 'Metric Tons';
      case 'ton_us': return 'US Tons';
      case 'ton_uk': return 'UK Tons';
      case 'ct': return 'Carats';
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
              <option value="kg">Kilograms (kg)</option>
              <option value="g">Grams (g)</option>
              <option value="mg">Milligrams (mg)</option>
              <option value="lb">Pounds (lb)</option>
              <option value="oz">Ounces (oz)</option>
              <option value="st">Stones (st)</option>
              <option value="ton">Tons (metric)</option>
              <option value="ton_us">Tons (US)</option>
              <option value="ton_uk">Tons (UK)</option>
              <option value="ct">Carats (ct)</option>
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
              <option value="kg">Kilograms (kg)</option>
              <option value="g">Grams (g)</option>
              <option value="mg">Milligrams (mg)</option>
              <option value="lb">Pounds (lb)</option>
              <option value="oz">Ounces (oz)</option>
              <option value="st">Stones (st)</option>
              <option value="ton">Tons (metric)</option>
              <option value="ton_us">Tons (US)</option>
              <option value="ton_uk">Tons (UK)</option>
              <option value="ct">Carats (ct)</option>
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
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Common Mass Conversions</h3>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li>1 kilogram = 2.20462 pounds</li>
              <li>1 pound = 16 ounces = 453.592 grams</li>
              <li>1 stone = 14 pounds = 6.35029 kilograms</li>
              <li>1 metric ton = 1,000 kilograms = 2,204.62 pounds</li>
              <li>1 US ton = 2,000 pounds = 907.185 kilograms</li>
              <li>1 UK ton = 2,240 pounds = 1,016.05 kilograms</li>
              <li>1 carat = 0.2 grams = 200 milligrams</li>
            </ul>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Mass vs. Weight</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p>Mass is a measure of the amount of matter in an object, while weight is a measure of the force of gravity acting on that mass.</p>
              <p className="mt-2">On Earth, mass and weight are often used interchangeably, but they are different physical quantities. An object's mass remains constant regardless of location, while its weight varies depending on the gravitational field.</p>
              <p className="mt-2">The SI unit for mass is the kilogram (kg), while weight is measured in newtons (N).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MassAndWeightConverter; 