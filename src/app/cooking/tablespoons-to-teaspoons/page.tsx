import CookingConverter from '@/components/CookingConverter';

export const metadata = {
  title: 'Tablespoons to Teaspoons Converter | Convert Cooking Measurements',
  description: 'Convert tablespoons to teaspoons for accurate cooking and baking. Our tablespoons to teaspoons calculator helps you convert between different volume measurements.',
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Tablespoons to Teaspoons Converter</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Convert between tablespoons and teaspoons for precise cooking and baking
      </p>
      
      <CookingConverter 
        defaultFromUnit="tablespoon" 
        defaultToUnit="teaspoon"
        showFromOptions={['tablespoon', 'tablespoon_uk']} // Show both US and UK tablespoons
        showToOptions={['teaspoon', 'teaspoon_uk']} // Show both US and UK teaspoons
        conversionName="Tablespoons to Teaspoons Converter"
      />
    </div>
  );
} 