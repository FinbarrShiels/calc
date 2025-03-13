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
  Legend
);

interface SavingsRow {
  month: number;
  contribution: number;
  interest: number;
  balance: number;
  totalContributions: number;
  totalInterest: number;
}

const HowLongToSaveCalculator = () => {
  // State for form inputs
  const [currency, setCurrency] = useState('$');
  const [initialSavingsStr, setInitialSavingsStr] = useState('1000');
  const [targetAmountStr, setTargetAmountStr] = useState('10000');
  const [contributionAmountStr, setContributionAmountStr] = useState('500');
  const [contributionFrequency, setContributionFrequency] = useState('monthly');
  const [interestRateStr, setInterestRateStr] = useState('5');
  const [compoundFrequency, setCompoundFrequency] = useState('Monthly (12/yr)');

  // Derived numeric values for calculations
  const initialSavings = parseFloat(initialSavingsStr) || 0;
  const targetAmount = parseFloat(targetAmountStr) || 0;
  const contributionAmount = parseFloat(contributionAmountStr) || 0;
  const interestRate = parseFloat(interestRateStr) || 0;

  // State for calculation results
  const [timeToReachGoal, setTimeToReachGoal] = useState({ years: 0, months: 0 });
  const [finalBalance, setFinalBalance] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [savingsSchedule, setSavingsSchedule] = useState<SavingsRow[]>([]);
  const [viewMode, setViewMode] = useState('table');

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

  // Calculate how long to save
  const calculateTimeToSave = () => {
    // Get compound frequency number
    let compoundsPerYear = 12; // Default to monthly
    if (compoundFrequency === 'Annually (1/yr)') compoundsPerYear = 1;
    if (compoundFrequency === 'Semi-annually (2/yr)') compoundsPerYear = 2;
    if (compoundFrequency === 'Quarterly (4/yr)') compoundsPerYear = 4;
    if (compoundFrequency === 'Monthly (12/yr)') compoundsPerYear = 12;
    if (compoundFrequency === 'Daily (365/yr)') compoundsPerYear = 365;

    // Calculate contribution frequency
    let contributionsPerYear = 12; // Default to monthly
    if (contributionFrequency === 'annually') contributionsPerYear = 1;
    if (contributionFrequency === 'quarterly') contributionsPerYear = 4;
    if (contributionFrequency === 'monthly') contributionsPerYear = 12;
    if (contributionFrequency === 'bi-weekly') contributionsPerYear = 26;
    if (contributionFrequency === 'weekly') contributionsPerYear = 52;

    // Convert interest rate to decimal
    const rate = interestRate / 100;
    
    // Calculate periodic interest rate
    const periodicRate = rate / compoundsPerYear;
    
    // Initialize variables
    let currentBalance = initialSavings;
    let month = 0;
    let totalContributionsAmount = 0;
    let totalInterestAmount = 0;
    const schedule: SavingsRow[] = [];
    
    // Add initial state
    schedule.push({
      month: 0,
      contribution: 0,
      interest: 0,
      balance: currentBalance,
      totalContributions: 0,
      totalInterest: 0
    });
    
    // Calculate time to reach target
    const maxMonths = 600; // Cap at 50 years to prevent infinite loops
    
    while (currentBalance < targetAmount && month < maxMonths) {
      month++;
      
      // Calculate contribution for this month
      let monthlyContribution = 0;
      if (month % (12 / contributionsPerYear) === 0) {
        monthlyContribution = contributionAmount;
        totalContributionsAmount += contributionAmount;
        currentBalance += contributionAmount;
      }
      
      // Calculate interest for this month
      let monthlyInterest = 0;
      
      // For each compound period in the month
      const periodsPerMonth = compoundsPerYear / 12;
      for (let period = 0; period < periodsPerMonth; period++) {
        const periodInterest = currentBalance * periodicRate;
        monthlyInterest += periodInterest;
        currentBalance += periodInterest;
      }
      
      totalInterestAmount += monthlyInterest;
      
      // Add to schedule
      schedule.push({
        month,
        contribution: parseFloat(monthlyContribution.toFixed(2)),
        interest: parseFloat(monthlyInterest.toFixed(2)),
        balance: parseFloat(currentBalance.toFixed(2)),
        totalContributions: parseFloat(totalContributionsAmount.toFixed(2)),
        totalInterest: parseFloat(totalInterestAmount.toFixed(2))
      });
    }
    
    // Set results
    const years = Math.floor(month / 12);
    const remainingMonths = month % 12;
    
    setTimeToReachGoal({ years, months: remainingMonths });
    setFinalBalance(parseFloat(currentBalance.toFixed(2)));
    setTotalContributions(parseFloat(totalContributionsAmount.toFixed(2)));
    setTotalInterest(parseFloat(totalInterestAmount.toFixed(2)));
    setSavingsSchedule(schedule);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Format time
  const formatTime = (years: number, months: number) => {
    const yearText = years === 1 ? 'year' : 'years';
    const monthText = months === 1 ? 'month' : 'months';
    
    if (years === 0) {
      return `${months} ${monthText}`;
    } else if (months === 0) {
      return `${years} ${yearText}`;
    } else {
      return `${years} ${yearText}, ${months} ${monthText}`;
    }
  };

  // Calculate on input change
  useEffect(() => {
    calculateTimeToSave();
  }, [
    initialSavingsStr,
    targetAmountStr,
    contributionAmountStr,
    contributionFrequency,
    interestRateStr,
    compoundFrequency
  ]);

  // Chart data
  const chartData = {
    labels: savingsSchedule.map(row => `Month ${row.month}`),
    datasets: [
      {
        label: 'Balance',
        data: savingsSchedule.map(row => row.balance),
        borderColor: 'rgba(59, 130, 246, 1)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'Contributions',
        data: savingsSchedule.map(row => row.totalContributions),
        borderColor: 'rgba(16, 185, 129, 1)', // green-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'Interest',
        data: savingsSchedule.map(row => row.totalInterest),
        borderColor: 'rgba(249, 115, 22, 1)', // orange-500
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
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
        text: 'Savings Growth Over Time',
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
          maxRotation: 45,
          minRotation: 45,
          callback: function(value: any, index: number) {
            // Show fewer labels for readability
            const month = savingsSchedule[index]?.month;
            if (month % 6 === 0 || index === savingsSchedule.length - 1) {
              return `Month ${month}`;
            }
            return '';
          }
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
    <div className="bg-white dark:bg-gray-800 text-white dark:text-gray-900 rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="calculator-card-alt rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Savings Goal Calculator</h2>
          
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
              <option value="¥">JPY (¥)</option>
              <option value="C$">CAD (C$)</option>
              <option value="A$">AUD (A$)</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Initial Savings</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
              <input
                type="tel"
                className="calculator-input"
                value={initialSavingsStr}
                onChange={(e) => handleNumberInput(e.target.value, setInitialSavingsStr)} {...decimalInputProps}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Target Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
              <input
                type="tel"
                className="calculator-input"
                value={targetAmountStr}
                onChange={(e) => handleNumberInput(e.target.value, setTargetAmountStr)} {...decimalInputProps}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Regular Contribution</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
              <input
                type="tel"
                className="calculator-input"
                value={contributionAmountStr}
                onChange={(e) => handleNumberInput(e.target.value, setContributionAmountStr)} {...decimalInputProps}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Contribution Frequency</label>
            <select 
              className="calculator-input"
              value={contributionFrequency}
              onChange={(e) => setContributionFrequency(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Annual Interest Rate (%)</label>
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
              <option value="Annually (1/yr)">Annually (1/yr)</option>
              <option value="Semi-annually (2/yr)">Semi-annually (2/yr)</option>
              <option value="Quarterly (4/yr)">Quarterly (4/yr)</option>
              <option value="Monthly (12/yr)">Monthly (12/yr)</option>
              <option value="Daily (365/yr)">Daily (365/yr)</option>
            </select>
          </div>
        </div>
        
        {/* Results */}
        <div className="calculator-card-alt rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Results</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Time to Reach Goal</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {formatTime(timeToReachGoal.years, timeToReachGoal.months)}
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Final Balance</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatCurrency(finalBalance)}</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Total Contributions</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatCurrency(totalContributions)}</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Total Interest</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatCurrency(totalInterest)}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-blue-400">Savings Growth</h3>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 rounded ${viewMode === 'table' ? 'bg-blue-600 text-gray-900 dark:text-white-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-300'}`}
                  onClick={() => setViewMode('table')}
                >
                  Table
                </button>
                <button
                  className={`px-3 py-1 rounded ${viewMode === 'chart' ? 'bg-blue-600 text-gray-900 dark:text-white-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-300'}`}
                  onClick={() => setViewMode('chart')}
                >
                  Chart
                </button>
              </div>
            </div>
            
            {viewMode === 'chart' && (
              <div className="h-80 w-full">
                <Line data={chartData} options={chartOptions} />
              </div>
            )}
            
            {viewMode === 'table' && (
              <div className="overflow-x-auto">
                <table className="calculator-table">
                  <thead>
                    <tr>
                      <th className="calculator-table-header">Month</th>
                      <th className="calculator-table-header">Contribution</th>
                      <th className="calculator-table-header">Interest</th>
                      <th className="calculator-table-header">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savingsSchedule.filter((row, index) => 
                      // Show first 5 rows, then every 6th month, and the last row
                      index < 5 || index === savingsSchedule.length - 1 || row.month % 6 === 0
                    ).map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-muted' : 'bg-gray-750'}>
                        <td className="calculator-table-cell">{row.month}</td>
                        <td className="calculator-table-cell">{formatCurrency(row.contribution)}</td>
                        <td className="calculator-table-cell">{formatCurrency(row.interest)}</td>
                        <td className="calculator-table-cell">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-blue-400">Breakdown</h3>
            <div className="flex items-center mb-2">
              <div className="calculator-input">
                <div 
                  className="bg-green-500 h-4 rounded-full" 
                  style={{ width: `${(totalContributions / finalBalance) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-gray-300">{((totalContributions / finalBalance) * 100).toFixed(1)}%</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Contributions</p>
            
            <div className="flex items-center mt-3 mb-2">
              <div className="calculator-input">
                <div 
                  className="bg-orange-500 h-4 rounded-full" 
                  style={{ width: `${(totalInterest / finalBalance) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-gray-300">{((totalInterest / finalBalance) * 100).toFixed(1)}%</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Interest</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowLongToSaveCalculator; 