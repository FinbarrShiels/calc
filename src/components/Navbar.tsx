"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Define the types for our menu items
type MenuItem = {
  name: string;
  url: string;
};

type CategorySection = {
  heading: string;
  items: MenuItem[];
};

type MenuCategory = {
  name: string;
  url: string;
  categories: CategorySection[];
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeMobileCategory, setActiveMobileCategory] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Define main menu categories
  const mainMenuCategories: MenuCategory[] = [
    {
      name: 'Finance',
      url: '/finance',
      categories: [
        {
          heading: "Investment Calculators",
          items: [
            { name: 'Compound Interest', url: '/finance/compound-interest' },
            { name: 'Compound Interest Daily', url: '/finance/compound-interest-daily' },
            { name: 'Investment Calculator', url: '/finance/investment-calculator' },
            { name: 'APY Calculator', url: '/finance/apy-calculator' },
            { name: 'IRR Calculator', url: '/finance/irr-calculator' },
            { name: 'CAGR Calculator', url: '/finance/cagr-calculator' },
            { name: 'Simple Interest Calculator', url: '/finance/simple-interest-calculator' },
            { name: 'Retirement Planning', url: '/finance/retirement-planning' },
            { name: 'Savings Goals', url: '/finance/savings-goals' },
          ]
        },
        {
          heading: "Loan & Mortgage Calculators",
          items: [
            { name: 'Mortgage Calculator', url: '/finance/mortgage-calculator' },
            { name: 'Loan Calculator', url: '/finance/loan-calculator' },
            { name: 'Car Loan Calculator', url: '/finance/car-loan-calculator' },
            { name: 'Boat Loan Calculator', url: '/finance/boat-loan-calculator' },
            { name: 'Loan Payoff Calculator', url: '/finance/loan-payoff-calculator' },
            { name: 'Amortization Calculator', url: '/finance/amortization-calculator' },
            { name: 'Credit Card Repayment', url: '/finance/credit-card-repayment' },
            { name: 'Mortgage Refinance', url: '/finance/mortgage-refinance' },
          ]
        },
        {
          heading: "Pay Calculators",
          items: [
            { name: 'Overtime Calculator', url: '/finance/overtime-calculator' },
            { name: 'Time and a Half Calculator', url: '/finance/time-and-a-half-calculator' },
            { name: 'Hourly to Salary Calculator', url: '/finance/hourly-to-salary-calc' },
            { name: 'Salary to Hourly Calculator', url: '/finance/salary-to-hourly-calc' },
            { name: 'Pay Raise Calculator', url: '/finance/pay-raise-calculator' },
          ]
        }
      ]
    },
    {
      name: 'Unit Converters',
      url: '/unit-converters',
      categories: [
        {
          heading: "Length Converters",
          items: [
            { name: 'Centimeters to Feet', url: '/unit-converters/centimeters-to-feet' },
            { name: 'Centimeters to Inches', url: '/unit-converters/centimeters-to-inches' },
            { name: 'Feet to Inches', url: '/unit-converters/feet-to-inches' },
            { name: 'Feet to Meters', url: '/unit-converters/feet-to-meters' },
            { name: 'Inches to Centimeters', url: '/unit-converters/inches-to-centimeters' },
          ]
        },
        {
          heading: "Volume & Weight Converters",
          items: [
            { name: 'Cubic Feet to Gallons', url: '/unit-converters/cubic-feet-to-gallons' },
            { name: 'Cubic Yards to Tons', url: '/unit-converters/cubic-yards-to-tons' },
            { name: 'Gallons to Ounces', url: '/unit-converters/gallons-to-ounces' },
            { name: 'Gallons to Pounds', url: '/unit-converters/gallons-to-pounds' },
            { name: 'Grams to Pounds', url: '/unit-converters/grams-to-pounds' },
          ]
        },
        {
          heading: "Electrical Converters",
          items: [
            { name: 'Amps to Watts', url: '/unit-converters/amps-to-watts' },
          ]
        }
      ]
    },
    {
      name: 'Utility Converters',
      url: '/utility-converters',
      categories: [
        {
          heading: "Measurement Converters",
          items: [
            { name: 'Acceleration', url: '/utility-converters/acceleration' },
            { name: 'Area', url: '/utility-converters/area' },
            { name: 'Energy', url: '/utility-converters/energy' },
            { name: 'Power', url: '/utility-converters/power' },
            { name: 'Length and Distance', url: '/utility-converters/length-and-distance' },
          ]
        },
        {
          heading: "Digital Converters",
          items: [
            { name: 'Data Storage', url: '/utility-converters/data-storage' },
            { name: 'Data Transfer Rate', url: '/utility-converters/data-transfer-rate' },
          ]
        },
        {
          heading: "Volume & Weight",
          items: [
            { name: 'Liquid Volume', url: '/utility-converters/liquid-volume' },
            { name: 'Mass and Weight', url: '/utility-converters/mass-and-weight' },
            { name: 'Fuel Consumption', url: '/utility-converters/fuel-consumption' },
          ]
        }
      ]
    },
    {
      name: 'Health',
      url: '/health',
      categories: [
        {
          heading: "Fitness Calculators",
          items: [
            { name: 'BMI Calculator', url: '/health/bmi-calculator' },
            { name: 'BMR Calculator', url: '/health/bmr-calculator' },
            { name: 'WHR Calculator', url: '/health/whr-calculator' },
          ]
        },
        {
          heading: "Activity Calculators",
          items: [
            { name: 'Steps to Calories', url: '/health/steps-to-calories' },
            { name: 'Steps to KM', url: '/health/steps-to-km' },
            { name: 'Miles to Steps', url: '/health/miles-to-steps' },
            { name: 'How Many Steps in a Mile', url: '/health/how-many-steps-in-a-mile' },
            { name: 'How Long to Walk a Mile', url: '/health/how-long-to-walk-a-mile' },
          ]
        },
        {
          heading: "Other Health Calculators",
          items: [
            { name: 'Pregnancy Calculator', url: '/health/pregnancy-calculator' },
            { name: 'Sobriety Calculator', url: '/health/sobriety-calculator' },
            { name: 'Kilojoules to Calories', url: '/health/kilojoules-to-calories' },
          ]
        }
      ]
    },
    {
      name: 'Home & Garden',
      url: '/home-garden',
      categories: [
        {
          heading: "Home Calculators",
          items: [
            { name: 'Cubic Feet Calculator', url: '/home-garden/cubic-feet-calculator' },
            { name: 'Price Per Square Foot', url: '/finance/price-per-square-foot' },
          ]
        }
      ]
    },
    {
      name: 'Cooking',
      url: '/cooking',
      categories: [
        {
          heading: "General Cooking",
          items: [
            { name: 'Cooking Converter', url: '/cooking/cooking-converter' },
            { name: 'Baking Conversions', url: '/cooking/baking-conversions' },
            { name: 'Air Fryer Converter', url: '/cooking/air-fryer-converter' },
            { name: 'Butter Converter', url: '/cooking/butter-converter' },
            { name: 'Oven Temperatures', url: '/cooking/oven-temperatures' },
          ]
        },
        {
          heading: "Cup Conversions",
          items: [
            { name: 'Cups to Grams', url: '/cooking/cups-to-grams' },
            { name: 'Cups to mL', url: '/cooking/cups-to-ml' },
            { name: 'Cups to Ounces', url: '/cooking/cups-to-ounces' },
            { name: 'Cups to Tablespoons', url: '/cooking/cups-to-tablespoons' },
            { name: 'Pints to Cups', url: '/cooking/pints-to-cups' },
            { name: 'Quarts to Cups', url: '/cooking/quarts-to-cups' },
          ]
        },
        {
          heading: "Weight & Volume Conversions",
          items: [
            { name: 'Grams to Cups', url: '/cooking/grams-to-cups' },
            { name: 'Grams to Ounces', url: '/cooking/grams-to-ounces' },
            { name: 'Grams to Tablespoons', url: '/cooking/grams-to-tablespoons' },
            { name: 'Grams to Teaspoons', url: '/cooking/grams-to-teaspoons' },
            { name: 'mL to Grams', url: '/cooking/ml-to-grams' },
            { name: 'Ounces to Grams', url: '/cooking/ounces-to-grams' },
            { name: 'Ounces to mL', url: '/cooking/ounces-to-ml' },
            { name: 'Tablespoons to Teaspoons', url: '/cooking/tablespoons-to-teaspoons' },
            { name: 'Teaspoons to mL', url: '/cooking/teaspoons-to-ml' },
          ]
        }
      ]
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveCategory(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMobileCategory(null);
  }, [pathname]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCategory(null);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileMenuOpen) {
      setActiveMobileCategory(null);
    }
  };

  // Toggle mobile category
  const toggleMobileCategory = (index: number) => {
    setActiveMobileCategory(activeMobileCategory === index ? null : index);
  };

  // Handle desktop category hover
  const handleCategoryHover = (index: number) => {
    setActiveCategory(index);
  };

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800 sticky top-0 z-50" ref={navRef}>
      <div className="container mx-auto px-4" style={{ maxWidth: '1140px' }}>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <img 
                src="/calc-hub-nav-new.svg" 
                alt="Calculator.io" 
                width="300" 
                height="100" 
                className="h-8 w-auto"
              />
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {mainMenuCategories.map((category, idx) => (
              <div key={idx} className="relative group">
                <button
                  aria-expanded={activeCategory === idx}
                  aria-controls={`desktop-dropdown-${idx}`}
                  onClick={() => setActiveCategory(activeCategory === idx ? null : idx)}
                  onMouseEnter={() => handleCategoryHover(idx)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                    activeCategory === idx 
                      ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-gray-700' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                  <svg 
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${activeCategory === idx ? 'transform rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown menu with animation */}
                <AnimatePresence>
                  {activeCategory === idx && (
                    <motion.div
                      id={`desktop-dropdown-${idx}`}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
                      style={{ width: '320px', maxHeight: '500px', overflowY: 'auto' }}
                    >
                      <div className="py-2 px-3">
                        {/* Main category header */}
                        <div className="bg-blue-600 text-white p-2 font-medium rounded-t-md -mt-2 -mx-3 mb-2">
                          {category.name} Calculators
                        </div>
                        
                        {/* Popular calculators */}
                        <h3 className="text-xs font-bold text-gray-800 dark:text-gray-200 mb-1 px-2">
                          Popular {category.name}
                        </h3>
                        
                        <div className="mb-2">
                          {category.categories[0]?.items.slice(0, 5).map((item, itemIdx) => (
                            <Link
                              key={itemIdx}
                              href={item.url}
                              className="block px-2 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400 rounded-md transition-colors duration-150"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                        
                        {/* Categories */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-1">
                          <h3 className="text-xs font-bold text-gray-800 dark:text-gray-200 mb-1 px-2">
                            Categories
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-1">
                            {category.categories.map((section, idx) => (
                              <Link
                                key={idx}
                                href={`${category.url}#${section.heading.toLowerCase().replace(/\s+/g, '-')}`}
                                className="px-2 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400 rounded-md transition-colors duration-150"
                              >
                                {section.heading}
                              </Link>
                            ))}
                          </div>
                        </div>
                        
                        {/* View all link */}
                        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-center">
                          <Link
                            href={category.url}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-md transition-colors duration-150"
                          >
                            View All {category.name}
                            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-[80vh] overflow-y-auto">
              {mainMenuCategories.map((category, idx) => (
                <div key={idx} className="rounded-md overflow-hidden">
                  {/* Category button */}
                  <button
                    onClick={() => toggleMobileCategory(idx)}
                    aria-expanded={activeMobileCategory === idx}
                    aria-controls={`mobile-dropdown-${idx}`}
                    className={`w-full flex justify-between items-center px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                      activeMobileCategory === idx
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <span>{category.name}</span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${activeMobileCategory === idx ? 'transform rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Category content with animation */}
                  <AnimatePresence>
                    {activeMobileCategory === idx && (
                      <motion.div
                        id={`mobile-dropdown-${idx}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {/* Main category header */}
                        <div className="bg-blue-600 text-white p-2 font-medium">
                          {category.name} Calculators
                        </div>

                        {/* All calculators in this category */}
                        {category.categories.map((section, sectionIdx) => (
                          <div key={sectionIdx}>
                            {/* Section header */}
                            <div className={`${sectionIdx > 0 ? 'bg-blue-500 text-white p-2 font-medium border-t border-blue-700' : 'hidden'}`}>
                              {section.heading}
                            </div>

                            {/* Section items */}
                            <div className="grid grid-cols-2 gap-1 p-1">
                              {section.items.map((item, itemIdx) => (
                                <Link
                                  key={`${sectionIdx}-${itemIdx}`}
                                  href={item.url}
                                  className="px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700 rounded-md transition-colors duration-150"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                        
                        {/* View all link */}
                        <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                          <Link
                            href={category.url}
                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-md transition-colors duration-150"
                          >
                            View All {category.name}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}