'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface FuelConsumptionConverterProps {
  calculator?: Calculator;
}

const FuelConsumptionConverter: React.FC<FuelConsumptionConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('mpg_us');
  const [toUnit, setToUnit] = useState<string>('l_100km');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Constants for conversions
  const LITERS_PER_US_GALLON = 3.78541;
  const LITERS_PER_UK_GALLON = 4.54609;
  const KM_PER_MILE = 1.60934;
  
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
    
    // Skip calculation if value is 0 (to avoid division by zero)
    if (value === 0) {
      setResult(0);
      return;
    }
    
    // First convert to L/100km (our base unit for calculations)
    let baseValue: number;
    
    switch (fromUnit) {
      case 'mpg_us':
        baseValue = (100 * LITERS_PER_US_GALLON) / (value * KM_PER_MILE);
        break;
      case 'mpg_uk':
        baseValue = (100 * LITERS_PER_UK_GALLON) / (value * KM_PER_MILE);
        break;
      case 'l_100km':
        baseValue = value;
        break;
      case 'km_l':
        baseValue = 100 / value;
        break;
      case 'miles_l':
        baseValue = 100 / (value * KM_PER_MILE);
        break;
      case 'gal_100miles':
        baseValue = value * LITERS_PER_US_GALLON / KM_PER_MILE;
        break;
      default:
        baseValue = 0;
    }
    
    // Then convert from L/100km to target unit
    let convertedValue: number;
    
    switch (toUnit) {
      case 'mpg_us':
        convertedValue = (100 * LITERS_PER_US_GALLON) / (baseValue * KM_PER_MILE);
        break;
      case 'mpg_uk':
        convertedValue = (100 * LITERS_PER_UK_GALLON) / (baseValue * KM_PER_MILE);
        break;
      case 'l_100km':
        convertedValue = baseValue;
        break;
      case 'km_l':
        convertedValue = 100 / baseValue;
        break;
      case 'miles_l':
        convertedValue = (100 / baseValue) / KM_PER_MILE;
        break;
      case 'gal_100miles':
        convertedValue = (baseValue * KM_PER_MILE) / LITERS_PER_US_GALLON;
        break;
      default:
        convertedValue = 0;
    }
    
    setResult(Number(convertedValue.toFixed(precision)));
  };
  
  // Get the display name for a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'mpg_us': return 'MPG (US)';
      case 'mpg_uk': return 'MPG (UK)';
      case 'l_100km': return 'L/100km';
      case 'km_l': return 'km/L';
      case 'miles_l': return 'miles/L';
      case 'gal_100miles': return 'gal/100mi';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'mpg_us': return 'Miles per gallon (US)';
      case 'mpg_uk': return 'Miles per gallon (UK)';
      case 'l_100km': return 'Liters per 100 kilometers';
      case 'km_l': return 'Kilometers per liter';
      case 'miles_l': return 'Miles per liter';
      case 'gal_100miles': return 'Gallons per 100 miles (US)';
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
              <option value="mpg_us">Miles per gallon (US)</option>
              <option value="mpg_uk">Miles per gallon (UK)</option>
              <option value="l_100km">Liters per 100 km (L/100km)</option>
              <option value="km_l">Kilometers per liter (km/L)</option>
              <option value="miles_l">Miles per liter (miles/L)</option>
              <option value="gal_100miles">Gallons per 100 miles (US)</option>
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
              <option value="mpg_us">Miles per gallon (US)</option>
              <option value="mpg_uk">Miles per gallon (UK)</option>
              <option value="l_100km">Liters per 100 km (L/100km)</option>
              <option value="km_l">Kilometers per liter (km/L)</option>
              <option value="miles_l">Miles per liter (miles/L)</option>
              <option value="gal_100miles">Gallons per 100 miles (US)</option>
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
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Common Conversions</h3>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li>1 US gallon = 3.78541 liters</li>
              <li>1 UK gallon = 4.54609 liters</li>
              <li>1 mile = 1.60934 kilometers</li>
              <li>To convert from MPG (US) to L/100km: 235.215 ÷ MPG</li>
              <li>To convert from L/100km to MPG (US): 235.215 ÷ L/100km</li>
            </ul>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Regional Usage</h3>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li><strong>USA:</strong> Miles per gallon (MPG)</li>
              <li><strong>UK:</strong> Miles per gallon (MPG)</li>
              <li><strong>Europe:</strong> Liters per 100 kilometers (L/100km)</li>
              <li><strong>Japan:</strong> Kilometers per liter (km/L)</li>
              <li><strong>Australia:</strong> Liters per 100 kilometers (L/100km)</li>
              <li><strong>Canada:</strong> Liters per 100 kilometers (L/100km)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelConsumptionConverter; 