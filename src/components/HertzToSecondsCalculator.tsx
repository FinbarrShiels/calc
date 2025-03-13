'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';


interface HertzToSecondsCalculatorProps {
  calculator?: Calculator;
}

const HertzToSecondsCalculator: React.FC<HertzToSecondsCalculatorProps> = ({ calculator }) => {
  // Input state
  const [hertzStr, setHertzStr] = useState<string>('60');
  const [precision, setPrecision] = useState<number>(6);
  
  // Result state
  const [seconds, setSeconds] = useState<number>(0);
  const [milliseconds, setMilliseconds] = useState<number>(0);
  
  // Calculate conversion when inputs change
  useEffect(() => {
    calculatePeriod();
  }, [hertzStr, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle hertz input change with proper validation
  const handleHertzChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setHertzStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setHertzStr(value);
    }
  };
  
  // Calculate period (seconds) from frequency (hertz)
  const calculatePeriod = () => {
    const hertz = hertzStr === '' ? 0 : parseFloat(hertzStr);
    
    if (hertz === 0) {
      setSeconds(0);
      setMilliseconds(0);
      return;
    }
    
    // T = 1/f (Period = 1/Frequency)
    const calculatedSeconds = 1 / hertz;
    setSeconds(Number(calculatedSeconds.toFixed(precision)));
    setMilliseconds(Number((calculatedSeconds * 1000).toFixed(precision)));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="calculator-section-header">Hertz to Seconds Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="hertz" className="block text-sm font-medium text-gray-300 mb-1">
                Frequency
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="hertz"
                  className="calculator-input"
                  value={hertzStr} {...numericInputProps}
                  onChange={handleHertzChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">Hz</span>
              </div>
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
                <option value="5">5 decimal places</option>
                <option value="6">6 decimal places</option>
                <option value="8">8 decimal places</option>
                <option value="10">10 decimal places</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="calculator-section-header">Conversion Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Frequency</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {hertzStr === '' ? '0' : parseFloat(hertzStr).toLocaleString()} Hz
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Period</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {seconds.toFixed(precision)} s
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {milliseconds.toFixed(precision)} ms
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                Period (s) = 1 / Frequency (Hz)
              </div>
              <div className="text-md font-medium text-gray-300 mt-1">
                T = 1 / {hertzStr === '' ? '0' : parseFloat(hertzStr).toLocaleString()} = {seconds.toFixed(precision)} s
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
                    Frequency (Hz)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Period (s)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Period (ms)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[1, 10, 50, 60, 100, 500, 1000, 10000, 100000, 1000000].map((hz) => {
                  const periodValue = 1 / hz;
                  const msValue = periodValue * 1000;
                  
                  return (
                    <tr key={hz} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {hz.toLocaleString()} Hz
                      </td>
                      <td className="calculator-table-cell">
                        {periodValue.toFixed(precision)} s
                      </td>
                      <td className="calculator-table-cell">
                        {msValue.toFixed(precision)} ms
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

export default HertzToSecondsCalculator; 