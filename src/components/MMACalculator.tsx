"use client";

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { decimalInputProps } from '@/utils/inputUtils';


// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BreakdownRow {
  year: number;
  interest: number;
  accruedInterest: number;
  balance: number;
  contributions?: number;
  totalContributions?: number;
}

const MMACalculator = () => {
  // State for form inputs
  const [currency, setCurrency] = useState('$');
  const [initialDepositStr, setInitialDepositStr] = useState('10000');
  const [interestRateStr, setInterestRateStr] = useState('3.5');
  const [compoundFrequency, setCompoundFrequency] = useState('12'); // Monthly by default
  const [yearsStr, setYearsStr] = useState('5');
  const [additionalDepositStr, setAdditionalDepositStr] = useState('0');

  // Derived numeric values for calculations
  const initialDeposit = parseFloat(initialDepositStr) || 0;
  const interestRate = parseFloat(interestRateStr) || 0;
  const years = parseInt(yearsStr) || 0;
  const additionalDeposit = parseFloat(additionalDepositStr) || 0;

  // State for calculation results
  const [futureValue, setFutureValue] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [effectiveRate, setEffectiveRate] = useState(0);
  const [yearlyBreakdown, setYearlyBreakdown] = useState<BreakdownRow[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);

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

  // Calculate MMA interest
  const calculateMMAInterest = () => {
    // Get compound frequency number
    let compoundsPerYear = parseInt(compoundFrequency);
    
    // Calculate compound interest
    const rate = interestRate / 100;
    const effectiveAnnualRate = Math.pow(1 + (rate / compoundsPerYear), compoundsPerYear) - 1;
    
    // Calculate breakdown
    const calculatedYearlyBreakdown: BreakdownRow[] = [];
    
    let currentBalance = initialDeposit;
    let accruedInterest = 0;
    let totalContributions = initialDeposit;
    
    // Add initial row
    calculatedYearlyBreakdown.push({
      year: 0,
      interest: 0,
      accruedInterest: 0,
      balance: currentBalance,
      contributions: initialDeposit,
      totalContributions: initialDeposit
    });
    
    // Calculate for each year
    for (let year = 1; year <= years; year++) {
      let yearlyInterest = 0;
      let yearlyContributions = 0;
      
      // Calculate monthly values
      for (let month = 1; month <= 12; month++) {
        // Add monthly contribution
        if (additionalDeposit > 0) {
          currentBalance += additionalDeposit;
          yearlyContributions += additionalDeposit;
          totalContributions += additionalDeposit;
        }
        
        // Calculate interest for this month
        const monthlyRate = effectiveAnnualRate / 12;
        const monthlyInterest = currentBalance * monthlyRate;
        yearlyInterest += monthlyInterest;
        currentBalance += monthlyInterest;
      }
      
      accruedInterest += yearlyInterest;
      
      // Add to yearly breakdown
      calculatedYearlyBreakdown.push({
        year: year,
        interest: parseFloat(yearlyInterest.toFixed(2)),
        accruedInterest: parseFloat(accruedInterest.toFixed(2)),
        balance: parseFloat(currentBalance.toFixed(2)),
        contributions: parseFloat(yearlyContributions.toFixed(2)),
        totalContributions: parseFloat(totalContributions.toFixed(2))
      });
    }
    
    // Update state with calculated values
    setYearlyBreakdown(calculatedYearlyBreakdown);
    setFutureValue(parseFloat(currentBalance.toFixed(2)));
    setTotalInterest(parseFloat(accruedInterest.toFixed(2)));
    setEffectiveRate(parseFloat((effectiveAnnualRate * 100).toFixed(2)));
    setTotalContributions(parseFloat(totalContributions.toFixed(2)));
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Calculate results when inputs change
  useEffect(() => {
    calculateMMAInterest();
  }, [initialDepositStr, interestRateStr, compoundFrequency, yearsStr, additionalDepositStr]);

  // Prepare chart data
  const chartData = {
    labels: yearlyBreakdown.map(row => `Year ${row.year}`),
    datasets: [
      {
        label: 'Balance',
        data: yearlyBreakdown.map(row => row.balance),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Interest',
        data: yearlyBreakdown.map(row => row.accruedInterest),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Contributions',
        data: yearlyBreakdown.map(row => row.totalContributions),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

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
        text: 'Money Market Account Growth',
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
              label += currency + context.parsed.y.toLocaleString('en-US', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              });
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
            return currency + value.toLocaleString('en-US', { 
              minimumFractionDigits: 0, 
              maximumFractionDigits: 0 
            });
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
            <h2 className="text-xl font-bold mb-4 text-blue-400">Money Market Account Calculator</h2>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Currency</label>
              <select 
                className="calculator-input"
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
              <label className="block text-gray-300 mb-2">Initial Deposit</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
                <input
                  type="tel"
                  className="calculator-input"
                  value={initialDepositStr}
                  onChange={(e) => handleNumberInput(e.target.value, setInitialDepositStr)} {...decimalInputProps}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Annual Interest Rate (APY)</label>
              <div className="relative">
                <input
                  type="tel"
                  className="calculator-input"
                  value={interestRateStr}
                  onChange={(e) => handleNumberInput(e.target.value, setInterestRateStr)} {...decimalInputProps}
                />
                <span className="absolute right-3 top-2 text-gray-400">%</span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Compound Frequency</label>
              <select 
                className="calculator-input"
                value={compoundFrequency}
                onChange={(e) => setCompoundFrequency(e.target.value)}
              >
                <option value="1">Annually</option>
                <option value="2">Semi-Annually</option>
                <option value="4">Quarterly</option>
                <option value="12">Monthly</option>
                <option value="365">Daily</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Time Period (Years)</label>
              <input
                type="tel"
                className="calculator-input"
                value={yearsStr}
                onChange={(e) => handleNumberInput(e.target.value, setYearsStr)} {...decimalInputProps}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Monthly Additional Deposits</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
                <input
                  type="tel"
                  className="calculator-input"
                  value={additionalDepositStr}
                  onChange={(e) => handleNumberInput(e.target.value, setAdditionalDepositStr)} {...decimalInputProps}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Results and Chart */}
        <div className="space-y-6">
          <div className="calculator-card rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-400">Results</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Future Value</h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatCurrency(futureValue)}</p>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Total Interest</h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatCurrency(totalInterest)}</p>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Total Contributions</h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatCurrency(totalContributions)}</p>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Effective Annual Rate</h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{effectiveRate.toFixed(2)}%</p>
              </div>
            </div>
            
            <div className="h-80 w-full">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
          
          <div className="calculator-card rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-400">Yearly Breakdown</h2>
            
            <div className="overflow-x-auto">
              <table className="calculator-table">
                <thead>
                  <tr>
                    <th className="calculator-table-header">Year</th>
                    <th className="calculator-table-header">Interest</th>
                    <th className="calculator-table-header">Balance</th>
                    <th className="calculator-table-header">Contributions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {yearlyBreakdown.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-card' : 'bg-gray-750'}>
                      <td className="calculator-table-cell">Year {row.year}</td>
                      <td className="calculator-table-cell">{formatCurrency(row.interest)}</td>
                      <td className="calculator-table-cell">{formatCurrency(row.balance)}</td>
                      <td className="calculator-table-cell">{formatCurrency(row.contributions || 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 calculator-card p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-blue-400">About Money Market Accounts</h2>
        
        <div className="space-y-4 text-gray-300">
          <p>
            Money Market Accounts (MMAs) are interest-bearing accounts that typically offer higher interest rates than regular savings accounts, while still providing liquidity and FDIC insurance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="calculator-section-header">Benefits</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Higher interest rates than regular savings</li>
                <li>FDIC insured (up to $250,000)</li>
                <li>Check writing and debit card access</li>
                <li>Relatively liquid compared to CDs</li>
              </ul>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="calculator-section-header">Considerations</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>May require higher minimum balances</li>
                <li>Limited transactions per month</li>
                <li>May have monthly fees</li>
                <li>Rates may be variable and change over time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MMACalculator; 