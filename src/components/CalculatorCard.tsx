"use client";

import Link from 'next/link';
import { Calculator } from '@/data/calculators';
import { numericInputProps } from '@/utils/inputUtils';

interface CalculatorCardProps {
  calculator: Calculator;
}

const CalculatorCard = ({ calculator }: CalculatorCardProps) => {
  return (
    <Link href={`/calculator/${calculator.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-200 h-full">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{calculator.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{calculator.description}</p>
        <div className="flex justify-between items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-gray-900 dark:text-white dark:bg-primary/20 dark:text-primary">
            {calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1)}
          </span>
          <span className="text-accent dark:text-accent text-sm font-medium">Use Calculator →</span>
        </div>
      </div>
    </Link>
  );
};

export default CalculatorCard; 