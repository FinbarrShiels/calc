import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { decimalInputProps } from '@/utils/inputUtils';


const PoundsToKgCalculator: React.FC = () => {
  // Change from number to string state variables
  const [poundsStr, setPoundsStr] = useState<string>('');
  const [kg, setKg] = useState<number | null>(null);

  useEffect(() => {
    // Only calculate when poundsStr has a value
    if (poundsStr !== '') {
      const poundsValue = parseFloat(poundsStr);
      const kgValue = poundsValue / 2.20462;
      setKg(kgValue);
    } else {
      setKg(null);
    }
  }, [poundsStr]);

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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Helmet>
        <title>Pounds to Kg Calculator | Convert Pounds to Kilograms</title>
        <meta name="description" content="Convert pounds to kilograms with our easy-to-use calculator. Get accurate conversions instantly." />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center">Pounds to Kg Calculator</h1>
      
      <div className="calculator-card rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="pounds" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Pounds (lb)</label>
          <input
            id="pounds"
            type="tel"
            value={poundsStr}
            onChange={(e) => handleNumberInput(e, setPoundsStr)} {...decimalInputProps}
            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter weight in pounds"
          />
        </div>

        <div className="mt-6 p-4 bg-gray-100/50 dark:bg-gray-800/50 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          {kg !== null ? (
            <p className="text-xl">
              {poundsStr} pounds = <span className="font-bold">{kg.toFixed(2)}</span> kilograms
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Enter a value to see the conversion</p>
          )}
        </div>
      </div>

      <div className="calculator-card rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">How to Convert Pounds to Kilograms</h2>
        <p className="mb-4">
          To convert pounds to kilograms, divide the pound value by 2.20462.
        </p>
        <div className="bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded-md mb-4">
          <p className="font-medium">Formula:</p>
          <p className="font-mono">Kilograms = Pounds ÷ 2.20462</p>
        </div>
        <h3 className="text-xl font-bold mb-2">Example:</h3>
        <p className="mb-4">
          Convert 10 pounds to kilograms:
        </p>
        <p className="mb-2">
          Kilograms = 10 lb ÷ 2.20462 = 4.5359 kilograms
        </p>
        <p>
          Therefore, 10 pounds is equal to 4.54 kilograms.
        </p>
      </div>
    </div>
  );
};

export default PoundsToKgCalculator; 