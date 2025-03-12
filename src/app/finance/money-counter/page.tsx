import type { Metadata } from 'next';
import MoneyCounterCalculator from '@/components/MoneyCounterCalculator';

export const metadata: Metadata = {
  title: 'Money Counter Calculator | Count Your Cash',
  description: 'Count your cash by entering the quantity of each denomination of notes and coins you have.',
};

export default function MoneyCounterPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-left">Money Counter Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-left text-sm">
          Count your cash by entering the quantity of each denomination of notes and coins you have.
        </p>
        
        <div className="mb-6">
          <MoneyCounterCalculator />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">How It Works</h2>
            <p className="text-sm">
              1. Select your currency from the dropdown menu<br />
              2. Enter the quantity of each note and coin denomination<br />
              3. Click "Calculate Total" to see your total cash amount<br />
              4. The calculator will show subtotals for notes and coins
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Supported Currencies</h2>
            <ul className="list-disc list-inside text-sm">
              <li>US Dollar (USD) - $</li>
              <li>Euro (EUR) - €</li>
              <li>British Pound (GBP) - £</li>
              <li>Indian Rupee (INR) - ₹</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Tips for Counting Money</h2>
          <ul className="list-disc list-inside text-sm">
            <li>Sort your cash by denomination before counting</li>
            <li>Count each denomination separately and double-check</li>
            <li>Use this calculator to verify your manual count</li>
            <li>For large amounts, consider using money counting machines</li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Why Count Your Money?</h2>
          <p className="text-sm mb-2">
            Regularly counting your cash helps with:
          </p>
          <ul className="list-disc list-inside text-sm">
            <li>Budgeting and financial planning</li>
            <li>Reconciling cash registers or petty cash</li>
            <li>Preparing bank deposits</li>
            <li>Teaching children about money management</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 