import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

const KgToStoneCalculator: React.FC = () => {
  // Change from number to string state variables
  const [kgStr, setKgStr] = useState<string>('');
  const [stone, setStone] = useState<number | null>(null);
  const [pounds, setPounds] = useState<number | null>(null);

  useEffect(() => {
    // Only calculate when kgStr has a value
    if (kgStr !== '') {
      const kgValue = parseFloat(kgStr);
      const totalPounds = kgValue * 2.20462;
      const stoneValue = Math.floor(totalPounds / 14);
      const poundsRemainder = totalPounds % 14;
      
      setStone(stoneValue);
      setPounds(poundsRemainder);
    } else {
      setStone(null);
      setPounds(null);
    }
  }, [kgStr]);

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
        <title>Kg to Stone Calculator | Convert Kilograms to Stone</title>
        <meta name="description" content="Convert kilograms to stone with our easy-to-use calculator. Get accurate conversions instantly." />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center">Kg to Stone Calculator</h1>
      
      <div className="calculator-card rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="kg" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Kilograms (kg)</label>
          <input
            id="kg"
            type="tel"
            value={kgStr}
            onChange={(e) => handleNumberInput(e, setKgStr)} {...decimalInputProps}
            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter weight in kg"
          />
        </div>

        <div className="mt-6 p-4 bg-gray-100/50 dark:bg-gray-800/50 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          {stone !== null && pounds !== null ? (
            <p className="text-xl">
              {kgStr} kilograms = <span className="font-bold">{stone} stone and {pounds.toFixed(2)} pounds</span>
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Enter a value to see the conversion</p>
          )}
        </div>
      </div>

      <div className="calculator-card rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">How to Convert Kilograms to Stone</h2>
        <p className="mb-4">
          To convert kilograms to stone, first convert kilograms to pounds by multiplying by 2.20462, then divide by 14 to get stone.
        </p>
        <div className="bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded-md mb-4">
          <p className="font-medium">Formula:</p>
          <p className="font-mono">Pounds = Kilograms × 2.20462</p>
          <p className="font-mono">Stone = Pounds ÷ 14</p>
        </div>
        <h3 className="text-xl font-bold mb-2">Example:</h3>
        <p className="mb-4">
          Convert 70 kilograms to stone:
        </p>
        <p className="mb-2">
          Pounds = 70 kg × 2.20462 = 154.3234 pounds
        </p>
        <p className="mb-2">
          Stone = 154.3234 pounds ÷ 14 = 11.0231 stone
        </p>
        <p>
          Therefore, 70 kilograms is equal to 11 stone and 0.32 pounds (or 11 stone and 5.1 ounces).
        </p>
      </div>
    </div>
  );
};

export default KgToStoneCalculator; 