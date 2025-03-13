'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface VolumeCalculatorProps {
  calculator?: Calculator;
  unit: 'cubic-feet' | 'cubic-meters' | 'cubic-yards';
}

const VolumeCalculator: React.FC<VolumeCalculatorProps> = ({ calculator, unit }) => {
  // Input state
  const [length, setLength] = useState<string>('10');
  const [width, setWidth] = useState<string>('10');
  const [height, setHeight] = useState<string>('10');
  
  // Result state
  const [volume, setVolume] = useState<number>(0);
  const [equivalentVolumes, setEquivalentVolumes] = useState<{
    cubicFeet: number;
    cubicMeters: number;
    cubicYards: number;
    gallons: number;
    liters: number;
  }>({
    cubicFeet: 0,
    cubicMeters: 0,
    cubicYards: 0,
    gallons: 0,
    liters: 0
  });

  // Unit display info
  const unitInfo = {
    'cubic-feet': {
      name: 'Cubic Feet',
      shortName: 'ft³',
      lengthUnit: 'ft',
      conversionFactors: {
        toCubicFeet: 1,
        toCubicMeters: 0.0283168,
        toCubicYards: 0.037037,
        toGallons: 7.48052,
        toLiters: 28.3168
      }
    },
    'cubic-meters': {
      name: 'Cubic Meters',
      shortName: 'm³',
      lengthUnit: 'm',
      conversionFactors: {
        toCubicFeet: 35.3147,
        toCubicMeters: 1,
        toCubicYards: 1.30795,
        toGallons: 264.172,
        toLiters: 1000
      }
    },
    'cubic-yards': {
      name: 'Cubic Yards',
      shortName: 'yd³',
      lengthUnit: 'yd',
      conversionFactors: {
        toCubicFeet: 27,
        toCubicMeters: 0.764555,
        toCubicYards: 1,
        toGallons: 201.974,
        toLiters: 764.555
      }
    }
  };

  // Calculate results when inputs change
  useEffect(() => {
    calculateVolume();
  }, [length, width, height, unit]);

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

  // Calculate volume
  const calculateVolume = () => {
    // Parse input values
    const lengthValue = parseFloat(length) || 0;
    const widthValue = parseFloat(width) || 0;
    const heightValue = parseFloat(height) || 0;

    // Calculate volume in the selected unit
    const volumeValue = lengthValue * widthValue * heightValue;
    setVolume(volumeValue);

    // Calculate equivalent volumes in other units
    const factors = unitInfo[unit].conversionFactors;
    setEquivalentVolumes({
      cubicFeet: volumeValue * factors.toCubicFeet,
      cubicMeters: volumeValue * factors.toCubicMeters,
      cubicYards: volumeValue * factors.toCubicYards,
      gallons: volumeValue * factors.toGallons,
      liters: volumeValue * factors.toLiters
    });
  };

  // Format number with commas and decimal places
  const formatNumber = (value: number, decimals: number = 2): string => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Dimensions</h2>
          
          {/* Length Input */}
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Length
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="length"
                value={length}
                onChange={(e) => handleNumberInput(e.target.value, setLength, false)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder={`Enter length in ${unitInfo[unit].lengthUnit}`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">
                  {unitInfo[unit].lengthUnit}
                </span>
              </div>
            </div>
          </div>
          
          {/* Width Input */}
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Width
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="width"
                value={width}
                onChange={(e) => handleNumberInput(e.target.value, setWidth, false)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder={`Enter width in ${unitInfo[unit].lengthUnit}`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">
                  {unitInfo[unit].lengthUnit}
                </span>
              </div>
            </div>
          </div>
          
          {/* Height Input */}
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Height
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="height"
                value={height}
                onChange={(e) => handleNumberInput(e.target.value, setHeight, false)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder={`Enter height in ${unitInfo[unit].lengthUnit}`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">
                  {unitInfo[unit].lengthUnit}
                </span>
              </div>
            </div>
          </div>
          
          <div className="calculator-button">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Volume Formula</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Volume = Length × Width × Height
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              For irregular shapes, divide into regular sections and add the volumes together.
            </p>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-6 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Volume
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {formatNumber(volume)} {unitInfo[unit].shortName}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {length} × {width} × {height} {unitInfo[unit].lengthUnit}
            </div>
          </div>
          
          <div className="calculator-button">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Equivalent Volumes</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              {unit !== 'cubic-feet' && (
                <li className="flex justify-between">
                  <span>Cubic Feet:</span>
                  <span className="font-semibold">{formatNumber(equivalentVolumes.cubicFeet)} ft³</span>
                </li>
              )}
              {unit !== 'cubic-meters' && (
                <li className="flex justify-between">
                  <span>Cubic Meters:</span>
                  <span className="font-semibold">{formatNumber(equivalentVolumes.cubicMeters)} m³</span>
                </li>
              )}
              {unit !== 'cubic-yards' && (
                <li className="flex justify-between">
                  <span>Cubic Yards:</span>
                  <span className="font-semibold">{formatNumber(equivalentVolumes.cubicYards)} yd³</span>
                </li>
              )}
              <li className="flex justify-between">
                <span>Gallons (US):</span>
                <span className="font-semibold">{formatNumber(equivalentVolumes.gallons)} gal</span>
              </li>
              <li className="flex justify-between">
                <span>Liters:</span>
                <span className="font-semibold">{formatNumber(equivalentVolumes.liters)} L</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Common Applications</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li>Calculating material quantities (concrete, gravel, soil, etc.)</li>
              <li>Determining shipping container or truck capacity</li>
              <li>Estimating water tank or pool volume</li>
              <li>Planning storage space requirements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeCalculator; 