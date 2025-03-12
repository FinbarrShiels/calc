'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

interface BakingConversionCalculatorProps {
  calculator?: Calculator;
}

type UnitType = 'cups' | 'grams' | 'ounces' | 'pounds' | 'tablespoons' | 'teaspoons';
type IngredientType = 
  'all-purpose-flour' | 'bread-flour' | 'cake-flour' | 'pastry-flour' | 'whole-wheat-flour' | 
  'cornflour' | 'granulated-sugar' | 'caster-sugar' | 'brown-sugar' | 'powdered-sugar' | 
  'honey' | 'butter' | 'margarine' | 'milk' | 'yogurt' | 'oil-sunflower' | 'oil-olive' | 
  'oil-coconut' | 'cocoa-powder' | 'oats' | 'rice-uncooked';

interface ConversionRatio {
  ingredient: IngredientType;
  name: string;
  cupToGram: number;
  tablespoonToGram: number;
  teaspoonToGram: number;
}

const BakingConversionCalculator: React.FC<BakingConversionCalculatorProps> = ({ calculator }) => {
  // Input state
  const [amount, setAmount] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<UnitType>('cups');
  const [toUnit, setToUnit] = useState<UnitType>('grams');
  const [ingredient, setIngredient] = useState<IngredientType>('all-purpose-flour');
  
  // Results state
  const [result, setResult] = useState<number>(0);
  
  // Conversion ratios for different ingredients
  // These values represent how many grams are in 1 cup, 1 tablespoon, and 1 teaspoon of each ingredient
  const conversionRatios: ConversionRatio[] = [
    { ingredient: 'all-purpose-flour', name: 'All-Purpose Flour', cupToGram: 125, tablespoonToGram: 8, teaspoonToGram: 2.6 },
    { ingredient: 'bread-flour', name: 'Bread Flour', cupToGram: 130, tablespoonToGram: 8.1, teaspoonToGram: 2.7 },
    { ingredient: 'cake-flour', name: 'Cake Flour', cupToGram: 115, tablespoonToGram: 7.2, teaspoonToGram: 2.4 },
    { ingredient: 'pastry-flour', name: 'Pastry Flour', cupToGram: 120, tablespoonToGram: 7.5, teaspoonToGram: 2.5 },
    { ingredient: 'whole-wheat-flour', name: 'Whole-Wheat Flour', cupToGram: 140, tablespoonToGram: 8.8, teaspoonToGram: 2.9 },
    { ingredient: 'cornflour', name: 'Cornflour (Cornstarch)', cupToGram: 120, tablespoonToGram: 7.5, teaspoonToGram: 2.5 },
    { ingredient: 'granulated-sugar', name: 'Granulated Sugar', cupToGram: 200, tablespoonToGram: 12.5, teaspoonToGram: 4.2 },
    { ingredient: 'caster-sugar', name: 'Caster Sugar', cupToGram: 190, tablespoonToGram: 12, teaspoonToGram: 4 },
    { ingredient: 'brown-sugar', name: 'Brown Sugar (packed)', cupToGram: 220, tablespoonToGram: 13.8, teaspoonToGram: 4.6 },
    { ingredient: 'powdered-sugar', name: 'Powdered Sugar (unsifted)', cupToGram: 120, tablespoonToGram: 7.5, teaspoonToGram: 2.5 },
    { ingredient: 'honey', name: 'Honey', cupToGram: 340, tablespoonToGram: 21, teaspoonToGram: 7 },
    { ingredient: 'butter', name: 'Butter', cupToGram: 227, tablespoonToGram: 14.2, teaspoonToGram: 4.7 },
    { ingredient: 'margarine', name: 'Margarine', cupToGram: 227, tablespoonToGram: 14.2, teaspoonToGram: 4.7 },
    { ingredient: 'milk', name: 'Milk', cupToGram: 240, tablespoonToGram: 15, teaspoonToGram: 5 },
    { ingredient: 'yogurt', name: 'Yogurt (Greek)', cupToGram: 245, tablespoonToGram: 15.3, teaspoonToGram: 5.1 },
    { ingredient: 'oil-sunflower', name: 'Oil (Sunflower)', cupToGram: 218, tablespoonToGram: 13.6, teaspoonToGram: 4.5 },
    { ingredient: 'oil-olive', name: 'Oil (Olive)', cupToGram: 216, tablespoonToGram: 13.5, teaspoonToGram: 4.5 },
    { ingredient: 'oil-coconut', name: 'Oil (Coconut)', cupToGram: 218, tablespoonToGram: 13.6, teaspoonToGram: 4.5 },
    { ingredient: 'cocoa-powder', name: 'Cocoa Powder', cupToGram: 85, tablespoonToGram: 5.3, teaspoonToGram: 1.8 },
    { ingredient: 'oats', name: 'Oats', cupToGram: 90, tablespoonToGram: 5.6, teaspoonToGram: 1.9 },
    { ingredient: 'rice-uncooked', name: 'Rice (uncooked)', cupToGram: 185, tablespoonToGram: 11.6, teaspoonToGram: 3.9 },
  ];
  
  // Unit conversion constants
  const GRAMS_PER_OUNCE = 28.35;
  const OUNCES_PER_POUND = 16;
  const TEASPOONS_PER_TABLESPOON = 3;
  const TABLESPOONS_PER_CUP = 16;
  
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
  
  // Get conversion ratio for selected ingredient
  const getConversionRatio = (): ConversionRatio => {
    return conversionRatios.find(ratio => ratio.ingredient === ingredient) || conversionRatios[0];
  };
  
  // Convert between units
  const convert = () => {
    const amountValue = parseFloat(amount) || 0;
    const ratio = getConversionRatio();
    
    // First convert from source unit to grams
    let gramsValue = 0;
    
    switch (fromUnit) {
      case 'cups':
        gramsValue = amountValue * ratio.cupToGram;
        break;
      case 'tablespoons':
        gramsValue = amountValue * ratio.tablespoonToGram;
        break;
      case 'teaspoons':
        gramsValue = amountValue * ratio.teaspoonToGram;
        break;
      case 'grams':
        gramsValue = amountValue;
        break;
      case 'ounces':
        gramsValue = amountValue * GRAMS_PER_OUNCE;
        break;
      case 'pounds':
        gramsValue = amountValue * GRAMS_PER_OUNCE * OUNCES_PER_POUND;
        break;
    }
    
    // Then convert from grams to target unit
    let resultValue = 0;
    
    switch (toUnit) {
      case 'cups':
        resultValue = gramsValue / ratio.cupToGram;
        break;
      case 'tablespoons':
        resultValue = gramsValue / ratio.tablespoonToGram;
        break;
      case 'teaspoons':
        resultValue = gramsValue / ratio.teaspoonToGram;
        break;
      case 'grams':
        resultValue = gramsValue;
        break;
      case 'ounces':
        resultValue = gramsValue / GRAMS_PER_OUNCE;
        break;
      case 'pounds':
        resultValue = gramsValue / (GRAMS_PER_OUNCE * OUNCES_PER_POUND);
        break;
    }
    
    setResult(resultValue);
  };
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convert();
  }, [amount, fromUnit, toUnit, ingredient]);
  
  // Format result with appropriate precision
  const formatResult = (): string => {
    if (result === 0) return '0';
    
    // Determine appropriate precision based on the result value and unit
    let precision = 2;
    
    if (result >= 100) {
      precision = 0;
    } else if (result >= 10) {
      precision = 1;
    } else if (result < 0.1) {
      precision = 3;
    }
    
    // Special case for very small values
    if (result < 0.001) {
      return result.toExponential(2);
    }
    
    return result.toFixed(precision);
  };
  
  // Get unit abbreviation
  const getUnitAbbreviation = (unit: UnitType): string => {
    switch (unit) {
      case 'cups': return 'cup(s)';
      case 'tablespoons': return 'tbsp';
      case 'teaspoons': return 'tsp';
      case 'grams': return 'g';
      case 'ounces': return 'oz';
      case 'pounds': return 'lb';
    }
  };
  
  // Group ingredients by category for the dropdown
  const ingredientCategories = [
    {
      name: 'Flours',
      ingredients: conversionRatios.filter(r => 
        ['all-purpose-flour', 'bread-flour', 'cake-flour', 'pastry-flour', 'whole-wheat-flour', 'cornflour'].includes(r.ingredient)
      )
    },
    {
      name: 'Sugars & Sweeteners',
      ingredients: conversionRatios.filter(r => 
        ['granulated-sugar', 'caster-sugar', 'brown-sugar', 'powdered-sugar', 'honey'].includes(r.ingredient)
      )
    },
    {
      name: 'Dairy & Fats',
      ingredients: conversionRatios.filter(r => 
        ['butter', 'margarine', 'milk', 'yogurt', 'oil-sunflower', 'oil-olive', 'oil-coconut'].includes(r.ingredient)
      )
    },
    {
      name: 'Other Ingredients',
      ingredients: conversionRatios.filter(r => 
        ['cocoa-powder', 'oats', 'rice-uncooked'].includes(r.ingredient)
      )
    }
  ];
  
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
                type="tel"
                id="amount"
                value={amount}
                onChange={(e) => handleNumberInput(e.target.value, setAmount)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter amount"
              />
            </div>
          </div>
          
          {/* From Unit Selection */}
          <div>
            <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              From
            </label>
            <select
              id="fromUnit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as UnitType)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              <option value="cups">Cups</option>
              <option value="tablespoons">Tablespoons</option>
              <option value="teaspoons">Teaspoons</option>
              <option value="grams">Grams</option>
              <option value="ounces">Ounces</option>
              <option value="pounds">Pounds</option>
            </select>
          </div>
          
          {/* To Unit Selection */}
          <div>
            <label htmlFor="toUnit" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              To
            </label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value as UnitType)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              <option value="grams">Grams</option>
              <option value="cups">Cups</option>
              <option value="tablespoons">Tablespoons</option>
              <option value="teaspoons">Teaspoons</option>
              <option value="ounces">Ounces</option>
              <option value="pounds">Pounds</option>
            </select>
          </div>
          
          {/* Ingredient Selection */}
          <div>
            <label htmlFor="ingredient" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Ingredient
            </label>
            <select
              id="ingredient"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value as IngredientType)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              {ingredientCategories.map(category => (
                <optgroup key={category.name} label={category.name}>
                  {category.ingredients.map(item => (
                    <option key={item.ingredient} value={item.ingredient}>
                      {item.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          
          {/* Conversion Explanation */}
          <div className={buttonClasses}>
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Conversion Tips</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              For the most accurate results in baking:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Weight measurements (grams, ounces) are more precise than volume</li>
              <li>• Flour should be spooned into measuring cups, not scooped</li>
              <li>• Brown sugar should be firmly packed when using cup measurements</li>
              <li>• Ingredient density can vary by brand and environmental conditions</li>
            </ul>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Result</h2>
          
          {/* Conversion Result */}
          <div className={buttonClasses}>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Conversion Result
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {formatResult()} {getUnitAbbreviation(toUnit)}
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              {amount || '0'} {getUnitAbbreviation(fromUnit)} of {getConversionRatio().name}
            </div>
          </div>
          
          {/* Common Equivalents */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">
              Common Equivalents for {getConversionRatio().name}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">1 cup</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  = {getConversionRatio().cupToGram} g / {(getConversionRatio().cupToGram / GRAMS_PER_OUNCE).toFixed(1)} oz
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">1 tablespoon</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  = {getConversionRatio().tablespoonToGram} g / {(getConversionRatio().tablespoonToGram / GRAMS_PER_OUNCE).toFixed(1)} oz
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">1 teaspoon</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  = {getConversionRatio().teaspoonToGram} g / {(getConversionRatio().teaspoonToGram / GRAMS_PER_OUNCE).toFixed(2)} oz
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">100 grams</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  = {(100 / getConversionRatio().cupToGram).toFixed(2)} cups / {(100 / getConversionRatio().tablespoonToGram).toFixed(1)} tbsp
                </span>
              </div>
            </div>
          </div>
          
          {/* Volume to Weight Conversion Table */}
          <div className="calculator-card dark:bg-muted p-4 rounded-md border border-gray-200 dark:border-gray-700 dark:border-gray-600">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">
              Quick Conversion Table
            </h3>
            <div className="overflow-x-auto">
              <table className="calculator-table">
                <thead>
                  <tr>
                    <th className="calculator-table-header">Volume</th>
                    <th className="calculator-table-header">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="calculator-table-cell">¼ cup</td>
                    <td className="calculator-table-cell">
                      {(getConversionRatio().cupToGram * 0.25).toFixed(0)} g / {(getConversionRatio().cupToGram * 0.25 / GRAMS_PER_OUNCE).toFixed(1)} oz
                    </td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">⅓ cup</td>
                    <td className="calculator-table-cell">
                      {(getConversionRatio().cupToGram / 3).toFixed(0)} g / {(getConversionRatio().cupToGram / 3 / GRAMS_PER_OUNCE).toFixed(1)} oz
                    </td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">½ cup</td>
                    <td className="calculator-table-cell">
                      {(getConversionRatio().cupToGram * 0.5).toFixed(0)} g / {(getConversionRatio().cupToGram * 0.5 / GRAMS_PER_OUNCE).toFixed(1)} oz
                    </td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">⅔ cup</td>
                    <td className="calculator-table-cell">
                      {(getConversionRatio().cupToGram * 2/3).toFixed(0)} g / {(getConversionRatio().cupToGram * 2/3 / GRAMS_PER_OUNCE).toFixed(1)} oz
                    </td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">¾ cup</td>
                    <td className="calculator-table-cell">
                      {(getConversionRatio().cupToGram * 0.75).toFixed(0)} g / {(getConversionRatio().cupToGram * 0.75 / GRAMS_PER_OUNCE).toFixed(1)} oz
                    </td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">1 cup</td>
                    <td className="calculator-table-cell">
                      {getConversionRatio().cupToGram.toFixed(0)} g / {(getConversionRatio().cupToGram / GRAMS_PER_OUNCE).toFixed(1)} oz
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Baking Tips */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Baking Tips</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• For best results, use a kitchen scale for precise measurements</li>
              <li>• Different brands of ingredients may have slightly different densities</li>
              <li>• Sift flour before measuring for more accurate volume measurements</li>
              <li>• Room temperature ingredients blend better in most recipes</li>
              <li>• When substituting ingredients, consider both weight and properties</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BakingConversionCalculator; 