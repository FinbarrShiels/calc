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

interface InvestmentRow {
  year: number;
  startBalance: number;
  contribution: number;
  interest: number;
  endBalance: number;
  totalContributions: number;
  totalInterest: number;
}

const InvestmentCalculator = () => {
  // State for form inputs
  const [currency, setCurrency] = useState('$');
  const [initialInvestmentStr, setInitialInvestmentStr] = useState('10000');
  const [contributionAmountStr, setContributionAmountStr] = useState('500');
  const [contributionFrequency, setContributionFrequency] = useState('monthly');
  const [contributionIncreaseStr, setContributionIncreaseStr] = useState('0');
  const [interestRateStr, setInterestRateStr] = useState('7');
  const [compoundFrequency, setCompoundFrequency] = useState('Monthly (12/yr)');
  const [investmentDurationStr, setInvestmentDurationStr] = useState('20');
  const [inflationRateStr, setInflationRateStr] = useState('2.5');
  const [showInflationAdjusted, setShowInflationAdjusted] = useState(false);
  const [taxRateStr, setTaxRateStr] = useState('25');
  const [showAfterTax, setShowAfterTax] = useState(false);

  // Derived numeric values for calculations
  const initialInvestment = parseFloat(initialInvestmentStr) || 0;
  const contributionAmount = parseFloat(contributionAmountStr) || 0;
  const contributionIncrease = parseFloat(contributionIncreaseStr) || 0;
  const interestRate = parseFloat(interestRateStr) || 0;
  const investmentDuration = parseFloat(investmentDurationStr) || 0;
  const inflationRate = parseFloat(inflationRateStr) || 0;
  const taxRate = parseFloat(taxRateStr) || 0;

  // State for calculation results
  const [investmentSchedule, setInvestmentSchedule] = useState<InvestmentRow[]>([]);
  const [finalBalance, setFinalBalance] = useState(0);
  const [finalBalanceInflationAdjusted, setFinalBalanceInflationAdjusted] = useState(0);
  const [finalBalanceAfterTax, setFinalBalanceAfterTax] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [viewMode, setViewMode] = useState('chart');

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

  // Calculate investment growth
  const calculateInvestment = () => {
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
    let balance = initialInvestment;
    let totalContributionsAmount = 0;
    let totalInterestAmount = 0;
    let currentContribution = contributionAmount;
    const schedule: InvestmentRow[] = [];
    
    // Calculate investment growth year by year
    for (let year = 1; year <= investmentDuration; year++) {
      let yearlyContribution = 0;
      let yearlyInterest = 0;
      let startBalance = balance;
      
      // Increase contribution amount annually if specified
      if (year > 1 && contributionIncrease > 0) {
        currentContribution *= (1 + contributionIncrease / 100);
      }
      
      // Calculate each compound period within the year
      for (let period = 1; period <= compoundsPerYear; period++) {
        // Calculate interest for this period
        const periodInterest = balance * periodicRate;
        yearlyInterest += periodInterest;
        balance += periodInterest;
        
        // Add contribution based on frequency
        const contributionsPerPeriod = contributionsPerYear / compoundsPerYear;
        for (let i = 0; i < contributionsPerPeriod; i++) {
          balance += currentContribution;
          yearlyContribution += currentContribution;
          totalContributionsAmount += currentContribution;
        }
      }
      
      totalInterestAmount += yearlyInterest;
      
      // Add to schedule
      schedule.push({
        year,
        startBalance: parseFloat(startBalance.toFixed(2)),
        contribution: parseFloat(yearlyContribution.toFixed(2)),
        interest: parseFloat(yearlyInterest.toFixed(2)),
        endBalance: parseFloat(balance.toFixed(2)),
        totalContributions: parseFloat(totalContributionsAmount.toFixed(2)),
        totalInterest: parseFloat(totalInterestAmount.toFixed(2))
      });
    }
    
    // Calculate inflation-adjusted final balance
    const inflationFactor = Math.pow(1 + inflationRate / 100, investmentDuration);
    const inflationAdjustedBalance = balance / inflationFactor;
    
    // Calculate after-tax final balance
    // Assuming tax is only paid on the interest/gains
    const taxableAmount = balance - initialInvestment - totalContributionsAmount;
    const taxAmount = taxableAmount * (taxRate / 100);
    const afterTaxBalance = balance - taxAmount;
    
    // Set results
    setInvestmentSchedule(schedule);
    setFinalBalance(parseFloat(balance.toFixed(2)));
    setFinalBalanceInflationAdjusted(parseFloat(inflationAdjustedBalance.toFixed(2)));
    setFinalBalanceAfterTax(parseFloat(afterTaxBalance.toFixed(2)));
    setTotalContributions(parseFloat(totalContributionsAmount.toFixed(2)));
    setTotalInterest(parseFloat(totalInterestAmount.toFixed(2)));
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Calculate on input change
  useEffect(() => {
    calculateInvestment();
  }, [
    initialInvestmentStr,
    contributionAmountStr,
    contributionFrequency,
    contributionIncreaseStr,
    interestRateStr,
    compoundFrequency,
    investmentDurationStr,
    inflationRateStr,
    taxRateStr
  ]);

  // Chart data
  const chartData = {
    labels: investmentSchedule.map(row => `Year ${row.year}`),
    datasets: [
      {
        label: 'End Balance',
        data: investmentSchedule.map(row => row.endBalance),
        borderColor: 'rgba(59, 130, 246, 1)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'Total Contributions',
        data: investmentSchedule.map(row => row.totalContributions),
        borderColor: 'rgba(16, 185, 129, 1)', // green-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'Total Interest',
        data: investmentSchedule.map(row => row.totalInterest),
        borderColor: 'rgba(249, 115, 22, 1)', // orange-500
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: true,
        tension: 0.1
      },
      ...(showInflationAdjusted ? [{
        label: 'Inflation-Adjusted Balance',
        data: investmentSchedule.map(row => row.endBalance / Math.pow(1 + inflationRate / 100, row.year)),
        borderColor: 'rgba(139, 92, 246, 1)', // purple-500
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: false,
        borderDash: [5, 5],
        tension: 0.1
      }] : [])
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
        text: 'Investment Growth Over Time',
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
          <h2 className="text-xl font-bold mb-4 text-blue-400">Investment Parameters</h2>
          
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
              <option value="₹">INR (₹)</option>
              <option value="¥">JPY (¥)</option>
              <option value="C$">CAD (C$)</option>
              <option value="A$">AUD (A$)</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Initial Investment</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
              <input
                type="tel"
                className={inputClasses}
                value={initialInvestmentStr}
                onChange={(e) => handleNumberInput(e.target.value, setInitialInvestmentStr)} {...decimalInputProps}
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
            <label className="block text-gray-300 mb-2">Annual Contribution Increase (%)</label>
            <div className="relative">
              <input
                type="tel"
                className={inputClasses}
                value={contributionIncreaseStr}
                onChange={(e) => handleNumberInput(e.target.value, setContributionIncreaseStr)} {...decimalInputProps}
              />
              <span className="absolute right-3 top-2 text-gray-400">%</span>
            </div>
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
            <label className="block text-gray-300 mb-2">Investment Duration (Years)</label>
            <input
              type="tel"
              className={inputClasses}
              value={investmentDurationStr}
              onChange={(e) => handleNumberInput(e.target.value, setInvestmentDurationStr)} {...decimalInputProps}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Annual Inflation Rate (%)</label>
            <div className="relative">
              <input
                type="tel"
                className={inputClasses}
                value={inflationRateStr}
                onChange={(e) => handleNumberInput(e.target.value, setInflationRateStr)} {...decimalInputProps}
              />
              <span className="absolute right-3 top-2 text-gray-400">%</span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 rounded border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-blue-500"
                checked={showInflationAdjusted}
                onChange={(e) => setShowInflationAdjusted(e.target.checked)}
              />
              Show inflation-adjusted values
            </label>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Tax Rate on Gains (%)</label>
            <div className="relative">
              <input
                type="tel"
                className={inputClasses}
                value={taxRateStr}
                onChange={(e) => handleNumberInput(e.target.value, setTaxRateStr)} {...decimalInputProps}
              />
              <span className="absolute right-3 top-2 text-gray-400">%</span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 rounded border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-blue-500"
                checked={showAfterTax}
                onChange={(e) => setShowAfterTax(e.target.checked)}
              />
              Show after-tax values
            </label>
          </div>
        </div>
        
        {/* Results */}
        <div className="calculator-card-alt rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Investment Results</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
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
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Return on Investment</h3>
              <p className={resultValueClasses}>
                {formatPercentage((finalBalance - initialInvestment - totalContributions) / (initialInvestment + totalContributions) * 100)}
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-blue-400">Investment Growth</h3>
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
                      <th className="calculator-table-header">End Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investmentSchedule.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-muted' : 'bg-gray-750'}>
                        <td className="calculator-table-cell">{row.year}</td>
                        <td className="calculator-table-cell">{formatCurrency(row.contribution)}</td>
                        <td className="calculator-table-cell">{formatCurrency(row.interest)}</td>
                        <td className="calculator-table-cell">
                          {formatCurrency(row.endBalance)}
                          {showInflationAdjusted && (
                            <span className="text-purple-400 text-xs ml-2">
                              ({formatCurrency(row.endBalance / Math.pow(1 + inflationRate / 100, row.year))})
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-blue-400">Investment Breakdown</h3>
            <div className="flex items-center mb-2">
              <div className={inputClasses}>
                <div 
                  className={buttonClasses} 
                  style={{ width: `${(initialInvestment / finalBalance) * 100}%` }}
                ></div>
                <div 
                  className="bg-green-500 h-4" 
                  style={{ 
                    width: `${(totalContributions / finalBalance) * 100}%`,
                    marginLeft: `${(initialInvestment / finalBalance) * 100}%`
                  }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Initial: {((initialInvestment / finalBalance) * 100).toFixed(1)}%</span>
              <span>Contributions: {((totalContributions / finalBalance) * 100).toFixed(1)}%</span>
              <span>Interest: {((totalInterest / finalBalance) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator; 