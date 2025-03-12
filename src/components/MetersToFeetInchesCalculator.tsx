'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

interface MetersToFeetInchesCalculatorProps {
  calculator?: Calculator;
}

const MetersToFeetInchesCalculator: React.FC<MetersToFeetInchesCalculatorProps> = ({ calculator }) => {
  // Input state
  const [metersStr, setMetersStr] = useState<string>('3');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [feet, setFeet] = useState<number>(0);
  const [inches, setInches] = useState<number>(0);
  const [totalInches, setTotalInches] = useState<number>(0);
  
  // Constants for conversion
  const FEET_PER_METER = 3.28084;
  const INCHES_PER_METER = 39.3701;
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertMetersToFeetInches();
  }, [metersStr, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle input change with proper validation
  const handleMetersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setMetersStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setMetersStr(value);
    }
  };
  
  // Convert meters to feet and inches
  const convertMetersToFeetInches = () => {
    const meters = metersStr === '' ? 0 : parseFloat(metersStr);
    
    // Calculate total inches
    const totalInchesValue = meters * INCHES_PER_METER;
    setTotalInches(Number(totalInchesValue.toFixed(precision)));
    
    // Calculate feet (whole number)
    const feetValue = Math.floor(totalInchesValue / 12);
    setFeet(feetValue);
    
    // Calculate remaining inches
    const inchesValue = totalInchesValue - (feetValue * 12);
    setInches(Number(inchesValue.toFixed(precision)));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className={calculatorSectionHeaderClasses}>Meters to Feet & Inches Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label htmlFor="meters" className="block text-sm font-medium text-gray-300 mb-1">
                Meters
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="meters"
                  className={inputClasses}
                  value={metersStr} {...numericInputProps}
                  onChange={handleMetersChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">m</span>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="precision" className="block text-sm font-medium text-gray-300 mb-1">
              Decimal Precision
            </label>
            <select
              id="precision"
              className={inputClasses}
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
          <h3 className={calculatorSectionHeaderClasses}>Conversion Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Meters</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {metersStr === '' ? '0' : parseFloat(metersStr).toLocaleString()} m
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Feet and Inches</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {feet} ft {inches.toFixed(precision)} in
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Total Inches</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-400">
                {totalInches.toFixed(precision)} in
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className={resultLabelClasses}>Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {metersStr === '' ? '0' : parseFloat(metersStr).toLocaleString()} meters × 39.3701 = {totalInches.toFixed(precision)} inches
              </div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {totalInches.toFixed(precision)} inches ÷ 12 = {feet} feet and {inches.toFixed(precision)} inches
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 calculator-card p-6 rounded-lg shadow-lg">
          <h3 className={calculatorSectionHeaderClasses}>Common Conversions</h3>
          
          <div className="overflow-x-auto">
            <table className="calculator-table">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Meters
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Feet
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Feet & Inches
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[0.5, 1, 1.5, 2, 3, 5, 10, 15, 20, 50].map((m) => {
                  const totalInchesValue = m * INCHES_PER_METER;
                  const feetValue = Math.floor(totalInchesValue / 12);
                  const inchesValue = totalInchesValue - (feetValue * 12);
                  
                  return (
                    <tr key={m} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {m} m
                      </td>
                      <td className="calculator-table-cell">
                        {(m * FEET_PER_METER).toFixed(precision)} ft
                      </td>
                      <td className="calculator-table-cell">
                        {feetValue} ft {inchesValue.toFixed(precision)} in
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

export default MetersToFeetInchesCalculator; 