import CookingConverter from '@/components/CookingConverter';

export const metadata = {
  title: 'Cups to Ounces Converter | Convert Cooking Measurements',
  description: 'Convert cups to fluid ounces for accurate cooking and baking. Our cups to ounces calculator helps you convert between different volume measurements.',
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Cups to Ounces Converter</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Convert between cups and fluid ounces for precise cooking and baking
      </p>
      
      <CookingConverter defaultFromUnit="cup" defaultToUnit="fluid_ounce" />
    </div>
  );
} 