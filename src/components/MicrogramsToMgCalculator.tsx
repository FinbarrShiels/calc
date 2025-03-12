'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

interface MicrogramsToMgCalculatorProps {
  calculator?: Calculator;
}

const MicrogramsToMgCalculator: React.FC<MicrogramsToMgCalculatorProps> = ({ calculator }) => {
  // Input state - change from number to string
  const [microgramsStr, setMicrogramsStr] = useState<string>('1000');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [milligrams, setMilligrams] = useState<number | null>(null);
  
  // Constants for conversion
  const MG_PER_MICROGRAM = 0.001;
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertMicrogramsToMg();
  }, [microgramsStr, precision]);
  
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
  
  // Convert micrograms to milligrams
  const convertMicrogramsToMg = () => {
    if (microgramsStr === '') {
      setMilligrams(null);
      return;
    }
    
    const micrograms = parseFloat(microgramsStr);
    const mgValue = micrograms * MG_PER_MICROGRAM;
    setMilligrams(Number(mgValue.toFixed(precision)));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className={calculatorSectionHeaderClasses}>Micrograms to Milligrams Calculator</h2>
        
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
                  value={microgramsStr}
                  onChange={(e) => handleNumberInput(e, setMicrogramsStr)} {...decimalInputProps}
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
              <option value="0">0 decimal places</option>
              <option value="1">1 decimal place</option>
              <option value="2">2 decimal places</option>
              <option value="3">3 decimal places</option>
              <option value="4">4 decimal places</option>
              <option value="6">6 decimal places</option>
            </select>
          </div>
        </div>
        
        <div className="calculator-card p-6 rounded-lg shadow-lg">
          <h3 className={calculatorSectionHeaderClasses}>Conversion Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Micrograms</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {microgramsStr === '' ? '0' : parseFloat(microgramsStr).toLocaleString()} μg
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Milligrams</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {milligrams !== null ? milligrams.toFixed(precision) : '0'} mg
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className={resultLabelClasses}>Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {microgramsStr === '' ? '0' : parseFloat(microgramsStr).toLocaleString()} micrograms × 0.001 = {milligrams !== null ? milligrams.toFixed(precision) : '0'} milligrams
              </div>
              <div className="text-md font-medium text-gray-300 mt-1">
                1 milligram = 1,000 micrograms
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
                    Milligrams (mg)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[1, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000].map((mcg) => {
                  const mgValue = mcg * MG_PER_MICROGRAM;
                  
                  return (
                    <tr key={mcg} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {mcg.toLocaleString()} μg
                      </td>
                      <td className="calculator-table-cell">
                        {mgValue.toFixed(precision)} mg
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

export default MicrogramsToMgCalculator; 