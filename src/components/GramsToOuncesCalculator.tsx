import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { decimalInputProps } from '@/utils/inputUtils';


const GramsToOuncesCalculator: React.FC = () => {
  // Change from number to string state variables
  const [gramsStr, setGramsStr] = useState<string>('');
  const [ounces, setOunces] = useState<number | null>(null);

  useEffect(() => {
    // Only calculate when gramsStr has a value
    if (gramsStr !== '') {
      const gramsValue = parseFloat(gramsStr);
      const ouncesValue = gramsValue / 28.3495;
      setOunces(ouncesValue);
    } else {
      setOunces(null);
    }
  }, [gramsStr]);

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
        <title>Grams to Ounces Calculator | Convert g to oz</title>
        <meta name="description" content="Convert grams to ounces with our easy-to-use calculator. Get accurate conversions instantly." />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center">Grams to Ounces Calculator</h1>
      
      <div className="calculator-card rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="grams" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Grams (g)</label>
          <input
            id="grams"
            type="tel"
            value={gramsStr}
            onChange={(e) => handleNumberInput(e, setGramsStr)} {...decimalInputProps}
            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter weight in grams"
          />
        </div>

        <div className="mt-6 p-4 bg-gray-100/50 dark:bg-gray-800/50 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          {ounces !== null ? (
            <p className="text-xl">
              {gramsStr} grams = <span className="font-bold">{ounces.toFixed(2)}</span> ounces
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Enter a value to see the conversion</p>
          )}
        </div>
      </div>

      <div className="calculator-card rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">How to Convert Grams to Ounces</h2>
        <p className="mb-4">
          To convert grams to ounces, divide the gram value by 28.3495.
        </p>
        <div className="bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded-md mb-4">
          <p className="font-medium">Formula:</p>
          <p className="font-mono">Ounces = Grams ÷ 28.3495</p>
        </div>
        <h3 className="text-xl font-bold mb-2">Example:</h3>
        <p className="mb-4">
          Convert 100 grams to ounces:
        </p>
        <p className="mb-2">
          Ounces = 100 g ÷ 28.3495 = 3.5274 ounces
        </p>
        <p>
          Therefore, 100 grams is equal to 3.53 ounces.
        </p>
      </div>
    </div>
  );
};

export default GramsToOuncesCalculator; 