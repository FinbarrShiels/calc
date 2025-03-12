'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

interface ElectricityCostCalculatorProps {
  calculator?: Calculator;
}

interface Appliance {
  id: string;
  name: string;
  powerConsumption: number; // in watts
}

const ElectricityCostCalculator: React.FC<ElectricityCostCalculatorProps> = ({ calculator }) => {
  // Currency options
  const currencyOptions = [
    { value: 'USD', label: 'USD ($)', symbol: '$' },
    { value: 'EUR', label: 'EUR (€)', symbol: '€' },
    { value: 'GBP', label: 'GBP (£)', symbol: '£' },
    { value: 'JPY', label: 'JPY (¥)', symbol: '¥' },
    { value: 'CAD', label: 'CAD (C$)', symbol: 'C$' },
    { value: 'AUD', label: 'AUD (A$)', symbol: 'A$' },
    { value: 'INR', label: 'INR (₹)', symbol: '₹' }
  ];

  // Common appliances with their average power consumption in watts
  const appliances: Appliance[] = [
    { id: 'custom', name: 'Custom Appliance', powerConsumption: 0 },
    { id: 'refrigerator', name: 'Refrigerator', powerConsumption: 150 },
    { id: 'freezer', name: 'Freezer', powerConsumption: 200 },
    { id: 'dishwasher', name: 'Dishwasher', powerConsumption: 1800 },
    { id: 'washing_machine', name: 'Washing Machine', powerConsumption: 500 },
    { id: 'clothes_dryer', name: 'Clothes Dryer', powerConsumption: 3000 },
    { id: 'oven', name: 'Electric Oven', powerConsumption: 2400 },
    { id: 'microwave', name: 'Microwave', powerConsumption: 1100 },
    { id: 'coffee_maker', name: 'Coffee Maker', powerConsumption: 800 },
    { id: 'toaster', name: 'Toaster', powerConsumption: 1100 },
    { id: 'blender', name: 'Blender', powerConsumption: 400 },
    { id: 'tv_led', name: 'LED TV (50")', powerConsumption: 100 },
    { id: 'desktop_computer', name: 'Desktop Computer', powerConsumption: 200 },
    { id: 'laptop', name: 'Laptop', powerConsumption: 60 },
    { id: 'wifi_router', name: 'Wi-Fi Router', powerConsumption: 10 },
    { id: 'game_console', name: 'Game Console', powerConsumption: 150 },
    { id: 'air_conditioner', name: 'Air Conditioner (Window)', powerConsumption: 1000 },
    { id: 'space_heater', name: 'Space Heater', powerConsumption: 1500 },
    { id: 'ceiling_fan', name: 'Ceiling Fan', powerConsumption: 75 },
    { id: 'vacuum_cleaner', name: 'Vacuum Cleaner', powerConsumption: 1400 },
    { id: 'iron', name: 'Iron', powerConsumption: 1200 },
    { id: 'hair_dryer', name: 'Hair Dryer', powerConsumption: 1800 },
    { id: 'light_bulb_led', name: 'LED Light Bulb', powerConsumption: 10 },
    { id: 'light_bulb_incandescent', name: 'Incandescent Light Bulb', powerConsumption: 60 }
  ];

  // Input state
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [selectedApplianceId, setSelectedApplianceId] = useState<string>('refrigerator');
  const [powerConsumption, setPowerConsumption] = useState<string>('150');
  const [powerUnit, setPowerUnit] = useState<string>('watts');
  const [timeUsed, setTimeUsed] = useState<string>('24');
  const [timeUnit, setTimeUnit] = useState<string>('hours');
  const [daysPerWeek, setDaysPerWeek] = useState<string>('7');
  const [electricityRate, setElectricityRate] = useState<string>('0.15');
  
  // Result state
  const [dailyConsumption, setDailyConsumption] = useState<number>(0);
  const [weeklyConsumption, setWeeklyConsumption] = useState<number>(0);
  const [monthlyConsumption, setMonthlyConsumption] = useState<number>(0);
  const [annualConsumption, setAnnualConsumption] = useState<number>(0);
  const [dailyCost, setDailyCost] = useState<number>(0);
  const [weeklyCost, setWeeklyCost] = useState<number>(0);
  const [monthlyCost, setMonthlyCost] = useState<number>(0);
  const [annualCost, setAnnualCost] = useState<number>(0);

  // Update power consumption when appliance selection changes
  useEffect(() => {
    if (selectedApplianceId !== 'custom') {
      const selectedAppliance = appliances.find(a => a.id === selectedApplianceId);
      if (selectedAppliance) {
        setPowerConsumption(selectedAppliance.powerConsumption.toString());
        setPowerUnit('watts');
      }
    }
  }, [selectedApplianceId]);

  // Calculate results when inputs change
  useEffect(() => {
    calculateElectricityCost();
  }, [powerConsumption, powerUnit, timeUsed, timeUnit, daysPerWeek, electricityRate]);

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

  // Handle currency change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };

  // Handle appliance selection change
  const handleApplianceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedApplianceId(e.target.value);
  };

  // Handle power unit change
  const handlePowerUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPowerUnit(e.target.value);
  };

  // Handle time unit change
  const handleTimeUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeUnit(e.target.value);
  };

  // Calculate electricity cost
  const calculateElectricityCost = () => {
    // Parse input values
    const power = parseFloat(powerConsumption) || 0;
    const time = parseFloat(timeUsed) || 0;
    const days = parseFloat(daysPerWeek) || 0;
    const rate = parseFloat(electricityRate) || 0;

    // Convert power to kilowatts if needed
    const powerInKW = powerUnit === 'watts' ? power / 1000 : power;

    // Convert time to hours if needed
    const timeInHours = timeUnit === 'minutes' ? time / 60 : time;

    // Calculate daily consumption in kWh
    const dailyKWh = powerInKW * timeInHours;
    setDailyConsumption(dailyKWh);

    // Calculate weekly consumption in kWh
    const weeklyKWh = dailyKWh * days;
    setWeeklyConsumption(weeklyKWh);

    // Calculate monthly consumption in kWh (average month = 30.44 days)
    const monthlyKWh = (weeklyKWh / 7) * 30.44;
    setMonthlyConsumption(monthlyKWh);

    // Calculate annual consumption in kWh
    const annualKWh = (weeklyKWh / 7) * 365;
    setAnnualConsumption(annualKWh);

    // Calculate costs
    setDailyCost(dailyKWh * rate);
    setWeeklyCost(weeklyKWh * rate);
    setMonthlyCost(monthlyKWh * rate);
    setAnnualCost(annualKWh * rate);
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    const currencySymbol = currencyOptions.find(c => c.value === selectedCurrency)?.symbol || '$';
    return `${currencySymbol}${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  // Format energy
  const formatEnergy = (value: number): string => {
    return `${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} kWh`;
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Electricity Usage</h2>
          
          {/* Currency Selection */}
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Currency
            </label>
            <select
              id="currency"
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              {currencyOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          {/* Appliance Selection */}
          <div>
            <label htmlFor="appliance" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Appliance
            </label>
            <select
              id="appliance"
              value={selectedApplianceId}
              onChange={handleApplianceChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              {appliances.map(appliance => (
                <option key={appliance.id} value={appliance.id}>
                  {appliance.name}{appliance.id !== 'custom' ? ` (${appliance.powerConsumption} W)` : ''}
                </option>
              ))}
            </select>
          </div>
          
          {/* Power Consumption */}
          <div>
            <label htmlFor="powerConsumption" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Power Consumption
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="powerConsumption"
                  value={powerConsumption}
                  onChange={(e) => handleNumberInput(e.target.value, setPowerConsumption, false)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter power consumption"
                  disabled={selectedApplianceId !== 'custom'}
                />
              </div>
              <select
                id="powerUnit"
                value={powerUnit}
                onChange={handlePowerUnitChange}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                disabled={selectedApplianceId !== 'custom'}
              >
                <option value="watts">Watts</option>
                <option value="kilowatts">Kilowatts</option>
              </select>
            </div>
          </div>
          
          {/* Time Used Per Day */}
          <div>
            <label htmlFor="timeUsed" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Time Used Per Day
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="timeUsed"
                  value={timeUsed}
                  onChange={(e) => handleNumberInput(e.target.value, setTimeUsed, false)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter time used per day"
                />
              </div>
              <select
                id="timeUnit"
                value={timeUnit}
                onChange={handleTimeUnitChange}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
              >
                <option value="hours">Hours</option>
                <option value="minutes">Minutes</option>
              </select>
            </div>
          </div>
          
          {/* Days Used Per Week */}
          <div>
            <label htmlFor="daysPerWeek" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Days Used Per Week
            </label>
            <select
              id="daysPerWeek"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              {[1, 2, 3, 4, 5, 6, 7].map(day => (
                <option key={day} value={day}>{day} {day === 1 ? 'day' : 'days'}</option>
              ))}
            </select>
          </div>
          
          {/* Electricity Rate */}
          <div>
            <label htmlFor="electricityRate" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Electricity Rate
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{currencyOptions.find(c => c.value === selectedCurrency)?.symbol || '$'}</span>
              </div>
              <input
                type="tel"
                id="electricityRate"
                value={electricityRate}
                onChange={(e) => handleNumberInput(e.target.value, setElectricityRate, false)} {...decimalInputProps}
                className="w-full pl-8 px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter electricity rate"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">/kWh</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-6 rounded-md">
            <h3 className={calculatorSectionHeaderClasses}>Energy Consumption</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">Daily:</span>
                <span className="font-semibold text-gray-900 dark:text-white dark:text-gray-200">{formatEnergy(dailyConsumption)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">Weekly:</span>
                <span className="font-semibold text-gray-900 dark:text-white dark:text-gray-200">{formatEnergy(weeklyConsumption)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">Monthly:</span>
                <span className="font-semibold text-gray-900 dark:text-white dark:text-gray-200">{formatEnergy(monthlyConsumption)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">Annual:</span>
                <span className="font-semibold text-gray-900 dark:text-white dark:text-gray-200">{formatEnergy(annualConsumption)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-6 rounded-md">
            <h3 className={calculatorSectionHeaderClasses}>Electricity Cost</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">Daily:</span>
                <span className="font-semibold text-gray-900 dark:text-white dark:text-blue-400">{formatCurrency(dailyCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">Weekly:</span>
                <span className="font-semibold text-gray-900 dark:text-white dark:text-blue-400">{formatCurrency(weeklyCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">Monthly:</span>
                <span className="font-semibold text-gray-900 dark:text-white dark:text-blue-400">{formatCurrency(monthlyCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">Annual:</span>
                <span className="font-semibold text-gray-900 dark:text-white dark:text-blue-400">{formatCurrency(annualCost)}</span>
              </div>
            </div>
          </div>
          
          <div className={buttonClasses}>
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Energy Saving Tips</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <li>Use energy-efficient appliances with high Energy Star ratings</li>
              <li>Unplug devices when not in use to avoid phantom power consumption</li>
              <li>Use smart power strips to cut power to devices when they're not in use</li>
              <li>Adjust your thermostat by a few degrees to save on heating and cooling costs</li>
              <li>Replace incandescent bulbs with LED lighting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricityCostCalculator; 