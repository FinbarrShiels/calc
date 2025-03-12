"use client";

import { useState, useEffect } from 'react';
import AmortizationChart from '@/components/AmortizationChart';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

interface PaymentRow {
  paymentNumber: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  totalInterest: number;
  totalPrincipal: number;
}

const AmortizationCalculator = () => {
  // State for form inputs
  const [currency, setCurrency] = useState('$');
  const [loanAmountStr, setLoanAmountStr] = useState('250000');
  const [interestRateStr, setInterestRateStr] = useState('4.5');
  const [loanTermYearsStr, setLoanTermYearsStr] = useState('30');
  const [paymentFrequency, setPaymentFrequency] = useState('Monthly');
  const [extraPaymentStr, setExtraPaymentStr] = useState('0');
  const [startDateStr, setStartDateStr] = useState(new Date().toISOString().split('T')[0]);

  // Derived numeric values for calculations
  const loanAmount = parseFloat(loanAmountStr) || 0;
  const interestRate = parseFloat(interestRateStr) || 0;
  const loanTermYears = parseInt(loanTermYearsStr) || 0;
  const extraPayment = parseFloat(extraPaymentStr) || 0;
  const startDate = new Date(startDateStr);

  // State for calculation results
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [payoffDate, setPayoffDate] = useState<Date | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<PaymentRow[]>([]);
  const [viewMode, setViewMode] = useState('table');
  const [chartType, setChartType] = useState<'line' | 'bar' | 'stacked'>('stacked');
  const [yearlyView, setYearlyView] = useState(false);

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

  // Calculate amortization schedule
  const calculateAmortization = () => {
    // Get payment frequency
    let paymentsPerYear = 12; // Default to monthly
    if (paymentFrequency === 'Bi-weekly') paymentsPerYear = 26;
    if (paymentFrequency === 'Weekly') paymentsPerYear = 52;
    if (paymentFrequency === 'Semi-monthly') paymentsPerYear = 24;
    if (paymentFrequency === 'Quarterly') paymentsPerYear = 4;
    if (paymentFrequency === 'Annually') paymentsPerYear = 1;

    // Calculate total number of payments
    const totalNumberOfPayments = loanTermYears * paymentsPerYear;
    
    // Calculate periodic interest rate
    const periodicInterestRate = (interestRate / 100) / paymentsPerYear;
    
    // Calculate payment amount using the formula: PMT = P * r * (1+r)^n / ((1+r)^n - 1)
    const paymentAmount = loanAmount * 
      (periodicInterestRate * Math.pow(1 + periodicInterestRate, totalNumberOfPayments)) / 
      (Math.pow(1 + periodicInterestRate, totalNumberOfPayments) - 1);
    
    // Calculate amortization schedule
    const schedule: PaymentRow[] = [];
    
    let remainingBalance = loanAmount;
    let paymentNumber = 1;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    let currentDate = new Date(startDate);
    
    while (remainingBalance > 0 && paymentNumber <= totalNumberOfPayments * 2) { // Safety limit to prevent infinite loops
      // Calculate interest for this period
      const interestPayment = remainingBalance * periodicInterestRate;
      
      // Calculate principal for this period (including extra payment)
      let principalPayment = paymentAmount - interestPayment;
      
      // Add extra payment if specified
      if (extraPayment > 0) {
        principalPayment += extraPayment;
      }
      
      // Adjust principal payment if it's more than remaining balance
      if (principalPayment > remainingBalance) {
        principalPayment = remainingBalance;
      }
      
      // Calculate total payment
      const totalPayment = interestPayment + principalPayment;
      
      // Update remaining balance
      remainingBalance -= principalPayment;
      
      // Update totals
      totalInterestPaid += interestPayment;
      totalPrincipalPaid += principalPayment;
      
      // Add to schedule
      schedule.push({
        paymentNumber,
        payment: parseFloat(totalPayment.toFixed(2)),
        principal: parseFloat(principalPayment.toFixed(2)),
        interest: parseFloat(interestPayment.toFixed(2)),
        remainingBalance: parseFloat(remainingBalance.toFixed(2)),
        totalInterest: parseFloat(totalInterestPaid.toFixed(2)),
        totalPrincipal: parseFloat(totalPrincipalPaid.toFixed(2))
      });
      
      // Increment payment number
      paymentNumber++;
      
      // Update date for next payment
      if (paymentFrequency === 'Monthly') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else if (paymentFrequency === 'Bi-weekly') {
        currentDate.setDate(currentDate.getDate() + 14);
      } else if (paymentFrequency === 'Weekly') {
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (paymentFrequency === 'Semi-monthly') {
        currentDate.setDate(currentDate.getDate() + 15);
      } else if (paymentFrequency === 'Quarterly') {
        currentDate.setMonth(currentDate.getMonth() + 3);
      } else if (paymentFrequency === 'Annually') {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }
      
      // Break if balance is effectively zero (floating point precision issues)
      if (remainingBalance < 0.01) {
        remainingBalance = 0;
      }
    }
    
    // Set results
    setMonthlyPayment(parseFloat(paymentAmount.toFixed(2)));
    setTotalPayments(parseFloat((paymentAmount * totalNumberOfPayments).toFixed(2)));
    setTotalInterest(parseFloat(totalInterestPaid.toFixed(2)));
    setPayoffDate(new Date(currentDate));
    setAmortizationSchedule(schedule);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format date
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Calculate on input change
  useEffect(() => {
    calculateAmortization();
  }, [
    loanAmountStr,
    interestRateStr,
    loanTermYearsStr,
    paymentFrequency,
    extraPaymentStr,
    startDateStr
  ]);

  // Get yearly summary if yearly view is enabled
  const getYearlySummary = () => {
    if (!yearlyView || amortizationSchedule.length === 0) return amortizationSchedule;
    
    const yearlySummary: PaymentRow[] = [];
    let currentYear = 1;
    let yearlyPayment = 0;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    
    amortizationSchedule.forEach((payment, index) => {
      const paymentYear = Math.ceil(payment.paymentNumber / (paymentFrequency === 'Monthly' ? 12 : 
                                                            paymentFrequency === 'Bi-weekly' ? 26 : 
                                                            paymentFrequency === 'Weekly' ? 52 : 
                                                            paymentFrequency === 'Semi-monthly' ? 24 : 
                                                            paymentFrequency === 'Quarterly' ? 4 : 1));
      
      if (paymentYear === currentYear) {
        yearlyPayment += payment.payment;
        yearlyPrincipal += payment.principal;
        yearlyInterest += payment.interest;
      } else {
        // Add previous year summary
        yearlySummary.push({
          paymentNumber: currentYear,
          payment: parseFloat(yearlyPayment.toFixed(2)),
          principal: parseFloat(yearlyPrincipal.toFixed(2)),
          interest: parseFloat(yearlyInterest.toFixed(2)),
          remainingBalance: amortizationSchedule[index - 1].remainingBalance,
          totalInterest: amortizationSchedule[index - 1].totalInterest,
          totalPrincipal: amortizationSchedule[index - 1].totalPrincipal
        });
        
        // Reset for new year
        currentYear = paymentYear;
        yearlyPayment = payment.payment;
        yearlyPrincipal = payment.principal;
        yearlyInterest = payment.interest;
      }
      
      // Add last year if this is the last payment
      if (index === amortizationSchedule.length - 1) {
        yearlySummary.push({
          paymentNumber: currentYear,
          payment: parseFloat(yearlyPayment.toFixed(2)),
          principal: parseFloat(yearlyPrincipal.toFixed(2)),
          interest: parseFloat(yearlyInterest.toFixed(2)),
          remainingBalance: payment.remainingBalance,
          totalInterest: payment.totalInterest,
          totalPrincipal: payment.totalPrincipal
        });
      }
    });
    
    return yearlySummary;
  };

  // Get current schedule based on yearly view
  const getCurrentSchedule = () => {
    return yearlyView ? getYearlySummary() : amortizationSchedule;
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-100 rounded-lg shadow-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="calculator-card-alt rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-white dark:text-gray-900">Loan Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Currency</label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md text-white dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              <label className="block text-sm font-medium text-gray-300 mb-1">Loan Amount</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  {currency}
                </span>
                <input 
                  type="tel" 
                  value={loanAmountStr} 
                  onChange={(e) => handleNumberInput(e.target.value, setLoanAmountStr)} {...decimalInputProps}
                  className="w-full pl-8 pr-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md text-white dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Interest Rate (%)</label>
              <div className="relative">
                <input 
                  type="tel" 
                  value={interestRateStr} 
                  onChange={(e) => handleNumberInput(e.target.value, setInterestRateStr)} {...decimalInputProps}
                  className="w-full pl-3 pr-8 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md text-white dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="0"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  %
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Loan Term (Years)</label>
              <input 
                type="tel" 
                value={loanTermYearsStr} 
                onChange={(e) => handleNumberInput(e.target.value, setLoanTermYearsStr)} {...decimalInputProps}
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md text-white dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Payment Frequency</label>
              <select 
                value={paymentFrequency} 
                onChange={(e) => setPaymentFrequency(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md text-white dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Monthly">Monthly</option>
                <option value="Bi-weekly">Bi-weekly</option>
                <option value="Weekly">Weekly</option>
                <option value="Semi-monthly">Semi-monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Annually">Annually</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Extra Payment</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  {currency}
                </span>
                <input 
                  type="tel" 
                  value={extraPaymentStr} 
                  onChange={(e) => handleNumberInput(e.target.value, setExtraPaymentStr)} {...decimalInputProps}
                  className="w-full pl-8 pr-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md text-white dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
              <input 
                type="date" 
                value={startDateStr} 
                onChange={(e) => setStartDateStr(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md text-white dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-white dark:text-gray-900">Loan Summary</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-1">Monthly Payment</h3>
              <p className={resultValueClasses}>{formatCurrency(monthlyPayment)}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Total Principal</h3>
                <p className={resultValueClasses}>{formatCurrency(loanAmount)}</p>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Total Interest</h3>
                <p className={resultValueClasses}>{formatCurrency(totalInterest)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Total Payments</h3>
                <p className={resultValueClasses}>{formatCurrency(loanAmount + totalInterest)}</p>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Payoff Date</h3>
                <p className={resultValueClasses}>{formatDate(payoffDate)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart and Table Controls */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h2 className={resultValueClasses}>Amortization Schedule</h2>
          
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <div>
              <label className="mr-2 text-sm font-medium text-gray-300">View:</label>
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    viewMode === 'table'
                      ? 'bg-orange-600 text-gray-900 dark:text-white-foreground'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-300 hover:bg-gray-100 dark:bg-gray-850/80'
                  }`}
                >
                  Table
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('chart')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    viewMode === 'chart'
                      ? 'bg-orange-600 text-gray-900 dark:text-white-foreground'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-300 hover:bg-gray-100 dark:bg-gray-850/80'
                  }`}
                >
                  Chart
                </button>
              </div>
            </div>
            
            {viewMode === 'chart' && (
              <div>
                <label className="mr-2 text-sm font-medium text-gray-300">Chart Type:</label>
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value as 'line' | 'bar' | 'stacked')}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md text-white dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="line">Line</option>
                  <option value="bar">Bar</option>
                  <option value="stacked">Stacked</option>
                </select>
              </div>
            )}
            
            <div>
              <label className="mr-2 text-sm font-medium text-gray-300">Group By:</label>
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={() => setYearlyView(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    !yearlyView
                      ? 'bg-orange-600 text-gray-900 dark:text-white-foreground'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-300 hover:bg-gray-100 dark:bg-gray-850/80'
                  }`}
                >
                  {paymentFrequency}
                </button>
                <button
                  type="button"
                  onClick={() => setYearlyView(true)}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    yearlyView
                      ? 'bg-orange-600 text-gray-900 dark:text-white-foreground'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-300 hover:bg-gray-100 dark:bg-gray-850/80'
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chart View */}
        {viewMode === 'chart' && (
          <div className="mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <AmortizationChart 
              data={getCurrentSchedule()} 
              chartType={chartType} 
              currency={currency} 
              yearlyView={yearlyView} 
            />
          </div>
        )}
        
        {/* Table View */}
        {viewMode === 'table' && (
          <div className="mt-4 overflow-x-auto">
            <table className="calculator-table">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    {yearlyView ? 'Year' : 'Payment #'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Payment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Principal
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Interest
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Remaining Balance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-700">
                {getCurrentSchedule().map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-card' : 'bg-gray-750'}>
                    <td className="calculator-table-cell">
                      {yearlyView ? `Year ${row.paymentNumber}` : row.paymentNumber}
                    </td>
                    <td className="calculator-table-cell">
                      {formatCurrency(row.payment)}
                    </td>
                    <td className="calculator-table-cell">
                      {formatCurrency(row.principal)}
                    </td>
                    <td className="calculator-table-cell">
                      {formatCurrency(row.interest)}
                    </td>
                    <td className="calculator-table-cell">
                      {formatCurrency(row.remainingBalance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AmortizationCalculator; 