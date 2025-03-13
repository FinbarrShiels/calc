'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface MilesPerKwhCalculatorProps {
  calculator?: Calculator;
}

const MilesPerKwhCalculator: React.FC<MilesPerKwhCalculatorProps> = ({ calculator }) => {
  // View state (standard or conversion)
  const [activeView, setActiveView] = useState<'standard' | 'conversion'>('standard');
  
  // Standard view state
  const [distance, setDistance] = useState<string>('100');
  const [distanceUnit, setDistanceUnit] = useState<'miles' | 'km'>('miles');
  const [energyUsed, setEnergyUsed] = useState<string>('25');
  const [currency, setCurrency] = useState<string>('USD');
  const [pricePerKwh, setPricePerKwh] = useState<string>('0.15');
  
  // Conversion view state
  const [convertFrom, setConvertFrom] = useState<string>('mi/kwh');
  const [convertValue, setConvertValue] = useState<string>('4');
  
  // Results state
  const [milesPerKwh, setMilesPerKwh] = useState<number>(0);
  const [kwhPer100Miles, setKwhPer100Miles] = useState<number>(0);
  const [kwhPer100Km, setKwhPer100Km] = useState<number>(0);
  const [whPerMile, setWhPerMile] = useState<number>(0);
  const [mpge, setMpge] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  
  // Constants
  const MILES_TO_KM = 1.60934;
  const KM_TO_MILES = 0.621371;
  const KWH_TO_WH = 1000;
  const MPGE_FACTOR = 33.7; // 33.7 kWh is equivalent to 1 gallon of gasoline energy
  
  // Currency symbols
  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'C$',
    AUD: 'A$',
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
  
  // Calculate standard view results
  useEffect(() => {
    if (activeView === 'standard') {
      calculateStandardResults();
    }
  }, [distance, distanceUnit, energyUsed, pricePerKwh, activeView]);
  
  // Calculate conversion view results
  useEffect(() => {
    if (activeView === 'conversion') {
      calculateConversionResults();
    }
  }, [convertFrom, convertValue, activeView]);
  
  // Calculate standard view results
  const calculateStandardResults = () => {
    const distanceValue = parseFloat(distance) || 0;
    const energyValue = parseFloat(energyUsed) || 1; // Avoid division by zero
    const priceValue = parseFloat(pricePerKwh) || 0;
    
    let distanceMiles = distanceValue;
    if (distanceUnit === 'km') {
      distanceMiles = distanceValue * KM_TO_MILES;
    }
    
    // Calculate miles per kWh
    const milesPerKwhValue = distanceMiles / energyValue;
    
    // Calculate kWh per 100 miles
    const kwhPer100MilesValue = (energyValue / distanceMiles) * 100;
    
    // Calculate kWh per 100 km
    const kwhPer100KmValue = (energyValue / (distanceMiles * MILES_TO_KM)) * 100;
    
    // Calculate Wh per mile
    const whPerMileValue = (energyValue * KWH_TO_WH) / distanceMiles;
    
    // Calculate MPGe (Miles Per Gallon equivalent)
    const mpgeValue = milesPerKwhValue * MPGE_FACTOR;
    
    // Calculate total cost
    const totalCostValue = energyValue * priceValue;
    
    setMilesPerKwh(milesPerKwhValue);
    setKwhPer100Miles(kwhPer100MilesValue);
    setKwhPer100Km(kwhPer100KmValue);
    setWhPerMile(whPerMileValue);
    setMpge(mpgeValue);
    setTotalCost(totalCostValue);
  };
  
  // Calculate conversion view results
  const calculateConversionResults = () => {
    const value = parseFloat(convertValue) || 0;
    
    let milesPerKwhValue = 0;
    let kwhPer100MilesValue = 0;
    let kwhPer100KmValue = 0;
    let whPerMileValue = 0;
    let mpgeValue = 0;
    
    switch (convertFrom) {
      case 'mi/kwh':
        milesPerKwhValue = value;
        kwhPer100MilesValue = value > 0 ? 100 / value : 0;
        kwhPer100KmValue = value > 0 ? 100 / (value * MILES_TO_KM) : 0;
        whPerMileValue = value > 0 ? KWH_TO_WH / value : 0;
        mpgeValue = value * MPGE_FACTOR;
        break;
        
      case 'kwh/100mi':
        milesPerKwhValue = value > 0 ? 100 / value : 0;
        kwhPer100MilesValue = value;
        kwhPer100KmValue = value / MILES_TO_KM;
        whPerMileValue = value * 10; // kWh/100mi to Wh/mi
        mpgeValue = value > 0 ? (100 / value) * MPGE_FACTOR : 0;
        break;
        
      case 'kwh/100km':
        milesPerKwhValue = value > 0 ? 100 / (value * MILES_TO_KM) : 0;
        kwhPer100MilesValue = value * MILES_TO_KM;
        kwhPer100KmValue = value;
        whPerMileValue = value * MILES_TO_KM * 10; // kWh/100km to Wh/mi
        mpgeValue = value > 0 ? (100 / (value * MILES_TO_KM)) * MPGE_FACTOR : 0;
        break;
        
      case 'wh/mi':
        milesPerKwhValue = value > 0 ? KWH_TO_WH / value : 0;
        kwhPer100MilesValue = (value / KWH_TO_WH) * 100;
        kwhPer100KmValue = ((value / KWH_TO_WH) * 100) / MILES_TO_KM;
        whPerMileValue = value;
        mpgeValue = value > 0 ? (KWH_TO_WH / value) * MPGE_FACTOR : 0;
        break;
        
      case 'mpge':
        milesPerKwhValue = value / MPGE_FACTOR;
        kwhPer100MilesValue = value > 0 ? (MPGE_FACTOR * 100) / value : 0;
        kwhPer100KmValue = value > 0 ? (MPGE_FACTOR * 100) / (value * MILES_TO_KM) : 0;
        whPerMileValue = value > 0 ? (KWH_TO_WH * MPGE_FACTOR) / value : 0;
        mpgeValue = value;
        break;
    }
    
    setMilesPerKwh(milesPerKwhValue);
    setKwhPer100Miles(kwhPer100MilesValue);
    setKwhPer100Km(kwhPer100KmValue);
    setWhPerMile(whPerMileValue);
    setMpge(mpgeValue);
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
    const symbol = currencySymbols[currency] || '$';
    return `${symbol}${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      {/* View Toggle Buttons */}
      <div className="flex mb-6 bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveView('standard')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeView === 'standard'
              ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
              : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
          }`}
        >
          Standard
        </button>
        <button
          onClick={() => setActiveView('conversion')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeView === 'conversion'
              ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
              : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
          }`}
        >
          Conversion
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">
            {activeView === 'standard' ? 'Electric Vehicle Efficiency Calculator' : 'EV Efficiency Unit Converter'}
          </h2>
          
          {activeView === 'standard' ? (
            <>
              {/* Distance */}
              <div>
                <label htmlFor="distance" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  Distance Travelled
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1 rounded-md shadow-sm">
                    <input
                      type="tel"
                      id="distance"
                      value={distance}
                      onChange={(e) => handleNumberInput(e.target.value, setDistance)} {...decimalInputProps}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                      placeholder="Enter distance"
                    />
                  </div>
                  <select
                    value={distanceUnit}
                    onChange={(e) => setDistanceUnit(e.target.value as 'miles' | 'km')}
                    className="px-3 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  >
                    <option value="miles">miles</option>
                    <option value="km">km</option>
                  </select>
                </div>
              </div>
              
              {/* Energy Used */}
              <div>
                <label htmlFor="energyUsed" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  Energy Used
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="tel"
                    id="energyUsed"
                    value={energyUsed}
                    onChange={(e) => handleNumberInput(e.target.value, setEnergyUsed)} {...decimalInputProps}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                    placeholder="Enter energy used"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">kWh</span>
                  </div>
                </div>
              </div>
              
              {/* Currency and Price */}
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  Currency and Price per kWh
                </label>
                <div className="flex space-x-2">
                  <select
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="px-3 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="CAD">CAD (C$)</option>
                    <option value="AUD">AUD (A$)</option>
                  </select>
                  <div className="relative flex-1 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{currencySymbols[currency] || '$'}</span>
                    </div>
                    <input
                      type="tel"
                      id="pricePerKwh"
                      value={pricePerKwh}
                      onChange={(e) => handleNumberInput(e.target.value, setPricePerKwh)} {...decimalInputProps}
                      className="w-full pl-8 px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                      placeholder="Enter price per kWh"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">/kWh</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Conversion View */}
              <div>
                <label htmlFor="convertFrom" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  Convert From
                </label>
                <select
                  id="convertFrom"
                  value={convertFrom}
                  onChange={(e) => setConvertFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground mb-4"
                >
                  <option value="mi/kwh">Miles per kWh (mi/kWh)</option>
                  <option value="kwh/100mi">kWh per 100 miles (kWh/100mi)</option>
                  <option value="kwh/100km">kWh per 100 kilometers (kWh/100km)</option>
                  <option value="wh/mi">Watt-hours per mile (Wh/mi)</option>
                  <option value="mpge">Miles per gallon equivalent (MPGe)</option>
                </select>
                
                <label htmlFor="convertValue" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  Value
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="tel"
                    id="convertValue"
                    value={convertValue}
                    onChange={(e) => handleNumberInput(e.target.value, setConvertValue)} {...decimalInputProps}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                    placeholder="Enter value to convert"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">
                      {convertFrom === 'mi/kwh' ? 'mi/kWh' : 
                       convertFrom === 'kwh/100mi' ? 'kWh/100mi' : 
                       convertFrom === 'kwh/100km' ? 'kWh/100km' : 
                       convertFrom === 'wh/mi' ? 'Wh/mi' : 'MPGe'}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Info Box - Only visible on desktop */}
          <div className="hidden md:block">
            <div className="calculator-button">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">About EV Efficiency</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Electric vehicle efficiency is typically measured in miles per kilowatt-hour (mi/kWh) or kilowatt-hours per 100 miles (kWh/100mi).
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Higher mi/kWh or lower kWh/100mi values indicate better efficiency. MPGe (Miles Per Gallon equivalent) is used to compare electric vehicles to gas vehicles.
              </p>
            </div>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Miles per kWh
              </div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {formatNumber(milesPerKwh)} mi/kWh
              </div>
            </div>
            
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                kWh per 100 miles
              </div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {formatNumber(kwhPer100Miles)} kWh/100mi
              </div>
            </div>
            
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                kWh per 100 km
              </div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {formatNumber(kwhPer100Km)} kWh/100km
              </div>
            </div>
            
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Watt-hours per mile
              </div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {formatNumber(whPerMile)} Wh/mi
              </div>
            </div>
            
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                MPGe
              </div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {formatNumber(mpge)} MPGe
              </div>
            </div>
            
            {activeView === 'standard' && (
              <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total Cost
                </div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(totalCost)}
                </div>
              </div>
            )}
          </div>
          
          {/* Info Box - Only visible on mobile */}
          <div className="block md:hidden">
            <div className="calculator-button">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">About EV Efficiency</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Electric vehicle efficiency is typically measured in miles per kilowatt-hour (mi/kWh) or kilowatt-hours per 100 miles (kWh/100mi).
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Higher mi/kWh or lower kWh/100mi values indicate better efficiency. MPGe (Miles Per Gallon equivalent) is used to compare electric vehicles to gas vehicles.
              </p>
            </div>
          </div>
          
          {/* Reference Table */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Typical EV Efficiency</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="calculator-card p-2 rounded">
                <div className="font-medium text-gray-900 dark:text-white dark:text-gray-200">Efficient EV</div>
                <div className="text-gray-500 dark:text-gray-400 dark:text-gray-300">4+ mi/kWh</div>
              </div>
              <div className="calculator-card p-2 rounded">
                <div className="font-medium text-gray-900 dark:text-white dark:text-gray-200">Average EV</div>
                <div className="text-gray-500 dark:text-gray-400 dark:text-gray-300">3-4 mi/kWh</div>
              </div>
              <div className="calculator-card p-2 rounded">
                <div className="font-medium text-gray-900 dark:text-white dark:text-gray-200">SUV/Truck EV</div>
                <div className="text-gray-500 dark:text-gray-400 dark:text-gray-300">2-3 mi/kWh</div>
              </div>
              <div className="calculator-card p-2 rounded">
                <div className="font-medium text-gray-900 dark:text-white dark:text-gray-200">Performance EV</div>
                <div className="text-gray-500 dark:text-gray-400 dark:text-gray-300">2-2.5 mi/kWh</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilesPerKwhCalculator; 