import React from 'react';
import PressureConverter from '@/components/PressureConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Pressure Converter | Convert Between Pascals, PSI, Bars, and More',
  description: 'Convert between different pressure units with our easy-to-use converter. Pascals, bars, psi, atmospheres, and more.',
};

export default async function PressurePage() {
  const calculator = await getCalculatorById('pressure');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Pressure Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different pressure units with precision. Perfect for engineers, scientists, meteorologists, and divers.
      </p>
      
      <PressureConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Pressure Units</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is Pressure?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Pressure is the force applied perpendicular to the surface of an object per unit area. The SI unit of pressure is the 
            pascal (Pa), which is equal to one newton per square meter (N/m²). Pressure is a scalar quantity, meaning it has magnitude but no direction.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Pressure Units</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Pascal (Pa):</strong> The SI unit of pressure, equal to one newton per square meter.</li>
            <li><strong>Kilopascal (kPa):</strong> 1,000 pascals, commonly used in engineering and meteorology.</li>
            <li><strong>Megapascal (MPa):</strong> 1,000,000 pascals, used for high-pressure applications.</li>
            <li><strong>Bar:</strong> 100,000 pascals, approximately equal to atmospheric pressure at sea level.</li>
            <li><strong>Pound per square inch (psi):</strong> A common unit in the US and UK, especially for tire pressure.</li>
            <li><strong>Atmosphere (atm):</strong> The average pressure at sea level, equal to 101,325 pascals.</li>
            <li><strong>Torr:</strong> Approximately 1/760 of an atmosphere, named after Evangelista Torricelli.</li>
            <li><strong>Millimeter of mercury (mmHg):</strong> Equal to one torr, commonly used for blood pressure.</li>
            <li><strong>Inch of mercury (inHg):</strong> Used in meteorology and aviation in the US.</li>
            <li><strong>Millimeter of water (mmH₂O):</strong> Used for low-pressure measurements.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Pressure in Different Fields</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Meteorology:</strong> Uses millibars (mb), inches of mercury (inHg), or hectopascals (hPa) to measure atmospheric pressure.</li>
            <li><strong>Engineering:</strong> Uses pascals (Pa), bars, or pounds per square inch (psi) for various applications.</li>
            <li><strong>Medicine:</strong> Uses millimeters of mercury (mmHg) for blood pressure measurements.</li>
            <li><strong>Diving:</strong> Uses atmospheres (atm) or bars to measure water pressure at depth.</li>
            <li><strong>Automotive:</strong> Uses pounds per square inch (psi) or bars for tire pressure.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Conversions</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>1 bar = 100,000 pascals</li>
            <li>1 bar = 14.5038 psi</li>
            <li>1 atmosphere = 101,325 pascals</li>
            <li>1 atmosphere = 1.01325 bar</li>
            <li>1 atmosphere = 14.6959 psi</li>
            <li>1 atmosphere = 760 mmHg</li>
            <li>1 psi = 6,894.76 pascals</li>
            <li>1 psi = 0.068948 bar</li>
            <li>1 psi = 2.03602 inHg</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
            Science
          </span>
        </div>
      </div>
    </div>
  );
} 