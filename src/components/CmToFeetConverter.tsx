"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface CmToFeetConverterProps {
  calculator?: Calculator;
}

const CmToFeetConverter: React.FC<CmToFeetConverterProps> = ({ calculator }) => {
  const [cmStr, setCmStr] = useState<string>('180');
  const [precision, setPrecision] = useState<number>(2);
  
  const [feet, setFeet] = useState<number>(0);
  const [inches, setInches] = useState<number>(0);
  
  const CM_PER_INCH = 2.54;
  const INCHES_PER_FOOT = 12;
  
  useEffect(() => {
    convertCmToFeet();
  }, [cmStr, precision]);
  
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  const handleCmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value === '') {
      setCmStr('');
      return;
    }
    
    if (/^\d*\.?\d*$/.test(value)) {
      setCmStr(value);
    }
  };
  
  const convertCmToFeet = () => {
    const cm = cmStr === '' ? 0 : parseFloat(cmStr);
    
    const totalInches = cm / CM_PER_INCH;
    
    const feetValue = Math.floor(totalInches / INCHES_PER_FOOT);
    const inchesValue = totalInches % INCHES_PER_FOOT;
    
    setFeet(feetValue);
    setInches(Number(inchesValue.toFixed(precision)));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto text-white dark:text-gray-900">
      <div className="mb-6">
        <h2 className="calculator-section-header">Centimeters to Feet Converter</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="mb-4">
            <label htmlFor="cm" className="block text-sm font-medium text-gray-300 mb-1">
              Centimeters
            </label>
            <div className="relative">
              <input
                type="tel"
                id="cm"
                className="calculator-input"
                value={cmStr}
                onChange={handleCmChange} {...decimalInputProps}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">cm</span>
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
              <div className="text-sm text-gray-600 dark:text-gray-300">Centimeters</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {cmStr === '' ? '0' : parseFloat(cmStr).toLocaleString()} cm
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Feet and Inches</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {feet} ft {inches.toFixed(precision)} in
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {cmStr === '' ? '0' : parseFloat(cmStr).toLocaleString()} cm ÷ 2.54 = {(cmStr === '' ? 0 : parseFloat(cmStr) / CM_PER_INCH).toFixed(precision)} inches
              </div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {(cmStr === '' ? 0 : parseFloat(cmStr) / CM_PER_INCH).toFixed(precision)} inches = {feet} feet and {inches.toFixed(precision)} inches
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
                    Centimeters
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Feet and Inches
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[30, 60, 90, 120, 150, 180, 210, 240, 270, 300].map((cm) => {
                  const totalInches = cm / CM_PER_INCH;
                  const feetValue = Math.floor(totalInches / INCHES_PER_FOOT);
                  const inchesValue = totalInches % INCHES_PER_FOOT;
                  
                  return (
                    <tr key={cm} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {cm} cm
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

export default CmToFeetConverter; 