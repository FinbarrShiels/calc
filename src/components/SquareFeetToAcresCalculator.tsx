'use client';

import React, { useState, useEffect } from 'react';
import { decimalInputProps } from '@/utils/inputUtils';


const SquareFeetToAcresCalculator: React.FC = () => {
  // Input state
  const [squareFeetStr, setSquareFeetStr] = useState<string>('10000');
  const [precision, setPrecision] = useState<number>(4);
  
  // Result state
  const [acres, setAcres] = useState<number | null>(null);
  
  // Constants for conversion
  const ACRES_PER_SQUARE_FOOT = 1 / 43560; // 1 acre = 43,560 square feet
  
  useEffect(() => {
    convertSquareFeetToAcres();
  }, [squareFeetStr, precision]);
  
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
  
  // Convert square feet to acres
  const convertSquareFeetToAcres = () => {
    if (squareFeetStr === '') {
      setAcres(null);
      return;
    }
    
    const squareFeet = parseFloat(squareFeetStr);
    const acresValue = squareFeet * ACRES_PER_SQUARE_FOOT;
    setAcres(Number(acresValue.toFixed(precision)));
  };
  
  return (
    <div className="calculator-input">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2 text-white dark:text-gray-900">Square Feet to Acres Calculator</h1>
        <p className="text-gray-300 mb-6">Convert square feet (sq ft) to acres with precision. Perfect for real estate, land measurement, and property calculations.</p>
        
        <div className="calculator-card-alt rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="calculator-section-header">Square Feet to Acres Calculator</h2>
            
            <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
              <div className="mb-4">
                <label htmlFor="squareFeet" className="block text-sm font-medium text-gray-300 mb-1">
                  Square Feet
                </label>
                <div className="relative">
                  <input
                    id="squareFeet"
                    type="tel"
                    value={squareFeetStr}
                    onChange={(e) => handleNumberInput(e, setSquareFeetStr)} {...decimalInputProps}
                    className="calculator-input"
                    placeholder="Enter area in square feet"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">sq ft</span>
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
                  <option value="2">2 decimal places</option>
                  <option value="3">3 decimal places</option>
                  <option value="4">4 decimal places</option>
                  <option value="5">5 decimal places</option>
                  <option value="6">6 decimal places</option>
                </select>
              </div>
            </div>
            
            <div className="calculator-card-alt p-6 rounded-lg shadow-lg">
              <h3 className="calculator-section-header">Conversion Results</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Square Feet</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">
                    {squareFeetStr === '' ? '0' : parseFloat(squareFeetStr).toLocaleString()} sq ft
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Acres</div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">
                    {acres !== null ? acres.toFixed(precision) : '0'} acres
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    {squareFeetStr === '' ? '0' : squareFeetStr} square feet ÷ 43,560 = {acres !== null ? acres.toFixed(precision) : '0'} acres
                  </div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    1 acre = 43,560 square feet
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
                        Square Feet (sq ft)
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Acres
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                    {[1000, 5000, 10000, 21780, 43560, 87120, 100000, 217800, 435600, 1000000].map((sqft) => {
                      const acresValue = sqft * ACRES_PER_SQUARE_FOOT;
                      
                      return (
                        <tr key={sqft} className="hover:bg-muted">
                          <td className="calculator-table-cell">
                            {sqft.toLocaleString()} sq ft
                          </td>
                          <td className="calculator-table-cell">
                            {acresValue.toFixed(precision)} acres
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

export default SquareFeetToAcresCalculator; 