import React from 'react';
import EnergyConverter from '@/components/EnergyConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Energy Converter | Convert Between Energy Units',
  description: 'Convert between different energy units with our easy-to-use converter. Joules, calories, kilowatt-hours, BTU, and more.',
};

export default async function EnergyPage() {
  const calculator = await getCalculatorById('energy');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Energy Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different energy units with precision. Perfect for scientists, engineers, students, and anyone working with energy calculations.
      </p>
      
      <EnergyConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Energy Units</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is Energy?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Energy is the capacity to do work or produce heat. It exists in various forms such as kinetic, potential, thermal, 
            electrical, chemical, nuclear, and electromagnetic energy. The SI unit of energy is the joule (J).
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Energy Units</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Joule (J):</strong> The SI unit of energy, defined as the energy transferred when applying a force of one newton through a distance of one meter.</li>
            <li><strong>Kilojoule (kJ):</strong> 1,000 joules, commonly used in physics and chemistry.</li>
            <li><strong>Calorie (cal):</strong> The energy needed to raise the temperature of 1 gram of water by 1°C (approximately 4.184 joules).</li>
            <li><strong>Kilocalorie (kcal):</strong> 1,000 calories, often used in nutrition (food calories).</li>
            <li><strong>Watt-hour (Wh):</strong> Energy equivalent to one watt of power expended for one hour (3,600 joules).</li>
            <li><strong>Kilowatt-hour (kWh):</strong> 1,000 watt-hours, commonly used for electrical energy billing.</li>
            <li><strong>Megawatt-hour (MWh):</strong> 1,000,000 watt-hours, used for large-scale energy production.</li>
            <li><strong>British Thermal Unit (BTU):</strong> The energy needed to raise the temperature of one pound of water by 1°F (approximately 1,055 joules).</li>
            <li><strong>Therm:</strong> 100,000 BTU, commonly used for natural gas billing.</li>
            <li><strong>Foot-pound (ft⋅lb):</strong> The energy transferred when a force of one pound acts through a distance of one foot (approximately 1.356 joules).</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Energy in Different Fields</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Physics:</strong> Typically uses joules, kilojoules, or electron-volts (for atomic physics).</li>
            <li><strong>Chemistry:</strong> Often uses joules, kilojoules, or calories per mole.</li>
            <li><strong>Nutrition:</strong> Uses kilocalories (food calories) or kilojoules.</li>
            <li><strong>Electricity:</strong> Commonly measured in watt-hours or kilowatt-hours.</li>
            <li><strong>Heating and Cooling:</strong> Often uses BTUs or therms.</li>
            <li><strong>Mechanical Engineering:</strong> May use foot-pounds, joules, or kilowatt-hours.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Applications</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Calculating energy consumption in homes and businesses</li>
            <li>Determining nutritional energy content in food</li>
            <li>Measuring energy requirements for physical activities</li>
            <li>Designing heating and cooling systems</li>
            <li>Analyzing energy efficiency of machines and processes</li>
            <li>Converting between different energy units in scientific calculations</li>
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