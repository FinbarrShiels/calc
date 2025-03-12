import LitersToGallonsCalculator from '@/components/LitersToGallonsCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liters to Gallons Calculator | Convert L to gal',
  description: 'Convert liters to gallons with our easy-to-use calculator. Get accurate volume conversions instantly.',
};

export default function LitersToGallonsPage() {
  return <LitersToGallonsCalculator />;
} 