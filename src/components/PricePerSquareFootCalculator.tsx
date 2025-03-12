'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator } from '@/data/calculators';
import { Chart } from 'chart.js/auto';
import { numericInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

interface PricePerSquareFootCalculatorProps {
  calculator?: Calculator;
}

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

interface PropertyComparison {
  name: string;
  price: number;
  squareFootage: number;
  pricePerSquareFoot: number;
  color: string;
}

const PricePerSquareFootCalculator: React.FC<PricePerSquareFootCalculatorProps> = ({ calculator }) => {
  // Currency options
  const currencyOptions: CurrencyOption[] = [
    { value: 'USD', label: 'USD ($)', symbol: '$' },
    { value: 'EUR', label: 'EUR (€)', symbol: '€' },
    { value: 'GBP', label: 'GBP (£)', symbol: '£' },
    { value: 'JPY', label: 'JPY (¥)', symbol: '¥' },
    { value: 'INR', label: 'INR (₹)', symbol: '₹' }
  ];
  
  // Color options for property comparisons
  const colorOptions = [
    '#3b82f6', // blue-500
    '#f97316', // orange-500
    '#10b981', // emerald-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
  ];
  
  // Input state
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [propertyPrice, setPropertyPrice] = useState<number>(350000);
  const [squareFootage, setSquareFootage] = useState<number>(2000);
  const [includeExterior, setIncludeExterior] = useState<boolean>(false);
  const [exteriorFootage, setExteriorFootage] = useState<number>(500);
  
  // Result state
  const [pricePerSquareFoot, setPricePerSquareFoot] = useState<number>(0);
  const [totalSquareFootage, setTotalSquareFootage] = useState<number>(0);
  
  // Comparison state
  const [propertyName, setPropertyName] = useState<string>('Property 1');
  const [comparisons, setComparisons] = useState<PropertyComparison[]>([]);
  
  // Chart ref
  const comparisonChartRef = useRef<HTMLCanvasElement>(null);
  const comparisonChartInstance = useRef<Chart | null>(null);
  
  // Get currency symbol
  const getCurrencySymbol = (): string => {
    const currency = currencyOptions.find(c => c.value === selectedCurrency);
    return currency ? currency.symbol : '$';
  };
  
  // Handle currency change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };
  
  // Handle include exterior change
  const handleIncludeExteriorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIncludeExterior(e.target.value === 'true');
  };
  
  // Calculate price per square foot
  useEffect(() => {
    calculatePricePerSquareFoot();
  }, [propertyPrice, squareFootage, includeExterior, exteriorFootage]);
  
  // Update chart when comparisons change
  useEffect(() => {
    if (comparisons.length > 0) {
      createComparisonChart();
    }
    
    return () => {
      if (comparisonChartInstance.current) {
        comparisonChartInstance.current.destroy();
      }
    };
  }, [comparisons, selectedCurrency]);
  
  // Handle window resize for chart responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (comparisonChartInstance.current) {
        comparisonChartInstance.current.resize();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const calculatePricePerSquareFoot = () => {
    // Calculate total square footage
    const total = includeExterior ? squareFootage + exteriorFootage : squareFootage;
    
    // Calculate price per square foot
    const ppsf = total > 0 ? propertyPrice / total : 0;
    
    // Update state
    setTotalSquareFootage(total);
    setPricePerSquareFoot(ppsf);
  };
  
  const addPropertyComparison = () => {
    if (propertyName.trim() === '') return;
    
    // Create new comparison
    const newComparison: PropertyComparison = {
      name: propertyName,
      price: propertyPrice,
      squareFootage: totalSquareFootage,
      pricePerSquareFoot,
      color: colorOptions[comparisons.length % colorOptions.length]
    };
    
    // Add to comparisons
    setComparisons([...comparisons, newComparison]);
    
    // Reset property name for next entry
    setPropertyName(`Property ${comparisons.length + 2}`);
  };
  
  const removePropertyComparison = (index: number) => {
    const updatedComparisons = [...comparisons];
    updatedComparisons.splice(index, 1);
    setComparisons(updatedComparisons);
  };
  
  const createComparisonChart = () => {
    if (!comparisonChartRef.current) return;
    
    const ctx = comparisonChartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (comparisonChartInstance.current) {
      comparisonChartInstance.current.destroy();
    }
    
    const labels = comparisons.map(comp => comp.name);
    const priceData = comparisons.map(comp => comp.price);
    const squareFootageData = comparisons.map(comp => comp.squareFootage);
    const pricePerSquareFootData = comparisons.map(comp => comp.pricePerSquareFoot);
    const backgroundColors = comparisons.map(comp => comp.color);
    
    const currencySymbol = getCurrencySymbol();
    
    comparisonChartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Price per Square Foot',
            data: pricePerSquareFootData,
            backgroundColor: backgroundColors.map(color => `${color}99`), // Add transparency
            borderColor: backgroundColors,
            borderWidth: 1,
            yAxisID: 'y'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: `Price per Square Foot (${currencySymbol})`,
              color: 'rgba(255, 255, 255, 0.7)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              callback: function(value) {
                return currencySymbol + value.toLocaleString();
              }
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.raw as number;
                return `Price per sq ft: ${currencySymbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
              },
              afterLabel: function(context) {
                const index = context.dataIndex;
                const property = comparisons[index];
                return [
                  `Total price: ${currencySymbol}${property.price.toLocaleString()}`,
                  `Square footage: ${property.squareFootage.toLocaleString()} sq ft`
                ];
              }
            }
          }
        }
      }
    });
  };
  
  // Format currency
  const formatCurrency = (value: number): string => {
    const symbol = getCurrencySymbol();
    return `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 p-6">
        {/* Left Box - Inputs */}
        <div className="calculator-card-alt p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className={calculatorSectionHeaderClasses}>Price Per Square Foot Calculator</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-300 mb-1">
                Currency
              </label>
              <select
                id="currency"
                className={inputClasses}
                value={selectedCurrency}
                onChange={handleCurrencyChange}
              >
                {currencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="propertyPrice" className="block text-sm font-medium text-gray-300 mb-1">
                Property Price
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{getCurrencySymbol()}</span>
                <input
                  type="tel"
                  id="propertyPrice"
                  className={inputClasses}
                  value={propertyPrice} {...numericInputProps}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-300 mb-1">
                Interior Square Footage
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="squareFootage"
                  className={inputClasses}
                  value={squareFootage} {...numericInputProps}
                  onChange={(e) => setSquareFootage(Number(e.target.value))}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">sq ft</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="includeExterior" className="block text-sm font-medium text-gray-300 mb-1">
                Include Exterior Space
              </label>
              <select
                id="includeExterior"
                className={inputClasses}
                value={includeExterior.toString()}
                onChange={handleIncludeExteriorChange}
              >
                <option value="false">No (Interior Only)</option>
                <option value="true">Yes (Interior + Exterior)</option>
              </select>
            </div>
            
            {includeExterior && (
              <div>
                <label htmlFor="exteriorFootage" className="block text-sm font-medium text-gray-300 mb-1">
                  Exterior Square Footage
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="exteriorFootage"
                    className={inputClasses}
                    value={exteriorFootage} {...numericInputProps}
                    onChange={(e) => setExteriorFootage(Number(e.target.value))}
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">sq ft</span>
                </div>
              </div>
            )}
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <h3 className="text-md font-medium text-gray-300 mb-3">Add Property for Comparison</h3>
              
              <div className="space-y-3">
                <div>
                  <label htmlFor="propertyName" className="block text-sm font-medium text-gray-300 mb-1">
                    Property Name
                  </label>
                  <input
                    type="tel"
                    id="propertyName"
                    className={inputClasses}
                    value={propertyName} {...numericInputProps}
                    onChange={(e) => setPropertyName(e.target.value)}
                  />
                </div>
                
                <button
                  className={inputClasses}
                  onClick={addPropertyComparison}
                >
                  Add Property to Comparison
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Box - Results */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className={calculatorSectionHeaderClasses}>Results</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Price Per Square Foot</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">{formatCurrency(pricePerSquareFoot)}</div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Total Square Footage</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">{totalSquareFootage.toLocaleString()} sq ft</div>
              {includeExterior && (
                <div className="text-xs text-gray-400 mt-1">
                  Interior: {squareFootage.toLocaleString()} sq ft, Exterior: {exteriorFootage.toLocaleString()} sq ft
                </div>
              )}
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className={resultLabelClasses}>Property Price</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-400">{formatCurrency(propertyPrice)}</div>
            </div>
          </div>
          
          {comparisons.length > 0 && (
            <div>
              <h3 className={calculatorSectionHeaderClasses}>Property Comparison</h3>
              
              <div className="h-64 sm:h-80 mb-6">
                <canvas ref={comparisonChartRef}></canvas>
              </div>
              
              <div className="overflow-x-auto">
                <table className="calculator-table">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Property
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Square Footage
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Price/Sq Ft
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                    {comparisons.map((property, index) => (
                      <tr key={index} className="hover:bg-muted">
                        <td className="calculator-table-cell">
                          <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: property.color }}></span>
                            {property.name}
                          </div>
                        </td>
                        <td className="calculator-table-cell">{formatCurrency(property.price)}</td>
                        <td className="calculator-table-cell">{property.squareFootage.toLocaleString()} sq ft</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium" style={{ color: property.color }}>
                          {formatCurrency(property.pricePerSquareFoot)}
                        </td>
                        <td className="calculator-table-cell">
                          <button
                            className="text-red-400 hover:text-red-300 transition duration-150 ease-in-out"
                            onClick={() => removePropertyComparison(index)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {comparisons.length === 0 && (
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-gray-300">Add properties to compare their price per square foot</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricePerSquareFootCalculator; 