import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { decimalInputProps } from '@/utils/inputUtils';


const OuncesToGramsCalculator: React.FC = () => {
  // Change from number to string state variables
  const [ouncesStr, setOuncesStr] = useState<string>('');
  const [grams, setGrams] = useState<number | null>(null);

  useEffect(() => {
    // Only calculate when ouncesStr has a value
    if (ouncesStr !== '') {
      const ouncesValue = parseFloat(ouncesStr);
      const gramsValue = ouncesValue * 28.3495;
      setGrams(gramsValue);
    } else {
      setGrams(null);
    }
  }, [ouncesStr]);

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
        <title>Ounces to Grams Calculator | Convert oz to g</title>
        <meta name="description" content="Convert ounces to grams with our easy-to-use calculator. Get accurate conversions instantly." />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center">Ounces to Grams Calculator</h1>
      
      <div className="calculator-card rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="ounces" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Ounces (oz)</label>
          <input
            id="ounces"
            type="tel"
            value={ouncesStr}
            onChange={(e) => handleNumberInput(e, setOuncesStr)} {...decimalInputProps}
            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter weight in ounces"
          />
        </div>

        <div className="mt-6 p-4 bg-gray-100/50 dark:bg-gray-800/50 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          {grams !== null ? (
            <p className="text-xl">
              {ouncesStr} ounces = <span className="font-bold">{grams.toFixed(2)}</span> grams
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Enter a value to see the conversion</p>
          )}
        </div>
      </div>

      <div className="calculator-card rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">How to Convert Ounces to Grams</h2>
        <p className="mb-4">
          To convert ounces to grams, multiply the ounce value by 28.3495.
        </p>
        <div className="bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded-md mb-4">
          <p className="font-medium">Formula:</p>
          <p className="font-mono">Grams = Ounces × 28.3495</p>
        </div>
        <h3 className="text-xl font-bold mb-2">Example:</h3>
        <p className="mb-4">
          Convert 5 ounces to grams:
        </p>
        <p className="mb-2">
          Grams = 5 oz × 28.3495 = 141.7475 grams
        </p>
        <p>
          Therefore, 5 ounces is equal to 141.75 grams.
        </p>
      </div>
    </div>
  );
};

export default OuncesToGramsCalculator; 