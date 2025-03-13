'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { decimalInputProps } from '@/utils/inputUtils';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface KilojoulesToCaloriesCalculatorProps {
  calculator?: Calculator;
}

type ConversionType = 'kj-to-cal' | 'cal-to-kj';
type CalorieType = 'small' | 'food';
type PrecisionType = '0' | '1' | '2' | '3' | '4';

const KilojoulesToCaloriesCalculator: React.FC<KilojoulesToCaloriesCalculatorProps> = ({ calculator }) => {
  // Conversion state
  const [conversionType, setConversionType] = useState<ConversionType>('kj-to-cal');
  const [calorieType, setCalorieType] = useState<CalorieType>('food');
  const [precision, setPrecision] = useState<PrecisionType>('2');
  
  // Input state
  const [kilojoules, setKilojoules] = useState<string>('1000');
  const [calories, setCalories] = useState<string>('239');
  
  // Results state
  const [result, setResult] = useState<number>(0);
  
  // Common food items for comparison
  const foodItems = [
    { name: 'Apple (medium)', kj: 315, kcal: 75 },
    { name: 'Banana (medium)', kj: 420, kcal: 100 },
    { name: 'Slice of bread', kj: 265, kcal: 63 },
    { name: 'Egg (large)', kj: 315, kcal: 75 },
    { name: 'Glass of milk (250ml)', kj: 630, kcal: 150 },
    { name: 'Chicken breast (100g)', kj: 630, kcal: 150 },
    { name: 'Rice (100g, cooked)', kj: 540, kcal: 129 },
    { name: 'Chocolate bar (50g)', kj: 1050, kcal: 251 },
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
  
  // Calculate conversion
  useEffect(() => {
    const precisionValue = parseInt(precision);
    
    if (conversionType === 'kj-to-cal') {
      const kilojoulesValue = parseFloat(kilojoules) || 0;
      
      if (calorieType === 'small') {
        // kJ to small calories (1 kJ = 239.006 cal)
        setResult(parseFloat((kilojoulesValue * 239.006).toFixed(precisionValue)));
      } else {
        // kJ to food calories/kilocalories (1 kJ = 0.239006 kcal)
        setResult(parseFloat((kilojoulesValue * 0.239006).toFixed(precisionValue)));
      }
    } else {
      const caloriesValue = parseFloat(calories) || 0;
      
      if (calorieType === 'small') {
        // Small calories to kJ (1 cal = 0.004184 kJ)
        setResult(parseFloat((caloriesValue * 0.004184).toFixed(precisionValue)));
      } else {
        // Food calories/kilocalories to kJ (1 kcal = 4.184 kJ)
        setResult(parseFloat((caloriesValue * 4.184).toFixed(precisionValue)));
      }
    }
  }, [kilojoules, calories, conversionType, calorieType, precision]);
  
  // Format number with commas and specified precision
  const formatNumber = (value: number): string => {
    const precisionValue = parseInt(precision);
    return value.toLocaleString(undefined, {
      minimumFractionDigits: precisionValue,
      maximumFractionDigits: precisionValue
    });
  };
  
  // Chart data for common food items
  const chartData = {
    labels: foodItems.map(item => item.name),
    datasets: [
      {
        label: 'Kilojoules (kJ)',
        data: foodItems.map(item => item.kj),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Kilocalories (kcal)',
        data: foodItems.map(item => item.kcal),
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
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Energy Value'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Food Item'
        }
      }
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Kilojoules to Calories Calculator</h2>
          
          {/* Conversion Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Conversion Type
            </label>
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-1 rounded-lg w-fit">
              <button
                onClick={() => setConversionType('kj-to-cal')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  conversionType === 'kj-to-cal'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                kJ to Calories
              </button>
              <button
                onClick={() => setConversionType('cal-to-kj')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  conversionType === 'cal-to-kj'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Calories to kJ
              </button>
            </div>
          </div>
          
          {/* Calorie Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Calorie Type
            </label>
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-1 rounded-lg w-fit">
              <button
                onClick={() => setCalorieType('food')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  calorieType === 'food'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Food Calories (kcal)
              </button>
              <button
                onClick={() => setCalorieType('small')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  calorieType === 'small'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                Small Calories (cal)
              </button>
            </div>
          </div>
          
          {/* Precision Selection */}
          <div>
            <label htmlFor="precision" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Decimal Precision
            </label>
            <select
              id="precision"
              value={precision}
              onChange={(e) => setPrecision(e.target.value as PrecisionType)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              <option value="0">0 decimal places</option>
              <option value="1">1 decimal place</option>
              <option value="2">2 decimal places</option>
              <option value="3">3 decimal places</option>
              <option value="4">4 decimal places</option>
            </select>
          </div>
          
          {/* Input Value */}
          {conversionType === 'kj-to-cal' ? (
            <div>
              <label htmlFor="kilojoules" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Kilojoules (kJ)
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="kilojoules"
                  value={kilojoules}
                  onChange={(e) => handleNumberInput(e.target.value, setKilojoules)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter kilojoules"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">kJ</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor="calories" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                {calorieType === 'food' ? 'Kilocalories (kcal)' : 'Calories (cal)'}
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="calories"
                  value={calories}
                  onChange={(e) => handleNumberInput(e.target.value, setCalories)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder={`Enter ${calorieType === 'food' ? 'kilocalories' : 'calories'}`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{calorieType === 'food' ? 'kcal' : 'cal'}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Conversion Explanation */}
          <div className="calculator-button">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Conversion Formulas</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300">
              <li>• 1 kilojoule (kJ) = 0.239006 kilocalories (kcal)</li>
              <li>• 1 kilojoule (kJ) = 239.006 small calories (cal)</li>
              <li>• 1 kilocalorie (kcal) = 4.184 kilojoules (kJ)</li>
              <li>• 1 small calorie (cal) = 0.004184 kilojoules (kJ)</li>
            </ul>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              <strong>Note:</strong> Food labels typically use kilocalories (kcal), often labeled simply as "Calories" with a capital C.
            </p>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          {/* Conversion Result */}
          <div className="calculator-button">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {conversionType === 'kj-to-cal' 
                ? `${kilojoules || '0'} kilojoules equals`
                : `${calories || '0'} ${calorieType === 'food' ? 'kilocalories' : 'calories'} equals`}
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {formatNumber(result)}
            </div>
            <div className="mt-1 text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
              {conversionType === 'kj-to-cal' 
                ? `${calorieType === 'food' ? 'kilocalories (kcal)' : 'calories (cal)'}`
                : 'kilojoules (kJ)'}
            </div>
          </div>
          
          {/* Common Conversions */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">
              Common Conversions
            </h3>
            <div className="space-y-2">
              {conversionType === 'kj-to-cal' ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">100 kJ</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                      = {calorieType === 'food' ? '23.9' : '23,901'} {calorieType === 'food' ? 'kcal' : 'cal'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">500 kJ</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                      = {calorieType === 'food' ? '119.5' : '119,503'} {calorieType === 'food' ? 'kcal' : 'cal'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">1,000 kJ</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                      = {calorieType === 'food' ? '239.0' : '239,006'} {calorieType === 'food' ? 'kcal' : 'cal'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">8,700 kJ</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                      = {calorieType === 'food' ? '2,079.4' : '2,079,352'} {calorieType === 'food' ? 'kcal' : 'cal'}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">100 {calorieType === 'food' ? 'kcal' : 'cal'}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                      = {calorieType === 'food' ? '418.4' : '0.42'} kJ
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">500 {calorieType === 'food' ? 'kcal' : 'cal'}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                      = {calorieType === 'food' ? '2,092.0' : '2.09'} kJ
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">1,000 {calorieType === 'food' ? 'kcal' : 'cal'}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                      = {calorieType === 'food' ? '4,184.0' : '4.18'} kJ
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">2,000 {calorieType === 'food' ? 'kcal' : 'cal'}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                      = {calorieType === 'food' ? '8,368.0' : '8.37'} kJ
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Chart */}
          <div className="calculator-card dark:bg-muted p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">
              Energy Content of Common Foods
            </h3>
            <Bar options={chartOptions} data={chartData} height={200} />
          </div>
          
          {/* Daily Energy Requirements */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Average Daily Energy Requirements</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Adult male (moderately active)</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  10,000 kJ (2,390 kcal)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Adult female (moderately active)</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  8,000 kJ (1,912 kcal)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Teenager (14-18 years)</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  11,000 kJ (2,629 kcal)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Child (9-13 years)</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  8,500 kJ (2,032 kcal)
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Note: These are general averages. Individual requirements vary based on age, weight, height, and activity level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KilojoulesToCaloriesCalculator; 