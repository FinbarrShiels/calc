import MMACalculator from '@/components/MMACalculator';

export const metadata = {
  title: 'Money Market Account Calculator | Calculate MMA Interest and Growth',
  description: 'Calculate interest earnings and growth for your money market account based on initial deposit, interest rate, and time period.',
};

export default function MMACalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Money Market Account Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate interest earnings and growth for your money market account based on initial deposit, interest rate, and time period.
      </p>
      
      <MMACalculator />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Money Market Accounts</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is a Money Market Account?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            A Money Market Account (MMA) is a type of savings account that typically offers higher interest rates than regular savings accounts. 
            MMAs combine features of both checking and savings accounts, often providing limited check-writing privileges and debit card access 
            while earning interest on your deposits.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How to Use This Calculator</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Enter your initial deposit amount, the annual interest rate (APY), compound frequency, time period in years, and any additional 
            monthly deposits you plan to make. The calculator will show you the future value of your account, total interest earned, 
            and a year-by-year breakdown of your account growth.
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