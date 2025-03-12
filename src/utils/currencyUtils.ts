// Currency data with symbols and names
export const currencyData = [
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

// Cache for exchange rates to minimize API calls
interface ExchangeRateCache {
  rates: Record<string, number>;
  timestamp: number;
  baseCurrency: string;
}

let rateCache: ExchangeRateCache | null = null;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

/**
 * Fetches current exchange rates from an API
 * @param baseCurrency The base currency code (e.g., 'USD')
 * @returns A record of currency codes to exchange rates
 */
export const fetchExchangeRates = async (baseCurrency: string = 'USD'): Promise<Record<string, number>> => {
  // Check if we have valid cached rates
  const now = Date.now();
  if (
    rateCache && 
    rateCache.baseCurrency === baseCurrency && 
    now - rateCache.timestamp < CACHE_DURATION
  ) {
    return rateCache.rates;
  }
  
  try {
    // Use exchangerate-api.com for real exchange rates
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    
    const data = await response.json();
    
    // Create a mapping of currency symbols to rates
    const symbolToRates: Record<string, number> = {};
    
    // Map currency codes to their symbols
    currencyData.forEach(currency => {
      if (data.rates[currency.code]) {
        symbolToRates[currency.symbol] = data.rates[currency.code];
      }
    });
    
    // Add direct mapping for currency codes
    const rates = {
      ...data.rates,
      ...symbolToRates
    };
    
    // Cache the results
    rateCache = {
      rates,
      timestamp: now,
      baseCurrency
    };
    
    return rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    
    // Fallback to approximate rates if API fails
    const fallbackRates: Record<string, number> = {
      'USD': 1,
      'EUR': 0.85,
      'GBP': 0.75,
      'JPY': 110,
      'CAD': 1.25,
      'AUD': 1.35,
      'CHF': 0.92,
      'CNY': 6.5,
      'INR': 75,
      'MXN': 20,
      'BRL': 5.2,
      'RUB': 75,
      'KRW': 1200,
      'SGD': 1.35,
      'NZD': 1.45,
      'HKD': 7.8,
      // Also add symbol mappings
      '$': 1,
      '€': 0.85,
      '£': 0.75,
      '¥': 110,
      'C$': 1.25,
      'A$': 1.35,
      'Fr': 0.92,
      '₹': 75,
      '₽': 75,
      '₩': 1200,
      'S$': 1.35,
      'NZ$': 1.45,
      'HK$': 7.8,
      'R$': 5.2
    };
    
    // Cache the fallback results
    rateCache = {
      rates: fallbackRates,
      timestamp: now,
      baseCurrency
    };
    
    return fallbackRates;
  }
};

/**
 * Converts a value from one currency to another
 * @param value The value to convert
 * @param fromCurrency The source currency symbol or code
 * @param toCurrency The target currency symbol or code
 * @returns The converted value
 */
export const convertCurrency = async (
  value: number, 
  fromCurrency: string = '$', 
  toCurrency: string = '$'
): Promise<number> => {
  // If currencies are the same, no conversion needed
  if (fromCurrency === toCurrency) {
    return value;
  }
  
  try {
    // Get exchange rates with the fromCurrency as base
    const rates = await fetchExchangeRates(
      getCurrencyCode(fromCurrency) || 'USD'
    );
    
    // Get the exchange rate for the target currency
    const rate = rates[getCurrencyCode(toCurrency) || toCurrency] || 1;
    
    // Convert the value
    return value * rate;
  } catch (error) {
    console.error('Error converting currency:', error);
    return value; // Return original value if conversion fails
  }
};

/**
 * Gets the currency code from a symbol
 * @param currencySymbol The currency symbol (e.g., '$')
 * @returns The corresponding currency code (e.g., 'USD')
 */
export const getCurrencyCode = (currencySymbol: string): string | undefined => {
  // If it's already a code, return it
  if (currencyData.some(c => c.code === currencySymbol)) {
    return currencySymbol;
  }
  
  // Find the currency with the matching symbol
  const currency = currencyData.find(c => c.symbol === currencySymbol);
  return currency?.code;
};

/**
 * Gets the currency symbol from a code
 * @param currencyCode The currency code (e.g., 'USD')
 * @returns The corresponding currency symbol (e.g., '$')
 */
export const getCurrencySymbol = (currencyCode: string): string => {
  // If it's already a symbol, return it
  if (currencyData.some(c => c.symbol === currencyCode)) {
    return currencyCode;
  }
  
  // Find the currency with the matching code
  const currency = currencyData.find(c => c.code === currencyCode);
  return currency?.symbol || '$'; // Default to $ if not found
};

/**
 * Formats a value as currency
 * @param value The numeric value
 * @param currencySymbol The currency symbol to use
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currencySymbol: string = '$'): string => {
  return `${currencySymbol}${value.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
}; 