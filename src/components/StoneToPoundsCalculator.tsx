'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';


interface StoneToPoundsCalculatorProps {
  calculator?: Calculator;
}

const StoneToPoundsCalculator: React.FC<StoneToPoundsCalculatorProps> = ({ calculator }) => {
  // Input state
  const [stoneStr, setStoneStr] = useState<string>('10');
  const [poundsStr, setPoundsStr] = useState<string>('0');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [totalPounds, setTotalPounds] = useState<number>(0);
  const [kilograms, setKilograms] = useState<number>(0);
  
  // Constants for conversion
  const POUNDS_PER_STONE = 14;
  const KG_PER_POUND = 0.453592;
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertStoneToPounds();
  }, [stoneStr, poundsStr, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle stone input change with proper validation
  const handleStoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setStoneStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setStoneStr(value);
    }
  };
  
  // Handle pounds input change with proper validation
  const handlePoundsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setPoundsStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setPoundsStr(value);
    }
  };
  
  // Convert stone to pounds
  const convertStoneToPounds = () => {
    const stone = stoneStr === '' ? 0 : parseFloat(stoneStr);
    const pounds = poundsStr === '' ? 0 : parseFloat(poundsStr);
    
    const totalPoundsValue = (stone * POUNDS_PER_STONE) + pounds;
    setTotalPounds(Number(totalPoundsValue.toFixed(precision)));
    
    const kilogramsValue = totalPoundsValue * KG_PER_POUND;
    setKilograms(Number(kilogramsValue.toFixed(precision)));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="calculator-section-header">Stone to Pounds Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="stone" className="block text-sm font-medium text-gray-300 mb-1">
                Stone
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="stone"
                  className="calculator-input"
                  value={stoneStr} {...numericInputProps}
                  onChange={handleStoneChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">st</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="pounds" className="block text-sm font-medium text-gray-300 mb-1">
                Pounds
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="pounds"
                  className="calculator-input"
                  value={poundsStr} {...numericInputProps}
                  onChange={handlePoundsChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">lb</span>
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
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="calculator-section-header">Conversion Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Stone and Pounds</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {stoneStr === '' ? '0' : parseFloat(stoneStr).toLocaleString()} st {poundsStr === '' ? '0' : parseFloat(poundsStr).toLocaleString()} lb
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Pounds</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {totalPounds.toFixed(precision)} lb
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Kilograms</div>
              <div className="text-xl sm:text-2xl font-bold text-purple-400">
                {kilograms.toFixed(precision)} kg
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                ({stoneStr === '' ? '0' : parseFloat(stoneStr).toLocaleString()} stone × 14) + {poundsStr === '' ? '0' : parseFloat(poundsStr).toLocaleString()} pounds = {totalPounds.toFixed(precision)} pounds
              </div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {totalPounds.toFixed(precision)} pounds × 0.453592 = {kilograms.toFixed(precision)} kilograms
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="calculator-section-header">Common Conversions</h3>
          
          <div className="overflow-x-auto">
            <table className="calculator-table">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Stone
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Pounds
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Kilograms
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[1, 2, 5, 8, 10, 12, 14, 16, 18, 20].map((st) => {
                  const poundsValue = st * POUNDS_PER_STONE;
                  const kgValue = poundsValue * KG_PER_POUND;
                  
                  return (
                    <tr key={st} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {st} st
                      </td>
                      <td className="calculator-table-cell">
                        {poundsValue.toFixed(precision)} lb
                      </td>
                      <td className="calculator-table-cell">
                        {kgValue.toFixed(precision)} kg
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

export default StoneToPoundsCalculator; 