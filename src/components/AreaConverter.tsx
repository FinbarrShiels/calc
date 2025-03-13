'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface AreaConverterProps {
  calculator?: Calculator;
}

const AreaConverter: React.FC<AreaConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('squareFeet');
  const [toUnit, setToUnit] = useState<string>('squareMeters');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Conversion factors to square meters (base unit)
  const unitFactors: Record<string, number> = {
    // Metric units
    'squareMillimeters': 0.000001,
    'squareCentimeters': 0.0001,
    'squareMeters': 1,
    'squareKilometers': 1000000,
    'hectares': 10000,
    'ares': 100,
    
    // Imperial/US units
    'squareInches': 0.00064516,
    'squareFeet': 0.09290304,
    'squareYards': 0.83612736,
    'squareMiles': 2589988.11,
    'acres': 4046.8564224,
    
    // Other units
    'squareRods': 25.2929,
    'squareChains': 404.6873,
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
    
    // Convert to square meters first (base unit)
    const squareMeters = value * unitFactors[fromUnit];
    
    // Then convert to target unit
    const convertedValue = squareMeters / unitFactors[toUnit];
    
    setResult(Number(convertedValue.toFixed(precision)));
  };
  
  // Get the display name of a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'squareMillimeters': return 'mm²';
      case 'squareCentimeters': return 'cm²';
      case 'squareMeters': return 'm²';
      case 'squareKilometers': return 'km²';
      case 'hectares': return 'ha';
      case 'ares': return 'a';
      case 'squareInches': return 'in²';
      case 'squareFeet': return 'ft²';
      case 'squareYards': return 'yd²';
      case 'squareMiles': return 'mi²';
      case 'acres': return 'ac';
      case 'squareRods': return 'sq rd';
      case 'squareChains': return 'sq ch';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'squareMillimeters': return 'Square Millimeters';
      case 'squareCentimeters': return 'Square Centimeters';
      case 'squareMeters': return 'Square Meters';
      case 'squareKilometers': return 'Square Kilometers';
      case 'hectares': return 'Hectares';
      case 'ares': return 'Ares';
      case 'squareInches': return 'Square Inches';
      case 'squareFeet': return 'Square Feet';
      case 'squareYards': return 'Square Yards';
      case 'squareMiles': return 'Square Miles';
      case 'acres': return 'Acres';
      case 'squareRods': return 'Square Rods';
      case 'squareChains': return 'Square Chains';
      default: return unit;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="calculator-section-header">Area Converter</h2>
        
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
                  <option value="squareMillimeters">Square Millimeters (mm²)</option>
                  <option value="squareCentimeters">Square Centimeters (cm²)</option>
                  <option value="squareMeters">Square Meters (m²)</option>
                  <option value="squareKilometers">Square Kilometers (km²)</option>
                  <option value="hectares">Hectares (ha)</option>
                  <option value="ares">Ares (a)</option>
                </optgroup>
                <optgroup label="Imperial/US Units">
                  <option value="squareInches">Square Inches (in²)</option>
                  <option value="squareFeet">Square Feet (ft²)</option>
                  <option value="squareYards">Square Yards (yd²)</option>
                  <option value="squareMiles">Square Miles (mi²)</option>
                  <option value="acres">Acres (ac)</option>
                </optgroup>
                <optgroup label="Other Units">
                  <option value="squareRods">Square Rods (sq rd)</option>
                  <option value="squareChains">Square Chains (sq ch)</option>
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
                  <option value="squareMillimeters">Square Millimeters (mm²)</option>
                  <option value="squareCentimeters">Square Centimeters (cm²)</option>
                  <option value="squareMeters">Square Meters (m²)</option>
                  <option value="squareKilometers">Square Kilometers (km²)</option>
                  <option value="hectares">Hectares (ha)</option>
                  <option value="ares">Ares (a)</option>
                </optgroup>
                <optgroup label="Imperial/US Units">
                  <option value="squareInches">Square Inches (in²)</option>
                  <option value="squareFeet">Square Feet (ft²)</option>
                  <option value="squareYards">Square Yards (yd²)</option>
                  <option value="squareMiles">Square Miles (mi²)</option>
                  <option value="acres">Acres (ac)</option>
                </optgroup>
                <optgroup label="Other Units">
                  <option value="squareRods">Square Rods (sq rd)</option>
                  <option value="squareChains">Square Chains (sq ch)</option>
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
                <option value="8">8 decimal places</option>
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
          <h3 className="calculator-section-header">Common Area Conversions</h3>
          
          <div className="overflow-x-auto">
            <table className="calculator-table">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Unit
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Square Meters
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Acres
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Square Meter
                  </td>
                  <td className="calculator-table-cell">
                    m²
                  </td>
                  <td className="calculator-table-cell">
                    1
                  </td>
                  <td className="calculator-table-cell">
                    0.000247105
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Square Foot
                  </td>
                  <td className="calculator-table-cell">
                    ft²
                  </td>
                  <td className="calculator-table-cell">
                    0.09290304
                  </td>
                  <td className="calculator-table-cell">
                    0.00002296
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Acre
                  </td>
                  <td className="calculator-table-cell">
                    ac
                  </td>
                  <td className="calculator-table-cell">
                    4046.8564224
                  </td>
                  <td className="calculator-table-cell">
                    1
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Hectare
                  </td>
                  <td className="calculator-table-cell">
                    ha
                  </td>
                  <td className="calculator-table-cell">
                    10000
                  </td>
                  <td className="calculator-table-cell">
                    2.47105
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Square Mile
                  </td>
                  <td className="calculator-table-cell">
                    mi²
                  </td>
                  <td className="calculator-table-cell">
                    2589988.11
                  </td>
                  <td className="calculator-table-cell">
                    640
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Square Yard
                  </td>
                  <td className="calculator-table-cell">
                    yd²
                  </td>
                  <td className="calculator-table-cell">
                    0.83612736
                  </td>
                  <td className="calculator-table-cell">
                    0.000206612
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

export default AreaConverter; 