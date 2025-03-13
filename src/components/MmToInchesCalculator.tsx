'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';


interface MmToInchesCalculatorProps {
  calculator?: Calculator;
}

const MmToInchesCalculator: React.FC<MmToInchesCalculatorProps> = ({ calculator }) => {
  // Input state
  const [mmStr, setMmStr] = useState<string>('100');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [inches, setInches] = useState<number>(0);
  const [fractionalInches, setFractionalInches] = useState<string>('');
  
  // Constants for conversion
  const INCHES_PER_MM = 0.0393701;
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertMmToInches();
  }, [mmStr, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle input change with proper validation
  const handleMmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setMmStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setMmStr(value);
    }
  };
  
  // Convert mm to inches
  const convertMmToInches = () => {
    const mm = mmStr === '' ? 0 : parseFloat(mmStr);
    const inchesValue = mm * INCHES_PER_MM;
    setInches(Number(inchesValue.toFixed(precision)));
    
    // Calculate fractional inches
    setFractionalInches(toFractionalInches(inchesValue));
  };
  
  // Convert decimal inches to fractional format
  const toFractionalInches = (decimalInches: number): string => {
    if (decimalInches === 0) return '0';
    
    // Common fractions with denominators up to 16
    const fractions = [
      { value: 1/16, display: '1/16' },
      { value: 1/8, display: '1/8' },
      { value: 3/16, display: '3/16' },
      { value: 1/4, display: '1/4' },
      { value: 5/16, display: '5/16' },
      { value: 3/8, display: '3/8' },
      { value: 7/16, display: '7/16' },
      { value: 1/2, display: '1/2' },
      { value: 9/16, display: '9/16' },
      { value: 5/8, display: '5/8' },
      { value: 11/16, display: '11/16' },
      { value: 3/4, display: '3/4' },
      { value: 13/16, display: '13/16' },
      { value: 7/8, display: '7/8' },
      { value: 15/16, display: '15/16' },
      { value: 1, display: '1' }
    ];
    
    // Get whole number part
    const wholePart = Math.floor(decimalInches);
    
    // Get decimal part
    const decimalPart = decimalInches - wholePart;
    
    if (decimalPart === 0) {
      return wholePart.toString();
    }
    
    // Find closest fraction
    let closestFraction = '';
    let minDifference = 1;
    
    for (const fraction of fractions) {
      const difference = Math.abs(decimalPart - fraction.value);
      if (difference < minDifference) {
        minDifference = difference;
        closestFraction = fraction.display;
      }
    }
    
    // If the difference is too large, just use the decimal
    if (minDifference > 0.03) {
      return decimalInches.toFixed(precision);
    }
    
    // Return the result
    return wholePart > 0 ? `${wholePart} ${closestFraction}` : closestFraction;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="calculator-section-header">Millimeters to Inches Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label htmlFor="mm" className="block text-sm font-medium text-gray-300 mb-1">
                Millimeters
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="mm"
                  className="calculator-input"
                  value={mmStr} {...numericInputProps}
                  onChange={handleMmChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">mm</span>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
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
            </select>
          </div>
        </div>
        
        <div className="calculator-card p-6 rounded-lg shadow-lg">
          <h3 className="calculator-section-header">Conversion Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Millimeters</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {mmStr === '' ? '0' : parseFloat(mmStr).toLocaleString()} mm
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Decimal Inches</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {inches.toFixed(precision)} in
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Fractional Inches</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-400">
                {fractionalInches} in
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {mmStr === '' ? '0' : parseFloat(mmStr).toLocaleString()} millimeters × 0.0393701 = {inches.toFixed(precision)} inches
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 calculator-card p-6 rounded-lg shadow-lg">
          <h3 className="calculator-section-header">Common Conversions</h3>
          
          <div className="overflow-x-auto">
            <table className="calculator-table">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Millimeters
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Decimal Inches
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Fractional Inches
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[1, 5, 10, 25.4, 50, 100, 150, 200, 250, 300].map((mm) => {
                  const inchesValue = mm * INCHES_PER_MM;
                  const fractionalValue = toFractionalInches(inchesValue);
                  
                  return (
                    <tr key={mm} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {mm} mm
                      </td>
                      <td className="calculator-table-cell">
                        {inchesValue.toFixed(precision)} in
                      </td>
                      <td className="calculator-table-cell">
                        {fractionalValue} in
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MmToInchesCalculator; 