'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

interface MulchCalculatorProps {
  calculator?: Calculator;
}

const MulchCalculator: React.FC<MulchCalculatorProps> = ({ calculator }) => {
  // Unit state
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  
  // Area input state
  const [areaInputType, setAreaInputType] = useState<'dimensions' | 'area'>('dimensions');
  const [width, setWidth] = useState<string>('10');
  const [length, setLength] = useState<string>('10');
  const [area, setArea] = useState<string>('100');
  
  // Depth state
  const [depth, setDepth] = useState<string>('3');
  
  // Results state
  const [volumeCubicYards, setVolumeCubicYards] = useState<number>(0);
  const [volumeCubicMeters, setVolumeCubicMeters] = useState<number>(0);
  const [volumeCubicFeet, setVolumeCubicFeet] = useState<number>(0);
  const [bagsNeeded, setBagsNeeded] = useState<number>(0);
  
  // Constants
  const CUBIC_FEET_PER_BAG = 2; // Standard 2 cubic feet per bag
  const CUBIC_FEET_PER_CUBIC_YARD = 27;
  const CUBIC_METERS_PER_CUBIC_YARD = 0.764555;
  
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
  
  // Update area when dimensions change
  useEffect(() => {
    if (areaInputType === 'dimensions') {
      const widthValue = parseFloat(width) || 0;
      const lengthValue = parseFloat(length) || 0;
      const calculatedArea = widthValue * lengthValue;
      setArea(calculatedArea.toString());
    }
  }, [width, length, areaInputType]);
  
  // Calculate results when inputs change
  useEffect(() => {
    calculateResults();
  }, [area, depth, unitSystem]);
  
  // Calculate results
  const calculateResults = () => {
    // Parse input values
    const areaValue = parseFloat(area) || 0;
    const depthValue = parseFloat(depth) || 0;
    
    if (unitSystem === 'imperial') {
      // Calculate volume in cubic feet (area in sq ft × depth in inches / 12)
      const volumeCubicFeetValue = (areaValue * depthValue) / 12;
      
      // Convert to cubic yards (1 cubic yard = 27 cubic feet)
      const volumeCubicYardsValue = volumeCubicFeetValue / CUBIC_FEET_PER_CUBIC_YARD;
      
      // Convert to cubic meters (1 cubic yard = 0.764555 cubic meters)
      const volumeCubicMetersValue = volumeCubicYardsValue * CUBIC_METERS_PER_CUBIC_YARD;
      
      // Calculate bags needed (assuming standard 2 cubic feet bags)
      const bagsNeededValue = volumeCubicFeetValue / CUBIC_FEET_PER_BAG;
      
      setVolumeCubicFeet(volumeCubicFeetValue);
      setVolumeCubicYards(volumeCubicYardsValue);
      setVolumeCubicMeters(volumeCubicMetersValue);
      setBagsNeeded(bagsNeededValue);
    } else {
      // Calculate volume in cubic meters (area in sq m × depth in cm / 100)
      const volumeCubicMetersValue = (areaValue * depthValue) / 100;
      
      // Convert to cubic yards (1 cubic meter = 1.30795 cubic yards)
      const volumeCubicYardsValue = volumeCubicMetersValue / CUBIC_METERS_PER_CUBIC_YARD;
      
      // Convert to cubic feet (1 cubic yard = 27 cubic feet)
      const volumeCubicFeetValue = volumeCubicYardsValue * CUBIC_FEET_PER_CUBIC_YARD;
      
      // Calculate bags needed (assuming standard 2 cubic feet bags)
      const bagsNeededValue = volumeCubicFeetValue / CUBIC_FEET_PER_BAG;
      
      setVolumeCubicFeet(volumeCubicFeetValue);
      setVolumeCubicYards(volumeCubicYardsValue);
      setVolumeCubicMeters(volumeCubicMetersValue);
      setBagsNeeded(bagsNeededValue);
    }
  };
  
  // Format number with 2 decimal places
  const formatNumber = (value: number): string => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  // Format number with 0 decimal places
  const formatWholeNumber = (value: number): string => {
    return Math.ceil(value).toLocaleString();
  };
  
  // Get unit label based on unit system
  const getUnitLabel = (type: 'dimension' | 'area' | 'depth'): string => {
    if (unitSystem === 'imperial') {
      switch (type) {
        case 'dimension': return 'ft';
        case 'area': return 'ft²';
        case 'depth': return 'in';
      }
    } else {
      switch (type) {
        case 'dimension': return 'm';
        case 'area': return 'm²';
        case 'depth': return 'cm';
      }
    }
    return '';
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Mulch Calculator</h2>
          
          {/* Unit System Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Unit System
            </label>
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-1 rounded-lg w-fit">
              <button
                onClick={() => setUnitSystem('imperial')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  unitSystem === 'imperial'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Imperial
              </button>
              <button
                onClick={() => setUnitSystem('metric')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  unitSystem === 'metric'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Metric
              </button>
            </div>
          </div>
          
          {/* Area Input Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Area Input Method
            </label>
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-1 rounded-lg w-fit">
              <button
                onClick={() => setAreaInputType('dimensions')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  areaInputType === 'dimensions'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Dimensions
              </button>
              <button
                onClick={() => setAreaInputType('area')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  areaInputType === 'area'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Area
              </button>
            </div>
          </div>
          
          {/* Dimensions or Area Input */}
          {areaInputType === 'dimensions' ? (
            <div className="grid grid-cols-2 gap-3">
              {/* Width */}
              <div>
                <label htmlFor="width" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  Width
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="tel"
                    id="width"
                    value={width}
                    onChange={(e) => handleNumberInput(e.target.value, setWidth)} {...decimalInputProps}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                    placeholder={`Enter width`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{getUnitLabel('dimension')}</span>
                  </div>
                </div>
              </div>
              
              {/* Length */}
              <div>
                <label htmlFor="length" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  Length
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="tel"
                    id="length"
                    value={length}
                    onChange={(e) => handleNumberInput(e.target.value, setLength)} {...decimalInputProps}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                    placeholder={`Enter length`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{getUnitLabel('dimension')}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Area
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="area"
                  value={area}
                  onChange={(e) => handleNumberInput(e.target.value, setArea)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder={`Enter area`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{getUnitLabel('area')}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Depth */}
          <div>
            <label htmlFor="depth" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Depth
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="depth"
                value={depth}
                onChange={(e) => handleNumberInput(e.target.value, setDepth)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder={`Enter depth`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{getUnitLabel('depth')}</span>
              </div>
            </div>
          </div>
          
          {/* Mulch Info - Only visible on desktop */}
          <div className="hidden md:block">
            <div className={buttonClasses}>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Mulch Information</h3>
              <p className={resultLabelClasses}>
                Mulch is typically applied at a depth of 2-4 inches (5-10 cm) for best results:
              </p>
              <ul className={resultLabelClasses}>
                <li><strong>Too shallow:</strong> Less than 2 inches may not provide adequate weed control</li>
                <li><strong>Too deep:</strong> More than 4 inches can prevent water from reaching plant roots</li>
                <li><strong>Standard bags:</strong> Typically contain 2 cubic feet of mulch</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Volume in Cubic Yards */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className={resultLabelClasses}>
                Volume (Cubic Yards)
              </div>
              <div className={resultValueClasses}>
                {formatNumber(volumeCubicYards)} yd³
              </div>
            </div>
            
            {/* Volume in Cubic Feet */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className={resultLabelClasses}>
                Volume (Cubic Feet)
              </div>
              <div className={resultValueClasses}>
                {formatNumber(volumeCubicFeet)} ft³
              </div>
            </div>
            
            {/* Volume in Cubic Meters */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className={resultLabelClasses}>
                Volume (Cubic Meters)
              </div>
              <div className={resultValueClasses}>
                {formatNumber(volumeCubicMeters)} m³
              </div>
            </div>
            
            {/* Bags Needed */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className={resultLabelClasses}>
                Standard Bags Needed
              </div>
              <div className={resultValueClasses}>
                {formatWholeNumber(bagsNeeded)} bags
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                Based on standard 2 cubic feet bags
              </div>
            </div>
          </div>
          
          {/* Mulch Info - Only visible on mobile */}
          <div className="block md:hidden">
            <div className={buttonClasses}>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Mulch Information</h3>
              <p className={resultLabelClasses}>
                Mulch is typically applied at a depth of 2-4 inches (5-10 cm) for best results:
              </p>
              <ul className={resultLabelClasses}>
                <li><strong>Too shallow:</strong> Less than 2 inches may not provide adequate weed control</li>
                <li><strong>Too deep:</strong> More than 4 inches can prevent water from reaching plant roots</li>
                <li><strong>Standard bags:</strong> Typically contain 2 cubic feet of mulch</li>
              </ul>
            </div>
          </div>
          
          {/* Mulch Tips */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Mulch Tips</h3>
            <ul className={resultLabelClasses}>
              <li><strong>New beds:</strong> Apply 3-4 inches of mulch</li>
              <li><strong>Maintenance:</strong> Add 1-2 inches annually as needed</li>
              <li><strong>Around trees:</strong> Keep mulch 2-3 inches away from trunks</li>
              <li><strong>Bulk delivery:</strong> Usually more economical for areas over 100 square feet</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MulchCalculator; 