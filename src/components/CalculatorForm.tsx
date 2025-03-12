"use client";

import { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps, decimalInputProps } from '@/utils/inputUtils';

interface CalculatorFormProps {
  calculator: Calculator;
}

const CalculatorForm = ({ calculator }: CalculatorFormProps) => {
  const [formValues, setFormValues] = useState<Record<string, string | number>>({});
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize form values with default values
  useEffect(() => {
    const initialValues: Record<string, string | number> = {};
    calculator.inputs.forEach(input => {
      if (input.defaultValue !== undefined) {
        initialValues[input.id] = input.defaultValue;
      } else {
        initialValues[input.id] = input.type === 'number' ? 0 : '';
      }
    });
    setFormValues(initialValues);
  }, [calculator]);

  const handleInputChange = (id: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [id]: value
    }));
    setError(null);
  };

  const calculateResult = () => {
    try {
      setError(null);
      
      // This is a simplified calculation logic
      // In a real app, you would have more sophisticated calculation logic for each calculator type
      switch (calculator.id) {
        case 'cm-to-feet-converter': {
          // For this calculator, we'll use our custom component instead
          // This is just a placeholder for the standard form
          const cm = Number(formValues.cm);
          const decimalPlaces = Number(formValues.decimalPlaces);
          
          if (cm <= 0) {
            throw new Error('Length must be a positive value');
          }
          
          const totalInches = cm / 2.54;
          const feet = Math.floor(totalInches / 12);
          const inches = +(totalInches % 12).toFixed(decimalPlaces);
          
          // Return the total in feet for the result display
          setResult(parseFloat((totalInches / 12).toFixed(decimalPlaces)));
          break;
        }
        case 'bmi-calculator': {
          const height = Number(formValues.height) / 100; // Convert cm to m
          const weight = Number(formValues.weight);
          if (height <= 0 || weight <= 0) {
            throw new Error('Height and weight must be positive values');
          }
          const bmi = weight / (height * height);
          setResult(parseFloat(bmi.toFixed(2)));
          break;
        }
        case 'compound-interest': {
          const principal = Number(formValues.principal);
          const rate = Number(formValues.rate) / 100;
          const time = Number(formValues.time);
          const compound = Number(formValues.compound);
          
          if (principal <= 0 || rate <= 0 || time <= 0 || compound <= 0) {
            throw new Error('All values must be positive');
          }
          
          const amount = principal * Math.pow(1 + (rate / compound), compound * time);
          setResult(parseFloat(amount.toFixed(2)));
          break;
        }
        case 'percentage-calculator': {
          const value = Number(formValues.value);
          const percentage = Number(formValues.percentage);
          
          const result = (value * percentage) / 100;
          setResult(parseFloat(result.toFixed(2)));
          break;
        }
        case 'tip-calculator': {
          const billAmount = Number(formValues.billAmount);
          const tipPercentage = Number(formValues.tipPercentage);
          const people = Number(formValues.people);
          
          if (billAmount <= 0 || tipPercentage < 0 || people <= 0) {
            throw new Error('Bill and people must be positive, tip must be non-negative');
          }
          
          const tipAmount = billAmount * (tipPercentage / 100);
          const totalPerPerson = (billAmount + tipAmount) / people;
          setResult(parseFloat(totalPerPerson.toFixed(2)));
          break;
        }
        default:
          setResult(0);
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{calculator.name}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{calculator.description}</p>
      
      {calculator.formula && (
        <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
          <p className="text-sm font-mono text-gray-700 dark:text-gray-300">Formula: {calculator.formula}</p>
        </div>
      )}
      
      <form className="space-y-4">
        {calculator.inputs.map(input => (
          <div key={input.id} className="flex flex-col">
            <label htmlFor={input.id} className="mb-1 text-gray-700 dark:text-gray-300">
              {input.name}
            </label>
            
            {input.type === 'select' ? (
              <select
                id={input.id}
                value={formValues[input.id] || ''}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                {input.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <div className="relative">
                <input
                  type={input.type === 'number' ? 'tel' : input.type}
                  id={input.id}
                  placeholder={input.placeholder}
                  value={formValues[input.id] || ''}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  {...(input.type === 'number' ? (input.allowDecimals !== false ? decimalInputProps : numericInputProps) : {})}
                />
                {input.unit && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    {input.unit}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={calculateResult}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-primary/90 text-white font-semibold rounded-md transition duration-200"
        >
          Calculate
        </button>
      </form>
      
      {error && (
        <div className="mt-6 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}
      
      {result !== null && !error && (
        <div className="mt-6 p-4 bg-green-100 dark:bg-green-900 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Result</h3>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-2">
            {calculator.id === 'cm-to-feet-converter' ? (
              <>
                {Math.floor(result)} ft {Math.round((result - Math.floor(result)) * 12 * Math.pow(10, Number(formValues.decimalPlaces))) / Math.pow(10, Number(formValues.decimalPlaces))} in
              </>
            ) : (
              result
            )}
            {calculator.id === 'bmi-calculator' && ' kg/m²'}
            {calculator.id === 'compound-interest' && ' $'}
            {calculator.id === 'percentage-calculator' && ''}
            {calculator.id === 'tip-calculator' && ' $ per person'}
          </p>
          
          {calculator.id === 'bmi-calculator' && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              <p>BMI Categories:</p>
              <ul className="list-disc list-inside mt-1">
                <li>Underweight: BMI less than 18.5</li>
                <li>Normal weight: BMI 18.5-24.9</li>
                <li>Overweight: BMI 25-29.9</li>
                <li>Obesity: BMI 30 or greater</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalculatorForm; 