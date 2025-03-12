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
  Legend,
} from 'chart.js';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Currency data with symbols and names
const currencyData = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
];

interface ConversionResult {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
  rate: number;
  date: string;
}

interface HistoricalRate {
  date: string;
  rate: number;
}

const CurrencyConverterCalculator = () => {
  // State for form inputs
  const [amountStr, setAmountStr] = useState('1000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [conversionResults, setConversionResults] = useState<ConversionResult[]>([]);
  const [historicalRates, setHistoricalRates] = useState<HistoricalRate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState('converter');
  
  // Derived numeric values for calculations
  const amount = parseFloat(amountStr) || 0;
  
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

  // Swap currencies
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Format currency
  const formatCurrency = (value: number, currencyCode: string) => {
    const currency = currencyData.find(c => c.code === currencyCode);
    const symbol = currency?.symbol || '';
    
    return `${symbol}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Get currency name
  const getCurrencyName = (code: string) => {
    const currency = currencyData.find(c => c.code === code);
    return currency?.name || code;
  };

  // Convert currency
  const convertCurrency = async () => {
    if (amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real application, you would use a real API like:
      // const response = await fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`);
      // For demo purposes, we'll use a mock response with realistic exchange rates
      
      // Mock exchange rates (as of May 2023)
      const mockRates: Record<string, Record<string, number>> = {
        'USD': { 'EUR': 0.92, 'GBP': 0.79, 'JPY': 134.5, 'CAD': 1.35, 'AUD': 1.48, 'CHF': 0.90, 'CNY': 6.92, 'INR': 82.14, 'MXN': 17.61, 'BRL': 4.97, 'RUB': 77.50, 'KRW': 1331.21, 'SGD': 1.34, 'NZD': 1.61, 'HKD': 7.83 },
        'EUR': { 'USD': 1.09, 'GBP': 0.86, 'JPY': 146.2, 'CAD': 1.47, 'AUD': 1.61, 'CHF': 0.98, 'CNY': 7.53, 'INR': 89.32, 'MXN': 19.15, 'BRL': 5.41, 'RUB': 84.30, 'KRW': 1448.02, 'SGD': 1.46, 'NZD': 1.75, 'HKD': 8.52 },
        'GBP': { 'USD': 1.26, 'EUR': 1.16, 'JPY': 169.9, 'CAD': 1.71, 'AUD': 1.87, 'CHF': 1.14, 'CNY': 8.75, 'INR': 103.86, 'MXN': 22.27, 'BRL': 6.29, 'RUB': 98.02, 'KRW': 1684.91, 'SGD': 1.70, 'NZD': 2.04, 'HKD': 9.91 },
        'JPY': { 'USD': 0.0074, 'EUR': 0.0068, 'GBP': 0.0059, 'CAD': 0.01, 'AUD': 0.011, 'CHF': 0.0067, 'CNY': 0.051, 'INR': 0.61, 'MXN': 0.13, 'BRL': 0.037, 'RUB': 0.58, 'KRW': 9.9, 'SGD': 0.01, 'NZD': 0.012, 'HKD': 0.058 }
      };
      
      // Add reverse rates for all currencies
      Object.keys(mockRates).forEach(baseCurrency => {
        Object.keys(mockRates[baseCurrency]).forEach(targetCurrency => {
          if (!mockRates[targetCurrency]) {
            mockRates[targetCurrency] = {};
          }
          mockRates[targetCurrency][baseCurrency] = 1 / mockRates[baseCurrency][targetCurrency];
        });
      });
      
      // Add same currency rates (1:1)
      currencyData.forEach(currency => {
        if (!mockRates[currency.code]) {
          mockRates[currency.code] = {};
        }
        mockRates[currency.code][currency.code] = 1;
      });
      
      // Get exchange rate
      let rate = 1;
      if (mockRates[fromCurrency] && mockRates[fromCurrency][toCurrency]) {
        rate = mockRates[fromCurrency][toCurrency];
      }
      
      // Calculate converted amount
      const convertedAmount = amount * rate;
      
      // Create result
      const result: ConversionResult = {
        fromCurrency,
        toCurrency,
        amount,
        convertedAmount,
        rate,
        date: new Date().toISOString().split('T')[0]
      };
      
      // Add to results
      setConversionResults([result, ...conversionResults.slice(0, 4)]);
      
      // Generate mock historical data
      const today = new Date();
      const historicalData: HistoricalRate[] = [];
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        
        // Add some random variation to the rate for historical data
        const randomVariation = (Math.random() * 0.1) - 0.05; // -5% to +5%
        const historicalRate = rate * (1 + randomVariation);
        
        historicalData.push({
          date: date.toISOString().split('T')[0],
          rate: parseFloat(historicalRate.toFixed(4))
        });
      }
      
      setHistoricalRates(historicalData);
    } catch (err) {
      setError('Failed to convert currency. Please try again.');
      console.error('Currency conversion error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Chart data for historical rates
  const chartData = {
    labels: historicalRates.map(data => data.date),
    datasets: [
      {
        label: `${fromCurrency} to ${toCurrency} Exchange Rate`,
        data: historicalRates.map(data => data.rate),
        backgroundColor: 'rgba(59, 130, 246, 0.5)', // blue-500 with opacity
        borderColor: 'rgba(59, 130, 246, 1)', // blue-500
        borderWidth: 1
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
        text: '30-Day Exchange Rate History',
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
              label += context.parsed.y.toFixed(4);
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
          minRotation: 45
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.2)', // gray-600 with opacity
        }
      },
      y: {
        ticks: {
          color: '#9ca3af', // text-gray-400
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.2)', // gray-600 with opacity
        }
      }
    }
  };

  // Convert on input change
  useEffect(() => {
    if (amount > 0 && fromCurrency && toCurrency) {
      convertCurrency();
    }
  }, [fromCurrency, toCurrency]);

  return (
    <div className="bg-white dark:bg-gray-800 text-white dark:text-gray-900 rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="calculator-card-alt rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Currency Converter</h2>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Amount</label>
            <div className="relative">
              <input
                type="tel"
                className={inputClasses}
                value={amountStr}
                onChange={(e) => handleNumberInput(e.target.value, setAmountStr)} {...decimalInputProps}
                placeholder="Enter amount"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="col-span-2">
              <label className="block text-gray-300 mb-2">From</label>
              <select 
                className={inputClasses}
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencyData.map(currency => (
                  <option key={`from-${currency.code}`} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center justify-center">
              <button 
                className="p-2 bg-blue-600 rounded-full hover:bg-primary/90 transition-colors mt-6"
                onClick={handleSwapCurrencies}
                aria-label="Swap currencies"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>
            
            <div className="col-span-2">
              <label className="block text-gray-300 mb-2">To</label>
              <select 
                className={inputClasses}
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currencyData.map(currency => (
                  <option key={`to-${currency.code}`} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <button
              className={inputClasses}
              onClick={convertCurrency}
              disabled={isLoading}
            >
              {isLoading ? 'Converting...' : 'Convert'}
            </button>
            
            {error && (
              <p className="mt-2 text-red-500">{error}</p>
            )}
          </div>
          
          {conversionResults.length > 0 && (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-3 text-blue-400">Recent Conversions</h3>
              
              <div className="space-y-3">
                {conversionResults.map((result, index) => (
                  <div key={index} className="p-3 bg-gray-750 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-300">{formatCurrency(result.amount, result.fromCurrency)} {result.fromCurrency}</p>
                        <p className={resultLabelClasses}>= {formatCurrency(result.convertedAmount, result.toCurrency)} {result.toCurrency}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-300">1 {result.fromCurrency} = {result.rate.toFixed(4)} {result.toCurrency}</p>
                        <p className={resultLabelClasses}>{result.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Results */}
        <div className="calculator-card rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className={resultValueClasses}>Exchange Rate Trends</h2>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 rounded ${viewMode === 'converter' ? 'bg-blue-600 text-gray-900 dark:text-white-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-300'}`}
                onClick={() => setViewMode('converter')}
              >
                Converter
              </button>
              <button
                className={`px-3 py-1 rounded ${viewMode === 'details' ? 'bg-blue-600 text-gray-900 dark:text-white-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-300'}`}
                onClick={() => setViewMode('details')}
              >
                Details
              </button>
            </div>
          </div>
          
          {viewMode === 'converter' && conversionResults.length > 0 && (
            <div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">
                    {getCurrencyName(fromCurrency)} to {getCurrencyName(toCurrency)}
                  </p>
                  <h3 className={resultValueClasses}>
                    {formatCurrency(conversionResults[0].amount, fromCurrency)}
                  </h3>
                  <div className="flex items-center justify-center text-gray-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Exchange Rate: {conversionResults[0].rate.toFixed(4)}</span>
                  </div>
                  <h3 className={resultValueClasses}>
                    {formatCurrency(conversionResults[0].convertedAmount, toCurrency)}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    Last updated: {conversionResults[0].date}
                  </p>
                </div>
              </div>
              
              <div className="h-80 w-full">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          )}
          
          {viewMode === 'details' && (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm">Base Currency</h3>
                  <p className={resultValueClasses}>{fromCurrency}</p>
                  <p className="text-gray-300">{getCurrencyName(fromCurrency)}</p>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm">Target Currency</h3>
                  <p className={resultValueClasses}>{toCurrency}</p>
                  <p className="text-gray-300">{getCurrencyName(toCurrency)}</p>
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h3 className="text-gray-400 text-sm mb-2">Exchange Rate Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-300">1 {fromCurrency} =</p>
                    <p className={resultValueClasses}>
                      {conversionResults.length > 0 ? conversionResults[0].rate.toFixed(4) : '0.0000'} {toCurrency}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-300">1 {toCurrency} =</p>
                    <p className={resultValueClasses}>
                      {conversionResults.length > 0 ? (1 / conversionResults[0].rate).toFixed(4) : '0.0000'} {fromCurrency}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="calculator-table">
                  <thead>
                    <tr>
                      <th className="calculator-table-header">Date</th>
                      <th className="calculator-table-header">Rate</th>
                      <th className="calculator-table-header">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalRates.slice(-10).map((rate, index, array) => {
                      const previousRate = index > 0 ? array[index - 1].rate : rate.rate;
                      const change = rate.rate - previousRate;
                      const percentChange = (change / previousRate) * 100;
                      
                      return (
                        <tr key={index} className={index % 2 === 0 ? 'bg-muted' : 'bg-gray-750'}>
                          <td className="calculator-table-cell">{rate.date}</td>
                          <td className="calculator-table-cell">{rate.rate.toFixed(4)}</td>
                          <td className={`py-2 px-4 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {change >= 0 ? '+' : ''}{change.toFixed(4)} ({change >= 0 ? '+' : ''}{percentChange.toFixed(2)}%)
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterCalculator; 