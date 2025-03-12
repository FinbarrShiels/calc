import React from 'react';
import MortgageRefinanceCalculator from '@/components/MortgageRefinanceCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Mortgage Refinance Calculator | Compare Savings and Break-Even Point',
  description: 'Calculate potential savings from refinancing your mortgage, determine the break-even point, and compare your current mortgage with refinancing options.',
};

export default async function MortgageRefinanceCalculatorPage() {
  const calculator = await getCalculatorById('mortgage-refinance');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Mortgage Refinance Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Calculate potential savings from refinancing your mortgage, determine the break-even point, and compare your current mortgage with refinancing options.
      </p>
      
      <MortgageRefinanceCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Mortgage Refinancing</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">When to Consider Refinancing</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Refinancing your mortgage can be beneficial when interest rates have dropped significantly since you obtained your 
            original loan, your credit score has improved, or you want to change your loan term. A common rule of thumb is to 
            consider refinancing if you can reduce your interest rate by at least 0.5 to 1 percentage point.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Break-Even Point</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The break-even point is the time it takes for the savings from your lower monthly payment to exceed the closing costs 
            of refinancing. If you plan to stay in your home longer than the break-even point, refinancing may be financially 
            beneficial. However, if you plan to move before reaching this point, the closing costs might outweigh the savings.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Refinancing Costs</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Refinancing typically involves closing costs, which can range from 2% to 5% of the loan amount. These costs may include 
            application fees, origination fees, appraisal fees, title search, title insurance, and other lender fees. Some lenders 
            offer "no-closing-cost" refinancing, but this usually means the costs are rolled into your loan amount or you'll pay a 
            higher interest rate.
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