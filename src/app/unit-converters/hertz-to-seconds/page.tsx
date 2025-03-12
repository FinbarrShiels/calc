import React from 'react';
import HertzToSecondsCalculator from '@/components/HertzToSecondsCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Hertz to Seconds Calculator | Convert Frequency to Period',
  description: 'Convert frequency (hertz) to time period (seconds) with our easy-to-use calculator. Perfect for physics, electronics, and signal processing calculations.',
};

export default async function HertzToSecondsPage() {
  const calculator = await getCalculatorById('hertz-to-seconds');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Hertz to Seconds Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert frequency (hertz) to time period (seconds) with precision. Perfect for physics, electronics, and signal processing calculations.
      </p>
      
      <HertzToSecondsCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Hertz to Seconds Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Understanding the Conversion</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Hertz (Hz) is the unit of frequency, representing the number of cycles per second. The time period, measured in seconds (s), 
            is the duration of one complete cycle. Frequency and period are reciprocals of each other, meaning that as frequency increases, 
            the period decreases, and vice versa.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Conversion Formula</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Period (seconds) = 1 / Frequency (hertz)</strong>
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            For example, if a signal has a frequency of 50 Hz, its period is 1/50 = 0.02 seconds (or 20 milliseconds).
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Uses for Hertz to Seconds Conversion</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Electronics and circuit design</li>
            <li>Audio and signal processing</li>
            <li>Physics and wave mechanics</li>
            <li>Telecommunications</li>
            <li>AC power systems (50/60 Hz)</li>
            <li>Musical acoustics and sound engineering</li>
            <li>Oscillator and timer design</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Frequency Values</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>1 Hz: 1 second period (very low frequency)</li>
            <li>50/60 Hz: 20/16.67 milliseconds (AC power frequency)</li>
            <li>440 Hz: 2.27 milliseconds (musical note A4)</li>
            <li>1 kHz: 1 millisecond (audio frequency)</li>
            <li>2.4 GHz: 0.417 nanoseconds (Wi-Fi frequency)</li>
            <li>5 GHz: 0.2 nanoseconds (Wi-Fi frequency)</li>
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