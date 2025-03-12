'use client';

import React, { useState, useEffect } from 'react';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

const SquareMetersToSquareFtCalculator: React.FC = () => {
  // Input state
  const [squareMetersStr, setSquareMetersStr] = useState<string>('100');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [squareFeet, setSquareFeet] = useState<number | null>(null);
  
  // Constants for conversion
  const SQUARE_FEET_PER_SQUARE_METER = 10.7639;
  
  useEffect(() => {
    convertSquareMetersToSquareFeet();
  }, [squareMetersStr, precision]);
  
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
  
  // Convert square meters to square feet
  const convertSquareMetersToSquareFeet = () => {
    if (squareMetersStr === '') {
      setSquareFeet(null);
      return;
    }
    
    const squareMeters = parseFloat(squareMetersStr);
    const squareFeetValue = squareMeters * SQUARE_FEET_PER_SQUARE_METER;
    setSquareFeet(Number(squareFeetValue.toFixed(precision)));
  };
  
  return (
    <div className={inputClasses}>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2 text-white dark:text-gray-900">Square Meters to Square Feet Calculator</h1>
        <p className="text-gray-300 mb-6">Convert square meters (m²) to square feet (sq ft) with precision. Perfect for real estate, construction, and international measurements.</p>
        
        <div className="calculator-card-alt rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className={calculatorSectionHeaderClasses}>Square Meters to Square Feet Calculator</h2>
            
            <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
              <div className="mb-4">
                <label htmlFor="squareMeters" className="block text-sm font-medium text-gray-300 mb-1">
                  Square Meters
                </label>
                <div className="relative">
                  <input
                    id="squareMeters"
                    type="tel"
                    value={squareMetersStr}
                    onChange={(e) => handleNumberInput(e, setSquareMetersStr)} {...decimalInputProps}
                    className={inputClasses}
                    placeholder="Enter area in square meters"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">m²</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="precision" className="block text-sm font-medium text-gray-300 mb-1">
                  Decimal Precision
                </label>
                <select
                  id="precision"
                  className={inputClasses}
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
              <h3 className={calculatorSectionHeaderClasses}>Conversion Results</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className={resultLabelClasses}>Square Meters</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">
                    {squareMetersStr === '' ? '0' : parseFloat(squareMetersStr).toLocaleString()} m²
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className={resultLabelClasses}>Square Feet</div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">
                    {squareFeet !== null ? squareFeet.toFixed(precision) : '0'} sq ft
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
                  <div className={resultLabelClasses}>Conversion Formula</div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    {squareMetersStr === '' ? '0' : squareMetersStr} square meters × 10.7639 = {squareFeet !== null ? squareFeet.toFixed(precision) : '0'} square feet
                  </div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    1 square meter = 10.7639 square feet
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 calculator-card-alt p-6 rounded-lg shadow-lg">
              <h3 className={calculatorSectionHeaderClasses}>Common Conversions</h3>
              
              <div className="overflow-x-auto">
                <table className="calculator-table">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Square Meters (m²)
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Square Feet (sq ft)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                    {[1, 5, 10, 20, 50, 100, 200, 500, 1000, 2000].map((sqm) => {
                      const sqftValue = sqm * SQUARE_FEET_PER_SQUARE_METER;
                      
                      return (
                        <tr key={sqm} className="hover:bg-muted">
                          <td className="calculator-table-cell">
                            {sqm.toLocaleString()} m²
                          </td>
                          <td className="calculator-table-cell">
                            {sqftValue.toFixed(precision)} sq ft
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

export default SquareMetersToSquareFtCalculator; 