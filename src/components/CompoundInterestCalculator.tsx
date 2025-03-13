'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

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

interface CompoundInterestCalculatorProps {
  calculator?: Calculator;
}

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

interface YearlyData {
  year: number;
  startBalance: number;
  contribution: number;
  interest: number;
  endBalance: number;
  totalContributions: number;
  totalInterest: number;
}

interface MonthlyData {
  month: number;
  year: number;
  startBalance: number;
  contribution: number;
  interest: number;
  endBalance: number;
}

type CompoundFrequency = 'annually' | 'semi-annually' | 'quarterly' | 'monthly' | 'daily';
type ViewType = 'chart' | 'table';
type ChartType = 'line' | 'bar';

const CompoundInterestCalculator: React.FC<CompoundInterestCalculatorProps> = ({ calculator }) => {
  // Currency options
  const currencyOptions: CurrencyOption[] = [
    { value: 'USD', label: 'USD ($)', symbol: '$' },
    { value: 'EUR', label: 'EUR (€)', symbol: '€' },
    { value: 'GBP', label: 'GBP (£)', symbol: '£' },
    { value: 'JPY', label: 'JPY (¥)', symbol: '¥' },
    { value: 'INR', label: 'INR (₹)', symbol: '₹' }
  ];
  
  // Compound frequency options
  const compoundFrequencyOptions = [
    { value: 'annually', label: 'Annually', timesPerYear: 1 },
    { value: 'semi-annually', label: 'Semi-Annually', timesPerYear: 2 },
    { value: 'quarterly', label: 'Quarterly', timesPerYear: 4 },
    { value: 'monthly', label: 'Monthly', timesPerYear: 12 },
    { value: 'daily', label: 'Daily', timesPerYear: 365 }
  ];
  
  // State for inputs
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [principal, setPrincipal] = useState<number>(10000);
  const [annualContribution, setAnnualContribution] = useState<number>(1200);
  const [contributionFrequency, setContributionFrequency] = useState<string>('monthly');
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(7);
  const [compoundFrequency, setCompoundFrequency] = useState<CompoundFrequency>('monthly');
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
  
  // State for results
  const [finalBalance, setFinalBalance] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  
  // View state
  const [viewType, setViewType] = useState<ViewType>('chart');
  const [chartType, setChartType] = useState<ChartType>('line');
  
  // Get currency symbol
  const getCurrencySymbol = (): string => {
    const currency = currencyOptions.find(c => c.value === selectedCurrency);
    return currency ? currency.symbol : '$';
  };
  
  // Handle currency change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };
  
  // Handle compound frequency change
  const handleCompoundFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCompoundFrequency(e.target.value as CompoundFrequency);
  };
  
  // Handle contribution frequency change
  const handleContributionFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContributionFrequency(e.target.value);
  };
  
  // Get number of compounds per year
  const getCompoundsPerYear = (): number => {
    const frequency = compoundFrequencyOptions.find(f => f.value === compoundFrequency);
    return frequency ? frequency.timesPerYear : 1;
  };
  
  // Get number of contributions per year
  const getContributionsPerYear = (): number => {
    switch (contributionFrequency) {
      case 'annually': return 1;
      case 'semi-annually': return 2;
      case 'quarterly': return 4;
      case 'monthly': return 12;
      case 'bi-weekly': return 26;
      case 'weekly': return 52;
      default: return 12;
    }
  };

  // Calculate compound interest
  const calculateCompoundInterest = () => {
    const compoundsPerYear = getCompoundsPerYear();
    const contributionsPerYear = getContributionsPerYear();
    const contributionPerPeriod = annualContribution / contributionsPerYear;
    const ratePerPeriod = annualInterestRate / 100 / compoundsPerYear;
    const totalMonths = investmentPeriod * 12;
    
    let balance = principal;
    let totalContrib = principal;
    let totalInt = 0;
    
    const monthlyDataArray: MonthlyData[] = [];
    const yearlyDataArray: YearlyData[] = [];
    
    // Initialize yearly data for year 0
    yearlyDataArray.push({
      year: 0,
      startBalance: principal,
      contribution: 0,
      interest: 0,
      endBalance: principal,
      totalContributions: principal,
      totalInterest: 0
    });
    
    // Calculate monthly data
    for (let month = 1; month <= totalMonths; month++) {
      const currentYear = Math.floor((month - 1) / 12) + 1;
      const monthOfYear = ((month - 1) % 12) + 1;
      const startBalance = balance;
      let monthlyContribution = 0;
      let monthlyInterest = 0;
      
      // Add contribution if this is a contribution month
      if (month % (12 / contributionsPerYear) === 0) {
        balance += contributionPerPeriod;
        monthlyContribution = contributionPerPeriod;
        totalContrib += contributionPerPeriod;
      }
      
      // Apply compound interest
      if (month % (12 / compoundsPerYear) === 0) {
        const interest = balance * ratePerPeriod;
        balance += interest;
        monthlyInterest = interest;
        totalInt += interest;
      }
      
      // Store monthly data
      monthlyDataArray.push({
        month: monthOfYear,
        year: currentYear,
        startBalance,
        contribution: monthlyContribution,
        interest: monthlyInterest,
        endBalance: balance
      });
      
      // If this is the last month of a year, store yearly data
      if (monthOfYear === 12 || month === totalMonths) {
        yearlyDataArray.push({
          year: currentYear,
          startBalance: yearlyDataArray[yearlyDataArray.length - 1].endBalance,
          contribution: totalContrib - yearlyDataArray[yearlyDataArray.length - 1].totalContributions,
          interest: totalInt - (yearlyDataArray[yearlyDataArray.length - 1].totalInterest || 0),
          endBalance: balance,
          totalContributions: totalContrib,
          totalInterest: totalInt
        });
      }
    }
    
    setMonthlyData(monthlyDataArray);
    setYearlyData(yearlyDataArray);
    setFinalBalance(balance);
    setTotalContributions(totalContrib);
    setTotalInterest(totalInt);
  };
  
  // Calculate when inputs change
  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, annualContribution, contributionFrequency, annualInterestRate, compoundFrequency, investmentPeriod]);
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return getCurrencySymbol() + value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  
  // Chart data for balance growth
  const balanceChartData = {
    labels: yearlyData.map(data => `Year ${data.year}`),
    datasets: [
      {
        label: 'Balance',
        data: yearlyData.map(data => data.endBalance),
        backgroundColor: 'rgba(59, 130, 246, 0.5)', // blue-500 with opacity
        borderColor: '#3b82f6', // blue-500
        borderWidth: 1,
        fill: chartType === 'line',
        tension: 0.1
      }
    ]
  };
  
  // Chart data for breakdown
  const breakdownChartData = {
    labels: yearlyData.map(data => `Year ${data.year}`),
    datasets: [
      {
        label: 'Principal',
        data: yearlyData.map(data => principal),
        backgroundColor: 'rgba(59, 130, 246, 0.5)', // blue-500 with opacity
        borderColor: '#3b82f6', // blue-500
        borderWidth: 1,
        stack: 'Stack 0'
      },
      {
        label: 'Contributions',
        data: yearlyData.map(data => data.totalContributions - principal),
        backgroundColor: 'rgba(139, 92, 246, 0.5)', // purple-500 with opacity
        borderColor: '#8b5cf6', // purple-500
        borderWidth: 1,
        stack: 'Stack 0'
      },
      {
        label: 'Interest',
        data: yearlyData.map(data => data.totalInterest),
        backgroundColor: 'rgba(16, 185, 129, 0.5)', // green-500 with opacity
        borderColor: '#10b981', // green-500
        borderWidth: 1,
        stack: 'Stack 0'
      }
    ]
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // lighter grid lines for dark background
        },
        ticks: {
          color: '#e5e7eb', // text-gray-200
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // lighter grid lines for dark background
        },
        ticks: {
          color: '#e5e7eb', // text-gray-200
          callback: function(value: any) {
            return getCurrencySymbol() + value.toLocaleString();
          }
        }
      }
    },
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
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)', // bg-gray-900 with opacity
        titleColor: '#f9fafb', // text-gray-50
        bodyColor: '#f3f4f6', // text-gray-100
        padding: 10,
        borderColor: 'rgba(75, 85, 99, 0.3)', // gray-600 with opacity
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${getCurrencySymbol()}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      }
    }
  };
  
  // Stacked chart options
  const stackedChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      x: {
        ...chartOptions.scales.x,
        stacked: true
      },
      y: {
        ...chartOptions.scales.y,
        stacked: true
      }
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-xl p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Compound Interest Calculator</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-300 mb-1">
                Currency
              </label>
            <select 
                id="currency"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currencyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
        </div>

          <div>
              <label htmlFor="principal" className="block text-sm font-medium text-gray-300 mb-1">
                Initial Principal
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{getCurrencySymbol()}</span>
                </div>
                    <input
                  id="principal"
                      type="tel"
                  value={principal} {...numericInputProps}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  min="0"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="annualContribution" className="block text-sm font-medium text-gray-300 mb-1">
                Annual Contribution
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{getCurrencySymbol()}</span>
                </div>
                <input
                  id="annualContribution"
                  type="tel"
                  value={annualContribution} {...numericInputProps}
                  onChange={(e) => setAnnualContribution(Number(e.target.value))}
                  min="0"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="contributionFrequency" className="block text-sm font-medium text-gray-300 mb-1">
                Contribution Frequency
              </label>
              <select
                id="contributionFrequency"
                value={contributionFrequency}
                onChange={handleContributionFrequencyChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="annually">Annually</option>
                <option value="semi-annually">Semi-Annually</option>
                <option value="quarterly">Quarterly</option>
                <option value="monthly">Monthly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="annualInterestRate" className="block text-sm font-medium text-gray-300 mb-1">
                Annual Interest Rate
              </label>
              <div className="relative">
                <input
                  id="annualInterestRate"
                  type="tel"
                  value={annualInterestRate} {...numericInputProps}
                  onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">%</span>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="compoundFrequency" className="block text-sm font-medium text-gray-300 mb-1">
                Compound Frequency
              </label>
              <select
                id="compoundFrequency"
                value={compoundFrequency}
                onChange={handleCompoundFrequencyChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {compoundFrequencyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="investmentPeriod" className="block text-sm font-medium text-gray-300 mb-1">
                Investment Period (years)
              </label>
              <input
                id="investmentPeriod"
                type="tel"
                value={investmentPeriod} {...numericInputProps}
                onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                min="1"
                max="50"
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mt-6 bg-gray-800 p-4 rounded-md border border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-blue-400">Investment Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Final Balance</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(finalBalance)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Contributions</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(totalContributions)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Interest Earned</p>
                <p className="text-xl font-semibold text-green-400">{formatCurrency(totalInterest)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Interest to Contribution Ratio</p>
                <p className="text-xl font-semibold text-white">
                  {totalContributions > 0 ? `${(totalInterest / totalContributions * 100).toFixed(2)}%` : '0%'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Results</h2>
            <div className="flex space-x-2">
                <button
                onClick={() => setViewType('chart')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  viewType === 'chart' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Chart
                </button>
                <button
                onClick={() => setViewType('table')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  viewType === 'table' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Table
                </button>
              </div>
            </div>
            
          {viewType === 'chart' && (
            <div className="space-y-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-blue-400">Balance Growth</h3>
                  <div className="flex space-x-2">
                <button
                      onClick={() => setChartType('line')}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        chartType === 'line' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Line
                </button>
                <button
                      onClick={() => setChartType('bar')}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        chartType === 'bar' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Bar
                </button>
                  </div>
                </div>
                <div className="h-80 w-full">
                  {chartType === 'line' ? (
                    <Line data={balanceChartData} options={chartOptions} />
                  ) : (
                    <Bar data={balanceChartData} options={chartOptions} />
                  )}
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-blue-400 mb-2">Investment Breakdown</h3>
                <div className="h-80 w-full">
                  <Bar data={breakdownChartData} options={stackedChartOptions} />
            </div>
          </div>
          
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Final Balance</h3>
                  <p className="text-2xl font-bold text-white">{formatCurrency(finalBalance)}</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Total Contributions</h3>
                  <p className="text-2xl font-bold text-white">{formatCurrency(totalContributions)}</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Total Interest</h3>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(totalInterest)}</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Investment Period</h3>
                  <p className="text-2xl font-bold text-white">{investmentPeriod} years</p>
                </div>
              </div>
            </div>
          )}
          
          {viewType === 'table' && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 overflow-x-auto">
              <h3 className="text-lg font-medium text-blue-400 mb-4">Yearly Breakdown</h3>
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Year</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Start Balance</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contribution</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Interest</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">End Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {yearlyData.map((data, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{data.year}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{formatCurrency(data.startBalance)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{formatCurrency(data.contribution)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-green-400">{formatCurrency(data.interest)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-400">{formatCurrency(data.endBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator; 