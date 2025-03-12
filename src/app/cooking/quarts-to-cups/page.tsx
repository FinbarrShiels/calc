import CookingConverter from '@/components/CookingConverter';

export const metadata = {
  title: 'Quarts to Cups Converter | Convert Cooking Measurements',
  description: 'Convert quarts to cups for accurate cooking and baking. Our quarts to cups calculator helps you convert between different volume measurements.',
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Quarts to Cups Converter</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Convert between quarts and cups for precise cooking and baking
      </p>
      
      <CookingConverter defaultFromUnit="quart" defaultToUnit="cup" />
    </div>
  );
} 