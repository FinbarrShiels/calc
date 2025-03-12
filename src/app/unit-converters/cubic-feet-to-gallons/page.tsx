import CubicFeetToGallonsCalculator from '@/components/CubicFeetToGallonsCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cubic Feet to Gallons Calculator | Convert ft³ to gal',
  description: 'Convert cubic feet to gallons with our easy-to-use calculator. Get accurate volume conversions instantly.',
};

export default function CubicFeetToGallonsPage() {
  return <CubicFeetToGallonsCalculator />;
} 