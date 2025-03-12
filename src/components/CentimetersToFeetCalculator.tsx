'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

interface CentimetersToFeetCalculatorProps {
  calculator?: Calculator;
}

type ConversionDirection = 'cmToFeet' | 'feetToCm';

const CentimetersToFeetCalculator: React.FC<CentimetersToFeetCalculatorProps> = ({ calculator }) => {
  // Input state
  const [centimetersStr, setCentimetersStr] = useState<string>('180');
  const [feetStr, setFeetStr] = useState<string>('5');
  const [inchesStr, setInchesStr] = useState<string>('11');
  const [conversionDirection, setConversionDirection] = useState<ConversionDirection>('cmToFeet');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [resultFeet, setResultFeet] = useState<number>(0);
  const [resultInches, setResultInches] = useState<number>(0);
  const [resultCentimeters, setResultCentimeters] = useState<number>(0);
  const [resultTotalInches, setResultTotalInches] = useState<number>(0);
  
  // Constants for conversion
  const CM_PER_INCH = 2.54;
  const INCHES_PER_FOOT = 12;
  const CM_PER_FOOT = CM_PER_INCH * INCHES_PER_FOOT;
  
  // Calculate conversions when inputs change
  useEffect(() => {
    if (conversionDirection === 'cmToFeet') {
      convertCmToFeet();
    } else {
      convertFeetToCm();
    }
  }, [centimetersStr, feetStr, inchesStr, conversionDirection, precision]);
  
  // Handle conversion direction change
  const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConversionDirection(e.target.value as ConversionDirection);
  };
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle centimeters input change with proper validation
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
  
  // Handle feet input change with proper validation
  const handleFeetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setFeetStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setFeetStr(value);
    }
  };
  
  // Handle inches input change with proper validation
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
  
  // Convert centimeters to feet and inches
  const convertCmToFeet = () => {
    const centimeters = centimetersStr === '' ? 0 : parseFloat(centimetersStr);
    
    // Calculate total inches
    const totalInches = centimeters / CM_PER_INCH;
    setResultTotalInches(Number(totalInches.toFixed(precision)));
    
    // Calculate feet (whole number)
    const feet = Math.floor(totalInches / INCHES_PER_FOOT);
    setResultFeet(feet);
    
    // Calculate remaining inches
    const inches = totalInches % INCHES_PER_FOOT;
    setResultInches(Number(inches.toFixed(precision)));
  };
  
  // Convert feet and inches to centimeters
  const convertFeetToCm = () => {
    const feet = feetStr === '' ? 0 : parseFloat(feetStr);
    const inches = inchesStr === '' ? 0 : parseFloat(inchesStr);
    
    // Calculate total centimeters
    const totalCm = (feet * CM_PER_FOOT) + (inches * CM_PER_INCH);
    setResultCentimeters(Number(totalCm.toFixed(precision)));
  };
  
  // Format feet and inches for display
  const formatFeetInches = (feet: number, inches: number): string => {
    if (feet === 0) {
      return `${inches.toFixed(precision)} in`;
    }
    
    return `${feet}' ${inches.toFixed(precision)}"`;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className={calculatorSectionHeaderClasses}>Centimeters to Feet Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="mb-4">
            <label htmlFor="conversionDirection" className="block text-sm font-medium text-gray-300 mb-1">
              Conversion Direction
            </label>
            <select
              id="conversionDirection"
              className={inputClasses}
              value={conversionDirection}
              onChange={handleDirectionChange}
            >
              <option value="cmToFeet">Centimeters to Feet & Inches</option>
              <option value="feetToCm">Feet & Inches to Centimeters</option>
            </select>
          </div>
          
          {conversionDirection === 'cmToFeet' ? (
            <div className="mb-4">
              <label htmlFor="centimeters" className="block text-sm font-medium text-gray-300 mb-1">
                Centimeters
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="centimeters"
                  className={inputClasses}
                  value={centimetersStr} {...numericInputProps}
                  onChange={handleCentimetersChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">cm</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="feet" className="block text-sm font-medium text-gray-300 mb-1">
                  Feet
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="feet"
                    className={inputClasses}
                    value={feetStr} {...numericInputProps}
                    onChange={handleFeetChange}
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">ft</span>
                </div>
              </div>
              
              <div>
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
            </div>
          )}
          
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
          
          {conversionDirection === 'cmToFeet' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className={resultLabelClasses}>Centimeters</div>
                <div className="text-xl sm:text-2xl font-bold text-blue-400">
                  {centimetersStr === '' ? '0' : parseFloat(centimetersStr).toLocaleString()} cm
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className={resultLabelClasses}>Feet and Inches</div>
                <div className="text-xl sm:text-2xl font-bold text-green-400">
                  {resultFeet} ft {resultInches.toFixed(precision)} in
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className={resultLabelClasses}>Total Inches</div>
                <div className="text-xl sm:text-2xl font-bold text-orange-400">
                  {resultTotalInches.toFixed(precision)} in
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
                <div className={resultLabelClasses}>Conversion Formula</div>
                <div className="text-md font-medium text-gray-300 mt-1">
                  {centimetersStr === '' ? '0' : parseFloat(centimetersStr).toLocaleString()} cm ÷ 2.54 = {resultTotalInches.toFixed(precision)} inches
                </div>
                <div className="text-md font-medium text-gray-300 mt-1">
                  {resultTotalInches.toFixed(precision)} inches ÷ 12 = {resultFeet} feet and {resultInches.toFixed(precision)} inches
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className={resultLabelClasses}>Feet and Inches</div>
                <div className="text-xl sm:text-2xl font-bold text-blue-400">
                  {feetStr === '' ? '0' : parseFloat(feetStr).toLocaleString()} ft {inchesStr === '' ? '0' : parseFloat(inchesStr).toLocaleString()} in
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className={resultLabelClasses}>Centimeters</div>
                <div className="text-xl sm:text-2xl font-bold text-green-400">
                  {resultCentimeters.toFixed(precision)} cm
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
                <div className={resultLabelClasses}>Conversion Formula</div>
                <div className="text-md font-medium text-gray-300 mt-1">
                  ({feetStr === '' ? '0' : parseFloat(feetStr).toLocaleString()} feet × 30.48) + ({inchesStr === '' ? '0' : parseFloat(inchesStr).toLocaleString()} inches × 2.54) = {resultCentimeters.toFixed(precision)} centimeters
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className={calculatorSectionHeaderClasses}>Common Conversions</h3>
          
          {conversionDirection === 'cmToFeet' ? (
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
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Total Inches
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                  {[30, 60, 90, 120, 150, 180, 210, 240, 270, 300].map((cm) => {
                    const totalInches = cm / CM_PER_INCH;
                    const feet = Math.floor(totalInches / INCHES_PER_FOOT);
                    const inches = totalInches % INCHES_PER_FOOT;
                    
                    return (
                      <tr key={cm} className="hover:bg-muted">
                        <td className="calculator-table-cell">
                          {cm} cm
                        </td>
                        <td className="calculator-table-cell">
                          {feet} ft {inches.toFixed(precision)} in
                        </td>
                        <td className="calculator-table-cell">
                          {totalInches.toFixed(precision)} in
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="calculator-table">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Feet
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Centimeters
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ft) => {
                    const cmValue = ft * CM_PER_FOOT;
                    
                    return (
                      <tr key={ft} className="hover:bg-muted">
                        <td className="calculator-table-cell">
                          {ft} ft
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CentimetersToFeetCalculator; 