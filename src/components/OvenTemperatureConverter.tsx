'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

interface OvenTemperatureConverterProps {
  calculator?: Calculator;
}

type TemperatureUnit = 'fahrenheit' | 'celsius' | 'celsius_fan' | 'gas_mark';

interface TemperatureInfo {
  id: TemperatureUnit;
  name: string;
  abbr: string;
  description: string;
}

const OvenTemperatureConverter: React.FC<OvenTemperatureConverterProps> = ({ calculator }) => {
  // Input state
  const [temperature, setTemperature] = useState<string>('180');
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>('celsius');
  
  // Results state
  const [fahrenheit, setFahrenheit] = useState<number>(0);
  const [celsius, setCelsius] = useState<number>(0);
  const [celsiusFan, setCelsiusFan] = useState<number>(0);
  const [gasMarkRaw, setGasMarkRaw] = useState<number>(0);
  const [gasMarkDisplay, setGasMarkDisplay] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  
  // Temperature unit definitions
  const temperatureUnits: TemperatureInfo[] = [
    { id: 'fahrenheit', name: 'Fahrenheit', abbr: '°F', description: 'Standard in US recipes' },
    { id: 'celsius', name: 'Celsius', abbr: '°C', description: 'Standard in most countries' },
    { id: 'celsius_fan', name: 'Celsius (Fan/Convection)', abbr: '°C Fan', description: 'For fan-assisted ovens' },
    { id: 'gas_mark', name: 'Gas Mark', abbr: 'Gas Mark', description: 'Used in UK and some Commonwealth countries' },
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

    // Validate the input format (positive numbers only)
    const regex = /^\d*\.?\d*$/;
    if (regex.test(value)) {
      setter(value);
    }
  };
  
  // Get temperature unit info by ID
  const getTemperatureUnitInfo = (unitId: TemperatureUnit): TemperatureInfo => {
    return temperatureUnits.find(unit => unit.id === unitId) || temperatureUnits[0];
  };
  
  // Convert between temperature units
  const convertTemperatures = () => {
    const tempValue = parseFloat(temperature) || 0;
    
    // First convert to Celsius as the base unit
    let celsiusValue = 0;
    
    switch (fromUnit) {
      case 'fahrenheit':
        celsiusValue = (tempValue - 32) * 5/9;
        break;
      case 'celsius':
        celsiusValue = tempValue;
        break;
      case 'celsius_fan':
        celsiusValue = tempValue + 20; // Convert from fan to conventional
        break;
      case 'gas_mark':
        celsiusValue = (tempValue * 25) + 135; // Approximate conversion
        break;
    }
    
    // Then convert from Celsius to all other units
    const fahrenheitValue = (celsiusValue * 9/5) + 32;
    const celsiusFanValue = celsiusValue - 20; // Conventional to fan
    const gasMarkValue = (celsiusValue - 135) / 25; // Approximate conversion
    
    // Set the calculated values
    setFahrenheit(Math.round(fahrenheitValue));
    setCelsius(Math.round(celsiusValue));
    setCelsiusFan(Math.round(celsiusFanValue));
    setGasMarkRaw(gasMarkValue);
    
    // Format Gas Mark for display
    setGasMarkDisplay(formatGasMark(gasMarkValue));
    
    // Set description based on temperature range
    setDescription(getTemperatureDescription(celsiusValue));
  };
  
  // Format Gas Mark for display
  const formatGasMark = (value: number): string => {
    if (value <= 0) return 'Less than ¼';
    if (value < 0.25) return '¼';
    if (value < 0.5) return '½';
    if (value < 1) return '¾';
    
    // For whole numbers and values close to whole numbers
    if (Math.abs(value - Math.round(value)) < 0.1) {
      return Math.round(value).toString();
    }
    
    // For values between whole numbers
    const lowerValue = Math.floor(value);
    const upperValue = Math.ceil(value);
    return `${lowerValue}-${upperValue}`;
  };
  
  // Get temperature description based on Celsius value
  const getTemperatureDescription = (celsius: number): string => {
    if (celsius < 120) return 'Very Low - Slow cooking, dehydrating';
    if (celsius < 150) return 'Very Low - Slow cooking, keeping food warm';
    if (celsius < 160) return 'Low - Slow roasting, some bread proofing';
    if (celsius < 180) return 'Moderate - Baking cakes, cookies, bread';
    if (celsius < 190) return 'Moderate - Most baking, roasting vegetables';
    if (celsius < 220) return 'Moderately Hot - Roasting meats, pizza';
    if (celsius < 240) return 'Hot - Crispy roast potatoes, quick roasting';
    if (celsius < 260) return 'Very Hot - Pizza, flatbreads, quick browning';
    return 'Extremely Hot - High-heat cooking, some bread baking';
  };
  
  // Calculate conversions when inputs change
  useEffect(() => {
    convertTemperatures();
  }, [temperature, fromUnit]);
  
  // Common oven temperatures for quick selection
  const commonTemperatures = [
    { name: 'Very Low', fahrenheit: 275, celsius: 140, celsius_fan: 120, gas_mark: 1 },
    { name: 'Low', fahrenheit: 300, celsius: 150, celsius_fan: 130, gas_mark: 2 },
    { name: 'Moderate', fahrenheit: 350, celsius: 180, celsius_fan: 160, gas_mark: 4 },
    { name: 'Moderately Hot', fahrenheit: 400, celsius: 200, celsius_fan: 180, gas_mark: 6 },
    { name: 'Hot', fahrenheit: 425, celsius: 220, celsius_fan: 200, gas_mark: 7 },
    { name: 'Very Hot', fahrenheit: 475, celsius: 240, celsius_fan: 220, gas_mark: 9 },
  ];
  
  // Handle quick selection of common temperature
  const handleQuickSelect = (temp: number) => {
    setTemperature(temp.toString());
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Oven Temperature Converter</h2>
          
          {/* Temperature Input */}
          <div>
            <label htmlFor="temperature" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Temperature
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel" onChange={(e) => handleNumberInput(e.target.value, setTemperature)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter temperature"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{getTemperatureUnitInfo(fromUnit).abbr}</span>
              </div>
            </div>
          </div>
          
          {/* From Unit Selection */}
          <div>
            <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Temperature Scale
            </label>
            <select
              id="fromUnit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as TemperatureUnit)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              {temperatureUnits.map(unit => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
              {getTemperatureUnitInfo(fromUnit).description}
            </div>
          </div>
          
          {/* Quick Select Temperatures */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Common Temperatures
            </label>
            <div className="grid grid-cols-3 gap-2">
              {commonTemperatures.map((temp, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSelect(temp[fromUnit])}
                  className="px-3 py-2 bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted hover:bg-muted dark:hover:bg-muted/80 rounded-md text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 transition-colors"
                >
                  {temp.name}: {temp[fromUnit]}{fromUnit === 'gas_mark' ? '' : '°'}
                </button>
              ))}
            </div>
          </div>
          
          {/* Conversion Explanation */}
          <div className={buttonClasses}>
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Temperature Scale Tips</h3>
            <ul className={resultLabelClasses}>
              <li>• Fahrenheit (°F): Standard in US recipes</li>
              <li>• Celsius (°C): Standard in most countries</li>
              <li>• Celsius Fan (°C): For fan-assisted/convection ovens</li>
              <li>• Gas Mark: Used in UK and some Commonwealth countries</li>
              <li>• Fan ovens typically cook 20°C lower than conventional</li>
            </ul>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Conversion Results</h2>
          
          {/* Temperature Description */}
          <div className={buttonClasses}>
            <div className={resultLabelClasses}>
              Temperature Description
            </div>
            <div className="text-lg font-medium text-gray-900 dark:text-white dark:text-blue-400">
              {description}
            </div>
          </div>
          
          {/* Conversion Results */}
          <div className="grid grid-cols-2 gap-4">
            {/* Fahrenheit Result */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className={resultLabelClasses}>
                Fahrenheit
              </div>
              <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
                {fahrenheit}°F
              </div>
            </div>
            
            {/* Celsius Result */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className={resultLabelClasses}>
                Celsius
              </div>
              <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
                {celsius}°C
              </div>
            </div>
            
            {/* Celsius Fan Result */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className={resultLabelClasses}>
                Celsius (Fan)
              </div>
              <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
                {celsiusFan}°C
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                For fan-assisted/convection ovens
              </div>
            </div>
            
            {/* Gas Mark Result */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className={resultLabelClasses}>
                Gas Mark
              </div>
              <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
                {gasMarkDisplay}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                UK gas oven setting
              </div>
            </div>
          </div>
          
          {/* Conversion Table */}
          <div className="calculator-card dark:bg-muted p-4 rounded-md border border-gray-200 dark:border-gray-700 dark:border-gray-600">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">
              Common Oven Settings
            </h3>
            <div className="overflow-x-auto">
              <table className="calculator-table">
                <thead>
                  <tr>
                    <th className="calculator-table-header">Description</th>
                    <th className="calculator-table-header">°F</th>
                    <th className="calculator-table-header">°C</th>
                    <th className="calculator-table-header">°C Fan</th>
                    <th className="calculator-table-header">Gas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {commonTemperatures.map((temp, index) => (
                    <tr key={index}>
                      <td className="calculator-table-cell">{temp.name}</td>
                      <td className="calculator-table-cell">{temp.fahrenheit}°F</td>
                      <td className="calculator-table-cell">{temp.celsius}°C</td>
                      <td className="calculator-table-cell">{temp.celsius_fan}°C</td>
                      <td className="calculator-table-cell">{temp.gas_mark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Oven Tips */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Oven Tips</h3>
            <ul className={resultLabelClasses}>
              <li>• Always preheat your oven for at least 10-15 minutes</li>
              <li>• Use an oven thermometer for accurate temperature readings</li>
              <li>• Reduce temperature by 25°F when using dark pans</li>
              <li>• Fan ovens cook faster - check food 5-10 minutes earlier</li>
              <li>• Position racks in the middle for most even cooking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OvenTemperatureConverter; 