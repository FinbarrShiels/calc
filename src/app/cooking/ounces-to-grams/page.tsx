import CookingConverter from '@/components/CookingConverter';

export const metadata = {
  title: 'Ounces to Grams Converter | Convert Cooking Measurements',
  description: 'Convert ounces to grams for accurate cooking and baking. Our ounces to grams calculator helps you convert between different weight measurements.',
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Ounces to Grams Converter</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Convert between ounces and grams for precise cooking and baking
      </p>
      
      <CookingConverter 
        defaultFromUnit="ounce_weight" 
        defaultToUnit="gram"
        showFromOptions={['ounce_weight']} // Only show weight ounces
        showToOptions={['gram', 'kilogram']} // Show gram and kilogram
        conversionName="Ounces to Grams Converter"
      />
    </div>
  );
} 