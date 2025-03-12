import CookingConverter from '@/components/CookingConverter';

export const metadata = {
  title: 'Grams to Ounces Converter | Convert Cooking Measurements',
  description: 'Convert grams to ounces for accurate cooking and baking. Our grams to ounces calculator helps you convert between different weight measurements.',
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Grams to Ounces Converter</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Convert between grams and ounces for precise cooking and baking
      </p>
      
      <CookingConverter defaultFromUnit="gram" defaultToUnit="ounce_weight" />
    </div>
  );
} 