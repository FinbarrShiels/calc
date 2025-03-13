'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';


interface WattsToAmpsCalculatorProps {
  calculator?: Calculator;
}

const WattsToAmpsCalculator: React.FC<WattsToAmpsCalculatorProps> = ({ calculator }) => {
  // Input state
  const [wattsStr, setWattsStr] = useState<string>('1200');
  const [voltsStr, setVoltsStr] = useState<string>('120');
  const [powerFactorStr, setPowerFactorStr] = useState<string>('1');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [amps, setAmps] = useState<number>(0);
  
  // Calculate conversion when inputs change
  useEffect(() => {
    calculateAmps();
  }, [wattsStr, voltsStr, powerFactorStr, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle watts input change with proper validation
  const handleWattsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setWattsStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setWattsStr(value);
    }
  };
  
  // Handle volts input change with proper validation
  const handleVoltsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setVoltsStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setVoltsStr(value);
    }
  };
  
  // Handle power factor input change with proper validation
  const handlePowerFactorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setPowerFactorStr('');
      return;
    }
    
    // Validate the input is a number between 0 and 1
    if (/^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value);
      if (numValue <= 1) {
        setPowerFactorStr(value);
      }
    }
  };
  
  // Calculate amps from watts
  const calculateAmps = () => {
    const watts = wattsStr === '' ? 0 : parseFloat(wattsStr);
    const volts = voltsStr === '' ? 0 : parseFloat(voltsStr);
    const powerFactor = powerFactorStr === '' ? 1 : parseFloat(powerFactorStr);
    
    if (volts === 0 || powerFactor === 0) {
      setAmps(0);
      return;
    }
    
    // I = P / (V × PF) (Current = Power / (Voltage × Power Factor))
    const calculatedAmps = watts / (volts * powerFactor);
    setAmps(Number(calculatedAmps.toFixed(precision)));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="calculator-section-header">Watts to Amps Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="watts" className="block text-sm font-medium text-gray-300 mb-1">
                Power
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="watts"
                  className="calculator-input"
                  value={wattsStr} {...numericInputProps}
                  onChange={handleWattsChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">W</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="volts" className="block text-sm font-medium text-gray-300 mb-1">
                Voltage
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="volts"
                  className="calculator-input"
                  value={voltsStr} {...numericInputProps}
                  onChange={handleVoltsChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">V</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="powerFactor" className="block text-sm font-medium text-gray-300 mb-1">
                Power Factor
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="powerFactor"
                  className="calculator-input"
                  value={powerFactorStr} {...numericInputProps}
                  onChange={handlePowerFactorChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">PF</span>
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
              <div className="text-sm text-gray-600 dark:text-gray-300">Input Values</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {wattsStr === '' ? '0' : parseFloat(wattsStr).toLocaleString()} W / {voltsStr === '' ? '0' : parseFloat(voltsStr).toLocaleString()} V
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Power Factor: {powerFactorStr === '' ? '1' : parseFloat(powerFactorStr).toLocaleString()}
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Current</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {amps.toFixed(precision)} A
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                Current (A) = Power (W) ÷ (Voltage (V) × Power Factor)
              </div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {wattsStr === '' ? '0' : parseFloat(wattsStr).toLocaleString()} W ÷ ({voltsStr === '' ? '0' : parseFloat(voltsStr).toLocaleString()} V × {powerFactorStr === '' ? '1' : parseFloat(powerFactorStr).toLocaleString()}) = {amps.toFixed(precision)} A
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
                    Power (W)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Voltage (V)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Current (A)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[100, 500, 1000, 1500, 2000, 3000, 5000, 10000].map((watt) => {
                  const volt = 120;
                  const pf = 1;
                  const ampValue = watt / (volt * pf);
                  
                  return (
                    <tr key={watt} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {watt.toLocaleString()} W
                      </td>
                      <td className="calculator-table-cell">
                        {volt} V
                      </td>
                      <td className="calculator-table-cell">
                        {ampValue.toFixed(precision)} A
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

export default WattsToAmpsCalculator; 