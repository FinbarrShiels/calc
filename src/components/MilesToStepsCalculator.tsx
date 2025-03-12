'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface MilesToStepsCalculatorProps {
  calculator?: Calculator;
}

type UnitType = 'imperial' | 'metric';
type GenderType = 'male' | 'female';
type CalculationMethodType = 'height' | 'stride';

const MilesToStepsCalculator: React.FC<MilesToStepsCalculatorProps> = ({ calculator }) => {
  // Unit state
  const [unitSystem, setUnitSystem] = useState<UnitType>('imperial');
  
  // Calculation method state
  const [calculationMethod, setCalculationMethod] = useState<CalculationMethodType>('height');
  
  // Input state
  const [gender, setGender] = useState<GenderType>('male');
  const [heightFeet, setHeightFeet] = useState<string>('5');
  const [heightInches, setHeightInches] = useState<string>('9');
  const [heightCm, setHeightCm] = useState<string>('175');
  const [strideLength, setStrideLength] = useState<string>(unitSystem === 'imperial' ? '30' : '76');
  const [distance, setDistance] = useState<string>('1');
  
  // Results state
  const [stepsPerMile, setStepsPerMile] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [calculatedStrideLength, setCalculatedStrideLength] = useState<number>(0);
  
  // Handle number input with validation
  const handleNumberInput = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    allowZero: boolean = false
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
  
  // Update height and stride length when unit system changes
  useEffect(() => {
    // Convert height
    if (unitSystem === 'metric') {
      // Convert feet and inches to cm
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      const totalInches = feet * 12 + inches;
      setHeightCm((totalInches * 2.54).toFixed(0));
    } else {
      // Convert cm to feet and inches
      const cm = parseFloat(heightCm) || 0;
      const totalInches = cm / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      setHeightFeet(feet.toString());
      setHeightInches(inches.toString());
    }
    
    // Convert stride length
    const strideLengthValue = parseFloat(strideLength) || 0;
    if (unitSystem === 'metric' && strideLengthValue > 0) {
      // Convert inches to cm
      setStrideLength((strideLengthValue * 2.54).toFixed(0));
    } else if (unitSystem === 'imperial' && strideLengthValue > 0) {
      // Convert cm to inches
      setStrideLength((strideLengthValue / 2.54).toFixed(0));
    }
    
    // Convert distance
    const distanceValue = parseFloat(distance) || 0;
    if (unitSystem === 'metric' && distanceValue > 0) {
      // Convert miles to kilometers
      setDistance((distanceValue * 1.60934).toFixed(2));
    } else if (unitSystem === 'imperial' && distanceValue > 0) {
      // Convert kilometers to miles
      setDistance((distanceValue / 1.60934).toFixed(2));
    }
  }, [unitSystem]);
  
  // Calculate steps based on height or stride length
  useEffect(() => {
    let heightInInches = 0;
    let strideLengthInInches = 0;
    
    // Get height in inches
    if (unitSystem === 'imperial') {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      heightInInches = feet * 12 + inches;
    } else {
      const cm = parseFloat(heightCm) || 0;
      heightInInches = cm / 2.54;
    }
    
    // Get stride length in inches
    if (calculationMethod === 'stride') {
      if (unitSystem === 'imperial') {
        strideLengthInInches = parseFloat(strideLength) || 0;
      } else {
        const cm = parseFloat(strideLength) || 0;
        strideLengthInInches = cm / 2.54;
      }
    } else {
      // Calculate stride length based on height and gender
      // These are approximate formulas based on research
      if (gender === 'male') {
        strideLengthInInches = heightInInches * 0.415;
      } else {
        strideLengthInInches = heightInInches * 0.413;
      }
      
      // Update the calculated stride length display
      if (unitSystem === 'imperial') {
        setCalculatedStrideLength(Math.round(strideLengthInInches));
      } else {
        setCalculatedStrideLength(Math.round(strideLengthInInches * 2.54));
      }
    }
    
    // Calculate steps per mile
    // 63,360 inches in a mile
    if (strideLengthInInches > 0) {
      const stepsPerMileValue = Math.round(63360 / strideLengthInInches);
      setStepsPerMile(stepsPerMileValue);
      
      // Calculate total steps for the given distance
      const distanceValue = parseFloat(distance) || 0;
      let distanceInMiles = distanceValue;
      
      // Convert kilometers to miles if using metric
      if (unitSystem === 'metric') {
        distanceInMiles = distanceValue / 1.60934;
      }
      
      setTotalSteps(Math.round(stepsPerMileValue * distanceInMiles));
    }
  }, [heightFeet, heightInches, heightCm, gender, strideLength, calculationMethod, unitSystem, distance]);
  
  // Format number with commas
  const formatNumber = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Chart data for comparison of steps per mile by height
  const chartData = {
    labels: ['5\'0"', '5\'3"', '5\'6"', '5\'9"', '6\'0"', '6\'3"'],
    datasets: [
      {
        label: 'Men',
        data: [2371, 2286, 2205, 2125, 2052, 1985],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Women',
        data: [2486, 2379, 2272, 2186, 2107, 2034],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
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
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${formatNumber(context.raw)} steps per mile`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 1900,
        title: {
          display: true,
          text: 'Steps per Mile'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Height'
        }
      }
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Miles to Steps Calculator</h2>
          
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
                Miles
              </button>
              <button
                onClick={() => setUnitSystem('metric')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  unitSystem === 'metric'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Kilometers
              </button>
            </div>
          </div>
          
          {/* Distance Input */}
          <div>
            <label htmlFor="distance" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Distance
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="distance"
                value={distance}
                onChange={(e) => handleNumberInput(e.target.value, setDistance)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter distance"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unitSystem === 'imperial' ? 'miles' : 'km'}</span>
              </div>
            </div>
          </div>
          
          {/* Calculation Method Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Calculation Method
            </label>
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-1 rounded-lg w-fit">
              <button
                onClick={() => setCalculationMethod('height')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  calculationMethod === 'height'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Based on Height
              </button>
              <button
                onClick={() => setCalculationMethod('stride')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  calculationMethod === 'stride'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Based on Stride
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
          
          {/* Height Input - Imperial */}
          {calculationMethod === 'height' && unitSystem === 'imperial' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="heightFeet" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  Height (Feet)
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="tel"
                    id="heightFeet"
                    value={heightFeet}
                    onChange={(e) => handleNumberInput(e.target.value, setHeightFeet)} {...decimalInputProps}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                    placeholder="Feet"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">ft</span>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="heightInches" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  Height (Inches)
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="tel"
                    id="heightInches"
                    value={heightInches}
                    onChange={(e) => handleNumberInput(e.target.value, setHeightInches)} {...decimalInputProps}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                    placeholder="Inches"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">in</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Height Input - Metric */}
          {calculationMethod === 'height' && unitSystem === 'metric' && (
            <div>
              <label htmlFor="heightCm" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Height
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="heightCm"
                  value={heightCm}
                  onChange={(e) => handleNumberInput(e.target.value, setHeightCm)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter height"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">cm</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Stride Length Input */}
          {calculationMethod === 'stride' && (
            <div>
              <label htmlFor="strideLength" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Stride Length
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="strideLength"
                  value={strideLength}
                  onChange={(e) => handleNumberInput(e.target.value, setStrideLength)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter stride length"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unitSystem === 'imperial' ? 'in' : 'cm'}</span>
                </div>
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                Average stride length: 24-30 inches (60-76 cm) for men, 22-28 inches (56-71 cm) for women
              </div>
            </div>
          )}
          
          {/* Stride Length Explanation */}
          <div className={buttonClasses}>
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">What is Stride Length?</h3>
            <p className={resultLabelClasses}>
              Stride length is the distance covered from the heel print of one foot to the heel print of the same foot when taking a step. It's typically measured in inches or centimeters.
            </p>
            <p className={resultLabelClasses}>
              Your stride length is influenced by your height, gender, walking speed, and fitness level. Taller individuals and men typically have longer strides.
            </p>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          {/* Total Steps Result */}
          <div className={buttonClasses}>
            <div className={resultLabelClasses}>
              Total Steps for {distance} {unitSystem === 'imperial' ? 'miles' : 'kilometers'}
            </div>
            <div className={resultValueClasses}>
              {formatNumber(totalSteps)}
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Based on your {calculationMethod === 'height' ? 'height and gender' : 'stride length'}
            </div>
          </div>
          
          {/* Steps per Mile */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className={resultLabelClasses}>
              Steps per {unitSystem === 'imperial' ? 'Mile' : 'Kilometer'}
            </div>
            <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
              {formatNumber(unitSystem === 'imperial' ? stepsPerMile : Math.round(stepsPerMile / 1.60934))}
            </div>
          </div>
          
          {/* Stride Length (if calculated from height) */}
          {calculationMethod === 'height' && (
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className={resultLabelClasses}>
                Estimated Stride Length
              </div>
              <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
                {calculatedStrideLength} {unitSystem === 'imperial' ? 'inches' : 'cm'}
              </div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                Based on your height and gender
              </div>
            </div>
          )}
          
          {/* Chart */}
          <div className="calculator-card dark:bg-muted p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">
              Average Steps per Mile by Height
            </h3>
            <Bar options={chartOptions} data={chartData} />
          </div>
          
          {/* Common Step Goals */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Common Step Goals</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={resultLabelClasses}>5,000 steps</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  ≈ {formatNumber(Math.round(5000 / stepsPerMile * 100) / 100)} miles
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={resultLabelClasses}>7,500 steps</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  ≈ {formatNumber(Math.round(7500 / stepsPerMile * 100) / 100)} miles
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={resultLabelClasses}>10,000 steps</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  ≈ {formatNumber(Math.round(10000 / stepsPerMile * 100) / 100)} miles
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={resultLabelClasses}>15,000 steps</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  ≈ {formatNumber(Math.round(15000 / stepsPerMile * 100) / 100)} miles
                </span>
              </div>
            </div>
          </div>
          
          {/* Tips */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Tips for Increasing Your Daily Steps</h3>
            <ul className={resultLabelClasses}>
              <li>• Take the stairs instead of the elevator</li>
              <li>• Park farther away from entrances</li>
              <li>• Walk during phone calls</li>
              <li>• Set hourly reminders to get up and move</li>
              <li>• Take a short walk during lunch breaks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilesToStepsCalculator; 