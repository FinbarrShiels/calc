"use client";

import { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
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
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

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

interface PaymentRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  totalInterest: number;
}

const CreditCardRepaymentCalculator = () => {
  // State for form inputs
  const [currency, setCurrency] = useState('$');
  const [currentBalanceStr, setCurrentBalanceStr] = useState('5000');
  const [interestRateStr, setInterestRateStr] = useState('18.99');
  const [minPaymentTypeStr, setMinPaymentTypeStr] = useState('percentage');
  const [minPaymentPercentStr, setMinPaymentPercentStr] = useState('2');
  const [minPaymentAmountStr, setMinPaymentAmountStr] = useState('25');
  const [additionalPaymentStr, setAdditionalPaymentStr] = useState('0');
  const [paymentStrategy, setPaymentStrategy] = useState('minimum');
  const [targetMonthsStr, setTargetMonthsStr] = useState('12');
  const [targetAmountStr, setTargetAmountStr] = useState('0');

  // Derived numeric values for calculations
  const currentBalance = parseFloat(currentBalanceStr) || 0;
  const interestRate = parseFloat(interestRateStr) || 0;
  const minPaymentPercent = parseFloat(minPaymentPercentStr) || 0;
  const minPaymentAmount = parseFloat(minPaymentAmountStr) || 0;
  const additionalPayment = parseFloat(additionalPaymentStr) || 0;
  const targetMonths = parseInt(targetMonthsStr) || 0;
  const targetAmount = parseFloat(targetAmountStr) || 0;

  // State for calculation results
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [monthsToPayoff, setMonthsToPayoff] = useState(0);
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentRow[]>([]);
  const [viewMode, setViewMode] = useState('table');
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

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

  // Calculate minimum payment
  const calculateMinimumPayment = (balance: number) => {
    if (minPaymentTypeStr === 'percentage') {
      // Calculate percentage-based minimum payment
      const percentPayment = balance * (minPaymentPercent / 100);
      return Math.max(percentPayment, minPaymentAmount);
    } else {
      // Fixed amount minimum payment
      return Math.min(minPaymentAmount, balance);
    }
  };

  // Calculate payment for fixed payoff period
  const calculateFixedPeriodPayment = (balance: number, months: number, rate: number) => {
    // Monthly interest rate
    const monthlyRate = rate / 100 / 12;
    
    // If interest rate is effectively zero, just divide balance by months
    if (monthlyRate < 0.0001) {
      return balance / months;
    }
    
    // Calculate payment using formula: P = (r * PV) / (1 - (1 + r)^-n)
    // Where P = payment, r = monthly rate, PV = present value (balance), n = number of periods
    return (monthlyRate * balance) / (1 - Math.pow(1 + monthlyRate, -months));
  };

  // Calculate payment for fixed payment amount
  const calculateFixedPaymentSchedule = () => {
    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    
    let balance = currentBalance;
    let month = 1;
    let totalInterestPaid = 0;
    const schedule: PaymentRow[] = [];
    
    // Add initial state
    schedule.push({
      month: 0,
      payment: 0,
      principal: 0,
      interest: 0,
      remainingBalance: balance,
      totalInterest: 0
    });
    
    // Calculate payment based on strategy
    let payment = 0;
    
    if (paymentStrategy === 'minimum') {
      payment = calculateMinimumPayment(balance);
    } else if (paymentStrategy === 'minimum_plus') {
      payment = calculateMinimumPayment(balance) + additionalPayment;
    } else if (paymentStrategy === 'fixed_amount') {
      payment = additionalPayment;
    } else if (paymentStrategy === 'fixed_period') {
      payment = calculateFixedPeriodPayment(balance, targetMonths, interestRate);
    } else if (paymentStrategy === 'fixed_payment') {
      payment = targetAmount;
    }
    
    // Calculate payment schedule
    while (balance > 0 && month <= 600) { // Cap at 50 years to prevent infinite loops
      // Calculate interest for this month
      const interestPayment = balance * monthlyRate;
      
      // Recalculate minimum payment if using minimum payment strategy
      if (paymentStrategy === 'minimum') {
        payment = calculateMinimumPayment(balance);
      } else if (paymentStrategy === 'minimum_plus') {
        payment = calculateMinimumPayment(balance) + additionalPayment;
      }
      
      // Ensure payment is at least the interest amount (to make progress)
      payment = Math.max(payment, interestPayment + 1);
      
      // Adjust payment if it's more than the remaining balance + interest
      if (payment > balance + interestPayment) {
        payment = balance + interestPayment;
      }
      
      // Calculate principal payment
      const principalPayment = payment - interestPayment;
      
      // Update balance
      balance -= principalPayment;
      
      // Update total interest
      totalInterestPaid += interestPayment;
      
      // Add to schedule
      schedule.push({
        month,
        payment: parseFloat(payment.toFixed(2)),
        principal: parseFloat(principalPayment.toFixed(2)),
        interest: parseFloat(interestPayment.toFixed(2)),
        remainingBalance: parseFloat(balance.toFixed(2)),
        totalInterest: parseFloat(totalInterestPaid.toFixed(2))
      });
      
      // Increment month
      month++;
      
      // Break if balance is effectively zero (floating point precision issues)
      if (balance < 0.01) {
        balance = 0;
      }
    }
    
    return schedule;
  };

  // Calculate payment schedule
  const calculatePaymentSchedule = () => {
    const schedule = calculateFixedPaymentSchedule();
    
    // Set results
    setPaymentSchedule(schedule);
    setMonthsToPayoff(schedule.length - 1); // Subtract 1 for initial state
    
    if (schedule.length > 1) {
      const lastPayment = schedule[schedule.length - 1];
      setTotalPayments(parseFloat((lastPayment.totalInterest + currentBalance).toFixed(2)));
      setTotalInterest(parseFloat(lastPayment.totalInterest.toFixed(2)));
      
      // Set monthly payment based on first actual payment
      if (schedule.length > 1) {
        setMonthlyPayment(schedule[1].payment);
      }
    }
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
    calculatePaymentSchedule();
  }, [
    currentBalanceStr,
    interestRateStr,
    minPaymentTypeStr,
    minPaymentPercentStr,
    minPaymentAmountStr,
    additionalPaymentStr,
    paymentStrategy,
    targetMonthsStr,
    targetAmountStr
  ]);

  // Chart data
  const chartData = {
    labels: paymentSchedule.map(row => `Month ${row.month}`),
    datasets: [
      {
        label: 'Remaining Balance',
        data: paymentSchedule.map(row => row.remainingBalance),
        borderColor: 'rgba(59, 130, 246, 1)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        fill: false,
        tension: 0.1
      },
      {
        label: 'Total Interest Paid',
        data: paymentSchedule.map(row => row.totalInterest),
        borderColor: 'rgba(249, 115, 22, 1)', // orange-500
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        fill: false,
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
        text: 'Credit Card Repayment Schedule',
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
          <h2 className="text-xl font-bold mb-4 text-blue-400">Credit Card Details</h2>
          
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
            <label className="block text-gray-300 mb-2">Current Balance</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
              <input
                type="tel"
                className={inputClasses}
                value={currentBalanceStr}
                onChange={(e) => handleNumberInput(e.target.value, setCurrentBalanceStr)} {...decimalInputProps}
              />
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
          
          <h3 className="text-lg font-bold mb-3 mt-6 text-blue-400">Minimum Payment Settings</h3>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Minimum Payment Type</label>
            <select 
              className={inputClasses}
              value={minPaymentTypeStr}
              onChange={(e) => setMinPaymentTypeStr(e.target.value)}
            >
              <option value="percentage">Percentage of Balance</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          
          {minPaymentTypeStr === 'percentage' && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Minimum Payment Percentage (%)</label>
              <div className="relative">
                <input
                  type="tel"
                  className={inputClasses}
                  value={minPaymentPercentStr}
                  onChange={(e) => handleNumberInput(e.target.value, setMinPaymentPercentStr)} {...decimalInputProps}
                />
                <span className="absolute right-3 top-2 text-gray-400">%</span>
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Minimum Payment Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
              <input
                type="tel"
                className={inputClasses}
                value={minPaymentAmountStr}
                onChange={(e) => handleNumberInput(e.target.value, setMinPaymentAmountStr)} {...decimalInputProps}
              />
            </div>
          </div>
          
          <h3 className="text-lg font-bold mb-3 mt-6 text-blue-400">Payment Strategy</h3>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Payment Strategy</label>
            <select 
              className={inputClasses}
              value={paymentStrategy}
              onChange={(e) => setPaymentStrategy(e.target.value)}
            >
              <option value="minimum">Minimum Payment Only</option>
              <option value="minimum_plus">Minimum Payment + Additional</option>
              <option value="fixed_amount">Fixed Payment Amount</option>
              <option value="fixed_period">Pay Off in Fixed Period</option>
              <option value="fixed_payment">Specific Monthly Payment</option>
            </select>
          </div>
          
          {(paymentStrategy === 'minimum_plus' || paymentStrategy === 'fixed_amount') && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">
                {paymentStrategy === 'minimum_plus' ? 'Additional Payment' : 'Fixed Payment Amount'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
                <input
                  type="tel"
                  className={inputClasses}
                  value={additionalPaymentStr}
                  onChange={(e) => handleNumberInput(e.target.value, setAdditionalPaymentStr)} {...decimalInputProps}
                />
              </div>
            </div>
          )}
          
          {paymentStrategy === 'fixed_period' && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Months to Pay Off</label>
              <input
                type="tel"
                className={inputClasses}
                value={targetMonthsStr}
                onChange={(e) => handleNumberInput(e.target.value, setTargetMonthsStr)} {...decimalInputProps}
              />
            </div>
          )}
          
          {paymentStrategy === 'fixed_payment' && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Monthly Payment Amount</label>
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
          )}
        </div>
        
        {/* Results */}
        <div className="calculator-card-alt rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Repayment Summary</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Monthly Payment</h3>
              <p className={resultValueClasses}>{formatCurrency(monthlyPayment)}</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Months to Pay Off</h3>
              <p className={resultValueClasses}>{monthsToPayoff}</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Total Interest</h3>
              <p className={resultValueClasses}>{formatCurrency(totalInterest)}</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Total Payments</h3>
              <p className={resultValueClasses}>{formatCurrency(totalPayments)}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-blue-400">Repayment Schedule</h3>
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
              <div>
                <div className="flex justify-end space-x-2 mb-2">
                  <button
                    className={`px-3 py-1 rounded ${chartType === 'line' ? 'bg-blue-600 text-gray-900 dark:text-white-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-300'}`}
                    onClick={() => setChartType('line')}
                  >
                    Line
                  </button>
                  <button
                    className={`px-3 py-1 rounded ${chartType === 'bar' ? 'bg-blue-600 text-gray-900 dark:text-white-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-300'}`}
                    onClick={() => setChartType('bar')}
                  >
                    Bar
                  </button>
                </div>
                
                <div className="h-80 w-full">
                  {chartType === 'line' ? (
                    <Line data={chartData} options={chartOptions} />
                  ) : (
                    <Bar data={chartData} options={chartOptions} />
                  )}
                </div>
              </div>
            )}
            
            {viewMode === 'table' && (
              <div className="overflow-x-auto">
                <table className="calculator-table">
                  <thead>
                    <tr>
                      <th className="calculator-table-header">Month</th>
                      <th className="calculator-table-header">Payment</th>
                      <th className="calculator-table-header">Principal</th>
                      <th className="calculator-table-header">Interest</th>
                      <th className="calculator-table-header">Remaining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentSchedule.slice(0, 25).map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-muted' : 'bg-gray-750'}>
                        <td className="calculator-table-cell">{row.month}</td>
                        <td className="calculator-table-cell">{formatCurrency(row.payment)}</td>
                        <td className="calculator-table-cell">{formatCurrency(row.principal)}</td>
                        <td className="calculator-table-cell">{formatCurrency(row.interest)}</td>
                        <td className="calculator-table-cell">{formatCurrency(row.remainingBalance)}</td>
                      </tr>
                    ))}
                    {paymentSchedule.length > 25 && (
                      <tr>
                        <td colSpan={5} className="py-2 px-4 text-center text-gray-400">
                          Showing first 25 months of {paymentSchedule.length - 1} total months
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardRepaymentCalculator; 