'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

interface GravelCalculatorProps {
  calculator?: Calculator;
}

const GravelCalculator: React.FC<GravelCalculatorProps> = ({ calculator }) => {
  // Unit state
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  
  // Dimension state
  const [width, setWidth] = useState<string>('10');
  const [length, setLength] = useState<string>('10');
  const [depth, setDepth] = useState<string>('2');
  
  // Material state
  const [material, setMaterial] = useState<string>('gravel');
  
  // Price state
  const [includePriceCalculation, setIncludePriceCalculation] = useState<boolean>(false);
  const [pricePerUnit, setPricePerUnit] = useState<string>('50');
  
  // Results state
  const [volumeCubicYards, setVolumeCubicYards] = useState<number>(0);
  const [volumeCubicMeters, setVolumeCubicMeters] = useState<number>(0);
  const [weightTons, setWeightTons] = useState<number>(0);
  const [weightKg, setWeightKg] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  // Material density factors (tons per cubic yard or tonnes per cubic meter)
  const materialDensities = {
    gravel: { imperial: 1.4, metric: 1.68 }, // Gravel (1/4"-2")
    gravelSand: { imperial: 1.5, metric: 1.8 }, // Gravel-sand mix
    sand: { imperial: 1.3, metric: 1.56 } // Sand
  };
  
  // Material display names
  const materialNames = {
    gravel: 'Gravel (1/4"-2")',
    gravelSand: 'Gravel-Sand Mix',
    sand: 'Sand'
  };
  
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
  
  // Calculate results when inputs change
  useEffect(() => {
    calculateResults();
  }, [width, length, depth, material, unitSystem, pricePerUnit, includePriceCalculation]);
  
  // Calculate results
  const calculateResults = () => {
    // Parse input values
    const widthValue = parseFloat(width) || 0;
    const lengthValue = parseFloat(length) || 0;
    const depthValue = parseFloat(depth) || 0;
    const priceValue = parseFloat(pricePerUnit) || 0;
    
    // Get material density
    const density = materialDensities[material as keyof typeof materialDensities] || materialDensities.gravel;
    
    let volumeCubicYardsValue = 0;
    let volumeCubicMetersValue = 0;
    
    if (unitSystem === 'imperial') {
      // Calculate volume in cubic yards (width × length × depth in feet / 27)
      volumeCubicYardsValue = (widthValue * lengthValue * depthValue / 12) / 27;
      // Convert to cubic meters (1 cubic yard = 0.764555 cubic meters)
      volumeCubicMetersValue = volumeCubicYardsValue * 0.764555;
      
      // Calculate weight in tons (US short tons)
      const weightTonsValue = volumeCubicYardsValue * density.imperial;
      // Convert to kilograms (1 US short ton = 907.185 kg)
      const weightKgValue = weightTonsValue * 907.185;
      
      // Calculate total price
      const totalPriceValue = includePriceCalculation ? volumeCubicYardsValue * priceValue : 0;
      
      setVolumeCubicYards(volumeCubicYardsValue);
      setVolumeCubicMeters(volumeCubicMetersValue);
      setWeightTons(weightTonsValue);
      setWeightKg(weightKgValue);
      setTotalPrice(totalPriceValue);
    } else {
      // Calculate volume in cubic meters (width × length × depth in meters)
      volumeCubicMetersValue = (widthValue * lengthValue * depthValue) / 100;
      // Convert to cubic yards (1 cubic meter = 1.30795 cubic yards)
      volumeCubicYardsValue = volumeCubicMetersValue * 1.30795;
      
      // Calculate weight in tonnes (metric tons)
      const weightTonnesValue = volumeCubicMetersValue * density.metric;
      // Convert to US short tons (1 tonne = 1.10231 US short tons)
      const weightTonsValue = weightTonnesValue * 1.10231;
      
      // Calculate total price
      const totalPriceValue = includePriceCalculation ? volumeCubicMetersValue * priceValue : 0;
      
      setVolumeCubicYards(volumeCubicYardsValue);
      setVolumeCubicMeters(volumeCubicMetersValue);
      setWeightTons(weightTonsValue);
      setWeightKg(weightTonnesValue * 1000);
      setTotalPrice(totalPriceValue);
    }
  };
  
  // Format number with 2 decimal places
  const formatNumber = (value: number): string => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return `$${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };
  
  // Get unit label based on unit system
  const getUnitLabel = (type: 'dimension' | 'depth' | 'volume' | 'price'): string => {
    if (unitSystem === 'imperial') {
      switch (type) {
        case 'dimension': return 'ft';
        case 'depth': return 'in';
        case 'volume': return 'yd³';
        case 'price': return '$/yd³';
      }
    } else {
      switch (type) {
        case 'dimension': return 'm';
        case 'depth': return 'cm';
        case 'volume': return 'm³';
        case 'price': return '$/m³';
      }
    }
    return '';
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Gravel Calculator</h2>
          
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
          
          {/* Dimensions */}
          <div className="grid grid-cols-3 gap-3">
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
          </div>
          
          {/* Material Selection */}
          <div>
            <label htmlFor="material" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Material
            </label>
            <select
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              <option value="gravel">{materialNames.gravel}</option>
              <option value="gravelSand">{materialNames.gravelSand}</option>
              <option value="sand">{materialNames.sand}</option>
            </select>
          </div>
          
          {/* Price Calculation Toggle */}
          <div className="flex items-center">
            <input
              id="includePriceCalculation"
              type="checkbox"
              checked={includePriceCalculation}
              onChange={(e) => setIncludePriceCalculation(e.target.checked)}
              className="h-4 w-4 text-gray-900 dark:text-white focus:ring-blue-500 border-gray-200 dark:border-gray-700 rounded"
            />
            <label htmlFor="includePriceCalculation" className="ml-2 block text-sm text-gray-900 dark:text-white dark:text-gray-300">
              Include price calculation
            </label>
          </div>
          
          {/* Price Per Unit (only shown if price calculation is enabled) */}
          {includePriceCalculation && (
            <div>
              <label htmlFor="pricePerUnit" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Price Per Unit
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">$</span>
                </div>
                <input
                  type="tel"
                  id="pricePerUnit"
                  value={pricePerUnit}
                  onChange={(e) => handleNumberInput(e.target.value, setPricePerUnit)} {...decimalInputProps}
                  className="w-full pl-8 px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder={`Enter price per unit`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{getUnitLabel('price')}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Material Info - Only visible on desktop */}
          <div className="hidden md:block">
            <div className={buttonClasses}>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Material Information</h3>
              <p className={resultLabelClasses}>
                Different materials have different densities, which affects the weight and amount needed:
              </p>
              <ul className={resultLabelClasses}>
                <li><strong>Gravel (1/4"-2"):</strong> ~1.4 tons per cubic yard</li>
                <li><strong>Gravel-Sand Mix:</strong> ~1.5 tons per cubic yard</li>
                <li><strong>Sand:</strong> ~1.3 tons per cubic yard</li>
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
            
            {/* Volume in Cubic Meters */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className={resultLabelClasses}>
                Volume (Cubic Meters)
              </div>
              <div className={resultValueClasses}>
                {formatNumber(volumeCubicMeters)} m³
              </div>
            </div>
            
            {/* Weight in Tons */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className={resultLabelClasses}>
                Weight ({unitSystem === 'imperial' ? 'US Tons' : 'Tonnes'})
              </div>
              <div className={resultValueClasses}>
                {formatNumber(weightTons)} {unitSystem === 'imperial' ? 'tons' : 'tonnes'}
              </div>
            </div>
            
            {/* Weight in Kilograms */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className={resultLabelClasses}>
                Weight (Kilograms)
              </div>
              <div className={resultValueClasses}>
                {formatNumber(weightKg)} kg
              </div>
            </div>
            
            {/* Total Price (only shown if price calculation is enabled) */}
            {includePriceCalculation && (
              <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md sm:col-span-2">
                <div className={resultLabelClasses}>
                  Total Cost
                </div>
                <div className={resultValueClasses}>
                  {formatCurrency(totalPrice)}
                </div>
                <div className={resultLabelClasses}>
                  Based on {formatCurrency(parseFloat(pricePerUnit) || 0)} per {unitSystem === 'imperial' ? 'cubic yard' : 'cubic meter'}
                </div>
              </div>
            )}
          </div>
          
          {/* Material Info - Only visible on mobile */}
          <div className="block md:hidden">
            <div className={buttonClasses}>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Material Information</h3>
              <p className={resultLabelClasses}>
                Different materials have different densities, which affects the weight and amount needed:
              </p>
              <ul className={resultLabelClasses}>
                <li><strong>Gravel (1/4"-2"):</strong> ~1.4 tons per cubic yard</li>
                <li><strong>Gravel-Sand Mix:</strong> ~1.5 tons per cubic yard</li>
                <li><strong>Sand:</strong> ~1.3 tons per cubic yard</li>
              </ul>
            </div>
          </div>
          
          {/* Usage Tips */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Usage Tips</h3>
            <ul className={resultLabelClasses}>
              <li><strong>Driveways:</strong> 4-6 inches depth recommended</li>
              <li><strong>Walkways:</strong> 2-3 inches depth recommended</li>
              <li><strong>Landscaping:</strong> 2-4 inches depth recommended</li>
              <li><strong>Drainage:</strong> Consider adding 10-15% extra for settling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GravelCalculator; 