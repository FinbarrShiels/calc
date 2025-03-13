'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';


interface OuncesToPoundsCalculatorProps {
  calculator?: Calculator;
}

const OuncesToPoundsCalculator: React.FC<OuncesToPoundsCalculatorProps> = ({ calculator }) => {
  // Input state
  const [ouncesStr, setOuncesStr] = useState<string>('16');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [pounds, setPounds] = useState<number>(0);
  
  // Constants for conversion
  const POUNDS_PER_OUNCE = 0.0625; // 1/16
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertOuncesToPounds();
  }, [ouncesStr, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle input change with proper validation
  const handleOuncesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setOuncesStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setOuncesStr(value);
    }
  };
  
  // Convert ounces to pounds
  const convertOuncesToPounds = () => {
    const ounces = ouncesStr === '' ? 0 : parseFloat(ouncesStr);
    const poundsValue = ounces * POUNDS_PER_OUNCE;
    setPounds(Number(poundsValue.toFixed(precision)));
  };
  
  // Format for display
  const formatPoundsAndOunces = (totalOunces: number): string => {
    if (totalOunces === 0) return '0 lb';
    
    const wholePounds = Math.floor(totalOunces / 16);
    const remainingOunces = totalOunces % 16;
    
    if (wholePounds === 0) {
      return `${remainingOunces.toFixed(precision)} oz`;
    } else if (remainingOunces === 0) {
      return `${wholePounds} lb`;
    } else {
      return `${wholePounds} lb ${remainingOunces.toFixed(precision)} oz`;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="calculator-section-header">Ounces to Pounds Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label htmlFor="ounces" className="block text-sm font-medium text-gray-300 mb-1">
                Ounces
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="ounces"
                  className="calculator-input"
                  value={ouncesStr} {...numericInputProps}
                  onChange={handleOuncesChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">oz</span>
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
              <div className="text-sm text-gray-600 dark:text-gray-300">Ounces</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {ouncesStr === '' ? '0' : parseFloat(ouncesStr).toLocaleString()} oz
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Pounds (Decimal)</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {pounds.toFixed(precision)} lb
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Pounds and Ounces</div>
              <div className="text-xl sm:text-2xl font-bold text-purple-400">
                {formatPoundsAndOunces(ouncesStr === '' ? 0 : parseFloat(ouncesStr))}
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {ouncesStr === '' ? '0' : parseFloat(ouncesStr).toLocaleString()} ounces × 0.0625 = {pounds.toFixed(precision)} pounds
              </div>
              <div className="text-md font-medium text-gray-300 mt-1">
                1 pound = 16 ounces
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
                    Ounces (oz)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Pounds (lb)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Pounds & Ounces
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[1, 4, 8, 12, 16, 20, 24, 32, 48, 64].map((oz) => {
                  const poundsValue = oz * POUNDS_PER_OUNCE;
                  
                  return (
                    <tr key={oz} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {oz} oz
                      </td>
                      <td className="calculator-table-cell">
                        {poundsValue.toFixed(precision)} lb
                      </td>
                      <td className="calculator-table-cell">
                        {formatPoundsAndOunces(oz)}
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

export default OuncesToPoundsCalculator; 