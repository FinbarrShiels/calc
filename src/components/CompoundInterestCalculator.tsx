"use client";

import { useState, useEffect, useRef } from 'react';
import CompoundInterestChart from './CompoundInterestChart';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

interface BreakdownRow {
  year: number;
  interest: number;
  accruedInterest: number;
  balance: number;
  contributions?: number;
  totalContributions?: number;
  withdrawals?: number;
  totalWithdrawals?: number;
}

interface CompoundInterestCalculatorProps {
  defaultCompoundFrequency?: string;
}

const CompoundInterestCalculator = ({ defaultCompoundFrequency = 'Monthly (12/yr)' }: CompoundInterestCalculatorProps) => {
  // State for form inputs
  const [currency, setCurrency] = useState('$');
  const [initialInvestmentStr, setInitialInvestmentStr] = useState('5000');
  const [interestRateStr, setInterestRateStr] = useState('5');
  const [compoundFrequency, setCompoundFrequency] = useState(defaultCompoundFrequency);
  const [yearsStr, setYearsStr] = useState('5');
  const [monthsStr, setMonthsStr] = useState('0');
  const [additionalContribution, setAdditionalContribution] = useState('None');
  const [depositAmountStr, setDepositAmountStr] = useState('0');
  const [depositFrequency, setDepositFrequency] = useState('monthly');
  const [depositTiming, setDepositTiming] = useState('Beginning');
  const [annualDepositIncreaseStr, setAnnualDepositIncreaseStr] = useState('0');
  const [withdrawalAmountStr, setWithdrawalAmountStr] = useState('0');
  const [withdrawalFrequency, setWithdrawalFrequency] = useState('monthly');
  const [annualWithdrawalIncreaseStr, setAnnualWithdrawalIncreaseStr] = useState('0');

  // Derived numeric values for calculations
  const initialInvestment = parseFloat(initialInvestmentStr) || 0;
  const interestRate = parseFloat(interestRateStr) || 0;
  const years = parseInt(yearsStr) || 0;
  const months = parseInt(monthsStr) || 0;
  const depositAmount = parseFloat(depositAmountStr) || 0;
  const annualDepositIncrease = parseFloat(annualDepositIncreaseStr) || 0;
  const withdrawalAmount = parseFloat(withdrawalAmountStr) || 0;
  const annualWithdrawalIncrease = parseFloat(annualWithdrawalIncreaseStr) || 0;

  // State for calculation results
  const [futureValue, setFutureValue] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [yearlyRate, setYearlyRate] = useState(0);
  const [compoundedRate, setCompoundedRate] = useState(0);
  const [rateOfReturn, setRateOfReturn] = useState(0);
  const [timeToDouble, setTimeToDouble] = useState({ years: 0, months: 0 });
  const [yearlyBreakdown, setYearlyBreakdown] = useState<BreakdownRow[]>([]);
  const [monthlyBreakdown, setMonthlyBreakdown] = useState<BreakdownRow[]>([]);
  const [breakdownType, setBreakdownType] = useState<'yearly' | 'monthly'>('yearly');
  const [viewMode, setViewMode] = useState('table');
  const [chartType, setChartType] = useState<'line' | 'bar' | 'stacked'>('line');
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

  // Calculate compound interest
  const calculateCompoundInterest = () => {
    // Get compound frequency number
    let compoundsPerYear = 12; // Default to monthly
    if (compoundFrequency === 'Annually (1/yr)') compoundsPerYear = 1;
    if (compoundFrequency === 'Semi-annually (2/yr)') compoundsPerYear = 2;
    if (compoundFrequency === 'Quarterly (4/yr)') compoundsPerYear = 4;
    if (compoundFrequency === 'Monthly (12/yr)') compoundsPerYear = 12;
    if (compoundFrequency === 'Daily (365/yr)') compoundsPerYear = 365;

    // Calculate total periods
    const totalPeriods = years + (months / 12);
    
    // Calculate compound interest
    const rate = interestRate / 100;
    const compoundRate = Math.pow(1 + (rate / compoundsPerYear), compoundsPerYear) - 1;
    
    // Calculate contribution frequency
    let contributionsPerYear = 12; // Default to monthly
    if (depositFrequency === 'annually') contributionsPerYear = 1;
    if (depositFrequency === 'quarterly') contributionsPerYear = 4;
    if (depositFrequency === 'monthly') contributionsPerYear = 12;
    
    // Calculate withdrawal frequency
    let withdrawalsPerYear = 12; // Default to monthly
    if (withdrawalFrequency === 'annually') withdrawalsPerYear = 1;
    if (withdrawalFrequency === 'quarterly') withdrawalsPerYear = 4;
    if (withdrawalFrequency === 'monthly') withdrawalsPerYear = 12;
    
    // Calculate breakdown
    const calculatedYearlyBreakdown: BreakdownRow[] = [];
    const calculatedMonthlyBreakdown: BreakdownRow[] = [];
    
    let currentBalance = initialInvestment;
    let accruedInterest = 0;
    let totalContributions = 0;
    let totalWithdrawals = 0;
    let currentDepositAmount = depositAmount;
    let currentWithdrawalAmount = withdrawalAmount;
    
    // Add initial row to both breakdowns
    calculatedYearlyBreakdown.push({
      year: 0,
      interest: 0,
      accruedInterest: 0,
      balance: currentBalance,
      contributions: 0,
      totalContributions: 0,
      withdrawals: 0,
      totalWithdrawals: 0
    });
    
    calculatedMonthlyBreakdown.push({
      year: 0,
      interest: 0,
      accruedInterest: 0,
      balance: currentBalance,
      contributions: 0,
      totalContributions: 0,
      withdrawals: 0,
      totalWithdrawals: 0
    });
    
    // Total months to calculate
    const totalMonths = years * 12 + months;
    
    // For monthly breakdown
    for (let month = 1; month <= totalMonths; month++) {
      const currentYear = Math.floor(month / 12);
      const currentMonth = month % 12 === 0 ? 12 : month % 12;
      
      let monthlyInterest = 0;
      let monthlyContributions = 0;
      let monthlyWithdrawals = 0;
      
      // For each compound period in the month
      const periodsPerMonth = compoundsPerYear / 12;
      for (let period = 1; period <= periodsPerMonth; period++) {
        // Apply contributions at the beginning of period if enabled
        if ((additionalContribution === 'Deposits' || additionalContribution === 'Both') && depositAmount > 0) {
          if (depositTiming === 'Beginning') {
            // Calculate how many contributions to make in this compound period
            const contributionsThisPeriod = contributionsPerYear / compoundsPerYear;
            const contributionAmount = currentDepositAmount * contributionsThisPeriod;
            
            if (contributionAmount > 0) {
              currentBalance += contributionAmount;
              monthlyContributions += contributionAmount;
              totalContributions += contributionAmount;
            }
          }
        }
        
        // Apply withdrawals at the beginning of period if enabled
        if ((additionalContribution === 'Withdrawals' || additionalContribution === 'Both') && withdrawalAmount > 0) {
          // Calculate how many withdrawals to make in this compound period
          const withdrawalsThisPeriod = withdrawalsPerYear / compoundsPerYear;
          const withdrawalAmountThisPeriod = currentWithdrawalAmount * withdrawalsThisPeriod;
          
          if (withdrawalAmountThisPeriod > 0 && currentBalance > withdrawalAmountThisPeriod) {
            currentBalance -= withdrawalAmountThisPeriod;
            monthlyWithdrawals += withdrawalAmountThisPeriod;
            totalWithdrawals += withdrawalAmountThisPeriod;
          }
        }
        
        // Calculate interest for this period
        const periodInterest = currentBalance * (rate / compoundsPerYear);
        monthlyInterest += periodInterest;
        currentBalance += periodInterest;
        
        // Apply contributions at the end of period if enabled
        if ((additionalContribution === 'Deposits' || additionalContribution === 'Both') && depositAmount > 0) {
          if (depositTiming === 'End') {
            // Calculate how many contributions to make in this compound period
            const contributionsThisPeriod = contributionsPerYear / compoundsPerYear;
            const contributionAmount = currentDepositAmount * contributionsThisPeriod;
            
            if (contributionAmount > 0) {
              currentBalance += contributionAmount;
              monthlyContributions += contributionAmount;
              totalContributions += contributionAmount;
            }
          }
        }
      }
      
      accruedInterest += monthlyInterest;
      
      // Increase deposit/withdrawal amount at the beginning of each year
      if (currentMonth === 1 && month > 12) {
        if (annualDepositIncrease > 0) {
          currentDepositAmount += currentDepositAmount * (annualDepositIncrease / 100);
        }
        
        if (annualWithdrawalIncrease > 0) {
          currentWithdrawalAmount += currentWithdrawalAmount * (annualWithdrawalIncrease / 100);
        }
      }
      
      // Add to monthly breakdown
      calculatedMonthlyBreakdown.push({
        year: currentYear + (currentMonth / 12),
        interest: parseFloat(monthlyInterest.toFixed(2)),
        accruedInterest: parseFloat(accruedInterest.toFixed(2)),
        balance: parseFloat(currentBalance.toFixed(2)),
        contributions: parseFloat(monthlyContributions.toFixed(2)),
        totalContributions: parseFloat(totalContributions.toFixed(2)),
        withdrawals: parseFloat(monthlyWithdrawals.toFixed(2)),
        totalWithdrawals: parseFloat(totalWithdrawals.toFixed(2))
      });
      
      // If this is the last month of a year, add to yearly breakdown
      if (currentMonth === 12 || month === totalMonths) {
        calculatedYearlyBreakdown.push({
          year: currentYear + (currentMonth === 12 ? 1 : currentMonth / 12),
          interest: parseFloat(monthlyInterest.toFixed(2)),
          accruedInterest: parseFloat(accruedInterest.toFixed(2)),
          balance: parseFloat(currentBalance.toFixed(2)),
          contributions: parseFloat(monthlyContributions.toFixed(2)),
          totalContributions: parseFloat(totalContributions.toFixed(2)),
          withdrawals: parseFloat(monthlyWithdrawals.toFixed(2)),
          totalWithdrawals: parseFloat(totalWithdrawals.toFixed(2))
        });
      }
    }
    
    // Calculate future value (which is the final balance)
    const futureVal = currentBalance;
    
    // Set results
    setFutureValue(parseFloat(futureVal.toFixed(2)));
    setTotalInterest(parseFloat((accruedInterest).toFixed(2)));
    setYearlyRate(interestRate);
    setCompoundedRate(parseFloat((compoundRate * 100).toFixed(2)));
    setRateOfReturn(parseFloat(((futureVal / initialInvestment - 1) * 100).toFixed(2)));
    setTotalContributions(parseFloat(totalContributions.toFixed(2)));
    
    // Calculate time to double
    const timeToDoubleYears = Math.log(2) / Math.log(1 + compoundRate);
    const doubleYears = Math.floor(timeToDoubleYears);
    const doubleMonths = Math.round((timeToDoubleYears - doubleYears) * 12);
    setTimeToDouble({ years: doubleYears, months: doubleMonths });
    
    // Set breakdowns
    setYearlyBreakdown(calculatedYearlyBreakdown);
    setMonthlyBreakdown(calculatedMonthlyBreakdown);
  };

  // Get the current breakdown based on the selected type
  const getCurrentBreakdown = () => {
    return breakdownType === 'yearly' ? yearlyBreakdown : monthlyBreakdown;
  };

  // Format period label based on breakdown type
  const formatPeriodLabel = (row: BreakdownRow) => {
    if (row.year === 0) {
      return "Starting Balance";
    }
    
    if (breakdownType === 'yearly') {
      return `Year ${Math.floor(row.year)}`;
    } else {
      const yearPart = Math.floor(row.year);
      const monthPart = Math.round((row.year - yearPart) * 12);
      return `Year ${yearPart}, Month ${monthPart || 12}`;
    }
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Calculate on input change
  useEffect(() => {
    calculateCompoundInterest();
  }, [
    initialInvestmentStr, 
    interestRateStr, 
    compoundFrequency, 
    yearsStr, 
    monthsStr, 
    additionalContribution,
    depositAmountStr,
    depositFrequency,
    depositTiming,
    annualDepositIncreaseStr,
    withdrawalAmountStr,
    withdrawalFrequency,
    annualWithdrawalIncreaseStr
  ]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      {/* Left side - Input form */}
      <div className="w-full lg:w-2/5 calculator-card text-white dark:text-gray-900 p-4 sm:p-6 rounded-lg">
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
          <label className={labelClasses}>Initial investment:</label>
          <div className="flex">
            <span className="bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-l">{currency}</span>
            <input
              type="tel"
              value={initialInvestmentStr}
              onChange={(e) => handleNumberInput(e.target.value, setInitialInvestmentStr, false)} {...decimalInputProps}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className={labelClasses}>Interest rate:</label>
          <div className="flex">
            <input
              type="tel"
              value={interestRateStr}
              onChange={(e) => handleNumberInput(e.target.value, setInterestRateStr, true)} {...decimalInputProps}
              className={inputClasses}
            />
            <span className="bg-gray-100 dark:bg-gray-800 py-2 px-4">%</span>
            <select 
              className="bg-gray-100 dark:bg-gray-800 text-white dark:text-gray-900 py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="annual"
            >
              <option value="annual">annual</option>
            </select>
            <button className="ml-2 bg-gray-100 dark:bg-gray-800 hover:bg-muted/80 text-white dark:text-gray-900 py-2 px-4 rounded">
              <span>−</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className={labelClasses}>Compound frequency:</label>
          <div className="flex">
            <select
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(e.target.value)}
              className={inputClasses}
            >
              <option value="Monthly (12/yr)">Monthly (12/yr)</option>
              <option value="Annually (1/yr)">Annually (1/yr)</option>
              <option value="Semi-annually (2/yr)">Semi-annually (2/yr)</option>
              <option value="Quarterly (4/yr)">Quarterly (4/yr)</option>
              <option value="Daily (365/yr)">Daily (365/yr)</option>
            </select>
            <button className="ml-2 bg-gray-100 dark:bg-gray-800 hover:bg-muted/80 text-white dark:text-gray-900 py-2 px-4 rounded">
              <span>?</span>
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Years:</label>
            <input
              type="tel"
              value={yearsStr}
              onChange={(e) => handleNumberInput(e.target.value, setYearsStr, false)} {...decimalInputProps}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Months:</label>
            <input
              type="tel"
              value={monthsStr}
              onChange={(e) => handleNumberInput(e.target.value, setMonthsStr, false)} {...decimalInputProps}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className={labelClasses}>Additional contributions: (optional)</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
            <button 
              className={`py-2 px-2 sm:px-4 rounded text-xs sm:text-sm ${additionalContribution === 'None' ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:bg-gray-850/80'}`}
              onClick={() => setAdditionalContribution('None')}
            >
              None
            </button>
            <button 
              className={`py-2 px-2 sm:px-4 rounded text-xs sm:text-sm ${additionalContribution === 'Deposits' ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:bg-gray-850/80'}`}
              onClick={() => setAdditionalContribution('Deposits')}
            >
              Deposits
            </button>
            <button 
              className={`py-2 px-2 sm:px-4 rounded text-xs sm:text-sm ${additionalContribution === 'Withdrawals' ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:bg-gray-850/80'}`}
              onClick={() => setAdditionalContribution('Withdrawals')}
            >
              Withdrawals
            </button>
            <button 
              className={`py-2 px-2 sm:px-4 rounded text-xs sm:text-sm ${additionalContribution === 'Both' ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:bg-gray-850/80'}`}
              onClick={() => setAdditionalContribution('Both')}
            >
              Both
            </button>
          </div>
        </div>

        {additionalContribution !== 'None' && (
          <>
            {(additionalContribution === 'Deposits' || additionalContribution === 'Both') && (
              <>
                <div className="mb-6">
                  <label className={labelClasses}>Deposit amount: (optional)</label>
                  <div className="flex">
                    <span className="bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-l">{currency}</span>
                    <input
                      type="tel"
                      value={depositAmountStr}
                      onChange={(e) => handleNumberInput(e.target.value, setDepositAmountStr, false)} {...decimalInputProps}
                      className={inputClasses}
                    />
                    <select
                      value={depositFrequency}
                      onChange={(e) => setDepositFrequency(e.target.value)}
                      className="bg-gray-100 dark:bg-gray-800 text-white dark:text-gray-900 py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="monthly">monthly</option>
                      <option value="quarterly">quarterly</option>
                      <option value="annually">annually</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className={labelClasses}>Deposits made at what point in period?</label>
                  <div className="grid grid-cols-2 gap-1">
                    <button 
                      className={`py-2 px-4 rounded ${depositTiming === 'Beginning' ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:bg-gray-850/80'}`}
                      onClick={() => setDepositTiming('Beginning')}
                    >
                      Beginning
                    </button>
                    <button 
                      className={`py-2 px-4 rounded ${depositTiming === 'End' ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:bg-gray-850/80'}`}
                      onClick={() => setDepositTiming('End')}
                    >
                      End
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className={labelClasses}>Annual deposit % increase? (optional)</label>
                  <div className="flex">
                    <input
                      type="tel"
                      value={annualDepositIncreaseStr}
                      onChange={(e) => handleNumberInput(e.target.value, setAnnualDepositIncreaseStr, false)} {...decimalInputProps}
                      className={inputClasses}
                    />
                    <span className="bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-r">%</span>
                  </div>
                </div>
              </>
            )}

            {(additionalContribution === 'Withdrawals' || additionalContribution === 'Both') && (
              <>
                <div className="mb-6">
                  <label className={labelClasses}>Withdrawal amount: (optional)</label>
                  <div className="flex">
                    <span className="bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-l">{currency}</span>
                    <input
                      type="tel"
                      value={withdrawalAmountStr}
                      onChange={(e) => handleNumberInput(e.target.value, setWithdrawalAmountStr, false)} {...decimalInputProps}
                      className={inputClasses}
                    />
                    <select
                      value={withdrawalFrequency}
                      onChange={(e) => setWithdrawalFrequency(e.target.value)}
                      className="bg-gray-100 dark:bg-gray-800 text-white dark:text-gray-900 py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="monthly">monthly {currency}</option>
                      <option value="quarterly">quarterly {currency}</option>
                      <option value="annually">annually {currency}</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className={labelClasses}>Annual withdrawal % increase? (optional)</label>
                  <div className="flex">
                    <input
                      type="tel"
                      value={annualWithdrawalIncreaseStr}
                      onChange={(e) => handleNumberInput(e.target.value, setAnnualWithdrawalIncreaseStr, false)} {...decimalInputProps}
                      className={inputClasses}
                    />
                    <span className="bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-r">%</span>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <button
          type="button"
          onClick={calculateCompoundInterest}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-primary/90 text-white dark:text-gray-900 font-semibold rounded-md transition duration-200 mt-4"
        >
          Calculate
        </button>
      </div>

      {/* Right side - Results */}
      <div className="w-full lg:w-3/5 bg-white dark:bg-gray-800 text-white dark:text-gray-900 p-4 sm:p-6 rounded-lg">
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-400 mb-1 text-sm sm:text-base">Future value</p>
              <div className="flex items-center">
                <h3 className="text-xl sm:text-3xl text-orange-500 font-bold">{formatCurrency(futureValue)}</h3>
                <button className="ml-2 text-gray-400 hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 mb-1 text-sm sm:text-base">Yearly rate → Compounded rate</p>
              <div className="flex items-center">
                <h3 className="text-xl sm:text-3xl text-gray-200 font-bold">{yearlyRate}%</h3>
                <span className="mx-2 text-gray-400">→</span>
                <h3 className="text-xl sm:text-3xl text-orange-500 font-bold">{compoundedRate}%</h3>
                <button className="ml-2 text-gray-400 hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 mb-1 text-sm sm:text-base">Total interest earned</p>
              <div className="flex items-center">
                <h3 className="text-xl sm:text-3xl text-orange-500 font-bold">{formatCurrency(totalInterest)}</h3>
                <button className="ml-2 text-gray-400 hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 mb-1 text-sm sm:text-base">All-time rate of return (RoR)</p>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </span>
                <h3 className="text-xl sm:text-3xl text-gray-200 font-bold">{rateOfReturn}%</h3>
                <button className="ml-2 text-gray-400 hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 mb-1 text-sm sm:text-base">Initial balance</p>
              <div className="flex items-center">
                <h3 className="text-xl sm:text-3xl text-blue-500 font-bold">{formatCurrency(initialInvestment)}</h3>
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 mb-1 text-sm sm:text-base">Time needed to double investment</p>
              <div className="flex items-center">
                <h3 className="text-xl sm:text-3xl text-gray-200 font-bold">{timeToDouble.years} years, {timeToDouble.months} months</h3>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 space-y-4 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-3">
              <p className="text-gray-400 text-sm font-medium mb-1 lg:mb-0">Breakdown choice:</p>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setBreakdownType('yearly')}
                  className={`relative inline-flex items-center px-4 py-2 rounded-l-md border ${
                    breakdownType === 'yearly'
                      ? 'bg-blue-600 text-gray-900 dark:text-white-foreground border-blue-600 z-10'
                      : 'bg-white dark:bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-100 dark:bg-gray-800'
                  } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                >
                  Yearly
                </button>
                <button
                  type="button"
                  onClick={() => setBreakdownType('monthly')}
                  className={`relative inline-flex items-center px-4 py-2 rounded-r-md border ${
                    breakdownType === 'monthly'
                      ? 'bg-blue-600 text-gray-900 dark:text-white-foreground border-blue-600 z-10'
                      : 'bg-white dark:bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-100 dark:bg-gray-800'
                  } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                >
                  Monthly
                </button>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-3">
              <p className="text-gray-400 text-sm font-medium mb-1 lg:mb-0">View mode:</p>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`relative inline-flex items-center px-4 py-2 rounded-l-md border ${
                    viewMode === 'table'
                      ? 'bg-blue-600 text-gray-900 dark:text-white-foreground border-blue-600 z-10'
                      : 'bg-white dark:bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-100 dark:bg-gray-800'
                  } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                >
                  Table
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('chart')}
                  className={`relative inline-flex items-center px-4 py-2 border-t border-b ${
                    viewMode === 'chart'
                      ? 'bg-blue-600 text-gray-900 dark:text-white-foreground border-blue-600 z-10'
                      : 'bg-white dark:bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-100 dark:bg-gray-800'
                  } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                >
                  Chart
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('summary')}
                  className={`relative inline-flex items-center px-4 py-2 rounded-r-md border ${
                    viewMode === 'summary'
                      ? 'bg-blue-600 text-gray-900 dark:text-white-foreground border-blue-600 z-10'
                      : 'bg-white dark:bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-100 dark:bg-gray-800'
                  } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                >
                  Summary
                </button>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-4">Yearly breakdown</h3>
          
          {viewMode === 'table' && (
            <div className="overflow-x-auto">
              <table className="calculator-table">
                <thead className="bg-white dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Period
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Interest
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Balance
                    </th>
                    {(additionalContribution === 'Deposits' || additionalContribution === 'Both') && (
                      <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                        Contributions
                      </th>
                    )}
                    {(additionalContribution === 'Withdrawals' || additionalContribution === 'Both') && (
                      <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                        Withdrawals
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-800">
                  {getCurrentBreakdown().map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-card' : 'bg-card'}>
                      <td className="calculator-table-cell">
                        {formatPeriodLabel(row)}
                      </td>
                      <td className="calculator-table-cell">
                        {formatCurrency(row.interest)}
                      </td>
                      <td className="calculator-table-cell">
                        {formatCurrency(row.balance)}
                      </td>
                      {(additionalContribution === 'Deposits' || additionalContribution === 'Both') && (
                        <td className="calculator-table-cell">
                          {formatCurrency(row.contributions || 0)}
                        </td>
                      )}
                      {(additionalContribution === 'Withdrawals' || additionalContribution === 'Both') && (
                        <td className="calculator-table-cell">
                          {formatCurrency(row.withdrawals || 0)}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {viewMode === 'chart' && (
            <div>
              <div className="mb-4 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-2 lg:space-y-0">
                <p className="text-gray-400 text-sm font-medium mb-1 lg:mb-0">Chart type:</p>
                <div className="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => setChartType('line')}
                    className={`relative inline-flex items-center px-4 py-2 rounded-l-md border ${
                      chartType === 'line'
                        ? 'bg-blue-600 text-gray-900 dark:text-white-foreground border-blue-600 z-10'
                        : 'bg-white dark:bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-100 dark:bg-gray-800'
                    } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  >
                    Line
                  </button>
                  <button
                    type="button"
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
                    type="button"
                    onClick={() => setChartType('stacked')}
                    className={`relative inline-flex items-center px-4 py-2 rounded-r-md border ${
                      chartType === 'stacked'
                        ? 'bg-blue-600 text-gray-900 dark:text-white-foreground border-blue-600 z-10'
                        : 'bg-white dark:bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-100 dark:bg-gray-800'
                    } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  >
                    Stacked
                  </button>
                </div>
              </div>
              <CompoundInterestChart 
                breakdown={getCurrentBreakdown()}
                currency={currency}
                initialInvestment={initialInvestment}
                chartType={chartType}
                hasContributions={additionalContribution === 'Deposits' || additionalContribution === 'Both'}
                totalContributions={totalContributions}
                hasWithdrawals={additionalContribution === 'Withdrawals' || additionalContribution === 'Both'}
                breakdownType={breakdownType}
              />
            </div>
          )}
          
          {viewMode === 'summary' && (
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg">
              <p className="text-gray-400 mb-4 text-sm sm:text-base">Summary of your investment:</p>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>Initial investment: {formatCurrency(initialInvestment)}</li>
                <li>Interest rate: {interestRate}% compounded {compoundFrequency.toLowerCase()}</li>
                <li>Investment period: {years} years {months > 0 ? `and ${months} months` : ''}</li>
                
                {(additionalContribution === 'Deposits' || additionalContribution === 'Both') && (
                  <>
                    <li>Total contributions: {formatCurrency(totalContributions)}</li>
                    <li>Contribution frequency: {depositFrequency}</li>
                    <li>Contributions made at: {depositTiming} of period</li>
                    {parseFloat(annualDepositIncreaseStr) > 0 && (
                      <li>Annual deposit increase: {annualDepositIncrease}%</li>
                    )}
                  </>
                )}
                
                {(additionalContribution === 'Withdrawals' || additionalContribution === 'Both') && yearlyBreakdown.length > 0 && (
                  <>
                    <li>Total withdrawals: {formatCurrency(yearlyBreakdown[yearlyBreakdown.length - 1].totalWithdrawals || 0)}</li>
                    <li>Withdrawal frequency: {withdrawalFrequency}</li>
                    {parseFloat(annualWithdrawalIncreaseStr) > 0 && (
                      <li>Annual withdrawal increase: {annualWithdrawalIncrease}%</li>
                    )}
                  </>
                )}
                
                <li>Final balance: {formatCurrency(futureValue)}</li>
                <li>Total interest earned: {formatCurrency(totalInterest)}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator; 