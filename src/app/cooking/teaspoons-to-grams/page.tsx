import CookingConverter from '@/components/CookingConverter';

export const metadata = {
  title: 'Teaspoons to Grams Converter | Convert Cooking Measurements',
  description: 'Convert teaspoons to grams for accurate cooking and baking. Our teaspoons to grams calculator helps you convert between volume and weight measurements.',
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Teaspoons to Grams Converter</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Convert between teaspoons and grams for precise cooking and baking
      </p>
      
      <CookingConverter defaultFromUnit="teaspoon" defaultToUnit="gram" />
    </div>
  );
} 