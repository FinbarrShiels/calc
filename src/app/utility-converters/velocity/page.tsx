import React from 'react';
import VelocityConverter from '@/components/VelocityConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Velocity Converter | Convert Between Speed Units',
  description: 'Convert between different velocity units with our easy-to-use converter. Meters per second, kilometers per hour, miles per hour, and more.',
};

export default async function VelocityPage() {
  const calculator = await getCalculatorById('velocity');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Velocity Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different velocity and speed units with precision. Perfect for physics, engineering, and everyday calculations.
      </p>
      
      <VelocityConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Velocity Units</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Velocity Units</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Velocity is measured in various units depending on the context:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Meters per second (m/s):</strong> The SI unit of velocity.</li>
            <li><strong>Kilometers per hour (km/h):</strong> Commonly used for vehicle speeds in most countries.</li>
            <li><strong>Miles per hour (mph):</strong> Used for vehicle speeds in the US, UK, and some other countries.</li>
            <li><strong>Feet per second (ft/s):</strong> Used in engineering in the US and UK.</li>
            <li><strong>Knots (kn):</strong> Used in maritime and aviation contexts (1 knot = 1 nautical mile per hour).</li>
            <li><strong>Mach:</strong> Used for aircraft speeds, where Mach 1 is the speed of sound (approximately 343 m/s at sea level).</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Velocity in Different Contexts</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Transportation:</strong> Vehicle speeds are typically measured in km/h or mph.</li>
            <li><strong>Aviation:</strong> Aircraft speeds are measured in knots or Mach number.</li>
            <li><strong>Maritime:</strong> Ship speeds are measured in knots.</li>
            <li><strong>Physics:</strong> Scientific calculations often use m/s.</li>
            <li><strong>Sports:</strong> Various units are used depending on the sport (e.g., mph for baseball pitches, km/h for tennis serves).</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Velocity Conversions</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>1 m/s = 3.6 km/h</li>
            <li>1 m/s = 2.237 mph</li>
            <li>1 km/h = 0.621 mph</li>
            <li>1 mph = 1.609 km/h</li>
            <li>1 mph = 0.447 m/s</li>
            <li>1 knot = 1.852 km/h</li>
            <li>1 knot = 1.151 mph</li>
            <li>1 ft/s = 0.305 m/s</li>
            <li>1 ft/s = 0.682 mph</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Speed of Sound and Light</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Some reference points for velocity:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Speed of sound in air at sea level: approximately 343 m/s (1,235 km/h or 767 mph)</li>
            <li>Speed of light in vacuum: 299,792,458 m/s (approximately 1.08 billion km/h or 670.6 million mph)</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            Science
          </span>
        </div>
      </div>
    </div>
  );
} 