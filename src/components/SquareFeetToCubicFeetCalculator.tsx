'use client';

import React, { useState, useEffect } from 'react';
import { decimalInputProps } from '@/utils/inputUtils';


const SquareFeetToCubicFeetCalculator: React.FC = () => {
  // Input state
  const [squareFeetStr, setSquareFeetStr] = useState<string>('100');
  const [heightStr, setHeightStr] = useState<string>('8');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [cubicFeet, setCubicFeet] = useState<number | null>(null);
  
  useEffect(() => {
    convertSquareFeetToCubicFeet();
  }, [squareFeetStr, heightStr, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
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
  
  // Convert square feet to cubic feet
  const convertSquareFeetToCubicFeet = () => {
    if (squareFeetStr === '' || heightStr === '') {
      setCubicFeet(null);
      return;
    }
    
    const squareFeet = parseFloat(squareFeetStr);
    const height = parseFloat(heightStr);
    const cubicFeetValue = squareFeet * height;
    setCubicFeet(Number(cubicFeetValue.toFixed(precision)));
  };
  
  return (
    <div className="calculator-input">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2 text-white dark:text-gray-900">Square Feet to Cubic Feet Calculator</h1>
        <p className="text-gray-300 mb-6">Convert square feet (sq ft) to cubic feet (cu ft) with precision. Perfect for construction, room volume calculations, and material estimation.</p>
        
        <div className="calculator-card-alt rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="calculator-section-header">Square Feet to Cubic Feet Calculator</h2>
            
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
              
              <div className="mb-4">
                <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-1">
                  Height
                </label>
                <div className="relative">
                  <input
                    id="height"
                    type="tel"
                    value={heightStr}
                    onChange={(e) => handleNumberInput(e, setHeightStr)} {...decimalInputProps}
                    className="calculator-input"
                    placeholder="Enter height in feet"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">ft</span>
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
                  <div className="text-sm text-gray-600 dark:text-gray-300">Height</div>
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">
                    {heightStr === '' ? '0' : parseFloat(heightStr).toLocaleString()} ft
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Cubic Feet</div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">
                    {cubicFeet !== null ? cubicFeet.toFixed(precision) : '0'} cu ft
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    {squareFeetStr === '' ? '0' : squareFeetStr} square feet × {heightStr === '' ? '0' : heightStr} feet = {cubicFeet !== null ? cubicFeet.toFixed(precision) : '0'} cubic feet
                  </div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    Volume (cubic feet) = Area (square feet) × Height (feet)
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 calculator-card-alt p-6 rounded-lg shadow-lg">
              <h3 className="calculator-section-header">Common Room Volumes</h3>
              
              <div className="overflow-x-auto">
                <table className="calculator-table">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Room Size (sq ft)
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Ceiling Height (ft)
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Volume (cu ft)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                    {[
                      { area: 100, height: 8 },
                      { area: 120, height: 8 },
                      { area: 150, height: 8 },
                      { area: 200, height: 8 },
                      { area: 250, height: 9 },
                      { area: 300, height: 9 },
                      { area: 400, height: 10 },
                      { area: 500, height: 10 },
                      { area: 750, height: 10 },
                      { area: 1000, height: 12 }
                    ].map((room, index) => {
                      const volume = room.area * room.height;
                      
                      return (
                        <tr key={index} className="hover:bg-muted">
                          <td className="calculator-table-cell">
                            {room.area.toLocaleString()} sq ft
                          </td>
                          <td className="calculator-table-cell">
                            {room.height} ft
                          </td>
                          <td className="calculator-table-cell">
                            {volume.toFixed(precision)} cu ft
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

export default SquareFeetToCubicFeetCalculator; 