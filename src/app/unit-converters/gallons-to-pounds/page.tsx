import GallonsToPoundsCalculator from '@/components/GallonsToPoundsCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallons to Pounds Calculator | Convert gal to lb',
  description: 'Convert gallons to pounds with precision. Perfect for shipping, transportation, and weight calculations.',
};

export default function GallonsToPoundsPage() {
  return <GallonsToPoundsCalculator />;
} 