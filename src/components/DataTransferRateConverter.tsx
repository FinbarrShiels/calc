'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface DataTransferRateConverterProps {
  calculator?: Calculator;
}

const DataTransferRateConverter: React.FC<DataTransferRateConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('mbps');
  const [toUnit, setToUnit] = useState<string>('kbps');
  const [precision, setPrecision] = useState<number>(2);
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Conversion factors to bits per second (base unit)
  const unitFactors: Record<string, number> = {
    // Bit-based units
    'bps': 1,                    // bits per second (base unit)
    'kbps': 1000,                // kilobits per second
    'mbps': 1000000,             // megabits per second
    'gbps': 1000000000,          // gigabits per second
    'tbps': 1000000000000,       // terabits per second
    
    // Byte-based units
    'Bps': 8,                    // bytes per second
    'kBps': 8000,                // kilobytes per second
    'mBps': 8000000,             // megabytes per second
    'gBps': 8000000000,          // gigabytes per second
    'tBps': 8000000000000,       // terabytes per second
    
    // Binary units
    'Kibps': 1024,               // kibibits per second
    'Mibps': 1048576,            // mebibits per second
    'Gibps': 1073741824,         // gibibits per second
    'Tibps': 1099511627776,      // tebibits per second
    
    'KiBps': 8192,               // kibibytes per second
    'MiBps': 8388608,            // mebibytes per second
    'GiBps': 8589934592,         // gibibytes per second
    'TiBps': 8796093022208,      // tebibytes per second
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
    
    // Convert to bits per second first (base unit)
    const bps = value * unitFactors[fromUnit];
    
    // Then convert to target unit
    const convertedValue = bps / unitFactors[toUnit];
    
    setResult(Number(convertedValue.toFixed(precision)));
  };
  
  // Get the display name of a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'bps': return 'bps';
      case 'kbps': return 'kbps';
      case 'mbps': return 'Mbps';
      case 'gbps': return 'Gbps';
      case 'tbps': return 'Tbps';
      case 'Bps': return 'B/s';
      case 'kBps': return 'kB/s';
      case 'mBps': return 'MB/s';
      case 'gBps': return 'GB/s';
      case 'tBps': return 'TB/s';
      case 'Kibps': return 'Kibps';
      case 'Mibps': return 'Mibps';
      case 'Gibps': return 'Gibps';
      case 'Tibps': return 'Tibps';
      case 'KiBps': return 'KiB/s';
      case 'MiBps': return 'MiB/s';
      case 'GiBps': return 'GiB/s';
      case 'TiBps': return 'TiB/s';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'bps': return 'Bits per Second';
      case 'kbps': return 'Kilobits per Second';
      case 'mbps': return 'Megabits per Second';
      case 'gbps': return 'Gigabits per Second';
      case 'tbps': return 'Terabits per Second';
      case 'Bps': return 'Bytes per Second';
      case 'kBps': return 'Kilobytes per Second';
      case 'mBps': return 'Megabytes per Second';
      case 'gBps': return 'Gigabytes per Second';
      case 'tBps': return 'Terabytes per Second';
      case 'Kibps': return 'Kibibits per Second';
      case 'Mibps': return 'Mebibits per Second';
      case 'Gibps': return 'Gibibits per Second';
      case 'Tibps': return 'Tebibits per Second';
      case 'KiBps': return 'Kibibytes per Second';
      case 'MiBps': return 'Mebibytes per Second';
      case 'GiBps': return 'Gibibytes per Second';
      case 'TiBps': return 'Tebibytes per Second';
      default: return unit;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="calculator-section-header">Data Transfer Rate Converter</h2>
        
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
                <optgroup label="Bit-based Units (Decimal)">
                  <option value="bps">Bits per Second (bps)</option>
                  <option value="kbps">Kilobits per Second (kbps)</option>
                  <option value="mbps">Megabits per Second (Mbps)</option>
                  <option value="gbps">Gigabits per Second (Gbps)</option>
                  <option value="tbps">Terabits per Second (Tbps)</option>
                </optgroup>
                <optgroup label="Byte-based Units (Decimal)">
                  <option value="Bps">Bytes per Second (B/s)</option>
                  <option value="kBps">Kilobytes per Second (kB/s)</option>
                  <option value="mBps">Megabytes per Second (MB/s)</option>
                  <option value="gBps">Gigabytes per Second (GB/s)</option>
                  <option value="tBps">Terabytes per Second (TB/s)</option>
                </optgroup>
                <optgroup label="Binary Units (IEC)">
                  <option value="Kibps">Kibibits per Second (Kibps)</option>
                  <option value="Mibps">Mebibits per Second (Mibps)</option>
                  <option value="Gibps">Gibibits per Second (Gibps)</option>
                  <option value="Tibps">Tebibits per Second (Tibps)</option>
                  <option value="KiBps">Kibibytes per Second (KiB/s)</option>
                  <option value="MiBps">Mebibytes per Second (MiB/s)</option>
                  <option value="GiBps">Gibibytes per Second (GiB/s)</option>
                  <option value="TiBps">Tebibytes per Second (TiB/s)</option>
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
                <optgroup label="Bit-based Units (Decimal)">
                  <option value="bps">Bits per Second (bps)</option>
                  <option value="kbps">Kilobits per Second (kbps)</option>
                  <option value="mbps">Megabits per Second (Mbps)</option>
                  <option value="gbps">Gigabits per Second (Gbps)</option>
                  <option value="tbps">Terabits per Second (Tbps)</option>
                </optgroup>
                <optgroup label="Byte-based Units (Decimal)">
                  <option value="Bps">Bytes per Second (B/s)</option>
                  <option value="kBps">Kilobytes per Second (kB/s)</option>
                  <option value="mBps">Megabytes per Second (MB/s)</option>
                  <option value="gBps">Gigabytes per Second (GB/s)</option>
                  <option value="tBps">Terabytes per Second (TB/s)</option>
                </optgroup>
                <optgroup label="Binary Units (IEC)">
                  <option value="Kibps">Kibibits per Second (Kibps)</option>
                  <option value="Mibps">Mebibits per Second (Mibps)</option>
                  <option value="Gibps">Gibibits per Second (Gibps)</option>
                  <option value="Tibps">Tebibits per Second (Tibps)</option>
                  <option value="KiBps">Kibibytes per Second (KiB/s)</option>
                  <option value="MiBps">Mebibytes per Second (MiB/s)</option>
                  <option value="GiBps">Gibibytes per Second (GiB/s)</option>
                  <option value="TiBps">Tebibytes per Second (TiB/s)</option>
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
                1 {getUnitDisplayName(fromUnit)} = {(unitFactors[fromUnit] / unitFactors[toUnit]).toFixed(precision)} {getUnitDisplayName(toUnit)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="calculator-section-header">Common Data Transfer Rates</h3>
          
          <div className="overflow-x-auto">
            <table className="calculator-table">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Connection Type
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Mbps
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    MB/s
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Dial-up (56K)
                  </td>
                  <td className="calculator-table-cell">
                    0.056
                  </td>
                  <td className="calculator-table-cell">
                    0.007
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Basic DSL
                  </td>
                  <td className="calculator-table-cell">
                    5
                  </td>
                  <td className="calculator-table-cell">
                    0.625
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Cable Internet
                  </td>
                  <td className="calculator-table-cell">
                    100
                  </td>
                  <td className="calculator-table-cell">
                    12.5
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    Fiber Optic
                  </td>
                  <td className="calculator-table-cell">
                    1000
                  </td>
                  <td className="calculator-table-cell">
                    125
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    USB 2.0
                  </td>
                  <td className="calculator-table-cell">
                    480
                  </td>
                  <td className="calculator-table-cell">
                    60
                  </td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="calculator-table-cell">
                    USB 3.0
                  </td>
                  <td className="calculator-table-cell">
                    5000
                  </td>
                  <td className="calculator-table-cell">
                    625
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

export default DataTransferRateConverter; 