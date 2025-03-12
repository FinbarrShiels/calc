import React from 'react';
import AreaConverter from '@/components/AreaConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Area Converter | Convert Between Area Units',
  description: 'Convert between different area units with our easy-to-use converter. Convert square meters, acres, square feet, and more.',
};

export default async function AreaPage() {
  const calculator = await getCalculatorById('area');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Area Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different area units with precision. Easily convert between square meters, acres, square feet, and more.
      </p>
      
      <AreaConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Area Units</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is Area?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Area is the amount of space inside the boundary of a two-dimensional shape. It is measured in square units, such as square feet (ft²), 
            square meters (m²), or square inches (in²). The area of a shape tells you how much surface it covers.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Area Units</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Square Meter (m²):</strong> The standard SI unit of area.</li>
            <li><strong>Square Foot (ft²):</strong> Imperial unit commonly used in the US and UK.</li>
            <li><strong>Square Yard (yd²):</strong> Imperial unit equal to 9 square feet.</li>
            <li><strong>Square Mile (mi²):</strong> Large imperial unit used for land area.</li>
            <li><strong>Acre (ac):</strong> Imperial unit commonly used for land measurement, equal to 43,560 square feet.</li>
            <li><strong>Hectare (ha):</strong> Metric unit commonly used for land measurement, equal to 10,000 square meters.</li>
            <li><strong>Square Kilometer (km²):</strong> Large metric unit used for land area.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formulas</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Square Meters to Square Feet:</strong> ft² = m² × 10.7639</li>
            <li><strong>Square Feet to Square Meters:</strong> m² = ft² × 0.09290304</li>
            <li><strong>Acres to Square Meters:</strong> m² = acres × 4046.86</li>
            <li><strong>Square Meters to Acres:</strong> acres = m² × 0.000247105</li>
            <li><strong>Hectares to Acres:</strong> acres = hectares × 2.47105</li>
            <li><strong>Square Miles to Square Kilometers:</strong> km² = mi² × 2.58999</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Applications</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Real estate and property measurements</li>
            <li>Construction and architecture</li>
            <li>Land management and agriculture</li>
            <li>Interior design and space planning</li>
            <li>Cartography and geography</li>
            <li>Urban planning and development</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            Utility
          </span>
        </div>
      </div>
    </div>
  );
} 