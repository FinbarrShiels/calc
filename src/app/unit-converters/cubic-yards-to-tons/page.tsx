import CubicYardsToTonsCalculator from '@/components/CubicYardsToTonsCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cubic Yards to Tons Calculator | Convert yd³ to tons',
  description: 'Convert cubic yards to tons with precision. Perfect for construction, landscaping, and material estimation.',
};

export default function CubicYardsToTonsPage() {
  return <CubicYardsToTonsCalculator />;
} 