import SquareFeetToCubicFeetCalculator from '@/components/SquareFeetToCubicFeetCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Square Feet to Cubic Feet Calculator | Convert sq ft to cu ft',
  description: 'Convert square feet to cubic feet with precision. Perfect for construction, room volume calculations, and material estimation.',
};

export default function SquareFeetToCubicFeetPage() {
  return <SquareFeetToCubicFeetCalculator />;
} 