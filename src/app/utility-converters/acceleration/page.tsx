import React from 'react';
import AccelerationConverter from '@/components/AccelerationConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Acceleration Converter | Convert Between Acceleration Units',
  description: 'Convert between different acceleration units with our easy-to-use converter. Convert m/s², g-force, ft/s², and more.',
};

export default async function AccelerationPage() {
  const calculator = await getCalculatorById('acceleration');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Acceleration Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different acceleration units with precision. Easily convert between m/s², g-force, ft/s², and more.
      </p>
      
      <AccelerationConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Acceleration Units</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is Acceleration?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Acceleration is the rate of change of velocity with respect to time. It is a vector quantity that measures how quickly an object's speed or direction changes. 
            In simpler terms, acceleration describes how rapidly an object speeds up, slows down, or changes direction.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Acceleration Units</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Meters per second squared (m/s²):</strong> The standard SI unit of acceleration.</li>
            <li><strong>G-force (g):</strong> Acceleration relative to Earth's gravitational acceleration (9.81 m/s²).</li>
            <li><strong>Feet per second squared (ft/s²):</strong> Imperial unit of acceleration.</li>
            <li><strong>Inches per second squared (in/s²):</strong> Smaller imperial unit of acceleration.</li>
            <li><strong>Kilometers per hour squared (km/h²):</strong> Rate of change of speed in km/h per second.</li>
            <li><strong>Miles per hour per second (mph/s):</strong> Rate of change of speed in mph per second.</li>
            <li><strong>Gal (cm/s²):</strong> Unit used in gravimetry, equal to 1 cm/s².</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formulas</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>m/s² to g:</strong> g = m/s² ÷ 9.80665</li>
            <li><strong>g to m/s²:</strong> m/s² = g × 9.80665</li>
            <li><strong>ft/s² to m/s²:</strong> m/s² = ft/s² × 0.3048</li>
            <li><strong>m/s² to ft/s²:</strong> ft/s² = m/s² ÷ 0.3048</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Applications</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Physics and engineering calculations</li>
            <li>Vehicle performance specifications</li>
            <li>Aerospace engineering</li>
            <li>Roller coaster and amusement ride design</li>
            <li>Seismic measurements</li>
            <li>Sports science and biomechanics</li>
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