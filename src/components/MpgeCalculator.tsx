'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface MpgeCalculatorProps {
  calculator?: Calculator;
}

const MpgeCalculator: React.FC<MpgeCalculatorProps> = ({ calculator }) => {
  // Input state
  const [calculationMethod, setCalculationMethod] = useState<'efficiency' | 'consumption'>('efficiency');
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  
  // Input values
  const [inputValue, setInputValue] = useState<string>('4');
  
  // Results state
  const [results, setResults] = useState({
    milesPerKwh: 4,
    kwhPer100Miles: 25,
    kmPerKwh: 6.44,
    kwhPer100Km: 15.53,
    mpge: 134.8,
    lPer100Km: 1.75
  });
  
  // Constants
  const KWH_PER_GALLON = 33.7; // 1 gallon of gasoline = 33.7 kWh of energy
  const KM_PER_MILE = 1.60934;
  const LITERS_PER_GALLON = 3.78541;
  
  // Handle number input with validation
  const handleNumberInput = (value: string) => {
    // Allow empty input
    if (value === '') {
      setInputValue('');
      return;
    }

    // Handle special cases for decimal input
    if (value === '.' || value === '0.') {
      setInputValue('0.');
      return;
    }

    // Validate the input format (positive numbers only)
    const regex = /^\d*\.?\d*$/;
    if (regex.test(value)) {
      setInputValue(value);
    }
  };
  
  // Calculate all results based on the current input
  useEffect(() => {
    // Skip calculation if input is empty
    if (inputValue === '') return;
    
    const inputNumber = parseFloat(inputValue) || 0;
    
    // Prevent division by zero
    if (inputNumber <= 0) {
      setResults({
        milesPerKwh: 0,
        kwhPer100Miles: 0,
        kmPerKwh: 0,
        kwhPer100Km: 0,
        mpge: 0,
        lPer100Km: 0
      });
      return;
    }
    
    let milesPerKwh = 0;
    let kwhPer100Miles = 0;
    let kmPerKwh = 0;
    let kwhPer100Km = 0;
    
    // Calculate based on input type and unit system
    if (unitSystem === 'imperial') {
      if (calculationMethod === 'efficiency') {
        // Input is miles per kWh
        milesPerKwh = inputNumber;
        kwhPer100Miles = 100 / milesPerKwh;
      } else {
        // Input is kWh per 100 miles
        kwhPer100Miles = inputNumber;
        milesPerKwh = 100 / kwhPer100Miles;
      }
      
      // Calculate metric equivalents
      kmPerKwh = milesPerKwh * KM_PER_MILE;
      kwhPer100Km = 100 / kmPerKwh;
    } else {
      if (calculationMethod === 'efficiency') {
        // Input is km per kWh
        kmPerKwh = inputNumber;
        kwhPer100Km = 100 / kmPerKwh;
      } else {
        // Input is kWh per 100 km
        kwhPer100Km = inputNumber;
        kmPerKwh = 100 / kwhPer100Km;
      }
      
      // Calculate imperial equivalents
      milesPerKwh = kmPerKwh / KM_PER_MILE;
      kwhPer100Miles = 100 / milesPerKwh;
    }
    
    // Calculate MPGe and L/100km
    const mpge = milesPerKwh * KWH_PER_GALLON;
    const lPer100Km = mpge > 0 ? (LITERS_PER_GALLON * 100) / mpge : 0;
    
    setResults({
      milesPerKwh,
      kwhPer100Miles,
      kmPerKwh,
      kwhPer100Km,
      mpge,
      lPer100Km
    });
  }, [inputValue, calculationMethod, unitSystem, KWH_PER_GALLON, KM_PER_MILE, LITERS_PER_GALLON]);
  
  // Update input value when calculation method or unit system changes
  useEffect(() => {
    // Get the appropriate value based on current selection
    let newValue = '';
    
    if (unitSystem === 'imperial') {
      newValue = calculationMethod === 'efficiency' 
        ? results.milesPerKwh.toFixed(2)
        : results.kwhPer100Miles.toFixed(2);
    } else {
      newValue = calculationMethod === 'efficiency'
        ? results.kmPerKwh.toFixed(2)
        : results.kwhPer100Km.toFixed(2);
    }
    
    // Only update if the value is valid
    if (parseFloat(newValue) > 0) {
      setInputValue(newValue);
    }
  }, [calculationMethod, unitSystem]);
  
  // Format number with 2 decimal places
  const formatNumber = (value: number): string => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  // Format number with 1 decimal place
  const formatNumberOneDec = (value: number): string => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    });
  };
  
  // Get efficiency rating based on MPGe
  const getEfficiencyRating = (mpgeValue: number): string => {
    if (mpgeValue >= 120) return 'Excellent';
    if (mpgeValue >= 100) return 'Very Good';
    if (mpgeValue >= 80) return 'Good';
    if (mpgeValue >= 60) return 'Average';
    if (mpgeValue >= 40) return 'Below Average';
    return 'Poor';
  };
  
  // Get input label based on current settings
  const getInputLabel = (): string => {
    if (unitSystem === 'imperial') {
      return calculationMethod === 'efficiency' ? 'Miles per kWh' : 'kWh per 100 Miles';
    } else {
      return calculationMethod === 'efficiency' ? 'Kilometers per kWh' : 'kWh per 100 Kilometers';
    }
  };
  
  // Get input unit based on current settings
  const getInputUnit = (): string => {
    if (unitSystem === 'imperial') {
      return calculationMethod === 'efficiency' ? 'mi/kWh' : 'kWh/100mi';
    } else {
      return calculationMethod === 'efficiency' ? 'km/kWh' : 'kWh/100km';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">MPGe Calculator</h2>
          
          {/* Calculation Method Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Calculation Method
            </label>
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-1 rounded-lg w-fit">
              <button
                onClick={() => setCalculationMethod('efficiency')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  calculationMethod === 'efficiency'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Efficiency (mi/kWh)
              </button>
              <button
                onClick={() => setCalculationMethod('consumption')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  calculationMethod === 'consumption'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Consumption (kWh/100mi)
              </button>
            </div>
          </div>
          
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
                Imperial (mi/kWh)
              </button>
              <button
                onClick={() => setUnitSystem('metric')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  unitSystem === 'metric'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Metric (km/kWh)
              </button>
            </div>
          </div>
          
          {/* Input Field */}
          <div>
            <label htmlFor="inputValue" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              {getInputLabel()}
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="inputValue"
                value={inputValue}
                onChange={(e) => handleNumberInput(e.target.value)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder={`Enter ${getInputLabel().toLowerCase()}`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{getInputUnit()}</span>
              </div>
            </div>
          </div>
          
          {/* MPGe Info - Only visible on desktop */}
          <div className="hidden md:block">
            <div className="calculator-button">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">About MPGe</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                MPGe (Miles Per Gallon equivalent) is a measure used by the EPA to compare the energy efficiency of electric and alternative fuel vehicles to conventional gasoline vehicles.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                The EPA uses the equivalence of 33.7 kWh of electricity = 1 gallon of gasoline based on their energy content.
              </p>
            </div>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          <div className="grid grid-cols-1 gap-4">
            {/* MPGe Result */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Miles Per Gallon Equivalent (MPGe)
              </div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {formatNumberOneDec(results.mpge)} MPGe
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Efficiency Rating: <span className="font-medium">{getEfficiencyRating(results.mpge)}</span>
              </div>
            </div>
            
            {/* L/100km Result */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Liters per 100 Kilometers Equivalent
              </div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {formatNumberOneDec(results.lPer100Km)} L/100km
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                European standard fuel economy measure
              </div>
            </div>
            
            {/* Conversion Summary */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Efficiency Summary
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Miles per kWh</div>
                  <div className="calculator-section-header">{formatNumber(results.milesPerKwh)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">kWh per 100 miles</div>
                  <div className="calculator-section-header">{formatNumber(results.kwhPer100Miles)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Kilometers per kWh</div>
                  <div className="calculator-section-header">{formatNumber(results.kmPerKwh)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">kWh per 100 km</div>
                  <div className="calculator-section-header">{formatNumber(results.kwhPer100Km)}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* MPGe Info - Only visible on mobile */}
          <div className="block md:hidden">
            <div className="calculator-button">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">About MPGe</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                MPGe (Miles Per Gallon equivalent) is a measure used by the EPA to compare the energy efficiency of electric and alternative fuel vehicles to conventional gasoline vehicles.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                The EPA uses the equivalence of 33.7 kWh of electricity = 1 gallon of gasoline based on their energy content.
              </p>
            </div>
          </div>
          
          {/* Typical MPGe Values */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Typical MPGe Values</h3>
            <div className="overflow-x-auto">
              <table className="calculator-table">
                <thead>
                  <tr>
                    <th className="calculator-table-header">Vehicle Type</th>
                    <th className="calculator-table-header">Typical MPGe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="calculator-table-cell">Efficient EV (e.g., Tesla Model 3)</td>
                    <td className="calculator-table-cell">120-140</td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">Average EV</td>
                    <td className="calculator-table-cell">100-120</td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">Electric SUV</td>
                    <td className="calculator-table-cell">70-100</td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">Electric Truck</td>
                    <td className="calculator-table-cell">60-80</td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">Hybrid Vehicle</td>
                    <td className="calculator-table-cell">40-60</td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">Efficient Gas Vehicle</td>
                    <td className="calculator-table-cell">30-40</td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">Average Gas Vehicle</td>
                    <td className="calculator-table-cell">20-30</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MpgeCalculator; 