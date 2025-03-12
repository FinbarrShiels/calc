'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';

interface CookingConverterProps {
  calculator?: Calculator;
  defaultFromUnit?: UnitType;
  defaultToUnit?: UnitType;
  showFromOptions?: UnitType[];
  showToOptions?: UnitType[];
  conversionName?: string;
  // Add ingredient type for weight-volume conversions
  defaultIngredient?: string;
}

type UnitType = 
  'teaspoon' | 'tablespoon' | 'cup' | 'pint' | 'quart' | 'gallon' | 
  'milliliter' | 'liter' | 'fluid_ounce' | 'gill' | 'pint_uk' | 'quart_uk' |
  'gallon_uk' | 'cup_metric' | 'cup_uk' | 'cup_jp' |
  'gram' | 'kilogram' | 'ounce_weight' | 'pound';

interface UnitInfo {
  id: UnitType;
  name: string;
  abbr: string;
  toMl: number; // Conversion factor to milliliters
  toG?: number;  // Conversion factor to grams (for weight units)
  group: 'us' | 'metric' | 'imperial' | 'other' | 'weight';
  type: 'volume' | 'weight';
}

// Ingredient density data for volume-weight conversions (grams per milliliter)
interface IngredientDensity {
  id: string;
  name: string;
  density: number; // g/ml
}

