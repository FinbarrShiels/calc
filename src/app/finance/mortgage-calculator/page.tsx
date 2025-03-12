import React from 'react';
import MortgageCalculator from '@/components/MortgageCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Mortgage Calculator | Calculate Payments and Amortization Schedule',
  description: 'Calculate your monthly mortgage payment, total interest, and view an amortization schedule for your home loan.',
};

export default async function MortgageCalculatorPage() {
  const calculator = await getCalculatorById('mortgage-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Mortgage Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Calculate your monthly mortgage payment, total interest, and view an amortization schedule for your home loan.
      </p>
      
      <MortgageCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Mortgage Calculations</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding Mortgage Payments</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            A mortgage payment typically consists of four components, often referred to as PITI: Principal, Interest, Taxes, and Insurance. 
            The principal is the amount you borrowed, and the interest is the cost of borrowing that money. Property taxes and homeowners 
            insurance are often collected monthly by your lender and held in an escrow account to be paid when due.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Private Mortgage Insurance (PMI)</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If your down payment is less than 20% of the home's purchase price, you'll typically be required to pay for private mortgage 
            insurance (PMI). This insurance protects the lender in case you default on your loan. PMI usually costs between 0.5% and 1% 
            of your loan amount annually and can be removed once you reach 20% equity in your home.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Amortization Schedule</h3>
          <p className="text-gray-600 dark:text-gray-300">
            An amortization schedule shows how each payment is applied to both the principal and interest over the life of the loan. 
            In the early years of your mortgage, a larger portion of each payment goes toward interest. As you pay down your loan, 
            more of each payment goes toward reducing the principal balance.
          </p>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            Finance
          </span>
        </div>
      </div>
    </div>
  );
} 