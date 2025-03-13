'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface AccelerationConverterProps {
  calculator?: Calculator;
}

const AccelerationConverter: React.FC<AccelerationConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('mps2');
  const [toUnit, setToUnit] = useState<string>('g');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Conversion factors to m/s² (base unit)
  const unitFactors: Record<string, number> = {
    'mps2': 1,                  // meters per second squared (base unit)
    'g': 9.80665,               // standard gravity
    'ftps2': 0.3048,            // feet per second squared
    'inps2': 0.0254,            // inches per second squared
    'kmph2': 7.716e-4,          // kilometers per hour squared
    'mph2': 1.2417e-3,          // miles per hour squared
    'gal': 0.01,                // Gal (cm/s²)
    'kgf_per_kg': 9.80665,      // kilogram-force per kilogram
    'lbf_per_lb': 4.448222,     // pound-force per pound
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
    
    // Validate the input is a number (can be negative for deceleration)
    if (/^-?\d*\.?\d*$/.test(value)) {
      setValueStr(value);
    }
  };
  
  // Convert between units
  const convertUnits = () => {
    const value = valueStr === '' ? 0 : parseFloat(valueStr);
    
    // Convert to m/s² first (base unit)
    const mps2 = value * unitFactors[fromUnit];
    
    // Then convert to target unit
    const convertedValue = mps2 / unitFactors[toUnit];
    
    setResult(Number(convertedValue.toFixed(precision)));
  };
  
  // Get the display name of a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'mps2': return 'm/s²';
      case 'g': return 'g';
      case 'ftps2': return 'ft/s²';
      case 'inps2': return 'in/s²';
      case 'kmph2': return 'km/h²';
      case 'mph2': return 'mph/s';
      case 'gal': return 'Gal';
      case 'kgf_per_kg': return 'kgf/kg';
      case 'lbf_per_lb': return 'lbf/lb';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'mps2': return 'Meters per Second Squared';
      case 'g': return 'Standard Gravity';
      case 'ftps2': return 'Feet per Second Squared';
      case 'inps2': return 'Inches per Second Squared';
      case 'kmph2': return 'Kilometers per Hour Squared';
      case 'mph2': return 'Miles per Hour per Second';
      case 'gal': return 'Gal (Centimeters per Second Squared)';
      case 'kgf_per_kg': return 'Kilogram-force per Kilogram';
      case 'lbf_per_lb': return 'Pound-force per Pound';
      default: return unit;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="calculator-section-header">Acceleration Converter</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-300 mb-1">
                Value
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="value"
                  className="calculator-input"
                  value={valueStr}
                  onChange={handleValueChange} {...decimalInputProps}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-300 mb-1">
                From Unit
              </label>
              <select
                id="fromUnit"
                className="calculator-input"
                value={fromUnit}
                onChange={handleFromUnitChange}
              >
                <optgroup label="Metric Units">
                  <option value="mps2">Meters per Second² (m/s²)</option>
                  <option value="kmph2">Kilometers per Hour² (km/h²)</option>
                  <option value="gal">Gal (cm/s²)</option>
                </optgroup>
                <optgroup label="Imperial/US Units">
                  <option value="ftps2">Feet per Second² (ft/s²)</option>
                  <option value="inps2">Inches per Second² (in/s²)</option>
                  <option value="mph2">Miles per Hour per Second (mph/s)</option>
                </optgroup>
                <optgroup label="Other Units">
                  <option value="g">Standard Gravity (g)</option>
                  <option value="kgf_per_kg">Kilogram-force per Kilogram (kgf/kg)</option>
                  <option value="lbf_per_lb">Pound-force per Pound (lbf/lb)</option>
                </optgroup>
              </select>
            </div>
            
            <div>
              <label htmlFor="toUnit" className="block text-sm font-medium text-gray-300 mb-1">
                To Unit
              </label>
              <select
                id="toUnit"
                className="calculator-input"
                value={toUnit}
                onChange={handleToUnitChange}
              >
                <optgroup label="Metric Units">
                  <option value="mps2">Meters per Second² (m/s²)</option>
                  <option value="kmph2">Kilometers per Hour² (km/h²)</option>
                  <option value="gal">Gal (cm/s²)</option>
                </optgroup>
                <optgroup label="Imperial/US Units">
                  <option value="ftps2">Feet per Second² (ft/s²)</option>
                  <option value="inps2">Inches per Second² (in/s²)</option>
                  <option value="mph2">Miles per Hour per Second (mph/s)</option>
                </optgroup>
                <optgroup label="Other Units">
                  <option value="g">Standard Gravity (g)</option>
                  <option value="kgf_per_kg">Kilogram-force per Kilogram (kgf/kg)</option>
                  <option value="lbf_per_lb">Pound-force per Pound (lbf/lb)</option>
                </optgroup>
              </select>
            </div>
            
            <div>
              <label htmlFor="precision" className="block text-sm font-medium text-gray-300 mb-1">
                Decimal Precision
              </label>
              <select
                id="precision"
                className="calculator-input"
                value={precision}
                onChange={handlePrecisionChange}
              >
                <option value="0">0 decimal places</option>
                <option value="1">1 decimal place</option>
                <option value="2">2 decimal places</option>
                <option value="3">3 decimal places</option>
                <option value="4">4 decimal places</option>
                <option value="6">6 decimal places</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="calculator-section-header">Conversion Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Input Value</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {valueStr === '' ? '0' : valueStr} {getUnitDisplayName(fromUnit)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {getUnitFullName(fromUnit)}
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Converted Value</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {result.toFixed(precision)} {getUnitDisplayName(toUnit)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {getUnitFullName(toUnit)}
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {valueStr === '' ? '0' : valueStr} {getUnitDisplayName(fromUnit)} = {result.toFixed(precision)} {getUnitDisplayName(toUnit)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                1 {getUnitDisplayName(fromUnit)} = {(unitFactors[fromUnit] / unitFactors[toUnit]).toFixed(precision)} {getUnitDisplayName(toUnit)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="calculator-section-header">Common Acceleration Values</h3>
          
          <div className="overflow-x-auto">
            <table className="calculator-table">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Scenario
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    m/s²
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    g
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Earth's gravity
                  </td>
                  <td className="calculator-table-cell">
                    9.81
                  </td>
                  <td className="calculator-table-cell">
                    1.00
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Moon's gravity
                  </td>
                  <td className="calculator-table-cell">
                    1.62
                  </td>
                  <td className="calculator-table-cell">
                    0.17
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Mars' gravity
                  </td>
                  <td className="calculator-table-cell">
                    3.72
                  </td>
                  <td className="calculator-table-cell">
                    0.38
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Typical car (0-60 mph in 8s)
                  </td>
                  <td className="calculator-table-cell">
                    3.35
                  </td>
                  <td className="calculator-table-cell">
                    0.34
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Sports car (0-60 mph in 3s)
                  </td>
                  <td className="calculator-table-cell">
                    8.94
                  </td>
                  <td className="calculator-table-cell">
                    0.91
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Formula 1 car acceleration
                  </td>
                  <td className="calculator-table-cell">
                    15.00
                  </td>
                  <td className="calculator-table-cell">
                    1.53
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccelerationConverter; 