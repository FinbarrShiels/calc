import React from 'react';
import SIPCalculator from '@/components/SIPCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'SIP Calculator | Calculate Systematic Investment Plan Returns',
  description: 'Calculate the future value of your Systematic Investment Plan (SIP) investments and see how your wealth grows over time with our interactive calculator.',
};

export default async function SIPCalculatorPage() {
  const calculator = await getCalculatorById('sip-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">SIP Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Calculate the future value of your Systematic Investment Plan (SIP) investments and see how your wealth grows over time with our interactive calculator.
      </p>
      
      <SIPCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Systematic Investment Plans (SIP)</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">What is a SIP?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            A Systematic Investment Plan (SIP) is an investment strategy where you invest a fixed amount regularly (typically monthly) 
            in mutual funds or other investment vehicles. This disciplined approach to investing helps you build wealth over time through 
            the power of compounding and rupee-cost averaging. SIPs are particularly popular for long-term financial goals like retirement 
            planning, children's education, or buying a home.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Benefits of SIP Investing</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Disciplined investing: Regular investments help develop financial discipline</li>
            <li>Rupee-cost averaging: Automatically buy more units when prices are low and fewer when prices are high</li>
            <li>Power of compounding: Earn returns on your returns over time</li>
            <li>Flexibility: Start with small amounts and increase over time</li>
            <li>Convenience: Automated investments through bank mandates</li>
            <li>Long-term wealth creation: Consistent investing over long periods can lead to significant wealth accumulation</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Step-Up SIP</h3>
          <p className="text-gray-600 dark:text-gray-300">
            A Step-Up SIP (also known as Top-Up SIP) allows you to increase your investment amount periodically, typically annually. 
            This feature is particularly useful as it helps you increase your investments in line with your growing income. By gradually 
            increasing your investment amount, you can potentially achieve your financial goals faster and build a larger corpus over time. 
            Our calculator includes a Step-Up option to help you see the impact of increasing your investments annually.
          </p>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            Finance
          </span>
        </div>
      </div>
    </div>
  );
} 