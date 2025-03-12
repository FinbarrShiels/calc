import React from 'react';
import ElectricityCostCalculator from '@/components/ElectricityCostCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Electricity Cost Calculator | Calculate Appliance Energy Costs',
  description: 'Calculate the cost of running your appliances with our easy-to-use electricity cost calculator. Estimate daily, weekly, monthly, and annual energy costs.',
};

export default async function ElectricityCostCalculatorPage() {
  const calculator = await getCalculatorById('electricity-cost-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Electricity Cost Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Calculate how much it costs to run your appliances and devices. Estimate daily, weekly, monthly, and annual electricity costs.
      </p>
      
      <ElectricityCostCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Electricity Costs</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding Electricity Consumption</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Electricity consumption is measured in kilowatt-hours (kWh). A kilowatt-hour represents the amount of energy consumed when a 1,000-watt appliance runs for one hour. To calculate energy consumption:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Determine the power rating of your appliance in watts (W) or kilowatts (kW)</li>
            <li>Calculate how many hours per day the appliance is used</li>
            <li>Multiply the power (in kilowatts) by the hours used to get kWh per day</li>
            <li>Multiply by the number of days to get consumption over longer periods</li>
          </ol>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Finding Your Electricity Rate</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your electricity rate is the amount you pay per kilowatt-hour (kWh) of electricity used. You can find this information:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>On your electricity bill (look for "rate," "price per kWh," or similar)</li>
            <li>On your electricity provider's website</li>
            <li>By contacting your utility company directly</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Electricity rates vary by location, provider, time of day, and season. The average residential electricity rate in the United States is around $0.15 per kWh, but this can range from $0.10 to $0.40 or more depending on your location.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Typical Power Consumption</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Different appliances consume different amounts of electricity. Here are some common examples:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Kitchen Appliances</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                <li>Refrigerator: 150-200 watts</li>
                <li>Electric Oven: 2,000-2,500 watts</li>
                <li>Microwave: 700-1,200 watts</li>
                <li>Coffee Maker: 800-1,400 watts</li>
                <li>Dishwasher: 1,200-1,800 watts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Electronics</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                <li>LED TV (50"): 80-120 watts</li>
                <li>Desktop Computer: 150-300 watts</li>
                <li>Laptop: 50-100 watts</li>
                <li>Wi-Fi Router: 5-20 watts</li>
                <li>Game Console: 120-200 watts</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Energy Saving Strategies</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Reduce your electricity costs with these strategies:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Upgrade to energy-efficient appliances with high Energy Star ratings</li>
            <li>Use smart power strips to eliminate phantom power consumption</li>
            <li>Adjust your thermostat by a few degrees to save on heating and cooling</li>
            <li>Replace incandescent bulbs with LED lighting</li>
            <li>Run large appliances during off-peak hours if your utility offers time-of-use rates</li>
            <li>Properly maintain appliances to ensure they run efficiently</li>
            <li>Use natural light when possible and turn off lights when not in use</li>
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