'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface ButterConverterProps {
  calculator?: Calculator;
}

type ButterUnit = 'sticks' | 'cups' | 'tablespoons' | 'teaspoons' | 'grams' | 'ounces' | 'pounds';

interface ButterUnitInfo {
  id: ButterUnit;
  name: string;
  abbr: string;
  toGrams: number; // Conversion factor to grams (for 1 unit)
}

const ButterConverter: React.FC<ButterConverterProps> = ({ calculator }) => {
  // Input state
  const [amount, setAmount] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<ButterUnit>('sticks');
  
  // Results state
  const [sticks, setSticks] = useState<number>(0);
  const [cups, setCups] = useState<number>(0);
  const [tablespoons, setTablespoons] = useState<number>(0);
  const [teaspoons, setTeaspoons] = useState<number>(0);
  const [grams, setGrams] = useState<number>(0);
  const [ounces, setOunces] = useState<number>(0);
  const [pounds, setPounds] = useState<number>(0);
  
  // Butter unit definitions with conversion factors to grams
  const butterUnits: ButterUnitInfo[] = [
    { id: 'sticks', name: 'Sticks', abbr: 'stick(s)', toGrams: 113.4 }, // 1 stick = 113.4g
    { id: 'cups', name: 'Cups', abbr: 'cup(s)', toGrams: 226.8 }, // 1 cup = 226.8g
    { id: 'tablespoons', name: 'Tablespoons', abbr: 'tbsp', toGrams: 14.2 }, // 1 tbsp = 14.2g
    { id: 'teaspoons', name: 'Teaspoons', abbr: 'tsp', toGrams: 4.7 }, // 1 tsp = 4.7g
    { id: 'grams', name: 'Grams', abbr: 'g', toGrams: 1 }, // 1g = 1g
    { id: 'ounces', name: 'Ounces', abbr: 'oz', toGrams: 28.35 }, // 1 oz = 28.35g
    { id: 'pounds', name: 'Pounds', abbr: 'lb', toGrams: 453.6 }, // 1 lb = 453.6g
  ];
  
  // Handle number input with validation
  const handleNumberInput = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
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
      setter(value);
    }
  };
  
  // Get butter unit info by ID
  const getButterUnitInfo = (unitId: ButterUnit): ButterUnitInfo => {
    return butterUnits.find(unit => unit.id === unitId) || butterUnits[0];
  };
  
  // Convert between butter units
  const convertButterUnits = () => {
    const amountValue = parseFloat(amount) || 0;
    const fromUnitInfo = getButterUnitInfo(fromUnit);
    
    // First convert to grams as the base unit
    const gramsValue = amountValue * fromUnitInfo.toGrams;
    
    // Then convert from grams to all other units
    const sticksValue = gramsValue / getButterUnitInfo('sticks').toGrams;
    const cupsValue = gramsValue / getButterUnitInfo('cups').toGrams;
    const tablespoonsValue = gramsValue / getButterUnitInfo('tablespoons').toGrams;
    const teaspoonsValue = gramsValue / getButterUnitInfo('teaspoons').toGrams;
    const ouncesValue = gramsValue / getButterUnitInfo('ounces').toGrams;
    const poundsValue = gramsValue / getButterUnitInfo('pounds').toGrams;
    
    // Set the calculated values
    setSticks(sticksValue);
    setCups(cupsValue);
    setTablespoons(tablespoonsValue);
    setTeaspoons(teaspoonsValue);
    setGrams(gramsValue);
    setOunces(ouncesValue);
    setPounds(poundsValue);
  };
  
  // Calculate conversions when inputs change
  useEffect(() => {
    convertButterUnits();
  }, [amount, fromUnit]);
  
  // Format number with appropriate precision
  const formatNumber = (value: number): string => {
    if (value === 0) return '0';
    
    // For very small values
    if (value < 0.01) {
      return value.toExponential(2);
    }
    
    // For small values
    if (value < 0.1) {
      return value.toFixed(3);
    }
    
    // For medium values
    if (value < 10) {
      return value.toFixed(2);
    }
    
    // For larger values
    if (value < 100) {
      return value.toFixed(1);
    }
    
    // For very large values
    return Math.round(value).toString();
  };
  
  // Format fractions for common measurements
  const formatFraction = (value: number): string => {
    // Common fractions in cooking
    const fractions: [number, string][] = [
      [0.25, '¼'],
      [0.33, '⅓'],
      [0.5, '½'],
      [0.67, '⅔'],
      [0.75, '¾'],
    ];
    
    // Get the whole number part
    const wholePart = Math.floor(value);
    const fractionalPart = value - wholePart;
    
    // Find the closest fraction
    let closestFraction = '';
    let minDifference = 1;
    
    for (const [fraction, symbol] of fractions) {
      const difference = Math.abs(fractionalPart - fraction);
      if (difference < minDifference) {
        minDifference = difference;
        closestFraction = symbol;
      }
    }
    
    // If the fractional part is very small, ignore it
    if (fractionalPart < 0.1) {
      return wholePart.toString();
    }
    
    // If the fractional part is very close to 1, round up
    if (fractionalPart > 0.9) {
      return (wholePart + 1).toString();
    }
    
    // If the difference is small enough, use the fraction
    if (minDifference < 0.1) {
      return wholePart > 0 ? `${wholePart} ${closestFraction}` : closestFraction;
    }
    
    // Otherwise, use decimal
    return value.toFixed(2);
  };
  
  // Common butter measurements for quick selection
  const commonMeasurements = [
    { name: '¼ stick', sticks: 0.25 },
    { name: '½ stick', sticks: 0.5 },
    { name: '1 stick', sticks: 1 },
    { name: '2 sticks', sticks: 2 },
    { name: '4 sticks', sticks: 4 },
    { name: '1 cup', cups: 1 },
  ];
  
  // Handle quick selection of common measurement
  const handleQuickSelect = (value: number, unit: ButterUnit) => {
    setAmount(value.toString());
    setFromUnit(unit);
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Input</h2>
          
          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Amount
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel" onChange={(e) => handleNumberInput(e.target.value, setAmount)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter amount"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{getButterUnitInfo(fromUnit).abbr}</span>
              </div>
            </div>
          </div>
          
          {/* From Unit Selection */}
          <div>
            <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Unit
            </label>
            <select
              id="fromUnit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as ButterUnit)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              {butterUnits.map(unit => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Quick Select Measurements */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Common Measurements
            </label>
            <div className="grid grid-cols-3 gap-2">
              {commonMeasurements.map((measurement, index) => (
                <button
                  key={index}
                  onClick={() => 
                    handleQuickSelect(
                      measurement.sticks !== undefined ? measurement.sticks : measurement.cups as number, 
                      measurement.sticks !== undefined ? 'sticks' : 'cups'
                    )
                  }
                  className="px-3 py-2 bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted hover:bg-muted dark:hover:bg-muted/80 rounded-md text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 transition-colors"
                >
                  {measurement.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Conversion Explanation */}
          <div className="calculator-button">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Butter Measurement Tips</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• 1 stick = ½ cup = 8 tablespoons = 113g</li>
              <li>• 1 cup = 2 sticks = 16 tablespoons = 227g</li>
              <li>• 1 pound = 4 sticks = 2 cups = 454g</li>
              <li>• US butter sticks have markings on the wrapper</li>
              <li>• For most accurate measurements, use a kitchen scale</li>
            </ul>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Result</h2>
          
          {/* US Measurements */}
          <div className="calculator-button">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-3">US Measurements</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Sticks
                </div>
                <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-blue-400">
                  {formatNumber(sticks)}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  US butter sticks
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Cups
                </div>
                <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-blue-400">
                  {formatFraction(cups)}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  US cups
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Tablespoons
                </div>
                <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-blue-400">
                  {formatNumber(tablespoons)}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  US tablespoons
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Teaspoons
                </div>
                <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-blue-400">
                  {formatNumber(teaspoons)}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  US teaspoons
                </div>
              </div>
            </div>
          </div>
          
          {/* Weight Measurements */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-3">Weight Measurements</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Grams
                </div>
                <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  {formatNumber(grams)}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  g
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Ounces
                </div>
                <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  {formatNumber(ounces)}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  oz
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Pounds
                </div>
                <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  {formatNumber(pounds)}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  lb
                </div>
              </div>
            </div>
          </div>
          
          {/* Common Equivalents */}
          <div className="bg-white dark:bg-gray-900 dark:bg-muted p-4 rounded-md border border-gray-200 dark:border-gray-700 dark:border-gray-600">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">
              Common Equivalents
            </h3>
            <div className="overflow-x-auto">
              <table className="calculator-table">
                <thead>
                  <tr>
                    <th className="calculator-table-header">Measurement</th>
                    <th className="calculator-table-header">Equivalent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="calculator-table-cell">1 stick butter</td>
                    <td className="calculator-table-cell">½ cup / 8 tbsp / 113g / 4 oz</td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">¼ cup butter</td>
                    <td className="calculator-table-cell">½ stick / 4 tbsp / 57g / 2 oz</td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">1 tablespoon butter</td>
                    <td className="calculator-table-cell">3 tsp / 14g / 0.5 oz</td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">100g butter</td>
                    <td className="calculator-table-cell">0.88 stick / 7 tbsp / 3.5 oz</td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">250g butter</td>
                    <td className="calculator-table-cell">2.2 sticks / 1.1 cups / 8.8 oz</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Butter Tips */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Butter Tips</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• US butter sticks have measurement markings on the wrapper</li>
              <li>• European butter is typically sold in 250g blocks</li>
              <li>• For most accurate measurements, use a kitchen scale</li>
              <li>• Softened butter should be at room temperature but still hold its shape</li>
              <li>• 1 stick of butter = 8 tablespoons = ½ cup = 113 grams</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButterConverter; 