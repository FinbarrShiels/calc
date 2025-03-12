import React from 'react';
import MilesPerKwhCalculator from '@/components/MilesPerKwhCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Miles per kWh Calculator | Electric Vehicle Efficiency Calculator',
  description: 'Calculate electric vehicle efficiency in miles per kWh, kWh per 100 miles, MPGe, and more. Convert between different EV efficiency units.',
};

export default async function MilesPerKwhCalculatorPage() {
  const calculator = await getCalculatorById('miles-per-kwh-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <MilesPerKwhCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Miles per kWh Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding Electric Vehicle Efficiency</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Electric vehicle (EV) efficiency is measured in several ways, with the most common metrics being:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Miles per kilowatt-hour (mi/kWh):</strong> How far an EV can travel on one kilowatt-hour of electricity</li>
            <li><strong>Kilowatt-hours per 100 miles (kWh/100mi):</strong> How much energy is needed to travel 100 miles</li>
            <li><strong>Kilowatt-hours per 100 kilometers (kWh/100km):</strong> How much energy is needed to travel 100 kilometers</li>
            <li><strong>Watt-hours per mile (Wh/mi):</strong> A more granular measure of energy consumption per mile</li>
            <li><strong>Miles per gallon equivalent (MPGe):</strong> A comparison metric that equates EV efficiency to traditional gas vehicles</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Higher miles per kWh or lower kWh per 100 miles indicates better efficiency. The EPA uses MPGe to help consumers compare electric vehicles to gas vehicles, where 33.7 kWh of electricity equals the energy in one gallon of gasoline.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How to Use This Calculator</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            This calculator offers two modes:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Standard Mode:</strong> Calculate efficiency based on distance traveled and energy used</li>
            <li><strong>Conversion Mode:</strong> Convert between different efficiency metrics</li>
          </ol>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            In Standard Mode:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Enter the distance traveled (in miles or kilometers)</li>
            <li>Enter the energy used (in kilowatt-hours)</li>
            <li>Optionally, enter your electricity price to calculate the trip cost</li>
            <li>View the calculated efficiency metrics</li>
          </ol>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            In Conversion Mode:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Select the efficiency metric you want to convert from</li>
            <li>Enter the value</li>
            <li>View the equivalent values in all other efficiency metrics</li>
          </ol>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Why This Matters</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Understanding EV efficiency helps you:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Compare Vehicles:</strong> Evaluate different electric vehicles based on their efficiency</li>
            <li><strong>Estimate Range:</strong> Calculate how far you can travel on a single charge</li>
            <li><strong>Budget for Charging:</strong> Determine the cost of charging for specific trips</li>
            <li><strong>Understand Performance:</strong> See how driving conditions and style affect efficiency</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Most efficient EVs achieve 4+ miles per kWh in ideal conditions, while average EVs typically get 3-4 miles per kWh. Larger vehicles like electric SUVs and trucks generally achieve 2-3 miles per kWh, and high-performance EVs often get 2-2.5 miles per kWh due to their focus on power rather than efficiency.
          </p>
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