import Link from 'next/link';

// Custom card component for health calculators
const HealthCalculatorCard = ({ title, description }: { title: string; description?: string }) => {
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

export default function HealthPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Health Calculators</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Tools to help you track, measure, and improve your health and fitness goals.
        </p>
      </div>
      
      {/* Health Calculators Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Health Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <HealthCalculatorCard 
            title="BMI Calculator" 
            description="Calculate your Body Mass Index based on height and weight"
          />
          <HealthCalculatorCard 
            title="BMR Calculator" 
            description="Calculate your Basal Metabolic Rate"
          />
          <HealthCalculatorCard 
            title="How Long to Walk a Mile" 
            description="Estimate how long it takes to walk a mile based on pace"
          />
          <HealthCalculatorCard 
            title="How Many Steps in a Mile" 
            description="Convert miles to steps based on stride length"
          />
          <HealthCalculatorCard 
            title="Kilojoules to Calories" 
            description="Convert kilojoules to calories for nutritional tracking"
          />
          <HealthCalculatorCard 
            title="Miles to Steps" 
            description="Convert miles to steps for fitness tracking"
          />
          <HealthCalculatorCard 
            title="Pregnancy Calculator" 
            description="Calculate due date and pregnancy milestones"
          />
          <HealthCalculatorCard 
            title="Sobriety Calculator" 
            description="Track days of sobriety and milestones"
          />
          <HealthCalculatorCard 
            title="Steps to Calories" 
            description="Estimate calories burned based on step count"
          />
          <HealthCalculatorCard 
            title="Steps to Km" 
            description="Convert steps to kilometers based on stride length"
          />
          <HealthCalculatorCard 
            title="Steps to Miles" 
            description="Convert steps to miles for fitness tracking"
          />
          <HealthCalculatorCard 
            title="WHR Calculator" 
            description="Calculate Waist-to-Hip Ratio for health assessment"
          />
        </div>
      </div>
    </div>
  );
} 