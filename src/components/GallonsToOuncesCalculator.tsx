'use client';

import React, { useState, useEffect } from 'react';
import { decimalInputProps } from '@/utils/inputUtils';


const GallonsToOuncesCalculator: React.FC = () => {
  // Input state
  const [gallonsStr, setGallonsStr] = useState<string>('1');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [ounces, setOunces] = useState<number | null>(null);
  
  // Constants for conversion
  const FLUID_OUNCES_PER_GALLON = 128;
  
  useEffect(() => {
    convertGallonsToOunces();
  }, [gallonsStr, precision]);
  
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
  
  // Convert gallons to fluid ounces
  const convertGallonsToOunces = () => {
    if (gallonsStr === '') {
      setOunces(null);
      return;
    }
    
    const gallons = parseFloat(gallonsStr);
    const ouncesValue = gallons * FLUID_OUNCES_PER_GALLON;
    setOunces(Number(ouncesValue.toFixed(precision)));
  };
  
  return (
    <div className="calculator-input">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2 text-white dark:text-gray-900">Gallons to Fluid Ounces Calculator</h1>
        <p className="text-gray-300 mb-6">Convert gallons to fluid ounces with precision. Perfect for cooking, recipes, and liquid measurements.</p>
        
        <div className="calculator-card-alt rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="calculator-section-header">Gallons to Fluid Ounces Calculator</h2>
            
            <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
              <div className="mb-4">
                <label htmlFor="gallons" className="block text-sm font-medium text-gray-300 mb-1">
                  Gallons
                </label>
                <div className="relative">
                  <input
                    id="gallons"
                    type="tel"
                    value={gallonsStr}
                    onChange={(e) => handleNumberInput(e, setGallonsStr)} {...decimalInputProps}
                    className="calculator-input"
                    placeholder="Enter volume in gallons"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">gal</span>
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
                  <div className="text-sm text-gray-600 dark:text-gray-300">Gallons</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">
                    {gallonsStr === '' ? '0' : parseFloat(gallonsStr).toLocaleString()} gal
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Fluid Ounces</div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">
                    {ounces !== null ? ounces.toFixed(precision) : '0'} fl oz
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    {gallonsStr === '' ? '0' : gallonsStr} gallons × 128 = {ounces !== null ? ounces.toFixed(precision) : '0'} fluid ounces
                  </div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    1 gallon = 128 fluid ounces
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
                        Gallons (gal)
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Fluid Ounces (fl oz)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                    {[0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5, 10].map((gal) => {
                      const ouncesValue = gal * FLUID_OUNCES_PER_GALLON;
                      
                      return (
                        <tr key={gal} className="hover:bg-muted">
                          <td className="calculator-table-cell">
                            {gal} gal
                          </td>
                          <td className="calculator-table-cell">
                            {ouncesValue.toFixed(precision)} fl oz
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

export default GallonsToOuncesCalculator; 