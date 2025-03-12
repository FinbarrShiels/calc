'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

interface MicrogramsToGramsCalculatorProps {
  calculator?: Calculator;
}

const MicrogramsToGramsCalculator: React.FC<MicrogramsToGramsCalculatorProps> = ({ calculator }) => {
  // Input state
  const [microgramsStr, setMicrogramsStr] = useState<string>('1000000');
  const [precision, setPrecision] = useState<number>(6);
  
  // Result state
  const [grams, setGrams] = useState<number>(0);
  
  // Constants for conversion
  const GRAMS_PER_MICROGRAM = 0.000001;
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertMicrogramsToGrams();
  }, [microgramsStr, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle input change with proper validation
  const handleMicrogramsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setMicrogramsStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*$/.test(value)) {
      setMicrogramsStr(value);
    }
  };
  
  // Convert micrograms to grams
  const convertMicrogramsToGrams = () => {
    const micrograms = microgramsStr === '' ? 0 : parseInt(microgramsStr);
    const gramsValue = micrograms * GRAMS_PER_MICROGRAM;
    setGrams(Number(gramsValue.toFixed(precision)));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className={calculatorSectionHeaderClasses}>Micrograms to Grams Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label htmlFor="micrograms" className="block text-sm font-medium text-gray-300 mb-1">
                Micrograms
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="micrograms"
                  className={inputClasses}
                  value={microgramsStr} {...numericInputProps}
                  onChange={handleMicrogramsChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">μg</span>
              </div>
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
              <option value="3">3 decimal places</option>
              <option value="4">4 decimal places</option>
              <option value="5">5 decimal places</option>
              <option value="6">6 decimal places</option>
              <option value="8">8 decimal places</option>
              <option value="10">10 decimal places</option>
            </select>
          </div>
        </div>
        
        <div className="calculator-card p-6 rounded-lg shadow-lg">
          <h3 className={calculatorSectionHeaderClasses}>Conversion Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Micrograms</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {microgramsStr === '' ? '0' : parseInt(microgramsStr).toLocaleString()} μg
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Grams</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {grams.toFixed(precision)} g
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className={resultLabelClasses}>Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {microgramsStr === '' ? '0' : parseInt(microgramsStr).toLocaleString()} micrograms × 0.000001 = {grams.toFixed(precision)} grams
              </div>
              <div className="text-md font-medium text-gray-300 mt-1">
                1 gram = 1,000,000 micrograms
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 calculator-card p-6 rounded-lg shadow-lg">
          <h3 className={calculatorSectionHeaderClasses}>Common Conversions</h3>
          
          <div className="overflow-x-auto">
            <table className="calculator-table">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Micrograms (μg)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Grams (g)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[1, 10, 100, 1000, 10000, 100000, 500000, 1000000, 5000000, 10000000].map((mcg) => {
                  const gramsValue = mcg * GRAMS_PER_MICROGRAM;
                  
                  return (
                    <tr key={mcg} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {mcg.toLocaleString()} μg
                      </td>
                      <td className="calculator-table-cell">
                        {gramsValue.toFixed(precision)} g
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

export default MicrogramsToGramsCalculator; 