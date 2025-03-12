"use client";

import { useState, useEffect } from 'react';
import { numericInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

// Define currency denominations
const CURRENCY_DENOMINATIONS = {
  usd: {
    symbol: '$',
    name: 'US Dollar',
    notes: [100, 50, 20, 10, 5, 2, 1],
    coins: [1, 0.5, 0.25, 0.1, 0.05, 0.01]
  },
  eur: {
    symbol: '€',
    name: 'Euro',
    notes: [500, 200, 100, 50, 20, 10, 5],
    coins: [2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01]
  },
  gbp: {
    symbol: '£',
    name: 'British Pound',
    notes: [50, 20, 10, 5],
    coins: [2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01]
  },
  inr: {
    symbol: '₹',
    name: 'Indian Rupee',
    notes: [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1],
    coins: [10, 5, 2, 1, 0.5]
  }
};

type CurrencyCode = 'usd' | 'eur' | 'gbp' | 'inr';

interface DenominationCount {
  [key: string]: number;
}

const MoneyCounterCalculator = () => {
  // State for selected currency
  const [currency, setCurrency] = useState<CurrencyCode>('usd');
  
  // State for counts of each denomination
  const [noteCounts, setNoteCounts] = useState<DenominationCount>({});
  const [coinCounts, setCoinCounts] = useState<DenominationCount>({});
  
  // State for totals
  const [noteTotal, setNoteTotal] = useState(0);
  const [coinTotal, setCoinTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  
  // Initialize counts when currency changes
  useEffect(() => {
    const newNoteCounts: DenominationCount = {};
    const newCoinCounts: DenominationCount = {};
    
    CURRENCY_DENOMINATIONS[currency].notes.forEach(note => {
      newNoteCounts[note] = 0;
    });
    
    CURRENCY_DENOMINATIONS[currency].coins.forEach(coin => {
      newCoinCounts[coin] = 0;
    });
    
    setNoteCounts(newNoteCounts);
    setCoinCounts(newCoinCounts);
    setNoteTotal(0);
    setCoinTotal(0);
    setGrandTotal(0);
  }, [currency]);
  
  // Handle count changes
  const handleNoteCountChange = (denomination: number, count: string) => {
    const parsedCount = parseInt(count) || 0;
    const newCounts = { ...noteCounts, [denomination]: parsedCount };
    setNoteCounts(newCounts);
  };
  
  const handleCoinCountChange = (denomination: number, count: string) => {
    const parsedCount = parseInt(count) || 0;
    const newCounts = { ...coinCounts, [denomination]: parsedCount };
    setCoinCounts(newCounts);
  };
  
  // Calculate totals
  const calculateTotals = () => {
    let newNoteTotal = 0;
    let newCoinTotal = 0;
    
    Object.entries(noteCounts).forEach(([denomination, count]) => {
      newNoteTotal += parseFloat(denomination) * count;
    });
    
    Object.entries(coinCounts).forEach(([denomination, count]) => {
      newCoinTotal += parseFloat(denomination) * count;
    });
    
    setNoteTotal(newNoteTotal);
    setCoinTotal(newCoinTotal);
    setGrandTotal(newNoteTotal + newCoinTotal);
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return `${CURRENCY_DENOMINATIONS[currency].symbol}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  // Format denomination
  const formatDenomination = (value: number) => {
    if (value >= 1) {
      return `${CURRENCY_DENOMINATIONS[currency].symbol}${value}`;
    } else {
      // For coins less than 1 unit, show in smaller units
      if (currency === 'usd') {
        return `${value * 100}¢`;
      } else if (currency === 'gbp') {
        return `${value * 100}p`;
      } else if (currency === 'eur') {
        return `${value * 100}c`;
      } else if (currency === 'inr') {
        return `${value * 100} paise`;
      }
      return `${value}`;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 text-white dark:text-gray-900 rounded-lg shadow-lg p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-3 text-blue-400">Money Counter</h2>
      
      <div className="mb-4">
        <label className="block text-gray-300 mb-1 text-sm">Currency</label>
        <select 
          className={inputClasses}
          value={currency}
          onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        >
          <option value="usd">US Dollar ($)</option>
          <option value="eur">Euro (€)</option>
          <option value="gbp">British Pound (£)</option>
          <option value="inr">Indian Rupee (₹)</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Notes Section */}
        <div>
          <h3 className="text-md font-semibold mb-2 text-blue-400">Notes</h3>
          <div className="space-y-2 pr-1">
            {CURRENCY_DENOMINATIONS[currency].notes.map((note) => (
              <div key={`note-${note}`} className="flex items-center text-sm">
                <div className="w-16 flex-shrink-0">
                  <span className="text-gray-300">{formatDenomination(note)}</span>
                </div>
                <div className="flex-grow">
                  <input
                    type="tel"
                    min="0"
                    value={noteCounts[note] || 0} {...numericInputProps}
                    onChange={(e) => handleNoteCountChange(note, e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className="w-24 text-right text-xs">
                  <span className="text-gray-300">
                    {formatCurrency((noteCounts[note] || 0) * note)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Notes Total:</span>
              <span className="text-green-400 font-bold">{formatCurrency(noteTotal)}</span>
            </div>
          </div>
        </div>
        
        {/* Coins Section */}
        <div>
          <h3 className="text-md font-semibold mb-2 text-blue-400">Coins</h3>
          <div className="space-y-2 pr-1">
            {CURRENCY_DENOMINATIONS[currency].coins.map((coin) => (
              <div key={`coin-${coin}`} className="flex items-center text-sm">
                <div className="w-16 flex-shrink-0">
                  <span className="text-gray-300">{formatDenomination(coin)}</span>
                </div>
                <div className="flex-grow">
                  <input
                    type="tel"
                    min="0"
                    value={coinCounts[coin] || 0} {...numericInputProps}
                    onChange={(e) => handleCoinCountChange(coin, e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className="w-24 text-right text-xs">
                  <span className="text-gray-300">
                    {formatCurrency((coinCounts[coin] || 0) * coin)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Coins Total:</span>
              <span className="text-green-400 font-bold">{formatCurrency(coinTotal)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <button
          onClick={calculateTotals}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-primary/90 text-white dark:text-gray-900 font-semibold rounded-md transition duration-200 text-sm"
        >
          Calculate Total
        </button>
      </div>
      
      <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-md font-bold">Grand Total:</span>
          <span className="text-lg font-bold text-green-400">{formatCurrency(grandTotal)}</span>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-400">
        <p>Note: This calculator helps you count your cash by multiplying the quantity of each denomination by its value.</p>
      </div>
    </div>
  );
};

export default MoneyCounterCalculator; 