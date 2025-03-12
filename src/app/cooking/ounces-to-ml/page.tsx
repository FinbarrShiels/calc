import CookingConverter from '@/components/CookingConverter';

export const metadata = {
  title: 'Ounces to Milliliters Converter | Convert Cooking Measurements',
  description: 'Convert fluid ounces to milliliters for accurate cooking and baking. Our ounces to ml calculator helps you convert between different volume measurements.',
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Ounces to Milliliters Converter</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Convert between fluid ounces and milliliters for precise cooking and baking
      </p>
      
      <CookingConverter defaultFromUnit="fluid_ounce" defaultToUnit="milliliter" />
    </div>
  );
} 