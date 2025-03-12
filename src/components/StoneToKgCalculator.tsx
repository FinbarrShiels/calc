import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

const StoneToKgCalculator: React.FC = () => {
  // Change from number to string state variables
  const [stoneStr, setStoneStr] = useState<string>('');
  const [kg, setKg] = useState<number | null>(null);

  useEffect(() => {
    // Only calculate when stoneStr has a value
    if (stoneStr !== '') {
      const stoneValue = parseFloat(stoneStr);
      const kgValue = stoneValue * 6.35029;
      setKg(kgValue);
    } else {
      setKg(null);
    }
  }, [stoneStr]);

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
        <title>Stone to Kg Calculator | Convert Stone to Kilograms</title>
        <meta name="description" content="Convert stone to kilograms with our easy-to-use calculator. Get accurate conversions instantly." />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center">Stone to Kg Calculator</h1>
      
      <div className="calculator-card rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="stone" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Stone (st)</label>
          <input
            id="stone"
            type="tel"
            value={stoneStr}
            onChange={(e) => handleNumberInput(e, setStoneStr)} {...decimalInputProps}
            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter weight in stone"
          />
        </div>

        <div className="mt-6 p-4 bg-gray-100/50 dark:bg-gray-800/50 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          {kg !== null ? (
            <p className="text-xl">
              {stoneStr} stone = <span className="font-bold">{kg.toFixed(2)}</span> kilograms
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Enter a value to see the conversion</p>
          )}
        </div>
      </div>

      <div className="calculator-card rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">How to Convert Stone to Kilograms</h2>
        <p className="mb-4">
          To convert stone to kilograms, multiply the stone value by 6.35029.
        </p>
        <div className="bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded-md mb-4">
          <p className="font-medium">Formula:</p>
          <p className="font-mono">Kilograms = Stone × 6.35029</p>
        </div>
        <h3 className="text-xl font-bold mb-2">Example:</h3>
        <p className="mb-4">
          Convert 10 stone to kilograms:
        </p>
        <p className="mb-2">
          Kilograms = 10 st × 6.35029 = 63.5029 kilograms
        </p>
        <p>
          Therefore, 10 stone is equal to 63.50 kilograms.
        </p>
      </div>
    </div>
  );
};

export default StoneToKgCalculator; 