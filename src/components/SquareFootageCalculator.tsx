'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface SquareFootageCalculatorProps {
  calculator?: Calculator;
}

type UnitType = 'feet' | 'in' | 'yd' | 'm' | 'cm' | 'mm';
type ShapeType = 'rectangle' | 'square' | 'circle' | 'triangle' | 'trapezoid';

const SquareFootageCalculator: React.FC<SquareFootageCalculatorProps> = ({ calculator }) => {
  // Unit state
  const [unit, setUnit] = useState<UnitType>('feet');
  
  // Shape state
  const [shape, setShape] = useState<ShapeType>('rectangle');
  
  // Border area state
  const [isBorderArea, setIsBorderArea] = useState<boolean>(false);
  
  // Dimension state
  const [width, setWidth] = useState<string>('10');
  const [length, setLength] = useState<string>('12');
  const [radius, setRadius] = useState<string>('5');
  const [height, setHeight] = useState<string>('8');
  const [topWidth, setTopWidth] = useState<string>('8');
  const [bottomWidth, setBottomWidth] = useState<string>('12');
  
  // Results state
  const [area, setArea] = useState<number>(120);
  const [areaUnit, setAreaUnit] = useState<string>('ft²');
  
  // Conversion factors to square feet
  const conversionFactors: Record<UnitType, number> = {
    'feet': 1,
    'in': 1/144,
    'yd': 9,
    'm': 10.7639,
    'cm': 0.00107639,
    'mm': 0.0000107639
  };
  
  // Area unit labels
  const areaUnitLabels: Record<UnitType, string> = {
    'feet': 'ft²',
    'in': 'in²',
    'yd': 'yd²',
    'm': 'm²',
    'cm': 'cm²',
    'mm': 'mm²'
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
  
  // Calculate area based on shape and dimensions
  useEffect(() => {
    let calculatedArea = 0;
    const widthValue = parseFloat(width) || 0;
    const lengthValue = parseFloat(length) || 0;
    const radiusValue = parseFloat(radius) || 0;
    const heightValue = parseFloat(height) || 0;
    const topWidthValue = parseFloat(topWidth) || 0;
    const bottomWidthValue = parseFloat(bottomWidth) || 0;
    
    switch (shape) {
      case 'rectangle':
        calculatedArea = widthValue * lengthValue;
        break;
      case 'square':
        calculatedArea = widthValue * widthValue;
        break;
      case 'circle':
        calculatedArea = Math.PI * radiusValue * radiusValue;
        break;
      case 'triangle':
        calculatedArea = (widthValue * heightValue) / 2;
        break;
      case 'trapezoid':
        calculatedArea = ((topWidthValue + bottomWidthValue) / 2) * heightValue;
        break;
    }
    
    // Convert to square feet for internal storage
    const areaInSqFt = calculatedArea * conversionFactors[unit];
    
    // If it's a border area, calculate the inner area and subtract
    if (isBorderArea) {
      let innerArea = 0;
      const borderWidth = 1; // Default border width of 1 unit
      
      switch (shape) {
        case 'rectangle':
          const innerWidth = Math.max(0, widthValue - 2 * borderWidth);
          const innerLength = Math.max(0, lengthValue - 2 * borderWidth);
          innerArea = innerWidth * innerLength * conversionFactors[unit];
          break;
        case 'square':
          const innerSide = Math.max(0, widthValue - 2 * borderWidth);
          innerArea = innerSide * innerSide * conversionFactors[unit];
          break;
        case 'circle':
          const innerRadius = Math.max(0, radiusValue - borderWidth);
          innerArea = Math.PI * innerRadius * innerRadius * conversionFactors[unit];
          break;
        // For triangle and trapezoid, we'll use a simplified approach
        case 'triangle':
        case 'trapezoid':
          // Approximate by reducing the area proportionally
          innerArea = areaInSqFt * 0.8; // Reduce by 20% as an approximation
          break;
      }
      
      setArea(areaInSqFt - innerArea);
    } else {
      setArea(areaInSqFt);
    }
    
    // Set the area unit label
    setAreaUnit(areaUnitLabels[unit]);
  }, [shape, width, length, radius, height, topWidth, bottomWidth, unit, isBorderArea, conversionFactors, areaUnitLabels]);
  
  // Format number with 2 decimal places
  const formatNumber = (value: number): string => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  // Get the appropriate input fields based on the selected shape
  const renderShapeInputs = () => {
    switch (shape) {
      case 'rectangle':
        return (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="length" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Length
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="length"
                  value={length}
                  onChange={(e) => handleNumberInput(e.target.value, setLength)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter length"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unit}</span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="width" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Width
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="width"
                  value={width}
                  onChange={(e) => handleNumberInput(e.target.value, setWidth)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter width"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unit}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'square':
        return (
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Side Length
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="width"
                value={width}
                onChange={(e) => handleNumberInput(e.target.value, setWidth)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter side length"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unit}</span>
              </div>
            </div>
          </div>
        );
      case 'circle':
        return (
          <div>
            <label htmlFor="radius" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Radius
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="tel"
                id="radius"
                value={radius}
                onChange={(e) => handleNumberInput(e.target.value, setRadius)} {...decimalInputProps}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                placeholder="Enter radius"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unit}</span>
              </div>
            </div>
          </div>
        );
      case 'triangle':
        return (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="width" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Base
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="width"
                  value={width}
                  onChange={(e) => handleNumberInput(e.target.value, setWidth)} {...decimalInputProps}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                  placeholder="Enter base"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unit}</span>
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
                  placeholder="Enter height"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unit}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'trapezoid':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="topWidth" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  Top Width
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="tel"
                    id="topWidth"
                    value={topWidth}
                    onChange={(e) => handleNumberInput(e.target.value, setTopWidth)} {...decimalInputProps}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                    placeholder="Enter top width"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unit}</span>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="bottomWidth" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  Bottom Width
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="tel"
                    id="bottomWidth"
                    value={bottomWidth}
                    onChange={(e) => handleNumberInput(e.target.value, setBottomWidth)} {...decimalInputProps}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                    placeholder="Enter bottom width"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unit}</span>
                  </div>
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
                  placeholder="Enter height"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">{unit}</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Render shape diagram
  const renderShapeDiagram = () => {
    switch (shape) {
      case 'rectangle':
        return (
          <div className="w-full h-48 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 200 150" className="max-w-xs mx-auto">
              {/* Rectangle background for border area */}
              {isBorderArea && (
                <rect x="40" y="20" width="120" height="80" fill="#e6f0fd" stroke="#3b82f6" strokeWidth="2" />
              )}
              
              {/* Rectangle */}
              <rect x="40" y="20" width="120" height="80" fill={isBorderArea ? "none" : "none"} stroke="#3b82f6" strokeWidth="2" />
              
              {/* Border area visualization */}
              {isBorderArea && (
                <>
                  <rect x="50" y="30" width="100" height="60" fill="white" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
                  <text x="100" y="60" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Border Area</text>
                </>
              )}
              
              {/* Length arrow and label */}
              <line x1="40" y1="110" x2="160" y2="110" stroke="#3b82f6" strokeWidth="1" />
              <polygon points="40,110 45,105 45,115" fill="#3b82f6" />
              <polygon points="160,110 155,105 155,115" fill="#3b82f6" />
              <text x="100" y="125" textAnchor="middle" fill="#6b7280" fontSize="14">length ({unit})</text>
              
              {/* Width arrow and label */}
              <line x1="170" y1="20" x2="170" y2="100" stroke="#3b82f6" strokeWidth="1" />
              <polygon points="170,20 165,25 175,25" fill="#3b82f6" />
              <polygon points="170,100 165,95 175,95" fill="#3b82f6" />
              <text x="185" y="60" textAnchor="middle" fill="#6b7280" fontSize="14" transform="rotate(90, 185, 60)">width ({unit})</text>
              
              {/* Border width label */}
              {isBorderArea && (
                <>
                  <line x1="40" y1="30" x2="50" y2="30" stroke="#3b82f6" strokeWidth="1" />
                  <text x="30" y="30" textAnchor="end" fill="#6b7280" fontSize="10">border</text>
                </>
              )}
            </svg>
          </div>
        );
      case 'square':
        return (
          <div className="w-full h-48 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 200 150" className="max-w-xs mx-auto">
              {/* Square background for border area */}
              {isBorderArea && (
                <rect x="50" y="20" width="80" height="80" fill="#e6f0fd" stroke="#3b82f6" strokeWidth="2" />
              )}
              
              {/* Square */}
              <rect x="50" y="20" width="80" height="80" fill={isBorderArea ? "none" : "none"} stroke="#3b82f6" strokeWidth="2" />
              
              {/* Border area visualization */}
              {isBorderArea && (
                <>
                  <rect x="60" y="30" width="60" height="60" fill="white" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
                  <text x="90" y="60" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Border Area</text>
                </>
              )}
              
              {/* Side arrow and label */}
              <line x1="50" y1="110" x2="130" y2="110" stroke="#3b82f6" strokeWidth="1" />
              <polygon points="50,110 55,105 55,115" fill="#3b82f6" />
              <polygon points="130,110 125,105 125,115" fill="#3b82f6" />
              <text x="90" y="125" textAnchor="middle" fill="#6b7280" fontSize="14">side ({unit})</text>
              
              {/* Border width label */}
              {isBorderArea && (
                <>
                  <line x1="50" y1="30" x2="60" y2="30" stroke="#3b82f6" strokeWidth="1" />
                  <text x="40" y="30" textAnchor="end" fill="#6b7280" fontSize="10">border</text>
                </>
              )}
            </svg>
          </div>
        );
      case 'circle':
        return (
          <div className="w-full h-48 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 200 150" className="max-w-xs mx-auto">
              {/* Circle background for border area */}
              {isBorderArea && (
                <circle cx="100" cy="60" r="40" fill="#e6f0fd" stroke="#3b82f6" strokeWidth="2" />
              )}
              
              {/* Circle */}
              <circle cx="100" cy="60" r="40" fill={isBorderArea ? "none" : "none"} stroke="#3b82f6" strokeWidth="2" />
              
              {/* Border area visualization */}
              {isBorderArea && (
                <>
                  <circle cx="100" cy="60" r="30" fill="white" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
                  <text x="100" y="60" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Border Area</text>
                </>
              )}
              
              {/* Radius line and label */}
              <line x1="100" y1="60" x2="140" y2="60" stroke="#3b82f6" strokeWidth="1" />
              <polygon points="140,60 135,55 135,65" fill="#3b82f6" />
              <text x="120" y="50" textAnchor="middle" fill="#6b7280" fontSize="14">radius ({unit})</text>
              
              {/* Center dot */}
              <circle cx="100" cy="60" r="2" fill="#3b82f6" />
              
              {/* Border width label */}
              {isBorderArea && (
                <>
                  <line x1="100" y1="30" x2="100" y2="20" stroke="#3b82f6" strokeWidth="1" />
                  <text x="100" y="15" textAnchor="middle" fill="#6b7280" fontSize="10">border</text>
                </>
              )}
            </svg>
          </div>
        );
      case 'triangle':
        return (
          <div className="w-full h-48 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 200 150" className="max-w-xs mx-auto">
              {/* Triangle background for border area */}
              {isBorderArea && (
                <polygon points="40,100 160,100 100,20" fill="#e6f0fd" stroke="#3b82f6" strokeWidth="2" />
              )}
              
              {/* Triangle */}
              <polygon points="40,100 160,100 100,20" fill={isBorderArea ? "none" : "none"} stroke="#3b82f6" strokeWidth="2" />
              
              {/* Border area visualization */}
              {isBorderArea && (
                <>
                  <polygon points="50,90 150,90 100,30" fill="white" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
                  <text x="100" y="70" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Border Area</text>
                </>
              )}
              
              {/* Base arrow and label */}
              <line x1="40" y1="110" x2="160" y2="110" stroke="#3b82f6" strokeWidth="1" />
              <polygon points="40,110 45,105 45,115" fill="#3b82f6" />
              <polygon points="160,110 155,105 155,115" fill="#3b82f6" />
              <text x="100" y="125" textAnchor="middle" fill="#6b7280" fontSize="14">base ({unit})</text>
              
              {/* Height line and label */}
              <line x1="100" y1="20" x2="100" y2="100" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
              <text x="110" y="60" textAnchor="start" fill="#6b7280" fontSize="14">height ({unit})</text>
              
              {/* Border width label */}
              {isBorderArea && (
                <>
                  <line x1="45" y1="100" x2="50" y2="90" stroke="#3b82f6" strokeWidth="1" />
                  <text x="40" y="85" textAnchor="end" fill="#6b7280" fontSize="10">border</text>
                </>
              )}
            </svg>
          </div>
        );
      case 'trapezoid':
        return (
          <div className="w-full h-48 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 200 150" className="max-w-xs mx-auto">
              {/* Trapezoid background for border area */}
              {isBorderArea && (
                <polygon points="60,20 140,20 160,100 40,100" fill="#e6f0fd" stroke="#3b82f6" strokeWidth="2" />
              )}
              
              {/* Trapezoid */}
              <polygon points="60,20 140,20 160,100 40,100" fill={isBorderArea ? "none" : "none"} stroke="#3b82f6" strokeWidth="2" />
              
              {/* Border area visualization */}
              {isBorderArea && (
                <>
                  <polygon points="70,30 130,30 145,90 55,90" fill="white" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
                  <text x="100" y="60" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Border Area</text>
                </>
              )}
              
              {/* Top width arrow and label */}
              <line x1="60" y1="15" x2="140" y2="15" stroke="#3b82f6" strokeWidth="1" />
              <polygon points="60,15 65,10 65,20" fill="#3b82f6" />
              <polygon points="140,15 135,10 135,20" fill="#3b82f6" />
              <text x="100" y="10" textAnchor="middle" fill="#6b7280" fontSize="14">top ({unit})</text>
              
              {/* Bottom width arrow and label */}
              <line x1="40" y1="110" x2="160" y2="110" stroke="#3b82f6" strokeWidth="1" />
              <polygon points="40,110 45,105 45,115" fill="#3b82f6" />
              <polygon points="160,110 155,105 155,115" fill="#3b82f6" />
              <text x="100" y="125" textAnchor="middle" fill="#6b7280" fontSize="14">bottom ({unit})</text>
              
              {/* Height line and label */}
              <line x1="170" y1="20" x2="170" y2="100" stroke="#3b82f6" strokeWidth="1" />
              <polygon points="170,20 165,25 175,25" fill="#3b82f6" />
              <polygon points="170,100 165,95 175,95" fill="#3b82f6" />
              <text x="185" y="60" textAnchor="middle" fill="#6b7280" fontSize="14" transform="rotate(90, 185, 60)">height ({unit})</text>
              
              {/* Border width label */}
              {isBorderArea && (
                <>
                  <line x1="60" y1="30" x2="70" y2="30" stroke="#3b82f6" strokeWidth="1" />
                  <text x="50" y="30" textAnchor="end" fill="#6b7280" fontSize="10">border</text>
                </>
              )}
            </svg>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Square Footage Calculator</h2>
          
        {/* Unit choice */}
        <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Unit choice
            </label>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setUnit('feet')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                unit === 'feet'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
              }`}
            >
              feet
            </button>
            <button
              onClick={() => setUnit('in')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                unit === 'in'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
              }`}
            >
              in
            </button>
            <button
              onClick={() => setUnit('yd')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                unit === 'yd'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
              }`}
            >
              yd
            </button>
            <button
              onClick={() => setUnit('m')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                unit === 'm'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
              }`}
            >
              m
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                unit === 'cm'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
              }`}
            >
              cm
            </button>
            <button
              onClick={() => setUnit('mm')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                unit === 'mm'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
              }`}
            >
              mm
            </button>
          </div>
        </div>
        
        {/* Shape selection */}
        <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Shape of room or area
            </label>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setShape('rectangle')}
              className={`w-12 h-12 flex items-center justify-center rounded-md transition-colors ${
                shape === 'rectangle'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
              }`}
            >
              <div className="w-8 h-6 border-2 border-current"></div>
            </button>
            <button
              onClick={() => setShape('square')}
              className={`w-12 h-12 flex items-center justify-center rounded-md transition-colors ${
                shape === 'square'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
              }`}
            >
              <div className="w-6 h-6 border-2 border-current"></div>
            </button>
            <button
              onClick={() => setShape('circle')}
              className={`w-12 h-12 flex items-center justify-center rounded-md transition-colors ${
                shape === 'circle'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
              }`}
            >
              <div className="w-6 h-6 rounded-full border-2 border-current"></div>
            </button>
            <button
              onClick={() => setShape('triangle')}
              className={`w-12 h-12 flex items-center justify-center rounded-md transition-colors ${
                shape === 'triangle'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
              }`}
            >
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-transparent border-b-current"></div>
            </button>
            <button
              onClick={() => setShape('trapezoid')}
              className={`w-12 h-12 flex items-center justify-center rounded-md transition-colors ${
                shape === 'trapezoid'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
              }`}
            >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4,18 L20,18 L16,6 L8,6 Z" />
                </svg>
            </button>
          </div>
        </div>
        
        {/* Border area toggle */}
        <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Is it a border area?
            </label>
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-1 rounded-lg w-fit">
            <button
              onClick={() => setIsBorderArea(false)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !isBorderArea
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
              }`}
            >
              no
            </button>
            <button
              onClick={() => setIsBorderArea(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isBorderArea
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-100 dark:bg-gray-850/80'
              }`}
            >
              yes
            </button>
          </div>
        </div>
        
          {/* Dimension inputs */}
          <div className="space-y-4">
            {renderShapeInputs()}
          </div>
          
          {/* Shape Info - Only visible on desktop */}
          <div className="hidden md:block">
            <div className="calculator-button">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Shape Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Different shapes require different measurements:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-300">
                <li><strong>Rectangle:</strong> Length × Width</li>
                <li><strong>Square:</strong> Side × Side</li>
                <li><strong>Circle:</strong> π × Radius²</li>
                <li><strong>Triangle:</strong> (Base × Height) ÷ 2</li>
                <li><strong>Trapezoid:</strong> ((Top Width + Bottom Width) ÷ 2) × Height</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          {/* Shape diagram */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md overflow-hidden">
            {renderShapeDiagram()}
          </div>
          
          {/* Results */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Area
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {formatNumber(area)} {areaUnit}
            </div>
            {isBorderArea && (
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                This is the area of just the border region (highlighted in blue).
              </div>
            )}
          </div>
          
          {/* Shape Info - Only visible on mobile */}
          <div className="block md:hidden">
            <div className="calculator-button">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Shape Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Different shapes require different measurements:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-300">
                <li><strong>Rectangle:</strong> Length × Width</li>
                <li><strong>Square:</strong> Side × Side</li>
                <li><strong>Circle:</strong> π × Radius²</li>
                <li><strong>Triangle:</strong> (Base × Height) ÷ 2</li>
                <li><strong>Trapezoid:</strong> ((Top Width + Bottom Width) ÷ 2) × Height</li>
              </ul>
            </div>
          </div>
          
          {/* Usage Tips */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Common Uses</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300">
              <li><strong>Flooring:</strong> Calculate carpet, tile, or hardwood needed</li>
              <li><strong>Painting:</strong> Determine paint required for walls or ceilings</li>
              <li><strong>Landscaping:</strong> Measure areas for sod, mulch, or ground coverings</li>
              <li><strong>Construction:</strong> Estimate materials for roofing or concrete</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquareFootageCalculator; 