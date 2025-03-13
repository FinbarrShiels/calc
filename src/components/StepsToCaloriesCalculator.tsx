'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { decimalInputProps } from '@/utils/inputUtils';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface StepsToCaloriesCalculatorProps {
  calculator?: Calculator;
}

type UnitType = 'imperial' | 'metric';
type IntensityType = 'casual' | 'average' | 'brisk' | 'power';

const StepsToCaloriesCalculator: React.FC<StepsToCaloriesCalculatorProps> = ({ calculator }) => {
  // Unit state
  const [unitSystem, setUnitSystem] = useState<UnitType>('imperial');
  
  // Input state
  const [steps, setSteps] = useState<string>('10000');
  const [weight, setWeight] = useState<string>(unitSystem === 'imperial' ? '150' : '68');
  const [intensity, setIntensity] = useState<IntensityType>('average');
  const [height, setHeight] = useState<string>(unitSystem === 'imperial' ? '5.6' : '170');
  
  // Results state
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [stepsPerMile, setStepsPerMile] = useState<number>(2000);
  const [timeMinutes, setTimeMinutes] = useState<number>(0);
  
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
  
  // Update weight when unit system changes
  useEffect(() => {
    const weightValue = parseFloat(weight) || 0;
    const heightValue = parseFloat(height) || 0;
    
    if (unitSystem === 'metric' && weightValue > 0) {
      // Convert pounds to kg
      setWeight((weightValue / 2.20462).toFixed(1));
    } else if (unitSystem === 'imperial' && weightValue > 0) {
      // Convert kg to pounds
      setWeight((weightValue * 2.20462).toFixed(1));
    }
    
    // Convert height
    if (unitSystem === 'metric' && heightValue > 0) {
      // Convert feet to cm
      if (heightValue < 10) { // Assuming it's in feet.inches format
        const feet = Math.floor(heightValue);
        const inches = Math.round((heightValue - feet) * 10);
        setHeight((feet * 30.48 + inches * 2.54).toFixed(1));
      } else {
        // Already in imperial but as a decimal, convert to cm
        setHeight((heightValue * 2.54).toFixed(1));
      }
    } else if (unitSystem === 'imperial' && heightValue > 0) {
      // Convert cm to feet
      if (heightValue > 90) { // Assuming it's in cm
        const totalInches = heightValue / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12) / 10;
        setHeight((feet + inches).toFixed(1));
      }
    }
  }, [unitSystem]);
  
  // Calculate calories burned
  useEffect(() => {
    const stepsValue = parseInt(steps) || 0;
    let weightValue = parseFloat(weight) || 0;
    const heightValue = parseFloat(height) || 0;
    
    // Convert weight to kg if in imperial
    if (unitSystem === 'imperial') {
      weightValue = weightValue / 2.20462;
    }
    
    // Calculate steps per mile based on height
    let stepsPerMileValue = 2000; // Default value
    
    // Calculate steps per mile based on height
    if (unitSystem === 'imperial') {
      // Height is in feet.inches format
      if (heightValue < 10) {
        const feet = Math.floor(heightValue);
        const inches = Math.round((heightValue - feet) * 10);
        const heightInInches = feet * 12 + inches;
        stepsPerMileValue = Math.round(63360 / (heightInInches * 0.413));
      }
    } else {
      // Height is in cm
      const heightInInches = heightValue / 2.54;
      stepsPerMileValue = Math.round(63360 / (heightInInches * 0.413));
    }
    
    setStepsPerMile(stepsPerMileValue);
    
    // Calculate distance in miles
    const distanceInMiles = stepsValue / stepsPerMileValue;
    setDistance(distanceInMiles);
    
    // Calculate calories burned based on weight, steps, and intensity
    // MET values for different walking intensities
    let metValue = 3.0; // Default for average walking
    
    switch (intensity) {
      case 'casual':
        metValue = 2.0; // Casual walking
        break;
      case 'average':
        metValue = 3.0; // Average walking
        break;
      case 'brisk':
        metValue = 4.3; // Brisk walking
        break;
      case 'power':
        metValue = 6.0; // Power walking
        break;
    }
    
    // Calculate walking speed based on intensity (mph)
    let speedMph = 3.0; // Default for average walking
    
    switch (intensity) {
      case 'casual':
        speedMph = 2.0; // Casual walking
        break;
      case 'average':
        speedMph = 3.0; // Average walking
        break;
      case 'brisk':
        speedMph = 4.0; // Brisk walking
        break;
      case 'power':
        speedMph = 5.0; // Power walking
        break;
    }
    
    // Calculate time in minutes
    const timeInHours = distanceInMiles / speedMph;
    setTimeMinutes(Math.round(timeInHours * 60));
    
    // Calories = MET * weight (kg) * time (hours)
    const caloriesBurnedValue = Math.round(metValue * weightValue * timeInHours);
    setCaloriesBurned(caloriesBurnedValue);
    
  }, [steps, weight, intensity, height, unitSystem]);
  
  // Format number with commas
  const formatNumber = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Format distance
  const formatDistance = (miles: number): string => {
    if (unitSystem === 'imperial') {
      return `${miles.toFixed(2)} miles`;
    } else {
      return `${(miles * 1.60934).toFixed(2)} km`;
    }
  };
  
  // Format time
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours} hr ${mins} min`;
    } else {
      return `${mins} min`;
    }
  };
  
  // Chart data for calories burned by step count
  const chartData = {
    labels: ['5,000', '10,000', '15,000', '20,000', '25,000'],
    datasets: [
      {
        label: 'Calories Burned',
        data: [
          calculateCaloriesForSteps(5000),
          calculateCaloriesForSteps(10000),
          calculateCaloriesForSteps(15000),
          calculateCaloriesForSteps(20000),
          calculateCaloriesForSteps(25000),
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  // Calculate calories for a given step count (for chart)
  function calculateCaloriesForSteps(stepCount: number): number {
    let weightValue = parseFloat(weight) || 0;
    
    // Convert weight to kg if in imperial
    if (unitSystem === 'imperial') {
      weightValue = weightValue / 2.20462;
    }
    
    // Calculate distance in miles
    const distanceInMiles = stepCount / stepsPerMile;
    
    // Get MET value based on intensity
    let metValue = 3.0;
    switch (intensity) {
      case 'casual': metValue = 2.0; break;
      case 'average': metValue = 3.0; break;
      case 'brisk': metValue = 4.3; break;
      case 'power': metValue = 6.0; break;
    }
    
    // Calculate walking speed based on intensity (mph)
    let speedMph = 3.0;
    switch (intensity) {
      case 'casual': speedMph = 2.0; break;
      case 'average': speedMph = 3.0; break;
      case 'brisk': speedMph = 4.0; break;
      case 'power': speedMph = 5.0; break;
    }
    
    // Calculate time in hours
    const timeInHours = distanceInMiles / speedMph;
    
    // Calculate calories
    return Math.round(metValue * weightValue * timeInHours);
  }
  
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
            return `Calories: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Calories Burned'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Step Count'
        }
      }
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Steps to Calories Calculator</h2>
          
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
                Imperial
              </button>
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
            </div>
          </div>
          
          {/* Steps Input */}
          <div>
            <label htmlFor="steps" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Number of Steps
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="steps"
                value={steps}
                onChange={(e) => handleNumberInput(e.target.value, setSteps)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter number of steps"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">steps</span>
              </div>
            </div>
          </div>
          
          {/* Weight Input */}
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
                placeholder="Enter your weight"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unitSystem === 'imperial' ? 'lbs' : 'kg'}</span>
              </div>
            </div>
          </div>
          
          {/* Height Input */}
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
                placeholder="Enter your height"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unitSystem === 'imperial' ? 'ft' : 'cm'}</span>
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
              {unitSystem === 'imperial' 
                ? 'For imperial, enter as 5.6 for 5 feet 6 inches' 
                : 'Enter your height in centimeters'}
            </div>
          </div>
          
          {/* Walking Intensity Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Walking Intensity
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setIntensity('casual')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  intensity === 'casual'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Casual
              </button>
              <button
                onClick={() => setIntensity('average')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  intensity === 'average'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Average
              </button>
              <button
                onClick={() => setIntensity('brisk')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  intensity === 'brisk'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Brisk
              </button>
              <button
                onClick={() => setIntensity('power')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  intensity === 'power'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Power
              </button>
            </div>
          </div>
          
          {/* Intensity Explanation */}
          <div className="calculator-button">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Walking Intensity Levels</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300">
              <li><strong>Casual:</strong> Strolling, window shopping (2-2.5 mph)</li>
              <li><strong>Average:</strong> Normal walking pace (2.5-3.5 mph)</li>
              <li><strong>Brisk:</strong> Purposeful walking, slightly elevated heart rate (3.5-4.5 mph)</li>
              <li><strong>Power:</strong> Very fast walking, arms swinging (4.5-5.5 mph)</li>
            </ul>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          {/* Calories Burned Result */}
          <div className="calculator-button">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Estimated Calories Burned
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {formatNumber(caloriesBurned)} calories
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              From {formatNumber(parseInt(steps) || 0)} steps at {intensity} intensity
            </div>
          </div>
          
          {/* Distance and Time */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Estimated Distance
                </div>
                <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  {formatDistance(distance)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Estimated Time
                </div>
                <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  {formatTime(timeMinutes)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Steps per Mile */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Your Estimated Steps per Mile
            </div>
            <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
              {formatNumber(stepsPerMile)} steps
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Based on your height ({height} {unitSystem === 'imperial' ? 'ft' : 'cm'})
            </div>
          </div>
          
          {/* Chart */}
          <div className="bg-white dark:bg-gray-900 dark:bg-muted p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">
              Calories Burned by Step Count
            </h3>
            <Bar options={chartOptions} data={chartData} />
          </div>
          
          {/* Weight Loss Equivalent */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Weight Loss Equivalent</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {caloriesBurned} calories is approximately equivalent to {(caloriesBurned / 3500).toFixed(3)} pounds of weight loss (3,500 calories = 1 pound).
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              If you walked this amount every day for a week, you could burn approximately {formatNumber(caloriesBurned * 7)} calories, equivalent to {((caloriesBurned * 7) / 3500).toFixed(2)} pounds.
            </p>
          </div>
          
          {/* Tips */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Tips to Maximize Calorie Burn</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300">
              <li>• Increase your walking speed to burn more calories per step</li>
              <li>• Include hills or stairs in your walking route</li>
              <li>• Use arm movements to engage more muscles</li>
              <li>• Break up your walking into multiple sessions throughout the day</li>
              <li>• Consider adding ankle or wrist weights for increased resistance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsToCaloriesCalculator; 