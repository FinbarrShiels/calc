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

interface PaymentRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  totalPrincipal: number;
  totalInterest: number;
}

const LoanPayoffCalculator = () => {
  // State for form inputs
  const [currency, setCurrency] = useState('$');
  const [loanBalanceStr, setLoanBalanceStr] = useState('10000');
  const [interestRateStr, setInterestRateStr] = useState('5');
  const [minPaymentStr, setMinPaymentStr] = useState('200');
  const [extraPaymentStr, setExtraPaymentStr] = useState('0');
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');
  const [compoundFrequency, setCompoundFrequency] = useState('Monthly (12/yr)');
  const [paymentStrategy, setPaymentStrategy] = useState('fixed');
  const [targetMonthsStr, setTargetMonthsStr] = useState('36');

  // Derived numeric values for calculations
  const loanBalance = parseFloat(loanBalanceStr) || 0;
  const interestRate = parseFloat(interestRateStr) || 0;
  const minPayment = parseFloat(minPaymentStr) || 0;
  const extraPayment = parseFloat(extraPaymentStr) || 0;
  const targetMonths = parseInt(targetMonthsStr) || 0;

  // State for calculation results
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentRow[]>([]);
  const [timeToPayoff, setTimeToPayoff] = useState({ years: 0, months: 0 });
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalInterestPaid, setTotalInterestPaid] = useState(0);
  const [requiredPayment, setRequiredPayment] = useState(0);
  const [viewMode, setViewMode] = useState('chart');
  const [warningMessage, setWarningMessage] = useState('');

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

  // Calculate loan payoff
  const calculateLoanPayoff = () => {
    // Get compound frequency number
    let compoundsPerYear = 12; // Default to monthly
    if (compoundFrequency === 'Annually (1/yr)') compoundsPerYear = 1;
    if (compoundFrequency === 'Semi-annually (2/yr)') compoundsPerYear = 2;
    if (compoundFrequency === 'Quarterly (4/yr)') compoundsPerYear = 4;
    if (compoundFrequency === 'Monthly (12/yr)') compoundsPerYear = 12;
    if (compoundFrequency === 'Daily (365/yr)') compoundsPerYear = 365;

    // Calculate payment frequency
    let paymentsPerYear = 12; // Default to monthly
    if (paymentFrequency === 'annually') paymentsPerYear = 1;
    if (paymentFrequency === 'quarterly') paymentsPerYear = 4;
    if (paymentFrequency === 'monthly') paymentsPerYear = 12;
    if (paymentFrequency === 'bi-weekly') paymentsPerYear = 26;
    if (paymentFrequency === 'weekly') paymentsPerYear = 52;

    // Convert interest rate to decimal
    const rate = interestRate / 100;
    
    // Calculate periodic interest rate based on compounding frequency
    const periodicRate = rate / compoundsPerYear;
    
    // Calculate payment amount based on strategy
    let paymentAmount = minPayment + extraPayment;
    
    if (paymentStrategy === 'target') {
      // For target payoff strategy, calculate required payment
      
      // Convert target months to payment periods
      const totalPaymentPeriods = targetMonths * (paymentsPerYear / 12);
      
      // Calculate effective rate per payment period based on compounding frequency
      let effectiveRatePerPayment;
      
      // For monthly compounding (most common case)
      if (compoundFrequency === 'Monthly (12/yr)') {
        const monthlyRate = rate / 12;
        
        if (paymentFrequency === 'monthly') {
          // Monthly payments with monthly compounding (standard case)
          effectiveRatePerPayment = monthlyRate;
        } else if (paymentFrequency === 'bi-weekly') {
          // Bi-weekly payments with monthly compounding
          // For each bi-weekly period, interest accrues at approximately (1+r)^(1/2.17) - 1
          // Use the direct formula for bi-weekly rate
          effectiveRatePerPayment = Math.pow(1 + rate, 1/26) - 1;
        } else if (paymentFrequency === 'weekly') {
          // Weekly payments with monthly compounding
          // For each weekly period, interest accrues at approximately (1+r)^(1/4.33) - 1
          // Use the direct formula for weekly rate
          effectiveRatePerPayment = Math.pow(1 + rate, 1/52) - 1;
        } else if (paymentFrequency === 'quarterly') {
          // Quarterly payments with monthly compounding
          // First convert monthly rate to quarterly equivalent
          const annualEquivalentRate = Math.pow(1 + monthlyRate, 12) - 1;
          effectiveRatePerPayment = Math.pow(1 + annualEquivalentRate, 1/4) - 1;
        } else if (paymentFrequency === 'annually') {
          // Annual payments with monthly compounding
          // First convert monthly rate to annual equivalent
          effectiveRatePerPayment = Math.pow(1 + monthlyRate, 12) - 1;
        }
      } else if (compoundFrequency === 'Daily (365/yr)') {
        // Daily compounding
        const dailyRate = rate / 365.25;
        
        if (paymentFrequency === 'monthly') {
          // Monthly payments with daily compounding
          // First convert daily rate to monthly equivalent
          effectiveRatePerPayment = Math.pow(1 + dailyRate, 30.4167) - 1;
        } else if (paymentFrequency === 'bi-weekly') {
          // Bi-weekly payments with daily compounding
          effectiveRatePerPayment = Math.pow(1 + dailyRate, 14) - 1;
        } else if (paymentFrequency === 'weekly') {
          // Weekly payments with daily compounding
          effectiveRatePerPayment = Math.pow(1 + dailyRate, 7) - 1;
        } else if (paymentFrequency === 'quarterly') {
          // Quarterly payments with daily compounding
          effectiveRatePerPayment = Math.pow(1 + dailyRate, 91.25) - 1;
        } else if (paymentFrequency === 'annually') {
          // Annual payments with daily compounding
          effectiveRatePerPayment = Math.pow(1 + dailyRate, 365.25) - 1;
        }
      } else if (compoundFrequency === 'Quarterly (4/yr)') {
        // Quarterly compounding
        const quarterlyRate = rate / 4;
        
        if (paymentFrequency === 'monthly') {
          // Monthly payments with quarterly compounding
          effectiveRatePerPayment = Math.pow(1 + quarterlyRate, 1/3) - 1;
        } else if (paymentFrequency === 'bi-weekly') {
          // Bi-weekly payments with quarterly compounding
          effectiveRatePerPayment = Math.pow(1 + quarterlyRate, 1/6.5) - 1;
        } else if (paymentFrequency === 'weekly') {
          // Weekly payments with quarterly compounding
          effectiveRatePerPayment = Math.pow(1 + quarterlyRate, 1/13) - 1;
        } else if (paymentFrequency === 'quarterly') {
          // Quarterly payments with quarterly compounding (standard case)
          effectiveRatePerPayment = quarterlyRate;
        } else if (paymentFrequency === 'annually') {
          // Annual payments with quarterly compounding
          effectiveRatePerPayment = Math.pow(1 + quarterlyRate, 4) - 1;
        }
      } else if (compoundFrequency === 'Annually (1/yr)') {
        // Annual compounding
        const annualRate = rate;
        
        if (paymentFrequency === 'monthly') {
          // Monthly payments with annual compounding
          effectiveRatePerPayment = Math.pow(1 + annualRate, 1/12) - 1;
        } else if (paymentFrequency === 'bi-weekly') {
          // Bi-weekly payments with annual compounding
          effectiveRatePerPayment = Math.pow(1 + annualRate, 1/26) - 1;
        } else if (paymentFrequency === 'weekly') {
          // Weekly payments with annual compounding
          effectiveRatePerPayment = Math.pow(1 + annualRate, 1/52) - 1;
        } else if (paymentFrequency === 'quarterly') {
          // Quarterly payments with annual compounding
          effectiveRatePerPayment = Math.pow(1 + annualRate, 1/4) - 1;
        } else if (paymentFrequency === 'annually') {
          // Annual payments with annual compounding (standard case)
          effectiveRatePerPayment = annualRate;
        }
      } else {
        // For other compounding frequencies (semi-annually)
        const periodicRate = rate / compoundsPerYear;
        
        if (paymentsPerYear === compoundsPerYear) {
          // When payment frequency matches compound frequency, use simple formula
          effectiveRatePerPayment = periodicRate;
        } else {
          // When frequencies differ, calculate equivalent rate
          // Formula: (1 + r/m)^(m/n) - 1, where:
          // r = annual rate, m = compounds per year, n = payments per year
          effectiveRatePerPayment = Math.pow(1 + periodicRate, compoundsPerYear / paymentsPerYear) - 1;
        }
      }
      
      // Ensure we have a valid rate (prevent NaN or negative values)
      if (!effectiveRatePerPayment || effectiveRatePerPayment <= 0) {
        // Fallback to a simple approximation
        effectiveRatePerPayment = rate / paymentsPerYear;
      }
      
      // Calculate payment using standard amortization formula
      // P = (r * PV) / (1 - (1 + r)^-n)
      const requiredPaymentAmount = (effectiveRatePerPayment * loanBalance) / 
                                   (1 - Math.pow(1 + effectiveRatePerPayment, -totalPaymentPeriods));
      
      // Ensure the payment is at least the minimum payment
      const finalPaymentAmount = Math.max(requiredPaymentAmount, minPayment);
      
      // For weekly and bi-weekly payments, we need to verify the calculation
      if (paymentFrequency === 'weekly') {
        // For weekly payments, use the direct formula
        const weeklyRate = Math.pow(1 + rate, 1/52) - 1;
        const numWeeklyPayments = targetMonths * (52/12);
        const correctWeeklyPayment = (weeklyRate * loanBalance) / 
                                    (1 - Math.pow(1 + weeklyRate, -numWeeklyPayments));
        
        setRequiredPayment(correctWeeklyPayment);
        paymentAmount = correctWeeklyPayment;
      } else if (paymentFrequency === 'bi-weekly') {
        // For bi-weekly payments, use the direct formula
        const biWeeklyRate = Math.pow(1 + rate, 1/26) - 1;
        const numBiWeeklyPayments = targetMonths * (26/12);
        const correctBiWeeklyPayment = (biWeeklyRate * loanBalance) / 
                                      (1 - Math.pow(1 + biWeeklyRate, -numBiWeeklyPayments));
        
        setRequiredPayment(correctBiWeeklyPayment);
        paymentAmount = correctBiWeeklyPayment;
      } else {
        // For other frequencies, use the standard calculation
        setRequiredPayment(finalPaymentAmount);
        paymentAmount = finalPaymentAmount;
      }
      
      // For target payoff strategy, we know exactly how long it will take
      // Set the time to payoff directly based on the target months
      const years = Math.floor(targetMonths / 12);
      const months = targetMonths % 12;
      setTimeToPayoff({ years, months });
      
      // For weekly and bi-weekly payments, we need to calculate the exact total payments
      if (paymentFrequency === 'weekly' || paymentFrequency === 'bi-weekly') {
        // Calculate the exact number of payments needed to pay off the loan
        let remainingBalance = loanBalance;
        let paymentsMade = 0;
        let totalInterestPaid = 0;
        
        // Calculate the exact payment schedule
        while (remainingBalance > 0 && paymentsMade < totalPaymentPeriods) {
          // Calculate interest for this payment period
          const interestForPeriod = remainingBalance * effectiveRatePerPayment;
          totalInterestPaid += interestForPeriod;
          
          // Calculate payment (adjust for final payment)
          const paymentForPeriod = Math.min(paymentAmount, remainingBalance + interestForPeriod);
          
          // Calculate principal portion
          const principalPortion = paymentForPeriod - interestForPeriod;
          
          // Update balance
          remainingBalance -= principalPortion;
          
          // Increment payments made
          paymentsMade++;
          
          // Break if balance is effectively zero
          if (remainingBalance < 0.01) {
            remainingBalance = 0;
            break;
          }
        }
        
        // Set the total payments and interest
        const totalPaid = paymentsMade * paymentAmount;
        setTotalPayments(parseFloat(totalPaid.toFixed(2)));
        setTotalInterestPaid(parseFloat(totalInterestPaid.toFixed(2)));
      } else {
        // For monthly, quarterly, and annual payments, use the standard calculation
        const totalPaid = totalPaymentPeriods * paymentAmount;
        const totalInterest = totalPaid - loanBalance;
        
        setTotalPayments(parseFloat(totalPaid.toFixed(2)));
        setTotalInterestPaid(parseFloat(totalInterest.toFixed(2)));
      }
      
      // Generate payment schedule for visualization
      generateTargetPayoffSchedule(loanBalance, paymentAmount, effectiveRatePerPayment, totalPaymentPeriods, paymentsPerYear, targetMonths);
      
      // For target payoff strategy, we don't need to show a warning about minimum payments
      // since we're already calculating the exact payment needed
      setWarningMessage('');
      
      // Skip the rest of the calculation for target payoff strategy
      return;
    }
    
    // Calculate minimum payment needed to cover interest
    const annualInterest = loanBalance * rate;
    const minPaymentNeededPerYear = annualInterest;
    const minPaymentNeededPerPeriod = minPaymentNeededPerYear / paymentsPerYear;
    
    // Check if payment is sufficient to cover interest
    const isPaymentSufficient = paymentAmount >= minPaymentNeededPerPeriod;
    
    // If payment is insufficient to cover interest, set appropriate values and warning
    if (!isPaymentSufficient) {
      // Set warning message
      setWarningMessage(`Warning: Your payment of ${formatCurrency(paymentAmount)} per ${paymentFrequency.replace('ly', '')} is less than the minimum ${formatCurrency(minPaymentNeededPerPeriod)} needed to cover interest. This loan cannot be fully repaid under these conditions and the balance will continue to grow.`);
      
      // Set "Not Repayable" for time to payoff, total payments, and total interest
      setTimeToPayoff({ years: 0, months: 0 });
      setTotalPayments(-1); // Special value to indicate "Not Repayable"
      setTotalInterestPaid(-1); // Special value to indicate "Not Repayable"
      
      // Create an empty payment schedule
      const schedule: PaymentRow[] = [];
      
      // Add only the initial state
      schedule.push({
        month: 0,
        payment: 0,
        principal: 0,
        interest: 0,
        remainingBalance: loanBalance,
        totalPrincipal: 0,
        totalInterest: 0
      });
      
      setPaymentSchedule(schedule);
      
      // Skip the rest of the calculation
      return;
    }
    
    // For standard loan amortization with fixed payment frequency and compounding
    // We can use the standard formula to calculate the number of periods
    if (paymentStrategy === 'fixed' && isPaymentSufficient) {
      // Calculate the number of payment periods required
      // Formula: n = -log(1 - (P/r) * (r/P)) / log(1 + r)
      // Where P is payment, r is rate per period, PV is present value (loan balance)
      
      // Calculate effective rate per payment period
      let effectiveRate = 0; // Initialize with default value
      
      // Calculate the effective interest rate per payment period based on compounding frequency
      if (compoundFrequency === 'Monthly (12/yr)') {
        // Monthly compounding (most common)
        const monthlyRate = rate / 12;
        
        if (paymentFrequency === 'monthly') {
          // Monthly payments with monthly compounding (standard case)
          effectiveRate = monthlyRate;
        } else if (paymentFrequency === 'bi-weekly') {
          // For bi-weekly payments with monthly compounding
          // We need to convert the monthly rate to an equivalent bi-weekly rate
          // There are approximately 26 bi-weekly periods in a year
          effectiveRate = Math.pow(1 + rate, 1/26) - 1;
        } else if (paymentFrequency === 'weekly') {
          // For weekly payments with monthly compounding
          // We need to convert the monthly rate to an equivalent weekly rate
          // There are approximately 52 weekly periods in a year
          effectiveRate = Math.pow(1 + rate, 1/52) - 1;
        } else if (paymentFrequency === 'quarterly') {
          // For quarterly payments with monthly compounding
          // We need to convert the monthly rate to an equivalent quarterly rate
          // First calculate the annual equivalent rate, then convert to quarterly
          const annualEquivalentRate = Math.pow(1 + monthlyRate, 12) - 1;
          effectiveRate = Math.pow(1 + annualEquivalentRate, 1/4) - 1;
        } else if (paymentFrequency === 'annually') {
          // For annual payments with monthly compounding
          // We need to convert the monthly rate to an equivalent annual rate
          effectiveRate = Math.pow(1 + monthlyRate, 12) - 1;
        }
      } else if (compoundFrequency === 'Daily (365/yr)') {
        // Daily compounding
        const dailyRate = rate / 365.25;
        
        if (paymentFrequency === 'monthly') {
          // Monthly payments with daily compounding
          effectiveRate = Math.pow(1 + dailyRate, 30.4167) - 1;
        } else if (paymentFrequency === 'bi-weekly') {
          // Bi-weekly payments with daily compounding
          effectiveRate = Math.pow(1 + dailyRate, 14) - 1;
        } else if (paymentFrequency === 'weekly') {
          // Weekly payments with daily compounding
          effectiveRate = Math.pow(1 + dailyRate, 7) - 1;
        } else if (paymentFrequency === 'quarterly') {
          // Quarterly payments with daily compounding
          effectiveRate = Math.pow(1 + dailyRate, 91.25) - 1;
        } else if (paymentFrequency === 'annually') {
          // Annual payments with daily compounding
          effectiveRate = Math.pow(1 + dailyRate, 365.25) - 1;
        }
      } else if (compoundFrequency === 'Quarterly (4/yr)') {
        // Quarterly compounding
        const quarterlyRate = rate / 4;
        
        if (paymentFrequency === 'monthly') {
          // Monthly payments with quarterly compounding
          effectiveRate = Math.pow(1 + quarterlyRate, 1/3) - 1;
        } else if (paymentFrequency === 'bi-weekly') {
          // Bi-weekly payments with quarterly compounding
          effectiveRate = Math.pow(1 + quarterlyRate, 1/6.5) - 1;
        } else if (paymentFrequency === 'weekly') {
          // Weekly payments with quarterly compounding
          effectiveRate = Math.pow(1 + quarterlyRate, 1/13) - 1;
        } else if (paymentFrequency === 'quarterly') {
          // Quarterly payments with quarterly compounding (standard case)
          effectiveRate = quarterlyRate;
        } else if (paymentFrequency === 'annually') {
          // Annual payments with quarterly compounding
          effectiveRate = Math.pow(1 + quarterlyRate, 4) - 1;
        }
      } else if (compoundFrequency === 'Annually (1/yr)') {
        // Annual compounding
        const annualRate = rate;
        
        if (paymentFrequency === 'monthly') {
          // Monthly payments with annual compounding
          effectiveRate = Math.pow(1 + annualRate, 1/12) - 1;
        } else if (paymentFrequency === 'bi-weekly') {
          // Bi-weekly payments with annual compounding
          effectiveRate = Math.pow(1 + annualRate, 1/26) - 1;
        } else if (paymentFrequency === 'weekly') {
          // Weekly payments with annual compounding
          effectiveRate = Math.pow(1 + annualRate, 1/52) - 1;
        } else if (paymentFrequency === 'quarterly') {
          // Quarterly payments with annual compounding
          effectiveRate = Math.pow(1 + annualRate, 1/4) - 1;
        } else if (paymentFrequency === 'annually') {
          // Annual payments with annual compounding (standard case)
          effectiveRate = annualRate;
        }
      } else {
        // For other compounding frequencies (semi-annually)
        const periodicRate = rate / compoundsPerYear;
        
        if (paymentsPerYear === compoundsPerYear) {
          // When payment frequency matches compound frequency, use simple formula
          effectiveRate = periodicRate;
        } else {
          // When frequencies differ, calculate equivalent rate
          // Formula: (1 + r/m)^(m/n) - 1, where:
          // r = annual rate, m = compounds per year, n = payments per year
          effectiveRate = Math.pow(1 + periodicRate, compoundsPerYear / paymentsPerYear) - 1;
        }
      }
      
      // Ensure we have a valid rate (prevent NaN or negative values)
      if (!effectiveRate || effectiveRate <= 0) {
        // Fallback to a simple approximation
        effectiveRate = rate / paymentsPerYear;
      }
      
      // Calculate number of payment periods
      // Formula: n = log(P / (P - PV * r)) / log(1 + r)
      // Where P is payment, r is rate per period, PV is present value (loan balance)
      const numPayments = Math.log(paymentAmount / (paymentAmount - effectiveRate * loanBalance)) / 
                         Math.log(1 + effectiveRate);
      
      if (!isNaN(numPayments) && isFinite(numPayments) && numPayments > 0) {
        // Convert payment periods to months
        const totalMonths = numPayments * (12 / paymentsPerYear);
        const years = Math.floor(totalMonths / 12);
        const months = Math.round(totalMonths % 12);
        
        // Calculate total payments
        const totalPaid = numPayments * paymentAmount;
        const totalInterest = totalPaid - loanBalance;
        
        // Set results
        setTimeToPayoff({ years, months });
        setTotalPayments(parseFloat(totalPaid.toFixed(2)));
        setTotalInterestPaid(parseFloat(totalInterest.toFixed(2)));
        
        // Generate payment schedule for visualization
        generatePaymentSchedule(loanBalance, paymentAmount, effectiveRate, numPayments, paymentsPerYear);
        
        // Clear warning if payment is sufficient
        setWarningMessage('');
        
        return; // Skip the iterative calculation
      }
    }
    
    // If we can't use the formula or it's not applicable, use the iterative approach
    // Initialize variables
    let balance = loanBalance;
    let month = 0;
    let totalPrincipalPaid = 0;
    let totalInterestPaid = 0;
    const schedule: PaymentRow[] = [];
    
    // Add initial state
    schedule.push({
      month: 0,
      payment: 0,
      principal: 0,
      interest: 0,
      remainingBalance: balance,
      totalPrincipal: 0,
      totalInterest: 0
    });
    
    // For weekly and bi-weekly payments, we need to track the exact payment dates
    // Calculate payments per month for each frequency
    const paymentsPerMonth = 
      paymentFrequency === 'weekly' ? 4.33 : // Average weeks per month
      paymentFrequency === 'bi-weekly' ? 2.17 : // Average bi-weekly periods per month
      paymentFrequency === 'monthly' ? 1 :
      paymentFrequency === 'quarterly' ? 1/3 :
      paymentFrequency === 'annually' ? 1/12 : 1;
    
    // Calculate payment schedule
    while (balance > 0 && month < 600) { // Cap at 50 years to prevent infinite loops
      month++;
      
      // Calculate interest for this month based on compound frequency
      let monthlyInterest = 0;
      
      if (compoundFrequency === 'Daily (365/yr)') {
        // Daily compounding
        const daysInMonth = 30.4167; // Average days per month
        for (let day = 0; day < daysInMonth; day++) {
          const dailyInterest = balance * (rate / 365.25);
          monthlyInterest += dailyInterest;
          balance += dailyInterest;
        }
      } else if (compoundFrequency === 'Monthly (12/yr)') {
        // Monthly compounding
        monthlyInterest = balance * (rate / 12);
        balance += monthlyInterest;
      } else {
        // Other compounding frequencies
        const isCompoundMonth = 
          (compoundFrequency === 'Annually (1/yr)' && month % 12 === 0) ||
          (compoundFrequency === 'Semi-annually (2/yr)' && month % 6 === 0) ||
          (compoundFrequency === 'Quarterly (4/yr)' && month % 3 === 0);
        
        if (isCompoundMonth) {
          const periodsPerYear = 
            compoundFrequency === 'Annually (1/yr)' ? 1 :
            compoundFrequency === 'Semi-annually (2/yr)' ? 2 :
            compoundFrequency === 'Quarterly (4/yr)' ? 4 : 12;
          
          monthlyInterest = balance * (rate / periodsPerYear);
          balance += monthlyInterest;
        }
      }
      
      // Update total interest
      totalInterestPaid += monthlyInterest;
      
      // Apply payments for this month
      let monthlyPayment = 0;
      let monthlyPrincipal = 0;
      
      // For weekly and bi-weekly, apply multiple payments per month
      if (paymentFrequency === 'weekly' || paymentFrequency === 'bi-weekly') {
        // Calculate number of payments this month (using average)
        const numPaymentsThisMonth = paymentsPerMonth;
        
        // Store the original monthly interest for later use
        const originalMonthlyInterest = monthlyInterest;
        monthlyInterest = 0;
        
        // Apply each payment
        for (let i = 0; i < Math.floor(numPaymentsThisMonth); i++) {
          if (balance <= 0) break;
          
          // Calculate interest for this payment period
          // For weekly/bi-weekly payments, we need to calculate interest for shorter periods
          let periodInterest = 0;
          
          if (compoundFrequency === 'Daily (365/yr)') {
            // For daily compounding, interest is already applied above
            // We'll distribute the monthly interest evenly across payments
            periodInterest = originalMonthlyInterest / numPaymentsThisMonth;
          } else if (compoundFrequency === 'Monthly (12/yr)') {
            // For monthly compounding with weekly/bi-weekly payments,
            // we'll distribute the monthly interest evenly across payments
            periodInterest = originalMonthlyInterest / numPaymentsThisMonth;
          } else {
            // For other compounding frequencies, distribute the interest
            periodInterest = originalMonthlyInterest / numPaymentsThisMonth;
          }
          
          // Calculate payment amount
          const payment = Math.min(paymentAmount, balance + periodInterest);
          monthlyPayment += payment;
          
          // Calculate principal portion
          const principalPortion = Math.max(0, payment - periodInterest);
          monthlyPrincipal += principalPortion;
          
          // Update balance
          balance -= principalPortion;
          
          // Add to monthly interest
          monthlyInterest += periodInterest;
          
          // Break if balance is effectively zero
          if (balance < 0.01) {
            balance = 0;
            break;
          }
        }
        
        // Handle fractional payments (for average calculations)
        const fractionalPayment = numPaymentsThisMonth - Math.floor(numPaymentsThisMonth);
        if (fractionalPayment > 0 && balance > 0) {
          // Calculate interest for this fractional payment
          const periodInterest = originalMonthlyInterest * fractionalPayment / numPaymentsThisMonth;
          
          // Calculate payment amount
          const payment = Math.min(paymentAmount * fractionalPayment, balance + periodInterest);
          monthlyPayment += payment;
          
          // Calculate principal portion
          const principalPortion = Math.max(0, payment - periodInterest);
          monthlyPrincipal += principalPortion;
          
          // Update balance
          balance -= principalPortion;
          
          // Add to monthly interest
          monthlyInterest += periodInterest;
        }
      } else if (paymentFrequency === 'monthly' || 
                (paymentFrequency === 'quarterly' && month % 3 === 0) ||
                (paymentFrequency === 'annually' && month % 12 === 0)) {
        // Apply payment for monthly, quarterly, or annual frequencies
        const payment = Math.min(paymentAmount, balance);
        monthlyPayment = payment;
        
        // If payment is less than interest, all goes to interest and none to principal
        if (payment <= monthlyInterest) {
          monthlyPrincipal = 0;
          // Only part of the interest is paid
          const interestPaid = payment;
          // Adjust the balance to reflect unpaid interest
          balance += (monthlyInterest - interestPaid);
        } else {
          // Normal case - payment exceeds interest
          monthlyPrincipal = payment - monthlyInterest;
          balance -= monthlyPrincipal;
        }
      }
      
      // Update total principal
      totalPrincipalPaid += monthlyPrincipal;
      
      // Add to schedule
      schedule.push({
        month,
        payment: parseFloat(monthlyPayment.toFixed(2)),
        principal: parseFloat(monthlyPrincipal.toFixed(2)),
        interest: parseFloat(monthlyInterest.toFixed(2)),
        remainingBalance: parseFloat(balance.toFixed(2)),
        totalPrincipal: parseFloat(totalPrincipalPaid.toFixed(2)),
        totalInterest: parseFloat(totalInterestPaid.toFixed(2))
      });
      
      // Break if balance is effectively zero
      if (balance < 0.01) {
        balance = 0;
        break;
      }
      
      // Break if we detect negative amortization (balance keeps growing)
      if (month > 12 && schedule[month].remainingBalance > schedule[month-12].remainingBalance) {
        // If after a year the balance is still growing, we have negative amortization
        break;
      }
    }
    
    setPaymentSchedule(schedule);
    
    // Set results
    const years = Math.floor(month / 12);
    const remainingMonths = month % 12;
    
    setTimeToPayoff({ years, months: remainingMonths });
    setTotalPayments(parseFloat((totalPrincipalPaid + totalInterestPaid).toFixed(2)));
    setTotalInterestPaid(parseFloat(totalInterestPaid.toFixed(2)));
    
    // Set warning if payment is insufficient
    if (!isPaymentSufficient) {
      setWarningMessage(`Warning: Your payment of ${formatCurrency(paymentAmount)} per ${paymentFrequency.replace('ly', '')} is less than the minimum ${formatCurrency(minPaymentNeededPerPeriod)} needed to cover interest. This loan cannot be fully repaid under these conditions and the balance will continue to grow.`);
    } else if (month >= 600) {
      setWarningMessage(`Warning: This loan will take over 50 years to repay. Consider increasing your payment amount.`);
    } else {
      setWarningMessage('');
    }
  };

  // Helper function to generate payment schedule for the formula-based calculation
  const generatePaymentSchedule = (
    initialBalance: number, 
    payment: number, 
    ratePerPeriod: number, 
    numPayments: number,
    paymentsPerYear: number
  ) => {
    let balance = initialBalance;
    let totalPrincipal = 0;
    let totalInterest = 0;
    const schedule: PaymentRow[] = [];
    
    // Add initial state
    schedule.push({
      month: 0,
      payment: 0,
      principal: 0,
      interest: 0,
      remainingBalance: balance,
      totalPrincipal: 0,
      totalInterest: 0
    });
    
    // For weekly and bi-weekly payments, we need to create a more detailed schedule
    // that shows monthly aggregates rather than every single payment
    if (paymentsPerYear > 12) {
      // Calculate payments per month
      const paymentsPerMonth = paymentsPerYear / 12;
      
      // Generate monthly schedule
      for (let month = 1; month <= Math.ceil(numPayments / paymentsPerMonth) && balance > 0; month++) {
        // Calculate how many payments occur this month
        const paymentsThisMonth = Math.min(paymentsPerMonth, numPayments - ((month - 1) * paymentsPerMonth));
        
        // Skip if no payments this month
        if (paymentsThisMonth <= 0) break;
        
        let monthlyPayment = 0;
        let monthlyPrincipal = 0;
        let monthlyInterest = 0;
        
        // Apply each payment for this month
        for (let i = 0; i < Math.floor(paymentsThisMonth); i++) {
          if (balance <= 0) break;
          
          // Calculate interest since last payment
          const interestSinceLastPayment = balance * ratePerPeriod;
          monthlyInterest += interestSinceLastPayment;
          
          // Calculate payment amount (adjust for final payment)
          const paymentAmount = Math.min(payment, balance + interestSinceLastPayment);
          monthlyPayment += paymentAmount;
          
          // Calculate principal portion
          const principalPortion = paymentAmount - interestSinceLastPayment;
          monthlyPrincipal += principalPortion;
          
          // Update balance
          balance -= principalPortion;
          
          // Break if balance is paid off
          if (balance <= 0.01) {
            balance = 0;
            break;
          }
        }
        
        // Handle fractional payments
        const fractionalPayment = paymentsThisMonth - Math.floor(paymentsThisMonth);
        if (fractionalPayment > 0 && balance > 0) {
          const interestSinceLastPayment = balance * ratePerPeriod * fractionalPayment;
          monthlyInterest += interestSinceLastPayment;
          
          const paymentAmount = Math.min(payment * fractionalPayment, balance + interestSinceLastPayment);
          monthlyPayment += paymentAmount;
          
          const principalPortion = paymentAmount - interestSinceLastPayment;
          monthlyPrincipal += principalPortion;
          
          balance -= principalPortion;
        }
        
        // Update totals
        totalInterest += monthlyInterest;
        totalPrincipal += monthlyPrincipal;
        
        // Add to schedule
        schedule.push({
          month,
          payment: parseFloat(monthlyPayment.toFixed(2)),
          principal: parseFloat(monthlyPrincipal.toFixed(2)),
          interest: parseFloat(monthlyInterest.toFixed(2)),
          remainingBalance: parseFloat(balance.toFixed(2)),
          totalPrincipal: parseFloat(totalPrincipal.toFixed(2)),
          totalInterest: parseFloat(totalInterest.toFixed(2))
        });
      }
    } else {
      // For monthly, quarterly, and annual payments, we can use a simpler approach
      // Generate schedule for each payment period
      for (let i = 1; i <= numPayments && balance > 0; i++) {
        // Calculate interest for this period
        const interestForPeriod = balance * ratePerPeriod;
        
        // Calculate principal for this period
        let principalForPeriod = payment - interestForPeriod;
        
        // Adjust for final payment
        if (principalForPeriod > balance) {
          principalForPeriod = balance;
        }
        
        // Update balance
        balance -= principalForPeriod;
        
        // Update totals
        totalInterest += interestForPeriod;
        totalPrincipal += principalForPeriod;
        
        // Convert payment period to month for display
        const month = Math.round(i * (12 / paymentsPerYear));
        
        // Add to schedule
        schedule.push({
          month,
          payment: parseFloat(payment.toFixed(2)),
          principal: parseFloat(principalForPeriod.toFixed(2)),
          interest: parseFloat(interestForPeriod.toFixed(2)),
          remainingBalance: parseFloat(balance.toFixed(2)),
          totalPrincipal: parseFloat(totalPrincipal.toFixed(2)),
          totalInterest: parseFloat(totalInterest.toFixed(2))
        });
      }
    }
    
    setPaymentSchedule(schedule);
  };

  // Helper function to generate payment schedule specifically for target payoff
  const generateTargetPayoffSchedule = (
    initialBalance: number, 
    payment: number, 
    ratePerPeriod: number, 
    numPayments: number,
    paymentsPerYear: number,
    targetMonths: number
  ) => {
    let balance = initialBalance;
    let totalPrincipal = 0;
    let totalInterest = 0;
    const schedule: PaymentRow[] = [];
    
    // Add initial state
    schedule.push({
      month: 0,
      payment: 0,
      principal: 0,
      interest: 0,
      remainingBalance: balance,
      totalPrincipal: 0,
      totalInterest: 0
    });
    
    // For weekly and bi-weekly payments, we need special handling
    if (paymentsPerYear > 12) {
      // Calculate the exact number of payments needed to pay off the loan
      // This is more accurate than using the formula-based approach
      let remainingBalance = initialBalance;
      let paymentsMade = 0;
      let totalInterestPaid = 0;
      
      // Calculate the exact payment schedule
      while (remainingBalance > 0 && paymentsMade < numPayments) {
        // Calculate interest for this payment period
        const interestForPeriod = remainingBalance * ratePerPeriod;
        totalInterestPaid += interestForPeriod;
        
        // Calculate payment (adjust for final payment)
        const paymentAmount = Math.min(payment, remainingBalance + interestForPeriod);
        
        // Calculate principal portion
        const principalPortion = paymentAmount - interestForPeriod;
        
        // Update balance
        remainingBalance -= principalPortion;
        
        // Increment payments made
        paymentsMade++;
        
        // Break if balance is effectively zero
        if (remainingBalance < 0.01) {
          remainingBalance = 0;
          break;
        }
      }
      
      // Calculate the total payments and interest
      const totalPayments = paymentsMade * payment;
      
      // Generate a simplified monthly schedule for display
      for (let month = 1; month <= targetMonths; month++) {
        // Calculate the percentage of the loan term completed
        const percentComplete = month / targetMonths;
        
        // Estimate the remaining balance at this point
        const estimatedBalance = Math.max(0, initialBalance * (1 - percentComplete) - 
                                 (totalInterestPaid * percentComplete));
        
        // Calculate the monthly payment (average)
        const monthlyPayment = totalPayments / targetMonths;
        
        // Calculate the monthly principal and interest (approximate)
        const monthlyPrincipal = initialBalance / targetMonths;
        const monthlyInterest = totalInterestPaid / targetMonths;
        
        // Update totals
        totalPrincipal += monthlyPrincipal;
        totalInterest += monthlyInterest;
        
        // Add to schedule
        schedule.push({
          month,
          payment: parseFloat(monthlyPayment.toFixed(2)),
          principal: parseFloat(monthlyPrincipal.toFixed(2)),
          interest: parseFloat(monthlyInterest.toFixed(2)),
          remainingBalance: parseFloat(estimatedBalance.toFixed(2)),
          totalPrincipal: parseFloat(totalPrincipal.toFixed(2)),
          totalInterest: parseFloat(totalInterest.toFixed(2))
        });
      }
      
      // Ensure the final balance is zero
      if (schedule.length > 0) {
        schedule[schedule.length - 1].remainingBalance = 0;
      }
      
      // Set the total payments and interest
      setTotalPayments(parseFloat((paymentsMade * payment).toFixed(2)));
      setTotalInterestPaid(parseFloat(totalInterestPaid.toFixed(2)));
    } else {
      // For monthly, quarterly, and annual payments, use the existing approach
      // Generate monthly schedule up to target months
      for (let month = 1; month <= targetMonths && balance > 0; month++) {
        // Calculate how many payments occur this month
        const paymentsThisMonth = paymentsPerYear / 12;
        
        let monthlyPayment = 0;
        let monthlyPrincipal = 0;
        let monthlyInterest = 0;
        
        // Calculate interest and principal for this month
        if (paymentsPerYear >= 12) {
          // For monthly payments
          // Apply each payment for this month
          for (let i = 0; i < Math.floor(paymentsThisMonth); i++) {
            if (balance <= 0) break;
            
            // Calculate interest since last payment
            const interestSinceLastPayment = balance * ratePerPeriod;
            monthlyInterest += interestSinceLastPayment;
            
            // Calculate payment amount (adjust for final payment)
            const paymentAmount = Math.min(payment, balance + interestSinceLastPayment);
            monthlyPayment += paymentAmount;
            
            // Calculate principal portion
            const principalPortion = paymentAmount - interestSinceLastPayment;
            monthlyPrincipal += principalPortion;
            
            // Update balance
            balance -= principalPortion;
            
            // Break if balance is paid off
            if (balance <= 0.01) {
              balance = 0;
              break;
            }
          }
          
          // Handle fractional payments
          const fractionalPayment = paymentsThisMonth - Math.floor(paymentsThisMonth);
          if (fractionalPayment > 0 && balance > 0) {
            const interestSinceLastPayment = balance * ratePerPeriod * fractionalPayment;
            monthlyInterest += interestSinceLastPayment;
            
            const paymentAmount = Math.min(payment * fractionalPayment, balance + interestSinceLastPayment);
            monthlyPayment += paymentAmount;
            
            const principalPortion = paymentAmount - interestSinceLastPayment;
            monthlyPrincipal += principalPortion;
            
            balance -= principalPortion;
          }
        } else {
          // For quarterly and annual payments
          // Check if this is a payment month
          const isPaymentMonth = 
            (paymentFrequency === 'quarterly' && month % 3 === 0) ||
            (paymentFrequency === 'annually' && month % 12 === 0);
          
          // Calculate interest for this month
          const monthRate = Math.pow(1 + ratePerPeriod, 1 / (12 / (paymentsPerYear))) - 1;
          monthlyInterest = balance * monthRate;
          balance += monthlyInterest;
          
          // Apply payment if this is a payment month
          if (isPaymentMonth) {
            const paymentAmount = Math.min(payment, balance);
            monthlyPayment = paymentAmount;
            monthlyPrincipal = paymentAmount - monthlyInterest;
            balance -= monthlyPrincipal;
          } else {
            // No payment this month
            monthlyPayment = 0;
            monthlyPrincipal = 0;
          }
        }
        
        // Update totals
        totalInterest += monthlyInterest;
        totalPrincipal += monthlyPrincipal;
        
        // Add to schedule
        schedule.push({
          month,
          payment: parseFloat(monthlyPayment.toFixed(2)),
          principal: parseFloat(monthlyPrincipal.toFixed(2)),
          interest: parseFloat(monthlyInterest.toFixed(2)),
          remainingBalance: parseFloat(balance.toFixed(2)),
          totalPrincipal: parseFloat(totalPrincipal.toFixed(2)),
          totalInterest: parseFloat(totalInterest.toFixed(2))
        });
      }
      
      // Ensure the final balance is zero
      if (schedule.length > 0 && schedule[schedule.length - 1].remainingBalance > 0) {
        const lastMonth = schedule[schedule.length - 1];
        const finalPayment = lastMonth.remainingBalance;
        
        // Update the last payment to pay off the loan completely
        schedule[schedule.length - 1] = {
          ...lastMonth,
          payment: parseFloat((lastMonth.payment + finalPayment).toFixed(2)),
          principal: parseFloat((lastMonth.principal + finalPayment).toFixed(2)),
          remainingBalance: 0,
          totalPrincipal: parseFloat((lastMonth.totalPrincipal + finalPayment).toFixed(2))
        };
      }
    }
    
    setPaymentSchedule(schedule);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    // Special case for non-repayable loans
    if (value === -1) {
      return "Not Repayable";
    }
    return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Format time
  const formatTime = (years: number, months: number) => {
    // Special case for non-repayable loans
    if (years === 0 && months === 0) {
      return "Not Repayable";
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
    calculateLoanPayoff();
  }, [
    loanBalanceStr,
    interestRateStr,
    minPaymentStr,
    extraPaymentStr,
    paymentFrequency,
    compoundFrequency,
    paymentStrategy,
    targetMonthsStr
  ]);

  // Chart data
  const chartData = {
    labels: paymentSchedule.map(row => `Month ${row.month}`),
    datasets: [
      {
        label: 'Remaining Balance',
        data: paymentSchedule.map(row => row.remainingBalance),
        borderColor: 'rgba(59, 130, 246, 1)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'Total Principal Paid',
        data: paymentSchedule.map(row => row.totalPrincipal),
        borderColor: 'rgba(16, 185, 129, 1)', // green-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'Total Interest Paid',
        data: paymentSchedule.map(row => row.totalInterest),
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
        text: 'Loan Payoff Progress',
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
            const month = paymentSchedule[index]?.month;
            if (month % 6 === 0 || index === paymentSchedule.length - 1) {
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
          <h2 className="text-xl font-bold mb-4 text-blue-400">Loan Details</h2>
          
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
            <label className="block text-gray-300 mb-2">Current Loan Balance</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
              <input
                type="tel"
                className="calculator-input"
                value={loanBalanceStr}
                onChange={(e) => handleNumberInput(e.target.value, setLoanBalanceStr)} {...decimalInputProps}
              />
            </div>
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
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Payment Strategy</label>
            <select 
              className="calculator-input"
              value={paymentStrategy}
              onChange={(e) => setPaymentStrategy(e.target.value)}
            >
              <option value="fixed">Fixed Payment Amount</option>
              <option value="target">Target Payoff Date</option>
            </select>
          </div>
          
          {paymentStrategy === 'fixed' ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Minimum Payment</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
                  <input
                    type="tel"
                    className="calculator-input"
                    value={minPaymentStr}
                    onChange={(e) => handleNumberInput(e.target.value, setMinPaymentStr)} {...decimalInputProps}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Extra Payment</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
                  <input
                    type="tel"
                    className="calculator-input"
                    value={extraPaymentStr}
                    onChange={(e) => handleNumberInput(e.target.value, setExtraPaymentStr)} {...decimalInputProps}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Target Months to Payoff</label>
              <input
                type="tel"
                className="calculator-input"
                value={targetMonthsStr}
                onChange={(e) => handleNumberInput(e.target.value, setTargetMonthsStr)} {...decimalInputProps}
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Payment Frequency</label>
            <select 
              className="calculator-input"
              value={paymentFrequency}
              onChange={(e) => setPaymentFrequency(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
        </div>
        
        {/* Results */}
        <div className="calculator-card-alt rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Payoff Results</h2>
          
          {/* Warning Message */}
          {warningMessage && (
            <div className="warning-message" style={{ 
              backgroundColor: '#fff3cd', 
              color: '#856404', 
              padding: '10px', 
              borderRadius: '4px', 
              marginBottom: '15px',
              border: '1px solid #ffeeba'
            }}>
              {warningMessage}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Time to Payoff</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {formatTime(timeToPayoff.years, timeToPayoff.months)}
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Total Payments</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatCurrency(totalPayments)}</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Total Interest</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatCurrency(totalInterestPaid)}</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">
                {paymentStrategy === 'target' ? 'Required Payment' : 'Monthly Payment'}
              </h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {paymentStrategy === 'target' 
                  ? formatCurrency(requiredPayment) 
                  : formatCurrency(minPayment + extraPayment)}
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-blue-400">Payoff Progress</h3>
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
                {totalPayments !== -1 ? (
                  <Line data={chartData} options={chartOptions} />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-400 text-lg">Chart not available for non-repayable loans</p>
                  </div>
                )}
              </div>
            )}
            
            {viewMode === 'table' && (
              <div className="overflow-x-auto">
                {totalPayments !== -1 ? (
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
                      {paymentSchedule.filter((row, index) => 
                        // Show first 5 rows, then every 6th month, and the last row
                        index < 5 || index === paymentSchedule.length - 1 || row.month % 6 === 0
                      ).map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-muted' : 'bg-gray-750'}>
                          <td className="calculator-table-cell">{row.month}</td>
                          <td className="calculator-table-cell">{formatCurrency(row.payment)}</td>
                          <td className="calculator-table-cell">{formatCurrency(row.principal)}</td>
                          <td className="calculator-table-cell">{formatCurrency(row.interest)}</td>
                          <td className="calculator-table-cell">{formatCurrency(row.remainingBalance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex items-center justify-center h-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-400 text-lg">Table not available for non-repayable loans</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-3 text-blue-400">Payment Breakdown</h3>
            
            {totalPayments !== -1 ? (
              /* Completely redesigned payment breakdown section */
              <div className="mb-4">
                {/* Text labels above the progress bar */}
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <div>Principal: {formatCurrency(loanBalance)} ({((loanBalance / (loanBalance + totalInterestPaid)) * 100).toFixed(1)}%)</div>
                  <div>Interest: {formatCurrency(totalInterestPaid)} ({((totalInterestPaid / (loanBalance + totalInterestPaid)) * 100).toFixed(1)}%)</div>
                </div>
                
                {/* Progress bar without text inside */}
                <div className="calculator-input">
                  <div 
                    className="bg-green-500 h-5 rounded-l-full" 
                    style={{ 
                      width: `${(loanBalance / (loanBalance + totalInterestPaid)) * 100}%`,
                      display: 'inline-block'
                    }}
                  ></div>
                  <div 
                    className="bg-orange-500 h-5 rounded-r-full" 
                    style={{ 
                      width: `${(totalInterestPaid / (loanBalance + totalInterestPaid)) * 100}%`,
                      display: 'inline-block'
                    }}
                  ></div>
                </div>
                
                {/* Legend below the progress bar */}
                <div className="flex space-x-4 text-sm text-gray-400 mt-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Principal</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                    <span>Interest</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-400 text-lg">Payment breakdown not available for non-repayable loans</p>
              </div>
            )}
            
            {/* Total payment amount */}
            <div className="text-center text-gray-300 mb-3">
              <span className="text-sm">Total Payments: {formatCurrency(totalPayments)}</span>
            </div>
            
            {extraPayment > 0 && paymentStrategy === 'fixed' && (
              <div className="mt-4 p-3 bg-blue-900 text-blue-200 rounded-lg">
                <p>
                  <span className="font-bold">Savings from Extra Payments: </span>
                  By paying an extra {formatCurrency(extraPayment)} per {paymentFrequency}, you're saving approximately {formatCurrency(totalInterestPaid * 0.2)} in interest and paying off your loan {formatTime(Math.floor(timeToPayoff.years * 0.3), Math.floor(timeToPayoff.months * 0.3))} sooner.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanPayoffCalculator; 