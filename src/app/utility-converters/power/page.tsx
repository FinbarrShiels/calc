import React from 'react';
import PowerConverter from '@/components/PowerConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Power Converter | Convert Between Watts, Horsepower, and More',
  description: 'Convert between different power units with our easy-to-use converter. Watts, kilowatts, horsepower, BTU/hour, and more.',
};

export default async function PowerPage() {
  const calculator = await getCalculatorById('power');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Power Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different power units with precision. Perfect for engineers, electricians, mechanics, and students.
      </p>
      
      <PowerConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Power Units</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is Power?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Power is the rate at which energy is transferred, used, or transformed. In physics, power is the amount of energy 
            transferred or converted per unit time. The SI unit of power is the watt (W), which is equal to one joule per second (J/s).
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Power Units</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Watt (W):</strong> The SI unit of power, equal to one joule per second.</li>
            <li><strong>Kilowatt (kW):</strong> 1,000 watts, commonly used for electrical devices and systems.</li>
            <li><strong>Megawatt (MW):</strong> 1,000,000 watts, used for large power plants and industrial applications.</li>
            <li><strong>Horsepower (hp):</strong> Approximately 745.7 watts, traditionally used for engines and motors.</li>
            <li><strong>Foot-pound per second (ft·lb/s):</strong> A unit of power in the imperial system.</li>
            <li><strong>BTU per hour (BTU/h):</strong> Used primarily for heating and cooling systems.</li>
            <li><strong>Calorie per second (cal/s):</strong> A unit of power based on the calorie energy unit.</li>
            <li><strong>Kilocalorie per hour (kcal/h):</strong> Often used in exercise and metabolism contexts.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Power in Different Contexts</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Electrical Power:</strong> Measured in watts, kilowatts, or megawatts. Used for electrical devices, power generation, and transmission.</li>
            <li><strong>Mechanical Power:</strong> Often measured in horsepower or watts. Used for engines, motors, and mechanical systems.</li>
            <li><strong>Thermal Power:</strong> Commonly measured in BTU/hour or watts. Used for heating, cooling, and thermal systems.</li>
            <li><strong>Human Power:</strong> Typically measured in watts or kilocalories per hour. Used in exercise science and sports.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Conversions</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>1 horsepower = 745.7 watts</li>
            <li>1 kilowatt = 1.34102 horsepower</li>
            <li>1 kilowatt = 1,000 watts</li>
            <li>1 megawatt = 1,000 kilowatts</li>
            <li>1 BTU/hour = 0.29307 watts</li>
            <li>1 calorie/second = 4.184 watts</li>
            <li>1 foot-pound/second = 1.35582 watts</li>
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