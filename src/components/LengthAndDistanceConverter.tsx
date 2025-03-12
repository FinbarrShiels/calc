'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

interface LengthAndDistanceConverterProps {
  calculator?: Calculator;
}

const LengthAndDistanceConverter: React.FC<LengthAndDistanceConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('km');
  const [toUnit, setToUnit] = useState<string>('mi');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Conversion factors to meters (base unit)
  const unitFactors: Record<string, number> = {
    'mm': 0.001,                 // millimeters
    'cm': 0.01,                  // centimeters
    'm': 1,                      // meters (base unit)
    'km': 1000,                  // kilometers
    'in': 0.0254,                // inches
    'ft': 0.3048,                // feet
    'yd': 0.9144,                // yards
    'mi': 1609.34,               // miles
    'nm': 1852,                  // nautical miles
    'league': 4828.03,           // leagues (3 miles)
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
    
    // Convert to meters first
    const meters = value * unitFactors[fromUnit];
    
    // Then convert to target unit
    const convertedValue = meters / unitFactors[toUnit];
    
    setResult(Number(convertedValue.toFixed(precision)));
  };
  
  // Get the display name for a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'mm': return 'mm';
      case 'cm': return 'cm';
      case 'm': return 'm';
      case 'km': return 'km';
      case 'in': return 'in';
      case 'ft': return 'ft';
      case 'yd': return 'yd';
      case 'mi': return 'mi';
      case 'nm': return 'nm';
      case 'league': return 'league';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'mm': return 'Millimeters';
      case 'cm': return 'Centimeters';
      case 'm': return 'Meters';
      case 'km': return 'Kilometers';
      case 'in': return 'Inches';
      case 'ft': return 'Feet';
      case 'yd': return 'Yards';
      case 'mi': return 'Miles';
      case 'nm': return 'Nautical Miles';
      case 'league': return 'Leagues';
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
              <option value="mm">Millimeters (mm)</option>
              <option value="cm">Centimeters (cm)</option>
              <option value="m">Meters (m)</option>
              <option value="km">Kilometers (km)</option>
              <option value="in">Inches (in)</option>
              <option value="ft">Feet (ft)</option>
              <option value="yd">Yards (yd)</option>
              <option value="mi">Miles (mi)</option>
              <option value="nm">Nautical Miles (nm)</option>
              <option value="league">Leagues</option>
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
              <option value="mm">Millimeters (mm)</option>
              <option value="cm">Centimeters (cm)</option>
              <option value="m">Meters (m)</option>
              <option value="km">Kilometers (km)</option>
              <option value="in">Inches (in)</option>
              <option value="ft">Feet (ft)</option>
              <option value="yd">Yards (yd)</option>
              <option value="mi">Miles (mi)</option>
              <option value="nm">Nautical Miles (nm)</option>
              <option value="league">Leagues</option>
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
            <div className={resultLabelClasses}>
              {valueStr || '0'} {getUnitFullName(fromUnit)} equals
            </div>
            <div className={resultValueClasses}>
              {result.toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision })} {getUnitDisplayName(toUnit)}
            </div>
            <div className={resultLabelClasses}>
              {getUnitFullName(toUnit)}
            </div>
          </div>
          
          <div className={buttonClasses}>
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Common Length Conversions</h3>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li>1 inch = 2.54 centimeters</li>
              <li>1 foot = 0.3048 meters</li>
              <li>1 yard = 0.9144 meters</li>
              <li>1 mile = 1.60934 kilometers</li>
              <li>1 nautical mile = 1.852 kilometers</li>
              <li>1 meter = 3.28084 feet</li>
              <li>1 kilometer = 0.621371 miles</li>
            </ul>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Length Measurement Systems</h3>
            <div className={resultLabelClasses}>
              <p>The metric system (meters, kilometers) is used in most countries worldwide for measuring distance.</p>
              <p className="mt-2">The imperial system (feet, miles) is commonly used in the United States and, to some extent, in the United Kingdom.</p>
              <p className="mt-2">Nautical miles are used in aviation and maritime navigation worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LengthAndDistanceConverter; 