'use client';

import React, { useState, useEffect } from 'react';
import { decimalInputProps } from '@/utils/inputUtils';


const CubicYardsToTonsCalculator: React.FC = () => {
  // Input state
  const [cubicYardsStr, setCubicYardsStr] = useState<string>('1');
  const [materialType, setMaterialType] = useState<string>('gravel');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [tons, setTons] = useState<number | null>(null);
  
  // Material density in tons per cubic yard
  const materialDensities: Record<string, number> = {
    gravel: 1.4,
    sand: 1.3,
    stone: 1.5,
    dirt: 1.1,
    concrete: 2.0,
    asphalt: 1.9,
    mulch: 0.4,
    topsoil: 0.9,
  };
  
  useEffect(() => {
    convertCubicYardsToTons();
  }, [cubicYardsStr, materialType, precision]);
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle material type change
  const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMaterialType(e.target.value);
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
  
  // Convert cubic yards to tons
  const convertCubicYardsToTons = () => {
    if (cubicYardsStr === '') {
      setTons(null);
      return;
    }
    
    const cubicYards = parseFloat(cubicYardsStr);
    const density = materialDensities[materialType];
    const tonsValue = cubicYards * density;
    setTons(Number(tonsValue.toFixed(precision)));
  };
  
  return (
    <div className="calculator-input">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2 text-white dark:text-gray-900">Cubic Yards to Tons Calculator</h1>
        <p className="text-gray-300 mb-6">Convert cubic yards to tons with precision. Perfect for construction, landscaping, and material estimation.</p>
        
        <div className="calculator-card-alt rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="calculator-section-header">Cubic Yards to Tons Calculator</h2>
            
            <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
              <div className="mb-4">
                <label htmlFor="cubicYards" className="block text-sm font-medium text-gray-300 mb-1">
                  Cubic Yards
                </label>
                <div className="relative">
                  <input
                    id="cubicYards"
                    type="tel"
                    value={cubicYardsStr}
                    onChange={(e) => handleNumberInput(e, setCubicYardsStr)} {...decimalInputProps}
                    className="calculator-input"
                    placeholder="Enter volume in cubic yards"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">yd³</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="material" className="block text-sm font-medium text-gray-300 mb-1">
                  Material Type
                </label>
                <select
                  id="material"
                  className="calculator-input"
                  value={materialType}
                  onChange={handleMaterialChange}
                >
                  <option value="gravel">Gravel</option>
                  <option value="sand">Sand</option>
                  <option value="stone">Stone</option>
                  <option value="dirt">Dirt</option>
                  <option value="concrete">Concrete</option>
                  <option value="asphalt">Asphalt</option>
                  <option value="mulch">Mulch</option>
                  <option value="topsoil">Topsoil</option>
                </select>
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
                  <div className="text-sm text-gray-600 dark:text-gray-300">Cubic Yards</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">
                    {cubicYardsStr === '' ? '0' : parseFloat(cubicYardsStr).toLocaleString()} yd³
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Weight in Tons</div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">
                    {tons !== null ? tons.toFixed(precision) : '0'} tons
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Material</div>
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">
                    {materialType.charAt(0).toUpperCase() + materialType.slice(1)}
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Density</div>
                  <div className="text-xl sm:text-2xl font-bold text-yellow-400">
                    {materialDensities[materialType]} tons/yd³
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
                  <div className="text-md font-medium text-gray-300 mt-1">
                    {cubicYardsStr === '' ? '0' : cubicYardsStr} cubic yards × {materialDensities[materialType]} tons/yd³ = {tons !== null ? tons.toFixed(precision) : '0'} tons
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 calculator-card-alt p-6 rounded-lg shadow-lg">
              <h3 className="calculator-section-header">Material Densities</h3>
              
              <div className="overflow-x-auto">
                <table className="calculator-table">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Material
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Density (tons/yd³)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                    {Object.entries(materialDensities).map(([material, density]) => (
                      <tr key={material} className={`hover:bg-muted ${material === materialType ? 'bg-gray-100 dark:bg-gray-800' : ''}`}>
                        <td className="calculator-table-cell">
                          {material.charAt(0).toUpperCase() + material.slice(1)}
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

export default CubicYardsToTonsCalculator; 