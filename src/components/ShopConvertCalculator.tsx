'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface ShopConvertCalculatorProps {
  calculator?: Calculator;
}

const ShopConvertCalculator: React.FC<ShopConvertCalculatorProps> = ({ calculator }) => {
  // Conversion constants
  const SQYARDS_TO_SQMETERS = 0.83612736; // 1 square yard = 0.83612736 square meters
  const SQMETERS_TO_SQYARDS = 1.19599; // 1 square meter = 1.19599 square yards

  // Input state
  const [pricePerSquareYard, setPricePerSquareYard] = useState<string>('25.99');
  const [squareMetersNeeded, setSquareMetersNeeded] = useState<string>('10');
  
  // Result state
  const [pricePerSquareMeter, setPricePerSquareMeter] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Calculate results when inputs change
  useEffect(() => {
    calculateConversion();
  }, [pricePerSquareYard, squareMetersNeeded]);

  // Handle number input with validation
  const handleNumberInput = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    allowZero: boolean = true
  ) => {
    // Allow empty input
    if (value === '') {
      setter('');
      return;
    }

    // Handle special cases for decimal input
    if (value === '.' || value === '0.') {
      setter('0.');
      return;
    }

    // Validate the input format (positive numbers only)
    const regex = /^\d*\.?\d*$/;
    if (regex.test(value)) {
      // If zero is not allowed, check if the value is greater than zero
      if (!allowZero && parseFloat(value) === 0) {
        return;
      }
      setter(value);
    }
  };

  // Calculate conversion
  const calculateConversion = () => {
    // Parse input values
    const priceYard = parseFloat(pricePerSquareYard) || 0;
    const sqMeters = parseFloat(squareMetersNeeded) || 0;

    // Calculate price per square meter
    // Price per sq yard * sq yards in a sq meter = price per sq meter
    const priceMeter = priceYard * SQMETERS_TO_SQYARDS;
    
    // Calculate total price
    const total = priceMeter * sqMeters;
    
    setPricePerSquareMeter(priceMeter);
    setTotalPrice(total);
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    return `€${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  // Conversion information component
  const ConversionInfo = () => (
    <div className="calculator-button">
      <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Conversion Information</h3>
      <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
        <li>1 square yard = 0.836 square meters</li>
        <li>1 square meter = 1.196 square yards</li>
      </ul>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Chans Calculator</h2>
          
          {/* Price Per Square Yard */}
          <div>
            <label htmlFor="pricePerSquareYard" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Price Per Square Yard
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">€</span>
              </div>
              <input
                type="tel"
                id="pricePerSquareYard"
                value={pricePerSquareYard}
                onChange={(e) => handleNumberInput(e.target.value, setPricePerSquareYard)} {...decimalInputProps}
                className="w-full pl-8 px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter price per square yard"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">/yd²</span>
              </div>
            </div>
          </div>
          
          {/* Square Meters Needed */}
          <div>
            <label htmlFor="squareMetersNeeded" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Square Meters Needed
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="squareMetersNeeded"
                value={squareMetersNeeded}
                onChange={(e) => handleNumberInput(e.target.value, setSquareMetersNeeded)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter square meters needed"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">m²</span>
              </div>
            </div>
          </div>
          
          {/* Conversion Info - Only visible on desktop */}
          <div className="hidden md:block">
            <ConversionInfo />
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Result</h2>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-6 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Price Per Square Meter
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {formatCurrency(pricePerSquareMeter)}/m²
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Equivalent to {formatCurrency(parseFloat(pricePerSquareYard) || 0)}/yd²
            </div>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-6 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Total Price for {parseFloat(squareMetersNeeded).toLocaleString()} m²
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {formatCurrency(totalPrice)}
            </div>
          </div>
          
          {/* Conversion Info - Only visible on mobile */}
          <div className="block md:hidden">
            <ConversionInfo />
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Quick Reference</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="calculator-card p-2 rounded">
                <div className="font-medium text-gray-900 dark:text-white dark:text-gray-200">€10/yd²</div>
                <div className="text-gray-500 dark:text-gray-400 dark:text-gray-300">= €11.96/m²</div>
              </div>
              <div className="calculator-card p-2 rounded">
                <div className="font-medium text-gray-900 dark:text-white dark:text-gray-200">€20/yd²</div>
                <div className="text-gray-500 dark:text-gray-400 dark:text-gray-300">= €23.92/m²</div>
              </div>
              <div className="calculator-card p-2 rounded">
                <div className="font-medium text-gray-900 dark:text-white dark:text-gray-200">€30/yd²</div>
                <div className="text-gray-500 dark:text-gray-400 dark:text-gray-300">= €35.88/m²</div>
              </div>
              <div className="calculator-card p-2 rounded">
                <div className="font-medium text-gray-900 dark:text-white dark:text-gray-200">€40/yd²</div>
                <div className="text-gray-500 dark:text-gray-400 dark:text-gray-300">= €47.84/m²</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopConvertCalculator; 