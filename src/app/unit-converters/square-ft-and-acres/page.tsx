import SquareFeetToAcresCalculator from '@/components/SquareFeetToAcresCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Square Feet to Acres Calculator | Convert sq ft to acres',
  description: 'Convert square feet to acres with precision. Perfect for real estate, land measurement, and property calculations.',
};

export default function SquareFeetToAcresPage() {
  return <SquareFeetToAcresCalculator />;
} 