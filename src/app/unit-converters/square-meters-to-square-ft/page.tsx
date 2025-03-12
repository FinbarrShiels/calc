import SquareMetersToSquareFtCalculator from '@/components/SquareMetersToSquareFtCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Square Meters to Square Feet Calculator | Convert m² to sq ft',
  description: 'Convert square meters to square feet with precision. Perfect for real estate, construction, and international measurements.',
};

export default function SquareMetersToSquareFtPage() {
  return <SquareMetersToSquareFtCalculator />;
} 