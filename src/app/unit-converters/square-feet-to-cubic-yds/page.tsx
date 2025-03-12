import SquareFeetToCubicYdsCalculator from '@/components/SquareFeetToCubicYdsCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Square Feet to Cubic Yards Calculator | Convert sq ft to cu yd',
  description: 'Convert square feet to cubic yards with precision. Perfect for landscaping, construction, and material estimation.',
};

export default function SquareFeetToCubicYdsPage() {
  return <SquareFeetToCubicYdsCalculator />;
} 