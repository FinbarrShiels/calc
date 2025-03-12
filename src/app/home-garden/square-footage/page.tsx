import React from 'react';
import SquareFootageCalculator from '@/components/SquareFootageCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Square Footage Calculator | Calculate Area for Various Shapes',
  description: 'Calculate square footage for rooms and areas of different shapes. Supports rectangles, squares, circles, triangles, and trapezoids with multiple unit options.',
};

export default async function SquareFootagePage() {
  const calculator = await getCalculatorById('square-footage');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SquareFootageCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Square Footage Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is Square Footage?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Square footage is a measurement of area expressed in square feet. It's calculated by multiplying the length and width of a space. For irregularly shaped areas, different formulas are used depending on the shape.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This calculator allows you to determine the area of various shapes in different units, including square feet (ft²), square inches (in²), square yards (yd²), square meters (m²), square centimeters (cm²), and square millimeters (mm²).
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How to Measure Square Footage</h3>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Choose the appropriate unit of measurement for your project</li>
            <li>Identify the shape of the area you need to measure</li>
            <li>Take accurate measurements of the dimensions required for that shape</li>
            <li>Use our calculator to determine the area based on those measurements</li>
          </ol>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            For complex spaces, consider breaking the area into simple shapes (rectangles, triangles, etc.), calculating each separately, and then adding them together.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Area Formulas for Different Shapes</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Shape</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Formula</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Rectangle</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Area = Length × Width</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">10 ft × 12 ft = 120 ft²</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Square</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Area = Side² (Side × Side)</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">10 ft × 10 ft = 100 ft²</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Circle</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Area = π × Radius²</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">π × (5 ft)² = 78.54 ft²</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Triangle</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Area = (Base × Height) ÷ 2</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">(10 ft × 8 ft) ÷ 2 = 40 ft²</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Trapezoid</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Area = ((Top Width + Bottom Width) ÷ 2) × Height</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">((8 ft + 12 ft) ÷ 2) × 6 ft = 60 ft²</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Border Area Calculation</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The border area option calculates the area of a border or perimeter around a shape. This is useful for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Calculating the area of a frame around a picture</li>
            <li>Determining the area of a border around a garden bed</li>
            <li>Measuring the area of a walkway around a pool</li>
            <li>Estimating materials needed for trim around a room</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            When you select "yes" for the border area option, the calculator subtracts the inner area from the total area to give you just the area of the border.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Square Footage Calculations</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Flooring:</strong> Calculating how much carpet, tile, or hardwood is needed</li>
            <li><strong>Painting:</strong> Determining the amount of paint required for walls or ceilings</li>
            <li><strong>Landscaping:</strong> Measuring areas for sod, mulch, or other ground coverings</li>
            <li><strong>Construction:</strong> Estimating materials for roofing, concrete, or other building needs</li>
            <li><strong>Real Estate:</strong> Measuring the size of properties, rooms, or living spaces</li>
            <li><strong>Decorating:</strong> Sizing rugs, window treatments, or other home furnishings</li>
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