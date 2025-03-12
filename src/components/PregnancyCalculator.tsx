'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { format, addDays, addWeeks, differenceInDays, differenceInWeeks, isValid, parseISO } from 'date-fns';
import { decimalInputProps } from '@/utils/inputUtils';
import { inputClasses, selectClasses, buttonClasses, secondaryButtonClasses, cardClasses, labelClasses, inputPrefixClasses, inputSuffixClasses } from '@/utils/themeUtils';

interface PregnancyCalculatorProps {
  calculator?: Calculator;
}

type CalculationMethodType = 'lmp' | 'conception' | 'ultrasound' | 'ivf';

interface PregnancyMilestone {
  week: number;
  title: string;
  description: string;
}

const PregnancyCalculator: React.FC<PregnancyCalculatorProps> = ({ calculator }) => {
  // Calculation method state
  const [calculationMethod, setCalculationMethod] = useState<CalculationMethodType>('lmp');
  
  // Input state
  const [lmpDate, setLmpDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [conceptionDate, setConceptionDate] = useState<string>(format(addDays(new Date(), -14), 'yyyy-MM-dd'));
  const [ultrasoundDate, setUltrasoundDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState<string>('8');
  const [ultrasoundDays, setUltrasoundDays] = useState<string>('0');
  const [ivfDate, setIvfDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [cycleLength, setCycleLength] = useState<string>('28');
  
  // Results state
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [firstTrimesterEnd, setFirstTrimesterEnd] = useState<Date | null>(null);
  const [secondTrimesterEnd, setSecondTrimesterEnd] = useState<Date | null>(null);
  const [thirdTrimesterEnd, setThirdTrimesterEnd] = useState<Date | null>(null);
  const [conceptionDateEstimate, setConceptionDateEstimate] = useState<Date | null>(null);
  
  // Handle number input with validation
  const handleNumberInput = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    min: number = 0,
    max: number = 100
  ) => {
    // Allow empty input
    if (value === '') {
      setter('');
      return;
    }

    // Validate the input format (positive integers only)
    const regex = /^\d+$/;
    if (regex.test(value)) {
      const numValue = parseInt(value);
      if (numValue >= min && numValue <= max) {
        setter(value);
      }
    }
  };
  
  // Calculate due date and pregnancy progress
  useEffect(() => {
    let estimatedDueDate: Date | null = null;
    let estimatedConceptionDate: Date | null = null;
    
    // Calculate due date based on selected method
    switch (calculationMethod) {
      case 'lmp':
        const lmpDateObj = parseISO(lmpDate);
        if (isValid(lmpDateObj)) {
          const cycleLengthNum = parseInt(cycleLength) || 28;
          const ovulationDay = Math.floor(cycleLengthNum / 2) - 1;
          estimatedConceptionDate = addDays(lmpDateObj, ovulationDay);
          estimatedDueDate = addDays(lmpDateObj, 280); // 40 weeks from LMP
        }
        break;
        
      case 'conception':
        const conceptionDateObj = parseISO(conceptionDate);
        if (isValid(conceptionDateObj)) {
          estimatedConceptionDate = conceptionDateObj;
          estimatedDueDate = addDays(conceptionDateObj, 266); // 38 weeks from conception
        }
        break;
        
      case 'ultrasound':
        const ultrasoundDateObj = parseISO(ultrasoundDate);
        if (isValid(ultrasoundDateObj)) {
          const weeksAtUltrasound = parseInt(ultrasoundWeeks) || 0;
          const daysAtUltrasound = parseInt(ultrasoundDays) || 0;
          const totalDaysAtUltrasound = weeksAtUltrasound * 7 + daysAtUltrasound;
          
          // Calculate LMP based on ultrasound date and gestational age
          const calculatedLMP = addDays(ultrasoundDateObj, -totalDaysAtUltrasound);
          estimatedConceptionDate = addDays(calculatedLMP, 14); // Assuming ovulation on day 14
          estimatedDueDate = addDays(calculatedLMP, 280); // 40 weeks from calculated LMP
        }
        break;
        
      case 'ivf':
        const ivfDateObj = parseISO(ivfDate);
        if (isValid(ivfDateObj)) {
          estimatedConceptionDate = ivfDateObj;
          estimatedDueDate = addDays(ivfDateObj, 266); // 38 weeks from embryo transfer
        }
        break;
    }
    
    // Set due date and conception date
    setDueDate(estimatedDueDate);
    setConceptionDateEstimate(estimatedConceptionDate);
    
    // Calculate current pregnancy progress
    if (estimatedDueDate && estimatedConceptionDate) {
      const today = new Date();
      
      // Calculate days since conception
      const daysSinceConception = differenceInDays(today, estimatedConceptionDate);
      
      if (daysSinceConception >= 0) {
        // Calculate weeks and days
        const weeksPregnant = Math.floor(daysSinceConception / 7);
        const daysPregnant = daysSinceConception % 7;
        
        setCurrentWeek(weeksPregnant + 2); // Add 2 weeks to account for LMP dating
        setCurrentDay(daysPregnant);
        
        // Calculate trimester dates
        const pregnancyStart = addDays(estimatedDueDate, -280); // Equivalent to LMP
        setFirstTrimesterEnd(addWeeks(pregnancyStart, 13));
        setSecondTrimesterEnd(addWeeks(pregnancyStart, 26));
        setThirdTrimesterEnd(estimatedDueDate);
      } else {
        // Not pregnant yet (conception date is in the future)
        setCurrentWeek(0);
        setCurrentDay(0);
        setFirstTrimesterEnd(null);
        setSecondTrimesterEnd(null);
        setThirdTrimesterEnd(null);
      }
    }
  }, [calculationMethod, lmpDate, conceptionDate, ultrasoundDate, ultrasoundWeeks, ultrasoundDays, ivfDate, cycleLength]);
  
  // Pregnancy milestones
  const milestones: PregnancyMilestone[] = [
    { week: 4, title: 'Implantation Complete', description: 'The embryo has implanted in the uterine wall.' },
    { week: 8, title: 'All Essential Organs Formed', description: 'Basic organ systems have begun to develop.' },
    { week: 12, title: 'End of First Trimester', description: 'Risk of miscarriage decreases significantly.' },
    { week: 16, title: 'Gender May Be Visible', description: 'An ultrasound may reveal the baby\'s gender.' },
    { week: 20, title: 'Halfway Point', description: 'You\'re halfway through your pregnancy.' },
    { week: 24, title: 'Viability Milestone', description: 'Baby has a chance of survival if born prematurely.' },
    { week: 28, title: 'Third Trimester Begins', description: 'Baby\'s brain and nervous system are developing rapidly.' },
    { week: 37, title: 'Full Term', description: 'Baby is considered full term and ready for birth.' },
    { week: 40, title: 'Due Date', description: 'Your estimated due date has arrived.' },
  ];
  
  // Get current trimester
  const getCurrentTrimester = (): number => {
    if (currentWeek < 14) return 1;
    if (currentWeek < 28) return 2;
    return 3;
  };
  
  // Format date for display
  const formatDate = (date: Date | null): string => {
    if (!date) return 'N/A';
    return format(date, 'MMMM d, yyyy');
  };
  
  // Get upcoming milestones
  const getUpcomingMilestones = (): PregnancyMilestone[] => {
    return milestones.filter(milestone => milestone.week > currentWeek)
      .sort((a, b) => a.week - b.week)
      .slice(0, 3);
  };
  
  // Get passed milestones
  const getPassedMilestones = (): PregnancyMilestone[] => {
    return milestones.filter(milestone => milestone.week <= currentWeek)
      .sort((a, b) => b.week - a.week)
      .slice(0, 3);
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Pregnancy Due Date Calculator</h2>
          
          {/* Calculation Method Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Calculation Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCalculationMethod('lmp')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  calculationMethod === 'lmp'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Last Period
              </button>
              <button
                onClick={() => setCalculationMethod('conception')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  calculationMethod === 'conception'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Conception Date
              </button>
              <button
                onClick={() => setCalculationMethod('ultrasound')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  calculationMethod === 'ultrasound'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                Ultrasound
              </button>
              <button
                onClick={() => setCalculationMethod('ivf')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  calculationMethod === 'ivf'
                    ? 'bg-blue-500 text-gray-900 dark:text-white-foreground'
                    : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-muted/80'
                }`}
              >
                IVF Transfer
              </button>
            </div>
          </div>
          
          {/* Last Menstrual Period Input */}
          {calculationMethod === 'lmp' && (
            <>
              <div>
                <label htmlFor="lmpDate" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  First Day of Last Menstrual Period
                </label>
                <input
                  type="date"
                  id="lmpDate"
                  value={lmpDate}
                  onChange={(e) => setLmpDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                />
              </div>
              <div>
                <label htmlFor="cycleLength" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  Average Menstrual Cycle Length (days)
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="tel"
                    id="cycleLength"
                    value={cycleLength}
                    onChange={(e) => handleNumberInput(e.target.value, setCycleLength, 20, 45)} {...decimalInputProps}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                    placeholder="Enter cycle length"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">days</span>
                  </div>
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  Average cycle is 28 days. Range: 20-45 days.
                </div>
              </div>
            </>
          )}
          
          {/* Conception Date Input */}
          {calculationMethod === 'conception' && (
            <div>
              <label htmlFor="conceptionDate" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Conception Date
              </label>
              <input
                type="date"
                id="conceptionDate"
                value={conceptionDate}
                onChange={(e) => setConceptionDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
              />
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                This is the date of ovulation or when you believe conception occurred.
              </div>
            </div>
          )}
          
          {/* Ultrasound Input */}
          {calculationMethod === 'ultrasound' && (
            <>
              <div>
                <label htmlFor="ultrasoundDate" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                  Ultrasound Date
                </label>
                <input
                  type="date"
                  id="ultrasoundDate"
                  value={ultrasoundDate}
                  onChange={(e) => setUltrasoundDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="ultrasoundWeeks" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                    Gestational Age (Weeks)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="tel"
                      id="ultrasoundWeeks"
                      value={ultrasoundWeeks}
                      onChange={(e) => handleNumberInput(e.target.value, setUltrasoundWeeks, 0, 42)} {...decimalInputProps}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                      placeholder="Weeks"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">weeks</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="ultrasoundDays" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                    Gestational Age (Days)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="tel"
                      id="ultrasoundDays"
                      value={ultrasoundDays}
                      onChange={(e) => handleNumberInput(e.target.value, setUltrasoundDays, 0, 6)} {...decimalInputProps}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
                      placeholder="Days"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 sm:text-sm">days</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* IVF Transfer Date Input */}
          {calculationMethod === 'ivf' && (
            <div>
              <label htmlFor="ivfDate" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                IVF Embryo Transfer Date
              </label>
              <input
                type="date"
                id="ivfDate"
                value={ivfDate}
                onChange={(e) => setIvfDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
              />
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                This is the date when the embryo was transferred during IVF.
              </div>
            </div>
          )}
          
          {/* Calculation Method Explanation */}
          <div className={buttonClasses}>
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">About This Calculation Method</h3>
            {calculationMethod === 'lmp' && (
              <p className={resultLabelClasses}>
                This method uses the first day of your last menstrual period (LMP) to calculate your due date. It adds 280 days (40 weeks) to your LMP date, assuming a 28-day cycle with ovulation on day 14. If your cycle is longer or shorter, the calculator adjusts accordingly.
              </p>
            )}
            {calculationMethod === 'conception' && (
              <p className={resultLabelClasses}>
                This method uses your known or estimated conception date (ovulation date when fertilization occurred) to calculate your due date. It adds 266 days (38 weeks) to your conception date.
              </p>
            )}
            {calculationMethod === 'ultrasound' && (
              <p className={resultLabelClasses}>
                This method uses the gestational age determined by an ultrasound to calculate your due date. Early ultrasounds (before 20 weeks) are generally more accurate for dating a pregnancy than later ones.
              </p>
            )}
            {calculationMethod === 'ivf' && (
              <p className={resultLabelClasses}>
                This method uses the date of embryo transfer during IVF to calculate your due date. It adds 266 days (38 weeks) to your transfer date for a 3-day embryo, or 264 days for a 5-day blastocyst.
              </p>
            )}
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Results</h2>
          
          {/* Due Date Result */}
          <div className={buttonClasses}>
            <div className={resultLabelClasses}>
              Estimated Due Date
            </div>
            <div className={resultValueClasses}>
              {formatDate(dueDate)}
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
              Only about 5% of babies are born exactly on their due date
            </div>
          </div>
          
          {/* Current Progress */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className={resultLabelClasses}>
              Current Pregnancy Progress
            </div>
            <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
              {currentWeek > 0 ? `${currentWeek} weeks and ${currentDay} days` : 'Not pregnant yet'}
            </div>
            {currentWeek > 0 && (
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                You are in your {getCurrentTrimester()}{getCurrentTrimester() === 1 ? 'st' : getCurrentTrimester() === 2 ? 'nd' : 'rd'} trimester
              </div>
            )}
          </div>
          
          {/* Conception Date */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className={resultLabelClasses}>
              {calculationMethod === 'conception' || calculationMethod === 'ivf' 
                ? 'Selected Conception Date' 
                : 'Estimated Conception Date'}
            </div>
            <div className="text-xl font-medium text-gray-900 dark:text-white dark:text-gray-200">
              {formatDate(conceptionDateEstimate)}
            </div>
          </div>
          
          {/* Trimester Dates */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200 mb-2">
              Trimester Dates
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={resultLabelClasses}>First Trimester (Weeks 1-13)</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  Ends: {formatDate(firstTrimesterEnd)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={resultLabelClasses}>Second Trimester (Weeks 14-27)</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  Ends: {formatDate(secondTrimesterEnd)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={resultLabelClasses}>Third Trimester (Weeks 28-40+)</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                  Ends: {formatDate(thirdTrimesterEnd)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Upcoming Milestones */}
          {currentWeek > 0 && currentWeek < 40 && (
            <div className="calculator-card dark:bg-muted p-4 rounded-md border border-gray-200 dark:border-gray-700 dark:border-gray-600">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">
                Upcoming Milestones
              </h3>
              <div className="space-y-3">
                {getUpcomingMilestones().map((milestone, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-3 py-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                      Week {milestone.week}: {milestone.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      {milestone.description}
                    </div>
                  </div>
                ))}
                {getUpcomingMilestones().length === 0 && (
                  <div className={resultLabelClasses}>
                    No more milestones! Your baby is due any day now.
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Passed Milestones */}
          {currentWeek > 4 && (
            <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Recent Milestones Passed</h3>
              <div className="space-y-3">
                {getPassedMilestones().map((milestone, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-3 py-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-200">
                      Week {milestone.week}: {milestone.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      {milestone.description}
                    </div>
                  </div>
                ))}
                {getPassedMilestones().length === 0 && (
                  <div className={resultLabelClasses}>
                    No milestones passed yet.
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Important Note */}
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Important Note</h3>
            <p className={resultLabelClasses}>
              This calculator provides estimates only. Due dates can vary based on many factors. Only about 5% of babies are born on their exact due date, with most births occurring within two weeks before or after. Always consult with your healthcare provider for the most accurate information about your pregnancy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyCalculator; 