import { getCalculatorById } from '@/data/calculators';
import CmToFeetConverter from '@/components/CmToFeetConverter';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function CalculatorPage() {
  const calculator = getCalculatorById('cm-to-feet-converter');
  
  if (!calculator) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">CM to Feet Converter</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Convert centimeters to feet and inches with this easy-to-use calculator.</p>
      
      <CmToFeetConverter />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About this Calculator</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          This calculator converts between centimeters and feet/inches in both directions, which is useful for:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
          <li>Converting height measurements between metric and imperial systems</li>
          <li>International measurement conversions for travel or global projects</li>
          <li>Construction, design, and engineering projects requiring unit conversions</li>
          <li>Converting furniture dimensions when shopping internationally</li>
        </ul>
        
        {calculator.formula && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Formula</h3>
            <p className="bg-white dark:bg-gray-700 p-3 rounded font-mono text-sm">{calculator.formula}</p>
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <Link 
            href={`/category/${calculator.category}`}
            className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
          >
            {calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1)}
          </Link>
        </div>
      </div>
    </div>
  );
} 