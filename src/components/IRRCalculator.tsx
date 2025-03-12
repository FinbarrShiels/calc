"use client";

import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { decimalInputProps, numericInputProps } from '@/utils/inputUtils';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CashFlow {
  id: number;
  year: number;
  amount: number;
}

const IRRCalculator = () => {
  // State for form inputs
  const [currency, setCurrency] = useState('$');
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([
    { id: 0, year: 0, amount: -10000 },
    { id: 1, year: 1, amount: 3000 },
    { id: 2, year: 2, amount: 4000 },
    { id: 3, year: 3, amount: 5000 },
    { id: 4, year: 4, amount: 6000 }
  ]);
  const [nextId, setNextId] = useState(5);
  const [irr, setIrr] = useState<number | null>(null);
  const [npv, setNpv] = useState<number | null>(null);
  const [testRate, setTestRateStr] = useState('10');
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState('chart');
  const [chartType, setChartType] = useState('bar');

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

  // Handle cash flow amount change
  const handleCashFlowChange = (id: number, value: string) => {
    setCashFlows(prevFlows => 
      prevFlows.map(flow => 
        flow.id === id 
          ? { ...flow, amount: value === '' ? 0 : parseFloat(value) } 
          : flow
      )
    );
  };

  // Handle cash flow year change
  const handleYearChange = (id: number, value: string) => {
    const yearValue = value === '' ? 0 : parseInt(value);
    setCashFlows(prevFlows => 
      prevFlows.map(flow => 
        flow.id === id 
          ? { ...flow, year: yearValue } 
          : flow
      )
    );
  };

  // Add a new cash flow
  const addCashFlow = () => {
    const lastFlow = cashFlows[cashFlows.length - 1];
    const newYear = lastFlow ? lastFlow.year + 1 : 0;
    setCashFlows([...cashFlows, { id: nextId, year: newYear, amount: 0 }]);
    setNextId(nextId + 1);
  };

  // Remove a cash flow
  const removeCashFlow = (id: number) => {
    if (cashFlows.length > 1) {
      setCashFlows(cashFlows.filter(flow => flow.id !== id));
    }
  };

  // Calculate NPV (Net Present Value)
  const calculateNPV = (rate: number, flows: CashFlow[]) => {
    const sortedFlows = [...flows].sort((a, b) => a.year - b.year);
    
    return sortedFlows.reduce((npv, flow) => {
      return npv + flow.amount / Math.pow(1 + rate / 100, flow.year);
    }, 0);
  };

  // Calculate IRR using Newton-Raphson method
  const calculateIRR = () => {
    setError(null);
    
    // Check if we have at least one positive and one negative cash flow
    const hasPositive = cashFlows.some(flow => flow.amount > 0);
    const hasNegative = cashFlows.some(flow => flow.amount < 0);
    
    if (!hasPositive || !hasNegative) {
      setError('IRR calculation requires at least one positive and one negative cash flow');
      setIrr(null);
      return;
    }
    
    // Sort cash flows by year
    const sortedFlows = [...cashFlows].sort((a, b) => a.year - b.year);
    
    // Check if first cash flow is negative (investment)
    if (sortedFlows[0].amount > 0) {
      setError('The first cash flow should typically be negative (representing an initial investment)');
    }
    
    // Newton-Raphson method to find IRR
    let guess = 10; // Start with 10% as initial guess
    const maxIterations = 100;
    const tolerance = 0.0001;
    
    for (let i = 0; i < maxIterations; i++) {
      const npv = calculateNPV(guess, sortedFlows);
      
      // Calculate derivative of NPV function
      const delta = 0.0001;
      const derivative = (calculateNPV(guess + delta, sortedFlows) - npv) / delta;
      
      // Check if we're close enough to zero
      if (Math.abs(npv) < tolerance) {
        setIrr(guess);
        return;
      }
      
      // Avoid division by zero
      if (Math.abs(derivative) < 1e-10) {
        break;
      }
      
      // Update guess using Newton-Raphson formula
      const newGuess = guess - npv / derivative;
      
      // Check for convergence
      if (Math.abs(newGuess - guess) < tolerance) {
        setIrr(newGuess);
        return;
      }
      
      // Update guess for next iteration
      guess = newGuess;
      
      // Check for unreasonable values
      if (guess > 1000 || guess < -1000) {
        break;
      }
    }
    
    // If we get here, the method didn't converge
    setError('Could not calculate IRR. Try adjusting your cash flows.');
    setIrr(null);
  };

  // Calculate NPV with the test rate
  const calculateTestNPV = () => {
    const rate = parseFloat(testRate) || 0;
    const npvValue = calculateNPV(rate, cashFlows);
    setNpv(npvValue);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Calculate on cash flow changes
  useEffect(() => {
    calculateIRR();
    calculateTestNPV();
  }, [cashFlows, testRate]);

  // Chart data
  const chartData = {
    labels: cashFlows.sort((a, b) => a.year - b.year).map(flow => `Year ${flow.year}`),
    datasets: [
      {
        label: 'Cash Flow',
        data: cashFlows.sort((a, b) => a.year - b.year).map(flow => flow.amount),
        backgroundColor: cashFlows.sort((a, b) => a.year - b.year).map(flow => 
          flow.amount >= 0 ? 'rgba(16, 185, 129, 0.6)' : 'rgba(239, 68, 68, 0.6)'
        ),
        borderColor: cashFlows.sort((a, b) => a.year - b.year).map(flow => 
          flow.amount >= 0 ? 'rgba(16, 185, 129, 1)' : 'rgba(239, 68, 68, 1)'
        ),
        borderWidth: 1
      }
    ]
  };

  // Cumulative cash flow data
  const cumulativeData = {
    labels: cashFlows.sort((a, b) => a.year - b.year).map(flow => `Year ${flow.year}`),
    datasets: [
      {
        label: 'Cumulative Cash Flow',
        data: cashFlows.sort((a, b) => a.year - b.year).reduce((acc: number[], flow, index) => {
          const prevValue = index > 0 ? acc[index - 1] : 0;
          acc.push(prevValue + flow.amount);
          return acc;
        }, []),
        borderColor: 'rgba(59, 130, 246, 1)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.1
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
        text: 'Cash Flows by Year',
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
        ticks: {
          color: '#9ca3af', // text-gray-400
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.2)', // gray-600 with opacity
        }
      },
      y: {
        ticks: {
          color: '#9ca3af', // text-gray-400
          callback: function(value: any) {
            return formatCurrency(value);
          }
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.2)', // gray-600 with opacity
        }
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Cash Flow Inputs</h2>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Currency</label>
            <select 
              className="w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
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
            <label className="block text-gray-300 mb-2">Test Discount Rate (%)</label>
            <div className="relative">
              <input
                type="tel"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded p-2 pr-8"
                value={testRate}
                onChange={(e) => handleNumberInput(e.target.value, setTestRateStr)} {...decimalInputProps}
              />
              <span className="absolute right-3 top-2 text-gray-400">%</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              This rate is used to calculate the Net Present Value (NPV)
            </p>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-300">Cash Flows</label>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                onClick={addCashFlow}
              >
                Add Cash Flow
              </button>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="grid grid-cols-12 gap-2 mb-2 text-sm text-gray-400">
                <div className="col-span-3">Year</div>
                <div className="col-span-8">Amount ({currency})</div>
                <div className="col-span-1"></div>
              </div>
              
              {cashFlows.sort((a, b) => a.year - b.year).map((flow) => (
                <div key={flow.id} className="grid grid-cols-12 gap-2 mb-2">
                  <div className="col-span-3">
                    <input
                      type="tel"
                      className="w-full bg-gray-600 text-white border border-gray-500 rounded p-2"
                      value={flow.year}
                      onChange={(e) => handleYearChange(flow.id, e.target.value)}
                      {...numericInputProps}
                    />
                  </div>
                  <div className="col-span-8">
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
                      <input
                        type="tel"
                        className="w-full bg-gray-600 text-white border border-gray-500 rounded p-2 pl-8"
                        value={flow.amount}
                        onChange={(e) => handleCashFlowChange(flow.id, e.target.value)}
                        {...decimalInputProps}
                      />
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <button
                      className="text-red-400 hover:text-red-300 transition-colors"
                      onClick={() => removeCashFlow(flow.id)}
                      disabled={cashFlows.length <= 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              
              <p className="text-sm text-gray-400 mt-4">
                <span className="text-red-400">Negative values</span> represent outflows (investments, costs).
                <br />
                <span className="text-green-400">Positive values</span> represent inflows (returns, income).
              </p>
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900 text-red-200 rounded-lg">
              {error}
            </div>
          )}
        </div>
        
        {/* Results */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Results</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Internal Rate of Return (IRR)</h3>
              <p className="text-2xl font-bold text-blue-400">
                {irr !== null ? formatPercentage(irr) : 'N/A'}
              </p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Net Present Value (NPV)</h3>
              <p className="text-2xl font-bold text-green-500">
                {npv !== null ? formatCurrency(npv) : 'N/A'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                at {formatPercentage(parseFloat(testRate) || 0)} discount rate
              </p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Total Investment</h3>
              <p className="text-2xl font-bold text-red-500">
                {formatCurrency(cashFlows.filter(flow => flow.amount < 0).reduce((sum, flow) => sum + flow.amount, 0))}
              </p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Total Returns</h3>
              <p className="text-2xl font-bold text-green-500">
                {formatCurrency(cashFlows.filter(flow => flow.amount > 0).reduce((sum, flow) => sum + flow.amount, 0))}
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-blue-400">Cash Flow Visualization</h3>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 rounded ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  onClick={() => setViewMode('table')}
                >
                  Table
                </button>
                <button
                  className={`px-3 py-1 rounded ${viewMode === 'chart' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  onClick={() => setViewMode('chart')}
                >
                  Chart
                </button>
              </div>
            </div>
            
            {viewMode === 'chart' && (
              <div>
                <div className="flex justify-end space-x-2 mb-2">
                  <button
                    className={`px-3 py-1 rounded ${chartType === 'bar' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setChartType('bar')}
                  >
                    Bar
                  </button>
                  <button
                    className={`px-3 py-1 rounded ${chartType === 'line' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setChartType('line')}
                  >
                    Line
                  </button>
                </div>
                
                <div className="h-80 w-full">
                  {chartType === 'bar' ? (
                    <Bar data={chartData} options={chartOptions} />
                  ) : (
                    <Line data={cumulativeData} options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: {
                          ...chartOptions.plugins.title,
                          text: 'Cumulative Cash Flow'
                        }
                      }
                    }} />
                  )}
                </div>
              </div>
            )}
            
            {viewMode === 'table' && (
              <div className="overflow-x-auto">
                <table className="calculator-table">
                  <thead>
                    <tr>
                      <th className="calculator-table-header">Year</th>
                      <th className="calculator-table-header">Cash Flow</th>
                      <th className="calculator-table-header">Cumulative</th>
                      <th className="calculator-table-header">Discounted at {testRate}%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cashFlows.sort((a, b) => a.year - b.year).map((flow, index, array) => {
                      const cumulative = array
                        .filter(f => f.year <= flow.year)
                        .reduce((sum, f) => sum + f.amount, 0);
                      
                      const discounted = flow.amount / Math.pow(1 + (parseFloat(testRate) || 0) / 100, flow.year);
                      
                      return (
                        <tr key={flow.id} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-750'}>
                          <td className="calculator-table-cell">{flow.year}</td>
                          <td className={`py-2 px-4 ${flow.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {formatCurrency(flow.amount)}
                          </td>
                          <td className={`py-2 px-4 ${cumulative >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {formatCurrency(cumulative)}
                          </td>
                          <td className={`py-2 px-4 ${discounted >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {formatCurrency(discounted)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-blue-400">IRR Interpretation</h3>
            <p className="text-gray-300 mb-2">
              {irr !== null ? (
                <>
                  The Internal Rate of Return (IRR) of {formatPercentage(irr)} represents the annualized rate of return for this investment.
                  {irr > (parseFloat(testRate) || 0) ? (
                    <span className="text-green-400"> This exceeds your discount rate of {formatPercentage(parseFloat(testRate) || 0)}, suggesting a potentially profitable investment.</span>
                  ) : (
                    <span className="text-red-400"> This is below your discount rate of {formatPercentage(parseFloat(testRate) || 0)}, suggesting the investment may not meet your required return.</span>
                  )}
                </>
              ) : (
                'Unable to calculate IRR for the provided cash flows.'
              )}
            </p>
            <p className="text-gray-300">
              {npv !== null && (
                <>
                  The Net Present Value (NPV) of {formatCurrency(npv)} at a {formatPercentage(parseFloat(testRate) || 0)} discount rate 
                  {npv > 0 ? (
                    <span className="text-green-400"> is positive, indicating the investment is expected to add value.</span>
                  ) : npv < 0 ? (
                    <span className="text-red-400"> is negative, indicating the investment may destroy value at this discount rate.</span>
                  ) : (
                    <span className="text-gray-400"> is zero, indicating the investment exactly meets your required return.</span>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IRRCalculator; 