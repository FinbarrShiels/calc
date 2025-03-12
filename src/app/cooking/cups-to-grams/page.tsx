import CookingConverter from '@/components/CookingConverter';

export const metadata = {
  title: 'Cups to Grams Converter | Convert Cooking Measurements',
  description: 'Convert cups to grams for accurate cooking and baking. Our cups to grams calculator helps you convert between volume and weight measurements.',
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Cups to Grams Converter</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Convert between cups and grams for precise cooking and baking
      </p>
      
      <CookingConverter 
        defaultFromUnit="cup" 
        defaultToUnit="gram"
        showFromOptions={['cup', 'cup_uk', 'cup_metric', 'cup_jp']} // Show all cup options
        showToOptions={['gram', 'kilogram']} // Only show gram options
        conversionName="Cups to Grams Converter"
      />
    </div>
  );
} 