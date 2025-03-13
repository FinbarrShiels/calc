'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface HeightConverterProps {
  calculator?: Calculator;
}

const HeightConverter: React.FC<HeightConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('5.8');
  const [fromUnit, setFromUnit] = useState<string>('ft_in');
  const [toUnit, setToUnit] = useState<string>('cm');
  const [precision, setPrecision] = useState<number>(2);
  
  // Additional state for feet & inches input
  const [feet, setFeet] = useState<string>('5');
  const [inches, setInches] = useState<string>('8');
  
  // Result state
  const [result, setResult] = useState<number>(0);
  const [resultFeet, setResultFeet] = useState<number>(0);
  const [resultInches, setResultInches] = useState<number>(0);
  
  // Conversion factors to centimeters (base unit)
  const unitFactors: Record<string, number> = {
    'cm': 1,                     // centimeters (base unit)
    'm': 100,                    // meters
    'in': 2.54,                  // inches
    'ft': 30.48,                 // feet
    'yd': 91.44,                 // yards
    'mm': 0.1,                   // millimeters
  };
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertUnits();
  }, [valueStr, fromUnit, toUnit, precision, feet, inches]);
  
  // Handle from unit change
  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value;
    setFromUnit(newUnit);
    
    // If changing to or from ft_in, adjust the value
    if (newUnit === 'ft_in') {
      // Convert current value to feet and inches
      const cm = parseFloat(valueStr || '0') * unitFactors[fromUnit];
      const totalInches = cm / 2.54;
      const newFeet = Math.floor(totalInches / 12);
      const newInches = Math.round(totalInches % 12);
      
      setFeet(newFeet.toString());
      setInches(newInches.toString());
    } else if (fromUnit === 'ft_in') {
      // Convert from feet & inches to the new unit
      const totalInches = parseInt(feet || '0') * 12 + parseInt(inches || '0');
      const cm = totalInches * 2.54;
      const newValue = (cm / unitFactors[newUnit]).toFixed(2);
      
      setValueStr(newValue);
    }
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
  
  // Handle feet input change
  const handleFeetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setFeet('');
      return;
    }
    
    // Validate the input is a positive integer
    if (/^\d*$/.test(value)) {
      setFeet(value);
    }
  };
  
  // Handle inches input change
  const handleInchesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setInches('');
      return;
    }
    
    // Validate the input is a positive number
    if (/^\d*\.?\d*$/.test(value)) {
      setInches(value);
    }
  };
  
  // Convert between units
  const convertUnits = () => {
    let cm: number;
    
    // Convert from source unit to centimeters
    if (fromUnit === 'ft_in') {
      const totalFeet = parseFloat(feet || '0');
      const totalInches = parseFloat(inches || '0');
      cm = (totalFeet * 12 + totalInches) * 2.54;
    } else {
      const value = valueStr === '' ? 0 : parseFloat(valueStr);
      cm = value * unitFactors[fromUnit];
    }
    
    // Convert from centimeters to target unit
    if (toUnit === 'ft_in') {
      const totalInches = cm / 2.54;
      const feetPart = Math.floor(totalInches / 12);
      const inchesPart = totalInches % 12;
      
      setResultFeet(feetPart);
      setResultInches(Number(inchesPart.toFixed(precision)));
      setResult(0); // Not used for ft_in display
    } else {
      const convertedValue = cm / unitFactors[toUnit];
      setResult(Number(convertedValue.toFixed(precision)));
    }
  };
  
  // Get the display name for a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'cm': return 'cm';
      case 'm': return 'm';
      case 'in': return 'in';
      case 'ft': return 'ft';
      case 'ft_in': return 'ft in';
      case 'yd': return 'yd';
      case 'mm': return 'mm';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'cm': return 'Centimeters';
      case 'm': return 'Meters';
      case 'in': return 'Inches';
      case 'ft': return 'Feet';
      case 'ft_in': return 'Feet & Inches';
      case 'yd': return 'Yards';
      case 'mm': return 'Millimeters';
      default: return unit;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Input</h2>
          
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
              <option value="cm">Centimeters (cm)</option>
              <option value="m">Meters (m)</option>
              <option value="in">Inches (in)</option>
              <option value="ft">Feet (ft)</option>
              <option value="ft_in">Feet & Inches (ft' in")</option>
              <option value="yd">Yards (yd)</option>
              <option value="mm">Millimeters (mm)</option>
            </select>
          </div>
          
          {/* Value Input - conditional based on unit */}
          {fromUnit === 'ft_in' ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="feet" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  Feet
                </label>
                <input
                  type="tel"
                  id="feet"
                  value={feet}
                  onChange={handleFeetChange} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Feet"
                />
              </div>
              <div>
                <label htmlFor="inches" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  Inches
                </label>
                <input
                  type="tel"
                  id="inches"
                  value={inches}
                  onChange={handleInchesChange} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Inches"
                />
              </div>
            </div>
          ) : (
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
          )}
          
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
              <option value="cm">Centimeters (cm)</option>
              <option value="m">Meters (m)</option>
              <option value="in">Inches (in)</option>
              <option value="ft">Feet (ft)</option>
              <option value="ft_in">Feet & Inches (ft' in")</option>
              <option value="yd">Yards (yd)</option>
              <option value="mm">Millimeters (mm)</option>
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
            </select>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Result</h2>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {fromUnit === 'ft_in' ? 
                `${feet || '0'} feet ${inches || '0'} inches equals` : 
                `${valueStr || '0'} ${getUnitFullName(fromUnit)} equals`
              }
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {toUnit === 'ft_in' ? 
                `${resultFeet}' ${resultInches.toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision })}"` : 
                `${result.toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision })} ${getUnitDisplayName(toUnit)}`
              }
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {getUnitFullName(toUnit)}
            </div>
          </div>
          
          <div className="calculator-button">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Common Height Conversions</h3>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li>1 foot = 12 inches = 30.48 centimeters</li>
              <li>1 inch = 2.54 centimeters</li>
              <li>1 meter = 100 centimeters = 3.28084 feet</li>
              <li>1 yard = 3 feet = 91.44 centimeters</li>
              <li>5 feet 10 inches = 177.8 centimeters</li>
              <li>6 feet = 182.88 centimeters</li>
            </ul>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Height Measurement Systems</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p>The metric system (meters, centimeters) is used in most countries worldwide for measuring height.</p>
              <p className="mt-2">The imperial system (feet, inches) is commonly used in the United States and, to some extent, in the United Kingdom and Canada.</p>
              <p className="mt-2">Medical and scientific contexts often use centimeters or meters regardless of location.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeightConverter; 