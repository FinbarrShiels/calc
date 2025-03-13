'use client';

import React, { useState, useEffect } from 'react';
import { decimalInputProps } from '@/utils/inputUtils';


const LitersToTonsCalculator: React.FC = () => {
  // Input state
  const [litersStr, setLitersStr] = useState<string>('1000');
  const [liquidType, setLiquidType] = useState<string>('water');
  const [precision, setPrecision] = useState<number>(2);
  const [metricTons, setMetricTons] = useState<boolean>(true);
  
  // Result state
  const [tons, setTons] = useState<number | null>(null);
  
  // Liquid density in kg per liter (same as g/ml)
  const liquidDensities: Record<string, number> = {
    water: 1.0,
    milk: 1.03,
    gasoline: 0.75,
    diesel: 0.85,
    oil: 0.92,
    honey: 1.42,
    seawater: 1.03,
    juice: 1.05,
  };
  
  useEffect(() => {
    convertLitersToTons();
  }, [litersStr, liquidType, precision, metricTons]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle liquid type change
  const handleLiquidChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLiquidType(e.target.value);
  };
  
  // Handle ton type change
  const handleTonTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetricTons(e.target.value === 'metric');
  };
  
  // Handle number input with validation
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setter('');
      return;
    }
    
    // Handle special case for decimal input
    if (value === '.' || value === '0.') {
      setter('0.');
      return;
    }
    
    // Validate input format
    const regex = /^-?\d*\.?\d*$/;
    if (regex.test(value)) {
      // Remove leading zeros for non-decimal numbers
      if (value.indexOf('.') === -1 && value.length > 1 && value.startsWith('0')) {
        setter(value.replace(/^0+/, ''));
      } else {
        setter(value);
      }
    }
  };
  
  // Convert liters to tons
  const convertLitersToTons = () => {
    if (litersStr === '') {
      setTons(null);
      return;
    }
    
    const liters = parseFloat(litersStr);
    const density = liquidDensities[liquidType];
    
    // Calculate weight in kg
    const weightInKg = liters * density;
    
    // Convert to tons (metric or US)
    if (metricTons) {
      // 1 metric ton = 1000 kg
      setTons(Number((weightInKg / 1000).toFixed(precision)));
    } else {
      // 1 US ton = 907.185 kg
      setTons(Number((weightInKg / 907.185).toFixed(precision)));
    }
  };
  
  return (
    <div className="calculator-input">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2 text-white dark:text-gray-900">Liters to Tons Calculator</h1>
        <p className="text-gray-300 mb-6">Convert liters to tons with precision. Perfect for industrial applications, shipping, and weight calculations.</p>
        
        <div className="calculator-card-alt rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="calculator-section-header">Liters to Tons Calculator</h2>
            
            <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
              <div className="mb-4">
                <label htmlFor="liters" className="block text-sm font-medium text-gray-300 mb-1">
                  Liters
                </label>
                <div className="relative">
                  <input
                    id="liters"
                    type="tel"
                    value={litersStr}
                    onChange={(e) => handleNumberInput(e, setLitersStr)} {...decimalInputProps}
                    className="calculator-input"
                    placeholder="Enter volume in liters"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">L</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="liquid" className="block text-sm font-medium text-gray-300 mb-1">
                  Liquid Type
                </label>
                <select
                  id="liquid"
                  className="calculator-input"
                  value={liquidType}
                  onChange={handleLiquidChange}
                >
                  <option value="water">Water</option>
                  <option value="milk">Milk</option>
                  <option value="gasoline">Gasoline</option>
                  <option value="diesel">Diesel</option>
                  <option value="oil">Oil</option>
                  <option value="honey">Honey</option>
                  <option value="seawater">Seawater</option>
                  <option value="juice">Juice</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Ton Type
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio bg-gray-100 dark:bg-gray-800 border-gray-600 text-blue-500 focus:ring-blue-500"
                      name="tonType"
                      value="metric"
                      checked={metricTons}
                      onChange={handleTonTypeChange}
                    />
                    <span className="ml-2 text-gray-300">Metric Tons (1,000 kg)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio bg-gray-100 dark:bg-gray-800 border-gray-600 text-blue-500 focus:ring-blue-500"
                      name="tonType"
                      value="us"
                      checked={!metricTons}
                      onChange={handleTonTypeChange}
                    />
                    <span className="ml-2 text-gray-300">US Tons (2,000 lb)</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="precision" className="block text-sm font-medium text-gray-300 mb-1">
                  Decimal Precision
                </label>
                <select
                  id="precision"
                  className="calculator-input"
                  value={precision}
                  onChange={handlePrecisionChange}
                >
                  <option value="0">0 decimal places</option>
                  <option value="1">1 decimal place</option>
                  <option value="2">2 decimal places</option>
                  <option value="3">3 decimal places</option>
                  <option value="4">4 decimal places</option>
                </select>
              </div>
            </div>
            
            <div className="calculator-card-alt p-6 rounded-lg shadow-lg">
              <h3 className="calculator-section-header">Conversion Results</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Liters</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">
                    {litersStr === '' ? '0' : parseFloat(litersStr).toLocaleString()} L
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Weight in {metricTons ? 'Metric' : 'US'} Tons</div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">
                    {tons !== null ? tons.toFixed(precision) : '0'} {metricTons ? 't' : 'tons'}
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Liquid</div>
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">
                    {liquidType.charAt(0).toUpperCase() + liquidType.slice(1)}
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Density</div>
                  <div className="text-xl sm:text-2xl font-bold text-yellow-400">
                    {liquidDensities[liquidType]} kg/L
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    {litersStr === '' ? '0' : litersStr} liters × {liquidDensities[liquidType]} kg/L = {litersStr === '' ? '0' : (parseFloat(litersStr) * liquidDensities[liquidType]).toFixed(precision)} kg
                  </div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    {litersStr === '' ? '0' : (parseFloat(litersStr) * liquidDensities[liquidType]).toFixed(precision)} kg ÷ {metricTons ? '1,000' : '907.185'} = {tons !== null ? tons.toFixed(precision) : '0'} {metricTons ? 'metric tons' : 'US tons'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 calculator-card-alt p-6 rounded-lg shadow-lg">
              <h3 className="calculator-section-header">Liquid Densities</h3>
              
              <div className="overflow-x-auto">
                <table className="calculator-table">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Liquid
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Density (kg/L)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                    {Object.entries(liquidDensities).map(([liquid, density]) => (
                      <tr key={liquid} className={`hover:bg-muted ${liquid === liquidType ? 'bg-gray-100 dark:bg-gray-800' : ''}`}>
                        <td className="calculator-table-cell">
                          {liquid.charAt(0).toUpperCase() + liquid.slice(1)}
                        </td>
                        <td className="calculator-table-cell">
                          {density.toFixed(precision)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LitersToTonsCalculator; 