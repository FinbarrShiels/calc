'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface VelocityConverterProps {
  calculator?: Calculator;
}

const VelocityConverter: React.FC<VelocityConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('km_h');
  const [toUnit, setToUnit] = useState<string>('mph');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Constants
  const SPEED_OF_LIGHT = 299792458; // meters per second
  const SPEED_OF_SOUND = 343; // meters per second at 20°C
  
  // Conversion factors to meters per second (base unit)
  const unitFactors: Record<string, number> = {
    'm_s': 1,                    // meters per second (base unit)
    'km_h': 1/3.6,               // kilometers per hour
    'mph': 0.44704,              // miles per hour
    'ft_s': 0.3048,              // feet per second
    'knot': 0.514444,            // knots (nautical miles per hour)
    'mach': SPEED_OF_SOUND,      // Mach (speed of sound)
    'c': SPEED_OF_LIGHT,         // c (speed of light)
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
    
    // Convert to meters per second first
    const metersPerSecond = value * unitFactors[fromUnit];
    
    // Then convert to target unit
    const convertedValue = metersPerSecond / unitFactors[toUnit];
    
    setResult(Number(convertedValue.toFixed(precision)));
  };
  
  // Get the display name for a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'm_s': return 'm/s';
      case 'km_h': return 'km/h';
      case 'mph': return 'mph';
      case 'ft_s': return 'ft/s';
      case 'knot': return 'knot';
      case 'mach': return 'Mach';
      case 'c': return 'c';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'm_s': return 'Meters per second';
      case 'km_h': return 'Kilometers per hour';
      case 'mph': return 'Miles per hour';
      case 'ft_s': return 'Feet per second';
      case 'knot': return 'Knots';
      case 'mach': return 'Mach';
      case 'c': return 'Speed of light';
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
              <option value="m_s">Meters per second (m/s)</option>
              <option value="km_h">Kilometers per hour (km/h)</option>
              <option value="mph">Miles per hour (mph)</option>
              <option value="ft_s">Feet per second (ft/s)</option>
              <option value="knot">Knots</option>
              <option value="mach">Mach</option>
              <option value="c">Speed of light (c)</option>
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
              <option value="m_s">Meters per second (m/s)</option>
              <option value="km_h">Kilometers per hour (km/h)</option>
              <option value="mph">Miles per hour (mph)</option>
              <option value="ft_s">Feet per second (ft/s)</option>
              <option value="knot">Knots</option>
              <option value="mach">Mach</option>
              <option value="c">Speed of light (c)</option>
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
              <option value={9}>9</option>
              <option value={12}>12</option>
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
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Common Velocity Conversions</h3>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li>1 m/s = 3.6 km/h = 2.237 mph</li>
              <li>1 km/h = 0.278 m/s = 0.621 mph</li>
              <li>1 mph = 0.447 m/s = 1.609 km/h</li>
              <li>1 knot = 0.514 m/s = 1.852 km/h = 1.151 mph</li>
              <li>1 Mach = 343 m/s = 1,235 km/h = 767 mph (at 20°C)</li>
              <li>1 c (speed of light) = 299,792,458 m/s</li>
            </ul>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Velocity Units in Different Contexts</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Everyday travel:</strong> km/h (most countries) or mph (US, UK)</li>
                <li><strong>Scientific contexts:</strong> m/s (SI unit)</li>
                <li><strong>Aviation and maritime:</strong> knots (nautical miles per hour)</li>
                <li><strong>Aeronautics:</strong> Mach number (ratio to speed of sound)</li>
                <li><strong>Physics:</strong> c (speed of light) for relativistic contexts</li>
              </ul>
              <p className="mt-2">Note: The speed of sound (Mach 1) varies with temperature and altitude. This converter uses 343 m/s, which is the speed of sound in air at 20°C at sea level.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VelocityConverter; 