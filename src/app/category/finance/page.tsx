import Link from 'next/link';

// Custom card component for finance calculators
const FinanceCalculatorCard = ({ title, description }: { title: string; description?: string }) => {
  // Convert title to ID format (lowercase, hyphenated)
  const id = title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Link href={`/calculator/${id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-200 h-full">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
        {description && <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>}
        <div className="flex justify-end items-center mt-3">
          <span className="text-accent dark:text-accent text-sm font-medium">Use Calculator →</span>
        </div>
      </div>
    </Link>
  );
};

export default function FinancePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Finance Calculators</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Powerful financial tools to help you make informed decisions about investments, loans, and savings.
        </p>
      </div>
      
      {/* Finance Calculators Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Finance Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FinanceCalculatorCard 
            title="Compound Interest" 
            description="Calculate how your investments grow with compound interest"
          />
          <FinanceCalculatorCard 
            title="Compound Interest (Daily)" 
            description="Calculate compound interest with daily compounding periods"
          />
          <FinanceCalculatorCard 
            title="Amortization Calculator" 
            description="Create an amortization schedule for your loans"
          />
          <FinanceCalculatorCard 
            title="APY Calculator" 
            description="Calculate the Annual Percentage Yield on your investments"
          />
          <FinanceCalculatorCard 
            title="Boat Loan Calculator" 
            description="Calculate payments and interest for boat financing"
          />
          <FinanceCalculatorCard 
            title="CAGR Calculator" 
            description="Calculate Compound Annual Growth Rate for investments"
          />
          <FinanceCalculatorCard 
            title="Car Loan Calculator" 
            description="Calculate payments and interest for auto loans"
          />
          <FinanceCalculatorCard 
            title="Cash Back Calculator" 
            description="Calculate savings from cash back rewards"
          />
          <FinanceCalculatorCard 
            title="Credit Card Repayment" 
            description="Plan your credit card debt repayment strategy"
          />
          <FinanceCalculatorCard 
            title="Currency Converter" 
            description="Convert between different currencies"
          />
          <FinanceCalculatorCard 
            title="Forex Compounding" 
            description="Calculate compound growth for forex trading"
          />
          <FinanceCalculatorCard 
            title="How Long to Save" 
            description="Calculate how long it will take to reach savings goals"
          />
          <FinanceCalculatorCard 
            title="How Long Will Money Last" 
            description="Calculate how long your savings will last"
          />
          <FinanceCalculatorCard 
            title="Interest Rate Calculator" 
            description="Calculate interest rates for loans and investments"
          />
          <FinanceCalculatorCard 
            title="Investment Calculator" 
            description="Plan and track your investment growth"
          />
          <FinanceCalculatorCard 
            title="IRR Calculator" 
            description="Calculate Internal Rate of Return for investments"
          />
          <FinanceCalculatorCard 
            title="Loan Calculator" 
            description="Calculate payments and interest for any loan"
          />
          <FinanceCalculatorCard 
            title="Loan Payoff Calculator" 
            description="Plan your loan payoff strategy"
          />
          <FinanceCalculatorCard 
            title="Margin Calculator" 
            description="Calculate profit margins for your business"
          />
          <FinanceCalculatorCard 
            title="Million to Billion Converter" 
            description="Understand the scale between millions and billions"
          />
          <FinanceCalculatorCard 
            title="MMA Calculator" 
            description="Calculate returns on Money Market Accounts"
          />
          <FinanceCalculatorCard 
            title="Money Counter" 
            description="Count and total your cash and coins"
          />
          <FinanceCalculatorCard 
            title="Mortgage Calculator" 
            description="Calculate mortgage payments and interest"
          />
          <FinanceCalculatorCard 
            title="Mortgage Refinance" 
            description="Calculate savings from refinancing your mortgage"
          />
          <FinanceCalculatorCard 
            title="Price Per Square Foot" 
            description="Calculate and compare property values"
          />
          <FinanceCalculatorCard 
            title="Retirement Planning" 
            description="Plan for your retirement financial needs"
          />
          <FinanceCalculatorCard 
            title="Savings Calculators" 
            description="Plan and track your savings growth"
          />
          <FinanceCalculatorCard 
            title="Savings Goals" 
            description="Set and track progress toward savings goals"
          />
          <FinanceCalculatorCard 
            title="Simple Interest Calculator" 
            description="Calculate interest earned or paid using simple interest"
          />
          <FinanceCalculatorCard 
            title="SIP Calculator" 
            description="Calculate returns on Systematic Investment Plans"
          />
        </div>
      </div>
      
      {/* Pay Calculators Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Pay Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FinanceCalculatorCard 
            title="Hourly to Salary Calc" 
            description="Convert hourly wages to annual salary"
          />
          <FinanceCalculatorCard 
            title="Overtime Calculator" 
            description="Calculate overtime pay and earnings"
          />
          <FinanceCalculatorCard 
            title="Pay Raise Calculator" 
            description="Calculate the impact of a pay raise"
          />
          <FinanceCalculatorCard 
            title="Salary to Hourly Calc" 
            description="Convert annual salary to hourly wage"
          />
          <FinanceCalculatorCard 
            title="Time and a Half Calculator" 
            description="Calculate time and a half overtime pay"
          />
        </div>
      </div>
    </div>
  );
} 