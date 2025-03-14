'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/theme-utils';

// Added by fix-all-calculators script
const calculatorSectionHeaderClasses = "calculator-section-header";

// Added by fix-all-calculators script
const cardClasses = "calculator-card";

// Added by fix-all-calculators script
const inputSuffixClasses = "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400";

// Added by fix-all-calculators script
const inputPrefixClasses = "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400";

// Added by fix-all-calculators script
const labelClasses = "calculator-label";

// Added by fix-all-calculators script
const selectClasses = "calculator-select";

// Added by fix-all-calculators script
const inputClasses = "calculator-input";

// Added by fix-all-calculators script
const currencyButtonInactiveClasses = "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300";

// Added by fix-all-calculators script
const currencyButtonActiveClasses = "bg-blue-600 text-white";

// Added by fix-all-calculators script
const secondaryButtonClasses = "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold py-2 px-4 rounded-md transition duration-200";

// Added by fix-all-calculators script
const buttonClasses = "calculator-button";

// Added by fix-all-calculators script
const resultDisplayClasses = "calculator-result";

// Added by fix-all-calculators script
const resultValueClasses = "text-2xl font-semibold text-gray-900 dark:text-white mt-1";

// Added by fix-all-calculators script
const resultLabelClasses = "text-sm text-gray-600 dark:text-gray-300";

interface CentimetersToInchesCalculatorProps {
  calculator?: Calculator;
}

const CentimetersToInchesCalculator: React.FC<CentimetersToInchesCalculatorProps> = ({ calculator }) => {
  // Input state
  const [centimetersStr, setCentimetersStr] = useState<string>('100');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [inches, setInches] = useState<number>(0);
  
  // Constants for conversion
  const CM_PER_INCH = 2.54;
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertCmToInches();
  }, [centimetersStr, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle input change with proper validation
  const handleCentimetersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setCentimetersStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setCentimetersStr(value);
    }
  };
  
  // Convert centimeters to inches
  const convertCmToInches = () => {
    const centimeters = centimetersStr === '' ? 0 : parseFloat(centimetersStr);
    const calculatedInches = centimeters / CM_PER_INCH;
    setInches(Number(calculatedInches.toFixed(precision)));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="calculator-section-header">Centimeters to Inches Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="mb-4">
            <label htmlFor="centimeters" className="block text-sm font-medium text-gray-300 mb-1">
              Centimeters
            </label>
            <div className="relative">
              <input
                type="tel"
                id="centimeters"
                className="calculator-input"
                value={centimetersStr} {...numericInputProps}
                onChange={handleCentimetersChange}
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
                {centimetersStr === '' ? '0' : parseFloat(centimetersStr).toLocaleString()} cm
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Inches</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {inches.toFixed(precision)} in
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {centimetersStr === '' ? '0' : parseFloat(centimetersStr).toLocaleString()} cm ÷ 2.54 = {inches.toFixed(precision)} inches
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
                    Inches
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[1, 5, 10, 20, 30, 50, 100, 150, 200].map((cm) => {
                  const inchValue = cm / CM_PER_INCH;
                  
                  return (
                    <tr key={cm} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {cm} cm
                      </td>
                      <td className="calculator-table-cell">
                        {inchValue.toFixed(precision)} in
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

export default CentimetersToInchesCalculator; 