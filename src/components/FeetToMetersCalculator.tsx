'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';


interface FeetToMetersCalculatorProps {
  calculator?: Calculator;
}

const FeetToMetersCalculator: React.FC<FeetToMetersCalculatorProps> = ({ calculator }) => {
  // Input state
  const [feetStr, setFeetStr] = useState<string>('10');
  const [inchesStr, setInchesStr] = useState<string>('0');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [meters, setMeters] = useState<number>(0);
  const [centimeters, setCentimeters] = useState<number>(0);
  
  // Constants for conversion
  const METERS_PER_FOOT = 0.3048;
  const METERS_PER_INCH = 0.0254;
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertFeetToMeters();
  }, [feetStr, inchesStr, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle feet input change with proper validation
  const handleFeetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setFeetStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setFeetStr(value);
    }
  };
  
  // Handle inches input change with proper validation
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
  
  // Convert feet to meters
  const convertFeetToMeters = () => {
    const feet = feetStr === '' ? 0 : parseFloat(feetStr);
    const inches = inchesStr === '' ? 0 : parseFloat(inchesStr);
    const totalMeters = (feet * METERS_PER_FOOT) + (inches * METERS_PER_INCH);
    setMeters(Number(totalMeters.toFixed(precision)));
    setCentimeters(Number((totalMeters * 100).toFixed(precision)));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="calculator-section-header">Feet to Meters Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="feet" className="block text-sm font-medium text-gray-300 mb-1">
                Feet
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="feet"
                  className="calculator-input"
                  value={feetStr} {...numericInputProps}
                  onChange={handleFeetChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">ft</span>
              </div>
            </div>
            
            <div>
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
              <div className="text-sm text-gray-600 dark:text-gray-300">Feet and Inches</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {feetStr === '' ? '0' : parseFloat(feetStr).toLocaleString()} ft {inchesStr === '' ? '0' : parseFloat(inchesStr).toLocaleString()} in
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Meters</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {meters.toFixed(precision)} m
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Centimeters</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-400">
                {centimeters.toFixed(precision)} cm
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {feetStr === '' ? '0' : parseFloat(feetStr).toLocaleString()} feet × 0.3048 = {(feetStr === '' ? 0 : parseFloat(feetStr) * METERS_PER_FOOT).toFixed(precision)} meters
              </div>
              {inchesStr !== '0' && inchesStr !== '' && (
                <div className="text-md font-medium text-gray-300 mt-1">
                  {inchesStr === '' ? '0' : parseFloat(inchesStr).toLocaleString()} inches × 0.0254 = {(inchesStr === '' ? 0 : parseFloat(inchesStr) * METERS_PER_INCH).toFixed(precision)} meters
                </div>
              )}
              {(inchesStr !== '0' && inchesStr !== '') && (
                <div className="text-md font-medium text-gray-300 mt-1">
                  {(feetStr === '' ? 0 : parseFloat(feetStr) * METERS_PER_FOOT).toFixed(precision)} meters + {(inchesStr === '' ? 0 : parseFloat(inchesStr) * METERS_PER_INCH).toFixed(precision)} meters = {meters.toFixed(precision)} meters
                </div>
              )}
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
                    Feet
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Meters
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Centimeters
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[1, 3, 5, 10, 15, 20, 25, 30, 50, 100].map((ft) => {
                  const meterValue = ft * METERS_PER_FOOT;
                  const cmValue = meterValue * 100;
                  
                  return (
                    <tr key={ft} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {ft} ft
                      </td>
                      <td className="calculator-table-cell">
                        {meterValue.toFixed(precision)} m
                      </td>
                      <td className="calculator-table-cell">
                        {cmValue.toFixed(precision)} cm
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

export default FeetToMetersCalculator; 