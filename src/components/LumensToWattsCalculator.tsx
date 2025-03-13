'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';


interface LumensToWattsCalculatorProps {
  calculator?: Calculator;
}

const LumensToWattsCalculator: React.FC<LumensToWattsCalculatorProps> = ({ calculator }) => {
  // Input state
  const [lumensStr, setLumensStr] = useState<string>('800');
  const [efficiencyStr, setEfficiencyStr] = useState<string>('80');
  const [lightSourceType, setLightSourceType] = useState<string>('led');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [watts, setWatts] = useState<number>(0);
  
  // Light source efficiency presets (lumens per watt)
  const lightSourceEfficiencies = {
    incandescent: 15,
    halogen: 20,
    cfl: 60,
    led: 80,
    metal_halide: 85,
    high_pressure_sodium: 100,
    low_pressure_sodium: 150,
  };
  
  // Calculate conversion when inputs change
  useEffect(() => {
    calculateWatts();
  }, [lumensStr, efficiencyStr, lightSourceType, precision]);
  
  // Handle light source type change
  const handleLightSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sourceType = e.target.value;
    setLightSourceType(sourceType);
    setEfficiencyStr(String(lightSourceEfficiencies[sourceType as keyof typeof lightSourceEfficiencies]));
  };
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle lumens input change with proper validation
  const handleLumensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setLumensStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setLumensStr(value);
    }
  };
  
  // Handle efficiency input change with proper validation
  const handleEfficiencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setEfficiencyStr('');
      return;
    }
    
    // Validate the input is a number
    if (/^\d*\.?\d*$/.test(value)) {
      setEfficiencyStr(value);
      setLightSourceType('custom');
    }
  };
  
  // Calculate watts from lumens
  const calculateWatts = () => {
    const lumens = lumensStr === '' ? 0 : parseFloat(lumensStr);
    const efficiency = efficiencyStr === '' ? 0 : parseFloat(efficiencyStr);
    
    if (efficiency === 0) {
      setWatts(0);
      return;
    }
    
    // W = lm / (lm/W) (Watts = Lumens / Efficiency)
    const calculatedWatts = lumens / efficiency;
    setWatts(Number(calculatedWatts.toFixed(precision)));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="calculator-section-header">Lumens to Watts Calculator</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="lumens" className="block text-sm font-medium text-gray-300 mb-1">
                Light Output
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="lumens"
                  className="calculator-input"
                  value={lumensStr} {...numericInputProps}
                  onChange={handleLumensChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">lm</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="lightSource" className="block text-sm font-medium text-gray-300 mb-1">
                Light Source Type
              </label>
              <select
                id="lightSource"
                className="calculator-input"
                value={lightSourceType}
                onChange={handleLightSourceChange}
              >
                <option value="incandescent">Incandescent</option>
                <option value="halogen">Halogen</option>
                <option value="cfl">CFL (Compact Fluorescent)</option>
                <option value="led">LED</option>
                <option value="metal_halide">Metal Halide</option>
                <option value="high_pressure_sodium">High Pressure Sodium</option>
                <option value="low_pressure_sodium">Low Pressure Sodium</option>
                <option value="custom">Custom Efficiency</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="efficiency" className="block text-sm font-medium text-gray-300 mb-1">
                Efficiency
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="efficiency"
                  className="calculator-input"
                  value={efficiencyStr} {...numericInputProps}
                  onChange={handleEfficiencyChange}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">lm/W</span>
              </div>
            </div>
            
            <div>
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
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="calculator-section-header">Conversion Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Light Output</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {lumensStr === '' ? '0' : parseFloat(lumensStr).toLocaleString()} lm
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Efficiency: {efficiencyStr === '' ? '0' : parseFloat(efficiencyStr).toLocaleString()} lm/W
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Power Consumption</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {watts.toFixed(precision)} W
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                Power (W) = Light Output (lm) ÷ Efficiency (lm/W)
              </div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {lumensStr === '' ? '0' : parseFloat(lumensStr).toLocaleString()} lm ÷ {efficiencyStr === '' ? '0' : parseFloat(efficiencyStr).toLocaleString()} lm/W = {watts.toFixed(precision)} W
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="calculator-section-header">Common Light Bulb Equivalents</h3>
          
          <div className="overflow-x-auto">
            <table className="calculator-table">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Light Output (lm)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Incandescent (W)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    CFL (W)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    LED (W)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {[250, 450, 800, 1100, 1600, 2600].map((lm) => {
                  const incandescent = lm / lightSourceEfficiencies.incandescent;
                  const cfl = lm / lightSourceEfficiencies.cfl;
                  const led = lm / lightSourceEfficiencies.led;
                  
                  return (
                    <tr key={lm} className="hover:bg-muted">
                      <td className="calculator-table-cell">
                        {lm.toLocaleString()} lm
                      </td>
                      <td className="calculator-table-cell">
                        {incandescent.toFixed(precision)} W
                      </td>
                      <td className="calculator-table-cell">
                        {cfl.toFixed(precision)} W
                      </td>
                      <td className="calculator-table-cell">
                        {led.toFixed(precision)} W
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
  );
};

export default LumensToWattsCalculator; 