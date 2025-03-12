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
import { convertCurrency, formatCurrency as formatCurrencyUtil, getCurrencySymbol } from '@/utils/currencyUtils';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MillionToBillionConverter = () => {
  // State for form inputs
  const [conversionType, setConversionType] = useState('millionToBillion');
  const [currency, setCurrency] = useState('$');
  const [amountStr, setAmountStr] = useState('1');
  
  // State for calculated results
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [comparisonItems, setComparisonItems] = useState<{name: string, value: number}[]>([]);
  
  // State for currency conversion
  const [exchangeRates, setExchangeRates] = useState<{[key: string]: number}>({});
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [rateError, setRateError] = useState<string | null>(null);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [convertedValues, setConvertedValues] = useState<{[key: string]: number}>({});
  
  // Fetch exchange rates on component mount
  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoadingRates(true);
      setRateError(null);
      
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        
        const data = await response.json();
        
        // Create a mapping of currency symbols to rates
        const rates: {[key: string]: number} = {
          '$': 1, // USD (base)
          '€': data.rates.EUR,
          '£': data.rates.GBP,
          '₹': data.rates.INR,
          '¥': data.rates.JPY,
          'C$': data.rates.CAD,
          'A$': data.rates.AUD
        };
        
        setExchangeRates(rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setRateError('Failed to load exchange rates. Using default USD values.');
        
        // Fallback to approximate rates if API fails
        setExchangeRates({
          '$': 1,      // USD
          '€': 0.85,   // EUR
          '£': 0.75,   // GBP
          '₹': 82,     // INR
          '¥': 110,    // JPY
          'C$': 1.25,  // CAD
          'A$': 1.35   // AUD
        });
      } finally {
        setIsLoadingRates(false);
      }
    };
    
    fetchExchangeRates();
  }, []);
  
  // Convert USD value to selected currency
  const convertFromUSD = (usdValue: number): number => {
    const rate = exchangeRates[currency] || 1;
    return usdValue * rate;
  };
  
  // Convert selected currency value to USD
  const convertToUSD = (value: number): number => {
    const rate = exchangeRates[currency] || 1;
    return value / rate;
  };
  
  // Input validation helper
  const handleNumberInput = (
    value: string, 
    setter: React.Dispatch<React.SetStateAction<string>>,
    allowNegative: boolean = false
  ) => {
    // Remove all non-numeric characters except decimal point and negative sign
    let sanitized = value.replace(/[^\d.-]/g, '');
    
    // Handle negative numbers if allowed
    if (!allowNegative && sanitized.includes('-')) {
      sanitized = sanitized.replace(/-/g, '');
    } else if (allowNegative) {
      // Ensure only one negative sign at the beginning
      const hasNegative = sanitized.startsWith('-');
      sanitized = sanitized.replace(/-/g, '');
      if (hasNegative) {
        sanitized = '-' + sanitized;
      }
    }
    
    // Ensure only one decimal point
    const parts = sanitized.split('.');
    if (parts.length > 2) {
      sanitized = parts[0] + '.' + parts.slice(1).join('');
    }
    
    setter(sanitized);
  };
  
  // Calculate conversion whenever inputs change
  useEffect(() => {
    const amount = parseFloat(amountStr) || 0;
    let result = 0;
    
    // Perform conversion based on selected type
    switch (conversionType) {
      case 'millionToBillion':
        result = amount / 1000;
        break;
      case 'billionToMillion':
        result = amount * 1000;
        break;
      case 'millionToTrillion':
        result = amount / 1000000;
        break;
      case 'trillionToMillion':
        result = amount * 1000000;
        break;
      case 'billionToTrillion':
        result = amount / 1000;
        break;
      case 'trillionToBillion':
        result = amount * 1000;
        break;
      default:
        result = 0;
    }
    
    setConvertedAmount(result);
    
    // Generate comparison items based on the conversion type
    generateComparisonItems(amount, conversionType);
  }, [amountStr, conversionType]);
  
  // Generate comparison items to help visualize the scale
  const generateComparisonItems = (amount: number, type: string) => {
    const items: {name: string, value: number}[] = [];
    
    // Different comparisons based on conversion type
    if (type === 'millionToBillion' || type === 'millionToTrillion') {
      // For million to larger unit conversions
      const millionAmount = amount;
      
      items.push({ name: 'Average Car', value: 0.035 }); // $35,000
      items.push({ name: 'College Tuition', value: 0.15 }); // $150,000
      items.push({ name: 'Average Home', value: 0.4 }); // $400,000
      items.push({ name: 'Small Business', value: 2 }); // $2 million
      items.push({ name: 'Luxury Yacht', value: 5 }); // $5 million
      
      // Scale the values relative to the input amount
      const scaledItems = items.map(item => ({
        name: item.name,
        value: (item.value / millionAmount) * 100 // As percentage of input
      }));
      
      setComparisonItems(scaledItems);
    } else {
      // For billion/trillion to smaller unit conversions
      let baseAmount = amount;
      
      // Convert to millions for comparison
      if (type === 'billionToMillion') baseAmount = amount * 1000;
      if (type === 'trillionToMillion') baseAmount = amount * 1000000;
      if (type === 'trillionToBillion') baseAmount = amount * 1000;
      
      items.push({ name: 'Average Car', value: 0.035 }); // $35,000
      items.push({ name: 'College Tuition', value: 0.15 }); // $150,000
      items.push({ name: 'Average Home', value: 0.4 }); // $400,000
      items.push({ name: 'Small Business', value: 2 }); // $2 million
      items.push({ name: 'Luxury Yacht', value: 5 }); // $5 million
      
      // Scale the values relative to the converted amount
      const scaledItems = items.map(item => ({
        name: item.name,
        value: (item.value / baseAmount) * 100 // As percentage of converted amount
      }));
      
      setComparisonItems(scaledItems);
    }
  };
  
  // Convert values for the "Value in Perspective" section
  useEffect(() => {
    const updateConvertedValues = async () => {
      const amount = parseFloat(amountStr) || 0;
      if (amount <= 0) return;
      
      try {
        // Convert the comparison item values
        const homeValue = await convertCurrency(400000, 'USD', currency);
        const yachtValue = await convertCurrency(5000000, 'USD', currency);
        const jetValue = await convertCurrency(65000000, 'USD', currency);
        const nflTeamValue = await convertCurrency(4000000000, 'USD', currency);
        const companyValue = await convertCurrency(500000000000, 'USD', currency);
        
        setConvertedValues({
          home: homeValue,
          yacht: yachtValue,
          jet: jetValue,
          nflTeam: nflTeamValue,
          company: companyValue
        });
      } catch (error) {
        console.error('Error converting values:', error);
      }
    };
    
    updateConvertedValues();
  }, [amountStr, currency]);
  
  // Format currency using our utility
  const formatCurrency = (value: number) => {
    return formatCurrencyUtil(value, currency);
  };
  
  // Format large numbers with appropriate suffix
  const formatLargeNumber = (value: number, unit: string) => {
    if (unit === 'million') {
      return `${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} million`;
    } else if (unit === 'billion') {
      return `${value.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} billion`;
    } else if (unit === 'trillion') {
      return `${value.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} trillion`;
    }
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  
  // Get input and output units based on conversion type
  const getUnits = () => {
    switch (conversionType) {
      case 'millionToBillion':
        return { input: 'million', output: 'billion' };
      case 'billionToMillion':
        return { input: 'billion', output: 'million' };
      case 'millionToTrillion':
        return { input: 'million', output: 'trillion' };
      case 'trillionToMillion':
        return { input: 'trillion', output: 'million' };
      case 'billionToTrillion':
        return { input: 'billion', output: 'trillion' };
      case 'trillionToBillion':
        return { input: 'trillion', output: 'billion' };
      default:
        return { input: '', output: '' };
    }
  };
  
  // Chart data for comparison visualization
  const chartData = {
    labels: comparisonItems.map(item => item.name),
    datasets: [
      {
        label: 'Relative Value (%)',
        data: comparisonItems.map(item => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
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
        text: 'Value Comparison (% of Input)',
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
              label += context.parsed.y.toFixed(2) + '%';
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#9ca3af', // text-gray-400
          callback: function(value: any) {
            return value + '%';
          }
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.2)', // gray-600 with opacity
        }
      },
      x: {
        ticks: {
          color: '#9ca3af', // text-gray-400
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.2)', // gray-600 with opacity
        }
      }
    }
  };
  
  const units = getUnits();
  
  // Reference values in USD
  const referenceValues = {
    averageCar: 35000,        // $35,000
    collegeTuition: 150000,   // $150,000
    averageHome: 400000,      // $400,000
    smallBusiness: 2000000,   // $2 million
    luxuryYacht: 5000000      // $5 million
  };
  
  // Convert reference values to selected currency
  const convertedReferenceValues = {
    averageCar: convertFromUSD(referenceValues.averageCar),
    collegeTuition: convertFromUSD(referenceValues.collegeTuition),
    averageHome: convertFromUSD(referenceValues.averageHome),
    smallBusiness: convertFromUSD(referenceValues.smallBusiness),
    luxuryYacht: convertFromUSD(referenceValues.luxuryYacht)
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 text-white dark:text-gray-900 rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Input Form and Chart */}
        <div className="space-y-6">
          {/* Input Form */}
          <div className="calculator-card rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-400">Million to Billion Converter</h2>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Conversion Type</label>
              <select 
                className={inputClasses}
                value={conversionType}
                onChange={(e) => setConversionType(e.target.value)}
              >
                <option value="millionToBillion">Million to Billion</option>
                <option value="billionToMillion">Billion to Million</option>
                <option value="millionToTrillion">Million to Trillion</option>
                <option value="trillionToMillion">Trillion to Million</option>
                <option value="billionToTrillion">Billion to Trillion</option>
                <option value="trillionToBillion">Trillion to Billion</option>
              </select>
            </div>
            
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
              {isLoadingRates && (
                <p className="text-xs text-gray-400 mt-1">Loading exchange rates...</p>
              )}
              {rateError && (
                <p className="text-xs text-yellow-400 mt-1">{rateError}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">
                Amount ({units.input})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">{currency}</span>
                <input
                  type="tel" onChange={(e) => handleNumberInput(e.target.value, setAmountStr)} {...decimalInputProps}
                />
              </div>
            </div>
            
            <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Conversion Formula</h3>
              <div className="space-y-2 text-gray-300">
                <p>1 Billion = 1,000 Million</p>
                <p>1 Trillion = 1,000 Billion = 1,000,000 Million</p>
              </div>
            </div>
          </div>
          
          {/* Comparison Chart */}
          <div className="calculator-card rounded-lg p-6">
            <h3 className="text-lg font-bold mb-3 text-blue-400">Value Comparison</h3>
            <div className="h-80 w-full">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
        
        {/* Right Column: Results and Value in Perspective */}
        <div className="space-y-6">
          {/* Results */}
          <div className="calculator-card rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-400">Results</h2>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <div className="text-center">
                <div className="text-gray-400 mb-2">
                  {formatLargeNumber(parseFloat(amountStr) || 0, units.input)} equals
                </div>
                <div className={resultValueClasses}>
                  {formatLargeNumber(convertedAmount, units.output)}
                </div>
                <div className="text-gray-400">
                  {currency}{(parseFloat(amountStr) || 0).toLocaleString()} {units.input} = {currency}{convertedAmount.toLocaleString()} {units.output}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-blue-400">Value in Perspective</h3>
              
              <div className="space-y-3">
                <p className="text-gray-300">
                  To put this amount in perspective, here's what {currency}{(parseFloat(amountStr) || 0).toLocaleString()} {units.input} could buy:
                </p>
                
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Average Car ({formatCurrency(convertedReferenceValues.averageCar)})</span>
                    <span className="text-blue-400 font-medium">
                      {Math.floor((parseFloat(amountStr) || 0) * (units.input === 'million' ? 1000000 : units.input === 'billion' ? 1000000000 : 1000000000000) / convertedReferenceValues.averageCar).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">College Tuition ({formatCurrency(convertedReferenceValues.collegeTuition)})</span>
                    <span className="text-blue-400 font-medium">
                      {Math.floor((parseFloat(amountStr) || 0) * (units.input === 'million' ? 1000000 : units.input === 'billion' ? 1000000000 : 1000000000000) / convertedReferenceValues.collegeTuition).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Average Home ({formatCurrency(convertedReferenceValues.averageHome)})</span>
                    <span className="text-blue-400 font-medium">
                      {Math.floor((parseFloat(amountStr) || 0) * (units.input === 'million' ? 1000000 : units.input === 'billion' ? 1000000000 : 1000000000000) / convertedReferenceValues.averageHome).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Small Business ({formatCurrency(convertedReferenceValues.smallBusiness / 1000000)} million)</span>
                    <span className="text-blue-400 font-medium">
                      {((parseFloat(amountStr) || 0) * (units.input === 'million' ? 1000000 : units.input === 'billion' ? 1000000000 : 1000000000000) / convertedReferenceValues.smallBusiness).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Luxury Yacht ({formatCurrency(convertedReferenceValues.luxuryYacht / 1000000)} million)</span>
                    <span className="text-blue-400 font-medium">
                      {((parseFloat(amountStr) || 0) * (units.input === 'million' ? 1000000 : units.input === 'billion' ? 1000000000 : 1000000000000) / convertedReferenceValues.luxuryYacht).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mt-4">
                  Note: These are approximate values and can vary significantly. Exchange rates updated in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 calculator-card p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-blue-400">Understanding Large Numbers</h2>
        
        <div className="space-y-4 text-gray-300">
          <p>
            Large numbers like millions, billions, and trillions can be difficult to comprehend due to their scale. Here's a helpful way to understand them:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className={calculatorSectionHeaderClasses}>Million</h3>
              <p>
                1 million = 1,000,000
              </p>
              <p className="mt-2">
                If you counted one number per second without stopping, it would take about 11.5 days to count to one million.
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className={calculatorSectionHeaderClasses}>Billion</h3>
              <p>
                1 billion = 1,000,000,000 = 1,000 million
              </p>
              <p className="mt-2">
                Counting to one billion at one number per second would take almost 32 years.
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className={calculatorSectionHeaderClasses}>Trillion</h3>
              <p>
                1 trillion = 1,000,000,000,000 = 1,000 billion = 1,000,000 million
              </p>
              <p className="mt-2">
                Counting to one trillion would take over 31,700 years.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MillionToBillionConverter; 