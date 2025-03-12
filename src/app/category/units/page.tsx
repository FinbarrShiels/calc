import Link from 'next/link';

// Custom card component for unit converters
const UnitConverterCard = ({ title, description }: { title: string; description?: string }) => {
  // Convert title to ID format (lowercase, hyphenated)
  const id = title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Link href={`/calculator/${id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-200 h-full">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
        {description && <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>}
        <div className="flex justify-end items-center mt-3">
          <span className="text-accent dark:text-accent text-sm font-medium">Use Converter →</span>
        </div>
      </div>
    </Link>
  );
};

export default function UnitsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Unit Converters</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Easily convert between different units of measurement for various physical quantities.
        </p>
      </div>
      
      {/* Unit Converters Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Unit Converters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <UnitConverterCard 
            title="Acceleration" 
            description="Convert between different units of acceleration"
          />
          <UnitConverterCard 
            title="Area" 
            description="Convert between square meters, square feet, acres, and more"
          />
          <UnitConverterCard 
            title="Data Storage" 
            description="Convert between bytes, kilobytes, megabytes, gigabytes, and more"
          />
          <UnitConverterCard 
            title="Data Transfer Rate" 
            description="Convert between bits per second, bytes per second, and more"
          />
          <UnitConverterCard 
            title="Energy" 
            description="Convert between joules, calories, kilowatt-hours, and more"
          />
          <UnitConverterCard 
            title="Fuel Consumption" 
            description="Convert between miles per gallon, kilometers per liter, and more"
          />
          <UnitConverterCard 
            title="Gold Weight" 
            description="Convert between troy ounces, grams, pennyweights, and more"
          />
          <UnitConverterCard 
            title="Height" 
            description="Convert between feet, inches, centimeters, meters, and more"
          />
          <UnitConverterCard 
            title="Length and Distance" 
            description="Convert between meters, feet, miles, kilometers, and more"
          />
          <UnitConverterCard 
            title="Liquid Volume" 
            description="Convert between liters, gallons, fluid ounces, and more"
          />
          <UnitConverterCard 
            title="Mass and Weight" 
            description="Convert between kilograms, pounds, ounces, and more"
          />
          <UnitConverterCard 
            title="Power" 
            description="Convert between watts, horsepower, kilowatts, and more"
          />
          <UnitConverterCard 
            title="Pressure" 
            description="Convert between pascals, bars, psi, atmospheres, and more"
          />
          <UnitConverterCard 
            title="Temperature" 
            description="Convert between Celsius, Fahrenheit, Kelvin, and more"
          />
          <UnitConverterCard 
            title="Time" 
            description="Convert between seconds, minutes, hours, days, and more"
          />
          <UnitConverterCard 
            title="Velocity" 
            description="Convert between meters per second, miles per hour, and more"
          />
          <UnitConverterCard 
            title="Water Weight" 
            description="Convert between volume and weight of water"
          />
          <UnitConverterCard 
            title="Weight" 
            description="Convert between kilograms, pounds, tons, and more"
          />
          <UnitConverterCard 
            title="Weight to Volume" 
            description="Convert between weight and volume for various substances"
          />
        </div>
      </div>
    </div>
  );
} 