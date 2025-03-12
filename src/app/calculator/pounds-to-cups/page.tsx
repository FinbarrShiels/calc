import CookingConverter from '@/components/CookingConverter';

export const metadata = {
  title: 'Pounds to Cups Converter | Convert Cooking Measurements',
  description: 'Convert pounds to cups for accurate cooking and baking. Our pounds to cups calculator helps you convert between weight and volume measurements.',
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Pounds to Cups Converter</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Convert between pounds and cups for precise cooking and baking
      </p>
      
      <CookingConverter defaultFromUnit="pound" defaultToUnit="cup" />
    </div>
  );
} 