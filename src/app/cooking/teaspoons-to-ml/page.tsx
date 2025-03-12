import CookingConverter from '@/components/CookingConverter';

export const metadata = {
  title: 'Teaspoons to Milliliters Converter | Convert Cooking Measurements',
  description: 'Convert teaspoons to milliliters for accurate cooking and baking. Our teaspoons to ml calculator helps you convert between different volume measurements.',
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Teaspoons to Milliliters Converter</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Convert between teaspoons and milliliters for precise cooking and baking
      </p>
      
      <CookingConverter defaultFromUnit="teaspoon" defaultToUnit="milliliter" />
    </div>
  );
} 