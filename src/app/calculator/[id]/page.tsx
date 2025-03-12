import React from 'react';
import { getCalculatorById, calculators } from '@/data/calculators';
import CalculatorForm from '@/components/CalculatorForm';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

interface CalculatorPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return calculators.map((calculator) => ({
    id: calculator.id,
  }));
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  // Await the params.id before using it
  const calculatorId = params.id;
  
  // Get calculator data based on ID
  const calculatorData = await getCalculatorById(calculatorId);
  
  if (!calculatorData) {
    notFound();
  }
  
  // Redirect to custom calculator pages
  if (calculatorId === 'cm-to-feet-converter') {
    redirect(`/calculator/cm-to-feet-converter`);
  }
  
  if (calculatorId === 'compound-interest') {
    redirect(`/calculator/compound-interest`);
  }
  
  if (calculatorId === 'amortization-calculator') {
    redirect(`/calculator/amortization-calculator`);
  }
  
  if (calculatorId === 'compound-interest-daily') {
    redirect(`/calculator/compound-interest-daily`);
  }
  
  if (calculatorId === 'compound-interest-(daily)') {
    redirect(`/calculator/compound-interest-daily`);
  }
  
  if (calculatorId === 'boat-loan-calculator') {
    redirect(`/calculator/boat-loan-calculator`);
  }
  
  if (calculatorId === 'margin-calculator') {
    redirect(`/calculator/margin-calculator`);
  }
  
  if (calculatorId === 'million-to-billion-converter') {
    redirect(`/calculator/million-to-billion-converter`);
  }
  
  if (calculatorId === 'mma-calculator') {
    redirect(`/calculator/mma-calculator`);
  }
  
  if (calculatorId === 'apy-calculator') {
    redirect(`/calculator/apy-calculator`);
  }
  
  if (calculatorId === 'loan-calculator') {
    redirect(`/calculator/loan-calculator`);
  }
  
  if (calculatorId === 'money-counter') {
    redirect(`/calculator/money-counter`);
  }
  
  if (calculatorId === 'mortgage-calculator') {
    redirect(`/calculator/mortgage-calculator`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{calculatorData.name}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{calculatorData.description}</p>
      
      <CalculatorForm calculator={calculatorData} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About this Calculator</h2>
        
        {calculatorData.formula && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Formula</h3>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-md">
              <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{calculatorData.formula}</pre>
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            {calculatorData.category.charAt(0).toUpperCase() + calculatorData.category.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
} 