const CookingConverter: React.FC<CookingConverterProps> = ({ 
  calculator, 
  defaultFromUnit = 'cup',
  defaultToUnit = 'milliliter',
  showFromOptions,
  showToOptions,
  conversionName,
  defaultIngredient = 'water'
}) => {
  // Input state
  const [amount, setAmount] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<UnitType>(defaultFromUnit);
  const [toUnit, setToUnit] = useState<UnitType>(defaultToUnit);
  const [ingredient, setIngredient] = useState<string>(defaultIngredient);
  
  // Results state
  const [result, setResult] = useState<number>(0);
  const [conversionError, setConversionError] = useState<string>('');
  
  // Ingredient density data for volume-weight conversions
  const ingredientDensities: IngredientDensity[] = [
    { id: 'water', name: 'Water', density: 1.0 },
    { id: 'milk', name: 'Milk', density: 1.03 },
    { id: 'flour', name: 'All-Purpose Flour', density: 0.53 },
    { id: 'sugar', name: 'Granulated Sugar', density: 0.85 },
    { id: 'brown_sugar', name: 'Brown Sugar', density: 0.72 },
    { id: 'butter', name: 'Butter', density: 0.96 },
    { id: 'oil', name: 'Vegetable Oil', density: 0.92 },
    { id: 'honey', name: 'Honey', density: 1.42 },
    { id: 'salt', name: 'Table Salt', density: 1.22 },
    { id: 'rice', name: 'White Rice (uncooked)', density: 0.78 },
  ];
  
  // Unit definitions with conversion factors
  const units: UnitInfo[] = [
    // US Customary (volume)
    { id: 'teaspoon', name: 'Teaspoon (US)', abbr: 'tsp', toMl: 4.93, group: 'us', type: 'volume' },
    { id: 'tablespoon', name: 'Tablespoon (US)', abbr: 'tbsp', toMl: 14.79, group: 'us', type: 'volume' },
    { id: 'fluid_ounce', name: 'Fluid Ounce (US)', abbr: 'fl oz', toMl: 29.57, group: 'us', type: 'volume' },
    { id: 'cup', name: 'Cup (US)', abbr: 'cup', toMl: 236.59, group: 'us', type: 'volume' },
    { id: 'pint', name: 'Pint (US)', abbr: 'pt', toMl: 473.18, group: 'us', type: 'volume' },
    { id: 'quart', name: 'Quart (US)', abbr: 'qt', toMl: 946.35, group: 'us', type: 'volume' },
    { id: 'gallon', name: 'Gallon (US)', abbr: 'gal', toMl: 3785.41, group: 'us', type: 'volume' },
    
    // UK/Imperial (volume)
    { id: 'teaspoon_uk', name: 'Teaspoon (UK)', abbr: 'tsp', toMl: 5.92, group: 'imperial', type: 'volume' },
    { id: 'tablespoon_uk', name: 'Tablespoon (UK)', abbr: 'tbsp', toMl: 17.76, group: 'imperial', type: 'volume' },
    { id: 'fluid_ounce_uk', name: 'Fluid Ounce (UK)', abbr: 'fl oz', toMl: 28.41, group: 'imperial', type: 'volume' },
    { id: 'cup_uk', name: 'Cup (UK)', abbr: 'cup', toMl: 284.13, group: 'imperial', type: 'volume' },
    { id: 'pint_uk', name: 'Pint (UK)', abbr: 'pt', toMl: 568.26, group: 'imperial', type: 'volume' },
    { id: 'quart_uk', name: 'Quart (UK)', abbr: 'qt', toMl: 1136.52, group: 'imperial', type: 'volume' },
    { id: 'gallon_uk', name: 'Gallon (UK)', abbr: 'gal', toMl: 4546.09, group: 'imperial', type: 'volume' },
    { id: 'gill', name: 'Gill (UK)', abbr: 'gill', toMl: 142.07, group: 'imperial', type: 'volume' },
    
    // Metric (volume)
    { id: 'milliliter', name: 'Milliliter', abbr: 'ml', toMl: 1, group: 'metric', type: 'volume' },
    { id: 'liter', name: 'Liter', abbr: 'L', toMl: 1000, group: 'metric', type: 'volume' },
    { id: 'cup_metric', name: 'Cup (Metric)', abbr: 'cup', toMl: 250, group: 'metric', type: 'volume' },
    
    // Weight units
    { id: 'gram', name: 'Gram', abbr: 'g', toMl: 0, toG: 1, group: 'weight', type: 'weight' },
    { id: 'kilogram', name: 'Kilogram', abbr: 'kg', toMl: 0, toG: 1000, group: 'weight', type: 'weight' },
    { id: 'ounce_weight', name: 'Ounce (weight)', abbr: 'oz', toMl: 0, toG: 28.35, group: 'weight', type: 'weight' },
    { id: 'pound', name: 'Pound', abbr: 'lb', toMl: 0, toG: 453.59, group: 'weight', type: 'weight' },
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
  
  // Get unit info by ID
  const getUnitInfo = (unitId: UnitType): UnitInfo => {
    return units.find(unit => unit.id === unitId) || units[0];
  };
  
  // Get ingredient density
  const getIngredientDensity = (ingredientId: string): number => {
    const ingredientInfo = ingredientDensities.find(item => item.id === ingredientId);
    return ingredientInfo ? ingredientInfo.density : 1.0; // Default to water density
  };
  
  // Convert between units
  const convert = () => {
    const amountValue = parseFloat(amount) || 0;
    const fromUnitInfo = getUnitInfo(fromUnit);
    const toUnitInfo = getUnitInfo(toUnit);
    
    setConversionError('');
    
    // Same unit type conversion (volume to volume or weight to weight)
    if (fromUnitInfo.type === toUnitInfo.type) {
      if (fromUnitInfo.type === 'volume') {
        // Volume to volume conversion
        const mlValue = amountValue * fromUnitInfo.toMl;
        const resultValue = mlValue / toUnitInfo.toMl;
        setResult(resultValue);
      } else {
        // Weight to weight conversion
        const gValue = amountValue * (fromUnitInfo.toG || 0);
        const resultValue = gValue / (toUnitInfo.toG || 1);
        setResult(resultValue);
      }
    } 
    // Cross-type conversion (volume to weight or weight to volume)
    else {
      const density = getIngredientDensity(ingredient);
      
      if (fromUnitInfo.type === 'volume' && toUnitInfo.type === 'weight') {
        // Volume to weight: volume (ml) * density (g/ml) = weight (g)
        const mlValue = amountValue * fromUnitInfo.toMl;
        const gValue = mlValue * density;
        const resultValue = gValue / (toUnitInfo.toG || 1);
        setResult(resultValue);
      } 
      else if (fromUnitInfo.type === 'weight' && toUnitInfo.type === 'volume') {
        // Weight to volume: weight (g) / density (g/ml) = volume (ml)
        const gValue = amountValue * (fromUnitInfo.toG || 0);
        const mlValue = gValue / density;
        const resultValue = mlValue / toUnitInfo.toMl;
        setResult(resultValue);
      }
    }
  };
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convert();
  }, [amount, fromUnit, toUnit, ingredient]);
  
  // Ensure the default units are set when the component mounts
  useEffect(() => {
    setFromUnit(defaultFromUnit);
    setToUnit(defaultToUnit);
    setIngredient(defaultIngredient);
  }, [defaultFromUnit, defaultToUnit, defaultIngredient]);
  
  // Format result with appropriate precision
  const formatResult = (): string => {
    if (result === 0) return '0';
    
    // Determine appropriate precision based on the result value
    let precision = 2;
    
    if (result >= 100) {
      precision = 1;
    } else if (result >= 10) {
      precision = 2;
    } else if (result < 0.1) {
      precision = 4;
    }
    
    // Special case for very small values
    if (result < 0.001) {
      return result.toExponential(2);
    }
    
    return result.toFixed(precision);
  };
  
  // Group units by category for the dropdown
  const unitGroups = [
    {
      name: 'US Customary',
      units: units.filter(unit => unit.group === 'us')
    },
    {
      name: 'UK/Imperial',
      units: units.filter(unit => unit.group === 'imperial')
    },
    {
      name: 'Metric',
      units: units.filter(unit => unit.group === 'metric')
    },
    {
      name: 'Weight',
      units: units.filter(unit => unit.group === 'weight')
    }
  ];
  
  // Filter units based on the provided options
  const getFilteredUnits = (unitList: UnitInfo[], allowedUnits?: UnitType[]) => {
    if (!allowedUnits || allowedUnits.length === 0) {
      return unitList;
    }
    return unitList.filter(unit => allowedUnits.includes(unit.id));
  };
  
  // Get filtered unit groups for dropdowns
  const getFilteredUnitGroups = (allowedUnits?: UnitType[]) => {
    if (!allowedUnits || allowedUnits.length === 0) {
      return unitGroups;
    }
    
    // Create filtered groups
    return unitGroups
      .map(group => ({
        name: group.name,
        units: group.units.filter(unit => allowedUnits.includes(unit.id))
      }))
      .filter(group => group.units.length > 0); // Only include groups with units
  };
  
  // Get filtered groups for each dropdown
  const fromUnitGroups = getFilteredUnitGroups(showFromOptions);
  const toUnitGroups = getFilteredUnitGroups(showToOptions);
  
  // Check if we need to show the ingredient selector
  const needsIngredientSelector = () => {
    const fromUnitInfo = getUnitInfo(fromUnit);
    const toUnitInfo = getUnitInfo(toUnit);
    return fromUnitInfo.type !== toUnitInfo.type;
  };
  
  // Common conversions for the selected from unit
  const getCommonConversions = (): { unit: UnitInfo; value: number }[] => {
    const fromUnitInfo = getUnitInfo(fromUnit);
    const amountValue = parseFloat(amount) || 0;
    
    // Select common units based on the type (volume or weight)
    let commonUnitIds: UnitType[] = [];
    
    if (fromUnitInfo.type === 'volume') {
      commonUnitIds = ['teaspoon', 'tablespoon', 'cup', 'milliliter', 'fluid_ounce', 'liter'];
    } else {
      commonUnitIds = ['gram', 'kilogram', 'ounce_weight', 'pound'];
    }
    
    // Filter to only include units of the same type
    const filteredUnits = commonUnitIds
      .filter(id => id !== fromUnit && getUnitInfo(id).type === fromUnitInfo.type)
      .map(id => getUnitInfo(id));
    
    // Calculate conversions
    return filteredUnits.map(unitInfo => {
      let value = 0;
      
      if (fromUnitInfo.type === 'volume') {
        const mlValue = amountValue * fromUnitInfo.toMl;
        value = mlValue / unitInfo.toMl;
      } else {
        const gValue = amountValue * (fromUnitInfo.toG || 0);
        value = gValue / (unitInfo.toG || 1);
      }
      
      return { unit: unitInfo, value };
    });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">
            {conversionName || "Cooking Measurement Converter"}
          </h2>
          
          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel" onChange={(e) => handleNumberInput(e.target.value, setAmount)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter amount"
              />
            </div>
          </div>
          
          {/* From Unit Selection - with filtered options */}
          <div>
            <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              From
            </label>
            {showFromOptions && showFromOptions.length === 1 ? (
              // If only one option, show it as text instead of dropdown
              <div className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white">
                {getUnitInfo(fromUnit).name}
              </div>
            ) : (
              <select
                id="fromUnit"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as UnitType)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {fromUnitGroups.map(group => (
                  <optgroup key={group.name} label={group.name}>
                    {group.units.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            )}
          </div>
          
          {/* To Unit Selection - with filtered options */}
          <div>
            <label htmlFor="toUnit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              To
            </label>
            {showToOptions && showToOptions.length === 1 ? (
              // If only one option, show it as text instead of dropdown
              <div className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white">
                {getUnitInfo(toUnit).name}
              </div>
            ) : (
              <select
                id="toUnit"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as UnitType)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {toUnitGroups.map(group => (
                  <optgroup key={group.name} label={group.name}>
                    {group.units.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            )}
          </div>
          
          {/* Ingredient Selector - only show when converting between volume and weight */}
          {needsIngredientSelector() && (
            <div>
              <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ingredient
              </label>
              <select
                id="ingredient"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {ingredientDensities.map(ing => (
                  <option key={ing.id} value={ing.id}>
                    {ing.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Select ingredient for accurate volume-weight conversion
              </p>
            </div>
          )}
          
          {/* Conversion Explanation */}
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Measurement Tips</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              For the most accurate cooking results:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Use liquid measuring cups for liquids</li>
              <li>• Use dry measuring cups for dry ingredients</li>
              <li>• Level off dry ingredients with a straight edge</li>
              <li>• Read liquid measurements at eye level</li>
              {needsIngredientSelector() && (
                <li>• Volume-weight conversions depend on ingredient density</li>
              )}
            </ul>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          {/* Conversion Result */}
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Conversion Result
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {formatResult()} {getUnitInfo(toUnit).abbr}
            </div>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {amount || '0'} {getUnitInfo(fromUnit).abbr} = {formatResult()} {getUnitInfo(toUnit).abbr}
              {needsIngredientSelector() && (
                <span> (for {ingredientDensities.find(ing => ing.id === ingredient)?.name.toLowerCase()})</span>
              )}
            </div>
            
            {conversionError && (
              <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                {conversionError}
              </div>
            )}
          </div>
          
          {/* Common Conversions */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">
              Common Conversions
            </h3>
            <div className="space-y-2">
              {getCommonConversions().map((conversion, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {amount || '0'} {getUnitInfo(fromUnit).abbr} in {conversion.unit.name}
                  </span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    = {conversion.value.toFixed(2)} {conversion.unit.abbr}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Conversion Table */}
          <div className="calculator-card p-4 rounded-md border border-gray-200 dark:border-gray-600">
            <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">
              Quick Reference
            </h3>
            <div className="overflow-x-auto">
              {getUnitInfo(fromUnit).type === 'volume' ? (
                <table className="calculator-table">
                  <thead>
                    <tr>
                      <th className="calculator-table-header">US</th>
                      <th className="calculator-table-header">Metric</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="calculator-table-cell">1 teaspoon (tsp)</td>
                      <td className="calculator-table-cell">4.93 ml</td>
                    </tr>
                    <tr>
                      <td className="calculator-table-cell">1 tablespoon (tbsp)</td>
                      <td className="calculator-table-cell">14.79 ml</td>
                    </tr>
                    <tr>
                      <td className="calculator-table-cell">1 fluid ounce (fl oz)</td>
                      <td className="calculator-table-cell">29.57 ml</td>
                    </tr>
                    <tr>
                      <td className="calculator-table-cell">1 cup</td>
                      <td className="calculator-table-cell">236.59 ml</td>
                    </tr>
                    <tr>
                      <td className="calculator-table-cell">1 pint (pt)</td>
                      <td className="calculator-table-cell">473.18 ml</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="calculator-table">
                  <thead>
                    <tr>
                      <th className="calculator-table-header">US/Imperial</th>
                      <th className="calculator-table-header">Metric</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="calculator-table-cell">1 ounce (oz)</td>
                      <td className="calculator-table-cell">28.35 g</td>
                    </tr>
                    <tr>
                      <td className="calculator-table-cell">1 pound (lb)</td>
                      <td className="calculator-table-cell">453.59 g</td>
                    </tr>
                    <tr>
                      <td className="calculator-table-cell">1 pound (lb)</td>
                      <td className="calculator-table-cell">0.45 kg</td>
                    </tr>
                    <tr>
                      <td className="calculator-table-cell">2.2 pounds (lb)</td>
                      <td className="calculator-table-cell">1 kg</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
          
          {/* Cooking Tips */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Cooking Tips</h3>
            {getUnitInfo(fromUnit).type === 'volume' ? (
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 3 teaspoons = 1 tablespoon</li>
                <li>• 16 tablespoons = 1 cup</li>
                <li>• 2 cups = 1 pint</li>
                <li>• 2 pints = 1 quart</li>
                <li>• 4 quarts = 1 gallon</li>
                <li>• 1 stick of butter = 1/2 cup = 8 tablespoons</li>
              </ul>
            ) : (
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 16 ounces = 1 pound</li>
                <li>• 1000 grams = 1 kilogram</li>
                <li>• 1 cup flour ≈ 120-125 grams</li>
                <li>• 1 cup sugar ≈ 200 grams</li>
                <li>• 1 cup butter ≈ 227 grams</li>
                <li>• 1 large egg ≈ 50 grams</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingConverter; 