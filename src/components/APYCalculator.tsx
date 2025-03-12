"use client";

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const APYCalculator = () => {
  // State for form inputs
  const [currency, setCurrency] = useState('$');
  const [interestRateStr, setInterestRateStr] = useState('5');
  const [compoundFrequency, setCompoundFrequency] = useState('12'); // Monthly by default
  const [principalStr, setPrincipalStr] = useState('10000');
  const [timeYearsStr, setTimeYearsStr] = useState('1');
  
  // Derived numeric values for calculations
  const interestRate = parseFloat(interestRateStr) || 0;
  const principal = parseFloat(principalStr) || 0;
  const timeYears = parseFloat(timeYearsStr) || 0;
  
  // State for calculation results
  const [apy, setAPY] = useState(0);
  const [futureValue, setFutureValue] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);
  const [comparisonData, setComparisonData] = useState<{frequency: string, apy: number, futureValue: number}[]>([]);
  
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
  
  // Calculate APY based on interest rate and compound frequency
  const calculateAPY = () => {
    const rate = interestRate / 100;
    let calculatedAPY = 0;
    
    if (compoundFrequency === 'continuous') {
      // Continuous compounding formula: APY = e^r - 1
      calculatedAPY = Math.exp(rate) - 1;
    } else {
      // Standard compounding formula: APY = (1 + r/n)^n - 1
      const n = parseInt(compoundFrequency);
      calculatedAPY = Math.pow(1 + (rate / n), n) - 1;
    }
    
    // Calculate future value if principal and time are provided
    let calculatedFutureValue = 0;
    let calculatedInterestEarned = 0;
    
    if (principal > 0 && timeYears > 0) {
      calculatedFutureValue = principal * Math.pow(1 + calculatedAPY, timeYears);
      calculatedInterestEarned = calculatedFutureValue - principal;
    }
    
    // Update state with calculated values
    setAPY(calculatedAPY * 100); // Convert to percentage
    setFutureValue(calculatedFutureValue);
    setInterestEarned(calculatedInterestEarned);
    
    // Generate comparison data for different compounding frequencies
    generateComparisonData(rate);
  };
  
  // Generate comparison data for different compounding frequencies
  const generateComparisonData = (rate: number) => {
    const frequencies = [
      { value: '1', label: 'Annually' },
      { value: '2', label: 'Semi-Annually' },
      { value: '4', label: 'Quarterly' },
      { value: '12', label: 'Monthly' },
      { value: '52', label: 'Weekly' },
      { value: '365', label: 'Daily' },
      { value: 'continuous', label: 'Continuous' }
    ];
    
    const comparisonResults = frequencies.map(freq => {
      let calculatedAPY = 0;
      
      if (freq.value === 'continuous') {
        calculatedAPY = Math.exp(rate) - 1;
      } else {
        const n = parseInt(freq.value);
        calculatedAPY = Math.pow(1 + (rate / n), n) - 1;
      }
      
      let calculatedFutureValue = 0;
      if (principal > 0 && timeYears > 0) {
        calculatedFutureValue = principal * Math.pow(1 + calculatedAPY, timeYears);
      }
      
      return {
        frequency: freq.label,
        apy: calculatedAPY * 100, // Convert to percentage
        futureValue: calculatedFutureValue
      };
    });
    
    setComparisonData(comparisonResults);
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(3)}%`;
  };
  
  // Calculate results when inputs change
  useEffect(() => {
    calculateAPY();
  }, [interestRateStr, compoundFrequency, principalStr, timeYearsStr]);
  
  // Prepare chart data for APY comparison
  const chartData = {
    labels: comparisonData.map(item => item.frequency),
    datasets: [
      {
        label: 'APY (%)',
        data: comparisonData.map(item => item.apy),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
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
        text: 'APY by Compounding Frequency',
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
              label += context.parsed.y.toFixed(3) + '%';
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#9ca3af', // text-gray-400
          callback: function(value: any) {
            return value.toFixed(2) + '%';
          }
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.2)', // gray-600 with opacity
        }
      },
      x: {
        ticks: {
          color: '#9ca3af', // text-gray-400
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.2)', // gray-600 with opacity
        }
      }
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 text-white dark:text-gray-900 rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Input Form */}
        <div className="space-y-6">
          <div className="calculator-card rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-400">APY Calculator</h2>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Annual Interest Rate (APR)</label>
              <div className="relative">
                <input
                  type="tel"
                  className={inputClasses}
                  value={interestRateStr}
                  onChange={(e) => handleNumberInput(e.target.value, setInterestRateStr)} {...decimalInputProps}
                />
                <span className="absolute right-3 top-2 text-gray-400">%</span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Compound Frequency</label>
              <select 
                className={inputClasses}
                value={compoundFrequency}
                onChange={(e) => setCompoundFrequency(e.target.value)}
              >
                <option value="1">Annually</option>
                <option value="2">Semi-Annually</option>
                <option value="4">Quarterly</option>
                <option value="12">Monthly</option>
                <option value="26">Bi-Weekly</option>
                <option value="52">Weekly</option>
                <option value="365">Daily</option>
                <option value="continuous">Continuous</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Currency (for calculations)</label>
              <select 
                className={inputClasses}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="£">GBP (£)</option>
                <option value="₹">INR (₹)</option>
                <option value="¥">JPY (¥)</option>
                <option value="C$">CAD (C$)</option>
                <option value="A$">AUD (A$)</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Principal Amount (Optional)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
                <input
                  type="tel"
                  className={inputClasses}
                  value={principalStr}
                  onChange={(e) => handleNumberInput(e.target.value, setPrincipalStr)} {...decimalInputProps}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Time Period (Optional, Years)</label>
              <input
                type="tel"
                className={inputClasses}
                value={timeYearsStr}
                onChange={(e) => handleNumberInput(e.target.value, setTimeYearsStr)} {...decimalInputProps}
              />
            </div>
          </div>
          
          <div className="calculator-card rounded-lg p-6">
            <h3 className="text-lg font-bold mb-3 text-blue-400">APY Formula</h3>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300 font-mono">
                For standard compounding: APY = (1 + r/n)^n - 1
              </p>
              <p className="text-gray-300 font-mono mt-2">
                For continuous compounding: APY = e^r - 1
              </p>
              <p className="text-gray-400 text-sm mt-3">
                Where:<br />
                r = Annual interest rate (decimal)<br />
                n = Number of compounding periods per year
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Column: Results and Chart */}
        <div className="space-y-6">
          <div className="calculator-card rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-400">Results</h2>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Annual Percentage Yield (APY)</h3>
                <p className={resultValueClasses}>{formatPercentage(apy)}</p>
                <p className={resultLabelClasses}>
                  Effective annual rate with {compoundFrequency === 'continuous' ? 'continuous' : compoundFrequency} compounding periods per year
                </p>
              </div>
              
              {principal > 0 && timeYears > 0 && (
                <>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Future Value after {timeYears} {timeYears === 1 ? 'year' : 'years'}</h3>
                    <p className={resultValueClasses}>{formatCurrency(futureValue)}</p>
                    <p className={resultLabelClasses}>
                      Initial investment of {formatCurrency(principal)}
                    </p>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Interest Earned</h3>
                    <p className={resultValueClasses}>{formatCurrency(interestEarned)}</p>
                    <p className={resultLabelClasses}>
                      Total interest earned over {timeYears} {timeYears === 1 ? 'year' : 'years'}
                    </p>
                  </div>
                </>
              )}
            </div>
            
            <div className="h-80 w-full">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
          
          <div className="calculator-card rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-400">Compounding Frequency Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="calculator-table">
                <thead>
                  <tr>
                    <th className="calculator-table-header">Frequency</th>
                    <th className="calculator-table-header">APY</th>
                    {principal > 0 && timeYears > 0 && (
                      <th className="calculator-table-header">Future Value</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {comparisonData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-card' : 'bg-gray-750'}>
                      <td className="calculator-table-cell">{item.frequency}</td>
                      <td className="calculator-table-cell">{formatPercentage(item.apy)}</td>
                      {principal > 0 && timeYears > 0 && (
                        <td className="calculator-table-cell">{formatCurrency(item.futureValue)}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 calculator-card p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-blue-400">Understanding APY</h2>
        
        <div className="space-y-4 text-gray-300">
          <p>
            Annual Percentage Yield (APY) is the effective annual rate of return taking into account the effect of compounding interest. 
            Unlike Annual Percentage Rate (APR), which is a simple interest rate, APY reflects the total amount of interest you'll earn 
            over a year, assuming you don't withdraw any earnings.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className={calculatorSectionHeaderClasses}>APY vs. APR</h3>
              <p className="mb-2">
                <span className="font-semibold">APR (Annual Percentage Rate):</span> The stated interest rate without accounting for compounding.
              </p>
              <p>
                <span className="font-semibold">APY (Annual Percentage Yield):</span> The effective interest rate when accounting for compounding frequency.
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className={calculatorSectionHeaderClasses}>Compounding Frequency</h3>
              <p>
                The more frequently interest compounds, the higher the APY will be for a given APR. 
                Continuous compounding provides the highest possible APY for a given interest rate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APYCalculator; 