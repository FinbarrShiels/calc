import GallonsToOuncesCalculator from '@/components/GallonsToOuncesCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallons to Fluid Ounces Calculator | Convert gal to fl oz',
  description: 'Convert gallons to fluid ounces with our easy-to-use calculator. Get accurate volume conversions instantly.',
};

export default function GallonsToOuncesPage() {
  return <GallonsToOuncesCalculator />;
} 