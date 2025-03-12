import React from 'react';
import LengthAndDistanceConverter from '@/components/LengthAndDistanceConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Length and Distance Converter | Convert Between Meters, Miles, and More',
  description: 'Convert between different length and distance units with our easy-to-use converter. Meters, kilometers, miles, feet, and more.',
};

export default async function LengthAndDistancePage() {
  const calculator = await getCalculatorById('length-and-distance');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Length and Distance Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different length and distance units with precision. Perfect for travelers, engineers, students, and anyone working with measurements.
      </p>
      
      <LengthAndDistanceConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Length and Distance Units</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Metric System</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The metric system is used in most countries worldwide for measuring length and distance:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Millimeter (mm):</strong> 1/1000 of a meter, used for very small measurements.</li>
            <li><strong>Centimeter (cm):</strong> 1/100 of a meter, commonly used for everyday measurements.</li>
            <li><strong>Meter (m):</strong> The base unit of length in the metric system.</li>
            <li><strong>Kilometer (km):</strong> 1,000 meters, used for longer distances.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Imperial/US Customary System</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The imperial and US customary systems are used primarily in the United States and, to some extent, in the United Kingdom:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Inch (in):</strong> The smallest commonly used unit in the imperial system.</li>
            <li><strong>Foot (ft):</strong> 12 inches, used for medium-range measurements.</li>
            <li><strong>Yard (yd):</strong> 3 feet, commonly used in the US and UK.</li>
            <li><strong>Mile (mi):</strong> 5,280 feet or 1,760 yards, used for longer distances.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Maritime and Navigation Units</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Nautical Mile (nm):</strong> Approximately 1.852 kilometers, used in maritime and aviation contexts.</li>
            <li><strong>League:</strong> Historically variable unit, now standardized as 3 miles or approximately 4.83 kilometers.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Conversions</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>1 inch = 2.54 centimeters</li>
            <li>1 foot = 0.3048 meters</li>
            <li>1 yard = 0.9144 meters</li>
            <li>1 mile = 1.60934 kilometers</li>
            <li>1 nautical mile = 1.852 kilometers</li>
            <li>1 meter = 3.28084 feet</li>
            <li>1 kilometer = 0.621371 miles</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Applications</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Travel:</strong> Converting between miles and kilometers for road trips or international travel.</li>
            <li><strong>Construction:</strong> Converting between metric and imperial measurements for building projects.</li>
            <li><strong>Science and Engineering:</strong> Converting between different units for calculations and designs.</li>
            <li><strong>Navigation:</strong> Converting between nautical miles and other units for maritime or aviation purposes.</li>
            <li><strong>Sports:</strong> Converting track distances, field dimensions, or race lengths between different systems.</li>
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