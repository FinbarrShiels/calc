'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

interface InchesToCentimetersCalculatorProps {
  calculator?: Calculator;
}

const InchesToCentimetersCalculator: React.FC<InchesToCentimetersCalculatorProps> = ({ calculator }) => {
  // Input state
  const [inchesStr, setInchesStr] = useState<string>('10');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [centimeters, setCentimeters] = useState<number>(0);
  
  // Constants for conversion
  const CM_PER_INCH = 2.54;
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertInchesToCm();
  }, [inchesStr, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle input change with proper validation
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
  
  // Convert inches to centimeters
  const convertInchesToCm = () => {
    const inches = inchesStr === '' ? 0 : parseFloat(inchesStr);
    const calculatedCm = inches * CM_PER_INCH;
    setCentimeters(Number(calculatedCm.toFixed(precision)));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className={calculatorSectionHeaderClasses}>Inches to Centimeters Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="mb-4">
            <label htmlFor="inches" className="block text-sm font-medium text-gray-300 mb-1">
              Inches
            </label>
            <div className="relative">
              <input
                type="tel"
                id="inches"
                className={inputClasses}
                value={inchesStr} {...numericInputProps}
                onChange={handleInchesChange}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">in</span>
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
              <div className={resultLabelClasses}>Inches</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {inchesStr === '' ? '0' : parseFloat(inchesStr).toLocaleString()} in
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Centimeters</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {centimeters.toFixed(precision)} cm
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className={resultLabelClasses}>Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {inchesStr === '' ? '0' : parseFloat(inchesStr).toLocaleString()} inches × 2.54 = {centimeters.toFixed(precision)} centimeters
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
                    Inches
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Centimeters
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[1, 2, 3, 6, 12, 18, 24, 36, 48, 60].map((inch) => {
                  const cmValue = inch * CM_PER_INCH;
                  
                  return (
                    <tr key={inch} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {inch} in
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

export default InchesToCentimetersCalculator; 