'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { decimalInputProps } from '@/utils/inputUtils';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface WalkingTimeCalculatorProps {
  calculator?: Calculator;
}

type UnitType = 'imperial' | 'metric';
type TerrainType = 'flat' | 'uphill' | 'downhill' | 'sand' | 'snow';
type FitnessLevelType = 'beginner' | 'average' | 'fit' | 'athletic';

const WalkingTimeCalculator: React.FC<WalkingTimeCalculatorProps> = ({ calculator }) => {
  // Unit state
  const [unitSystem, setUnitSystem] = useState<UnitType>('imperial');
  
  // Input state
  const [distance, setDistance] = useState<string>('1');
  const [pace, setPace] = useState<string>('3');
  const [age, setAge] = useState<string>('30');
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevelType>('average');
  const [terrain, setTerrain] = useState<TerrainType>('flat');
  
  // Results state
  const [walkingTime, setWalkingTime] = useState<{minutes: number, seconds: number}>({minutes: 0, seconds: 0});
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const [adjustedPace, setAdjustedPace] = useState<number>(0);
  
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
  
  // Update distance when unit system changes
  useEffect(() => {
    const distanceValue = parseFloat(distance) || 0;
    
    if (unitSystem === 'metric' && distanceValue > 0) {
      // Convert miles to kilometers
      setDistance((distanceValue * 1.60934).toFixed(2));
    } else if (unitSystem === 'imperial' && distanceValue > 0) {
      // Convert kilometers to miles
      setDistance((distanceValue / 1.60934).toFixed(2));
    }
  }, [unitSystem]);
  
  // Calculate walking time
  useEffect(() => {
    const distanceValue = parseFloat(distance) || 0;
    const paceValue = parseFloat(pace) || 0;
    const ageValue = parseFloat(age) || 30;
    
    if (distanceValue > 0 && paceValue > 0) {
      // Base calculation: time = distance / pace
      let timeInHours = distanceValue / paceValue;
      
      // Apply terrain adjustment factors
      let terrainFactor = 1.0;
      switch (terrain) {
        case 'uphill':
          terrainFactor = 1.6; // 60% slower
          break;
        case 'downhill':
          terrainFactor = 0.85; // 15% faster
          break;
        case 'sand':
          terrainFactor = 1.8; // 80% slower
          break;
        case 'snow':
          terrainFactor = 1.7; // 70% slower
          break;
        default:
          terrainFactor = 1.0; // No adjustment for flat terrain
      }
      
      // Apply fitness level adjustment factors
      let fitnessFactor = 1.0;
      switch (fitnessLevel) {
        case 'beginner':
          fitnessFactor = 1.15; // 15% slower
          break;
        case 'fit':
          fitnessFactor = 0.9; // 10% faster
          break;
        case 'athletic':
          fitnessFactor = 0.8; // 20% faster
          break;
        default:
          fitnessFactor = 1.0; // No adjustment for average fitness
      }
      
      // Apply age adjustment factor (simplified model)
      let ageFactor = 1.0;
      if (ageValue < 30) {
        ageFactor = 0.95; // 5% faster for younger people
      } else if (ageValue >= 30 && ageValue < 50) {
        ageFactor = 1.0; // No adjustment for middle-aged
      } else if (ageValue >= 50 && ageValue < 70) {
        ageFactor = 1.1; // 10% slower for older adults
      } else {
        ageFactor = 1.2; // 20% slower for seniors
      }
      
      // Apply all adjustment factors
      timeInHours = timeInHours * terrainFactor * fitnessFactor * ageFactor;
      
      // Calculate adjusted pace
      const adjustedPaceValue = paceValue / (terrainFactor * fitnessFactor * ageFactor);
      setAdjustedPace(adjustedPaceValue);
      
      // Convert to minutes and seconds
      const totalSeconds = Math.round(timeInHours * 3600);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      
      setWalkingTime({ minutes, seconds });
      
      // Calculate calories burned (rough estimate)
      // MET value for walking varies by speed, using simplified model
      let metValue = 3.0; // Default MET for moderate walking
      
      if (paceValue < 2.0) {
        metValue = 2.0; // Slow walking
      } else if (paceValue >= 2.0 && paceValue < 3.0) {
        metValue = 2.5; // Casual walking
      } else if (paceValue >= 3.0 && paceValue < 4.0) {
        metValue = 3.5; // Moderate walking
      } else if (paceValue >= 4.0 && paceValue < 5.0) {
        metValue = 4.3; // Brisk walking
      } else {
        metValue = 5.0; // Very brisk walking / power walking
      }
      
      // Adjust MET for terrain
      metValue *= terrainFactor;
      
      // Calories = MET * weight (kg) * time (hours)
      // Using 70kg as default weight
      const caloriesBurnedValue = Math.round(metValue * 70 * timeInHours);
      setCaloriesBurned(caloriesBurnedValue);
    }
  }, [distance, pace, age, fitnessLevel, terrain]);
  
  // Format time as MM:SS
  const formatTime = (minutes: number, seconds: number): string => {
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Format time in words
  const formatTimeWords = (minutes: number, seconds: number): string => {
    if (minutes === 0) {
      return `${seconds} seconds`;
    } else if (seconds === 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} and ${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
  };
  
  // Chart data for comparison of walking times
  const chartData = {
    labels: ['Casual Walking', 'Brisk Walking', 'Power Walking', 'Jogging', 'Running'],
    datasets: [
      {
        label: 'Time to Cover Distance (minutes)',
        data: [
          // Calculate times for different paces
          Math.round((parseFloat(distance) || 1) / 2.5 * 60), // Casual walking (2.5 mph)
          Math.round((parseFloat(distance) || 1) / 3.5 * 60), // Brisk walking (3.5 mph)
          Math.round((parseFloat(distance) || 1) / 4.5 * 60), // Power walking (4.5 mph)
          Math.round((parseFloat(distance) || 1) / 5.5 * 60), // Jogging (5.5 mph)
          Math.round((parseFloat(distance) || 1) / 6.5 * 60), // Running (6.5 mph)
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
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
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const minutes = Math.floor(context.raw);
            const seconds = Math.round((context.raw - minutes) * 60);
            return `Time: ${formatTime(minutes, seconds)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Minutes'
        }
      }
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">How Long to Walk a Mile Calculator</h2>
          
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
                placeholder={`Enter distance`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unitSystem === 'imperial' ? 'miles' : 'km'}</span>
              </div>
            </div>
          </div>
          
          {/* Walking Pace Input */}
          <div>
            <label htmlFor="pace" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Walking Pace
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="pace"
                value={pace}
                onChange={(e) => handleNumberInput(e.target.value, setPace)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder={`Enter walking pace`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unitSystem === 'imperial' ? 'mph' : 'km/h'}</span>
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Average walking pace: 2.5-4.0 mph (4.0-6.4 km/h)
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
                placeholder="Enter your age"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">years</span>
              </div>
            </div>
          </div>
          
          {/* Fitness Level Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Fitness Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setFitnessLevel('beginner')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  fitnessLevel === 'beginner'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => setFitnessLevel('average')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  fitnessLevel === 'average'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Average
              </button>
              <button
                onClick={() => setFitnessLevel('fit')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  fitnessLevel === 'fit'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Fit
              </button>
              <button
                onClick={() => setFitnessLevel('athletic')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  fitnessLevel === 'athletic'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Athletic
              </button>
            </div>
          </div>
          
          {/* Terrain Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Terrain
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => setTerrain('flat')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  terrain === 'flat'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Flat
              </button>
              <button
                onClick={() => setTerrain('uphill')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  terrain === 'uphill'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Uphill
              </button>
              <button
                onClick={() => setTerrain('downhill')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  terrain === 'downhill'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Downhill
              </button>
              <button
                onClick={() => setTerrain('sand')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  terrain === 'sand'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Sand
              </button>
              <button
                onClick={() => setTerrain('snow')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  terrain === 'snow'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Snow
              </button>
            </div>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          {/* Walking Time Result */}
          <div className="calculator-button">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Estimated Walking Time
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {formatTime(walkingTime.minutes, walkingTime.seconds)}
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              {formatTimeWords(walkingTime.minutes, walkingTime.seconds)} to walk {distance} {unitSystem === 'imperial' ? 'miles' : 'kilometers'}
            </div>
          </div>
          
          {/* Adjusted Pace */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Adjusted Walking Pace
            </div>
            <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
              {adjustedPace.toFixed(1)} {unitSystem === 'imperial' ? 'mph' : 'km/h'}
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Based on your age, fitness level, and terrain
            </div>
          </div>
          
          {/* Calories Burned */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Estimated Calories Burned
            </div>
            <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
              {caloriesBurned} calories
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Based on a 70kg (154lb) person
            </div>
          </div>
          
          {/* Chart */}
          <div className="calculator-card dark:bg-muted p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">
              Comparison of Different Paces
            </h3>
            <Bar options={chartOptions} data={chartData} />
          </div>
          
          {/* Tips */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Walking Tips</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300">
              <li>• Maintain good posture with your head up and shoulders relaxed</li>
              <li>• Take shorter, quicker steps to increase your pace</li>
              <li>• Swing your arms naturally to help maintain balance and rhythm</li>
              <li>• Wear comfortable, supportive footwear</li>
              <li>• Stay hydrated, especially on longer walks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkingTimeCalculator; 