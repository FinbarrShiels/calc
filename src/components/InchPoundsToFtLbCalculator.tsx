'use client';

import React, { useState, useEffect } from 'react';
import { decimalInputProps } from '@/utils/inputUtils';


const InchPoundsToFtLbCalculator: React.FC = () => {
  // Input state
  const [inchPoundsStr, setInchPoundsStr] = useState<string>('100');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [footPounds, setFootPounds] = useState<number | null>(null);
  
  // Constants for conversion
  const FOOT_POUNDS_PER_INCH_POUND = 1 / 12; // 1 inch-pound = 1/12 foot-pound
  
  useEffect(() => {
    convertInchPoundsToFootPounds();
  }, [inchPoundsStr, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle number input with validation
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setter('');
      return;
    }
    
    // Handle special case for decimal input
    if (value === '.' || value === '0.') {
      setter('0.');
      return;
    }
    
    // Validate input format
    const regex = /^-?\d*\.?\d*$/;
    if (regex.test(value)) {
      // Remove leading zeros for non-decimal numbers
      if (value.indexOf('.') === -1 && value.length > 1 && value.startsWith('0')) {
        setter(value.replace(/^0+/, ''));
      } else {
        setter(value);
      }
    }
  };
  
  // Convert inch-pounds to foot-pounds
  const convertInchPoundsToFootPounds = () => {
    if (inchPoundsStr === '') {
      setFootPounds(null);
      return;
    }
    
    const inchPounds = parseFloat(inchPoundsStr);
    const footPoundsValue = inchPounds * FOOT_POUNDS_PER_INCH_POUND;
    setFootPounds(Number(footPoundsValue.toFixed(precision)));
  };
  
  return (
    <div className="calculator-input">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2 text-white dark:text-gray-900">Inch Pounds to Foot Pounds Calculator</h1>
        <p className="text-gray-300 mb-6">Convert inch-pounds (in-lb) to foot-pounds (ft-lb) with precision. Perfect for torque conversions, engineering, and mechanical applications.</p>
        
        <div className="calculator-card-alt rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="calculator-section-header">Inch Pounds to Foot Pounds Calculator</h2>
            
            <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
              <div className="mb-4">
                <label htmlFor="inchPounds" className="block text-sm font-medium text-gray-300 mb-1">
                  Inch Pounds
                </label>
                <div className="relative">
                  <input
                    id="inchPounds"
                    type="tel"
                    value={inchPoundsStr}
                    onChange={(e) => handleNumberInput(e, setInchPoundsStr)} {...decimalInputProps}
                    className="calculator-input"
                    placeholder="Enter torque in inch-pounds"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">in-lb</span>
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
            
            <div className="calculator-card-alt p-6 rounded-lg shadow-lg">
              <h3 className="calculator-section-header">Conversion Results</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Inch Pounds</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">
                    {inchPoundsStr === '' ? '0' : parseFloat(inchPoundsStr).toLocaleString()} in-lb
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Foot Pounds</div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">
                    {footPounds !== null ? footPounds.toFixed(precision) : '0'} ft-lb
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    {inchPoundsStr === '' ? '0' : inchPoundsStr} inch-pounds ÷ 12 = {footPounds !== null ? footPounds.toFixed(precision) : '0'} foot-pounds
                  </div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    1 foot-pound = 12 inch-pounds
                  </div>
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
                        Inch Pounds (in-lb)
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Foot Pounds (ft-lb)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                    {[12, 24, 36, 60, 100, 120, 240, 500, 1000, 2000].map((inLb) => {
                      const ftLbValue = inLb * FOOT_POUNDS_PER_INCH_POUND;
                      
                      return (
                        <tr key={inLb} className="hover:bg-muted">
                          <td className="calculator-table-cell">
                            {inLb.toLocaleString()} in-lb
                          </td>
                          <td className="calculator-table-cell">
                            {ftLbValue.toFixed(precision)} ft-lb
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
      </div>
    </div>
  );
};

export default InchPoundsToFtLbCalculator; 