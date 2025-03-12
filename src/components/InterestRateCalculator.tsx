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
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

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

interface GrowthRow {
  year: number;
  contribution: number;
  interest: number;
  balance: number;
  totalContributions: number;
  totalInterest: number;
}

const InterestRateCalculator = () => {
  // State for form inputs
  const [currency, setCurrency] = useState('$');
  const [initialAmountStr, setInitialAmountStr] = useState('10000');
  const [targetAmountStr, setTargetAmountStr] = useState('50000');
  const [contributionAmountStr, setContributionAmountStr] = useState('200');
  const [contributionFrequency, setContributionFrequency] = useState('monthly');
  const [timeYearsStr, setTimeYearsStr] = useState('10');
  const [compoundFrequency, setCompoundFrequency] = useState('Monthly (12/yr)');
  const [calculationMethod, setCalculationMethod] = useState('iterative');

  // Derived numeric values for calculations
  const initialAmount = parseFloat(initialAmountStr) || 0;
  const targetAmount = parseFloat(targetAmountStr) || 0;
  const contributionAmount = parseFloat(contributionAmountStr) || 0;
  const timeYears = parseFloat(timeYearsStr) || 0;

  // State for calculation results
  const [interestRate, setInterestRate] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [growthSchedule, setGrowthSchedule] = useState<GrowthRow[]>([]);
  const [viewMode, setViewMode] = useState('table');
  const [isCalculating, setIsCalculating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  // Calculate interest rate using iterative method
  const calculateInterestRateIterative = () => {
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

    // Validate inputs
    if (initialAmount < 0 || targetAmount <= 0 || timeYears <= 0) {
      setErrorMessage('Please enter valid positive values for initial amount, target amount, and time period.');
      return;
    }

    if (targetAmount <= initialAmount && contributionAmount <= 0) {
      setErrorMessage('Target amount must be greater than initial amount if there are no contributions.');
      return;
    }

    // Clear any previous error
    setErrorMessage('');
    setIsCalculating(true);

    // Binary search to find the interest rate
    let minRate = -0.99; // -99% (allowing for negative rates in extreme cases)
    let maxRate = 1.0; // 100%
    let guessRate = 0.05; // Start with 5%
    let currentBalance = 0;
    let iterations = 0;
    const maxIterations = 100;
    const tolerance = 0.0001; // 0.01% precision

    while (iterations < maxIterations) {
      iterations++;
      
      // Calculate final balance with current guess rate
      currentBalance = calculateFinalBalance(guessRate, compoundsPerYear, contributionsPerYear);
      
      // Check if we're close enough
      if (Math.abs(currentBalance - targetAmount) / targetAmount < tolerance) {
        break;
      }
      
      // Adjust our guess
      if (currentBalance < targetAmount) {
        minRate = guessRate;
      } else {
        maxRate = guessRate;
      }
      
      guessRate = (minRate + maxRate) / 2;
    }

    // If we couldn't converge, check if it's impossible
    if (iterations >= maxIterations) {
      // Check if target is impossible to reach
      const maxPossibleBalance = calculateFinalBalance(1.0, compoundsPerYear, contributionsPerYear);
      
      if (maxPossibleBalance < targetAmount) {
        setErrorMessage('Target amount cannot be reached within the given time period, even with 100% interest rate.');
        setIsCalculating(false);
        return;
      }
      
      // Check if target is too low (requires negative interest)
      const minPossibleBalance = calculateFinalBalance(-0.99, compoundsPerYear, contributionsPerYear);
      
      if (minPossibleBalance > targetAmount) {
        setErrorMessage('Target amount is too low for the given time period and contributions.');
        setIsCalculating(false);
        return;
      }
    }

    // Calculate the growth schedule with the found rate
    const schedule = calculateGrowthSchedule(guessRate, compoundsPerYear, contributionsPerYear);
    const lastRow = schedule[schedule.length - 1];

    // Set results
    setInterestRate(guessRate * 100);
    setFinalBalance(lastRow.balance);
    setTotalContributions(lastRow.totalContributions);
    setTotalInterest(lastRow.totalInterest);
    setGrowthSchedule(schedule);
    setIsCalculating(false);
  };

  // Calculate final balance for a given interest rate
  const calculateFinalBalance = (rate: number, compoundsPerYear: number, contributionsPerYear: number) => {
    const periodicRate = rate / compoundsPerYear;
    const totalPeriods = timeYears * compoundsPerYear;
    const periodsPerContribution = compoundsPerYear / contributionsPerYear;
    
    let balance = initialAmount;
    let contributionsMade = 0;
    
    for (let period = 1; period <= totalPeriods; period++) {
      // Add interest
      balance *= (1 + periodicRate);
      
      // Add contribution if it's time
      if (period % periodsPerContribution === 0) {
        balance += contributionAmount;
        contributionsMade++;
      }
    }
    
    return balance;
  };

  // Calculate growth schedule for the found interest rate
  const calculateGrowthSchedule = (rate: number, compoundsPerYear: number, contributionsPerYear: number) => {
    const periodicRate = rate / compoundsPerYear;
    const totalYears = Math.ceil(timeYears);
    const periodsPerContribution = compoundsPerYear / contributionsPerYear;
    
    let balance = initialAmount;
    let totalContributionsAmount = 0;
    let totalInterestAmount = 0;
    const schedule: GrowthRow[] = [];
    
    // Add initial state
    schedule.push({
      year: 0,
      contribution: 0,
      interest: 0,
      balance,
      totalContributions: 0,
      totalInterest: 0
    });
    
    for (let year = 1; year <= totalYears; year++) {
      let yearlyContribution = 0;
      let yearlyInterest = 0;
      
      // Calculate each compound period within the year
      for (let period = 1; period <= compoundsPerYear; period++) {
        const periodIndex = (year - 1) * compoundsPerYear + period;
        
        // Calculate interest for this period
        const periodInterest = balance * periodicRate;
        yearlyInterest += periodInterest;
        balance += periodInterest;
        
        // Add contribution if it's time
        if (periodIndex % periodsPerContribution === 0 && year <= timeYears) {
          balance += contributionAmount;
          yearlyContribution += contributionAmount;
          totalContributionsAmount += contributionAmount;
        }
      }
      
      totalInterestAmount += yearlyInterest;
      
      // Add to schedule
      schedule.push({
        year,
        contribution: parseFloat(yearlyContribution.toFixed(2)),
        interest: parseFloat(yearlyInterest.toFixed(2)),
        balance: parseFloat(balance.toFixed(2)),
        totalContributions: parseFloat(totalContributionsAmount.toFixed(2)),
        totalInterest: parseFloat(totalInterestAmount.toFixed(2))
      });
      
      // Stop if we've reached the exact time
      if (year >= timeYears) {
        break;
      }
    }
    
    return schedule;
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Calculate on button click
  const handleCalculate = () => {
    if (calculationMethod === 'iterative') {
      calculateInterestRateIterative();
    }
  };

  // Chart data
  const chartData = {
    labels: growthSchedule.map(row => `Year ${row.year}`),
    datasets: [
      {
        label: 'Balance',
        data: growthSchedule.map(row => row.balance),
        borderColor: 'rgba(59, 130, 246, 1)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'Contributions',
        data: growthSchedule.map(row => row.totalContributions),
        borderColor: 'rgba(16, 185, 129, 1)', // green-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'Interest',
        data: growthSchedule.map(row => row.totalInterest),
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
        text: 'Growth Over Time',
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
    <div className="bg-white dark:bg-gray-800 text-white dark:text-gray-900 rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="calculator-card-alt rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Interest Rate Calculator</h2>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Currency</label>
            <select 
              className={inputClasses}
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
            <label className="block text-gray-300 mb-2">Initial Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
              <input
                type="tel"
                className={inputClasses}
                value={initialAmountStr}
                onChange={(e) => handleNumberInput(e.target.value, setInitialAmountStr)} {...decimalInputProps}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Target Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
              <input
                type="tel"
                className={inputClasses}
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
                className={inputClasses}
                value={contributionAmountStr}
                onChange={(e) => handleNumberInput(e.target.value, setContributionAmountStr)} {...decimalInputProps}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Contribution Frequency</label>
            <select 
              className={inputClasses}
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
            <label className="block text-gray-300 mb-2">Time Period (Years)</label>
            <input
              type="tel"
              className={inputClasses}
              value={timeYearsStr}
              onChange={(e) => handleNumberInput(e.target.value, setTimeYearsStr)} {...decimalInputProps}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Compound Frequency</label>
            <select 
              className={inputClasses}
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
          
          <div className="mb-4">
            <button
              className={inputClasses}
              onClick={handleCalculate}
              disabled={isCalculating}
            >
              {isCalculating ? 'Calculating...' : 'Calculate Interest Rate'}
            </button>
            
            {errorMessage && (
              <p className="mt-2 text-red-500">{errorMessage}</p>
            )}
          </div>
        </div>
        
        {/* Results */}
        <div className="calculator-card-alt rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Results</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Required Interest Rate</h3>
              <p className={resultValueClasses}>
                {formatPercentage(interestRate)}
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Final Balance</h3>
              <p className={resultValueClasses}>{formatCurrency(finalBalance)}</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Total Contributions</h3>
              <p className={resultValueClasses}>{formatCurrency(totalContributions)}</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Total Interest</h3>
              <p className={resultValueClasses}>{formatCurrency(totalInterest)}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-blue-400">Growth Projection</h3>
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
                      <th className="calculator-table-header">Year</th>
                      <th className="calculator-table-header">Contribution</th>
                      <th className="calculator-table-header">Interest</th>
                      <th className="calculator-table-header">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {growthSchedule.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-muted' : 'bg-gray-750'}>
                        <td className="calculator-table-cell">{row.year}</td>
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
              <div className={inputClasses}>
                <div 
                  className="bg-green-500 h-4 rounded-full" 
                  style={{ width: `${(totalContributions / finalBalance) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-gray-300">{((totalContributions / finalBalance) * 100).toFixed(1)}%</span>
            </div>
            <p className={resultLabelClasses}>Contributions</p>
            
            <div className="flex items-center mt-3 mb-2">
              <div className={inputClasses}>
                <div 
                  className="bg-orange-500 h-4 rounded-full" 
                  style={{ width: `${(totalInterest / finalBalance) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-gray-300">{((totalInterest / finalBalance) * 100).toFixed(1)}%</span>
            </div>
            <p className={resultLabelClasses}>Interest</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestRateCalculator; 