import React from 'react';
import MpgeCalculator from '@/components/MpgeCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'MPGe Calculator | Miles Per Gallon Equivalent for Electric Vehicles',
  description: 'Calculate MPGe (Miles Per Gallon equivalent) for electric vehicles. Convert between mi/kWh, kWh/100mi, and compare efficiency with conventional vehicles.',
};

export default async function MpgeCalculatorPage() {
  // Try-catch to handle potential errors when fetching calculator data
  let calculator;
  try {
    calculator = await getCalculatorById('mpge-calculator');
  } catch (error) {
    console.error('Error fetching calculator data:', error);
    // Provide fallback data if needed
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <MpgeCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About MPGe Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is MPGe?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            MPGe (Miles Per Gallon equivalent) is a metric developed by the U.S. Environmental Protection Agency (EPA) to compare the energy efficiency of alternative fuel vehicles, including electric vehicles (EVs), to conventional gasoline vehicles.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The EPA established that 33.7 kilowatt-hours (kWh) of electricity contains the same energy as one gallon of gasoline. This equivalence allows consumers to make direct comparisons between electric vehicles and traditional gas-powered vehicles.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How MPGe is Calculated</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The formula for calculating MPGe is:
          </p>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-md mb-4">
            <p className="text-gray-700 dark:text-gray-300 font-mono">
              MPGe = (Miles per kWh) × 33.7 kWh/gallon
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            For example, if an electric vehicle can travel 4 miles per kWh, its MPGe would be:
          </p>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-md mb-4">
            <p className="text-gray-700 dark:text-gray-300 font-mono">
              MPGe = 4 mi/kWh × 33.7 kWh/gallon = 134.8 MPGe
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This means that the electric vehicle is as efficient as a gasoline vehicle that gets 134.8 miles per gallon.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding EV Efficiency Metrics</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Electric vehicle efficiency can be expressed in several ways:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Miles per kWh (mi/kWh):</strong> How far an EV can travel on one kilowatt-hour of electricity</li>
            <li><strong>kWh per 100 miles (kWh/100mi):</strong> How much energy is needed to travel 100 miles</li>
            <li><strong>Kilometers per kWh (km/kWh):</strong> Metric equivalent of miles per kWh</li>
            <li><strong>kWh per 100 kilometers (kWh/100km):</strong> Metric equivalent of kWh per 100 miles</li>
            <li><strong>Watt-hours per mile (Wh/mi):</strong> A more granular measure of energy consumption per mile</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our calculator allows you to convert between these different metrics and calculate the equivalent MPGe.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Factors Affecting EV Efficiency</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Several factors can affect an electric vehicle's efficiency and MPGe:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Vehicle Weight:</strong> Heavier vehicles require more energy to accelerate and maintain speed</li>
            <li><strong>Aerodynamics:</strong> More aerodynamic vehicles experience less drag and use less energy</li>
            <li><strong>Driving Speed:</strong> Higher speeds increase aerodynamic drag exponentially</li>
            <li><strong>Temperature:</strong> Extreme temperatures can reduce battery efficiency and range</li>
            <li><strong>Climate Control:</strong> Using heating or air conditioning consumes additional energy</li>
            <li><strong>Driving Style:</strong> Aggressive acceleration and braking reduce efficiency</li>
            <li><strong>Terrain:</strong> Hilly or mountainous terrain requires more energy than flat roads</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Interpreting MPGe Values</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            When comparing MPGe values:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Higher is better:</strong> A higher MPGe means the vehicle is more efficient</li>
            <li><strong>Most EVs range from 70-140 MPGe:</strong> Significantly higher than most gasoline vehicles</li>
            <li><strong>Compact EVs tend to have higher MPGe:</strong> Due to lighter weight and better aerodynamics</li>
            <li><strong>Electric SUVs and trucks have lower MPGe:</strong> But still typically better than gas equivalents</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            While MPGe is useful for comparing efficiency, it doesn't directly translate to operating costs. Electricity is typically much cheaper per unit of energy than gasoline, so even an EV with a modest MPGe rating can be less expensive to operate than a high-MPG gasoline vehicle.
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