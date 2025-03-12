import APYCalculator from '@/components/APYCalculator';

export const metadata = {
  title: 'APY Calculator | Calculate Annual Percentage Yield',
  description: 'Calculate the Annual Percentage Yield (APY) of your investments based on interest rate and compounding frequency.',
};

export default function APYCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">APY Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate the Annual Percentage Yield (APY) of your investments based on interest rate and compounding frequency.
      </p>
      
      <APYCalculator />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Annual Percentage Yield (APY)</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is APY?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Annual Percentage Yield (APY) is a standardized way to measure the effective annual interest rate earned on an investment, 
            taking into account the effects of compounding. It represents the real rate of return on your money over a year, 
            making it easier to compare different investment options with varying compounding frequencies.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">APY vs. APR</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            While Annual Percentage Rate (APR) is the stated interest rate without accounting for compounding, 
            APY includes the effect of compounding interest. For example, an account with a 5% APR compounded monthly 
            will have an APY of approximately 5.12%. The more frequently interest compounds, the greater the difference 
            between APR and APY.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How to Use This Calculator</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Enter the annual interest rate (APR), select the compounding frequency, and optionally input a principal amount 
            and time period to see the future value. The calculator will show you the APY and compare different compounding 
            frequencies to help you understand how compounding affects your returns.
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