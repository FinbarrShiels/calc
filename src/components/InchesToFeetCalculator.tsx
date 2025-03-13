'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';


interface InchesToFeetCalculatorProps {
  calculator?: Calculator;
}

type DisplayFormat = 'decimal' | 'fractional';

const InchesToFeetCalculator: React.FC<InchesToFeetCalculatorProps> = ({ calculator }) => {
  // Input state
  const [inchesStr, setInchesStr] = useState<string>('60');
  const [precision, setPrecision] = useState<number>(2);
  const [displayFormat, setDisplayFormat] = useState<DisplayFormat>('fractional');
  
  // Result state
  const [feet, setFeet] = useState<number>(0);
  const [remainingInches, setRemainingInches] = useState<number>(0);
  
  // Constants for conversion
  const INCHES_PER_FOOT = 12;
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertInchesToFeet();
  }, [inchesStr, precision, displayFormat]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle display format change
  const handleDisplayFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayFormat(e.target.value as DisplayFormat);
  };
  
  // Handle input change with proper validation
  const handleInchesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setInchesStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setInchesStr(value);
    }
  };
  
  // Convert inches to feet
  const convertInchesToFeet = () => {
    const inches = inchesStr === '' ? 0 : parseFloat(inchesStr);
    
    if (displayFormat === 'decimal') {
      // Calculate decimal feet
      const feetValue = inches / INCHES_PER_FOOT;
      setFeet(Number(feetValue.toFixed(precision)));
      setRemainingInches(0);
    } else {
      // Calculate feet and inches
      const wholeFeet = Math.floor(inches / INCHES_PER_FOOT);
      const inchesRemainder = inches % INCHES_PER_FOOT;
      
      setFeet(wholeFeet);
      setRemainingInches(Number(inchesRemainder.toFixed(precision)));
    }
  };
  
  // Format feet and inches for display
  const formatFeetInches = (): string => {
    if (displayFormat === 'decimal') {
      return `${feet.toFixed(precision)} ft`;
    } else {
      if (feet === 0) {
        return `${remainingInches.toFixed(precision)} in`;
      }
      return `${feet} ft ${remainingInches > 0 ? `${remainingInches.toFixed(precision)} in` : ''}`;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="calculator-section-header">Inches to Feet Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="mb-4">
            <label htmlFor="inches" className="block text-sm font-medium text-gray-300 mb-1">
              Inches
            </label>
            <div className="relative">
              <input
                type="tel"
                id="inches"
                className="calculator-input"
                value={inchesStr} {...numericInputProps}
                onChange={handleInchesChange}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">in</span>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="displayFormat" className="block text-sm font-medium text-gray-300 mb-1">
              Display Format
            </label>
            <select
              id="displayFormat"
              className="calculator-input"
              value={displayFormat}
              onChange={handleDisplayFormatChange}
            >
              <option value="decimal">Decimal Feet (e.g., 5.91 ft)</option>
              <option value="fractional">Feet and Inches (e.g., 5 ft 11 in)</option>
            </select>
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
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg">
          <h3 className="calculator-section-header">Conversion Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Inches</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {inchesStr === '' ? '0' : parseFloat(inchesStr).toLocaleString()} in
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Feet{displayFormat === 'fractional' ? ' and Inches' : ''}</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {formatFeetInches()}
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
              {displayFormat === 'decimal' ? (
                <div className="text-md font-medium text-gray-300 mt-1">
                  {inchesStr === '' ? '0' : parseFloat(inchesStr).toLocaleString()} inches ÷ 12 = {feet.toFixed(precision)} feet
                </div>
              ) : (
                <>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    {inchesStr === '' ? '0' : parseFloat(inchesStr).toLocaleString()} inches ÷ 12 = {feet} feet and {remainingInches.toFixed(precision)} inches
                  </div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    (Whole feet = floor({inchesStr === '' ? '0' : parseFloat(inchesStr).toLocaleString()} ÷ 12), Remaining inches = {inchesStr === '' ? '0' : parseFloat(inchesStr).toLocaleString()} mod 12)
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 calculator-card-alt p-6 rounded-lg shadow-lg">
          <h3 className="calculator-section-header">Common Conversions</h3>
          
          <div className="overflow-x-auto">
            <table className="calculator-table">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Inches
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Decimal Feet
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Feet and Inches
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[6, 12, 18, 24, 30, 36, 48, 60, 72, 84].map((inch) => {
                  const decimalFeet = inch / INCHES_PER_FOOT;
                  const wholeFeet = Math.floor(decimalFeet);
                  const inchesRemainder = inch % INCHES_PER_FOOT;
                  
                  return (
                    <tr key={inch} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {inch} in
                      </td>
                      <td className="calculator-table-cell">
                        {decimalFeet.toFixed(precision)} ft
                      </td>
                      <td className="calculator-table-cell">
                        {wholeFeet > 0 ? `${wholeFeet} ft` : ''} {inchesRemainder > 0 ? `${inchesRemainder} in` : wholeFeet === 0 ? '0 in' : ''}
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

export default InchesToFeetCalculator; 