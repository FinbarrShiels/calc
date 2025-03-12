'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

interface EnergyConverterProps {
  calculator?: Calculator;
}

const EnergyConverter: React.FC<EnergyConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('j');
  const [toUnit, setToUnit] = useState<string>('kcal');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Conversion factors to joules (base unit)
  const unitFactors: Record<string, number> = {
    'j': 1,                      // joules (base unit)
    'kj': 1000,                  // kilojoules
    'cal': 4.184,                // calories
    'kcal': 4184,                // kilocalories (food calories)
    'wh': 3600,                  // watt-hours
    'kwh': 3600000,              // kilowatt-hours
    'mwh': 3600000000,           // megawatt-hours
    'btu': 1055.06,              // British Thermal Units
    'therm': 105506000,          // therms (100,000 BTU)
    'ft_lb': 1.35582,            // foot-pounds
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
    
    // Convert to joules first
    const joules = value * unitFactors[fromUnit];
    
    // Then convert to target unit
    const convertedValue = joules / unitFactors[toUnit];
    
    setResult(Number(convertedValue.toFixed(precision)));
  };
  
  // Get the display name for a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'j': return 'J';
      case 'kj': return 'kJ';
      case 'cal': return 'cal';
      case 'kcal': return 'kcal';
      case 'wh': return 'Wh';
      case 'kwh': return 'kWh';
      case 'mwh': return 'MWh';
      case 'btu': return 'BTU';
      case 'therm': return 'therm';
      case 'ft_lb': return 'ft⋅lb';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'j': return 'Joules';
      case 'kj': return 'Kilojoules';
      case 'cal': return 'Calories';
      case 'kcal': return 'Kilocalories (food calories)';
      case 'wh': return 'Watt-hours';
      case 'kwh': return 'Kilowatt-hours';
      case 'mwh': return 'Megawatt-hours';
      case 'btu': return 'British Thermal Units';
      case 'therm': return 'Therms';
      case 'ft_lb': return 'Foot-pounds';
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
              <option value="j">Joules (J)</option>
              <option value="kj">Kilojoules (kJ)</option>
              <option value="cal">Calories (cal)</option>
              <option value="kcal">Kilocalories (kcal)</option>
              <option value="wh">Watt-hours (Wh)</option>
              <option value="kwh">Kilowatt-hours (kWh)</option>
              <option value="mwh">Megawatt-hours (MWh)</option>
              <option value="btu">British Thermal Units (BTU)</option>
              <option value="therm">Therms</option>
              <option value="ft_lb">Foot-pounds (ft⋅lb)</option>
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
              <option value="j">Joules (J)</option>
              <option value="kj">Kilojoules (kJ)</option>
              <option value="cal">Calories (cal)</option>
              <option value="kcal">Kilocalories (kcal)</option>
              <option value="wh">Watt-hours (Wh)</option>
              <option value="kwh">Kilowatt-hours (kWh)</option>
              <option value="mwh">Megawatt-hours (MWh)</option>
              <option value="btu">British Thermal Units (BTU)</option>
              <option value="therm">Therms</option>
              <option value="ft_lb">Foot-pounds (ft⋅lb)</option>
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
              <option value={7}>7</option>
              <option value={8}>8</option>
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
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Common Conversions</h3>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li>1 kJ = 1,000 J</li>
              <li>1 kcal = 4,184 J</li>
              <li>1 kWh = 3,600,000 J</li>
              <li>1 BTU = 1,055.06 J</li>
              <li>1 therm = 105,506,000 J</li>
            </ul>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Formula</h3>
            <div className={resultLabelClasses}>
              <p>1. Convert from input unit to joules (base unit)</p>
              <p>2. Convert from joules to output unit</p>
              <p className="mt-2 font-mono bg-gray-100/50 dark:bg-gray-800/50 dark:bg-card p-2 rounded">
                result = (value × factor₁) ÷ factor₂
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyConverter; 