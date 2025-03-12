import InchPoundsToFtLbCalculator from '@/components/InchPoundsToFtLbCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inch Pounds to Foot Pounds Calculator | Convert in-lb to ft-lb',
  description: 'Convert inch-pounds to foot-pounds with precision. Perfect for torque conversions, engineering, and mechanical applications.',
};

export default function InchPoundsToFtLbPage() {
  return <InchPoundsToFtLbCalculator />;
} 