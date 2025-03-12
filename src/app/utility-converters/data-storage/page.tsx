import React from 'react';
import DataStorageConverter from '@/components/DataStorageConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Data Storage Converter | Convert Between Storage Units',
  description: 'Convert between different data storage units with our easy-to-use converter. Bytes, kilobytes, megabytes, gigabytes, and more.',
};

export default async function DataStoragePage() {
  const calculator = await getCalculatorById('data-storage');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Data Storage Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different data storage units with precision. Perfect for IT professionals, developers, and anyone working with digital storage.
      </p>
      
      <DataStorageConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Data Storage Unit Conversion</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Binary vs. Decimal Units</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            There are two systems for measuring data storage: binary (base-2) and decimal (base-10). This can lead to confusion 
            because the same terms (KB, MB, GB) are sometimes used for both systems.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Binary system (base-2):</strong> 1 KB = 1,024 bytes, 1 MB = 1,024 KB, 1 GB = 1,024 MB, etc.</li>
            <li><strong>Decimal system (base-10):</strong> 1 kB = 1,000 bytes, 1 MB = 1,000 kB, 1 GB = 1,000 MB, etc.</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            To address this confusion, the International Electrotechnical Commission (IEC) introduced new prefixes for binary units: 
            kibibyte (KiB), mebibyte (MiB), gibibyte (GiB), etc.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Data Storage Units</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Byte (B):</strong> The basic unit of digital information, typically representing a single character.</li>
            <li><strong>Kilobyte (KB):</strong> 1,024 bytes (binary) or 1,000 bytes (decimal).</li>
            <li><strong>Megabyte (MB):</strong> 1,048,576 bytes (binary) or 1,000,000 bytes (decimal).</li>
            <li><strong>Gigabyte (GB):</strong> 1,073,741,824 bytes (binary) or 1,000,000,000 bytes (decimal).</li>
            <li><strong>Terabyte (TB):</strong> 1,099,511,627,776 bytes (binary) or 1,000,000,000,000 bytes (decimal).</li>
            <li><strong>Petabyte (PB):</strong> 1,125,899,906,842,624 bytes (binary) or 1,000,000,000,000,000 bytes (decimal).</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">IEC Binary Units</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Kibibyte (KiB):</strong> 1,024 bytes (2¹⁰ bytes)</li>
            <li><strong>Mebibyte (MiB):</strong> 1,048,576 bytes (2²⁰ bytes)</li>
            <li><strong>Gibibyte (GiB):</strong> 1,073,741,824 bytes (2³⁰ bytes)</li>
            <li><strong>Tebibyte (TiB):</strong> 1,099,511,627,776 bytes (2⁴⁰ bytes)</li>
            <li><strong>Pebibyte (PiB):</strong> 1,125,899,906,842,624 bytes (2⁵⁰ bytes)</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Applications</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Understanding storage capacity of devices (hard drives, SSDs, USB drives)</li>
            <li>Calculating file transfer times</li>
            <li>Planning storage requirements for projects</li>
            <li>Understanding data usage limits for internet plans</li>
            <li>Converting between different storage units in technical documentation</li>
            <li>Comparing storage specifications across different systems</li>
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