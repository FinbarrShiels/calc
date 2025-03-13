'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface HowMuchFlooringCalculatorProps {
  calculator?: Calculator;
}

const HowMuchFlooringCalculator: React.FC<HowMuchFlooringCalculatorProps> = ({ calculator }) => {
  // Input state
  const [roomWidth, setRoomWidth] = useState<string>('4');
  const [roomLength, setRoomLength] = useState<string>('5');
  const [measurementUnit, setMeasurementUnit] = useState<string>('meters');
  const [wastagePercentage, setWastagePercentage] = useState<string>('10');
  
  // Result state
  const [totalArea, setTotalArea] = useState<number>(0);
  const [totalAreaWithWastage, setTotalAreaWithWastage] = useState<number>(0);
  const [equivalentSquareFeet, setEquivalentSquareFeet] = useState<number>(0);
  const [equivalentSquareYards, setEquivalentSquareYards] = useState<number>(0);

  // Measurement unit options
  const unitOptions = [
    { value: 'meters', label: 'Meters', toSquareMeters: 1 },
    { value: 'feet', label: 'Feet', toSquareMeters: 0.092903 },
    { value: 'yards', label: 'Yards', toSquareMeters: 0.836127 }
  ];

  // Calculate results when inputs change
  useEffect(() => {
    calculateArea();
  }, [roomWidth, roomLength, measurementUnit, wastagePercentage]);

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

  // Handle measurement unit change
  const handleMeasurementUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMeasurementUnit(e.target.value);
  };

  // Calculate area
  const calculateArea = () => {
    // Parse input values
    const width = parseFloat(roomWidth) || 0;
    const length = parseFloat(roomLength) || 0;
    const wastage = parseFloat(wastagePercentage) || 0;

    // Get conversion factor for the selected measurement unit
    const unitInfo = unitOptions.find(u => u.value === measurementUnit);
    const conversionFactor = unitInfo ? unitInfo.toSquareMeters : 1;

    // Calculate area in the selected unit
    const areaInSelectedUnit = width * length;
    setTotalArea(areaInSelectedUnit);

    // Calculate area with wastage
    const areaWithWastage = areaInSelectedUnit * (1 + wastage / 100);
    setTotalAreaWithWastage(areaWithWastage);

    // Calculate area in square meters
    const areaInSquareMeters = areaInSelectedUnit * conversionFactor;
    
    // Calculate equivalent areas
    setEquivalentSquareFeet(areaInSquareMeters * 10.7639);
    setEquivalentSquareYards(areaInSquareMeters * 1.19599);
  };

  // Get unit display name
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'meters': return 'm';
      case 'feet': return 'ft';
      case 'yards': return 'yd';
      default: return unit;
    }
  };

  // Get square unit display name
  const getSquareUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'meters': return 'm²';
      case 'feet': return 'ft²';
      case 'yards': return 'yd²';
      default: return unit;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Room Dimensions</h2>
          
          {/* Measurement Unit */}
          <div>
            <label htmlFor="measurementUnit" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Measurement Unit
            </label>
            <select
              id="measurementUnit"
              value={measurementUnit}
              onChange={handleMeasurementUnitChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              {unitOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          {/* Room Dimensions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="roomWidth" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Room Width
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="roomWidth"
                  value={roomWidth}
                  onChange={(e) => handleNumberInput(e.target.value, setRoomWidth, false)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter width"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">
                    {getUnitDisplayName(measurementUnit)}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="roomLength" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Room Length
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="roomLength"
                  value={roomLength}
                  onChange={(e) => handleNumberInput(e.target.value, setRoomLength, false)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter length"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">
                    {getUnitDisplayName(measurementUnit)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wastage Percentage */}
          <div>
            <label htmlFor="wastagePercentage" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Wastage Percentage
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="wastagePercentage"
                value={wastagePercentage}
                onChange={(e) => handleNumberInput(e.target.value, setWastagePercentage)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter wastage percentage"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Recommended: 5-10% for straight patterns, 15-20% for diagonal patterns
            </p>
          </div>
          
          <div className="calculator-button">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Tips for Measuring</h3>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li>• Measure at multiple points for irregular rooms</li>
              <li>• For complex layouts, divide into rectangles and add areas</li>
              <li>• Include closets and other recessed areas</li>
              <li>• Exclude fixed cabinets and fixtures if not tiling underneath</li>
            </ul>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-6 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Total Area
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {totalArea.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {getSquareUnitDisplayName(measurementUnit)}
            </div>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-6 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Total Area (with {wastagePercentage}% wastage)
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {totalAreaWithWastage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {getSquareUnitDisplayName(measurementUnit)}
            </div>
          </div>
          
          <div className="calculator-button">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Equivalent Measurements</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li className="flex justify-between">
                <span>Square Feet:</span>
                <span className="font-semibold">{equivalentSquareFeet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ft²</span>
              </li>
              <li className="flex justify-between">
                <span>Square Yards:</span>
                <span className="font-semibold">{equivalentSquareYards.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} yd²</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Flooring Tips</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li>Flooring is typically sold in boxes covering a specific area</li>
              <li>Always round up to the nearest box when purchasing</li>
              <li>Keep extra tiles/planks for future repairs</li>
              <li>Consider the pattern direction for visual effect</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowMuchFlooringCalculator; 