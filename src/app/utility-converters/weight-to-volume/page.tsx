import React from 'react';
import WeightToVolumeConverter from '@/components/WeightToVolumeConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Weight to Volume Converter | Convert Based on Material Density',
  description: 'Convert between weight and volume based on material density with our easy-to-use converter. Perfect for various materials including liquids, metals, woods, and building materials.',
};

export default async function WeightToVolumePage() {
  const calculator = await getCalculatorById('weight-to-volume');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Weight to Volume Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between weight and volume based on material density. Select from various materials including liquids, metals, woods, and building materials.
      </p>
      
      <WeightToVolumeConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Weight to Volume Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding Density</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The relationship between weight and volume is determined by density. Density is defined as mass per unit volume, typically measured in kg/L, g/cm³, or lb/ft³.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The formula for converting between weight and volume is:
          </p>
          <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-md text-center mb-4">
            <p className="text-gray-800 dark:text-gray-200 font-mono">Weight = Volume × Density</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono">Volume = Weight ÷ Density</p>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Different materials have different densities, which is why this converter allows you to select specific materials for accurate conversions.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Material Categories</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This converter includes density values for various materials grouped into categories:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Liquids:</strong> Water, milk, oils, gasoline, diesel, honey, alcohol, etc.</li>
            <li><strong>Building Materials:</strong> Concrete, brick, cement, sand, gravel, soil, asphalt, etc.</li>
            <li><strong>Woods:</strong> Oak, pine, maple, cedar, cherry, mahogany, walnut, birch, etc.</li>
            <li><strong>Metals:</strong> Aluminum, steel, iron, copper, brass, lead, gold, silver, etc.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Density Values</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Some common material densities (in kg/L or g/cm³):
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Water:</strong> 1.0</li>
            <li><strong>Milk:</strong> 1.03</li>
            <li><strong>Vegetable Oil:</strong> 0.92</li>
            <li><strong>Gasoline:</strong> 0.75</li>
            <li><strong>Concrete:</strong> 2.4</li>
            <li><strong>Oak Wood:</strong> 0.77</li>
            <li><strong>Pine Wood:</strong> 0.55</li>
            <li><strong>Aluminum:</strong> 2.7</li>
            <li><strong>Steel:</strong> 7.85</li>
            <li><strong>Gold:</strong> 19.32</li>
            <li><strong>Silver:</strong> 10.49</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Applications</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Weight to volume conversion is useful in many contexts:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Construction:</strong> Calculating material quantities and weights.</li>
            <li><strong>Engineering:</strong> Designing structures and systems with weight constraints.</li>
            <li><strong>Shipping:</strong> Determining volume requirements based on weight limits.</li>
            <li><strong>Manufacturing:</strong> Converting between weight and volume in production processes.</li>
            <li><strong>Cooking:</strong> Converting between weight and volume measurements in recipes.</li>
            <li><strong>Science:</strong> Laboratory calculations involving different materials.</li>
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