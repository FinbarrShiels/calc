'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

interface LedSavingsCalculatorProps {
  calculator?: Calculator;
}

const LedSavingsCalculator: React.FC<LedSavingsCalculatorProps> = ({ calculator }) => {
  // Currency state
  const [currency, setCurrency] = useState<string>('USD');
  
  // Bulb details state
  const [bulbQuantity, setBulbQuantity] = useState<string>('10');
  const [existingWattage, setExistingWattage] = useState<string>('60');
  const [ledWattage, setLedWattage] = useState<string>('9');
  
  // Usage state
  const [hoursPerDay, setHoursPerDay] = useState<string>('5');
  const [daysPerWeek, setDaysPerWeek] = useState<string>('7');
  
  // Cost state
  const [energyCost, setEnergyCost] = useState<string>('15');
  const [ledBulbPrice, setLedBulbPrice] = useState<string>('5');
  const [includeBulbPrice, setIncludeBulbPrice] = useState<boolean>(true);
  
  // Results state
  const [annualSavingsKwh, setAnnualSavingsKwh] = useState<number>(0);
  const [annualSavingsMoney, setAnnualSavingsMoney] = useState<number>(0);
  const [totalBulbCost, setTotalBulbCost] = useState<number>(0);
  const [paybackPeriod, setPaybackPeriod] = useState<number>(0);
  const [co2Reduction, setCo2Reduction] = useState<number>(0);
  
  // Constants
  const CO2_PER_KWH = 0.85; // kg of CO2 per kWh (average)
  
  // Currency symbols
  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'C$',
    AUD: 'A$',
    INR: '₹',
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
  }, [
    bulbQuantity, 
    existingWattage, 
    ledWattage, 
    hoursPerDay, 
    daysPerWeek, 
    energyCost, 
    ledBulbPrice, 
    includeBulbPrice
  ]);
  
  // Calculate results
  const calculateResults = () => {
    // Parse input values
    const quantity = parseInt(bulbQuantity) || 0;
    const oldWattage = parseFloat(existingWattage) || 0;
    const newWattage = parseFloat(ledWattage) || 0;
    const hours = parseFloat(hoursPerDay) || 0;
    const days = parseFloat(daysPerWeek) || 0;
    const cost = parseFloat(energyCost) || 0;
    const bulbPrice = parseFloat(ledBulbPrice) || 0;
    
    // Calculate annual usage in kWh
    const hoursPerYear = hours * days * 52.143; // Average weeks in a year
    const oldAnnualKwh = (oldWattage * quantity * hoursPerYear) / 1000;
    const newAnnualKwh = (newWattage * quantity * hoursPerYear) / 1000;
    
    // Calculate annual savings
    const annualKwhSaved = oldAnnualKwh - newAnnualKwh;
    const annualMoneySaved = (annualKwhSaved * cost) / 100; // Convert cents/pence to dollars/pounds
    
    // Calculate total bulb cost
    const totalCost = includeBulbPrice ? quantity * bulbPrice : 0;
    
    // Calculate payback period in years
    const payback = annualMoneySaved > 0 ? totalCost / annualMoneySaved : 0;
    
    // Calculate CO2 reduction in kg
    const co2Saved = annualKwhSaved * CO2_PER_KWH;
    
    setAnnualSavingsKwh(annualKwhSaved);
    setAnnualSavingsMoney(annualMoneySaved);
    setTotalBulbCost(totalCost);
    setPaybackPeriod(payback);
    setCo2Reduction(co2Saved);
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
  
  // Format time (years and months)
  const formatTime = (years: number): string => {
    if (years === 0) return 'Immediate';
    
    const fullYears = Math.floor(years);
    const months = Math.round((years - fullYears) * 12);
    
    if (fullYears === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (months === 0) {
      return `${fullYears} year${fullYears !== 1 ? 's' : ''}`;
    } else {
      return `${fullYears} year${fullYears !== 1 ? 's' : ''} and ${months} month${months !== 1 ? 's' : ''}`;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">LED Savings Calculator</h2>
          
          {/* Currency Selection */}
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
              <option value="CAD">Canadian Dollar (C$)</option>
              <option value="AUD">Australian Dollar (A$)</option>
              <option value="JPY">Japanese Yen (¥)</option>
              <option value="INR">Indian Rupee (₹)</option>
            </select>
          </div>
          
          {/* Bulb Quantity */}
          <div>
            <label htmlFor="bulbQuantity" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Quantity of Bulbs
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="bulbQuantity"
                value={bulbQuantity}
                onChange={(e) => handleNumberInput(e.target.value, setBulbQuantity)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter number of bulbs"
              />
            </div>
          </div>
          
          {/* Wattage Inputs */}
          <div className="grid grid-cols-2 gap-3">
            {/* Existing Bulb Wattage */}
            <div>
              <label htmlFor="existingWattage" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Existing Bulb Wattage
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="existingWattage"
                  value={existingWattage}
                  onChange={(e) => handleNumberInput(e.target.value, setExistingWattage)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter wattage"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">W</span>
                </div>
              </div>
            </div>
            
            {/* LED Bulb Wattage */}
            <div>
              <label htmlFor="ledWattage" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                LED Bulb Wattage
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="ledWattage"
                  value={ledWattage}
                  onChange={(e) => handleNumberInput(e.target.value, setLedWattage)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter wattage"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">W</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Usage Inputs */}
          <div className="grid grid-cols-2 gap-3">
            {/* Hours Per Day */}
            <div>
              <label htmlFor="hoursPerDay" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Hours Used Per Day
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="hoursPerDay"
                  value={hoursPerDay}
                  onChange={(e) => handleNumberInput(e.target.value, setHoursPerDay)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter hours"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">hrs</span>
                </div>
              </div>
            </div>
            
            {/* Days Per Week */}
            <div>
              <label htmlFor="daysPerWeek" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Days Used Per Week
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="daysPerWeek"
                  value={daysPerWeek}
                  onChange={(e) => handleNumberInput(e.target.value, setDaysPerWeek)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter days"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">days</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Energy Cost */}
          <div>
            <label htmlFor="energyCost" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Energy Cost Per kWh
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{currencySymbols[currency] || '$'}</span>
              </div>
              <input
                type="tel"
                id="energyCost"
                value={energyCost}
                onChange={(e) => handleNumberInput(e.target.value, setEnergyCost)} {...decimalInputProps}
                className="w-full pl-8 px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter cost"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">¢/kWh</span>
              </div>
            </div>
          </div>
          
          {/* LED Bulb Price Toggle and Input */}
          <div>
            <div className="flex items-center mb-2">
              <input
                id="includeBulbPrice"
                type="checkbox"
                checked={includeBulbPrice}
                onChange={(e) => setIncludeBulbPrice(e.target.checked)}
                className="h-4 w-4 text-gray-900 dark:text-white focus:ring-blue-500 border-gray-200 dark:border-gray-700 rounded"
              />
              <label htmlFor="includeBulbPrice" className="ml-2 block text-sm text-gray-900 dark:text-white dark:text-gray-300">
                Include LED bulb price in calculations
              </label>
            </div>
            
            {includeBulbPrice && (
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{currencySymbols[currency] || '$'}</span>
                </div>
                <input
                  type="tel"
                  id="ledBulbPrice"
                  value={ledBulbPrice}
                  onChange={(e) => handleNumberInput(e.target.value, setLedBulbPrice)} {...decimalInputProps}
                  className="w-full pl-8 px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter price per LED bulb"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">per bulb</span>
                </div>
              </div>
            )}
          </div>
          
          {/* LED Info - Only visible on desktop */}
          <div className="hidden md:block">
            <div className={buttonClasses}>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">LED Bulb Benefits</h3>
              <ul className={resultLabelClasses}>
                <li><strong>Energy Efficiency:</strong> Use up to 90% less energy than incandescent bulbs</li>
                <li><strong>Longevity:</strong> Last 15-25 times longer than traditional bulbs</li>
                <li><strong>Durability:</strong> More resistant to breakage and vibrations</li>
                <li><strong>Eco-friendly:</strong> Reduce carbon footprint and contain no mercury</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Savings Results</h2>
          
          <div className="grid grid-cols-1 gap-4">
            {/* Annual Energy Savings */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className={resultLabelClasses}>
                Annual Energy Savings
              </div>
              <div className={resultValueClasses}>
                {formatNumber(annualSavingsKwh)} kWh
              </div>
              <div className={resultLabelClasses}>
                {formatNumber(annualSavingsKwh / parseFloat(bulbQuantity))} kWh per bulb
              </div>
            </div>
            
            {/* Annual Cost Savings */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className={resultLabelClasses}>
                Annual Cost Savings
              </div>
              <div className={resultValueClasses}>
                {formatCurrency(annualSavingsMoney)}
              </div>
              <div className={resultLabelClasses}>
                {formatCurrency(annualSavingsMoney / parseFloat(bulbQuantity))} per bulb
              </div>
            </div>
            
            {/* Payback Period */}
            {includeBulbPrice && (
              <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
                <div className={resultLabelClasses}>
                  Payback Period
                </div>
                <div className={resultValueClasses}>
                  {formatTime(paybackPeriod)}
                </div>
                <div className={resultLabelClasses}>
                  Total investment: {formatCurrency(totalBulbCost)}
                </div>
              </div>
            )}
            
            {/* CO2 Reduction */}
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className={resultLabelClasses}>
                Annual CO₂ Reduction
              </div>
              <div className={resultValueClasses}>
                {formatNumber(co2Reduction)} kg
              </div>
              <div className={resultLabelClasses}>
                Equivalent to planting {formatNumber(co2Reduction / 21)} trees
              </div>
            </div>
          </div>
          
          {/* LED Info - Only visible on mobile */}
          <div className="block md:hidden">
            <div className={buttonClasses}>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">LED Bulb Benefits</h3>
              <ul className={resultLabelClasses}>
                <li><strong>Energy Efficiency:</strong> Use up to 90% less energy than incandescent bulbs</li>
                <li><strong>Longevity:</strong> Last 15-25 times longer than traditional bulbs</li>
                <li><strong>Durability:</strong> More resistant to breakage and vibrations</li>
                <li><strong>Eco-friendly:</strong> Reduce carbon footprint and contain no mercury</li>
              </ul>
            </div>
          </div>
          
          {/* Wattage Comparison */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Equivalent Wattage Guide</h3>
            <div className="overflow-x-auto">
              <table className="calculator-table">
                <thead>
                  <tr>
                    <th className="calculator-table-header">Incandescent</th>
                    <th className="calculator-table-header">LED Equivalent</th>
                    <th className="calculator-table-header">Energy Saving</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="calculator-table-cell">40W</td>
                    <td className="calculator-table-cell">5-7W</td>
                    <td className="calculator-table-cell">~85%</td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">60W</td>
                    <td className="calculator-table-cell">8-10W</td>
                    <td className="calculator-table-cell">~85%</td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">75W</td>
                    <td className="calculator-table-cell">11-12W</td>
                    <td className="calculator-table-cell">~85%</td>
                  </tr>
                  <tr>
                    <td className="calculator-table-cell">100W</td>
                    <td className="calculator-table-cell">13-15W</td>
                    <td className="calculator-table-cell">~85%</td>
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

export default LedSavingsCalculator; 