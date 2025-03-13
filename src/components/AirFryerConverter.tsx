'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface AirFryerConverterProps {
  calculator?: Calculator;
}

type OvenType = 'conventional' | 'fan' | 'convection';
type TempUnit = 'celsius' | 'fahrenheit';
type FoodSpread = 'yes' | 'no';
type FoodType = 'meat' | 'poultry' | 'fish' | 'vegetables' | 'baked_goods' | 'frozen_foods';

const AirFryerConverter: React.FC<AirFryerConverterProps> = ({ calculator }) => {
  // Input state
  const [ovenType, setOvenType] = useState<OvenType>('conventional');
  const [tempUnit, setTempUnit] = useState<TempUnit>('celsius');
  const [ovenTemp, setOvenTemp] = useState<string>('180');
  const [cookingTime, setCookingTime] = useState<string>('30');
  const [foodSpread, setFoodSpread] = useState<FoodSpread>('no');
  const [foodType, setFoodType] = useState<FoodType>('meat');
  
  // Results state
  const [airFryerTemp, setAirFryerTemp] = useState<number>(0);
  const [airFryerTime, setAirFryerTime] = useState<number>(0);
  const [airFryerTimeRange, setAirFryerTimeRange] = useState<[number, number]>([0, 0]);
  
  // Handle number input with validation
  const handleNumberInput = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    min: number = 0,
    max: number = 1000
  ) => {
    // Allow empty input
    if (value === '') {
      setter('');
      return;
    }

    // Validate the input format (positive integers only)
    const regex = /^\d+$/;
    if (regex.test(value)) {
      const numValue = parseInt(value);
      if (numValue >= min && numValue <= max) {
        setter(value);
      }
    }
  };
  
  // Convert temperature between Celsius and Fahrenheit
  const convertTemperature = (temp: number, from: TempUnit, to: TempUnit): number => {
    if (from === to) return temp;
    
    if (from === 'celsius' && to === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    } else {
      return Math.round((temp - 32) * 5/9);
    }
  };
  
  // Calculate air fryer temperature and time
  useEffect(() => {
    const ovenTempValue = parseInt(ovenTemp) || 0;
    const cookingTimeValue = parseInt(cookingTime) || 0;
    
    // Convert oven temperature to air fryer temperature
    let airFryerTempValue = 0;
    
    if (ovenType === 'conventional') {
      // For conventional ovens, reduce temperature by 25°F (15°C)
      airFryerTempValue = tempUnit === 'celsius' 
        ? ovenTempValue - 15 
        : ovenTempValue - 25;
    } else {
      // For fan/convection ovens, reduce temperature by 10°F (5°C)
      airFryerTempValue = tempUnit === 'celsius' 
        ? ovenTempValue - 5 
        : ovenTempValue - 10;
    }
    
    // Ensure temperature is within reasonable bounds
    if (tempUnit === 'celsius') {
      airFryerTempValue = Math.max(80, Math.min(airFryerTempValue, 230));
    } else {
      airFryerTempValue = Math.max(170, Math.min(airFryerTempValue, 450));
    }
    
    setAirFryerTemp(airFryerTempValue);
    
    // Calculate air fryer cooking time
    let timeReductionFactor = 0.75; // Default 25% reduction
    
    // Adjust based on food type
    switch (foodType) {
      case 'meat':
        timeReductionFactor = 0.7; // 30% reduction
        break;
      case 'poultry':
        timeReductionFactor = 0.7; // 30% reduction
        break;
      case 'fish':
        timeReductionFactor = 0.65; // 35% reduction
        break;
      case 'vegetables':
        timeReductionFactor = 0.6; // 40% reduction
        break;
      case 'baked_goods':
        timeReductionFactor = 0.75; // 25% reduction
        break;
      case 'frozen_foods':
        timeReductionFactor = 0.8; // 20% reduction
        break;
    }
    
    // Adjust based on whether food is spread flat
    if (foodSpread === 'yes') {
      timeReductionFactor -= 0.05; // Additional 5% reduction if spread flat
    }
    
    const airFryerTimeValue = Math.round(cookingTimeValue * timeReductionFactor);
    setAirFryerTime(airFryerTimeValue);
    
    // Calculate a time range (±10% of the calculated time)
    const minTime = Math.max(1, Math.floor(airFryerTimeValue * 0.9));
    const maxTime = Math.ceil(airFryerTimeValue * 1.1);
    setAirFryerTimeRange([minTime, maxTime]);
    
  }, [ovenType, tempUnit, ovenTemp, cookingTime, foodSpread, foodType]);
  
  // Get temperature in both units
  const getTemperatureInBothUnits = (temp: number, primaryUnit: TempUnit): string => {
    const secondaryUnit = primaryUnit === 'celsius' ? 'fahrenheit' : 'celsius';
    const secondaryTemp = convertTemperature(temp, primaryUnit, secondaryUnit);
    
    return `${temp}°${primaryUnit === 'celsius' ? 'C' : 'F'} (${secondaryTemp}°${secondaryUnit === 'celsius' ? 'C' : 'F'})`;
  };
  
  // Food type options with descriptions
  const foodTypeOptions = [
    { value: 'meat', label: 'Meat (beef, pork, lamb)', description: 'Steaks, chops, roasts, ground meat' },
    { value: 'poultry', label: 'Poultry', description: 'Chicken, turkey, duck' },
    { value: 'fish', label: 'Fish & Seafood', description: 'Fish fillets, shrimp, scallops' },
    { value: 'vegetables', label: 'Vegetables', description: 'Fresh or frozen vegetables, potatoes' },
    { value: 'baked_goods', label: 'Baked Goods', description: 'Cookies, muffins, small cakes' },
    { value: 'frozen_foods', label: 'Frozen Foods', description: 'Fries, nuggets, pre-cooked items' },
  ];
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Air Fryer Converter</h2>
          
          {/* Oven Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Oven Type
            </label>
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-1 rounded-lg w-fit">
              <button
                onClick={() => setOvenType('conventional')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  ovenType === 'conventional'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Conventional
              </button>
              <button
                onClick={() => setOvenType('fan')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  ovenType === 'fan'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Fan/Convection
              </button>
            </div>
          </div>
          
          {/* Temperature Unit Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Temperature Unit
            </label>
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-1 rounded-lg w-fit">
              <button
                onClick={() => setTempUnit('celsius')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  tempUnit === 'celsius'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Celsius (°C)
              </button>
              <button
                onClick={() => setTempUnit('fahrenheit')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  tempUnit === 'fahrenheit'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Fahrenheit (°F)
              </button>
            </div>
          </div>
          
          {/* Oven Temperature Input */}
          <div>
            <label htmlFor="ovenTemp" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Oven Temperature
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel" onChange={(e) => handleNumberInput(e.target.value, setOvenTemp, 50, 500)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter oven temperature"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">°{tempUnit === 'celsius' ? 'C' : 'F'}</span>
              </div>
            </div>
          </div>
          
          {/* Cooking Time Input */}
          <div>
            <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Oven Cooking Time
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel" onChange={(e) => handleNumberInput(e.target.value, setCookingTime, 1, 180)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter cooking time"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">minutes</span>
              </div>
            </div>
          </div>
          
          {/* Food Type Selection */}
          <div>
            <label htmlFor="foodType" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Food Type
            </label>
            <select
              id="foodType"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value as FoodType)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              {foodTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
              {foodTypeOptions.find(option => option.value === foodType)?.description}
            </div>
          </div>
          
          {/* Food Spread Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Is Food Spread in a Single Layer?
            </label>
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-1 rounded-lg w-fit">
              <button
                onClick={() => setFoodSpread('yes')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  foodSpread === 'yes'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setFoodSpread('no')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  foodSpread === 'no'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                No
              </button>
            </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Food spread in a single layer cooks faster and more evenly
            </div>
          </div>
          
          {/* Conversion Explanation */}
          <div className="calculator-button">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Air Fryer Tips</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300">
              <li>• Preheat your air fryer for 3-5 minutes before cooking</li>
              <li>• Arrange food in a single layer for best results</li>
              <li>• Shake the basket or flip food halfway through cooking</li>
              <li>• Check food earlier than the suggested time</li>
              <li>• Spray or brush food lightly with oil for crispiness</li>
            </ul>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Air Fryer Settings</h2>
          
          {/* Temperature Result */}
          <div className="calculator-button">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Air Fryer Temperature
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {airFryerTemp}°{tempUnit === 'celsius' ? 'C' : 'F'}
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Converted from {ovenTemp}°{tempUnit === 'celsius' ? 'C' : 'F'} {ovenType} oven
            </div>
          </div>
          
          {/* Cooking Time Result */}
          <div className="calculator-button">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Air Fryer Cooking Time
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {airFryerTime} minutes
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Suggested range: {airFryerTimeRange[0]}-{airFryerTimeRange[1]} minutes
            </div>
          </div>
          
          {/* Food Type Specific Tips */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">
              Tips for {foodTypeOptions.find(option => option.value === foodType)?.label}
            </h3>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              {foodType === 'meat' && (
                <>
                  <p>• Use a meat thermometer to check for doneness</p>
                  <p>• Let meat rest for 3-5 minutes after air frying</p>
                  <p>• For steaks, preheat air fryer to a higher temperature</p>
                  <p>• Thicker cuts may need more time</p>
                </>
              )}
              {foodType === 'poultry' && (
                <>
                  <p>• Ensure internal temperature reaches 165°F (74°C)</p>
                  <p>• Spray or brush with oil for crispy skin</p>
                  <p>• Bone-in pieces take longer than boneless</p>
                  <p>• Flip halfway through cooking for even browning</p>
                </>
              )}
              {foodType === 'fish' && (
                <>
                  <p>• Fish cooks quickly in an air fryer</p>
                  <p>• Check for doneness early to prevent overcooking</p>
                  <p>• Fish is done when it flakes easily with a fork</p>
                  <p>• Line the basket with parchment for delicate fish</p>
                </>
              )}
              {foodType === 'vegetables' && (
                <>
                  <p>• Cut vegetables into uniform sizes</p>
                  <p>• Toss with a little oil and seasoning before cooking</p>
                  <p>• Shake the basket halfway through cooking</p>
                  <p>• Dense vegetables like potatoes take longer</p>
                </>
              )}
              {foodType === 'baked_goods' && (
                <>
                  <p>• Use oven-safe baking dishes that fit in your air fryer</p>
                  <p>• Check doneness earlier than the suggested time</p>
                  <p>• Reduce temperature slightly for even baking</p>
                  <p>• Allow space for baked goods to rise</p>
                </>
              )}
              {foodType === 'frozen_foods' && (
                <>
                  <p>• No need to thaw before cooking</p>
                  <p>• Shake or flip halfway through cooking</p>
                  <p>• May need slightly longer cooking times</p>
                  <p>• Spray lightly with oil for extra crispiness</p>
                </>
              )}
            </div>
          </div>
          
          {/* Temperature Conversion Table */}
          <div className="calculator-card dark:bg-muted p-4 rounded-md border border-gray-200 dark:border-gray-700 dark:border-gray-600">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">
              Common Oven to Air Fryer Temperature Conversions
            </h3>
            <div className="overflow-x-auto">
              <table className="calculator-table">
                <thead>
                  <tr>
                    <th className="calculator-table-header">Oven Temp</th>
                    <th className="calculator-table-header">Air Fryer Temp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {tempUnit === 'celsius' ? (
                    <>
                      <tr>
                        <td className="calculator-table-cell">160°C</td>
                        <td className="calculator-table-cell">145°C</td>
                      </tr>
                      <tr>
                        <td className="calculator-table-cell">180°C</td>
                        <td className="calculator-table-cell">165°C</td>
                      </tr>
                      <tr>
                        <td className="calculator-table-cell">200°C</td>
                        <td className="calculator-table-cell">185°C</td>
                      </tr>
                      <tr>
                        <td className="calculator-table-cell">220°C</td>
                        <td className="calculator-table-cell">205°C</td>
                      </tr>
                      <tr>
                        <td className="calculator-table-cell">240°C</td>
                        <td className="calculator-table-cell">225°C</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <td className="calculator-table-cell">325°F</td>
                        <td className="calculator-table-cell">300°F</td>
                      </tr>
                      <tr>
                        <td className="calculator-table-cell">350°F</td>
                        <td className="calculator-table-cell">325°F</td>
                      </tr>
                      <tr>
                        <td className="calculator-table-cell">375°F</td>
                        <td className="calculator-table-cell">350°F</td>
                      </tr>
                      <tr>
                        <td className="calculator-table-cell">400°F</td>
                        <td className="calculator-table-cell">375°F</td>
                      </tr>
                      <tr>
                        <td className="calculator-table-cell">425°F</td>
                        <td className="calculator-table-cell">400°F</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Important Note */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Important Note</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              These are approximate conversions. Air fryer models vary, so you may need to adjust temperature and time based on your specific air fryer. Always check food for doneness before serving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirFryerConverter; 