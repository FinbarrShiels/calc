import Link from 'next/link';

// Custom card component for cooking calculators
const CookingCalculatorCard = ({ title, description }: { title: string; description?: string }) => {
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

export default function CookingCategoryPage() {
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
          <CookingCalculatorCard 
            title="Cooking Converter" 
            description="Convert between various cooking measurements"
          />
          <CookingCalculatorCard 
            title="Air Fryer Converter" 
            description="Convert traditional oven recipes for air fryer cooking"
          />
          <CookingCalculatorCard 
            title="Baking Conversions" 
            description="Convert common baking measurements"
          />
          <CookingCalculatorCard 
            title="Butter Converter" 
            description="Convert between sticks, cups, tablespoons, and grams of butter"
          />
          <CookingCalculatorCard 
            title="Cups to Grams" 
            description="Convert cup measurements to grams for various ingredients"
          />
          <CookingCalculatorCard 
            title="Cups to mL" 
            description="Convert cups to milliliters for liquid ingredients"
          />
          <CookingCalculatorCard 
            title="Cups to Ounces" 
            description="Convert cups to fluid ounces or weight ounces"
          />
          <CookingCalculatorCard 
            title="Cups to Tablespoons" 
            description="Convert cups to tablespoons for precise measurements"
          />
          <CookingCalculatorCard 
            title="Grams to Cups" 
            description="Convert gram measurements to cups for various ingredients"
          />
          <CookingCalculatorCard 
            title="Grams to Ounces" 
            description="Convert grams to ounces for weight measurements"
          />
          <CookingCalculatorCard 
            title="Grams to Tablespoons" 
            description="Convert grams to tablespoons for various ingredients"
          />
          <CookingCalculatorCard 
            title="Grams to Teaspoons" 
            description="Convert grams to teaspoons for small measurements"
          />
          <CookingCalculatorCard 
            title="mL to Grams" 
            description="Convert milliliters to grams for liquid ingredients"
          />
          <CookingCalculatorCard 
            title="Ounces to mL" 
            description="Convert fluid ounces to milliliters"
          />
          <CookingCalculatorCard 
            title="Ounces to Grams" 
            description="Convert ounces to grams for weight measurements"
          />
          <CookingCalculatorCard 
            title="Oven Temperatures" 
            description="Convert between Fahrenheit, Celsius, and gas mark oven temperatures"
          />
          <CookingCalculatorCard 
            title="Pints to Cups" 
            description="Convert pints to cups for liquid measurements"
          />
          <CookingCalculatorCard 
            title="Pounds and Cups" 
            description="Convert between pounds and cups for various ingredients"
          />
          <CookingCalculatorCard 
            title="Quarts to Cups" 
            description="Convert quarts to cups for liquid measurements"
          />
          <CookingCalculatorCard 
            title="Tablespoons to Teaspoons" 
            description="Convert tablespoons to teaspoons for small measurements"
          />
          <CookingCalculatorCard 
            title="Teaspoons to Grams" 
            description="Convert teaspoons to grams for various ingredients"
          />
          <CookingCalculatorCard 
            title="Teaspoons to mL" 
            description="Convert teaspoons to milliliters for liquid ingredients"
          />
        </div>
      </div>
    </div>
  );
} 