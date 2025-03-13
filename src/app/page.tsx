'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle click outside to close search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
        setSelectedIndex(-1);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // Debounced search as user types
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setSelectedIndex(-1);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.results);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
      // Navigate to the selected result
      router.push(searchResults[selectedIndex].url);
      setSearchResults([]);
      setSearchQuery('');
      setSelectedIndex(-1);
    } else if (searchResults.length > 0) {
      // Navigate to the first result
      router.push(searchResults[0].url);
      setSearchResults([]);
      setSearchQuery('');
      setSelectedIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard navigation in search results
    if (searchResults.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Escape':
        setSearchResults([]);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="mx-auto px-4 py-8" style={{ maxWidth: '1140px' }}>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Calculator.io</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Free online calculators for math, finance, health, and more. Simple, accurate, and easy to use.
        </p>
        
        {/* Search Bar */}
        <div className="mx-auto mb-12 relative" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search for calculators..."
              className="w-full px-5 py-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-autocomplete="list"
              aria-controls={searchResults.length > 0 ? "search-results" : undefined}
              aria-activedescendant={selectedIndex >= 0 ? `result-${selectedIndex}` : undefined}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              disabled={isSearching}
            >
              {isSearching ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              )}
            </button>
          </form>
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div 
              id="search-results"
              className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 overflow-y-auto"
              role="listbox"
            >
              <ul className="py-1">
                {searchResults.slice(0, 10).map((result, index) => (
                  <li 
                    key={result.id}
                    id={`result-${index}`}
                    role="option"
                    aria-selected={selectedIndex === index}
                  >
                    <Link 
                      href={result.url}
                      className={`block px-4 py-1 text-sm ${
                        selectedIndex === index 
                          ? 'bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-blue-300' 
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => {
                        setSearchResults([]);
                        setSearchQuery('');
                        setSelectedIndex(-1);
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <span className="font-medium">{result.name}</span>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        {result.category.replace(/-/g, ' ')}
                      </span>
                    </Link>
                  </li>
                ))}
                {searchResults.length > 10 && (
                  <li className="px-4 py-1 text-xs text-gray-500 dark:text-gray-400 text-center">
                    {searchResults.length - 10} more results...
                  </li>
                )}
              </ul>
      </div>
          )}
        </div>
        
        {/* Two-column layout with specific widths */}
        <div className="flex flex-col md:flex-row justify-between">
          {/* Left column - 760px for category cards */}
          <div className="w-full md:w-[760px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link href="/finance" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-3">Finance</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Calculators for loans, investments, mortgages, and more
                </p>
              </Link>
              
              <Link href="/health" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-3">Health</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  BMI, calorie, body fat, and other health calculators
                </p>
              </Link>
              
              <Link href="/unit-converters" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-3">Unit Converters</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Convert between different units of measurement
                </p>
              </Link>
              
              <Link href="/utility-converters" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-3">Utility Converters</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Specialized converters for various applications
                </p>
              </Link>
              
              <Link href="/home-garden" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-3">Home & Garden</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Calculators for home improvement and gardening projects
                </p>
              </Link>
              
              <Link href="/cooking" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-3">Cooking</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Measurement converters for cooking and baking
                </p>
              </Link>
            </div>
        </div>
          
          {/* Right column - 300px with green background */}
          <div className="w-full md:w-[300px] bg-green-100 dark:bg-green-800 rounded-lg mt-8 md:mt-0 p-6">
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-100 mb-3">Future Data</h2>
            <p className="text-green-700 dark:text-green-200">
              This area will be used for additional information and data.
            </p>
          </div>
        </div>
        </div>
    </div>
  );
}
