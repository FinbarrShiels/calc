'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface BMRCalculatorProps {
  calculator?: Calculator;
}

type GenderType = 'male' | 'female';
type FormulaType = 'mifflin' | 'harris' | 'katch';
type UnitType = 'metric' | 'imperial';
type ActivityLevelType = 'sedentary' | 'light' | 'moderate' | 'active' | 'very';

const BMRCalculator: React.FC<BMRCalculatorProps> = ({ calculator }) => {
  // Unit state
  const [unitSystem, setUnitSystem] = useState<UnitType>('metric');
  
  // Personal data state
  const [age, setAge] = useState<string>('30');
  const [gender, setGender] = useState<GenderType>('male');
  const [weight, setWeight] = useState<string>(unitSystem === 'metric' ? '70' : '154');
  const [height, setHeight] = useState<string>(unitSystem === 'metric' ? '175' : '69');
  const [bodyFat, setBodyFat] = useState<string>('15');
  const [formula, setFormula] = useState<FormulaType>('mifflin');
  const [activityLevel, setActivityLevel] = useState<ActivityLevelType>('moderate');
  
  // Results state
  const [bmr, setBmr] = useState<number>(0);
  const [tdee, setTdee] = useState<number>(0);
  
  // Activity level multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very: 1.9
  };
  
  // Activity level labels
  const activityLabels = {
    sedentary: 'Sedentary (little or no exercise)',
    light: 'Lightly active (light exercise 1-3 days/week)',
    moderate: 'Moderately active (moderate exercise 3-5 days/week)',
    active: 'Very active (hard exercise 6-7 days/week)',
    very: 'Extra active (very hard exercise & physical job)'
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
  
  // Update weight and height when unit system changes
  useEffect(() => {
    const weightValue = parseFloat(weight) || 0;
    const heightValue = parseFloat(height) || 0;
    
    if (unitSystem === 'metric') {
      // Convert from imperial to metric
      if (weightValue > 0) {
        // Convert pounds to kg
        setWeight((weightValue / 2.20462).toFixed(1));
      }
      if (heightValue > 0) {
        // Convert inches to cm
        setHeight((heightValue * 2.54).toFixed(1));
      }
    } else {
      // Convert from metric to imperial
      if (weightValue > 0) {
        // Convert kg to pounds
        setWeight((weightValue * 2.20462).toFixed(1));
      }
      if (heightValue > 0) {
        // Convert cm to inches
        setHeight((heightValue / 2.54).toFixed(1));
      }
    }
  }, [unitSystem]);
  
  // Calculate BMR and TDEE
  useEffect(() => {
    const ageValue = parseFloat(age) || 0;
    let weightValue = parseFloat(weight) || 0;
    let heightValue = parseFloat(height) || 0;
    const bodyFatValue = parseFloat(bodyFat) || 0;
    
    // Convert imperial to metric for calculations if needed
    if (unitSystem === 'imperial') {
      // Convert pounds to kg
      weightValue = weightValue / 2.20462;
      // Convert inches to cm
      heightValue = heightValue * 2.54;
    }
    
    let bmrValue = 0;
    
    // Calculate BMR based on selected formula
    switch (formula) {
      case 'mifflin':
        // Mifflin-St Jeor Equation
        if (gender === 'male') {
          bmrValue = (10 * weightValue) + (6.25 * heightValue) - (5 * ageValue) + 5;
        } else {
          bmrValue = (10 * weightValue) + (6.25 * heightValue) - (5 * ageValue) - 161;
        }
        break;
        
      case 'harris':
        // Harris-Benedict Equation (Revised)
        if (gender === 'male') {
          bmrValue = (13.397 * weightValue) + (4.799 * heightValue) - (5.677 * ageValue) + 88.362;
        } else {
          bmrValue = (9.247 * weightValue) + (3.098 * heightValue) - (4.330 * ageValue) + 447.593;
        }
        break;
        
      case 'katch':
        // Katch-McArdle Formula (requires body fat percentage)
        const leanBodyMass = weightValue * (1 - (bodyFatValue / 100));
        bmrValue = 370 + (21.6 * leanBodyMass);
        break;
    }
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdeeValue = bmrValue * activityMultipliers[activityLevel];
    
    // Update state
    setBmr(Math.round(bmrValue));
    setTdee(Math.round(tdeeValue));
  }, [age, gender, weight, height, bodyFat, formula, activityLevel, unitSystem]);
  
  // Chart data for calorie breakdown
  const chartData = {
    labels: ['BMR', 'Activity'],
    datasets: [
      {
        label: 'Calories',
        data: [bmr, tdee - bmr],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Calorie Breakdown',
      },
    },
  };
  
  // Format number with commas
  const formatNumber = (value: number): string => {
    return value.toLocaleString();
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">BMR Calculator</h2>
          
          {/* Unit System Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Unit System
            </label>
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-1 rounded-lg w-fit">
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
            </div>
          </div>
          
          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Gender
            </label>
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-1 rounded-lg w-fit">
              <button
                onClick={() => setGender('male')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  gender === 'male'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setGender('female')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  gender === 'female'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Female
              </button>
            </div>
          </div>
          
          {/* Age Input */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Age
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="age"
                value={age}
                onChange={(e) => handleNumberInput(e.target.value, setAge)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter age"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">years</span>
              </div>
            </div>
          </div>
          
          {/* Weight and Height Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Weight
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="weight"
                  value={weight}
                  onChange={(e) => handleNumberInput(e.target.value, setWeight)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder={`Enter weight`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unitSystem === 'metric' ? 'kg' : 'lb'}</span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Height
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="height"
                  value={height}
                  onChange={(e) => handleNumberInput(e.target.value, setHeight)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder={`Enter height`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unitSystem === 'metric' ? 'cm' : 'in'}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Body Fat Percentage (only shown if Katch-McArdle formula is selected) */}
          {formula === 'katch' && (
            <div>
              <label htmlFor="bodyFat" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Body Fat Percentage
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="bodyFat"
                  value={bodyFat}
                  onChange={(e) => handleNumberInput(e.target.value, setBodyFat)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter body fat percentage"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">%</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Formula Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Calculation Formula
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => setFormula('mifflin')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  formula === 'mifflin'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Mifflin-St Jeor
              </button>
              <button
                onClick={() => setFormula('harris')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  formula === 'harris'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Harris-Benedict
              </button>
              <button
                onClick={() => setFormula('katch')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  formula === 'katch'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Katch-McArdle
              </button>
            </div>
          </div>
          
          {/* Activity Level Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevelType)}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              <option value="sedentary">{activityLabels.sedentary}</option>
              <option value="light">{activityLabels.light}</option>
              <option value="moderate">{activityLabels.moderate}</option>
              <option value="active">{activityLabels.active}</option>
              <option value="very">{activityLabels.very}</option>
            </select>
          </div>
          
          {/* Formula Info - Only visible on desktop */}
          <div className="hidden md:block">
            <div className={buttonClasses}>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">About the Formulas</h3>
              <ul className={resultLabelClasses}>
                <li><strong>Mifflin-St Jeor:</strong> Most accurate for the general population</li>
                <li><strong>Harris-Benedict:</strong> Classic formula, slightly overestimates</li>
                <li><strong>Katch-McArdle:</strong> Best for lean, athletic individuals (requires body fat %)</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          {/* BMR Result */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className={resultLabelClasses}>
              Basal Metabolic Rate (BMR)
            </div>
            <div className={resultValueClasses}>
              {formatNumber(bmr)} calories/day
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Calories your body needs at complete rest
            </div>
          </div>
          
          {/* TDEE Result */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className={resultLabelClasses}>
              Total Daily Energy Expenditure (TDEE)
            </div>
            <div className={resultValueClasses}>
              {formatNumber(tdee)} calories/day
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Calories your body needs with your activity level
            </div>
          </div>
          
          {/* Chart */}
          <div className="calculator-card dark:bg-muted p-4 rounded-md">
            <Bar options={chartOptions} data={chartData} />
          </div>
          
          {/* Weight Goals */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Calorie Targets for Weight Goals</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={resultLabelClasses}>Weight Loss (0.5kg/week):</span>
                <span className="font-medium text-red-600 dark:text-red-400">{formatNumber(tdee - 500)} calories/day</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={resultLabelClasses}>Weight Loss (1kg/week):</span>
                <span className="font-medium text-red-600 dark:text-red-400">{formatNumber(tdee - 1000)} calories/day</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={resultLabelClasses}>Maintenance:</span>
                <span className="font-medium text-gray-900 dark:text-white dark:text-blue-400">{formatNumber(tdee)} calories/day</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={resultLabelClasses}>Weight Gain (0.5kg/week):</span>
                <span className="font-medium text-green-600 dark:text-green-400">{formatNumber(tdee + 500)} calories/day</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Note: A deficit or surplus of approximately 500 calories per day results in about 0.5kg (1lb) change per week.
            </div>
          </div>
          
          {/* Formula Info - Only visible on mobile */}
          <div className="block md:hidden">
            <div className={buttonClasses}>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">About the Formulas</h3>
              <ul className={resultLabelClasses}>
                <li><strong>Mifflin-St Jeor:</strong> Most accurate for the general population</li>
                <li><strong>Harris-Benedict:</strong> Classic formula, slightly overestimates</li>
                <li><strong>Katch-McArdle:</strong> Best for lean, athletic individuals (requires body fat %)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMRCalculator; 