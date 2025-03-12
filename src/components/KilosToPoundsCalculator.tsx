'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

interface KilosToPoundsCalculatorProps {
  calculator?: Calculator;
}

const KilosToPoundsCalculator: React.FC<KilosToPoundsCalculatorProps> = ({ calculator }) => {
  // Input state - change from number to string
  const [kilogramsStr, setKilogramsStr] = useState<string>('70');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [pounds, setPounds] = useState<number | null>(null);
  const [ounces, setOunces] = useState<number | null>(null);
  
  // Constants for conversion
  const POUNDS_PER_KG = 2.20462;
  const OUNCES_PER_KG = 35.27396;
  const OUNCES_PER_POUND = 16;
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertKilosToPounds();
  }, [kilogramsStr, precision]);
  
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
  
  // Convert kilograms to pounds
  const convertKilosToPounds = () => {
    if (kilogramsStr === '') {
      setPounds(null);
      setOunces(null);
      return;
    }
    
    const kilograms = parseFloat(kilogramsStr);
    
    // Calculate pounds
    const poundsValue = kilograms * POUNDS_PER_KG;
    setPounds(Number(poundsValue.toFixed(precision)));
    
    // Calculate ounces (total)
    const ouncesValue = kilograms * OUNCES_PER_KG;
    setOunces(Number(ouncesValue.toFixed(precision)));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className={calculatorSectionHeaderClasses}>Kilograms to Pounds Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label htmlFor="kilograms" className="block text-sm font-medium text-gray-300 mb-1">
                Kilograms
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="kilograms"
                  className={inputClasses}
                  value={kilogramsStr}
                  onChange={(e) => handleNumberInput(e, setKilogramsStr)} {...decimalInputProps}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">kg</span>
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
            </select>
          </div>
        </div>
        
        <div className="calculator-card p-6 rounded-lg shadow-lg">
          <h3 className={calculatorSectionHeaderClasses}>Conversion Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Kilograms</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {kilogramsStr === '' ? '0' : parseFloat(kilogramsStr).toFixed(precision)} kg
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Pounds</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {pounds !== null ? pounds.toFixed(precision) : '0'} lb
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Ounces</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-400">
                {ounces !== null ? ounces.toFixed(precision) : '0'} oz
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Pounds and Ounces</div>
              <div className="text-xl sm:text-2xl font-bold text-purple-400">
                {pounds !== null ? `${Math.floor(pounds)} lb ${((pounds - Math.floor(pounds)) * OUNCES_PER_POUND).toFixed(precision)} oz` : '0 lb 0 oz'}
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className={resultLabelClasses}>Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {kilogramsStr === '' ? '0' : kilogramsStr} kilograms × 2.20462 = {pounds !== null ? pounds.toFixed(precision) : '0'} pounds
              </div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {kilogramsStr === '' ? '0' : kilogramsStr} kilograms × 35.27396 = {ounces !== null ? ounces.toFixed(precision) : '0'} ounces
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
                    Kilograms
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Pounds
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Pounds & Ounces
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[1, 5, 10, 20, 25, 50, 60, 70, 80, 100].map((kg) => {
                  const poundsValue = kg * POUNDS_PER_KG;
                  const wholePounds = Math.floor(poundsValue);
                  const ouncesPart = (poundsValue - wholePounds) * OUNCES_PER_POUND;
                  
                  return (
                    <tr key={kg} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {kg} kg
                      </td>
                      <td className="calculator-table-cell">
                        {poundsValue.toFixed(precision)} lb
                      </td>
                      <td className="calculator-table-cell">
                        {wholePounds} lb {ouncesPart.toFixed(precision)} oz
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

export default KilosToPoundsCalculator; 