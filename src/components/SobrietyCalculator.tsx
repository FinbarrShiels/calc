'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { format, differenceInDays, differenceInMonths, differenceInYears, differenceInHours, differenceInMinutes, differenceInSeconds, addDays } from 'date-fns';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { numericInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses , resultDisplayClasses, resultValueClasses, resultLabelClasses, currencyButtonActiveClasses, currencyButtonInactiveClasses, calculatorSectionHeaderClasses} from '@/utils/themeUtils';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SobrietyCalculatorProps {
  calculator?: Calculator;
}

interface SobrietyMilestone {
  days: number;
  title: string;
  description: string;
}

const SobrietyCalculator: React.FC<SobrietyCalculatorProps> = ({ calculator }) => {
  // Input state
  const [sobrietyDate, setSobrietyDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [sobrietyTime, setSobrietyTime] = useState<string>('00:00');
  
  // Results state
  const [years, setYears] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [nextMilestone, setNextMilestone] = useState<SobrietyMilestone | null>(null);
  const [daysUntilNextMilestone, setDaysUntilNextMilestone] = useState<number>(0);
  
  // Sobriety milestones
  const milestones: SobrietyMilestone[] = [
    { days: 1, title: '24 Hours', description: 'The first day is often the hardest. Making it 24 hours is a significant achievement.' },
    { days: 7, title: '1 Week', description: 'Physical withdrawal symptoms often begin to subside. Sleep may improve.' },
    { days: 30, title: '1 Month', description: 'Many people notice improved mental clarity, energy levels, and mood stability.' },
    { days: 90, title: '90 Days', description: 'The brain begins to heal more significantly. New habits are becoming established.' },
    { days: 180, title: '6 Months', description: 'Many people report significant improvements in relationships and work performance.' },
    { days: 365, title: '1 Year', description: 'A major milestone. You\'ve navigated through all seasonal triggers and annual events.' },
    { days: 730, title: '2 Years', description: 'Long-term recovery is taking hold. Many find increased confidence in their sobriety.' },
    { days: 1095, title: '3 Years', description: 'Sobriety has become a way of life. Many report significant life improvements.' },
    { days: 1825, title: '5 Years', description: 'Relapse rates drop significantly after 5 years of continuous sobriety.' },
    { days: 3650, title: '10 Years', description: 'A decade of sobriety represents a profound life transformation.' },
  ];
  
  // Calculate sobriety time
  useEffect(() => {
    const calculateSobrietyTime = () => {
      const sobrietyDateTime = new Date(`${sobrietyDate}T${sobrietyTime}`);
      const now = new Date();
      
      // Check if sobriety date is in the future
      if (sobrietyDateTime > now) {
        setYears(0);
        setMonths(0);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setTotalDays(0);
        setNextMilestone(milestones[0]);
        setDaysUntilNextMilestone(0);
        return;
      }
      
      // Calculate time components
      const yearsValue = differenceInYears(now, sobrietyDateTime);
      const monthsValue = differenceInMonths(now, sobrietyDateTime) % 12;
      const daysValue = differenceInDays(now, sobrietyDateTime) % 30; // Approximation
      const hoursValue = differenceInHours(now, sobrietyDateTime) % 24;
      const minutesValue = differenceInMinutes(now, sobrietyDateTime) % 60;
      const secondsValue = differenceInSeconds(now, sobrietyDateTime) % 60;
      const totalDaysValue = differenceInDays(now, sobrietyDateTime);
      
      setYears(yearsValue);
      setMonths(monthsValue);
      setDays(daysValue);
      setHours(hoursValue);
      setMinutes(minutesValue);
      setSeconds(secondsValue);
      setTotalDays(totalDaysValue);
      
      // Find next milestone
      const nextMilestoneObj = milestones.find(milestone => milestone.days > totalDaysValue);
      setNextMilestone(nextMilestoneObj || null);
      
      if (nextMilestoneObj) {
        setDaysUntilNextMilestone(nextMilestoneObj.days - totalDaysValue);
      } else {
        setDaysUntilNextMilestone(0);
      }
    };
    
    calculateSobrietyTime();
    
    // Update every second
    const interval = setInterval(calculateSobrietyTime, 1000);
    
    return () => clearInterval(interval);
  }, [sobrietyDate, sobrietyTime]);
  
  // Get passed milestones
  const getPassedMilestones = (): SobrietyMilestone[] => {
    return milestones.filter(milestone => milestone.days <= totalDays)
      .sort((a, b) => b.days - a.days)
      .slice(0, 3);
  };
  
  // Format date for display
  const formatDate = (date: Date): string => {
    return format(date, 'MMMM d, yyyy');
  };
  
  // Calculate money saved (example based on average alcohol spending)
  const calculateMoneySaved = (): number => {
    // Assuming average daily spending of $10 on substances
    return totalDays * 10;
  };
  
  // Calculate health benefits
  const getHealthBenefits = (): string[] => {
    const benefits = [];
    
    if (totalDays >= 1) benefits.push('Blood sugar levels begin to normalize');
    if (totalDays >= 3) benefits.push('Blood pressure may start to reduce');
    if (totalDays >= 7) benefits.push('Sleep quality often improves');
    if (totalDays >= 14) benefits.push('Skin appearance may improve');
    if (totalDays >= 30) benefits.push('Liver function begins to improve');
    if (totalDays >= 90) benefits.push('Brain chemistry starts to normalize');
    if (totalDays >= 180) benefits.push('Immune system strengthens');
    if (totalDays >= 365) benefits.push('Risk of heart disease begins to decrease');
    
    return benefits.slice(0, 4); // Return top 4 benefits
  };
  
  // Chart data for milestone progress
  const chartData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [
          totalDays,
          nextMilestone ? daysUntilNextMilestone : 0,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(200, 200, 200, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(200, 200, 200, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw;
            return `${label}: ${value} days`;
          }
        }
      }
    },
    cutout: '70%',
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Sobriety Calculator</h2>
          
          {/* Sobriety Date Input */}
          <div>
            <label htmlFor="sobrietyDate" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Sobriety Start Date
            </label>
            <input
              type="date"
              id="sobrietyDate"
              value={sobrietyDate}
              onChange={(e) => setSobrietyDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            />
          </div>
          
          {/* Sobriety Time Input */}
          <div>
            <label htmlFor="sobrietyTime" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Sobriety Start Time (optional)
            </label>
            <input
              type="time"
              id="sobrietyTime"
              value={sobrietyTime}
              onChange={(e) => setSobrietyTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            />
          </div>
          
          {/* Upcoming Milestone */}
          {nextMilestone && (
            <div className={buttonClasses}>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Your Next Milestone</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="w-32 h-32">
                  <Doughnut data={chartData} options={chartOptions} />
                  <div className="relative w-full h-0 top-[-65px] flex items-center justify-center">
                    <div className="text-center">
                      <div className={resultValueClasses}>{daysUntilNextMilestone}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">days left</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium text-gray-900 dark:text-white dark:text-primary-foreground">
                  {nextMilestone.title}
                </div>
                <div className={resultLabelClasses}>
                  {nextMilestone.description}
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white dark:text-blue-400 mt-2">
                  Expected on {formatDate(addDays(new Date(), daysUntilNextMilestone))}
                </div>
              </div>
            </div>
          )}
          
          {/* Motivation Quote */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <blockquote className="italic text-gray-500 dark:text-gray-400 dark:text-gray-300 text-sm">
              "Recovery is hard. Regret is harder."
            </blockquote>
            <div className="mt-2 text-right text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
              — Brittany Burgunder
            </div>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Your Sobriety Time</h2>
          
          {/* Total Sobriety Time */}
          <div className={buttonClasses}>
            <div className={resultLabelClasses}>
              You have been sober for
            </div>
            <div className={resultValueClasses}>
              {totalDays} days
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              That's {years} years, {months} months, and {days} days
            </div>
          </div>
          
          {/* Detailed Time */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className={resultLabelClasses}>
              Detailed Time
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="calculator-card p-2 rounded-md">
                <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">{years}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Years</div>
              </div>
              <div className="calculator-card p-2 rounded-md">
                <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">{months}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Months</div>
              </div>
              <div className="calculator-card p-2 rounded-md">
                <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">{days}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Days</div>
              </div>
              <div className="calculator-card p-2 rounded-md">
                <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">{hours}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Hours</div>
              </div>
              <div className="calculator-card p-2 rounded-md">
                <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">{minutes}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Minutes</div>
              </div>
              <div className="calculator-card p-2 rounded-md">
                <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">{seconds}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Seconds</div>
              </div>
            </div>
          </div>
          
          {/* Milestones Achieved */}
          {getPassedMilestones().length > 0 && (
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
              <div className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200 mb-2">
                Milestones Achieved
              </div>
              <div className="space-y-3">
                {getPassedMilestones().map((milestone, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-3 py-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                      {milestone.title} ({milestone.days} days)
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      {milestone.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Health Benefits */}
          <div className="calculator-card dark:bg-muted p-4 rounded-md border border-gray-200 dark:border-gray-700 dark:border-gray-600">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">
              Health Benefits You May Be Experiencing
            </h3>
            <ul className="space-y-2">
              {getHealthBenefits().map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className={resultLabelClasses}>{benefit}</span>
                </li>
              ))}
              {getHealthBenefits().length === 0 && (
                <li className={resultLabelClasses}>
                  Health benefits will appear as you progress in your sobriety journey.
                </li>
              )}
            </ul>
          </div>
          
          {/* Money Saved */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Potential Money Saved</h3>
            <div className={resultValueClasses}>
              ${calculateMoneySaved().toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
              Based on an estimate of $10 per day that might have been spent on substances
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobrietyCalculator; 