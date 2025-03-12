import React from 'react';
import FuelConsumptionConverter from '@/components/FuelConsumptionConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Fuel Consumption Converter | Convert Between MPG, L/100km, and More',
  description: 'Convert between different fuel consumption units with our easy-to-use converter. MPG, L/100km, km/L, and more.',
};

export default async function FuelConsumptionPage() {
  const calculator = await getCalculatorById('fuel-consumption');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Fuel Consumption Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different fuel consumption units with precision. Perfect for drivers, car enthusiasts, and anyone comparing vehicle efficiency across different regions.
      </p>
      
      <FuelConsumptionConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Fuel Consumption Units</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Different Measurement Approaches</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Fuel consumption can be measured in two fundamentally different ways:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Distance per volume:</strong> How far you can travel per unit of fuel (e.g., miles per gallon, kilometers per liter)</li>
            <li><strong>Volume per distance:</strong> How much fuel is needed to travel a certain distance (e.g., liters per 100 kilometers)</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            These two approaches are inversely related to each other. Higher values are better for distance per volume measurements, 
            while lower values are better for volume per distance measurements.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Fuel Consumption Units</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Miles per gallon (MPG):</strong> Used in the United States and the United Kingdom, though they use different gallon measurements.</li>
            <li><strong>Liters per 100 kilometers (L/100km):</strong> The standard in most European countries, Australia, and Canada.</li>
            <li><strong>Kilometers per liter (km/L):</strong> Common in Japan, India, and some other Asian countries.</li>
            <li><strong>Miles per liter (miles/L):</strong> Sometimes used for comparing efficiency across different systems.</li>
            <li><strong>Gallons per 100 miles (gal/100mi):</strong> An alternative measurement sometimes used in the US for comparing very efficient vehicles.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">US vs. UK Gallons</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            It's important to note that the US gallon and the UK (Imperial) gallon are different:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>1 US gallon = 3.78541 liters</strong></li>
            <li><strong>1 UK gallon = 4.54609 liters</strong></li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This means that a vehicle rated at 30 MPG in the UK would be rated at approximately 25 MPG in the US, 
            even though the actual fuel efficiency is the same.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formulas</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>MPG (US) to L/100km:</strong> 235.215 ÷ MPG</li>
            <li><strong>L/100km to MPG (US):</strong> 235.215 ÷ L/100km</li>
            <li><strong>MPG (UK) to L/100km:</strong> 282.481 ÷ MPG</li>
            <li><strong>L/100km to MPG (UK):</strong> 282.481 ÷ L/100km</li>
            <li><strong>km/L to L/100km:</strong> 100 ÷ km/L</li>
            <li><strong>L/100km to km/L:</strong> 100 ÷ L/100km</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Applications</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Comparing fuel efficiency of different vehicles</li>
            <li>Converting between regional fuel economy standards</li>
            <li>Calculating fuel costs for trips</li>
            <li>Understanding vehicle specifications when traveling internationally</li>
            <li>Evaluating the impact of driving habits on fuel consumption</li>
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