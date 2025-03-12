import React from 'react';
import LedSavingsCalculator from '@/components/LedSavingsCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'LED Savings Calculator | Calculate Energy and Cost Savings',
  description: 'Calculate how much you can save by switching to LED bulbs. Estimate energy savings, cost reduction, payback period, and environmental impact.',
};

export default async function LedSavingsCalculatorPage() {
  const calculator = await getCalculatorById('led-savings-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <LedSavingsCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About LED Savings Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Why Switch to LED Lighting?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            LED (Light Emitting Diode) bulbs offer significant advantages over traditional incandescent and fluorescent lighting:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Energy Efficiency:</strong> LEDs use up to 90% less energy than incandescent bulbs</li>
            <li><strong>Longevity:</strong> LEDs last 15-25 times longer than traditional bulbs (up to 25,000 hours)</li>
            <li><strong>Cost Savings:</strong> Lower energy consumption and less frequent replacement reduce overall costs</li>
            <li><strong>Environmental Impact:</strong> Reduced energy use means lower carbon emissions</li>
            <li><strong>Quality Lighting:</strong> Available in various color temperatures with excellent light quality</li>
            <li><strong>Durability:</strong> More resistant to breakage and vibrations</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Calculations</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our calculator uses the following formulas to determine your potential savings:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Calculation</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Annual Energy Usage</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Wattage × Quantity × Hours per day × Days per week × 52.143 weeks / 1000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Annual Energy Savings</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Old bulb energy usage - LED energy usage</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Annual Cost Savings</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Energy savings (kWh) × Energy cost per kWh</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Payback Period</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Total cost of LED bulbs ÷ Annual cost savings</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">CO₂ Reduction</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Energy savings (kWh) × 0.85 kg CO₂/kWh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Choosing the Right LED Bulbs</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            When selecting LED bulbs to replace traditional lighting, consider these factors:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Brightness (Lumens):</strong> Focus on lumens rather than watts to match brightness</li>
            <li><strong>Color Temperature:</strong> Measured in Kelvins (K)
              <ul className="list-disc pl-5 mt-1 mb-1">
                <li>Warm white (2700K-3000K): Similar to incandescent, good for living rooms and bedrooms</li>
                <li>Cool white (3500K-4100K): Bright and energizing, good for kitchens and workspaces</li>
                <li>Daylight (5000K-6500K): Bluish white light, good for reading and detailed tasks</li>
              </ul>
            </li>
            <li><strong>Fixture Compatibility:</strong> Ensure the bulb fits your existing fixtures</li>
            <li><strong>Dimmability:</strong> If you use dimmer switches, choose dimmable LED bulbs</li>
            <li><strong>Energy Star Certification:</strong> Look for certified bulbs for guaranteed quality and efficiency</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Additional Savings Tips</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Replace your most frequently used bulbs first to maximize savings</li>
            <li>Look for utility rebates or incentives for LED purchases</li>
            <li>Consider smart LED bulbs that can be programmed or controlled remotely</li>
            <li>Use task lighting instead of lighting entire rooms when possible</li>
            <li>Install motion sensors or timers to reduce unnecessary usage</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            Home & Garden
          </span>
        </div>
      </div>
    </div>
  );
} 