import LitersToOuncesCalculator from '@/components/LitersToOuncesCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liters to Fluid Ounces Calculator | Convert L to fl oz',
  description: 'Convert liters to fluid ounces with our easy-to-use calculator. Get accurate volume conversions instantly.',
};

export default function LitersToOuncesPage() {
  return <LitersToOuncesCalculator />;
} 