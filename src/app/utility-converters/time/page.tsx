import React from 'react';
import TimeConverter from '@/components/TimeConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Time Converter | Convert Between Seconds, Minutes, Hours, and More',
  description: 'Convert between different time units with our easy-to-use converter. Seconds, minutes, hours, days, and more.',
};

export default async function TimePage() {
  const calculator = await getCalculatorById('time');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Time Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different time units with precision. Perfect for calculations, scheduling, and scientific applications.
      </p>
      
      <TimeConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Time Units</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Standard Time Units</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Time is measured in various units, from the very small to the very large:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Nanosecond (ns):</strong> One billionth of a second (10⁻⁹ seconds).</li>
            <li><strong>Microsecond (μs):</strong> One millionth of a second (10⁻⁶ seconds).</li>
            <li><strong>Millisecond (ms):</strong> One thousandth of a second (10⁻³ seconds).</li>
            <li><strong>Second (s):</strong> The base unit of time in the International System of Units (SI).</li>
            <li><strong>Minute (min):</strong> 60 seconds.</li>
            <li><strong>Hour (h):</strong> 60 minutes or 3,600 seconds.</li>
            <li><strong>Day (d):</strong> 24 hours or 86,400 seconds.</li>
            <li><strong>Week (wk):</strong> 7 days or 604,800 seconds.</li>
            <li><strong>Month (mo):</strong> Approximately 30.44 days or 2,629,746 seconds (average).</li>
            <li><strong>Year (yr):</strong> Approximately 365.24 days or 31,556,952 seconds (average).</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Time in Different Contexts</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Computing:</strong> Nanoseconds, microseconds, and milliseconds are commonly used in computing and electronics.</li>
            <li><strong>Everyday Life:</strong> Seconds, minutes, hours, and days are used for daily activities and scheduling.</li>
            <li><strong>Calendar:</strong> Days, weeks, months, and years are used for long-term planning and record-keeping.</li>
            <li><strong>Science:</strong> All units may be used depending on the scale of the phenomenon being studied.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Time Conversions</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>1 minute = 60 seconds</li>
            <li>1 hour = 60 minutes = 3,600 seconds</li>
            <li>1 day = 24 hours = 1,440 minutes = 86,400 seconds</li>
            <li>1 week = 7 days = 168 hours = 604,800 seconds</li>
            <li>1 month (average) = 30.44 days = 2,629,746 seconds</li>
            <li>1 year (average) = 365.24 days = 31,556,952 seconds</li>
            <li>1 millisecond = 0.001 seconds = 1,000 microseconds</li>
            <li>1 microsecond = 0.000001 seconds = 1,000 nanoseconds</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Notes on Calendar Units</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Calendar units like months and years vary in length:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Months can have 28, 29, 30, or 31 days depending on the month and whether it's a leap year.</li>
            <li>Years can have 365 or 366 days (leap years).</li>
            <li>This converter uses average values for months (30.44 days) and years (365.24 days) to account for these variations.</li>
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