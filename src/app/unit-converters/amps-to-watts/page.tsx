import React from 'react';
import AmpsToWattsCalculator from '@/components/AmpsToWattsCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Amps to Watts Calculator | Convert Current to Power',
  description: 'Convert electrical current (amps) to power (watts) with our easy-to-use calculator. Perfect for electrical calculations and power consumption estimates.',
};

export default async function AmpsToWattsPage() {
  const calculator = await getCalculatorById('amps-to-watts');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Amps to Watts Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert electrical current (amps) to power (watts) with precision. Perfect for electrical calculations and power consumption estimates.
      </p>
      
      <AmpsToWattsCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Amps to Watts Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Conversion</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Amperes (A) and watts (W) are both units used in electrical measurements, but they measure different properties. 
            Amperes measure electrical current, which is the flow of electrical charge, while watts measure power, which is the 
            rate at which energy is transferred or consumed. Converting between amps and watts requires knowing the voltage (V) 
            and, in AC circuits, the power factor (PF).
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formula</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>For DC circuits:</strong> Power (W) = Current (A) × Voltage (V)
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            <strong>For AC circuits:</strong> Power (W) = Current (A) × Voltage (V) × Power Factor
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The power factor is a value between 0 and 1 that represents the efficiency of power transfer in AC circuits. 
            For purely resistive loads (like incandescent light bulbs or heaters), the power factor is 1. For loads with 
            reactive components (like motors or fluorescent lighting), the power factor is less than 1.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Amps to Watts Conversion</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Calculating power consumption of electrical devices</li>
            <li>Determining the appropriate circuit breaker size</li>
            <li>Sizing electrical generators or power supplies</li>
            <li>Estimating energy costs for electrical equipment</li>
            <li>Designing electrical systems for homes or businesses</li>
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