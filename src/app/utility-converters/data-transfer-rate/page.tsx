import React from 'react';
import DataTransferRateConverter from '@/components/DataTransferRateConverter';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Data Transfer Rate Converter | Convert Between Data Speed Units',
  description: 'Convert between different data transfer rate units with our easy-to-use converter. bps, kbps, Mbps, Gbps, and more.',
};

export default async function DataTransferRatePage() {
  const calculator = await getCalculatorById('data-transfer-rate');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2 text-white">Data Transfer Rate Converter</h1>
      <p className="text-lg text-gray-300 mb-8">
        Convert between different data transfer rate units with precision. Perfect for IT professionals, network engineers, and anyone working with data speeds.
      </p>
      
      <DataTransferRateConverter calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Data Transfer Rate Units</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Bits vs. Bytes</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Data transfer rates can be measured in bits per second (bps) or bytes per second (Bps). There are 8 bits in a byte, 
            so a transfer rate of 8 bps equals 1 Bps. This distinction is important because network speeds are typically 
            measured in bits, while file transfer speeds are often shown in bytes.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Bits per second (bps):</strong> The basic unit for data transfer rate.</li>
            <li><strong>Bytes per second (Bps):</strong> 8 times larger than bits per second.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Data Transfer Rate Units</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>bps (bits per second):</strong> The basic unit of data transfer rate.</li>
            <li><strong>kbps (kilobits per second):</strong> 1,000 bits per second.</li>
            <li><strong>Mbps (megabits per second):</strong> 1,000,000 bits per second.</li>
            <li><strong>Gbps (gigabits per second):</strong> 1,000,000,000 bits per second.</li>
            <li><strong>Tbps (terabits per second):</strong> 1,000,000,000,000 bits per second.</li>
            <li><strong>Bps (bytes per second):</strong> 8 bits per second.</li>
            <li><strong>kBps (kilobytes per second):</strong> 1,000 bytes per second or 8,000 bits per second.</li>
            <li><strong>MBps (megabytes per second):</strong> 1,000,000 bytes per second or 8,000,000 bits per second.</li>
            <li><strong>GBps (gigabytes per second):</strong> 1,000,000,000 bytes per second or 8,000,000,000 bits per second.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Binary Units</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            In addition to decimal units, binary units are sometimes used for data transfer rates:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Kibps (kibibits per second):</strong> 1,024 bits per second</li>
            <li><strong>Mibps (mebibits per second):</strong> 1,048,576 bits per second</li>
            <li><strong>Gibps (gibibits per second):</strong> 1,073,741,824 bits per second</li>
            <li><strong>KiBps (kibibytes per second):</strong> 1,024 bytes per second</li>
            <li><strong>MiBps (mebibytes per second):</strong> 1,048,576 bytes per second</li>
            <li><strong>GiBps (gibibytes per second):</strong> 1,073,741,824 bytes per second</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Common Applications</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li>Measuring internet connection speeds</li>
            <li>Evaluating network performance</li>
            <li>Calculating file download/upload times</li>
            <li>Comparing different internet service plans</li>
            <li>Assessing streaming quality requirements</li>
            <li>Planning network infrastructure capacity</li>
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