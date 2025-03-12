import React from 'react';
import WattsToAmpsCalculator from '@/components/WattsToAmpsCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Watts to Amps Calculator | Convert Power to Current',
  description: 'Convert power (watts) to electrical current (amps) with our easy-to-use calculator. Perfect for electrical calculations and circuit design.',
};

export default async function WattsToAmpsPage() {
  const calculator = await getCalculatorById('watts-to-amps');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Watts to Amps Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert power (watts) to electrical current (amps) with precision. Perfect for electrical calculations and circuit design.
      </p>
      
      <WattsToAmpsCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Watts to Amps Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Conversion</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Watts (W) and amperes (A) are both units used in electrical measurements, but they measure different properties. 
            Watts measure power, which is the rate at which energy is transferred or consumed, while amperes measure electrical 
            current, which is the flow of electrical charge. Converting between watts and amps requires knowing the voltage (V) 
            and, in AC circuits, the power factor (PF).
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formula</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>For DC circuits:</strong> Current (A) = Power (W) ÷ Voltage (V)
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            <strong>For AC circuits:</strong> Current (A) = Power (W) ÷ (Voltage (V) × Power Factor)
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The power factor is a value between 0 and 1 that represents the efficiency of power transfer in AC circuits. 
            For purely resistive loads (like incandescent light bulbs or heaters), the power factor is 1. For loads with 
            reactive components (like motors or fluorescent lighting), the power factor is less than 1.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Watts to Amps Conversion</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Determining the current draw of electrical devices</li>
            <li>Sizing electrical wiring and circuit breakers</li>
            <li>Calculating the load on electrical circuits</li>
            <li>Designing power distribution systems</li>
            <li>Selecting appropriate fuses and protection devices</li>
            <li>Troubleshooting electrical problems</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Voltage Standards</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Residential (US): 120V single-phase, 240V split-phase</li>
            <li>Residential (Europe/Asia): 220-240V single-phase</li>
            <li>Commercial/Industrial (US): 208V, 240V, 480V three-phase</li>
            <li>Commercial/Industrial (Europe/Asia): 380-415V three-phase</li>
            <li>Low voltage DC: 5V, 12V, 24V, 48V</li>
            <li>Automotive: 12V (cars), 24V (trucks)</li>
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