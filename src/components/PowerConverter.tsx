'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

interface PowerConverterProps {
  calculator?: Calculator;
}

const PowerConverter: React.FC<PowerConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('w');
  const [toUnit, setToUnit] = useState<string>('hp');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Conversion factors to watts (base unit)
  const unitFactors: Record<string, number> = {
    'w': 1,                      // watts (base unit)
    'kw': 1000,                  // kilowatts
    'mw': 1000000,               // megawatts
    'hp': 745.7,                 // horsepower (mechanical/imperial)
    'hp_uk': 745.7,              // horsepower (UK)
    'ft_lb_s': 1.35582,          // foot-pounds per second
    'btu_h': 0.29307107,         // BTU per hour
    'cal_s': 4.184,              // calories per second
    'kcal_h': 1.163,             // kilocalories per hour
    'j_s': 1,                    // joules per second (same as watts)
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
    
    // Convert to watts first
    const watts = value * unitFactors[fromUnit];
    
    // Then convert to target unit
    const convertedValue = watts / unitFactors[toUnit];
    
    setResult(Number(convertedValue.toFixed(precision)));
  };
  
  // Get the display name for a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'w': return 'W';
      case 'kw': return 'kW';
      case 'mw': return 'MW';
      case 'hp': return 'hp';
      case 'hp_uk': return 'hp (UK)';
      case 'ft_lb_s': return 'ft·lb/s';
      case 'btu_h': return 'BTU/h';
      case 'cal_s': return 'cal/s';
      case 'kcal_h': return 'kcal/h';
      case 'j_s': return 'J/s';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'w': return 'Watts';
      case 'kw': return 'Kilowatts';
      case 'mw': return 'Megawatts';
      case 'hp': return 'Horsepower';
      case 'hp_uk': return 'Horsepower (UK)';
      case 'ft_lb_s': return 'Foot-pounds per second';
      case 'btu_h': return 'BTU per hour';
      case 'cal_s': return 'Calories per second';
      case 'kcal_h': return 'Kilocalories per hour';
      case 'j_s': return 'Joules per second';
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
              <option value="w">Watts (W)</option>
              <option value="kw">Kilowatts (kW)</option>
              <option value="mw">Megawatts (MW)</option>
              <option value="hp">Horsepower (hp)</option>
              <option value="hp_uk">Horsepower (UK)</option>
              <option value="ft_lb_s">Foot-pounds per second</option>
              <option value="btu_h">BTU per hour</option>
              <option value="cal_s">Calories per second</option>
              <option value="kcal_h">Kilocalories per hour</option>
              <option value="j_s">Joules per second</option>
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
              <option value="w">Watts (W)</option>
              <option value="kw">Kilowatts (kW)</option>
              <option value="mw">Megawatts (MW)</option>
              <option value="hp">Horsepower (hp)</option>
              <option value="hp_uk">Horsepower (UK)</option>
              <option value="ft_lb_s">Foot-pounds per second</option>
              <option value="btu_h">BTU per hour</option>
              <option value="cal_s">Calories per second</option>
              <option value="kcal_h">Kilocalories per hour</option>
              <option value="j_s">Joules per second</option>
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
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Common Power Conversions</h3>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li>1 horsepower = 745.7 watts</li>
              <li>1 kilowatt = 1.34102 horsepower</li>
              <li>1 kilowatt = 1,000 watts</li>
              <li>1 megawatt = 1,000 kilowatts</li>
              <li>1 BTU/hour = 0.29307 watts</li>
              <li>1 calorie/second = 4.184 watts</li>
              <li>1 foot-pound/second = 1.35582 watts</li>
            </ul>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">What is Power?</h3>
            <div className={resultLabelClasses}>
              <p>Power is the rate at which energy is transferred, used, or transformed. The SI unit of power is the watt (W), which is equal to one joule per second (J/s).</p>
              <p className="mt-2">Power is used in many contexts:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Electrical:</strong> Watts, kilowatts for electrical devices and systems</li>
                <li><strong>Mechanical:</strong> Horsepower for engines and motors</li>
                <li><strong>Thermal:</strong> BTU/hour for heating and cooling systems</li>
                <li><strong>Human:</strong> Calories per hour for metabolic processes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerConverter; 