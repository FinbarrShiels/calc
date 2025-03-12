import React from 'react';
import Link from 'next/link';
import { getCalculatorsByCategory } from '@/data/calculators';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Finance Calculators | Loan, Investment, Salary Tools',
  description: 'Free online finance calculators for loans, mortgages, investments, salary conversion, and more. Plan your financial future with our easy-to-use tools.',
};

// Update the interface for file system calculators and data file calculators
type FileSystemCalculator = {
  id: string;
  name: string;
  url: string;
  description?: string;
  category?: string; // Add category for grouping
};

// Interface for data file calculators that might have additional properties
type DataFileCalculator = {
  id: string;
  name: string;
  url?: string;
  description: string;
  formula?: string;
  inputs: Array<{
    id: string;
    name: string;
    type: "number" | "text" | "select";
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
    unit?: string;
    defaultValue?: string | number;
  }>;
  icon?: string;
  category?: string;
};

// Define calculator categories
const CALCULATOR_CATEGORIES = {
  INVESTMENT: 'Investment Calculators',
  LOAN: 'Loan & Mortgage Calculators',
  PAY: 'Salary & Pay Calculators',
  TAX: 'Tax Calculators',
  GENERAL: 'General Finance Calculators'
};

// This function gets all calculator directories from the file system
function getFinanceCalculatorsFromFileSystem(): FileSystemCalculator[] {
  const financeDir = path.join(process.cwd(), 'src', 'app', 'finance');
  
  try {
    // Read directory and filter out non-directories and page.tsx
    const items = fs.readdirSync(financeDir, { withFileTypes: true });
    return items
      .filter(item => item.isDirectory() && item.name !== 'page.tsx')
      .map(item => ({
        id: item.name,
        name: formatCalculatorName(item.name),
        url: `/finance/${item.name}`,
        category: categorizeCalculator(item.name) // Assign category
      }));
  } catch (error) {
    console.error('Error reading finance directory:', error);
    return [];
  }
}

// Helper function to format calculator names
function formatCalculatorName(dirName: string) {
  // Convert kebab-case to Title Case
  return dirName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to categorize calculators based on their names
function categorizeCalculator(calculatorId: string): string {
  const lowerCaseId = calculatorId.toLowerCase();
  
  // Investment related calculators
  if (lowerCaseId.includes('interest') || 
      lowerCaseId.includes('investment') || 
      lowerCaseId.includes('compound') || 
      lowerCaseId.includes('savings') || 
      lowerCaseId.includes('retirement') || 
      lowerCaseId.includes('roi') || 
      lowerCaseId.includes('dividend') || 
      lowerCaseId.includes('stock') || 
      lowerCaseId.includes('apy') || 
      lowerCaseId.includes('irr')) {
    return CALCULATOR_CATEGORIES.INVESTMENT;
  }
  
  // Loan related calculators
  if (lowerCaseId.includes('loan') || 
      lowerCaseId.includes('mortgage') || 
      lowerCaseId.includes('debt') || 
      lowerCaseId.includes('credit') || 
      lowerCaseId.includes('repayment')) {
    return CALCULATOR_CATEGORIES.LOAN;
  }
  
  // Pay related calculators
  if (lowerCaseId.includes('salary') || 
      lowerCaseId.includes('overtime') || 
      lowerCaseId.includes('time-and-a-half') || 
      lowerCaseId.includes('double-time') || 
      lowerCaseId.includes('hourly') || 
      lowerCaseId.includes('commission') || 
      lowerCaseId.includes('paycheck') || 
      lowerCaseId.includes('bonus')) {
    return CALCULATOR_CATEGORIES.PAY;
  }
  
  // Tax related calculators
  if (lowerCaseId.includes('tax') || 
      lowerCaseId.includes('vat') || 
      lowerCaseId.includes('income')) {
    return CALCULATOR_CATEGORIES.TAX;
  }
  
  // Default to general finance
  return CALCULATOR_CATEGORIES.GENERAL;
}

export default function FinanceCalculatorsPage() {
  // Get calculators from data file
  const dataFileCalculators = getCalculatorsByCategory('finance') as DataFileCalculator[];
  
  // Get calculators from file system
  const fileSystemCalculators = getFinanceCalculatorsFromFileSystem();
  
  // Merge calculators, preferring data from the data file when available
  const mergedCalculators = fileSystemCalculators.map(fsCalc => {
    const dataCalc = dataFileCalculators.find(dc => dc.id === fsCalc.id);
    if (dataCalc) {
      return {
        ...dataCalc,
        url: dataCalc.url || fsCalc.url, // Ensure url is always defined
        category: fsCalc.category
      };
    } else {
      return {
        ...fsCalc,
        description: 'Calculate and plan your finances with this tool'
      };
    }
  });

  // Group calculators by category
  const calculatorsByCategory: Record<string, Array<FileSystemCalculator | (DataFileCalculator & { url: string })>> = {};
  
  // Initialize categories
  Object.values(CALCULATOR_CATEGORIES).forEach(category => {
    calculatorsByCategory[category] = [];
  });
  
  // Group calculators
  mergedCalculators.forEach(calculator => {
    const category = calculator.category || CALCULATOR_CATEGORIES.GENERAL;
    calculatorsByCategory[category] = [...calculatorsByCategory[category], calculator];
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Finance Calculators</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Plan your financial future with our free online calculators
      </p>
      
      {/* Display calculators by category */}
      {Object.entries(calculatorsByCategory).map(([category, calculators]) => (
        calculators.length > 0 && (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculators.map((calculator) => (
                <div key={calculator.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={calculator.url || `/finance/${calculator.id}`} className="block p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{calculator.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{calculator.description || 'Calculate and plan your finances with this tool'}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
      
      {/* Display count of calculators */}
      <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        Showing {mergedCalculators.length} finance calculators
      </div>
    </div>
  );
} 