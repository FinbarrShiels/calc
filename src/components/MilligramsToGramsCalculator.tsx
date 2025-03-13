'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';


interface MilligramsToGramsCalculatorProps {
  calculator?: Calculator;
}

const MilligramsToGramsCalculator: React.FC<MilligramsToGramsCalculatorProps> = ({ calculator }) => {
  // Input state
  const [milligramsStr, setMilligramsStr] = useState<string>('1000');
  const [precision, setPrecision] = useState<number>(3);
  
  // Result state
  const [grams, setGrams] = useState<number>(0);
  
  // Constants for conversion
  const GRAMS_PER_MILLIGRAM = 0.001;
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertMilligramsToGrams();
  }, [milligramsStr, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle input change with proper validation
  const handleMilligramsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setMilligramsStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*$/.test(value)) {
      setMilligramsStr(value);
    }
  };
  
  // Convert milligrams to grams
  const convertMilligramsToGrams = () => {
    const milligrams = milligramsStr === '' ? 0 : parseInt(milligramsStr);
    const gramsValue = milligrams * GRAMS_PER_MILLIGRAM;
    setGrams(Number(gramsValue.toFixed(precision)));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="calculator-section-header">Milligrams to Grams Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label htmlFor="milligrams" className="block text-sm font-medium text-gray-300 mb-1">
                Milligrams
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="milligrams"
                  className="calculator-input"
                  value={milligramsStr} {...numericInputProps}
                  onChange={handleMilligramsChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">mg</span>
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
              <option value="1">1 decimal place</option>
              <option value="2">2 decimal places</option>
              <option value="3">3 decimal places</option>
              <option value="4">4 decimal places</option>
              <option value="5">5 decimal places</option>
            </select>
          </div>
        </div>
        
        <div className="calculator-card p-6 rounded-lg shadow-lg">
          <h3 className="calculator-section-header">Conversion Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Milligrams</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {milligramsStr === '' ? '0' : parseInt(milligramsStr).toLocaleString()} mg
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Grams</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {grams.toFixed(precision)} g
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {milligramsStr === '' ? '0' : parseInt(milligramsStr).toLocaleString()} milligrams × 0.001 = {grams.toFixed(precision)} grams
              </div>
              <div className="text-md font-medium text-gray-300 mt-1">
                1 gram = 1,000 milligrams
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
                    Milligrams (mg)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Grams (g)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[1, 10, 50, 100, 250, 500, 1000, 2000, 5000, 10000].map((mg) => {
                  const gramsValue = mg * GRAMS_PER_MILLIGRAM;
                  
                  return (
                    <tr key={mg} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {mg.toLocaleString()} mg
                      </td>
                      <td className="calculator-table-cell">
                        {gramsValue.toFixed(precision)} g
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

export default MilligramsToGramsCalculator; 