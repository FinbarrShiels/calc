import React from 'react';
import TemperatureConverter from '@/components/TemperatureConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Temperature Converter | Convert Between Celsius, Fahrenheit, Kelvin, and More',
  description: 'Convert between different temperature units with our easy-to-use converter. Celsius, Fahrenheit, Kelvin, and more.',
};

export default async function TemperaturePage() {
  const calculator = await getCalculatorById('temperature');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Temperature Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different temperature units with precision. Perfect for weather, cooking, science, and international travel.
      </p>
      
      <TemperatureConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Temperature Units</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is Temperature?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Temperature is a physical quantity that expresses the hotness or coldness of matter or radiation. It is related to the 
            average kinetic energy of the particles in a substance. Different temperature scales have been developed throughout history, 
            with Celsius, Fahrenheit, and Kelvin being the most widely used today.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Temperature Scales</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Celsius (°C):</strong> Used in most countries worldwide. Water freezes at 0°C and boils at 100°C at standard pressure.</li>
            <li><strong>Fahrenheit (°F):</strong> Used primarily in the United States. Water freezes at 32°F and boils at 212°F at standard pressure.</li>
            <li><strong>Kelvin (K):</strong> The SI unit of temperature. 0K is absolute zero, the theoretical lowest possible temperature. No degree symbol is used.</li>
            <li><strong>Rankine (°R):</strong> An absolute temperature scale like Kelvin, but using Fahrenheit degrees. 0°R is absolute zero.</li>
            <li><strong>Réaumur (°Ré):</strong> A historical scale where water freezes at 0°Ré and boils at 80°Ré. Rarely used today.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formulas</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Celsius to Fahrenheit:</strong> °F = (°C × 9/5) + 32</li>
            <li><strong>Fahrenheit to Celsius:</strong> °C = (°F - 32) × 5/9</li>
            <li><strong>Celsius to Kelvin:</strong> K = °C + 273.15</li>
            <li><strong>Kelvin to Celsius:</strong> °C = K - 273.15</li>
            <li><strong>Fahrenheit to Kelvin:</strong> K = (°F + 459.67) × 5/9</li>
            <li><strong>Kelvin to Fahrenheit:</strong> °F = (K × 9/5) - 459.67</li>
            <li><strong>Celsius to Rankine:</strong> °R = (°C + 273.15) × 9/5</li>
            <li><strong>Rankine to Celsius:</strong> °C = (°R × 5/9) - 273.15</li>
            <li><strong>Celsius to Réaumur:</strong> °Ré = °C × 4/5</li>
            <li><strong>Réaumur to Celsius:</strong> °C = °Ré × 5/4</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Important Temperature Points</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Absolute Zero:</strong> 0K = -273.15°C = -459.67°F</li>
            <li><strong>Freezing Point of Water:</strong> 0°C = 32°F = 273.15K</li>
            <li><strong>Body Temperature:</strong> 37°C = 98.6°F = 310.15K</li>
            <li><strong>Room Temperature:</strong> ~20-25°C = ~68-77°F = ~293-298K</li>
            <li><strong>Boiling Point of Water:</strong> 100°C = 212°F = 373.15K (at standard pressure)</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Temperature in Different Contexts</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Weather:</strong> Celsius in most countries, Fahrenheit in the US.</li>
            <li><strong>Cooking:</strong> Fahrenheit in the US, Celsius elsewhere.</li>
            <li><strong>Science and Medicine:</strong> Celsius or Kelvin, depending on the application.</li>
            <li><strong>Industry:</strong> Various scales depending on the country and application.</li>
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