import LoanCalculator from '@/components/LoanCalculator';

export const metadata = {
  title: 'Loan Calculator | Calculate Payments and Amortization Schedule',
  description: 'Calculate monthly payments, total interest, and create an amortization schedule for any type of loan.',
};

export default function LoanCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Loan Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate monthly payments, total interest, and create an amortization schedule for any type of loan.
      </p>
      
      <LoanCalculator />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Loan Calculations</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How Loan Payments Work</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Loan payments typically consist of two parts: principal and interest. The principal is the amount you borrowed, 
            and the interest is the cost of borrowing that money. Each payment you make goes partly toward the principal and 
            partly toward the interest. Early in the loan, a larger portion of your payment goes toward interest, but as you 
            pay down the principal, more of each payment goes toward reducing the principal balance.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Additional Payments</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Making additional payments toward your loan principal can significantly reduce the total interest you pay and 
            help you pay off your loan faster. This calculator allows you to see the impact of regular additional payments 
            or one-time lump sum payments on your loan.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Amortization Schedule</h3>
          <p className="text-gray-600 dark:text-gray-300">
            An amortization schedule shows the breakdown of each payment, including how much goes toward principal and 
            interest, as well as the remaining balance after each payment. This can help you understand how your loan 
            is being paid off over time and how additional payments affect your loan term.
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