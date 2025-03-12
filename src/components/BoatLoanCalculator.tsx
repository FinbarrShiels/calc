"use client";

import { useState, useEffect } from 'react';
import BoatLoanChart from './BoatLoanChart';
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

export default function BoatLoanCalculator() {
  // State variables for inputs
  const [loanAmountStr, setLoanAmountStr] = useState('25000');
  const [interestRateStr, setInterestRateStr] = useState('6.5');
  const [yearsStr, setYearsStr] = useState('5');
  const [monthsStr, setMonthsStr] = useState('0');
  const [startDateStr, setStartDateStr] = useState(new Date().toISOString().split('T')[0]);
  const [additionalPaymentStr, setAdditionalPaymentStr] = useState('0');
  const [additionalPaymentFrequency, setAdditionalPaymentFrequency] = useState('monthly');
  const [oneTimePaymentStr, setOneTimePaymentStr] = useState('0');
  const [oneTimePaymentType, setOneTimePaymentType] = useState('balloon');
  const [oneTimePaymentDateStr, setOneTimePaymentDateStr] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
  );
  const [currency, setCurrency] = useState('$');

  // Derived numeric values for calculations
  const loanAmount = parseFloat(loanAmountStr) || 0;
  const interestRate = parseFloat(interestRateStr) || 0;
  const years = parseInt(yearsStr) || 0;
  const months = parseInt(monthsStr) || 0;
  const additionalPayment = parseFloat(additionalPaymentStr) || 0;
  const oneTimePayment = parseFloat(oneTimePaymentStr) || 0;
  const startDate = new Date(startDateStr);
  const oneTimePaymentDate = new Date(oneTimePaymentDateStr);

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

  // Calculate boat loan
  const calculateBoatLoan = () => {
    // Calculate total number of payments
    const totalNumberOfPayments = years * 12 + months;
    
    // Calculate monthly interest rate
    const monthlyInterestRate = (interestRate / 100) / 12;
    
    // Calculate monthly payment using the formula: PMT = P * r * (1+r)^n / ((1+r)^n - 1)
    const paymentAmount = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalNumberOfPayments)) / 
      (Math.pow(1 + monthlyInterestRate, totalNumberOfPayments) - 1);
    
    // Calculate amortization schedule
    const schedule: PaymentRow[] = [];
    
    let remainingBalance = loanAmount;
    let paymentNumber = 1;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    let currentDate = new Date(startDate);
    let oneTimePaymentApplied = false;
    
    // Add initial row to schedule
    schedule.push({
      paymentNumber: 0,
      payment: 0,
      principal: 0,
      interest: 0,
      remainingBalance: remainingBalance,
      totalInterest: 0,
      totalPrincipal: 0
    });
    
    while (remainingBalance > 0 && paymentNumber <= totalNumberOfPayments * 2) { // Safety limit to prevent infinite loops
      // Calculate interest for this period
      const interestPayment = remainingBalance * monthlyInterestRate;
      
      // Calculate principal for this period
      let principalPayment = paymentAmount - interestPayment;
      
      // Add additional payment if applicable
      let additionalPaymentThisMonth = 0;
      if (additionalPayment > 0) {
        if (additionalPaymentFrequency === 'monthly' || 
            (additionalPaymentFrequency === 'quarterly' && paymentNumber % 3 === 0) ||
            (additionalPaymentFrequency === 'annually' && paymentNumber % 12 === 0)) {
          additionalPaymentThisMonth = additionalPayment;
          principalPayment += additionalPaymentThisMonth;
        }
      }
      
      // Apply one-time payment if applicable
      let oneTimePaymentThisMonth = 0;
      if (oneTimePayment > 0 && !oneTimePaymentApplied) {
        const paymentDate = new Date(currentDate);
        
        if (oneTimePaymentType === 'balloon' && paymentNumber === totalNumberOfPayments) {
          oneTimePaymentThisMonth = oneTimePayment;
          principalPayment += oneTimePaymentThisMonth;
          oneTimePaymentApplied = true;
        } else if (oneTimePaymentType === 'at date' && 
                  paymentDate.getFullYear() === oneTimePaymentDate.getFullYear() && 
                  paymentDate.getMonth() === oneTimePaymentDate.getMonth()) {
          oneTimePaymentThisMonth = oneTimePayment;
          principalPayment += oneTimePaymentThisMonth;
          oneTimePaymentApplied = true;
        }
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
      currentDate.setMonth(currentDate.getMonth() + 1);
      
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

  // Get yearly summary if yearly view is enabled
  const getYearlySummary = () => {
    if (!yearlyView || amortizationSchedule.length === 0) return amortizationSchedule;
    
    const yearlySummary: PaymentRow[] = [];
    let currentYear = 1;
    let yearlyPayment = 0;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    
    amortizationSchedule.forEach((payment, index) => {
      if (payment.paymentNumber === 0) {
        yearlySummary.push(payment);
        return;
      }
      
      const paymentYear = Math.ceil(payment.paymentNumber / 12);
      
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

  // Get the current schedule based on the view mode
  const getCurrentSchedule = () => {
    return yearlyView ? getYearlySummary() : amortizationSchedule;
  };

  // Calculate on input change
  useEffect(() => {
    calculateBoatLoan();
  }, [
    loanAmountStr,
    interestRateStr,
    yearsStr,
    monthsStr,
    additionalPaymentStr,
    additionalPaymentFrequency,
    oneTimePaymentStr,
    oneTimePaymentType,
    oneTimePaymentDateStr
  ]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      {/* Left side - Input form */}
      <div className="w-full lg:w-2/5 calculator-card text-white dark:text-gray-900 p-4 sm:p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-6">Loan Details</h3>
        
        <div className="mb-6">
          <label className={labelClasses}>Currency:</label>
          <div className="grid grid-cols-6 gap-1">
            <button 
              className={`py-2 px-2 sm:px-4 rounded text-sm sm:text-base ${currency === '$' ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:bg-gray-850/80'}`}
              onClick={() => setCurrency('$')}
            >
              $
            </button>
            <button 
              className={`py-2 px-2 sm:px-4 rounded text-sm sm:text-base ${currency === '€' ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:bg-gray-850/80'}`}
              onClick={() => setCurrency('€')}
            >
              €
            </button>
            <button 
              className={`py-2 px-2 sm:px-4 rounded text-sm sm:text-base ${currency === '£' ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:bg-gray-850/80'}`}
              onClick={() => setCurrency('£')}
            >
              £
            </button>
            <button 
              className={`py-2 px-2 sm:px-4 rounded text-sm sm:text-base ${currency === '₹' ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:bg-gray-850/80'}`}
              onClick={() => setCurrency('₹')}
            >
              ₹
            </button>
            <button 
              className={`py-2 px-2 sm:px-4 rounded text-sm sm:text-base ${currency === '¥' ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:bg-gray-850/80'}`}
              onClick={() => setCurrency('¥')}
            >
              ¥
            </button>
            <button 
              className={`py-2 px-2 sm:px-4 rounded bg-muted hover:bg-muted/80`}
            >
              ...
            </button>
          </div>
        </div>
          
        <div className="mb-6">
          <label className={labelClasses}>Loan Amount:</label>
          <div className="flex">
            <span className="bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-l">{currency}</span>
            <input
              type="tel"
              value={loanAmountStr}
              onChange={(e) => handleNumberInput(e.target.value, setLoanAmountStr)} {...decimalInputProps}
              className={inputClasses}
              placeholder="25000"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className={labelClasses}>Interest Rate:</label>
          <div className="flex">
            <input
              type="tel"
              value={interestRateStr}
              onChange={(e) => handleNumberInput(e.target.value, setInterestRateStr)} {...decimalInputProps}
              className={inputClasses}
              placeholder="6.5"
            />
            <span className="bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-r">%</span>
          </div>
        </div>
        
        <div className="mb-6">
          <label className={labelClasses}>Loan Term:</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm text-gray-400">Years</label>
              <input
                type="tel"
                value={yearsStr}
                onChange={(e) => handleNumberInput(e.target.value, setYearsStr)} {...decimalInputProps}
                className={inputClasses}
                placeholder="5"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-400">Months</label>
              <input
                type="tel"
                value={monthsStr}
                onChange={(e) => handleNumberInput(e.target.value, setMonthsStr)} {...decimalInputProps}
                className={inputClasses}
                placeholder="0"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className={labelClasses}>Start Date:</label>
          <input
            type="date"
            value={startDateStr}
            onChange={(e) => setStartDateStr(e.target.value)}
            className={inputClasses}
          />
        </div>
        
        <div className="mb-6">
          <label className={labelClasses}>Additional Payment (Optional):</label>
          <div className="flex">
            <span className="bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-l">{currency}</span>
            <input
              type="tel"
              value={additionalPaymentStr}
              onChange={(e) => handleNumberInput(e.target.value, setAdditionalPaymentStr)} {...decimalInputProps}
              className={inputClasses}
              placeholder="0"
            />
            <select
              value={additionalPaymentFrequency}
              onChange={(e) => setAdditionalPaymentFrequency(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 text-white dark:text-gray-900 py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">monthly</option>
              <option value="quarterly">quarterly</option>
              <option value="annually">annually</option>
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label className={labelClasses}>One-Time Payment (Optional):</label>
          <div className="flex mb-2">
            <span className="bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-l">{currency}</span>
            <input
              type="tel"
              value={oneTimePaymentStr}
              onChange={(e) => handleNumberInput(e.target.value, setOneTimePaymentStr)} {...decimalInputProps}
              className={inputClasses}
              placeholder="0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={oneTimePaymentType}
              onChange={(e) => setOneTimePaymentType(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 text-white dark:text-gray-900 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="balloon">Balloon payment</option>
              <option value="at date">At specific date</option>
            </select>
            {oneTimePaymentType === 'at date' && (
              <input
                type="date"
                value={oneTimePaymentDateStr}
                onChange={(e) => setOneTimePaymentDateStr(e.target.value)}
                className="bg-gray-100 dark:bg-gray-800 text-white dark:text-gray-900 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        </div>
        
        <button
          onClick={calculateBoatLoan}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-primary/90 text-white dark:text-gray-900 font-semibold rounded-md transition duration-200"
        >
          Calculate
        </button>
      </div>
      
      {/* Right side - Results */}
      <div className="w-full lg:w-3/5 bg-white dark:bg-gray-800 text-white dark:text-gray-900 p-4 sm:p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Loan Summary</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded ${
                viewMode === 'table'
                  ? 'bg-green-600 text-gray-900 dark:text-white-foreground'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-300 hover:bg-gray-100 dark:bg-gray-850/80'
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode('chart')}
              className={`px-4 py-2 rounded ${
                viewMode === 'chart'
                  ? 'bg-blue-600 text-gray-900 dark:text-white-foreground'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-300 hover:bg-gray-100 dark:bg-gray-850/80'
              }`}
            >
              Chart
            </button>
            <button
              onClick={() => setViewMode('summary')}
              className={`px-4 py-2 rounded ${
                viewMode === 'summary'
                  ? 'bg-orange-600 text-gray-900 dark:text-white-foreground'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-300 hover:bg-gray-100 dark:bg-gray-850/80'
              }`}
            >
              Summary
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="calculator-card-alt p-4 rounded">
            <p className="text-gray-400 text-sm">Monthly Payment</p>
            <p className="text-2xl font-bold">{formatCurrency(monthlyPayment)}</p>
          </div>
          <div className="calculator-card-alt p-4 rounded">
            <p className="text-gray-400 text-sm">Total Payments</p>
            <p className="text-2xl font-bold">{formatCurrency(totalPayments)}</p>
          </div>
          <div className="calculator-card-alt p-4 rounded">
            <p className="text-gray-400 text-sm">Total Interest</p>
            <p className={resultValueClasses}>{formatCurrency(totalInterest)}</p>
          </div>
          <div className="calculator-card-alt p-4 rounded">
            <p className="text-gray-400 text-sm">Payoff Date</p>
            <p className="text-2xl font-bold">{formatDate(payoffDate)}</p>
          </div>
        </div>
        
        {viewMode === 'table' && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <button
                onClick={() => setYearlyView(!yearlyView)}
                className={`px-4 py-2 rounded ${
                  yearlyView
                    ? 'bg-green-600 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-300 hover:bg-gray-100 dark:bg-gray-850/80'
                }`}
              >
                {yearlyView ? 'Yearly View' : 'Monthly View'}
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="calculator-table">
                <thead>
                  <tr>
                    <th className="calculator-table-header">
                      {yearlyView ? 'Year' : 'Payment'}
                    </th>
                    <th className="calculator-table-header">
                      Payment
                    </th>
                    <th className="calculator-table-header">
                      Principal
                    </th>
                    <th className="calculator-table-header">
                      Interest
                    </th>
                    <th className="calculator-table-header">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {getCurrentSchedule().map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-card' : 'bg-card'}>
                      <td className="calculator-table-cell">
                        {row.paymentNumber === 0 ? 'Initial' : yearlyView ? `Year ${row.paymentNumber}` : `${row.paymentNumber}`}
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
          </div>
        )}
        
        {viewMode === 'chart' && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-400 text-sm">Chart type:</p>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setChartType('line')}
                  className={`relative inline-flex items-center px-4 py-2 rounded-l-md border ${
                    chartType === 'line'
                      ? 'bg-green-600 text-gray-900 dark:text-white-foreground border-green-600 z-10'
                      : 'bg-white dark:bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-100 dark:bg-gray-800'
                  } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500`}
                >
                  Line
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`relative inline-flex items-center px-4 py-2 border-t border-b ${
                    chartType === 'bar'
                      ? 'bg-blue-600 text-gray-900 dark:text-white-foreground border-blue-600 z-10'
                      : 'bg-white dark:bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-100 dark:bg-gray-800'
                  } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                >
                  Bar
                </button>
                <button
                  onClick={() => setChartType('stacked')}
                  className={`relative inline-flex items-center px-4 py-2 rounded-r-md border ${
                    chartType === 'stacked'
                      ? 'bg-orange-600 text-gray-900 dark:text-white-foreground border-orange-600 z-10'
                      : 'bg-white dark:bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-100 dark:bg-gray-800'
                  } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                >
                  Stacked
                </button>
              </div>
            </div>
            <div className="h-96">
              <BoatLoanChart 
                data={amortizationSchedule} 
                type={chartType} 
                currency={currency} 
              />
            </div>
          </div>
        )}
        
        {viewMode === 'summary' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <p className="text-gray-400 mb-4">Summary of your boat loan:</p>
            <ul className="space-y-2">
              <li>Loan amount: {formatCurrency(loanAmount)}</li>
              <li>Interest rate: {interestRate}%</li>
              <li>Loan term: {years} years {months > 0 ? `and ${months} months` : ''}</li>
              <li>Start date: {formatDate(startDate)}</li>
              
              {parseFloat(additionalPaymentStr) > 0 && (
                <>
                  <li>Additional payment: {formatCurrency(additionalPayment)} ({additionalPaymentFrequency})</li>
                </>
              )}
              
              {parseFloat(oneTimePaymentStr) > 0 && (
                <>
                  <li>One-time payment: {formatCurrency(oneTimePayment)} ({oneTimePaymentType === 'balloon' ? 'balloon payment' : `on ${formatDate(oneTimePaymentDate)}`})</li>
                </>
              )}
              
              <li>Monthly payment: {formatCurrency(monthlyPayment)}</li>
              <li>Total payments: {formatCurrency(totalPayments)}</li>
              <li>Total interest: {formatCurrency(totalInterest)}</li>
              <li>Payoff date: {formatDate(payoffDate)}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}