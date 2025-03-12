import SalaryToHourlyCalculator from '@/components/SalaryToHourlyCalculator';

export const metadata = {
  title: 'Salary to Hourly Calculator | Convert Annual Salary to Hourly Rate',
  description: 'Convert your annual salary to hourly wage with our easy-to-use calculator. See your earnings broken down by hour, day, week, and month.',
};

export default function Page() {
  return <SalaryToHourlyCalculator />;
} 