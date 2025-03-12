'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

interface BMICalculatorProps {
  calculator?: Calculator;
}

type UnitType = 'metric' | 'imperial';
type GenderType = 'male' | 'female';
type AgeGroupType = 'adult' | 'child';

const BMICalculator: React.FC<BMICalculatorProps> = ({ calculator }) => {
  // Unit state
  const [unitSystem, setUnitSystem] = useState<UnitType>('metric');
  
  // Personal data state
  const [age, setAge] = useState<string>('30');
  const [gender, setGender] = useState<GenderType>('male');
  const [weight, setWeight] = useState<string>(unitSystem === 'metric' ? '70' : '154');
  const [height, setHeight] = useState<string>(unitSystem === 'metric' ? '175' : '69');
  const [ageGroup, setAgeGroup] = useState<AgeGroupType>('adult');
  
  // Results state
  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [healthRisk, setHealthRisk] = useState<string>('');
  const [idealWeightRange, setIdealWeightRange] = useState<{min: number, max: number}>({min: 0, max: 0});
  
  // BMI categories
  const bmiCategories = [
    { range: [0, 18.5], category: 'Underweight', risk: 'Increased risk for some health problems', color: '#3498db' },
    { range: [18.5, 25], category: 'Normal weight', risk: 'Lowest risk for health problems', color: '#2ecc71' },
    { range: [25, 30], category: 'Overweight', risk: 'Increased risk for health problems', color: '#f39c12' },
    { range: [30, 35], category: 'Obesity (Class 1)', risk: 'High risk for health problems', color: '#e74c3c' },
    { range: [35, 40], category: 'Obesity (Class 2)', risk: 'Very high risk for health problems', color: '#c0392b' },
    { range: [40, 100], category: 'Obesity (Class 3)', risk: 'Extremely high risk for health problems', color: '#8e44ad' }
  ];
  
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
  
  // Calculate BMI
  useEffect(() => {
    let weightValue = parseFloat(weight) || 0;
    let heightValue = parseFloat(height) || 0;
    
    // Convert to metric for calculation if needed
    if (unitSystem === 'imperial') {
      // Convert pounds to kg
      weightValue = weightValue / 2.20462;
      // Convert inches to cm
      heightValue = heightValue * 2.54;
    }
    
    // Convert height from cm to meters
    const heightInMeters = heightValue / 100;
    
    // Calculate BMI: weight (kg) / height² (m²)
    const bmiValue = weightValue / (heightInMeters * heightInMeters);
    
    // Set BMI result
    setBmi(isNaN(bmiValue) ? 0 : bmiValue);
    
    // Determine BMI category and health risk
    for (const cat of bmiCategories) {
      if (bmiValue >= cat.range[0] && bmiValue < cat.range[1]) {
        setCategory(cat.category);
        setHealthRisk(cat.risk);
        break;
      }
    }
    
    // Calculate ideal weight range based on BMI 18.5-24.9
    const minIdealWeight = 18.5 * (heightInMeters * heightInMeters);
    const maxIdealWeight = 24.9 * (heightInMeters * heightInMeters);
    
    // Convert back to imperial if needed
    if (unitSystem === 'imperial') {
      setIdealWeightRange({
        min: Math.round(minIdealWeight * 2.20462),
        max: Math.round(maxIdealWeight * 2.20462)
      });
    } else {
      setIdealWeightRange({
        min: Math.round(minIdealWeight),
        max: Math.round(maxIdealWeight)
      });
    }
  }, [weight, height, unitSystem]);
  
  // Get BMI category color
  const getBmiCategoryColor = () => {
    for (const cat of bmiCategories) {
      if (bmi >= cat.range[0] && bmi < cat.range[1]) {
        return cat.color;
      }
    }
    return '#3498db'; // Default color
  };
  
  // Chart data for BMI scale
  const chartData = {
    labels: ['Underweight', 'Normal', 'Overweight', 'Obese I', 'Obese II', 'Obese III'],
    datasets: [
      {
        label: 'BMI Categories',
        data: [16, 20, 27, 32, 37, 42],
        backgroundColor: [
          'rgba(52, 152, 219, 0.2)',
          'rgba(46, 204, 113, 0.2)',
          'rgba(243, 156, 18, 0.2)',
          'rgba(231, 76, 60, 0.2)',
          'rgba(192, 57, 43, 0.2)',
          'rgba(142, 68, 173, 0.2)',
        ],
        borderColor: [
          'rgba(52, 152, 219, 1)',
          'rgba(46, 204, 113, 1)',
          'rgba(243, 156, 18, 1)',
          'rgba(231, 76, 60, 1)',
          'rgba(192, 57, 43, 1)',
          'rgba(142, 68, 173, 1)',
        ],
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: true,
      },
      {
        label: 'Your BMI',
        data: [null, null, null, null, null, null],
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        showLine: false,
      },
    ],
  };
  
  // Update the chart to show the user's BMI
  useEffect(() => {
    if (bmi > 0) {
      // Find the right position to place the BMI point
      let position = 0;
      if (bmi < 18.5) {
        position = 0;
      } else if (bmi < 25) {
        position = 1;
      } else if (bmi < 30) {
        position = 2;
      } else if (bmi < 35) {
        position = 3;
      } else if (bmi < 40) {
        position = 4;
      } else {
        position = 5;
      }
      
      // Update the chart data
      const newData = [null, null, null, null, null, null];
      newData[position] = bmi;
      chartData.datasets[1].data = newData;
    }
  }, [bmi]);
  
  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            if (context.datasetIndex === 1) {
              return `Your BMI: ${bmi.toFixed(1)}`;
            }
            return '';
          }
        }
      }
    },
    scales: {
      y: {
        min: 15,
        max: 45,
        title: {
          display: true,
          text: 'BMI Value'
        }
      },
      x: {
        title: {
          display: true,
          text: 'BMI Categories'
        }
      }
    }
  };
  
  // Format number with 1 decimal place
  const formatBmi = (value: number): string => {
    return value.toFixed(1);
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">BMI Calculator</h2>
          
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
          
          {/* Age Group Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Age Group
            </label>
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-1 rounded-lg w-fit">
              <button
                onClick={() => setAgeGroup('adult')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  ageGroup === 'adult'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Adult
              </button>
              <button
                onClick={() => setAgeGroup('child')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  ageGroup === 'child'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Child/Teen
              </button>
            </div>
          </div>
          
          {/* Age Input (only shown if age group is child) */}
          {ageGroup === 'child' && (
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
          )}
          
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
          
          {/* BMI Formula - Only visible on desktop */}
          <div className="hidden md:block">
            <div className={buttonClasses}>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">BMI Formula</h3>
              <p className={resultLabelClasses}>
                BMI = weight (kg) / height² (m²)
              </p>
              <p className={resultLabelClasses}>
                For imperial units: BMI = (weight (lb) × 703) / height² (in²)
              </p>
            </div>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          {/* BMI Result */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className={resultLabelClasses}>
              Your Body Mass Index (BMI)
            </div>
            <div className="text-2xl font-bold" style={{ color: getBmiCategoryColor() }}>
              {formatBmi(bmi)}
            </div>
            <div className="mt-1 text-sm font-medium" style={{ color: getBmiCategoryColor() }}>
              {category}
            </div>
          </div>
          
          {/* Health Risk */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className={resultLabelClasses}>
              Health Risk Assessment
            </div>
            <div className="text-md font-medium text-gray-900 dark:text-white dark:text-gray-200">
              {healthRisk}
            </div>
          </div>
          
          {/* Ideal Weight Range */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className={resultLabelClasses}>
              Ideal Weight Range (BMI 18.5-24.9)
            </div>
            <div className="text-md font-medium text-green-600 dark:text-green-400">
              {idealWeightRange.min} - {idealWeightRange.max} {unitSystem === 'metric' ? 'kg' : 'lb'}
            </div>
          </div>
          
          {/* Chart */}
          <div className="calculator-card dark:bg-muted p-4 rounded-md">
            <Line options={chartOptions} data={chartData} />
          </div>
          
          {/* BMI Categories - Only visible on mobile */}
          <div className="block md:hidden">
            <div className={buttonClasses}>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">BMI Formula</h3>
              <p className={resultLabelClasses}>
                BMI = weight (kg) / height² (m²)
              </p>
              <p className={resultLabelClasses}>
                For imperial units: BMI = (weight (lb) × 703) / height² (in²)
              </p>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Important Note</h3>
            <p className={resultLabelClasses}>
              BMI is a screening tool, not a diagnostic tool. It has limitations and doesn't account for factors like muscle mass, bone density, or body fat distribution. Consult with a healthcare provider for a comprehensive health assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator; 