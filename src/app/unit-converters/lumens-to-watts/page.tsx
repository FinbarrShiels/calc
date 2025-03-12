import React from 'react';
import LumensToWattsCalculator from '@/components/LumensToWattsCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Lumens to Watts Calculator | Convert Light Output to Power',
  description: 'Convert light output (lumens) to power consumption (watts) with our easy-to-use calculator. Perfect for lighting design and energy efficiency calculations.',
};

export default async function LumensToWattsPage() {
  const calculator = await getCalculatorById('lumens-to-watts');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Lumens to Watts Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert light output (lumens) to power consumption (watts) with precision. Perfect for lighting design and energy efficiency calculations.
      </p>
      
      <LumensToWattsCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Lumens to Watts Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Conversion</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Lumens (lm) and watts (W) measure different properties of light. Lumens measure the total amount of visible light 
            emitted by a source, while watts measure the power consumption. The relationship between lumens and watts depends 
            on the efficiency of the light source, measured in lumens per watt (lm/W).
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Different lighting technologies have different efficiencies:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Incandescent bulbs: ~15 lm/W</li>
            <li>Halogen bulbs: ~20 lm/W</li>
            <li>CFL (Compact Fluorescent): ~60 lm/W</li>
            <li>LED bulbs: ~80-100 lm/W</li>
            <li>High-pressure sodium: ~100 lm/W</li>
            <li>Low-pressure sodium: ~150 lm/W</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formula</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Power (watts) = Light Output (lumens) ÷ Efficiency (lumens per watt)</strong>
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            For example, if an LED light produces 800 lumens and has an efficiency of 80 lm/W, its power consumption would be 800 ÷ 80 = 10 watts.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Lumens to Watts Conversion</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Estimating power consumption of lighting fixtures</li>
            <li>Comparing energy efficiency of different light sources</li>
            <li>Lighting design for homes, offices, and commercial spaces</li>
            <li>Calculating energy costs for lighting</li>
            <li>Selecting replacement bulbs with equivalent brightness</li>
            <li>Determining power requirements for lighting systems</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Brightness Equivalents</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Common brightness levels and their approximate power consumption for different technologies:
          </p>
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600 mt-2 mb-4">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Brightness (lm)</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Incandescent (W)</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CFL (W)</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">LED (W)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">450</td>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">40</td>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">9-11</td>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">4-5</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">800</td>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">60</td>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">13-15</td>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">8-10</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">1100</td>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">75</td>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">18-20</td>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">11-14</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">1600</td>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">100</td>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">23-26</td>
                <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">16-20</td>
              </tr>
            </tbody>
          </table>
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