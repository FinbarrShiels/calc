import NewtonMetersToFtLbCalculator from '@/components/NewtonMetersToFtLbCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newton Meters to Foot Pounds Calculator | Convert N·m to ft-lb',
  description: 'Convert newton-meters to foot-pounds with precision. Perfect for torque conversions, engineering, and international unit conversions.',
};

export default function NewtonMetersToFtLbPage() {
  return <NewtonMetersToFtLbCalculator />;
} 