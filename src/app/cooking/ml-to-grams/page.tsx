import CookingConverter from '@/components/CookingConverter';

export const metadata = {
  title: 'Milliliters to Grams Converter | Convert Cooking Measurements',
  description: 'Convert milliliters to grams for accurate cooking and baking. Our ml to grams calculator helps you convert between volume and weight measurements.',
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Milliliters to Grams Converter</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Convert between milliliters and grams for precise cooking and baking
      </p>
      
      <CookingConverter defaultFromUnit="milliliter" defaultToUnit="gram" />
    </div>
  );
} 