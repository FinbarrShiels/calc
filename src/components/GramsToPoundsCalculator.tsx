'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface GramsToPoundsCalculatorProps {
  calculator?: Calculator;
}

const GramsToPoundsCalculator: React.FC<GramsToPoundsCalculatorProps> = ({ calculator }) => {
  // Input state - change from number to string
  const [gramsStr, setGramsStr] = useState<string>('1000');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [pounds, setPounds] = useState<number | null>(null);
  const [ounces, setOunces] = useState<number | null>(null);
  
  // Constants for conversion
  const POUNDS_PER_GRAM = 0.00220462;
  const OUNCES_PER_GRAM = 0.03527396;
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertGramsToPounds();
  }, [gramsStr, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Add proper input handler for number validation
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
  
  // Convert grams to pounds
  const convertGramsToPounds = () => {
    if (gramsStr === '') {
      setPounds(null);
      setOunces(null);
      return;
    }
    
    const grams = parseFloat(gramsStr);
    const poundsValue = grams * POUNDS_PER_GRAM;
    setPounds(Number(poundsValue.toFixed(precision)));
    
    // Calculate ounces (total)
    const ouncesValue = grams * OUNCES_PER_GRAM;
    setOunces(Number(ouncesValue.toFixed(precision)));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="calculator-section-header">Grams to Pounds Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label htmlFor="grams" className="block text-sm font-medium text-gray-300 mb-1">
                Grams
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="grams"
                  className="calculator-input"
                  value={gramsStr}
                  onChange={(e) => handleNumberInput(e, setGramsStr)} {...decimalInputProps}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">g</span>
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
              <div className="text-sm text-gray-600 dark:text-gray-300">Grams</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {gramsStr === '' ? '0' : parseFloat(gramsStr).toFixed(precision)} g
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Pounds</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {pounds !== null ? pounds.toFixed(precision) : '0'} lb
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Ounces</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-400">
                {ounces !== null ? ounces.toFixed(precision) : '0'} oz
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {gramsStr === '' ? '0' : gramsStr} grams × 0.00220462 = {pounds !== null ? pounds.toFixed(precision) : '0'} pounds
              </div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {gramsStr === '' ? '0' : gramsStr} grams × 0.03527396 = {ounces !== null ? ounces.toFixed(precision) : '0'} ounces
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
                    Grams
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Pounds
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Ounces
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[1, 10, 50, 100, 250, 453.59, 500, 1000, 2000, 5000].map((g) => {
                  const poundsValue = g * POUNDS_PER_GRAM;
                  const ouncesValue = g * OUNCES_PER_GRAM;
                  
                  return (
                    <tr key={g} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {g} g
                      </td>
                      <td className="calculator-table-cell">
                        {poundsValue.toFixed(precision)} lb
                      </td>
                      <td className="calculator-table-cell">
                        {ouncesValue.toFixed(precision)} oz
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

export default GramsToPoundsCalculator; 