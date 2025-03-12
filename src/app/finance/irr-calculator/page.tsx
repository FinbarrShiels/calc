"use client";

import IRRCalculator from '@/components/IRRCalculator';

export default function IRRCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">IRR Calculator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Calculate the Internal Rate of Return (IRR) and Net Present Value (NPV) for a series of cash flows over time.
        </p>
      </div>
      
      <IRRCalculator />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Internal Rate of Return (IRR)</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The Internal Rate of Return (IRR) is a financial metric used to estimate the profitability of potential investments. It is the discount rate that makes the net present value (NPV) of all cash flows equal to zero in a discounted cash flow analysis.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">How IRR Works</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          IRR calculates the annualized effective compounded return rate that would be earned on the invested capital. In other words, it's the interest rate at which the sum of all future cash flows (both positive and negative) equals zero.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The IRR equation is:
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4 text-center">
          <p className="text-gray-800 dark:text-gray-200 font-mono">
            0 = CF₀ + CF₁/(1+IRR)¹ + CF₂/(1+IRR)² + ... + CFₙ/(1+IRR)ⁿ
          </p>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Where:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li>CF₀, CF₁, CF₂, ... CFₙ are the cash flows at each period</li>
          <li>IRR is the internal rate of return</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">IRR vs. Discount Rate</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          When evaluating investments, the IRR is typically compared to a minimum acceptable rate of return, often called the hurdle rate or discount rate:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li><strong>If IRR &gt; Discount Rate:</strong> The investment may be worthwhile as it exceeds the required return</li>
          <li><strong>If IRR &lt; Discount Rate:</strong> The investment may not meet the required return threshold</li>
          <li><strong>If IRR = Discount Rate:</strong> The investment exactly meets the required return (NPV = 0)</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Limitations of IRR</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          While IRR is a valuable metric, it has some limitations to be aware of:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2 mb-4">
          <li><strong>Multiple IRRs:</strong> Some cash flow patterns can result in multiple mathematically valid IRR values</li>
          <li><strong>Reinvestment assumption:</strong> IRR assumes that interim cash flows can be reinvested at the same rate as the IRR itself</li>
          <li><strong>Scale insensitivity:</strong> IRR doesn't account for the absolute size of investments</li>
          <li><strong>Timing sensitivity:</strong> IRR can be manipulated by changing the timing of cash flows</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Using IRR with NPV</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          For a more complete investment analysis, IRR should be used alongside Net Present Value (NPV):
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
          <li><strong>NPV:</strong> Measures the absolute value created by an investment in today's dollars</li>
          <li><strong>IRR:</strong> Measures the efficiency or yield of an investment as a percentage</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Together, these metrics provide a more comprehensive view of an investment's potential. This calculator provides both IRR and NPV to help you make more informed investment decisions.
        </p>
      </div>
    </div>
  );
} 