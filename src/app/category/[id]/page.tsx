import { categories, getCalculatorsByCategory } from '@/data/calculators';
import CalculatorCard from '@/components/CalculatorCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
}

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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const id = await params.id;
  const category = categories.find(cat => cat.id === id);
  
  if (!category) {
    notFound();
  }
  
  const calculators = getCalculatorsByCategory(id);

  // Custom finance category page
  if (id === 'finance') {
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

  // Custom utility category page
  if (id === 'utility') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Utility Calculators</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Practical conversion tools for everyday measurements including length, weight, volume, and more.
          </p>
        </div>
        
        {/* Height / Length Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Height / Length</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FinanceCalculatorCard 
              title="Centimeters to feet" 
              description="Convert centimeters to feet and inches"
            />
            <FinanceCalculatorCard 
              title="Centimeters to inches" 
              description="Convert centimeters to inches"
            />
            <FinanceCalculatorCard 
              title="Feet to inches" 
              description="Convert feet to inches"
            />
            <FinanceCalculatorCard 
              title="Feet to meters" 
              description="Convert feet to meters"
            />
            <FinanceCalculatorCard 
              title="Inches to centimeters" 
              description="Convert inches to centimeters"
            />
            <FinanceCalculatorCard 
              title="Inches to feet" 
              description="Convert inches to feet"
            />
            <FinanceCalculatorCard 
              title="Meters to feet & inches" 
              description="Convert meters to feet and inches"
            />
            <FinanceCalculatorCard 
              title="mm to inches" 
              description="Convert millimeters to inches"
            />
          </div>
        </div>
        
        {/* Mass (Weight) Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Mass (Weight)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FinanceCalculatorCard 
              title="Grams to pounds" 
              description="Convert grams to pounds"
            />
            <FinanceCalculatorCard 
              title="Kilos to stone & lb" 
              description="Convert kilograms to stone and pounds"
            />
            <FinanceCalculatorCard 
              title="Kilos to pounds" 
              description="Convert kilograms to pounds"
            />
            <FinanceCalculatorCard 
              title="Micrograms to mg" 
              description="Convert micrograms to milligrams"
            />
            <FinanceCalculatorCard 
              title="Micrograms to grams" 
              description="Convert micrograms to grams"
            />
            <FinanceCalculatorCard 
              title="Milligrams to grams" 
              description="Convert milligrams to grams"
            />
            <FinanceCalculatorCard 
              title="Ounces to pounds" 
              description="Convert ounces to pounds"
            />
            <FinanceCalculatorCard 
              title="Stone to pounds" 
              description="Convert stone to pounds"
            />
          </div>
        </div>
        
        {/* Volume Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Volume</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FinanceCalculatorCard 
              title="Cubic feet to gallons" 
              description="Convert cubic feet to gallons"
            />
            <FinanceCalculatorCard 
              title="Gallons to ounces" 
              description="Convert gallons to fluid ounces"
            />
            <FinanceCalculatorCard 
              title="Liters to gallons" 
              description="Convert liters to gallons"
            />
            <FinanceCalculatorCard 
              title="Liters to ounces" 
              description="Convert liters to fluid ounces"
            />
          </div>
        </div>
        
        {/* Volume to Weight Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Volume to Weight</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FinanceCalculatorCard 
              title="Cubic yards to tons" 
              description="Convert cubic yards to tons"
            />
            <FinanceCalculatorCard 
              title="Gallons to pounds" 
              description="Convert gallons to pounds"
            />
            <FinanceCalculatorCard 
              title="Liters to tons" 
              description="Convert liters to tons"
            />
          </div>
        </div>
        
        {/* Force Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Force</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FinanceCalculatorCard 
              title="Inch-pounds to ft-lb" 
              description="Convert inch-pounds to foot-pounds"
            />
            <FinanceCalculatorCard 
              title="Newton-Meters to ft lb" 
              description="Convert newton-meters to foot-pounds"
            />
          </div>
        </div>
        
        {/* Area Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Area</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FinanceCalculatorCard 
              title="Square ft and acres" 
              description="Convert between square feet and acres"
            />
            <FinanceCalculatorCard 
              title="Square meters to square ft" 
              description="Convert square meters to square feet"
            />
          </div>
        </div>
        
        {/* Area to Volume Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Area to Volume</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FinanceCalculatorCard 
              title="Square feet to cubic feet" 
              description="Convert square feet to cubic feet"
            />
            <FinanceCalculatorCard 
              title="Square feet to cubic yds" 
              description="Convert square feet to cubic yards"
            />
          </div>
        </div>
        
        {/* Energy Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Energy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FinanceCalculatorCard 
              title="Amps to watts" 
              description="Convert amps to watts"
            />
            <FinanceCalculatorCard 
              title="Hertz to seconds" 
              description="Convert frequency (hertz) to time (seconds)"
            />
            <FinanceCalculatorCard 
              title="Lumens to Watts" 
              description="Convert lumens to watts"
            />
            <FinanceCalculatorCard 
              title="Watts to amps" 
              description="Convert watts to amps"
            />
          </div>
        </div>
      </div>
    );
  }

  // Custom home-garden category page
  if (id === 'home-garden') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Home / Garden Calculators</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Essential tools for home improvement, landscaping, and energy efficiency projects.
          </p>
        </div>
        
        {/* Home / Garden Calculators Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Home / Garden</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FinanceCalculatorCard 
              title="Cubic Feet Calculator" 
              description="Calculate volume in cubic feet for various shapes"
            />
            <FinanceCalculatorCard 
              title="Cubic Meters Calculator" 
              description="Calculate volume in cubic meters for various shapes"
            />
            <FinanceCalculatorCard 
              title="Cubic Yards Calculator" 
              description="Calculate volume in cubic yards for landscaping materials"
            />
            <FinanceCalculatorCard 
              title="Electricity Cost Calculator" 
              description="Estimate electricity costs for appliances and devices"
            />
            <FinanceCalculatorCard 
              title="Gravel Calculator" 
              description="Calculate how much gravel you need for your project"
            />
            <FinanceCalculatorCard 
              title="How Much Flooring" 
              description="Calculate flooring materials needed for your space"
            />
            <FinanceCalculatorCard 
              title="LED Savings Calculator" 
              description="Calculate energy savings from switching to LED lighting"
            />
            <FinanceCalculatorCard 
              title="Miles Per kWh Calculator" 
              description="Calculate electric vehicle efficiency in miles per kilowatt-hour"
            />
            <FinanceCalculatorCard 
              title="MPGe Calculator" 
              description="Calculate Miles Per Gallon equivalent for electric vehicles"
            />
            <FinanceCalculatorCard 
              title="Mulch Calculator" 
              description="Calculate how much mulch you need for your garden beds"
            />
            <FinanceCalculatorCard 
              title="Square Footage" 
              description="Calculate the square footage of rooms and spaces"
            />
          </div>
        </div>
      </div>
    );
  }

  // Custom cooking category page
  if (id === 'cooking') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Cooking Calculators</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Handy conversion tools to help you in the kitchen, from recipe measurements to cooking method adjustments.
          </p>
        </div>
        
        {/* Cooking Calculators Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Cooking Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FinanceCalculatorCard 
              title="Cooking Converter" 
              description="Convert between various cooking measurements"
            />
            <FinanceCalculatorCard 
              title="Air Fryer Converter" 
              description="Convert traditional oven recipes for air fryer cooking"
            />
            <FinanceCalculatorCard 
              title="Baking Conversions" 
              description="Convert common baking measurements"
            />
            <FinanceCalculatorCard 
              title="Butter Converter" 
              description="Convert between sticks, cups, tablespoons, and grams of butter"
            />
            <FinanceCalculatorCard 
              title="Cups to Grams" 
              description="Convert cup measurements to grams for various ingredients"
            />
            <FinanceCalculatorCard 
              title="Cups to mL" 
              description="Convert cups to milliliters for liquid ingredients"
            />
            <FinanceCalculatorCard 
              title="Cups to Ounces" 
              description="Convert cups to fluid ounces or weight ounces"
            />
            <FinanceCalculatorCard 
              title="Cups to Tablespoons" 
              description="Convert cups to tablespoons for precise measurements"
            />
            <FinanceCalculatorCard 
              title="Grams to Cups" 
              description="Convert gram measurements to cups for various ingredients"
            />
            <FinanceCalculatorCard 
              title="Grams to Ounces" 
              description="Convert grams to ounces for weight measurements"
            />
            <FinanceCalculatorCard 
              title="Grams to Tablespoons" 
              description="Convert grams to tablespoons for various ingredients"
            />
            <FinanceCalculatorCard 
              title="Grams to Teaspoons" 
              description="Convert grams to teaspoons for small measurements"
            />
            <FinanceCalculatorCard 
              title="mL to Grams" 
              description="Convert milliliters to grams for liquid ingredients"
            />
            <FinanceCalculatorCard 
              title="Ounces to mL" 
              description="Convert fluid ounces to milliliters"
            />
            <FinanceCalculatorCard 
              title="Ounces to Grams" 
              description="Convert ounces to grams for weight measurements"
            />
            <FinanceCalculatorCard 
              title="Oven Temperatures" 
              description="Convert between Fahrenheit, Celsius, and gas mark oven temperatures"
            />
            <FinanceCalculatorCard 
              title="Pints to Cups" 
              description="Convert pints to cups for liquid measurements"
            />
            <FinanceCalculatorCard 
              title="Pounds and Cups" 
              description="Convert between pounds and cups for various ingredients"
            />
            <FinanceCalculatorCard 
              title="Quarts to Cups" 
              description="Convert quarts to cups for liquid measurements"
            />
            <FinanceCalculatorCard 
              title="Tablespoons to Teaspoons" 
              description="Convert tablespoons to teaspoons for small measurements"
            />
            <FinanceCalculatorCard 
              title="Teaspoons to Grams" 
              description="Convert teaspoons to grams for various ingredients"
            />
            <FinanceCalculatorCard 
              title="Teaspoons to mL" 
              description="Convert teaspoons to milliliters for liquid ingredients"
            />
          </div>
        </div>
      </div>
    );
  }

  // Default category page for other categories
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{category.name} Calculators</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">{category.description}</p>
      </div>
      
      {calculators.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map(calculator => (
            <CalculatorCard key={calculator.id} calculator={calculator} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No calculators found</h2>
          <p className="text-gray-600 dark:text-gray-300">There are no calculators in this category yet.</p>
        </div>
      )}
    </div>
  );
} 