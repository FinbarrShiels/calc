import React from 'react';
import PricePerSquareFootCalculator from '@/components/PricePerSquareFootCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Price Per Square Foot Calculator | Compare Property Values',
  description: 'Calculate and compare price per square foot for real estate properties to determine fair market value and make better investment decisions.',
};

export default async function PricePerSquareFootCalculatorPage() {
  const calculator = await getCalculatorById('price-per-square-foot');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Price Per Square Foot Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Calculate and compare price per square foot for real estate properties to determine fair market value and make better investment decisions.
      </p>
      
      <PricePerSquareFootCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Price Per Square Foot</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is Price Per Square Foot?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Price per square foot is a common metric used in real estate to compare properties of different sizes. It's calculated by 
            dividing the total price of a property by its total square footage. This measurement helps buyers and sellers determine if 
            a property is priced fairly compared to similar properties in the same area.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Interior vs. Exterior Space</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            When calculating price per square foot, you can choose to include only the interior living space or both interior and 
            exterior spaces like patios, decks, and garages. Interior-only calculations are more common for residential properties, 
            but including exterior spaces can provide a more complete picture of a property's value, especially for homes with 
            significant outdoor living areas.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Using Price Per Square Foot for Comparisons</h3>
          <p className="text-gray-600 dark:text-gray-300">
            While price per square foot is a useful metric, it should be used alongside other factors when comparing properties. 
            Location, property condition, age, amenities, and layout all affect a property's value beyond its size. Properties in 
            the same neighborhood can have significantly different price per square foot values based on these factors.
          </p>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            Finance
          </span>
        </div>
      </div>
    </div>
  );
} 