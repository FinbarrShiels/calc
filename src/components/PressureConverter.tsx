'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

interface PressureConverterProps {
  calculator?: Calculator;
}

const PressureConverter: React.FC<PressureConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('bar');
  const [toUnit, setToUnit] = useState<string>('psi');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Conversion factors to pascals (base unit)
  const unitFactors: Record<string, number> = {
    'pa': 1,                     // pascals (base unit)
    'kpa': 1000,                 // kilopascals
    'mpa': 1000000,              // megapascals
    'bar': 100000,               // bars
    'psi': 6894.76,              // pounds per square inch
    'atm': 101325,               // atmospheres
    'torr': 133.322,             // torr
    'mmhg': 133.322,             // millimeters of mercury
    'inhg': 3386.39,             // inches of mercury
    'mmh2o': 9.80665,            // millimeters of water
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
    
    // Convert to pascals first
    const pascals = value * unitFactors[fromUnit];
    
    // Then convert to target unit
    const convertedValue = pascals / unitFactors[toUnit];
    
    setResult(Number(convertedValue.toFixed(precision)));
  };
  
  // Get the display name for a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'pa': return 'Pa';
      case 'kpa': return 'kPa';
      case 'mpa': return 'MPa';
      case 'bar': return 'bar';
      case 'psi': return 'psi';
      case 'atm': return 'atm';
      case 'torr': return 'Torr';
      case 'mmhg': return 'mmHg';
      case 'inhg': return 'inHg';
      case 'mmh2o': return 'mmH₂O';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'pa': return 'Pascals';
      case 'kpa': return 'Kilopascals';
      case 'mpa': return 'Megapascals';
      case 'bar': return 'Bars';
      case 'psi': return 'Pounds per square inch';
      case 'atm': return 'Atmospheres';
      case 'torr': return 'Torr';
      case 'mmhg': return 'Millimeters of mercury';
      case 'inhg': return 'Inches of mercury';
      case 'mmh2o': return 'Millimeters of water';
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
              <option value="pa">Pascals (Pa)</option>
              <option value="kpa">Kilopascals (kPa)</option>
              <option value="mpa">Megapascals (MPa)</option>
              <option value="bar">Bars</option>
              <option value="psi">Pounds per square inch (psi)</option>
              <option value="atm">Atmospheres (atm)</option>
              <option value="torr">Torr</option>
              <option value="mmhg">Millimeters of mercury (mmHg)</option>
              <option value="inhg">Inches of mercury (inHg)</option>
              <option value="mmh2o">Millimeters of water (mmH₂O)</option>
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
              <option value="pa">Pascals (Pa)</option>
              <option value="kpa">Kilopascals (kPa)</option>
              <option value="mpa">Megapascals (MPa)</option>
              <option value="bar">Bars</option>
              <option value="psi">Pounds per square inch (psi)</option>
              <option value="atm">Atmospheres (atm)</option>
              <option value="torr">Torr</option>
              <option value="mmhg">Millimeters of mercury (mmHg)</option>
              <option value="inhg">Inches of mercury (inHg)</option>
              <option value="mmh2o">Millimeters of water (mmH₂O)</option>
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
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Common Pressure Conversions</h3>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li>1 bar = 100,000 pascals</li>
              <li>1 bar = 14.5038 psi</li>
              <li>1 atmosphere = 101,325 pascals</li>
              <li>1 atmosphere = 1.01325 bar</li>
              <li>1 atmosphere = 14.6959 psi</li>
              <li>1 atmosphere = 760 mmHg</li>
              <li>1 psi = 6,894.76 pascals</li>
              <li>1 psi = 0.068948 bar</li>
              <li>1 psi = 2.03602 inHg</li>
            </ul>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Pressure Applications</h3>
            <div className={resultLabelClasses}>
              <p>Pressure is force per unit area. The SI unit of pressure is the pascal (Pa), which is equal to one newton per square meter (N/m²).</p>
              <p className="mt-2">Different pressure units are used in various fields:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Meteorology:</strong> Millibars, inches of mercury</li>
                <li><strong>Engineering:</strong> Pascals, bars, psi</li>
                <li><strong>Medicine:</strong> mmHg for blood pressure</li>
                <li><strong>Diving:</strong> Atmospheres, bars</li>
                <li><strong>Tire pressure:</strong> psi, bars, kPa</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressureConverter; 