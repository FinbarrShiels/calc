'use client';

import React, { useState, useEffect } from 'react';
import { decimalInputProps } from '@/utils/inputUtils';


const SquareFeetToCubicYdsCalculator: React.FC = () => {
  // Input state
  const [squareFeetStr, setSquareFeetStr] = useState<string>('100');
  const [depthStr, setDepthStr] = useState<string>('1');
  const [depthUnit, setDepthUnit] = useState<string>('feet');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [cubicYards, setCubicYards] = useState<number | null>(null);
  
  // Constants for conversion
  const CUBIC_YARDS_PER_CUBIC_FOOT = 1 / 27; // 1 cubic yard = 27 cubic feet
  const FEET_PER_INCH = 1 / 12; // 1 foot = 12 inches
  
  useEffect(() => {
    convertSquareFeetToCubicYards();
  }, [squareFeetStr, depthStr, depthUnit, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle depth unit change
  const handleDepthUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepthUnit(e.target.value);
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
  
  // Convert square feet to cubic yards
  const convertSquareFeetToCubicYards = () => {
    if (squareFeetStr === '' || depthStr === '') {
      setCubicYards(null);
      return;
    }
    
    const squareFeet = parseFloat(squareFeetStr);
    const depthValue = parseFloat(depthStr);
    
    // Convert depth to feet if in inches
    const depthInFeet = depthUnit === 'inches' ? depthValue * FEET_PER_INCH : depthValue;
    
    // Calculate cubic feet
    const cubicFeet = squareFeet * depthInFeet;
    
    // Convert cubic feet to cubic yards
    const cubicYardsValue = cubicFeet * CUBIC_YARDS_PER_CUBIC_FOOT;
    
    setCubicYards(Number(cubicYardsValue.toFixed(precision)));
  };
  
  return (
    <div className="calculator-input">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2 text-white dark:text-gray-900">Square Feet to Cubic Yards Calculator</h1>
        <p className="text-gray-300 mb-6">Convert square feet (sq ft) to cubic yards (cu yd) with precision. Perfect for landscaping, construction, and material estimation.</p>
        
        <div className="calculator-card-alt rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="calculator-section-header">Square Feet to Cubic Yards Calculator</h2>
            
            <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
              <div className="mb-4">
                <label htmlFor="squareFeet" className="block text-sm font-medium text-gray-300 mb-1">
                  Square Feet (Area)
                </label>
                <div className="relative">
                  <input
                    id="squareFeet"
                    type="tel"
                    value={squareFeetStr}
                    onChange={(e) => handleNumberInput(e, setSquareFeetStr)} {...decimalInputProps}
                    className="calculator-input"
                    placeholder="Enter area in square feet"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">sq ft</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="depth" className="block text-sm font-medium text-gray-300 mb-1">
                    Depth
                  </label>
                  <div className="relative">
                    <input
                      id="depth"
                      type="tel"
                      value={depthStr}
                      onChange={(e) => handleNumberInput(e, setDepthStr)} {...decimalInputProps}
                      className="calculator-input"
                      placeholder="Enter depth"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="depthUnit" className="block text-sm font-medium text-gray-300 mb-1">
                    Depth Unit
                  </label>
                  <select
                    id="depthUnit"
                    className="calculator-input"
                    value={depthUnit}
                    onChange={handleDepthUnitChange}
                  >
                    <option value="feet">Feet</option>
                    <option value="inches">Inches</option>
                  </select>
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
                  <div className="text-sm text-gray-600 dark:text-gray-300">Square Feet</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">
                    {squareFeetStr === '' ? '0' : parseFloat(squareFeetStr).toLocaleString()} sq ft
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Depth</div>
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">
                    {depthStr === '' ? '0' : parseFloat(depthStr).toLocaleString()} {depthUnit}
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Cubic Yards</div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">
                    {cubicYards !== null ? cubicYards.toFixed(precision) : '0'} cu yd
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    {squareFeetStr === '' ? '0' : squareFeetStr} square feet × {depthStr === '' ? '0' : depthStr} {depthUnit} {depthUnit === 'inches' ? '÷ 12' : ''} ÷ 27 = {cubicYards !== null ? cubicYards.toFixed(precision) : '0'} cubic yards
                  </div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    Volume (cubic yards) = Area (square feet) × Depth (feet) ÷ 27
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 calculator-card-alt p-6 rounded-lg shadow-lg">
              <h3 className="calculator-section-header">Common Material Volumes</h3>
              
              <div className="overflow-x-auto">
                <table className="calculator-table">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Area (sq ft)
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Depth
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Volume (cu yd)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                    {[
                      { area: 100, depth: 3, unit: 'inches' },
                      { area: 100, depth: 6, unit: 'inches' },
                      { area: 200, depth: 3, unit: 'inches' },
                      { area: 200, depth: 6, unit: 'inches' },
                      { area: 500, depth: 3, unit: 'inches' },
                      { area: 500, depth: 6, unit: 'inches' },
                      { area: 1000, depth: 3, unit: 'inches' },
                      { area: 1000, depth: 6, unit: 'inches' },
                      { area: 1000, depth: 1, unit: 'feet' },
                      { area: 2000, depth: 1, unit: 'feet' }
                    ].map((material, index) => {
                      const depthInFeet = material.unit === 'inches' ? material.depth / 12 : material.depth;
                      const cubicFeet = material.area * depthInFeet;
                      const cubicYardsValue = cubicFeet / 27;
                      
                      return (
                        <tr key={index} className="hover:bg-muted">
                          <td className="calculator-table-cell">
                            {material.area.toLocaleString()} sq ft
                          </td>
                          <td className="calculator-table-cell">
                            {material.depth} {material.unit}
                          </td>
                          <td className="calculator-table-cell">
                            {cubicYardsValue.toFixed(precision)} cu yd
                          </td>
                        </tr>
                      );
                    })}
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

export default SquareFeetToCubicYdsCalculator; 