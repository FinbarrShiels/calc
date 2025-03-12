'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

interface AmpsToWattsCalculatorProps {
  calculator?: Calculator;
}

const AmpsToWattsCalculator: React.FC<AmpsToWattsCalculatorProps> = ({ calculator }) => {
  // Input state
  const [ampsStr, setAmpsStr] = useState<string>('10');
  const [voltsStr, setVoltsStr] = useState<string>('120');
  const [powerFactorStr, setPowerFactorStr] = useState<string>('1');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [watts, setWatts] = useState<number>(0);
  const [kiloWatts, setKiloWatts] = useState<number>(0);
  
  // Calculate conversion when inputs change
  useEffect(() => {
    calculateWatts();
  }, [ampsStr, voltsStr, powerFactorStr, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle amps input change with proper validation
  const handleAmpsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setAmpsStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setAmpsStr(value);
    }
  };
  
  // Handle volts input change with proper validation
  const handleVoltsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setVoltsStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setVoltsStr(value);
    }
  };
  
  // Handle power factor input change with proper validation
  const handlePowerFactorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setPowerFactorStr('');
      return;
    }
    
    // Validate the input is a number between 0 and 1
    if (/^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value);
      if (numValue <= 1) {
        setPowerFactorStr(value);
      }
    }
  };
  
  // Calculate watts from amps
  const calculateWatts = () => {
    const amps = ampsStr === '' ? 0 : parseFloat(ampsStr);
    const volts = voltsStr === '' ? 0 : parseFloat(voltsStr);
    const powerFactor = powerFactorStr === '' ? 1 : parseFloat(powerFactorStr);
    
    // P = I × V × PF (Power = Current × Voltage × Power Factor)
    const calculatedWatts = amps * volts * powerFactor;
    setWatts(Number(calculatedWatts.toFixed(precision)));
    setKiloWatts(Number((calculatedWatts / 1000).toFixed(precision)));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className={calculatorSectionHeaderClasses}>Amps to Watts Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="amps" className="block text-sm font-medium text-gray-300 mb-1">
                Current
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="amps"
                  className={inputClasses}
                  value={ampsStr} {...numericInputProps}
                  onChange={handleAmpsChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">A</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="volts" className="block text-sm font-medium text-gray-300 mb-1">
                Voltage
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="volts"
                  className={inputClasses}
                  value={voltsStr} {...numericInputProps}
                  onChange={handleVoltsChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">V</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="powerFactor" className="block text-sm font-medium text-gray-300 mb-1">
                Power Factor
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="powerFactor"
                  className={inputClasses}
                  value={powerFactorStr} {...numericInputProps}
                  onChange={handlePowerFactorChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">PF</span>
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
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className={calculatorSectionHeaderClasses}>Conversion Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Input Values</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {ampsStr === '' ? '0' : parseFloat(ampsStr).toLocaleString()} A × {voltsStr === '' ? '0' : parseFloat(voltsStr).toLocaleString()} V
              </div>
              <div className={resultLabelClasses}>
                Power Factor: {powerFactorStr === '' ? '1' : parseFloat(powerFactorStr).toLocaleString()}
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Power (Watts)</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {watts.toFixed(precision)} W
              </div>
              <div className={resultLabelClasses}>
                {kiloWatts.toFixed(precision)} kW
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className={resultLabelClasses}>Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                Power (W) = Current (A) × Voltage (V) × Power Factor
              </div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {ampsStr === '' ? '0' : parseFloat(ampsStr).toLocaleString()} A × {voltsStr === '' ? '0' : parseFloat(voltsStr).toLocaleString()} V × {powerFactorStr === '' ? '1' : parseFloat(powerFactorStr).toLocaleString()} = {watts.toFixed(precision)} W
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className={calculatorSectionHeaderClasses}>Common Conversions</h3>
          
          <div className="overflow-x-auto">
            <table className="calculator-table">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Current (A)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Voltage (V)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Power (W)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[1, 2, 5, 10, 15, 20, 30, 40, 50, 100].map((amp) => {
                  const volt = 120;
                  const pf = 1;
                  const wattValue = amp * volt * pf;
                  
                  return (
                    <tr key={amp} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {amp} A
                      </td>
                      <td className="calculator-table-cell">
                        {volt} V
                      </td>
                      <td className="calculator-table-cell">
                        {wattValue.toFixed(precision)} W
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

export default AmpsToWattsCalculator; 