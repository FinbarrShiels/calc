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

interface WithdrawalRow {
  month: number;
  withdrawal: number;
  interest: number;
  balance: number;
  totalWithdrawals: number;
  totalInterest: number;
}

const HowLongWillMoneyLastCalculator = () => {
  // State for form inputs
  const [currency, setCurrency] = useState('$');
  const [initialBalanceStr, setInitialBalanceStr] = useState('500000');
  const [withdrawalAmountStr, setWithdrawalAmountStr] = useState('2500');
  const [withdrawalFrequency, setWithdrawalFrequency] = useState('monthly');
  const [interestRateStr, setInterestRateStr] = useState('4');
  const [compoundFrequency, setCompoundFrequency] = useState('Monthly (12/yr)');
  const [inflationRateStr, setInflationRateStr] = useState('2.5');
  const [adjustForInflation, setAdjustForInflation] = useState(false);

  // Derived numeric values for calculations
  const initialBalance = parseFloat(initialBalanceStr) || 0;
  const withdrawalAmount = parseFloat(withdrawalAmountStr) || 0;
  const interestRate = parseFloat(interestRateStr) || 0;
  const inflationRate = parseFloat(inflationRateStr) || 0;

  // State for calculation results
  const [timeToDeplete, setTimeToDeplete] = useState({ years: 0, months: 0 });
  const [finalBalance, setFinalBalance] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [withdrawalSchedule, setWithdrawalSchedule] = useState<WithdrawalRow[]>([]);
  const [viewMode, setViewMode] = useState('table');
  const [willLastForever, setWillLastForever] = useState(false);

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

  // Calculate how long money will last
  const calculateTimeToDeplete = () => {
    // Get compound frequency number
    let compoundsPerYear = 12; // Default to monthly
    if (compoundFrequency === 'Annually (1/yr)') compoundsPerYear = 1;
    if (compoundFrequency === 'Semi-annually (2/yr)') compoundsPerYear = 2;
    if (compoundFrequency === 'Quarterly (4/yr)') compoundsPerYear = 4;
    if (compoundFrequency === 'Monthly (12/yr)') compoundsPerYear = 12;
    if (compoundFrequency === 'Daily (365/yr)') compoundsPerYear = 365;

    // Calculate withdrawal frequency
    let withdrawalsPerYear = 12; // Default to monthly
    if (withdrawalFrequency === 'annually') withdrawalsPerYear = 1;
    if (withdrawalFrequency === 'quarterly') withdrawalsPerYear = 4;
    if (withdrawalFrequency === 'monthly') withdrawalsPerYear = 12;
    if (withdrawalFrequency === 'bi-weekly') withdrawalsPerYear = 26;
    if (withdrawalFrequency === 'weekly') withdrawalsPerYear = 52;

    // Convert interest rate to decimal
    const rate = interestRate / 100;
    
    // Calculate periodic interest rate
    const periodicRate = rate / compoundsPerYear;
    
    // Calculate inflation adjustment factor (monthly)
    const monthlyInflationRate = adjustForInflation ? (inflationRate / 100) / 12 : 0;
    
    // Initialize variables
    let currentBalance = initialBalance;
    let month = 0;
    let totalWithdrawalsAmount = 0;
    let totalInterestAmount = 0;
    let currentWithdrawalAmount = withdrawalAmount;
    const schedule: WithdrawalRow[] = [];
    
    // Add initial state
    schedule.push({
      month: 0,
      withdrawal: 0,
      interest: 0,
      balance: currentBalance,
      totalWithdrawals: 0,
      totalInterest: 0
    });
    
    // Calculate time to deplete
    const maxMonths = 1200; // Cap at 100 years to prevent infinite loops
    let forever = false;
    
    while (currentBalance > 0 && month < maxMonths) {
      month++;
      
      // Adjust withdrawal amount for inflation if enabled
      if (adjustForInflation && month > 1) {
        currentWithdrawalAmount *= (1 + monthlyInflationRate);
      }
      
      // Calculate withdrawal for this month
      let monthlyWithdrawal = 0;
      if (month % (12 / withdrawalsPerYear) === 0) {
        // Ensure we don't withdraw more than the balance
        monthlyWithdrawal = Math.min(currentWithdrawalAmount, currentBalance);
        totalWithdrawalsAmount += monthlyWithdrawal;
        currentBalance -= monthlyWithdrawal;
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
        withdrawal: parseFloat(monthlyWithdrawal.toFixed(2)),
        interest: parseFloat(monthlyInterest.toFixed(2)),
        balance: parseFloat(currentBalance.toFixed(2)),
        totalWithdrawals: parseFloat(totalWithdrawalsAmount.toFixed(2)),
        totalInterest: parseFloat(totalInterestAmount.toFixed(2))
      });
      
      // Check if money will last forever (interest exceeds withdrawals)
      if (month > 12 && month % 12 === 0) {
        const lastYearInterest = schedule
          .slice(-12)
          .reduce((sum, row) => sum + row.interest, 0);
          
        const lastYearWithdrawals = schedule
          .slice(-12)
          .reduce((sum, row) => sum + row.withdrawal, 0);
          
        if (lastYearInterest >= lastYearWithdrawals && currentBalance >= initialBalance) {
          forever = true;
          break;
        }
      }
    }
    
    // Set results
    setWillLastForever(forever);
    
    const years = Math.floor(month / 12);
    const remainingMonths = month % 12;
    
    setTimeToDeplete({ years, months: remainingMonths });
    setFinalBalance(parseFloat(currentBalance.toFixed(2)));
    setTotalWithdrawals(parseFloat(totalWithdrawalsAmount.toFixed(2)));
    setTotalInterest(parseFloat(totalInterestAmount.toFixed(2)));
    setWithdrawalSchedule(schedule);
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
    if (willLastForever) {
      return "Forever";
    }
    
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
    calculateTimeToDeplete();
  }, [
    initialBalanceStr,
    withdrawalAmountStr,
    withdrawalFrequency,
    interestRateStr,
    compoundFrequency,
    inflationRateStr,
    adjustForInflation
  ]);

  // Chart data
  const chartData = {
    labels: withdrawalSchedule.map(row => `Month ${row.month}`),
    datasets: [
      {
        label: 'Balance',
        data: withdrawalSchedule.map(row => row.balance),
        borderColor: 'rgba(59, 130, 246, 1)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'Total Withdrawals',
        data: withdrawalSchedule.map(row => row.totalWithdrawals),
        borderColor: 'rgba(239, 68, 68, 1)', // red-500
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'Total Interest',
        data: withdrawalSchedule.map(row => row.totalInterest),
        borderColor: 'rgba(16, 185, 129, 1)', // green-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
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
        text: 'Balance Over Time',
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
            const month = withdrawalSchedule[index]?.month;
            if (month % 12 === 0 || index === withdrawalSchedule.length - 1) {
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
          <h2 className="text-xl font-bold mb-4 text-blue-400">Retirement Withdrawal Calculator</h2>
          
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
            <label className="block text-gray-300 mb-2">Initial Balance</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
              <input
                type="tel"
                className={inputClasses}
                value={initialBalanceStr}
                onChange={(e) => handleNumberInput(e.target.value, setInitialBalanceStr)} {...decimalInputProps}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Regular Withdrawal</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
              <input
                type="tel"
                className={inputClasses}
                value={withdrawalAmountStr}
                onChange={(e) => handleNumberInput(e.target.value, setWithdrawalAmountStr)} {...decimalInputProps}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Withdrawal Frequency</label>
            <select 
              className={inputClasses}
              value={withdrawalFrequency}
              onChange={(e) => setWithdrawalFrequency(e.target.value)}
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
              <option value="Annually (1/yr)">Annually (1/yr)</option>
              <option value="Semi-annually (2/yr)">Semi-annually (2/yr)</option>
              <option value="Quarterly (4/yr)">Quarterly (4/yr)</option>
              <option value="Monthly (12/yr)">Monthly (12/yr)</option>
              <option value="Daily (365/yr)">Daily (365/yr)</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Annual Inflation Rate (%)</label>
            <div className="relative">
              <input
                type="tel"
                className={inputClasses}
                value={inflationRateStr}
                onChange={(e) => handleNumberInput(e.target.value, setInflationRateStr)} {...decimalInputProps}
                disabled={!adjustForInflation}
                className={`w-full bg-muted text-primary-foreground border border-gray-600 rounded p-2 pr-8 ${!adjustForInflation ? 'opacity-50' : ''}`}
              />
              <span className="absolute right-3 top-2 text-gray-400">%</span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 rounded border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-blue-500"
                checked={adjustForInflation}
                onChange={(e) => setAdjustForInflation(e.target.checked)}
              />
              Adjust withdrawals for inflation
            </label>
          </div>
        </div>
        
        {/* Results */}
        <div className="calculator-card-alt rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Results</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Money Will Last</h3>
              <p className={resultValueClasses}>
                {formatTime(timeToDeplete.years, timeToDeplete.months)}
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Final Balance</h3>
              <p className={resultValueClasses}>{formatCurrency(finalBalance)}</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Total Withdrawals</h3>
              <p className={resultValueClasses}>{formatCurrency(totalWithdrawals)}</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Total Interest</h3>
              <p className={resultValueClasses}>{formatCurrency(totalInterest)}</p>
            </div>
          </div>
          
          {willLastForever && (
            <div className="bg-green-900 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-bold text-green-300 mb-2">Sustainable Withdrawal Rate</h3>
              <p className="text-gray-200">
                Your money will last indefinitely because your interest earnings exceed your withdrawals. 
                This is a sustainable withdrawal rate.
              </p>
            </div>
          )}
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-blue-400">Balance Over Time</h3>
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
                      <th className="calculator-table-header">Withdrawal</th>
                      <th className="calculator-table-header">Interest</th>
                      <th className="calculator-table-header">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawalSchedule.filter((row, index) => 
                      // Show first 5 rows, then every 12th month, and the last row
                      index < 5 || index === withdrawalSchedule.length - 1 || row.month % 12 === 0
                    ).map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-muted' : 'bg-gray-750'}>
                        <td className="calculator-table-cell">{row.month}</td>
                        <td className="calculator-table-cell">{formatCurrency(row.withdrawal)}</td>
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
            <h3 className="text-lg font-bold mb-2 text-blue-400">Withdrawal Rate Analysis</h3>
            <p className="text-gray-300 mb-4">
              Your annual withdrawal rate is {formatPercentage((withdrawalAmount * (withdrawalFrequency === 'monthly' ? 12 : withdrawalFrequency === 'quarterly' ? 4 : withdrawalFrequency === 'annually' ? 1 : withdrawalFrequency === 'bi-weekly' ? 26 : 52)) / initialBalance)}.
            </p>
            
            <div className="flex items-center mb-2">
              <div className={inputClasses}>
                <div 
                  className="bg-red-500 h-4 rounded-full" 
                  style={{ width: `${Math.min((totalWithdrawals / (initialBalance + totalInterest)) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="ml-2 text-gray-300">{Math.min(((totalWithdrawals / (initialBalance + totalInterest)) * 100), 100).toFixed(1)}%</span>
            </div>
            <p className={resultLabelClasses}>Withdrawals (% of Total Available Funds)</p>
            
            <div className="flex items-center mt-3 mb-2">
              <div className={inputClasses}>
                <div 
                  className="bg-green-500 h-4 rounded-full" 
                  style={{ width: `${Math.min((totalInterest / (initialBalance + totalInterest)) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="ml-2 text-gray-300">{Math.min(((totalInterest / (initialBalance + totalInterest)) * 100), 100).toFixed(1)}%</span>
            </div>
            <p className={resultLabelClasses}>Interest (% of Total Available Funds)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowLongWillMoneyLastCalculator; 