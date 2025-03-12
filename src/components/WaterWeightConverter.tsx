'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

interface WaterWeightConverterProps {
  calculator?: Calculator;
}

const WaterWeightConverter: React.FC<WaterWeightConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('gal_us');
  const [toUnit, setToUnit] = useState<string>('lb');
  const [precision, setPrecision] = useState<number>(2);
  const [temperature, setTemperature] = useState<number>(20); // Default 20°C
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Constants
  const WATER_DENSITY_20C = 998.2; // kg/m³ at 20°C
  
  // Conversion factors to liters (base volume unit)
  const volumeFactors: Record<string, number> = {
    'ml': 0.001,                 // milliliters
    'l': 1,                      // liters (base volume unit)
    'gal_us': 3.78541,           // US gallons
    'gal_uk': 4.54609,           // UK gallons
    'cu_ft': 28.3168,            // cubic feet
    'cu_in': 0.0163871,          // cubic inches
    'cu_m': 1000,                // cubic meters
  };
  
  // Conversion factors to kilograms (base weight unit)
  const weightFactors: Record<string, number> = {
    'kg': 1,                     // kilograms (base weight unit)
    'g': 0.001,                  // grams
    'lb': 0.453592,              // pounds
    'oz': 0.0283495,             // ounces
  };
  
  // Calculate water density based on temperature (simplified model)
  const getWaterDensity = (tempC: number): number => {
    // Simplified density model valid for 0-100°C
    // More accurate models exist but this is sufficient for most purposes
    return 1000 - 0.1 * (tempC - 4) ** 1.5;
  };
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertUnits();
  }, [valueStr, fromUnit, toUnit, precision, temperature]);
  
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
  
  // Handle temperature change
  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = Number(e.target.value);
    if (!isNaN(temp) && temp >= 0 && temp <= 100) {
      setTemperature(temp);
    }
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
  
  // Check if unit is a volume unit
  const isVolumeUnit = (unit: string): boolean => {
    return unit in volumeFactors;
  };
  
  // Check if unit is a weight unit
  const isWeightUnit = (unit: string): boolean => {
    return unit in weightFactors;
  };
  
  // Convert between units
  const convertUnits = () => {
    const value = valueStr === '' ? 0 : parseFloat(valueStr);
    const density = getWaterDensity(temperature) / 1000; // kg/L
    
    let result: number;
    
    if (isVolumeUnit(fromUnit) && isVolumeUnit(toUnit)) {
      // Volume to volume conversion
      const liters = value * volumeFactors[fromUnit];
      result = liters / volumeFactors[toUnit];
    } else if (isVolumeUnit(fromUnit) && isWeightUnit(toUnit)) {
      // Volume to weight conversion
      const liters = value * volumeFactors[fromUnit];
      const kg = liters * density;
      result = kg / weightFactors[toUnit];
    } else if (isWeightUnit(fromUnit) && isWeightUnit(toUnit)) {
      // Weight to weight conversion
      const kg = value * weightFactors[fromUnit];
      result = kg / weightFactors[toUnit];
    } else if (isWeightUnit(fromUnit) && isVolumeUnit(toUnit)) {
      // Weight to volume conversion
      const kg = value * weightFactors[fromUnit];
      const liters = kg / density;
      result = liters / volumeFactors[toUnit];
    } else {
      result = 0;
    }
    
    setResult(Number(result.toFixed(precision)));
  };
  
  // Get the display name for a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'ml': return 'mL';
      case 'l': return 'L';
      case 'gal_us': return 'gal (US)';
      case 'gal_uk': return 'gal (UK)';
      case 'cu_ft': return 'ft³';
      case 'cu_in': return 'in³';
      case 'cu_m': return 'm³';
      case 'kg': return 'kg';
      case 'g': return 'g';
      case 'lb': return 'lb';
      case 'oz': return 'oz';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'ml': return 'Milliliters';
      case 'l': return 'Liters';
      case 'gal_us': return 'Gallons (US)';
      case 'gal_uk': return 'Gallons (UK)';
      case 'cu_ft': return 'Cubic Feet';
      case 'cu_in': return 'Cubic Inches';
      case 'cu_m': return 'Cubic Meters';
      case 'kg': return 'Kilograms';
      case 'g': return 'Grams';
      case 'lb': return 'Pounds';
      case 'oz': return 'Ounces';
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
              <optgroup label="Volume">
                <option value="gal_us">Gallons (US)</option>
                <option value="gal_uk">Gallons (UK)</option>
                <option value="l">Liters (L)</option>
                <option value="ml">Milliliters (mL)</option>
                <option value="cu_ft">Cubic Feet (ft³)</option>
                <option value="cu_in">Cubic Inches (in³)</option>
                <option value="cu_m">Cubic Meters (m³)</option>
              </optgroup>
              <optgroup label="Weight">
                <option value="lb">Pounds (lb)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="oz">Ounces (oz)</option>
              </optgroup>
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
              <optgroup label="Volume">
                <option value="gal_us">Gallons (US)</option>
                <option value="gal_uk">Gallons (UK)</option>
                <option value="l">Liters (L)</option>
                <option value="ml">Milliliters (mL)</option>
                <option value="cu_ft">Cubic Feet (ft³)</option>
                <option value="cu_in">Cubic Inches (in³)</option>
                <option value="cu_m">Cubic Meters (m³)</option>
              </optgroup>
              <optgroup label="Weight">
                <option value="lb">Pounds (lb)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="oz">Ounces (oz)</option>
              </optgroup>
            </select>
          </div>
          
          {/* Temperature Input (for density adjustment) */}
          <div>
            <label htmlFor="temperature" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Water Temperature (°C)
            </label>
            <input
              type="tel"
              id="temperature"
              value={temperature}
              onChange={handleTemperatureChange} {...decimalInputProps}
              min="0"
              max="100"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
              placeholder="Enter temperature (°C)"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
              Water density varies with temperature. Current density: {getWaterDensity(temperature).toFixed(1)} kg/m³
            </p>
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
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Common Water Weight Conversions</h3>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li>1 liter of water = 1 kilogram (at 4°C)</li>
              <li>1 US gallon of water = 8.34 pounds (at 20°C)</li>
              <li>1 UK gallon of water = 10.02 pounds (at 20°C)</li>
              <li>1 cubic foot of water = 62.4 pounds (at 20°C)</li>
              <li>1 cubic meter of water = 1,000 kilograms = 2,204.6 pounds (at 4°C)</li>
            </ul>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Water Density and Temperature</h3>
            <div className={resultLabelClasses}>
              <p>Water's density varies with temperature:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>At 4°C: 1,000 kg/m³ (maximum density)</li>
                <li>At 20°C: 998.2 kg/m³ (room temperature)</li>
                <li>At 100°C: 958.4 kg/m³ (boiling point)</li>
              </ul>
              <p className="mt-2">The common saying "a pint's a pound the world around" is an approximation. A US pint of water weighs about 1.04 pounds.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterWeightConverter; 