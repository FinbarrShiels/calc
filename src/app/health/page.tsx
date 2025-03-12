import React from 'react';
import Link from 'next/link';
import { getCalculatorsByCategory } from '@/data/calculators';

export const metadata = {
  title: 'Health Calculators | BMI, Fitness, Nutrition Tools',
  description: 'Free online health calculators for BMI, BMR, steps, calories, pregnancy, and more. Calculate your health metrics with our easy-to-use tools.',
};

export default function HealthCalculatorsPage() {
  const healthCalculators = getCalculatorsByCategory('health');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Health Calculators</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Calculate and track your health metrics with our free online tools
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthCalculators.map((calculator) => (
          <div key={calculator.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={calculator.url || `/health/${calculator.id}`} className="block p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{calculator.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{calculator.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
