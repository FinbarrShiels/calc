"use client";

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { decimalInputProps } from '@/utils/inputUtils';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CashbackData {
  category: string;
  amount: number;
  cashbackRate: number;
  cashbackAmount: number;
}

const CashBackCalculator = () => {
  // State for form inputs
  const [currency, setCurrency] = useState('$');
  const [monthlySpendingStr, setMonthlySpendingStr] = useState('2000');
  const [cashbackRateStr, setCashbackRateStr] = useState('2');
  const [annualFeeStr, setAnnualFeeStr] = useState('0');
  const [categories, setCategories] = useState<CashbackData[]>([
    { category: 'Groceries', amount: 400, cashbackRate: 3, cashbackAmount: 0 },
    { category: 'Dining', amount: 300, cashbackRate: 4, cashbackAmount: 0 },
    { category: 'Gas', amount: 200, cashbackRate: 3, cashbackAmount: 0 },
    { category: 'Travel', amount: 100, cashbackRate: 5, cashbackAmount: 0 },
    { category: 'Other', amount: 1000, cashbackRate: 1, cashbackAmount: 0 }
  ]);
  const [useCategories, setUseCategories] = useState(false);
  
  // Derived numeric values for calculations
  const monthlySpending = parseFloat(monthlySpendingStr) || 0;
  const cashbackRate = parseFloat(cashbackRateStr) || 0;
  const annualFee = parseFloat(annualFeeStr) || 0;
  
  // State for calculation results
  const [monthlyCashback, setMonthlyCashback] = useState(0);
  const [annualCashback, setAnnualCashback] = useState(0);
  const [netAnnualCashback, setNetAnnualCashback] = useState(0);
  const [effectiveRate, setEffectiveRate] = useState(0);
  
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

  // Handle category amount change
  const handleCategoryAmountChange = (index: number, value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      const newCategories = [...categories];
      newCategories[index].amount = value === '' ? 0 : parseFloat(value);
      setCategories(newCategories);
    }
  };

  // Handle category rate change
  const handleCategoryRateChange = (index: number, value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      const newCategories = [...categories];
      newCategories[index].cashbackRate = value === '' ? 0 : parseFloat(value);
      setCategories(newCategories);
    }
  };

  // Add new category
  const addCategory = () => {
    setCategories([...categories, { 
      category: `Category ${categories.length + 1}`, 
      amount: 0, 
      cashbackRate: cashbackRate, 
      cashbackAmount: 0 
    }]);
  };

  // Remove category
  const removeCategory = (index: number) => {
    if (categories.length > 1) {
      const newCategories = [...categories];
      newCategories.splice(index, 1);
      setCategories(newCategories);
    }
  };
  
  // Calculate cash back
  const calculateCashback = () => {
    if (useCategories) {
      // Calculate cash back for each category
      let totalMonthlySpending = 0;
      let totalMonthlyCashback = 0;
      
      const updatedCategories = categories.map(category => {
        const cashbackAmount = (category.amount * category.cashbackRate) / 100;
        totalMonthlySpending += category.amount;
        totalMonthlyCashback += cashbackAmount;
        
        return {
          ...category,
          cashbackAmount
        };
      });
      
      setCategories(updatedCategories);
      setMonthlyCashback(totalMonthlyCashback);
      
      const calculatedAnnualCashback = totalMonthlyCashback * 12;
      setAnnualCashback(calculatedAnnualCashback);
      
      const calculatedNetAnnualCashback = calculatedAnnualCashback - annualFee;
      setNetAnnualCashback(calculatedNetAnnualCashback);
      
      const calculatedEffectiveRate = totalMonthlySpending > 0 
        ? (totalMonthlyCashback / totalMonthlySpending) * 100 
        : 0;
      setEffectiveRate(calculatedEffectiveRate);
    } else {
      // Calculate cash back using flat rate
      const calculatedMonthlyCashback = (monthlySpending * cashbackRate) / 100;
      setMonthlyCashback(calculatedMonthlyCashback);
      
      const calculatedAnnualCashback = calculatedMonthlyCashback * 12;
      setAnnualCashback(calculatedAnnualCashback);
      
      const calculatedNetAnnualCashback = calculatedAnnualCashback - annualFee;
      setNetAnnualCashback(calculatedNetAnnualCashback);
      
      setEffectiveRate(cashbackRate);
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
    calculateCashback();
  }, [monthlySpendingStr, cashbackRateStr, annualFeeStr, categories, useCategories]);
  
  // Chart data
  const chartData = {
    labels: categories.map(category => category.category),
    datasets: [
      {
        label: 'Monthly Spending',
        data: categories.map(category => category.amount),
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue-500
      },
      {
        label: 'Monthly Cash Back',
        data: categories.map(category => category.cashbackAmount),
        backgroundColor: 'rgba(249, 115, 22, 0.7)', // orange-500
      }
    ],
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
        text: 'Spending & Cash Back by Category',
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
        grid: {
          color: 'rgba(75, 85, 99, 0.2)' // gray-600 with opacity
        },
        ticks: {
          color: '#9ca3af' // text-gray-400
        }
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)' // gray-600 with opacity
        },
        ticks: {
          color: '#9ca3af', // text-gray-400
          callback: function(value: any) {
            return formatCurrency(value);
          }
        }
      }
    }
  };
  
  return (
    <div className="bg-gray-900 text-gray-100 rounded-lg shadow-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-white">Cash Back Settings</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Currency</label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              <label className="block text-sm font-medium text-gray-300 mb-1">Annual Fee</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  {currency}
                </span>
                <input 
                  type="tel" 
                  value={annualFeeStr} 
                  onChange={(e) => handleNumberInput(e.target.value, setAnnualFeeStr)} {...decimalInputProps}
                  className="w-full pl-8 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                <input
                  type="checkbox"
                  checked={useCategories}
                  onChange={() => setUseCategories(!useCategories)}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded"
                />
                <span>Use spending categories (for tiered cash back)</span>
              </label>
            </div>
            
            {!useCategories ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Monthly Spending</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      {currency}
                    </span>
                    <input 
                      type="tel" 
                      value={monthlySpendingStr} 
                      onChange={(e) => handleNumberInput(e.target.value, setMonthlySpendingStr)} {...decimalInputProps}
                      className="w-full pl-8 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Cash Back Rate</label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      value={cashbackRateStr} 
                      onChange={(e) => handleNumberInput(e.target.value, setCashbackRateStr)} {...decimalInputProps}
                      className="w-full pl-3 pr-8 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="0"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                      %
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="sm:col-span-2">
                <div className="mb-2 flex justify-between items-center">
                  <h3 className="text-md font-medium text-white">Spending Categories</h3>
                  <button
                    onClick={addCategory}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add Category
                  </button>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {categories.map((category, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-center bg-gray-700 p-3 rounded-md">
                      <div className="col-span-3">
                        <input
                          type="tel"
                          value={category.category}
                          onChange={(e) => {
                            const newCategories = [...categories];
                            newCategories[index].category = e.target.value;
                            setCategories(newCategories);
                          }}
                          className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                          placeholder="Category"
                        />
                      </div>
                      <div className="col-span-4">
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400 text-xs">
                            {currency}
                          </span>
                          <input
                            type="tel"
                            value={category.amount}
                            onChange={(e) => handleCategoryAmountChange(index, e.target.value)}
                            className="w-full pl-6 pr-2 py-1 bg-gray-600 border border-gray-500 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                            placeholder="Amount"
                          />
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="relative">
                          <input
                            type="tel"
                            value={category.cashbackRate}
                            onChange={(e) => handleCategoryRateChange(index, e.target.value)}
                            className="w-full pl-2 pr-6 py-1 bg-gray-600 border border-gray-500 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                            placeholder="Rate"
                          />
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 text-xs">
                            %
                          </span>
                        </div>
                      </div>
                      <div className="col-span-2 text-right text-sm text-orange-400">
                        {formatCurrency(category.cashbackAmount)}
                      </div>
                      {categories.length > 1 && (
                        <button
                          onClick={() => removeCategory(index)}
                          className="col-span-12 sm:col-span-1 px-2 py-1 bg-red-600 text-white rounded-md text-xs hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-white">Cash Back Results</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-1">Monthly Cash Back</h3>
              <p className="text-2xl font-bold text-orange-500">{formatCurrency(monthlyCashback)}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Annual Cash Back</h3>
                <p className="text-xl font-bold text-blue-500">{formatCurrency(annualCashback)}</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Annual Fee</h3>
                <p className="text-xl font-bold text-red-500">{formatCurrency(annualFee)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Net Annual Cash Back</h3>
                <p className="text-xl font-bold text-green-500">{formatCurrency(netAnnualCashback)}</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Effective Rate</h3>
                <p className="text-xl font-bold text-green-500">{formatPercentage(effectiveRate)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart (only show when using categories) */}
      {useCategories && (
        <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-white">Category Breakdown</h2>
          <div className="h-[400px] w-full bg-gray-700 rounded-lg p-4">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
      
      {/* Explanation */}
      <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-white">About Cash Back Rewards</h2>
        <p className="text-gray-300 mb-4">
          Cash back rewards are a type of credit card benefit that returns a small percentage of your purchases back to you as a reward. This calculator helps you estimate how much you can earn from cash back rewards based on your spending habits.
        </p>
        <p className="text-gray-300 mb-4">
          There are two main types of cash back programs:
        </p>
        <ul className="list-disc list-inside text-gray-300 ml-4 mb-4">
          <li>Flat-rate cash back: The same percentage back on all purchases</li>
          <li>Tiered/category cash back: Different percentages back depending on spending categories (groceries, gas, dining, etc.)</li>
        </ul>
        <p className="text-gray-300 mb-4">
          When evaluating a cash back credit card, consider:
        </p>
        <ul className="list-disc list-inside text-gray-300 ml-4">
          <li>Annual fee: Does the cash back earned outweigh any annual fee?</li>
          <li>Spending habits: Do the bonus categories align with where you spend the most?</li>
          <li>Redemption options: How easily can you redeem your cash back?</li>
          <li>Caps or limits: Are there maximum amounts you can earn in certain categories?</li>
        </ul>
      </div>
    </div>
  );
};

export default CashBackCalculator; 