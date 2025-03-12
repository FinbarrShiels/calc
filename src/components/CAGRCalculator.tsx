"use client";

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { decimalInputProps } from '@/utils/inputUtils';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  year: number;
  value: number;
}

const CAGRCalculator = () => {
  // State for form inputs
  const [currency, setCurrency] = useState('$');
  const [initialValueStr, setInitialValueStr] = useState('10000');
  const [finalValueStr, setFinalValueStr] = useState('25000');
  const [yearsStr, setYearsStr] = useState('5');
  
  // Derived numeric values for calculations
  const initialValue = parseFloat(initialValueStr) || 0;
  const finalValue = parseFloat(finalValueStr) || 0;
  const years = parseFloat(yearsStr) || 1; // Default to 1 to avoid division by zero
  
  // State for calculation results
  const [cagr, setCAGR] = useState(0);
  const [growthMultiplier, setGrowthMultiplier] = useState(0);
  const [projectionData, setProjectionData] = useState<DataPoint[]>([]);
  
  // Handle input changes with proper validation
  const handleNumberInput = (
    value: string, 
    setter: React.Dispatch<React.SetStateAction<string>>,
    allowNegative: boolean = false
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
    
    if (value === '-' || value === '-.') {
      if (allowNegative) {
        setter('-');
      }
      return;
    }
    
    // Validate the input format
    const regex = allowNegative 
      ? /^-?\d*\.?\d*$/ // Allow negative numbers
      : /^\d*\.?\d*$/;  // Only positive numbers
      
    if (regex.test(value)) {
      // Remove leading zeros for non-decimal numbers
      if (value.indexOf('.') !== 1 && value.startsWith('0') && value.length > 1 && !value.startsWith('0.')) {
        setter(value.replace(/^0+/, ''));
      } else {
        setter(value);
      }
    }
  };
  
  // Calculate CAGR
  const calculateCAGR = () => {
    if (initialValue <= 0 || finalValue <= 0 || years <= 0) {
      setCAGR(0);
      setGrowthMultiplier(0);
      setProjectionData([]);
      return;
    }
    
    // Calculate CAGR using the formula: (Final Value / Initial Value)^(1/years) - 1
    const calculatedCAGR = Math.pow(finalValue / initialValue, 1 / years) - 1;
    setCAGR(calculatedCAGR);
    
    // Calculate growth multiplier
    const calculatedGrowthMultiplier = finalValue / initialValue;
    setGrowthMultiplier(calculatedGrowthMultiplier);
    
    // Generate projection data for chart
    const data: DataPoint[] = [];
    for (let year = 0; year <= years; year++) {
      const projectedValue = initialValue * Math.pow(1 + calculatedCAGR, year);
      data.push({
        year,
        value: parseFloat(projectedValue.toFixed(2))
      });
    }
    setProjectionData(data);
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  // Format percentage
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };
  
  // Calculate on input change
  useEffect(() => {
    calculateCAGR();
  }, [initialValueStr, finalValueStr, yearsStr]);
  
  // Chart data
  const chartData = {
    labels: projectionData.map(point => `Year ${point.year}`),
    datasets: [
      {
        label: 'Investment Value',
        data: projectionData.map(point => point.value),
        borderColor: 'rgb(34, 197, 94)', // green-500
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.3,
      }
    ],
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb', // text-gray-200
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'CAGR Projection',
        color: '#e5e7eb', // text-gray-200
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)' // gray-600 with opacity
        },
        ticks: {
          color: '#9ca3af' // text-gray-400
        }
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)' // gray-600 with opacity
        },
        ticks: {
          color: '#9ca3af', // text-gray-400
          callback: function(value: any) {
            return formatCurrency(value);
          }
        }
      }
    }
  };
  
  return (
    <div className="bg-gray-900 text-gray-100 rounded-lg shadow-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-white">CAGR Calculator Inputs</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Currency</label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="£">GBP (£)</option>
                <option value="¥">JPY (¥)</option>
                <option value="₹">INR (₹)</option>
                <option value="C$">CAD (C$)</option>
                <option value="A$">AUD (A$)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Initial Value</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  {currency}
                </span>
                <input 
                  type="tel" 
                  value={initialValueStr} 
                  onChange={(e) => handleNumberInput(e.target.value, setInitialValueStr)}
                  className="w-full pl-8 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="0"
                  {...decimalInputProps}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Final Value</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  {currency}
                </span>
                <input 
                  type="tel" 
                  value={finalValueStr} 
                  onChange={(e) => handleNumberInput(e.target.value, setFinalValueStr)}
                  className="w-full pl-8 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="0"
                  {...decimalInputProps}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Time Period (Years)</label>
              <input 
                type="tel" 
                value={yearsStr} 
                onChange={(e) => handleNumberInput(e.target.value, setYearsStr)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="0"
                {...decimalInputProps}
              />
            </div>
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-white">CAGR Results</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-1">Compound Annual Growth Rate (CAGR)</h3>
              <p className="text-2xl font-bold text-orange-500">{formatPercentage(cagr)}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Initial Value</h3>
                <p className="text-xl font-bold text-blue-500">{formatCurrency(initialValue)}</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Final Value</h3>
                <p className="text-xl font-bold text-green-500">{formatCurrency(finalValue)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Time Period</h3>
                <p className="text-xl font-bold text-blue-500">{years} {years === 1 ? 'Year' : 'Years'}</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Growth Multiplier</h3>
                <p className="text-xl font-bold text-green-500">{growthMultiplier.toFixed(2)}x</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-white">Growth Projection</h2>
        <div className="h-[400px] w-full bg-gray-700 rounded-lg p-4">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
      
      {/* Explanation */}
      <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-white">About CAGR</h2>
        <p className="text-gray-300 mb-4">
          Compound Annual Growth Rate (CAGR) is a measure of the mean annual growth rate of an investment over a specified time period longer than one year. It represents one of the most accurate ways to calculate and determine returns for anything that can rise or fall in value over time.
        </p>
        <p className="text-gray-300 mb-4">
          The formula for CAGR is:
        </p>
        <div className="p-3 bg-gray-700 rounded-md mb-4">
          <p className="font-mono text-gray-300">CAGR = (Final Value / Initial Value)^(1/years) - 1</p>
        </div>
        <p className="text-gray-300 mb-4">
          CAGR is useful for comparing investments with different time periods or comparing the growth rates of different investments over the same period.
        </p>
        <p className="text-gray-300">
          Note: CAGR smooths out the volatility of returns over the investment period, showing a steady growth rate. It does not reflect the actual year-to-year performance or volatility of the investment.
        </p>
      </div>
    </div>
  );
};

export default CAGRCalculator; 