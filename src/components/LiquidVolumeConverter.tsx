'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

interface LiquidVolumeConverterProps {
  calculator?: Calculator;
}

const LiquidVolumeConverter: React.FC<LiquidVolumeConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('l');
  const [toUnit, setToUnit] = useState<string>('gal_us');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Conversion factors to milliliters (base unit)
  const unitFactors: Record<string, number> = {
    'ml': 1,                     // milliliters (base unit)
    'l': 1000,                   // liters
    'fl_oz_us': 29.5735,         // US fluid ounces
    'fl_oz_uk': 28.4131,         // UK fluid ounces
    'cup_us': 236.588,           // US cups
    'cup_uk': 284.131,           // UK cups
    'pint_us': 473.176,          // US pints
    'pint_uk': 568.261,          // UK pints
    'quart_us': 946.353,         // US quarts
    'quart_uk': 1136.52,         // UK quarts
    'gal_us': 3785.41,           // US gallons
    'gal_uk': 4546.09,           // UK gallons
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
    
    // Convert to milliliters first
    const milliliters = value * unitFactors[fromUnit];
    
    // Then convert to target unit
    const convertedValue = milliliters / unitFactors[toUnit];
    
    setResult(Number(convertedValue.toFixed(precision)));
  };
  
  // Get the display name for a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'ml': return 'ml';
      case 'l': return 'L';
      case 'fl_oz_us': return 'fl oz (US)';
      case 'fl_oz_uk': return 'fl oz (UK)';
      case 'cup_us': return 'cup (US)';
      case 'cup_uk': return 'cup (UK)';
      case 'pint_us': return 'pt (US)';
      case 'pint_uk': return 'pt (UK)';
      case 'quart_us': return 'qt (US)';
      case 'quart_uk': return 'qt (UK)';
      case 'gal_us': return 'gal (US)';
      case 'gal_uk': return 'gal (UK)';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'ml': return 'Milliliters';
      case 'l': return 'Liters';
      case 'fl_oz_us': return 'Fluid Ounces (US)';
      case 'fl_oz_uk': return 'Fluid Ounces (UK)';
      case 'cup_us': return 'Cups (US)';
      case 'cup_uk': return 'Cups (UK)';
      case 'pint_us': return 'Pints (US)';
      case 'pint_uk': return 'Pints (UK)';
      case 'quart_us': return 'Quarts (US)';
      case 'quart_uk': return 'Quarts (UK)';
      case 'gal_us': return 'Gallons (US)';
      case 'gal_uk': return 'Gallons (UK)';
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
              <option value="ml">Milliliters (ml)</option>
              <option value="l">Liters (L)</option>
              <option value="fl_oz_us">Fluid Ounces (US)</option>
              <option value="fl_oz_uk">Fluid Ounces (UK)</option>
              <option value="cup_us">Cups (US)</option>
              <option value="cup_uk">Cups (UK)</option>
              <option value="pint_us">Pints (US)</option>
              <option value="pint_uk">Pints (UK)</option>
              <option value="quart_us">Quarts (US)</option>
              <option value="quart_uk">Quarts (UK)</option>
              <option value="gal_us">Gallons (US)</option>
              <option value="gal_uk">Gallons (UK)</option>
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
              <option value="ml">Milliliters (ml)</option>
              <option value="l">Liters (L)</option>
              <option value="fl_oz_us">Fluid Ounces (US)</option>
              <option value="fl_oz_uk">Fluid Ounces (UK)</option>
              <option value="cup_us">Cups (US)</option>
              <option value="cup_uk">Cups (UK)</option>
              <option value="pint_us">Pints (US)</option>
              <option value="pint_uk">Pints (UK)</option>
              <option value="quart_us">Quarts (US)</option>
              <option value="quart_uk">Quarts (UK)</option>
              <option value="gal_us">Gallons (US)</option>
              <option value="gal_uk">Gallons (UK)</option>
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
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Common Volume Conversions</h3>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li>1 US gallon = 3.78541 liters</li>
              <li>1 UK gallon = 4.54609 liters</li>
              <li>1 liter = 33.814 US fluid ounces</li>
              <li>1 liter = 35.1951 UK fluid ounces</li>
              <li>1 US cup = 236.588 milliliters</li>
              <li>1 UK cup = 284.131 milliliters</li>
              <li>1 US pint = 473.176 milliliters</li>
              <li>1 UK pint = 568.261 milliliters</li>
            </ul>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">US vs. UK Measurements</h3>
            <div className={resultLabelClasses}>
              <p>US and UK liquid volume measurements use the same names but represent different volumes:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>US fluid ounce = 29.5735 ml</li>
                <li>UK fluid ounce = 28.4131 ml</li>
                <li>US gallon = 3.78541 liters</li>
                <li>UK gallon = 4.54609 liters</li>
              </ul>
              <p className="mt-2">The metric system (liters, milliliters) is used in most countries worldwide for measuring liquid volume.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidVolumeConverter; 