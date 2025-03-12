import LitersToTonsCalculator from '@/components/LitersToTonsCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liters to Tons Calculator | Convert L to tons',
  description: 'Convert liters to tons with precision. Perfect for industrial applications, shipping, and weight calculations.',
};

export default function LitersToTonsPage() {
  return <LitersToTonsCalculator />;
} 