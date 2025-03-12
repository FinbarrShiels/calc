'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

ChartJS.register(ArcElement, Tooltip, Legend);

interface WHRCalculatorProps {
  calculator?: Calculator;
}

type UnitType = 'imperial' | 'metric';
type GenderType = 'male' | 'female';

interface RiskCategory {
  label: string;
  range: [number, number];
  color: string;
  description: string;
}

const WHRCalculator: React.FC<WHRCalculatorProps> = ({ calculator }) => {
  // Unit state
  const [unitSystem, setUnitSystem] = useState<UnitType>('imperial');
  
  // Input state
  const [gender, setGender] = useState<GenderType>('male');
  const [waist, setWaist] = useState<string>(unitSystem === 'imperial' ? '34' : '86');
  const [hip, setHip] = useState<string>(unitSystem === 'imperial' ? '36' : '91');
  
  // Results state
  const [whr, setWhr] = useState<number>(0);
  const [riskCategory, setRiskCategory] = useState<string>('');
  const [riskDescription, setRiskDescription] = useState<string>('');
  const [riskColor, setRiskColor] = useState<string>('');
  
  // Risk categories for men and women
  const maleRiskCategories: RiskCategory[] = [
    { 
      label: 'Low Risk', 
      range: [0, 0.95], 
      color: '#4ade80', 
      description: 'Your WHR indicates a lower risk of obesity-related health issues.'
    },
    { 
      label: 'Moderate Risk', 
      range: [0.96, 1.0], 
      color: '#facc15', 
      description: 'Your WHR indicates a moderate risk of obesity-related health issues.'
    },
    { 
      label: 'High Risk', 
      range: [1.01, 3.0], 
      color: '#ef4444', 
      description: 'Your WHR indicates a higher risk of obesity-related health issues. Consider consulting a healthcare professional.'
    }
  ];
  
  const femaleRiskCategories: RiskCategory[] = [
    { 
      label: 'Low Risk', 
      range: [0, 0.80], 
      color: '#4ade80', 
      description: 'Your WHR indicates a lower risk of obesity-related health issues.'
    },
    { 
      label: 'Moderate Risk', 
      range: [0.81, 0.85], 
      color: '#facc15', 
      description: 'Your WHR indicates a moderate risk of obesity-related health issues.'
    },
    { 
      label: 'High Risk', 
      range: [0.86, 3.0], 
      color: '#ef4444', 
      description: 'Your WHR indicates a higher risk of obesity-related health issues. Consider consulting a healthcare professional.'
    }
  ];
  
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
  
  // Update measurements when unit system changes
  useEffect(() => {
    const waistValue = parseFloat(waist) || 0;
    const hipValue = parseFloat(hip) || 0;
    
    if (unitSystem === 'metric' && waistValue > 0) {
      // Convert inches to cm
      setWaist((waistValue * 2.54).toFixed(1));
    } else if (unitSystem === 'imperial' && waistValue > 0) {
      // Convert cm to inches
      setWaist((waistValue / 2.54).toFixed(1));
    }
    
    if (unitSystem === 'metric' && hipValue > 0) {
      // Convert inches to cm
      setHip((hipValue * 2.54).toFixed(1));
    } else if (unitSystem === 'imperial' && hipValue > 0) {
      // Convert cm to inches
      setHip((hipValue / 2.54).toFixed(1));
    }
  }, [unitSystem]);
  
  // Calculate WHR and risk category
  useEffect(() => {
    const waistValue = parseFloat(waist) || 0;
    const hipValue = parseFloat(hip) || 0;
    
    if (waistValue > 0 && hipValue > 0) {
      const whrValue = waistValue / hipValue;
      setWhr(whrValue);
      
      // Determine risk category
      const categories = gender === 'male' ? maleRiskCategories : femaleRiskCategories;
      
      for (const category of categories) {
        if (whrValue >= category.range[0] && whrValue <= category.range[1]) {
          setRiskCategory(category.label);
          setRiskDescription(category.description);
          setRiskColor(category.color);
          break;
        }
      }
    } else {
      setWhr(0);
      setRiskCategory('');
      setRiskDescription('');
      setRiskColor('');
    }
  }, [waist, hip, gender]);
  
  // Chart data for WHR visualization
  const chartData = {
    labels: ['Waist', 'Hip'],
    datasets: [
      {
        data: [parseFloat(waist) || 0, parseFloat(hip) || 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
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
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw;
            return `${label}: ${value} ${unitSystem === 'imperial' ? 'inches' : 'cm'}`;
          }
        }
      }
    },
  };
  
  // Get ideal waist size based on hip measurement
  const getIdealWaistSize = (): string => {
    const hipValue = parseFloat(hip) || 0;
    if (hipValue <= 0) return 'N/A';
    
    const targetRatio = gender === 'male' ? 0.9 : 0.75;
    const idealWaist = hipValue * targetRatio;
    
    return idealWaist.toFixed(1) + (unitSystem === 'imperial' ? ' inches' : ' cm');
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Waist-to-Hip Ratio Calculator</h2>
          
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
          
          {/* Waist Measurement */}
          <div>
            <label htmlFor="waist" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Waist Circumference
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="waist"
                value={waist}
                onChange={(e) => handleNumberInput(e.target.value, setWaist)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter waist measurement"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unitSystem === 'imperial' ? 'inches' : 'cm'}</span>
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Measure around your natural waistline, at the level of your navel
            </div>
          </div>
          
          {/* Hip Measurement */}
          <div>
            <label htmlFor="hip" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Hip Circumference
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="hip"
                value={hip}
                onChange={(e) => handleNumberInput(e.target.value, setHip)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter hip measurement"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unitSystem === 'imperial' ? 'inches' : 'cm'}</span>
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Measure around the widest part of your buttocks
            </div>
          </div>
          
          {/* WHR Formula */}
          <div className={buttonClasses}>
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">WHR Formula</h3>
            <p className={resultLabelClasses}>
              WHR = Waist Circumference ÷ Hip Circumference
            </p>
            <p className={resultLabelClasses}>
              <strong>Example:</strong> If your waist is 30 inches and your hip is 36 inches, your WHR is 30 ÷ 36 = 0.83
            </p>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          {/* WHR Result */}
          <div className={buttonClasses}>
            <div className={resultLabelClasses}>
              Your Waist-to-Hip Ratio (WHR)
            </div>
            <div className={resultValueClasses}>
              {whr.toFixed(2)}
            </div>
            {riskCategory && (
              <div className="mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: `${riskColor}20`, color: riskColor }}>
                {riskCategory}
              </div>
            )}
          </div>
          
          {/* Risk Assessment */}
          {riskDescription && (
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200 mb-1">
                Health Risk Assessment
              </div>
              <div className={resultLabelClasses}>
                {riskDescription}
              </div>
            </div>
          )}
          
          {/* Ideal Waist Size */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className={resultLabelClasses}>
              Ideal Waist Size for Your Hip Measurement
            </div>
            <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
              {getIdealWaistSize()}
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Based on a healthy WHR of {gender === 'male' ? '0.90' : '0.75'} for {gender === 'male' ? 'men' : 'women'}
            </div>
          </div>
          
          {/* Chart */}
          <div className="calculator-card dark:bg-muted p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">
              Waist vs. Hip Measurement
            </h3>
            <div className="w-48 h-48 mx-auto">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
          
          {/* WHR Categories */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">WHR Categories for {gender === 'male' ? 'Men' : 'Women'}</h3>
            <div className="space-y-2">
              {(gender === 'male' ? maleRiskCategories : femaleRiskCategories).map((category, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                  <span className={resultLabelClasses}>{category.label}: {category.range[0]} to {category.range[1] === 3.0 ? 'above' : category.range[1]}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Health Tips */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Tips to Improve Your WHR</h3>
            <ul className={resultLabelClasses}>
              <li>• Regular cardiovascular exercise</li>
              <li>• Strength training to build muscle</li>
              <li>• Balanced diet rich in fruits, vegetables, and lean proteins</li>
              <li>• Reduce intake of processed foods and added sugars</li>
              <li>• Manage stress levels</li>
              <li>• Get adequate sleep</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHRCalculator; 