'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface DataStorageConverterProps {
  calculator?: Calculator;
}

const DataStorageConverter: React.FC<DataStorageConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('GB');
  const [toUnit, setToUnit] = useState<string>('MB');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Units in bytes (base-2 and base-10)
  const unitValues: Record<string, number> = {
    // Binary units (base-2)
    'B': 1,
    'KB': Math.pow(2, 10),         // 1,024 bytes
    'MB': Math.pow(2, 20),         // 1,048,576 bytes
    'GB': Math.pow(2, 30),         // 1,073,741,824 bytes
    'TB': Math.pow(2, 40),         // 1,099,511,627,776 bytes
    'PB': Math.pow(2, 50),         // 1,125,899,906,842,624 bytes
    
    // Decimal units (base-10)
    'kB': Math.pow(10, 3),         // 1,000 bytes
    'MB_10': Math.pow(10, 6),      // 1,000,000 bytes
    'GB_10': Math.pow(10, 9),      // 1,000,000,000 bytes
    'TB_10': Math.pow(10, 12),     // 1,000,000,000,000 bytes
    'PB_10': Math.pow(10, 15),     // 1,000,000,000,000,000 bytes
    
    // Binary units with proper names (IEC)
    'KiB': Math.pow(2, 10),        // 1,024 bytes
    'MiB': Math.pow(2, 20),        // 1,048,576 bytes
    'GiB': Math.pow(2, 30),        // 1,073,741,824 bytes
    'TiB': Math.pow(2, 40),        // 1,099,511,627,776 bytes
    'PiB': Math.pow(2, 50),        // 1,125,899,906,842,624 bytes
  };
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertUnits();
  }, [valueStr, fromUnit, toUnit, precision]);
  
  // Handle from unit change
  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value);
  };
  
  // Handle to unit change
  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value);
  };
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle value input change with proper validation
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setValueStr('');
      return;
    }
    
    // Validate the input is a positive number
    if (/^\d*\.?\d*$/.test(value)) {
      setValueStr(value);
    }
  };
  
  // Convert between units
  const convertUnits = () => {
    const value = valueStr === '' ? 0 : parseFloat(valueStr);
    
    // Convert to bytes first
    const bytes = value * unitValues[fromUnit];
    
    // Then convert to target unit
    const convertedValue = bytes / unitValues[toUnit];
    
    setResult(Number(convertedValue.toFixed(precision)));
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'B': return 'Bytes';
      case 'KB': return 'Kilobytes (1024 bytes)';
      case 'MB': return 'Megabytes (1024 KB)';
      case 'GB': return 'Gigabytes (1024 MB)';
      case 'TB': return 'Terabytes (1024 GB)';
      case 'PB': return 'Petabytes (1024 TB)';
      case 'kB': return 'Kilobytes (1000 bytes)';
      case 'MB_10': return 'Megabytes (1000 kB)';
      case 'GB_10': return 'Gigabytes (1000 MB)';
      case 'TB_10': return 'Terabytes (1000 GB)';
      case 'PB_10': return 'Petabytes (1000 TB)';
      case 'KiB': return 'Kibibytes (1024 bytes)';
      case 'MiB': return 'Mebibytes (1024 KiB)';
      case 'GiB': return 'Gibibytes (1024 MiB)';
      case 'TiB': return 'Tebibytes (1024 GiB)';
      case 'PiB': return 'Pebibytes (1024 TiB)';
      default: return unit;
    }
  };
  
  // Get the display name of a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'MB_10': return 'MB (base-10)';
      case 'GB_10': return 'GB (base-10)';
      case 'TB_10': return 'TB (base-10)';
      case 'PB_10': return 'PB (base-10)';
      default: return unit;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="calculator-section-header">Data Storage Converter</h2>
        
        <div className="calculator-card-alt p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-300 mb-1">
                Value
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="value"
                  className="calculator-input"
                  value={valueStr}
                  onChange={handleValueChange} {...decimalInputProps}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-300 mb-1">
                From Unit
              </label>
              <select
                id="fromUnit"
                className="calculator-input"
                value={fromUnit}
                onChange={handleFromUnitChange}
              >
                <optgroup label="Binary Units (Base-2)">
                  <option value="B">Bytes (B)</option>
                  <option value="KB">Kilobytes (KB)</option>
                  <option value="MB">Megabytes (MB)</option>
                  <option value="GB">Gigabytes (GB)</option>
                  <option value="TB">Terabytes (TB)</option>
                  <option value="PB">Petabytes (PB)</option>
                </optgroup>
                <optgroup label="Decimal Units (Base-10)">
                  <option value="kB">Kilobytes (kB)</option>
                  <option value="MB_10">Megabytes (MB)</option>
                  <option value="GB_10">Gigabytes (GB)</option>
                  <option value="TB_10">Terabytes (TB)</option>
                  <option value="PB_10">Petabytes (PB)</option>
                </optgroup>
                <optgroup label="IEC Binary Units">
                  <option value="KiB">Kibibytes (KiB)</option>
                  <option value="MiB">Mebibytes (MiB)</option>
                  <option value="GiB">Gibibytes (GiB)</option>
                  <option value="TiB">Tebibytes (TiB)</option>
                  <option value="PiB">Pebibytes (PiB)</option>
                </optgroup>
              </select>
            </div>
            
            <div>
              <label htmlFor="toUnit" className="block text-sm font-medium text-gray-300 mb-1">
                To Unit
              </label>
              <select
                id="toUnit"
                className="calculator-input"
                value={toUnit}
                onChange={handleToUnitChange}
              >
                <optgroup label="Binary Units (Base-2)">
                  <option value="B">Bytes (B)</option>
                  <option value="KB">Kilobytes (KB)</option>
                  <option value="MB">Megabytes (MB)</option>
                  <option value="GB">Gigabytes (GB)</option>
                  <option value="TB">Terabytes (TB)</option>
                  <option value="PB">Petabytes (PB)</option>
                </optgroup>
                <optgroup label="Decimal Units (Base-10)">
                  <option value="kB">Kilobytes (kB)</option>
                  <option value="MB_10">Megabytes (MB)</option>
                  <option value="GB_10">Gigabytes (GB)</option>
                  <option value="TB_10">Terabytes (TB)</option>
                  <option value="PB_10">Petabytes (PB)</option>
                </optgroup>
                <optgroup label="IEC Binary Units">
                  <option value="KiB">Kibibytes (KiB)</option>
                  <option value="MiB">Mebibytes (MiB)</option>
                  <option value="GiB">Gibibytes (GiB)</option>
                  <option value="TiB">Tebibytes (TiB)</option>
                  <option value="PiB">Pebibytes (PiB)</option>
                </optgroup>
              </select>
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
                <option value="6">6 decimal places</option>
                <option value="8">8 decimal places</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="calculator-section-header">Conversion Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Input Value</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {valueStr === '' ? '0' : valueStr} {getUnitDisplayName(fromUnit)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {getUnitFullName(fromUnit)}
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Converted Value</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {result.toFixed(precision)} {getUnitDisplayName(toUnit)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {getUnitFullName(toUnit)}
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Formula</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {valueStr === '' ? '0' : valueStr} {getUnitDisplayName(fromUnit)} = {result.toFixed(precision)} {getUnitDisplayName(toUnit)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                1 {getUnitDisplayName(fromUnit)} = {(unitValues[fromUnit] / unitValues[toUnit]).toFixed(precision)} {getUnitDisplayName(toUnit)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="calculator-section-header">Common Data Storage Units</h3>
          
          <div className="overflow-x-auto">
            <table className="calculator-table">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Unit
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Bytes
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Byte
                  </td>
                  <td className="calculator-table-cell">
                    B
                  </td>
                  <td className="calculator-table-cell">
                    1
                  </td>
                  <td className="calculator-table-cell">
                    Base
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Kilobyte
                  </td>
                  <td className="calculator-table-cell">
                    KB
                  </td>
                  <td className="calculator-table-cell">
                    1,024
                  </td>
                  <td className="calculator-table-cell">
                    Binary
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Kibibyte
                  </td>
                  <td className="calculator-table-cell">
                    KiB
                  </td>
                  <td className="calculator-table-cell">
                    1,024
                  </td>
                  <td className="calculator-table-cell">
                    IEC
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Kilobyte
                  </td>
                  <td className="calculator-table-cell">
                    kB
                  </td>
                  <td className="calculator-table-cell">
                    1,000
                  </td>
                  <td className="calculator-table-cell">
                    Decimal
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Megabyte
                  </td>
                  <td className="calculator-table-cell">
                    MB
                  </td>
                  <td className="calculator-table-cell">
                    1,048,576
                  </td>
                  <td className="calculator-table-cell">
                    Binary
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Mebibyte
                  </td>
                  <td className="calculator-table-cell">
                    MiB
                  </td>
                  <td className="calculator-table-cell">
                    1,048,576
                  </td>
                  <td className="calculator-table-cell">
                    IEC
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Gigabyte
                  </td>
                  <td className="calculator-table-cell">
                    GB
                  </td>
                  <td className="calculator-table-cell">
                    1,073,741,824
                  </td>
                  <td className="calculator-table-cell">
                    Binary
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Gibibyte
                  </td>
                  <td className="calculator-table-cell">
                    GiB
                  </td>
                  <td className="calculator-table-cell">
                    1,073,741,824
                  </td>
                  <td className="calculator-table-cell">
                    IEC
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataStorageConverter; 