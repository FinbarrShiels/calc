'use client';

import React, { useState, useEffect } from 'react';
import { decimalInputProps } from '@/utils/inputUtils';


const NewtonMetersToFtLbCalculator: React.FC = () => {
  // Input state
  const [newtonMetersStr, setNewtonMetersStr] = useState<string>('10');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [footPounds, setFootPounds] = useState<number | null>(null);
  
  // Constants for conversion
  const FOOT_POUNDS_PER_NEWTON_METER = 0.7375621493;
  
  useEffect(() => {
    convertNewtonMetersToFootPounds();
  }, [newtonMetersStr, precision]);
  
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
  
  // Convert newton-meters to foot-pounds
  const convertNewtonMetersToFootPounds = () => {
    if (newtonMetersStr === '') {
      setFootPounds(null);
      return;
    }
    
    const newtonMeters = parseFloat(newtonMetersStr);
    const footPoundsValue = newtonMeters * FOOT_POUNDS_PER_NEWTON_METER;
    setFootPounds(Number(footPoundsValue.toFixed(precision)));
  };
  
  return (
    <div className="calculator-input">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2 text-white dark:text-gray-900">Newton Meters to Foot Pounds Calculator</h1>
        <p className="text-gray-300 mb-6">Convert newton-meters (N·m) to foot-pounds (ft-lb) with precision. Perfect for torque conversions, engineering, and international unit conversions.</p>
        
        <div className="calculator-card-alt rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="calculator-section-header">Newton Meters to Foot Pounds Calculator</h2>
            
            <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
              <div className="mb-4">
                <label htmlFor="newtonMeters" className="block text-sm font-medium text-gray-300 mb-1">
                  Newton Meters
                </label>
                <div className="relative">
                  <input
                    id="newtonMeters"
                    type="tel"
                    value={newtonMetersStr}
                    onChange={(e) => handleNumberInput(e, setNewtonMetersStr)} {...decimalInputProps}
                    className="calculator-input"
                    placeholder="Enter torque in newton-meters"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">N·m</span>
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
                  <div className="text-sm text-gray-600 dark:text-gray-300">Newton Meters</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">
                    {newtonMetersStr === '' ? '0' : parseFloat(newtonMetersStr).toLocaleString()} N·m
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
                    {newtonMetersStr === '' ? '0' : newtonMetersStr} newton-meters × 0.7375621493 = {footPounds !== null ? footPounds.toFixed(precision) : '0'} foot-pounds
                  </div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    1 newton-meter = 0.7375621493 foot-pounds
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
                        Newton Meters (N·m)
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Foot Pounds (ft-lb)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                    {[1, 5, 10, 20, 25, 50, 75, 100, 150, 200].map((nm) => {
                      const ftLbValue = nm * FOOT_POUNDS_PER_NEWTON_METER;
                      
                      return (
                        <tr key={nm} className="hover:bg-muted">
                          <td className="calculator-table-cell">
                            {nm.toLocaleString()} N·m
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

export default NewtonMetersToFtLbCalculator; 