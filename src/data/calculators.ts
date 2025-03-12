export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: string;
  formula?: string;
  inputs: {
    id: string;
    name: string;
    type: 'number' | 'text' | 'select';
    placeholder?: string;
    options?: { value: string; label: string }[];
    unit?: string;
    defaultValue?: string | number;
    allowDecimals?: boolean;
  }[];
  icon?: string;
  url?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

// Categories for calculators
export const categories: Category[] = [
  {
    id: 'finance',
    name: 'Finance',
    description: 'Financial calculators for budgeting, investments, and more'
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    description: 'Calculators for health metrics, fitness goals, and nutrition'
  },
  {
    id: 'math',
    name: 'Mathematics',
    description: 'General mathematical calculators and converters'
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Scientific calculators for physics, chemistry, and more'
  },
  {
    id: 'utility',
    name: 'Utility',
    description: 'Everyday utility calculators for various purposes'
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    description: 'Calculators for home improvement, gardening, and DIY projects'
  },
  {
    id: 'cooking',
    name: 'Cooking',
    description: 'Recipe conversion, measurement, and cooking time calculators'
  },
  {
    id: 'health-fitness',
    name: 'Health & Fitness',
    description: 'Calculators for health metrics, fitness goals, and nutrition'
  },
  {
    id: 'food-cooking',
    name: 'Food & Cooking',
    description: 'Calculators for baking, cooking, and ingredient conversions'
  }
];

// Sample calculators - in a real app, this would be a much larger list
export const calculators: Calculator[] = [
  {
    id: 'cash-back-calculator',
    name: 'Cash Back Calculator',
    description: 'Calculate how much you can earn from cash back credit cards based on your spending habits',
    category: 'finance',
    formula: 'Cash Back = (Spending Amount × Cash Back Rate) / 100',
    inputs: [
      {
        id: 'monthlySpending',
        name: 'Monthly Spending',
        type: 'number',
        placeholder: 'Enter monthly spending',
        unit: '$',
        defaultValue: 2000,
        allowDecimals: true
      },
      {
        id: 'cashbackRate',
        name: 'Cash Back Rate',
        type: 'number',
        placeholder: 'Enter cash back percentage',
        unit: '%',
        defaultValue: 2,
        allowDecimals: true
      },
      {
        id: 'annualFee',
        name: 'Annual Fee',
        type: 'number',
        placeholder: 'Enter annual fee',
        unit: '$',
        defaultValue: 0,
        allowDecimals: true
      },
      {
        id: 'useCategories',
        name: 'Use Categories',
        type: 'select',
        options: [
          { value: 'false', label: 'No (Flat Rate)' },
          { value: 'true', label: 'Yes (Category Rates)' }
        ],
        defaultValue: 'false'
      }
    ]
  },
  {
    id: 'cagr-calculator',
    name: 'CAGR Calculator',
    description: 'Calculate the Compound Annual Growth Rate (CAGR) of your investments and see projected growth over time',
    category: 'finance',
    formula: 'CAGR = (Final Value / Initial Value)^(1/years) - 1',
    inputs: [
      {
        id: 'initialValue',
        name: 'Initial Value',
        type: 'number',
        placeholder: 'Enter initial value',
        unit: '$',
        defaultValue: 10000,
        allowDecimals: true
      },
      {
        id: 'finalValue',
        name: 'Final Value',
        type: 'number',
        placeholder: 'Enter final value',
        unit: '$',
        defaultValue: 25000,
        allowDecimals: true
      },
      {
        id: 'years',
        name: 'Time Period',
        type: 'number',
        placeholder: 'Enter number of years',
        unit: 'years',
        defaultValue: 5,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'boat-loan-calculator',
    name: 'Boat Loan Calculator',
    description: 'Calculate monthly payments, total interest, and create an amortization schedule for boat loans',
    category: 'finance',
    formula: 'PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)',
    inputs: [
      {
        id: 'loanAmount',
        name: 'Loan Amount',
        type: 'number',
        placeholder: 'Enter loan amount',
        unit: '$',
        defaultValue: 25000,
        allowDecimals: true
      },
      {
        id: 'interestRate',
        name: 'Annual Interest Rate',
        type: 'number',
        placeholder: 'Enter interest rate',
        unit: '%',
        defaultValue: 6.5,
        allowDecimals: true
      },
      {
        id: 'loanTermYears',
        name: 'Loan Term (Years)',
        type: 'number',
        placeholder: 'Enter years',
        defaultValue: 5,
        allowDecimals: true
      },
      {
        id: 'loanTermMonths',
        name: 'Loan Term (Months)',
        type: 'number',
        placeholder: 'Enter months',
        defaultValue: 0,
        allowDecimals: true
      },
      {
        id: 'additionalPayment',
        name: 'Additional Payment',
        type: 'number',
        placeholder: 'Enter additional payment',
        unit: '$',
        defaultValue: 0,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'car-loan-calculator',
    name: 'Car Loan Calculator',
    description: 'Calculate monthly payments, total interest, and create an amortization schedule for car loans',
    category: 'finance',
    formula: 'PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)',
    inputs: [
      {
        id: 'loanAmount',
        name: 'Loan Amount',
        type: 'number',
        placeholder: 'Enter loan amount',
        unit: '$',
        defaultValue: 25000,
        allowDecimals: true
      },
      {
        id: 'interestRate',
        name: 'Annual Interest Rate',
        type: 'number',
        placeholder: 'Enter interest rate',
        unit: '%',
        defaultValue: 4.5,
        allowDecimals: true
      },
      {
        id: 'loanTermYears',
        name: 'Loan Term (Years)',
        type: 'number',
        placeholder: 'Enter years',
        defaultValue: 5,
        allowDecimals: true
      },
      {
        id: 'loanTermMonths',
        name: 'Loan Term (Months)',
        type: 'number',
        placeholder: 'Enter months',
        defaultValue: 0,
        allowDecimals: true
      },
      {
        id: 'additionalPayment',
        name: 'Additional Payment',
        type: 'number',
        placeholder: 'Enter additional payment',
        unit: '$',
        defaultValue: 0,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'amortization-calculator',
    name: 'Amortization Calculator',
    description: 'Create an amortization schedule for your loans and see how extra payments can save you money',
    category: 'finance',
    formula: 'PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)',
    inputs: [
      {
        id: 'loanAmount',
        name: 'Loan Amount',
        type: 'number',
        placeholder: 'Enter loan amount',
        unit: '$',
        defaultValue: 250000,
        allowDecimals: true
      },
      {
        id: 'interestRate',
        name: 'Annual Interest Rate',
        type: 'number',
        placeholder: 'Enter interest rate',
        unit: '%',
        defaultValue: 4.5,
        allowDecimals: true
      },
      {
        id: 'loanTerm',
        name: 'Loan Term',
        type: 'number',
        placeholder: 'Enter loan term',
        unit: 'years',
        defaultValue: 30,
        allowDecimals: true
      },
      {
        id: 'extraPayment',
        name: 'Extra Payment (Optional)',
        type: 'number',
        placeholder: 'Enter extra payment amount',
        unit: '$',
        defaultValue: 0,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'feet-to-meters',
    name: 'Feet to Meters Calculator',
    description: 'Convert feet to meters with precision and ease',
    category: 'utility',
    formula: '1 foot = 0.3048 meters',
    inputs: [
      {
        id: 'feet',
        name: 'Feet',
        type: 'number',
        placeholder: 'Enter length in feet',
        unit: 'ft',
        defaultValue: 10,
        allowDecimals: true
      },
      {
        id: 'inches',
        name: 'Inches',
        type: 'number',
        placeholder: 'Enter additional inches',
        unit: 'in',
        defaultValue: 0,
        allowDecimals: true
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '0', label: '0 decimal places' },
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' }
        ],
        defaultValue: '2'
      }
    ]
  },
  {
    id: 'feet-to-inches',
    name: 'Feet to Inches Calculator',
    description: 'Convert feet to inches with precision and ease',
    category: 'utility',
    formula: '1 foot = 12 inches',
    inputs: [
      {
        id: 'feet',
        name: 'Feet',
        type: 'number',
        placeholder: 'Enter length in feet',
        unit: 'ft',
        defaultValue: 5,
        allowDecimals: true
      },
      {
        id: 'additionalInches',
        name: 'Additional Inches',
        type: 'number',
        placeholder: 'Enter additional inches',
        unit: 'in',
        defaultValue: 0,
        allowDecimals: true
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '0', label: '0 decimal places' },
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' }
        ],
        defaultValue: '0'
      }
    ]
  },
  {
    id: 'centimeters-to-feet',
    name: 'Centimeters to Feet Calculator',
    description: 'Convert between centimeters and feet/inches with precision and ease',
    category: 'utility',
    formula: '1 foot = 30.48 centimeters, 1 inch = 2.54 centimeters',
    inputs: [
      {
        id: 'centimeters',
        name: 'Centimeters',
        type: 'number',
        placeholder: 'Enter length in centimeters',
        unit: 'cm',
        defaultValue: 180,
        allowDecimals: true
      },
      {
        id: 'conversionDirection',
        name: 'Conversion Direction',
        type: 'select',
        options: [
          { value: 'cmToFeet', label: 'Centimeters to Feet/Inches' },
          { value: 'feetToCm', label: 'Feet/Inches to Centimeters' }
        ],
        defaultValue: 'cmToFeet'
      },
      {
        id: 'feet',
        name: 'Feet',
        type: 'number',
        placeholder: 'Enter feet',
        unit: 'ft',
        defaultValue: 5,
        allowDecimals: true
      },
      {
        id: 'inches',
        name: 'Inches',
        type: 'number',
        placeholder: 'Enter inches',
        unit: 'in',
        defaultValue: 11,
        allowDecimals: true
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '0', label: '0 decimal places' },
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' }
        ],
        defaultValue: '2'
      }
    ]
  },
  {
    id: 'centimeters-to-inches',
    name: 'Centimeters to Inches Calculator',
    description: 'Convert centimeters to inches with precision and ease',
    category: 'utility',
    formula: '1 inch = 2.54 centimeters',
    inputs: [
      {
        id: 'centimeters',
        name: 'Centimeters',
        type: 'number',
        placeholder: 'Enter length in centimeters',
        unit: 'cm',
        defaultValue: 180,
        allowDecimals: true
      },
      {
        id: 'conversionDirection',
        name: 'Conversion Direction',
        type: 'select',
        options: [
          { value: 'cmToFeet', label: 'Centimeters to Feet/Inches' },
          { value: 'feetToCm', label: 'Feet/Inches to Centimeters' }
        ],
        defaultValue: 'cmToFeet'
      },
      {
        id: 'feet',
        name: 'Feet',
        type: 'number',
        placeholder: 'Enter feet',
        unit: 'ft',
        defaultValue: 5,
        allowDecimals: true
      },
      {
        id: 'inches',
        name: 'Inches',
        type: 'number',
        placeholder: 'Enter inches',
        unit: 'in',
        defaultValue: 11,
        allowDecimals: true
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '0', label: '0 decimal places' },
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' }
        ],
        defaultValue: '2'
      }
    ]
  },
  {
    id: 'inches-to-feet',
    name: 'Inches to Feet Calculator',
    description: 'Convert inches to feet with precision and ease',
    category: 'utility',
    formula: '1 foot = 12 inches',
    inputs: [
      {
        id: 'inches',
        name: 'Inches',
        type: 'number',
        placeholder: 'Enter length in inches',
        unit: 'in',
        defaultValue: 36,
        allowDecimals: true
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '0', label: '0 decimal places' },
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' }
        ],
        defaultValue: '2'
      },
      {
        id: 'displayFormat',
        name: 'Display Format',
        type: 'select',
        options: [
          { value: 'decimal', label: 'Decimal (e.g., 3.5 ft)' },
          { value: 'fractional', label: 'Feet and Inches (e.g., 3 ft 6 in)' }
        ],
        defaultValue: 'fractional'
      }
    ]
  },
  {
    id: 'inches-to-centimeters',
    name: 'Inches to Centimeters Calculator',
    description: 'Convert inches to centimeters with precision and ease',
    category: 'utility',
    formula: '1 inch = 2.54 centimeters',
    inputs: [
      {
        id: 'inches',
        name: 'Inches',
        type: 'number',
        placeholder: 'Enter length in inches',
        unit: 'in',
        defaultValue: 10,
        allowDecimals: true
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '0', label: '0 decimal places' },
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' }
        ],
        defaultValue: '2'
      }
    ]
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index based on height and weight',
    category: 'health',
    url: '/health/bmi-calculator',
    inputs: [
      {
        id: 'weight',
        name: 'Weight',
        type: 'number',
        placeholder: 'Enter your weight',
        unit: 'kg',
        defaultValue: 70,
        allowDecimals: true
      },
      {
        id: 'height',
        name: 'Height',
        type: 'number',
        placeholder: 'Enter your height',
        unit: 'cm',
        defaultValue: 175,
        allowDecimals: true
      },
      {
        id: 'gender',
        name: 'Gender',
        type: 'select',
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' }
        ],
        defaultValue: 'male'
      }
    ]
  },
  {
    id: 'compound-interest-(daily)',
    name: 'Compound Interest (Daily)',
    description: 'Calculate compound interest with daily compounding for maximum growth',
    category: 'finance',
    formula: 'P(1 + r/365)^(365t)',
    inputs: [
      {
        id: 'principal',
        name: 'Principal Amount',
        type: 'number',
        placeholder: 'Enter initial investment',
        unit: '$',
        defaultValue: 1000,
        allowDecimals: true
      },
      {
        id: 'rate',
        name: 'Annual Interest Rate',
        type: 'number',
        placeholder: 'Enter interest rate',
        unit: '%',
        defaultValue: 5,
        allowDecimals: true
      },
      {
        id: 'time',
        name: 'Time Period',
        type: 'number',
        placeholder: 'Enter time period',
        unit: 'years',
        defaultValue: 5,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'compound-interest-daily',
    name: 'Compound Interest Calculator (Daily)',
    description: 'Calculate compound interest with daily compounding for maximum growth',
    category: 'finance',
    formula: 'P(1 + r/365)^(365t)',
    inputs: [
      {
        id: 'principal',
        name: 'Principal Amount',
        type: 'number',
        placeholder: 'Enter initial investment',
        unit: '$',
        defaultValue: 1000,
        allowDecimals: true
      },
      {
        id: 'rate',
        name: 'Annual Interest Rate',
        type: 'number',
        placeholder: 'Enter interest rate',
        unit: '%',
        defaultValue: 5,
        allowDecimals: true
      },
      {
        id: 'time',
        name: 'Time Period',
        type: 'number',
        placeholder: 'Enter time period',
        unit: 'years',
        defaultValue: 5,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest on investments over time',
    category: 'finance',
    formula: 'P(1 + r/n)^(nt)',
    inputs: [
      {
        id: 'principal',
        name: 'Principal Amount',
        type: 'number',
        placeholder: 'Enter initial investment',
        unit: '$',
        defaultValue: 1000,
        allowDecimals: true
      },
      {
        id: 'rate',
        name: 'Annual Interest Rate',
        type: 'number',
        placeholder: 'Enter interest rate',
        unit: '%',
        defaultValue: 5,
        allowDecimals: true
      },
      {
        id: 'time',
        name: 'Time Period',
        type: 'number',
        placeholder: 'Enter time period',
        unit: 'years',
        defaultValue: 5,
        allowDecimals: true
      },
      {
        id: 'compound',
        name: 'Compound Frequency',
        type: 'select',
        options: [
          { value: '1', label: 'Annually' },
          { value: '2', label: 'Semi-Annually' },
          { value: '4', label: 'Quarterly' },
          { value: '12', label: 'Monthly' },
          { value: '365', label: 'Daily' }
        ],
        defaultValue: '12'
      }
    ]
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, increases, and decreases',
    category: 'math',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 100,
        allowDecimals: true
      },
      {
        id: 'percentage',
        name: 'Percentage',
        type: 'number',
        placeholder: 'Enter percentage',
        unit: '%',
        defaultValue: 25,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Calculate tip amount and total bill',
    category: 'finance',
    inputs: [
      {
        id: 'billAmount',
        name: 'Bill Amount',
        type: 'number',
        placeholder: 'Enter bill amount',
        unit: '$',
        defaultValue: 50,
        allowDecimals: true
      },
      {
        id: 'tipPercentage',
        name: 'Tip Percentage',
        type: 'number',
        placeholder: 'Enter tip percentage',
        unit: '%',
        defaultValue: 15,
        allowDecimals: true
      },
      {
        id: 'people',
        name: 'Number of People',
        type: 'number',
        placeholder: 'Enter number of people',
        defaultValue: 1,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'margin-calculator',
    name: 'Margin Calculator',
    description: 'Calculate gross margin, sales margin, and net profit margin for your business',
    category: 'finance',
    formula: 'Gross Margin = (Revenue - COGS) / Revenue × 100%\nSales Margin = (Revenue - COGS - Operating Expenses) / Revenue × 100%\nNet Profit Margin = Net Profit / Revenue × 100%',
    inputs: [
      {
        id: 'marginType',
        name: 'Margin Type',
        type: 'select',
        options: [
          { value: 'gross', label: 'Gross Margin' },
          { value: 'sales', label: 'Sales Margin' },
          { value: 'net', label: 'Net Profit Margin' }
        ],
        defaultValue: 'gross'
      },
      {
        id: 'currency',
        name: 'Currency',
        type: 'select',
        options: [
          { value: '$', label: 'USD ($)' },
          { value: '€', label: 'EUR (€)' },
          { value: '£', label: 'GBP (£)' },
          { value: '¥', label: 'JPY (¥)' },
          { value: 'C$', label: 'CAD (C$)' },
          { value: 'A$', label: 'AUD (A$)' }
        ],
        defaultValue: '$'
      },
      {
        id: 'revenue',
        name: 'Revenue',
        type: 'number',
        placeholder: 'Enter total revenue',
        defaultValue: 100000,
        allowDecimals: true
      },
      {
        id: 'cogs',
        name: 'Cost of Goods Sold (COGS)',
        type: 'number',
        placeholder: 'Enter cost of goods sold',
        defaultValue: 60000,
        allowDecimals: true
      },
      {
        id: 'operatingExpenses',
        name: 'Operating Expenses',
        type: 'number',
        placeholder: 'Enter operating expenses',
        defaultValue: 20000,
        allowDecimals: true
      },
      {
        id: 'otherExpenses',
        name: 'Other Expenses (taxes, interest, etc.)',
        type: 'number',
        placeholder: 'Enter other expenses',
        defaultValue: 5000,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'million-to-billion-converter',
    name: 'Million to Billion Converter',
    description: 'Convert between millions, billions, and trillions to understand large numbers in perspective',
    category: 'finance',
    formula: '1 Billion = 1,000 Million\n1 Trillion = 1,000 Billion = 1,000,000 Million',
    inputs: [
      {
        id: 'conversionType',
        name: 'Conversion Type',
        type: 'select',
        options: [
          { value: 'millionToBillion', label: 'Million to Billion' },
          { value: 'billionToMillion', label: 'Billion to Million' },
          { value: 'millionToTrillion', label: 'Million to Trillion' },
          { value: 'trillionToMillion', label: 'Trillion to Million' },
          { value: 'billionToTrillion', label: 'Billion to Trillion' },
          { value: 'trillionToBillion', label: 'Trillion to Billion' }
        ],
        defaultValue: 'millionToBillion'
      },
      {
        id: 'currency',
        name: 'Currency',
        type: 'select',
        options: [
          { value: '$', label: 'USD ($)' },
          { value: '€', label: 'EUR (€)' },
          { value: '£', label: 'GBP (£)' },
          { value: '¥', label: 'JPY (¥)' },
          { value: 'C$', label: 'CAD (C$)' },
          { value: 'A$', label: 'AUD (A$)' }
        ],
        defaultValue: '$'
      },
      {
        id: 'amount',
        name: 'Amount',
        type: 'number',
        placeholder: 'Enter amount to convert',
        defaultValue: 1,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'mma-calculator',
    name: 'Money Market Account Calculator',
    description: 'Calculate interest earnings and growth for your money market account based on initial deposit, interest rate, and time period',
    category: 'finance',
    formula: 'Future Value = Principal × (1 + Rate/100)^Time',
    inputs: [
      {
        id: 'initialDeposit',
        name: 'Initial Deposit',
        type: 'number',
        placeholder: 'Enter initial deposit amount',
        unit: '$',
        defaultValue: 10000,
        allowDecimals: true
      },
      {
        id: 'interestRate',
        name: 'Annual Interest Rate (APY)',
        type: 'number',
        placeholder: 'Enter annual interest rate',
        unit: '%',
        defaultValue: 3.5,
        allowDecimals: true
      },
      {
        id: 'timePeriod',
        name: 'Time Period',
        type: 'number',
        placeholder: 'Enter time period',
        unit: 'years',
        defaultValue: 5,
        allowDecimals: true
      },
      {
        id: 'additionalDeposits',
        name: 'Monthly Additional Deposits',
        type: 'number',
        placeholder: 'Enter monthly additional deposits',
        unit: '$',
        defaultValue: 0,
        allowDecimals: true
      },
      {
        id: 'compoundFrequency',
        name: 'Compound Frequency',
        type: 'select',
        options: [
          { value: '1', label: 'Annually' },
          { value: '2', label: 'Semi-Annually' },
          { value: '4', label: 'Quarterly' },
          { value: '12', label: 'Monthly' },
          { value: '365', label: 'Daily' }
        ],
        defaultValue: '12'
      }
    ]
  },
  {
    id: 'apy-calculator',
    name: 'APY Calculator',
    description: 'Calculate the Annual Percentage Yield (APY) of your investments based on interest rate and compounding frequency',
    category: 'finance',
    formula: 'APY = (1 + r/n)^n - 1',
    inputs: [
      {
        id: 'interestRate',
        name: 'Annual Interest Rate (APR)',
        type: 'number',
        placeholder: 'Enter annual interest rate',
        unit: '%',
        defaultValue: 5,
        allowDecimals: true
      },
      {
        id: 'compoundFrequency',
        name: 'Compound Frequency',
        type: 'select',
        options: [
          { value: '1', label: 'Annually' },
          { value: '2', label: 'Semi-Annually' },
          { value: '4', label: 'Quarterly' },
          { value: '12', label: 'Monthly' },
          { value: '26', label: 'Bi-Weekly' },
          { value: '52', label: 'Weekly' },
          { value: '365', label: 'Daily' },
          { value: 'continuous', label: 'Continuous' }
        ],
        defaultValue: '12'
      },
      {
        id: 'principal',
        name: 'Principal Amount (Optional)',
        type: 'number',
        placeholder: 'Enter principal amount',
        unit: '$',
        defaultValue: 10000,
        allowDecimals: true
      },
      {
        id: 'timePeriod',
        name: 'Time Period (Optional)',
        type: 'number',
        placeholder: 'Enter time period',
        unit: 'years',
        defaultValue: 1,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate monthly payments, total interest, and create an amortization schedule for any type of loan',
    category: 'finance',
    formula: 'PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)',
    inputs: [
      {
        id: 'loanAmount',
        name: 'Loan Amount',
        type: 'number',
        placeholder: 'Enter loan amount',
        unit: '$',
        defaultValue: 25000,
        allowDecimals: true
      },
      {
        id: 'interestRate',
        name: 'Annual Interest Rate',
        type: 'number',
        placeholder: 'Enter interest rate',
        unit: '%',
        defaultValue: 4.5,
        allowDecimals: true
      },
      {
        id: 'loanTermYears',
        name: 'Loan Term (Years)',
        type: 'number',
        placeholder: 'Enter years',
        defaultValue: 5,
        allowDecimals: true
      },
      {
        id: 'loanTermMonths',
        name: 'Loan Term (Months)',
        type: 'number',
        placeholder: 'Enter months',
        defaultValue: 0,
        allowDecimals: true
      },
      {
        id: 'additionalPayment',
        name: 'Additional Payment',
        type: 'number',
        placeholder: 'Enter additional payment',
        unit: '$',
        defaultValue: 0,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'money-counter',
    name: 'Money Counter',
    description: 'Count your cash by entering the quantity of each denomination of notes and coins for different currencies',
    category: 'finance',
    formula: 'Total = Sum of (Denomination × Quantity) for all notes and coins',
    inputs: [
      {
        id: 'currency',
        name: 'Currency',
        type: 'select',
        options: [
          { value: 'usd', label: 'US Dollar ($)' },
          { value: 'eur', label: 'Euro (€)' },
          { value: 'gbp', label: 'British Pound (£)' },
          { value: 'inr', label: 'Indian Rupee (₹)' }
        ],
        defaultValue: 'usd'
      }
    ]
  },
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Calculate your monthly mortgage payment, total interest, and amortization schedule',
    category: 'finance',
    formula: 'Monthly Payment = P × [r(1 + r)^n] / [(1 + r)^n - 1]\nWhere:\nP = Principal loan amount\nr = Monthly interest rate (annual rate / 12)\nn = Loan term in months',
    inputs: [
      {
        id: 'homePrice',
        name: 'Home Price',
        type: 'number',
        placeholder: 'Enter home price',
        defaultValue: 300000,
        unit: '$'
      },
      {
        id: 'downPayment',
        name: 'Down Payment',
        type: 'number',
        placeholder: 'Enter down payment',
        defaultValue: 60000,
        unit: '$'
      },
      {
        id: 'downPaymentPercent',
        name: 'Down Payment Percentage',
        type: 'number',
        placeholder: 'Enter percentage',
        defaultValue: 20,
        unit: '%'
      },
      {
        id: 'loanTerm',
        name: 'Loan Term',
        type: 'select',
        defaultValue: '30',
        options: [
          { value: '10', label: '10 years' },
          { value: '15', label: '15 years' },
          { value: '20', label: '20 years' },
          { value: '25', label: '25 years' },
          { value: '30', label: '30 years' }
        ]
      },
      {
        id: 'interestRate',
        name: 'Interest Rate',
        type: 'number',
        placeholder: 'Enter interest rate',
        defaultValue: 4.5,
        unit: '%'
      },
      {
        id: 'propertyTax',
        name: 'Annual Property Tax',
        type: 'number',
        placeholder: 'Enter annual property tax',
        defaultValue: 3600,
        unit: '$'
      },
      {
        id: 'homeInsurance',
        name: 'Annual Home Insurance',
        type: 'number',
        placeholder: 'Enter annual insurance',
        defaultValue: 1200,
        unit: '$'
      },
      {
        id: 'pmi',
        name: 'PMI (Private Mortgage Insurance)',
        type: 'number',
        placeholder: 'Enter PMI rate',
        defaultValue: 0.5,
        unit: '%'
      }
    ]
  },
  {
    id: 'sip-calculator',
    name: 'SIP Calculator',
    description: 'Calculate the future value of your Systematic Investment Plan (SIP) and see how your wealth grows over time',
    category: 'finance',
    formula: 'Future Value = P × ((1 + r)^n - 1) × (1 + r) / r',
    inputs: [
      {
        id: 'monthlyInvestment',
        name: 'Monthly Investment',
        type: 'number',
        placeholder: 'Enter monthly investment amount',
        unit: '$',
        defaultValue: 1000,
        allowDecimals: true
      },
      {
        id: 'expectedReturnRate',
        name: 'Expected Annual Return Rate',
        type: 'number',
        placeholder: 'Enter expected return rate',
        unit: '%',
        defaultValue: 12,
        allowDecimals: true
      },
      {
        id: 'investmentPeriod',
        name: 'Investment Period',
        type: 'number',
        placeholder: 'Enter investment period',
        unit: 'years',
        defaultValue: 10,
        allowDecimals: true
      },
      {
        id: 'inflationRate',
        name: 'Expected Inflation Rate',
        type: 'number',
        placeholder: 'Enter expected inflation rate',
        unit: '%',
        defaultValue: 3,
        allowDecimals: true
      },
      {
        id: 'stepUpRate',
        name: 'Annual Step-Up Rate',
        type: 'number',
        placeholder: 'Enter annual increase in investment',
        unit: '%',
        defaultValue: 0,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    description: 'Calculate simple interest on investments or loans based on principal amount, interest rate, and time period',
    category: 'finance',
    formula: 'Simple Interest = Principal × Rate × Time',
    inputs: [
      {
        id: 'principal',
        name: 'Principal Amount',
        type: 'number',
        placeholder: 'Enter principal amount',
        unit: '$',
        defaultValue: 10000,
        allowDecimals: true
      },
      {
        id: 'interestRate',
        name: 'Annual Interest Rate',
        type: 'number',
        placeholder: 'Enter interest rate',
        unit: '%',
        defaultValue: 5,
        allowDecimals: true
      },
      {
        id: 'timePeriod',
        name: 'Time Period',
        type: 'number',
        placeholder: 'Enter time period',
        unit: 'years',
        defaultValue: 3,
        allowDecimals: true
      },
      {
        id: 'calculationType',
        name: 'Calculation Type',
        type: 'select',
        options: [
          { value: 'interest', label: 'Calculate Interest' },
          { value: 'principal', label: 'Calculate Principal' },
          { value: 'rate', label: 'Calculate Rate' },
          { value: 'time', label: 'Calculate Time' }
        ],
        defaultValue: 'interest'
      }
    ]
  },
  {
    id: 'savings-goals',
    name: 'Savings Goals Calculator',
    description: 'Calculate how long it will take to reach your savings goals or how much you need to save monthly to reach your target',
    category: 'finance',
    formula: 'Future Value = P × (1 + r)^n + PMT × ((1 + r)^n - 1) / r',
    inputs: [
      {
        id: 'currentSavings',
        name: 'Current Savings',
        type: 'number',
        placeholder: 'Enter your current savings',
        unit: '$',
        defaultValue: 5000,
        allowDecimals: true
      },
      {
        id: 'savingsGoal',
        name: 'Savings Goal',
        type: 'number',
        placeholder: 'Enter your savings goal',
        unit: '$',
        defaultValue: 25000,
        allowDecimals: true
      },
      {
        id: 'monthlyContribution',
        name: 'Monthly Contribution',
        type: 'number',
        placeholder: 'Enter monthly contribution',
        unit: '$',
        defaultValue: 500,
        allowDecimals: true
      },
      {
        id: 'annualInterestRate',
        name: 'Annual Interest Rate',
        type: 'number',
        placeholder: 'Enter interest rate',
        unit: '%',
        defaultValue: 3,
        allowDecimals: true
      },
      {
        id: 'compoundingFrequency',
        name: 'Compounding Frequency',
        type: 'select',
        options: [
          { value: 'monthly', label: 'Monthly' },
          { value: 'quarterly', label: 'Quarterly' },
          { value: 'annually', label: 'Annually' }
        ],
        defaultValue: 'monthly'
      },
      {
        id: 'calculationType',
        name: 'Calculation Type',
        type: 'select',
        options: [
          { value: 'timeToReachGoal', label: 'Time to Reach Goal' },
          { value: 'contributionToReachGoal', label: 'Contribution to Reach Goal' }
        ],
        defaultValue: 'timeToReachGoal'
      },
      {
        id: 'targetDate',
        name: 'Target Date',
        type: 'number',
        placeholder: 'Enter years to target',
        unit: 'years',
        defaultValue: 5,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'retirement-planning',
    name: 'Retirement Planning Calculator',
    description: 'Plan for your retirement by calculating how much you need to save and projecting your retirement savings growth',
    category: 'finance',
    formula: 'Future Value = P × (1 + r)^n + PMT × ((1 + r)^n - 1) / r',
    inputs: [
      {
        id: 'currentAge',
        name: 'Current Age',
        type: 'number',
        placeholder: 'Enter your current age',
        unit: 'years',
        defaultValue: 30,
        allowDecimals: true
      },
      {
        id: 'retirementAge',
        name: 'Retirement Age',
        type: 'number',
        placeholder: 'Enter your retirement age',
        unit: 'years',
        defaultValue: 65,
        allowDecimals: true
      },
      {
        id: 'lifeExpectancy',
        name: 'Life Expectancy',
        type: 'number',
        placeholder: 'Enter your life expectancy',
        unit: 'years',
        defaultValue: 90,
        allowDecimals: true
      },
      {
        id: 'currentSavings',
        name: 'Current Retirement Savings',
        type: 'number',
        placeholder: 'Enter your current savings',
        unit: '$',
        defaultValue: 50000,
        allowDecimals: true
      },
      {
        id: 'monthlyContribution',
        name: 'Monthly Contribution',
        type: 'number',
        placeholder: 'Enter monthly contribution',
        unit: '$',
        defaultValue: 500,
        allowDecimals: true
      },
      {
        id: 'annualReturnRate',
        name: 'Annual Return Rate (Pre-Retirement)',
        type: 'number',
        placeholder: 'Enter expected return rate',
        unit: '%',
        defaultValue: 7,
        allowDecimals: true
      },
      {
        id: 'inflationRate',
        name: 'Inflation Rate',
        type: 'number',
        placeholder: 'Enter expected inflation rate',
        unit: '%',
        defaultValue: 2.5,
        allowDecimals: true
      },
      {
        id: 'retirementIncome',
        name: 'Desired Annual Retirement Income',
        type: 'number',
        placeholder: 'Enter desired annual income',
        unit: '$',
        defaultValue: 60000,
        allowDecimals: true
      },
      {
        id: 'socialSecurityIncome',
        name: 'Expected Annual Social Security',
        type: 'number',
        placeholder: 'Enter expected social security',
        unit: '$',
        defaultValue: 20000,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'price-per-square-foot',
    name: 'Price Per Square Foot Calculator',
    description: 'Calculate price per square foot for real estate properties and compare values across different properties',
    category: 'finance',
    formula: 'Price per Square Foot = Property Price / Total Square Footage',
    inputs: [
      {
        id: 'propertyPrice',
        name: 'Property Price',
        type: 'number',
        placeholder: 'Enter property price',
        unit: '$',
        defaultValue: 350000,
        allowDecimals: true
      },
      {
        id: 'squareFootage',
        name: 'Square Footage',
        type: 'number',
        placeholder: 'Enter total square footage',
        unit: 'sq ft',
        defaultValue: 2000,
        allowDecimals: true
      },
      {
        id: 'includeExterior',
        name: 'Include Exterior Space',
        type: 'select',
        options: [
          { value: 'false', label: 'No (Interior Only)' },
          { value: 'true', label: 'Yes (Interior + Exterior)' }
        ],
        defaultValue: 'false'
      },
      {
        id: 'exteriorFootage',
        name: 'Exterior Square Footage',
        type: 'number',
        placeholder: 'Enter exterior square footage',
        unit: 'sq ft',
        defaultValue: 500,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'mortgage-refinance',
    name: 'Mortgage Refinance Calculator',
    description: 'Calculate potential savings from refinancing your mortgage and determine the break-even point',
    category: 'finance',
    formula: 'Monthly Savings = Current Payment - New Payment, Break-even Point = Closing Costs / Monthly Savings',
    inputs: [
      {
        id: 'currentLoanBalance',
        name: 'Current Loan Balance',
        type: 'number',
        placeholder: 'Enter current loan balance',
        unit: '$',
        defaultValue: 250000,
        allowDecimals: true
      },
      {
        id: 'currentInterestRate',
        name: 'Current Interest Rate',
        type: 'number',
        placeholder: 'Enter current interest rate',
        unit: '%',
        defaultValue: 5.5,
        allowDecimals: true
      },
      {
        id: 'currentLoanTerm',
        name: 'Current Remaining Term',
        type: 'number',
        placeholder: 'Enter remaining years',
        unit: 'years',
        defaultValue: 25,
        allowDecimals: true
      },
      {
        id: 'newInterestRate',
        name: 'New Interest Rate',
        type: 'number',
        placeholder: 'Enter new interest rate',
        unit: '%',
        defaultValue: 4.0,
        allowDecimals: true
      },
      {
        id: 'newLoanTerm',
        name: 'New Loan Term',
        type: 'number',
        placeholder: 'Enter new loan term',
        unit: 'years',
        defaultValue: 30,
        allowDecimals: true
      },
      {
        id: 'closingCosts',
        name: 'Closing Costs',
        type: 'number',
        placeholder: 'Enter closing costs',
        unit: '$',
        defaultValue: 5000,
        allowDecimals: true
      }
    ]
  },
  {
    id: 'retirement-planning-calculator',
    name: 'Retirement Planning Calculator',
    description: 'Plan your financial future by calculating how much you need to save for retirement',
    category: 'finance',
    formula: 'Future Value = P(1 + r)^n + PMT × ((1 + r)^n - 1) / r',
    inputs: [
      {
        id: 'currentAge',
        name: 'Current Age',
        type: 'number',
        placeholder: 'Enter your current age',
        defaultValue: 30,
        allowDecimals: true
      },
      {
        id: 'retirementAge',
        name: 'Retirement Age',
        type: 'number',
        placeholder: 'Enter your retirement age',
        defaultValue: 65,
        allowDecimals: true
      },
      {
        id: 'currentSavings',
        name: 'Current Savings',
        type: 'number',
        placeholder: 'Enter your current retirement savings',
        unit: '$',
        defaultValue: 50000,
        allowDecimals: true
      },
      {
        id: 'annualContribution',
        name: 'Annual Contribution',
        type: 'number',
        placeholder: 'Enter your annual contribution',
        unit: '$',
        defaultValue: 6000,
        allowDecimals: true
      },
      {
        id: 'expectedReturn',
        name: 'Expected Annual Return',
        type: 'number',
        placeholder: 'Enter expected annual return',
        unit: '%',
        defaultValue: 7
      },
      {
        id: 'inflationRate',
        name: 'Inflation Rate',
        type: 'number',
        placeholder: 'Enter expected inflation rate',
        unit: '%',
        defaultValue: 2.5
      },
      {
        id: 'withdrawalRate',
        name: 'Annual Withdrawal Rate',
        type: 'number',
        placeholder: 'Enter annual withdrawal rate',
        unit: '%',
        defaultValue: 4
      }
    ]
  },
  {
    id: 'savings-calculator',
    name: 'Savings Calculator',
    description: 'Calculate how your savings will grow over time with regular contributions and compound interest',
    category: 'finance',
    formula: 'Future Value = P(1 + r/n)^(nt) + PMT × ((1 + r/n)^(nt) - 1) / (r/n)',
    inputs: [
      {
        id: 'initialDeposit',
        name: 'Initial Deposit',
        type: 'number',
        placeholder: 'Enter initial deposit amount',
        unit: '$',
        defaultValue: 1000
      },
      {
        id: 'monthlyContribution',
        name: 'Monthly Contribution',
        type: 'number',
        placeholder: 'Enter monthly contribution amount',
        unit: '$',
        defaultValue: 100
      },
      {
        id: 'annualInterestRate',
        name: 'Annual Interest Rate',
        type: 'number',
        placeholder: 'Enter annual interest rate',
        unit: '%',
        defaultValue: 5
      },
      {
        id: 'savingsPeriod',
        name: 'Savings Period',
        type: 'number',
        placeholder: 'Enter savings period in years',
        unit: 'years',
        defaultValue: 5
      },
      {
        id: 'compoundFrequency',
        name: 'Compound Frequency',
        type: 'select',
        options: [
          { value: 'daily', label: 'Daily' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'quarterly', label: 'Quarterly' },
          { value: 'annually', label: 'Annually' }
        ],
        defaultValue: 'monthly'
      }
    ]
  },
  {
    id: 'meters-to-feet-inches',
    name: 'Meters to Feet & Inches Calculator',
    description: 'Convert meters to feet and inches with precision. Easy to use calculator for length conversions between metric and imperial systems.',
    category: 'utility',
    formula: 'Feet = Meters × 3.28084, Inches = (Decimal part of feet) × 12',
    inputs: [
      {
        id: 'meters',
        name: 'Meters',
        type: 'number',
        placeholder: 'Enter meters',
        unit: 'm',
        defaultValue: 3
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '0', label: '0 decimal places' },
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' }
        ],
        defaultValue: '2'
      }
    ]
  },
  {
    id: 'mm-to-inches',
    name: 'Millimeters to Inches Calculator',
    description: 'Convert millimeters to inches with precision. Easy to use calculator for length conversions between metric and imperial systems.',
    category: 'utility',
    formula: 'Inches = Millimeters × 0.0393701',
    inputs: [
      {
        id: 'millimeters',
        name: 'Millimeters',
        type: 'number',
        placeholder: 'Enter millimeters',
        unit: 'mm',
        defaultValue: 100
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '0', label: '0 decimal places' },
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' }
        ],
        defaultValue: '2'
      }
    ]
  },
  {
    id: 'grams-to-pounds',
    name: 'Grams to Pounds Calculator',
    description: 'Convert grams to pounds with precision. Easy to use calculator for weight conversions between metric and imperial systems.',
    category: 'utility',
    formula: 'Pounds = Grams × 0.00220462',
    inputs: [
      {
        id: 'grams',
        name: 'Grams',
        type: 'number',
        placeholder: 'Enter grams',
        unit: 'g',
        defaultValue: 1000
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '0', label: '0 decimal places' },
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' }
        ],
        defaultValue: '2'
      }
    ]
  },
  {
    id: 'kilos-to-stone-lb',
    name: 'Kilograms to Stone & Pounds Calculator',
    description: 'Convert kilograms to stone and pounds with precision. Easy to use calculator for weight conversions between metric and imperial systems.',
    category: 'utility',
    formula: 'Stone = Floor(Kilograms × 2.20462 ÷ 14), Pounds = (Kilograms × 2.20462) - (Stone × 14)',
    inputs: [
      {
        id: 'kilograms',
        name: 'Kilograms',
        type: 'number',
        placeholder: 'Enter kilograms',
        unit: 'kg',
        defaultValue: 70
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '0', label: '0 decimal places' },
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' }
        ],
        defaultValue: '2'
      }
    ]
  },
  {
    id: 'kilos-to-pounds',
    name: 'Kilograms to Pounds Calculator',
    description: 'Convert kilograms to pounds with precision. Easy to use calculator for weight conversions between metric and imperial systems.',
    category: 'utility',
    formula: 'Pounds = Kilograms × 2.20462',
    inputs: [
      {
        id: 'kilograms',
        name: 'Kilograms',
        type: 'number',
        placeholder: 'Enter kilograms',
        unit: 'kg',
        defaultValue: 70
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '0', label: '0 decimal places' },
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' }
        ],
        defaultValue: '2'
      }
    ]
  },
  {
    id: 'micrograms-to-mg',
    name: 'Micrograms to Milligrams Calculator',
    description: 'Convert micrograms to milligrams with precision. Easy to use calculator for weight conversions in the metric system.',
    category: 'utility',
    formula: 'Milligrams = Micrograms × 0.001',
    inputs: [
      {
        id: 'micrograms',
        name: 'Micrograms',
        type: 'number',
        placeholder: 'Enter micrograms',
        unit: 'μg',
        defaultValue: 1000
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '0', label: '0 decimal places' },
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' },
          { value: '6', label: '6 decimal places' }
        ],
        defaultValue: '2'
      }
    ]
  },
  {
    id: 'micrograms-to-grams',
    name: 'Micrograms to Grams Calculator',
    description: 'Convert micrograms to grams with precision. Easy to use calculator for weight conversions in the metric system.',
    category: 'utility',
    formula: 'Grams = Micrograms × 0.000001',
    inputs: [
      {
        id: 'micrograms',
        name: 'Micrograms',
        type: 'number',
        placeholder: 'Enter micrograms',
        unit: 'μg',
        defaultValue: 1000000
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' },
          { value: '5', label: '5 decimal places' },
          { value: '6', label: '6 decimal places' },
          { value: '8', label: '8 decimal places' },
          { value: '10', label: '10 decimal places' }
        ],
        defaultValue: '6'
      }
    ]
  },
  {
    id: 'milligrams-to-grams',
    name: 'Milligrams to Grams Calculator',
    description: 'Convert milligrams to grams with precision. Easy to use calculator for weight conversions in the metric system.',
    category: 'utility',
    formula: 'Grams = Milligrams × 0.001',
    inputs: [
      {
        id: 'milligrams',
        name: 'Milligrams',
        type: 'number',
        placeholder: 'Enter milligrams',
        unit: 'mg',
        defaultValue: 1000
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' },
          { value: '5', label: '5 decimal places' }
        ],
        defaultValue: '3'
      }
    ]
  },
  {
    id: 'ounces-to-pounds',
    name: 'Ounces to Pounds Calculator',
    description: 'Convert ounces to pounds with precision. Easy to use calculator for weight conversions in the imperial system.',
    category: 'utility',
    formula: 'Pounds = Ounces × 0.0625',
    inputs: [
      {
        id: 'ounces',
        name: 'Ounces',
        type: 'number',
        placeholder: 'Enter ounces',
        unit: 'oz',
        defaultValue: 16
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '0', label: '0 decimal places' },
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' }
        ],
        defaultValue: '2'
      }
    ]
  },
  {
    id: 'stone-to-pounds',
    name: 'Stone to Pounds Calculator',
    description: 'Convert stone to pounds with precision. Easy to use calculator for weight conversions in the imperial system.',
    category: 'utility',
    formula: 'Pounds = Stone × 14',
    inputs: [
      {
        id: 'stone',
        name: 'Stone',
        type: 'number',
        placeholder: 'Enter stone',
        unit: 'st',
        defaultValue: 10
      },
      {
        id: 'pounds',
        name: 'Pounds',
        type: 'number',
        placeholder: 'Enter pounds',
        unit: 'lb',
        defaultValue: 0
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '0', label: '0 decimal places' },
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' }
        ],
        defaultValue: '2'
      }
    ]
  },
  {
    id: 'amps-to-watts',
    name: 'Amps to Watts Calculator',
    description: 'Convert electrical current (amps) to power (watts) with precision',
    category: 'utility',
    formula: 'P = I × V × PF',
    inputs: [
      {
        id: 'amps',
        name: 'Current',
        type: 'number',
        placeholder: 'Enter current',
        unit: 'A',
        defaultValue: 10
      },
      {
        id: 'volts',
        name: 'Voltage',
        type: 'number',
        placeholder: 'Enter voltage',
        unit: 'V',
        defaultValue: 120
      },
      {
        id: 'powerFactor',
        name: 'Power Factor',
        type: 'number',
        placeholder: 'Enter power factor',
        defaultValue: 1
      }
    ]
  },
  {
    id: 'hertz-to-seconds',
    name: 'Hertz to Seconds Calculator',
    description: 'Convert frequency (hertz) to time period (seconds) with precision',
    category: 'utility',
    formula: 'T = 1 / f',
    inputs: [
      {
        id: 'hertz',
        name: 'Frequency',
        type: 'number',
        placeholder: 'Enter frequency',
        unit: 'Hz',
        defaultValue: 60
      }
    ]
  },
  {
    id: 'lumens-to-watts',
    name: 'Lumens to Watts Calculator',
    description: 'Convert light output (lumens) to power consumption (watts) with precision',
    category: 'utility',
    formula: 'W = lm / (lm/W)',
    inputs: [
      {
        id: 'lumens',
        name: 'Light Output',
        type: 'number',
        placeholder: 'Enter lumens',
        unit: 'lm',
        defaultValue: 800
      },
      {
        id: 'efficiency',
        name: 'Efficiency',
        type: 'number',
        placeholder: 'Enter efficiency',
        unit: 'lm/W',
        defaultValue: 80
      },
      {
        id: 'lightSource',
        name: 'Light Source Type',
        type: 'select',
        options: [
          { value: 'incandescent', label: 'Incandescent' },
          { value: 'halogen', label: 'Halogen' },
          { value: 'cfl', label: 'CFL (Compact Fluorescent)' },
          { value: 'led', label: 'LED' },
          { value: 'metal_halide', label: 'Metal Halide' },
          { value: 'high_pressure_sodium', label: 'High Pressure Sodium' },
          { value: 'low_pressure_sodium', label: 'Low Pressure Sodium' },
          { value: 'custom', label: 'Custom Efficiency' }
        ],
        defaultValue: 'led'
      }
    ]
  },
  {
    id: 'watts-to-amps',
    name: 'Watts to Amps Calculator',
    description: 'Convert power (watts) to electrical current (amps) with precision',
    category: 'utility',
    formula: 'I = P / (V × PF)',
    inputs: [
      {
        id: 'watts',
        name: 'Power',
        type: 'number',
        placeholder: 'Enter power',
        unit: 'W',
        defaultValue: 1200
      },
      {
        id: 'volts',
        name: 'Voltage',
        type: 'number',
        placeholder: 'Enter voltage',
        unit: 'V',
        defaultValue: 120
      },
      {
        id: 'powerFactor',
        name: 'Power Factor',
        type: 'number',
        placeholder: 'Enter power factor',
        defaultValue: 1
      }
    ]
  },
  {
    id: 'acceleration',
    name: 'Acceleration Converter',
    description: 'Convert between different acceleration units like m/s², g-force, ft/s², and more',
    category: 'utility',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'mps2', label: 'Meters per Second² (m/s²)' },
          { value: 'g', label: 'Standard Gravity (g)' },
          { value: 'ftps2', label: 'Feet per Second² (ft/s²)' },
          { value: 'inps2', label: 'Inches per Second² (in/s²)' },
          { value: 'kmph2', label: 'Kilometers per Hour² (km/h²)' },
          { value: 'mph2', label: 'Miles per Hour per Second (mph/s)' },
          { value: 'gal', label: 'Gal (cm/s²)' }
        ],
        defaultValue: 'mps2'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'mps2', label: 'Meters per Second² (m/s²)' },
          { value: 'g', label: 'Standard Gravity (g)' },
          { value: 'ftps2', label: 'Feet per Second² (ft/s²)' },
          { value: 'inps2', label: 'Inches per Second² (in/s²)' },
          { value: 'kmph2', label: 'Kilometers per Hour² (km/h²)' },
          { value: 'mph2', label: 'Miles per Hour per Second (mph/s)' },
          { value: 'gal', label: 'Gal (cm/s²)' }
        ],
        defaultValue: 'g'
      }
    ]
  },
  {
    id: 'area',
    name: 'Area Converter',
    description: 'Convert between different area units like square meters, acres, square feet, and more',
    category: 'utility',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'squareMeters', label: 'Square Meters (m²)' },
          { value: 'squareFeet', label: 'Square Feet (ft²)' },
          { value: 'acres', label: 'Acres (ac)' },
          { value: 'hectares', label: 'Hectares (ha)' },
          { value: 'squareKilometers', label: 'Square Kilometers (km²)' },
          { value: 'squareMiles', label: 'Square Miles (mi²)' }
        ],
        defaultValue: 'squareFeet'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'squareMeters', label: 'Square Meters (m²)' },
          { value: 'squareFeet', label: 'Square Feet (ft²)' },
          { value: 'acres', label: 'Acres (ac)' },
          { value: 'hectares', label: 'Hectares (ha)' },
          { value: 'squareKilometers', label: 'Square Kilometers (km²)' },
          { value: 'squareMiles', label: 'Square Miles (mi²)' }
        ],
        defaultValue: 'squareMeters'
      }
    ]
  },
  {
    id: 'data-storage',
    name: 'Data Storage Converter',
    description: 'Convert between different data storage units',
    category: 'utility',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'B', label: 'Bytes (B)' },
          { value: 'KB', label: 'Kilobytes (KB)' },
          { value: 'MB', label: 'Megabytes (MB)' },
          { value: 'GB', label: 'Gigabytes (GB)' },
          { value: 'TB', label: 'Terabytes (TB)' },
          { value: 'PB', label: 'Petabytes (PB)' },
          { value: 'kB', label: 'Kilobytes (kB) - Base 10' },
          { value: 'MB_10', label: 'Megabytes (MB) - Base 10' },
          { value: 'GB_10', label: 'Gigabytes (GB) - Base 10' },
          { value: 'TB_10', label: 'Terabytes (TB) - Base 10' },
          { value: 'PB_10', label: 'Petabytes (PB) - Base 10' },
          { value: 'KiB', label: 'Kibibytes (KiB)' },
          { value: 'MiB', label: 'Mebibytes (MiB)' },
          { value: 'GiB', label: 'Gibibytes (GiB)' },
          { value: 'TiB', label: 'Tebibytes (TiB)' },
          { value: 'PiB', label: 'Pebibytes (PiB)' }
        ],
        defaultValue: 'GB'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'B', label: 'Bytes (B)' },
          { value: 'KB', label: 'Kilobytes (KB)' },
          { value: 'MB', label: 'Megabytes (MB)' },
          { value: 'GB', label: 'Gigabytes (GB)' },
          { value: 'TB', label: 'Terabytes (TB)' },
          { value: 'PB', label: 'Petabytes (PB)' },
          { value: 'kB', label: 'Kilobytes (kB) - Base 10' },
          { value: 'MB_10', label: 'Megabytes (MB) - Base 10' },
          { value: 'GB_10', label: 'Gigabytes (GB) - Base 10' },
          { value: 'TB_10', label: 'Terabytes (TB) - Base 10' },
          { value: 'PB_10', label: 'Petabytes (PB) - Base 10' },
          { value: 'KiB', label: 'Kibibytes (KiB)' },
          { value: 'MiB', label: 'Mebibytes (MiB)' },
          { value: 'GiB', label: 'Gibibytes (GiB)' },
          { value: 'TiB', label: 'Tebibytes (TiB)' },
          { value: 'PiB', label: 'Pebibytes (PiB)' }
        ],
        defaultValue: 'MB'
      }
    ]
  },
  {
    id: 'data-transfer-rate',
    name: 'Data Transfer Rate Converter',
    description: 'Convert between different data transfer rate units like bps, kbps, Mbps, Gbps, and more',
    category: 'utility',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'bps', label: 'bits per second (bps)' },
          { value: 'kbps', label: 'kilobits per second (kbps)' },
          { value: 'mbps', label: 'megabits per second (Mbps)' },
          { value: 'gbps', label: 'gigabits per second (Gbps)' },
          { value: 'tbps', label: 'terabits per second (Tbps)' },
          { value: 'Bps', label: 'bytes per second (Bps)' },
          { value: 'kBps', label: 'kilobytes per second (kBps)' },
          { value: 'mBps', label: 'megabytes per second (MBps)' },
          { value: 'gBps', label: 'gigabytes per second (GBps)' },
          { value: 'tBps', label: 'terabytes per second (TBps)' }
        ],
        defaultValue: 'mbps'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'bps', label: 'bits per second (bps)' },
          { value: 'kbps', label: 'kilobits per second (kbps)' },
          { value: 'mbps', label: 'megabits per second (Mbps)' },
          { value: 'gbps', label: 'gigabits per second (Gbps)' },
          { value: 'tbps', label: 'terabits per second (Tbps)' },
          { value: 'Bps', label: 'bytes per second (Bps)' },
          { value: 'kBps', label: 'kilobytes per second (kBps)' },
          { value: 'mBps', label: 'megabytes per second (MBps)' },
          { value: 'gBps', label: 'gigabytes per second (GBps)' },
          { value: 'tBps', label: 'terabytes per second (TBps)' }
        ],
        defaultValue: 'kbps'
      }
    ]
  },
  {
    id: 'energy',
    name: 'Energy Converter',
    description: 'Convert between different energy units like joules, calories, kilowatt-hours, and more',
    category: 'science',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'j', label: 'Joules (J)' },
          { value: 'kj', label: 'Kilojoules (kJ)' },
          { value: 'cal', label: 'Calories (cal)' },
          { value: 'kcal', label: 'Kilocalories (kcal)' },
          { value: 'wh', label: 'Watt-hours (Wh)' },
          { value: 'kwh', label: 'Kilowatt-hours (kWh)' },
          { value: 'mwh', label: 'Megawatt-hours (MWh)' },
          { value: 'btu', label: 'British Thermal Units (BTU)' },
          { value: 'therm', label: 'Therms' },
          { value: 'ft_lb', label: 'Foot-pounds (ft⋅lb)' }
        ],
        defaultValue: 'j'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'j', label: 'Joules (J)' },
          { value: 'kj', label: 'Kilojoules (kJ)' },
          { value: 'cal', label: 'Calories (cal)' },
          { value: 'kcal', label: 'Kilocalories (kcal)' },
          { value: 'wh', label: 'Watt-hours (Wh)' },
          { value: 'kwh', label: 'Kilowatt-hours (kWh)' },
          { value: 'mwh', label: 'Megawatt-hours (MWh)' },
          { value: 'btu', label: 'British Thermal Units (BTU)' },
          { value: 'therm', label: 'Therms' },
          { value: 'ft_lb', label: 'Foot-pounds (ft⋅lb)' }
        ],
        defaultValue: 'kcal'
      }
    ]
  },
  {
    id: 'fuel-consumption',
    name: 'Fuel Consumption Converter',
    description: 'Convert between different fuel consumption units like MPG, L/100km, km/L, and more',
    category: 'utility',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'mpg_us', label: 'Miles per gallon (US)' },
          { value: 'mpg_uk', label: 'Miles per gallon (UK)' },
          { value: 'l_100km', label: 'Liters per 100 km (L/100km)' },
          { value: 'km_l', label: 'Kilometers per liter (km/L)' },
          { value: 'miles_l', label: 'Miles per liter (miles/L)' },
          { value: 'gal_100miles', label: 'Gallons per 100 miles (US)' }
        ],
        defaultValue: 'mpg_us'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'mpg_us', label: 'Miles per gallon (US)' },
          { value: 'mpg_uk', label: 'Miles per gallon (UK)' },
          { value: 'l_100km', label: 'Liters per 100 km (L/100km)' },
          { value: 'km_l', label: 'Kilometers per liter (km/L)' },
          { value: 'miles_l', label: 'Miles per liter (miles/L)' },
          { value: 'gal_100miles', label: 'Gallons per 100 miles (US)' }
        ],
        defaultValue: 'l_100km'
      }
    ]
  },
  {
    id: 'gold-weight',
    name: 'Gold Weight Converter',
    description: 'Convert between different gold weight units like troy ounces, grams, pennyweight, and more',
    category: 'utility',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'g', label: 'Grams (g)' },
          { value: 'kg', label: 'Kilograms (kg)' },
          { value: 'oz_t', label: 'Troy Ounces (oz t)' },
          { value: 'oz', label: 'Ounces (oz)' },
          { value: 'lb', label: 'Pounds (lb)' },
          { value: 'dwt', label: 'Pennyweight (dwt)' },
          { value: 'grain', label: 'Grains' },
          { value: 'tola', label: 'Tola (India)' },
          { value: 'tael', label: 'Tael (China)' },
          { value: 'baht', label: 'Baht (Thailand)' }
        ],
        defaultValue: 'oz_t'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'g', label: 'Grams (g)' },
          { value: 'kg', label: 'Kilograms (kg)' },
          { value: 'oz_t', label: 'Troy Ounces (oz t)' },
          { value: 'oz', label: 'Ounces (oz)' },
          { value: 'lb', label: 'Pounds (lb)' },
          { value: 'dwt', label: 'Pennyweight (dwt)' },
          { value: 'grain', label: 'Grains' },
          { value: 'tola', label: 'Tola (India)' },
          { value: 'tael', label: 'Tael (China)' },
          { value: 'baht', label: 'Baht (Thailand)' }
        ],
        defaultValue: 'g'
      }
    ]
  },
  {
    id: 'height',
    name: 'Height Converter',
    description: 'Convert between different height units like feet, inches, centimeters, meters, and more',
    category: 'utility',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'cm', label: 'Centimeters (cm)' },
          { value: 'm', label: 'Meters (m)' },
          { value: 'in', label: 'Inches (in)' },
          { value: 'ft', label: 'Feet (ft)' },
          { value: 'ft_in', label: 'Feet & Inches (ft\' in")' },
          { value: 'yd', label: 'Yards (yd)' },
          { value: 'mm', label: 'Millimeters (mm)' }
        ],
        defaultValue: 'ft_in'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'cm', label: 'Centimeters (cm)' },
          { value: 'm', label: 'Meters (m)' },
          { value: 'in', label: 'Inches (in)' },
          { value: 'ft', label: 'Feet (ft)' },
          { value: 'ft_in', label: 'Feet & Inches (ft\' in")' },
          { value: 'yd', label: 'Yards (yd)' },
          { value: 'mm', label: 'Millimeters (mm)' }
        ],
        defaultValue: 'cm'
      }
    ]
  },
  {
    id: 'length-and-distance',
    name: 'Length and Distance Converter',
    description: 'Convert between different length and distance units like meters, miles, kilometers, and more',
    category: 'utility',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'mm', label: 'Millimeters (mm)' },
          { value: 'cm', label: 'Centimeters (cm)' },
          { value: 'm', label: 'Meters (m)' },
          { value: 'km', label: 'Kilometers (km)' },
          { value: 'in', label: 'Inches (in)' },
          { value: 'ft', label: 'Feet (ft)' },
          { value: 'yd', label: 'Yards (yd)' },
          { value: 'mi', label: 'Miles (mi)' },
          { value: 'nm', label: 'Nautical Miles (nm)' },
          { value: 'league', label: 'Leagues' }
        ],
        defaultValue: 'km'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'mm', label: 'Millimeters (mm)' },
          { value: 'cm', label: 'Centimeters (cm)' },
          { value: 'm', label: 'Meters (m)' },
          { value: 'km', label: 'Kilometers (km)' },
          { value: 'in', label: 'Inches (in)' },
          { value: 'ft', label: 'Feet (ft)' },
          { value: 'yd', label: 'Yards (yd)' },
          { value: 'mi', label: 'Miles (mi)' },
          { value: 'nm', label: 'Nautical Miles (nm)' },
          { value: 'league', label: 'Leagues' }
        ],
        defaultValue: 'mi'
      }
    ]
  },
  {
    id: 'liquid-volume',
    name: 'Liquid Volume Converter',
    description: 'Convert between different liquid volume units like liters, gallons, fluid ounces, and more',
    category: 'utility',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'ml', label: 'Milliliters (ml)' },
          { value: 'l', label: 'Liters (l)' },
          { value: 'fl_oz_us', label: 'Fluid Ounces (US)' },
          { value: 'fl_oz_uk', label: 'Fluid Ounces (UK)' },
          { value: 'cup_us', label: 'Cups (US)' },
          { value: 'cup_uk', label: 'Cups (UK)' },
          { value: 'pint_us', label: 'Pints (US)' },
          { value: 'pint_uk', label: 'Pints (UK)' },
          { value: 'quart_us', label: 'Quarts (US)' },
          { value: 'quart_uk', label: 'Quarts (UK)' },
          { value: 'gal_us', label: 'Gallons (US)' },
          { value: 'gal_uk', label: 'Gallons (UK)' }
        ],
        defaultValue: 'l'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'ml', label: 'Milliliters (ml)' },
          { value: 'l', label: 'Liters (l)' },
          { value: 'fl_oz_us', label: 'Fluid Ounces (US)' },
          { value: 'fl_oz_uk', label: 'Fluid Ounces (UK)' },
          { value: 'cup_us', label: 'Cups (US)' },
          { value: 'cup_uk', label: 'Cups (UK)' },
          { value: 'pint_us', label: 'Pints (US)' },
          { value: 'pint_uk', label: 'Pints (UK)' },
          { value: 'quart_us', label: 'Quarts (US)' },
          { value: 'quart_uk', label: 'Quarts (UK)' },
          { value: 'gal_us', label: 'Gallons (US)' },
          { value: 'gal_uk', label: 'Gallons (UK)' }
        ],
        defaultValue: 'gal_us'
      }
    ]
  },
  {
    id: 'mass-and-weight',
    name: 'Mass and Weight Converter',
    description: 'Convert between different mass and weight units like kilograms, pounds, stones, and more',
    category: 'utility',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'kg', label: 'Kilograms (kg)' },
          { value: 'g', label: 'Grams (g)' },
          { value: 'mg', label: 'Milligrams (mg)' },
          { value: 'lb', label: 'Pounds (lb)' },
          { value: 'oz', label: 'Ounces (oz)' },
          { value: 'st', label: 'Stones (st)' },
          { value: 'ton', label: 'Tons (metric)' },
          { value: 'ton_us', label: 'Tons (US)' },
          { value: 'ton_uk', label: 'Tons (UK)' },
          { value: 'ct', label: 'Carats (ct)' }
        ],
        defaultValue: 'kg'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'kg', label: 'Kilograms (kg)' },
          { value: 'g', label: 'Grams (g)' },
          { value: 'mg', label: 'Milligrams (mg)' },
          { value: 'lb', label: 'Pounds (lb)' },
          { value: 'oz', label: 'Ounces (oz)' },
          { value: 'st', label: 'Stones (st)' },
          { value: 'ton', label: 'Tons (metric)' },
          { value: 'ton_us', label: 'Tons (US)' },
          { value: 'ton_uk', label: 'Tons (UK)' },
          { value: 'ct', label: 'Carats (ct)' }
        ],
        defaultValue: 'lb'
      }
    ]
  },
  {
    id: 'power',
    name: 'Power Converter',
    description: 'Convert between different power units like watts, horsepower, kilowatts, and more',
    category: 'science',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'w', label: 'Watts (W)' },
          { value: 'kw', label: 'Kilowatts (kW)' },
          { value: 'mw', label: 'Megawatts (MW)' },
          { value: 'hp', label: 'Horsepower (hp)' },
          { value: 'hp_uk', label: 'Horsepower (UK)' },
          { value: 'ft_lb_s', label: 'Foot-pounds per second' },
          { value: 'btu_h', label: 'BTU per hour' },
          { value: 'cal_s', label: 'Calories per second' },
          { value: 'kcal_h', label: 'Kilocalories per hour' },
          { value: 'j_s', label: 'Joules per second' }
        ],
        defaultValue: 'w'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'w', label: 'Watts (W)' },
          { value: 'kw', label: 'Kilowatts (kW)' },
          { value: 'mw', label: 'Megawatts (MW)' },
          { value: 'hp', label: 'Horsepower (hp)' },
          { value: 'hp_uk', label: 'Horsepower (UK)' },
          { value: 'ft_lb_s', label: 'Foot-pounds per second' },
          { value: 'btu_h', label: 'BTU per hour' },
          { value: 'cal_s', label: 'Calories per second' },
          { value: 'kcal_h', label: 'Kilocalories per hour' },
          { value: 'j_s', label: 'Joules per second' }
        ],
        defaultValue: 'hp'
      }
    ]
  },
  {
    id: 'pressure',
    name: 'Pressure Converter',
    description: 'Convert between different pressure units like pascals, bars, psi, atmospheres, and more',
    category: 'science',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'pa', label: 'Pascals (Pa)' },
          { value: 'kpa', label: 'Kilopascals (kPa)' },
          { value: 'mpa', label: 'Megapascals (MPa)' },
          { value: 'bar', label: 'Bars' },
          { value: 'psi', label: 'Pounds per square inch (psi)' },
          { value: 'atm', label: 'Atmospheres (atm)' },
          { value: 'torr', label: 'Torr' },
          { value: 'mmhg', label: 'Millimeters of mercury (mmHg)' },
          { value: 'inhg', label: 'Inches of mercury (inHg)' },
          { value: 'mmh2o', label: 'Millimeters of water (mmH₂O)' }
        ],
        defaultValue: 'bar'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'pa', label: 'Pascals (Pa)' },
          { value: 'kpa', label: 'Kilopascals (kPa)' },
          { value: 'mpa', label: 'Megapascals (MPa)' },
          { value: 'bar', label: 'Bars' },
          { value: 'psi', label: 'Pounds per square inch (psi)' },
          { value: 'atm', label: 'Atmospheres (atm)' },
          { value: 'torr', label: 'Torr' },
          { value: 'mmhg', label: 'Millimeters of mercury (mmHg)' },
          { value: 'inhg', label: 'Inches of mercury (inHg)' },
          { value: 'mmh2o', label: 'Millimeters of water (mmH₂O)' }
        ],
        defaultValue: 'psi'
      }
    ]
  },
  {
    id: 'temperature',
    name: 'Temperature Converter',
    description: 'Convert between different temperature units like Celsius, Fahrenheit, Kelvin, and more',
    category: 'science',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 0
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'c', label: 'Celsius (°C)' },
          { value: 'f', label: 'Fahrenheit (°F)' },
          { value: 'k', label: 'Kelvin (K)' },
          { value: 'r', label: 'Rankine (°R)' },
          { value: 're', label: 'Réaumur (°Ré)' }
        ],
        defaultValue: 'c'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'c', label: 'Celsius (°C)' },
          { value: 'f', label: 'Fahrenheit (°F)' },
          { value: 'k', label: 'Kelvin (K)' },
          { value: 'r', label: 'Rankine (°R)' },
          { value: 're', label: 'Réaumur (°Ré)' }
        ],
        defaultValue: 'f'
      }
    ]
  },
  {
    id: 'time',
    name: 'Time Converter',
    description: 'Convert between different time units like seconds, minutes, hours, days, and more',
    category: 'utility',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 's', label: 'Seconds (s)' },
          { value: 'min', label: 'Minutes (min)' },
          { value: 'h', label: 'Hours (h)' },
          { value: 'd', label: 'Days (d)' },
          { value: 'wk', label: 'Weeks (wk)' },
          { value: 'mo', label: 'Months (mo)' },
          { value: 'yr', label: 'Years (yr)' },
          { value: 'ms', label: 'Milliseconds (ms)' },
          { value: 'μs', label: 'Microseconds (μs)' },
          { value: 'ns', label: 'Nanoseconds (ns)' }
        ],
        defaultValue: 'h'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 's', label: 'Seconds (s)' },
          { value: 'min', label: 'Minutes (min)' },
          { value: 'h', label: 'Hours (h)' },
          { value: 'd', label: 'Days (d)' },
          { value: 'wk', label: 'Weeks (wk)' },
          { value: 'mo', label: 'Months (mo)' },
          { value: 'yr', label: 'Years (yr)' },
          { value: 'ms', label: 'Milliseconds (ms)' },
          { value: 'μs', label: 'Microseconds (μs)' },
          { value: 'ns', label: 'Nanoseconds (ns)' }
        ],
        defaultValue: 'min'
      }
    ]
  },
  {
    id: 'velocity',
    name: 'Velocity Converter',
    description: 'Convert between different velocity units like m/s, km/h, mph, knots, and more',
    category: 'science',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'm_s', label: 'Meters per second (m/s)' },
          { value: 'km_h', label: 'Kilometers per hour (km/h)' },
          { value: 'mph', label: 'Miles per hour (mph)' },
          { value: 'ft_s', label: 'Feet per second (ft/s)' },
          { value: 'knot', label: 'Knots' },
          { value: 'mach', label: 'Mach' },
          { value: 'c', label: 'Speed of light (c)' }
        ],
        defaultValue: 'km_h'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'm_s', label: 'Meters per second (m/s)' },
          { value: 'km_h', label: 'Kilometers per hour (km/h)' },
          { value: 'mph', label: 'Miles per hour (mph)' },
          { value: 'ft_s', label: 'Feet per second (ft/s)' },
          { value: 'knot', label: 'Knots' },
          { value: 'mach', label: 'Mach' },
          { value: 'c', label: 'Speed of light (c)' }
        ],
        defaultValue: 'mph'
      }
    ]
  },
  {
    id: 'water-weight',
    name: 'Water Weight Converter',
    description: 'Convert between water volume and weight units like gallons, liters, pounds, kilograms, and more',
    category: 'utility',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'gal_us', label: 'Gallons (US)' },
          { value: 'gal_uk', label: 'Gallons (UK)' },
          { value: 'l', label: 'Liters (L)' },
          { value: 'ml', label: 'Milliliters (mL)' },
          { value: 'cu_ft', label: 'Cubic Feet (ft³)' },
          { value: 'cu_in', label: 'Cubic Inches (in³)' },
          { value: 'cu_m', label: 'Cubic Meters (m³)' },
          { value: 'lb', label: 'Pounds (lb)' },
          { value: 'kg', label: 'Kilograms (kg)' },
          { value: 'oz', label: 'Ounces (oz)' }
        ],
        defaultValue: 'gal_us'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'gal_us', label: 'Gallons (US)' },
          { value: 'gal_uk', label: 'Gallons (UK)' },
          { value: 'l', label: 'Liters (L)' },
          { value: 'ml', label: 'Milliliters (mL)' },
          { value: 'cu_ft', label: 'Cubic Feet (ft³)' },
          { value: 'cu_in', label: 'Cubic Inches (in³)' },
          { value: 'cu_m', label: 'Cubic Meters (m³)' },
          { value: 'lb', label: 'Pounds (lb)' },
          { value: 'kg', label: 'Kilograms (kg)' },
          { value: 'oz', label: 'Ounces (oz)' }
        ],
        defaultValue: 'lb'
      }
    ]
  },
  {
    id: 'weight',
    name: 'Weight Converter',
    description: 'Convert between different weight units like pounds, kilograms, ounces, stones, and more',
    category: 'utility',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'kg', label: 'Kilograms (kg)' },
          { value: 'g', label: 'Grams (g)' },
          { value: 'mg', label: 'Milligrams (mg)' },
          { value: 'lb', label: 'Pounds (lb)' },
          { value: 'oz', label: 'Ounces (oz)' },
          { value: 'st', label: 'Stones (st)' },
          { value: 'ton', label: 'Tons (metric)' },
          { value: 'ton_us', label: 'Tons (US)' },
          { value: 'ton_uk', label: 'Tons (UK)' }
        ],
        defaultValue: 'lb'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'kg', label: 'Kilograms (kg)' },
          { value: 'g', label: 'Grams (g)' },
          { value: 'mg', label: 'Milligrams (mg)' },
          { value: 'lb', label: 'Pounds (lb)' },
          { value: 'oz', label: 'Ounces (oz)' },
          { value: 'st', label: 'Stones (st)' },
          { value: 'ton', label: 'Tons (metric)' },
          { value: 'ton_us', label: 'Tons (US)' },
          { value: 'ton_uk', label: 'Tons (UK)' }
        ],
        defaultValue: 'kg'
      }
    ]
  },
  {
    id: 'weight-to-volume',
    name: 'Weight to Volume Converter',
    description: 'Convert between weight and volume based on material density',
    category: 'utility',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number',
        placeholder: 'Enter value',
        defaultValue: 1
      },
      {
        id: 'fromUnit',
        name: 'From Unit',
        type: 'select',
        options: [
          { value: 'kg', label: 'Kilograms (kg)' },
          { value: 'g', label: 'Grams (g)' },
          { value: 'lb', label: 'Pounds (lb)' },
          { value: 'oz', label: 'Ounces (oz)' },
          { value: 'l', label: 'Liters (L)' },
          { value: 'ml', label: 'Milliliters (mL)' },
          { value: 'gal_us', label: 'Gallons (US)' },
          { value: 'cu_ft', label: 'Cubic Feet (ft³)' },
          { value: 'cu_in', label: 'Cubic Inches (in³)' },
          { value: 'cu_m', label: 'Cubic Meters (m³)' }
        ],
        defaultValue: 'kg'
      },
      {
        id: 'toUnit',
        name: 'To Unit',
        type: 'select',
        options: [
          { value: 'kg', label: 'Kilograms (kg)' },
          { value: 'g', label: 'Grams (g)' },
          { value: 'lb', label: 'Pounds (lb)' },
          { value: 'oz', label: 'Ounces (oz)' },
          { value: 'l', label: 'Liters (L)' },
          { value: 'ml', label: 'Milliliters (mL)' },
          { value: 'gal_us', label: 'Gallons (US)' },
          { value: 'cu_ft', label: 'Cubic Feet (ft³)' },
          { value: 'cu_in', label: 'Cubic Inches (in³)' },
          { value: 'cu_m', label: 'Cubic Meters (m³)' }
        ],
        defaultValue: 'l'
      },
      {
        id: 'material',
        name: 'Material',
        type: 'select',
        options: [
          { value: 'water', label: 'Water' },
          { value: 'milk', label: 'Milk' },
          { value: 'oil', label: 'Oil (Vegetable)' },
          { value: 'gasoline', label: 'Gasoline' },
          { value: 'concrete', label: 'Concrete' },
          { value: 'sand', label: 'Sand (Dry)' },
          { value: 'wood_oak', label: 'Wood (Oak)' },
          { value: 'wood_pine', label: 'Wood (Pine)' },
          { value: 'aluminum', label: 'Aluminum' },
          { value: 'steel', label: 'Steel' },
          { value: 'gold', label: 'Gold' },
          { value: 'silver', label: 'Silver' }
        ],
        defaultValue: 'water'
      }
    ]
  },
  {
    id: 'shop-convert',
    name: 'Shop Convert',
    description: 'Convert flooring prices between square yards and square meters',
    category: 'home-garden',
    formula: 'Price per m² = Price per yd² × 1.196, Total Price = Price per m² × Area in m²',
    inputs: [
      {
        id: 'pricePerSquareYard',
        name: 'Price Per Square Yard',
        type: 'number',
        placeholder: 'Enter price per square yard',
        unit: '€',
        defaultValue: 25.99
      },
      {
        id: 'squareMetersNeeded',
        name: 'Square Meters Needed',
        type: 'number',
        placeholder: 'Enter square meters needed',
        unit: 'm²',
        defaultValue: 10
      }
    ]
  },
  {
    id: 'how-much-flooring',
    name: 'How Much Flooring Calculator',
    description: 'Calculate how much flooring or tiles you need for your project',
    category: 'home-garden',
    formula: 'Area = Length × Width, Total Area with Wastage = Area × (1 + Wastage%/100)',
    inputs: [
      {
        id: 'measurementUnit',
        name: 'Measurement Unit',
        type: 'select',
        options: [
          { value: 'meters', label: 'Meters' },
          { value: 'feet', label: 'Feet' },
          { value: 'yards', label: 'Yards' }
        ],
        defaultValue: 'meters'
      },
      {
        id: 'roomWidth',
        name: 'Room Width',
        type: 'number',
        placeholder: 'Enter room width',
        defaultValue: 4
      },
      {
        id: 'roomLength',
        name: 'Room Length',
        type: 'number',
        placeholder: 'Enter room length',
        defaultValue: 5
      },
      {
        id: 'wastagePercentage',
        name: 'Wastage Percentage',
        type: 'number',
        placeholder: 'Enter wastage percentage',
        unit: '%',
        defaultValue: 10
      }
    ]
  },
  {
    id: 'cubic-feet-calculator',
    name: 'Cubic Feet Calculator',
    description: 'Calculate volume in cubic feet and convert to other volume units',
    category: 'math',
    formula: 'Volume (ft³) = Length (ft) × Width (ft) × Height (ft)',
    inputs: [
      {
        id: 'length',
        name: 'Length',
        type: 'number',
        placeholder: 'Enter length in feet',
        unit: 'ft',
        defaultValue: 10
      },
      {
        id: 'width',
        name: 'Width',
        type: 'number',
        placeholder: 'Enter width in feet',
        unit: 'ft',
        defaultValue: 10
      },
      {
        id: 'height',
        name: 'Height',
        type: 'number',
        placeholder: 'Enter height in feet',
        unit: 'ft',
        defaultValue: 10
      }
    ]
  },
  {
    id: 'cubic-meters-calculator',
    name: 'Cubic Meters Calculator',
    description: 'Calculate volume in cubic meters and convert to other volume units',
    category: 'math',
    formula: 'Volume (m³) = Length (m) × Width (m) × Height (m)',
    inputs: [
      {
        id: 'length',
        name: 'Length',
        type: 'number',
        placeholder: 'Enter length in meters',
        unit: 'm',
        defaultValue: 10
      },
      {
        id: 'width',
        name: 'Width',
        type: 'number',
        placeholder: 'Enter width in meters',
        unit: 'm',
        defaultValue: 10
      },
      {
        id: 'height',
        name: 'Height',
        type: 'number',
        placeholder: 'Enter height in meters',
        unit: 'm',
        defaultValue: 10
      }
    ]
  },
  {
    id: 'cubic-yards-calculator',
    name: 'Cubic Yards Calculator',
    description: 'Calculate volume in cubic yards and convert to other volume units',
    category: 'math',
    formula: 'Volume (yd³) = Length (yd) × Width (yd) × Height (yd)',
    inputs: [
      {
        id: 'length',
        name: 'Length',
        type: 'number',
        placeholder: 'Enter length in yards',
        unit: 'yd',
        defaultValue: 10
      },
      {
        id: 'width',
        name: 'Width',
        type: 'number',
        placeholder: 'Enter width in yards',
        unit: 'yd',
        defaultValue: 10
      },
      {
        id: 'height',
        name: 'Height',
        type: 'number',
        placeholder: 'Enter height in yards',
        unit: 'yd',
        defaultValue: 10
      }
    ]
  },
  {
    id: 'electricity-cost-calculator',
    name: 'Electricity Cost Calculator',
    description: 'Calculate the cost of running your appliances and devices',
    category: 'utility',
    formula: 'Cost = Power (kW) × Time (hours) × Electricity Rate ($/kWh)',
    inputs: [
      {
        id: 'currency',
        name: 'Currency',
        type: 'select',
        options: [
          { value: 'USD', label: 'USD ($)' },
          { value: 'EUR', label: 'EUR (€)' },
          { value: 'GBP', label: 'GBP (£)' },
          { value: 'JPY', label: 'JPY (¥)' },
          { value: 'CAD', label: 'CAD (C$)' },
          { value: 'AUD', label: 'AUD (A$)' },
          { value: 'INR', label: 'INR (₹)' }
        ],
        defaultValue: 'USD'
      },
      {
        id: 'appliance',
        name: 'Appliance',
        type: 'select',
        options: [
          { value: 'custom', label: 'Custom Appliance' },
          { value: 'refrigerator', label: 'Refrigerator' },
          { value: 'freezer', label: 'Freezer' },
          { value: 'dishwasher', label: 'Dishwasher' },
          { value: 'washing_machine', label: 'Washing Machine' },
          { value: 'clothes_dryer', label: 'Clothes Dryer' },
          { value: 'oven', label: 'Electric Oven' },
          { value: 'microwave', label: 'Microwave' },
          { value: 'tv_led', label: 'LED TV (50")' },
          { value: 'desktop_computer', label: 'Desktop Computer' },
          { value: 'laptop', label: 'Laptop' },
          { value: 'air_conditioner', label: 'Air Conditioner' }
        ],
        defaultValue: 'refrigerator'
      },
      {
        id: 'powerConsumption',
        name: 'Power Consumption',
        type: 'number',
        placeholder: 'Enter power consumption',
        defaultValue: 150
      },
      {
        id: 'powerUnit',
        name: 'Power Unit',
        type: 'select',
        options: [
          { value: 'watts', label: 'Watts' },
          { value: 'kilowatts', label: 'Kilowatts' }
        ],
        defaultValue: 'watts'
      },
      {
        id: 'timeUsed',
        name: 'Time Used Per Day',
        type: 'number',
        placeholder: 'Enter time used per day',
        defaultValue: 24
      },
      {
        id: 'timeUnit',
        name: 'Time Unit',
        type: 'select',
        options: [
          { value: 'hours', label: 'Hours' },
          { value: 'minutes', label: 'Minutes' }
        ],
        defaultValue: 'hours'
      },
      {
        id: 'daysPerWeek',
        name: 'Days Used Per Week',
        type: 'select',
        options: [
          { value: '1', label: '1 day' },
          { value: '2', label: '2 days' },
          { value: '3', label: '3 days' },
          { value: '4', label: '4 days' },
          { value: '5', label: '5 days' },
          { value: '6', label: '6 days' },
          { value: '7', label: '7 days' }
        ],
        defaultValue: '7'
      },
      {
        id: 'electricityRate',
        name: 'Electricity Rate',
        type: 'number',
        placeholder: 'Enter electricity rate',
        unit: '/kWh',
        defaultValue: 0.15
      }
    ]
  },
  {
    id: 'miles-per-kwh-calculator',
    name: 'Miles per kWh Calculator',
    description: 'Calculate electric vehicle efficiency in miles per kWh, kWh per 100 miles, MPGe, and more',
    category: 'utility',
    inputs: [
      {
        id: 'distance',
        name: 'Distance Travelled',
        type: 'number',
        placeholder: 'Enter distance',
        unit: 'miles',
        defaultValue: 100
      },
      {
        id: 'energyUsed',
        name: 'Energy Used',
        type: 'number',
        placeholder: 'Enter energy used',
        unit: 'kWh',
        defaultValue: 25
      },
      {
        id: 'pricePerKwh',
        name: 'Price per kWh',
        type: 'number',
        placeholder: 'Enter price per kWh',
        unit: '$',
        defaultValue: 0.15
      }
    ]
  },
  {
    id: 'mpge-calculator',
    name: 'MPGe Calculator',
    description: 'Calculate Miles Per Gallon equivalent (MPGe) for electric vehicles',
    category: 'utility',
    inputs: [
      {
        id: 'milesPerKwh',
        name: 'Miles per kWh',
        type: 'number',
        placeholder: 'Enter miles per kWh',
        unit: 'mi/kWh',
        defaultValue: 4
      },
      {
        id: 'kwhPer100Miles',
        name: 'kWh per 100 Miles',
        type: 'number',
        placeholder: 'Enter kWh per 100 miles',
        unit: 'kWh/100mi',
        defaultValue: 25
      }
    ]
  },
  {
    id: 'led-savings-calculator',
    name: 'LED Savings Calculator',
    description: 'Calculate how much you can save by switching to LED bulbs',
    category: 'home-garden',
    inputs: [
      {
        id: 'bulbQuantity',
        name: 'Quantity of Bulbs',
        type: 'number',
        placeholder: 'Enter number of bulbs',
        defaultValue: 10
      },
      {
        id: 'existingWattage',
        name: 'Existing Bulb Wattage',
        type: 'number',
        placeholder: 'Enter wattage',
        unit: 'W',
        defaultValue: 60
      },
      {
        id: 'ledWattage',
        name: 'LED Bulb Wattage',
        type: 'number',
        placeholder: 'Enter wattage',
        unit: 'W',
        defaultValue: 9
      },
      {
        id: 'hoursPerDay',
        name: 'Hours Used Per Day',
        type: 'number',
        placeholder: 'Enter hours',
        unit: 'hrs',
        defaultValue: 5
      },
      {
        id: 'energyCost',
        name: 'Energy Cost Per kWh',
        type: 'number',
        placeholder: 'Enter cost',
        unit: '¢/kWh',
        defaultValue: 15
      }
    ]
  },
  {
    id: 'mulch-calculator',
    name: 'Mulch Calculator',
    description: 'Calculate how much mulch you need for your garden or landscaping project',
    category: 'home-garden',
    inputs: [
      {
        id: 'area',
        name: 'Area',
        type: 'number',
        placeholder: 'Enter area',
        unit: 'ft²',
        defaultValue: 100
      },
      {
        id: 'depth',
        name: 'Depth',
        type: 'number',
        placeholder: 'Enter depth',
        unit: 'in',
        defaultValue: 3
      }
    ]
  },
  {
    id: 'gravel-calculator',
    name: 'Gravel Calculator',
    description: 'Calculate how much gravel, sand, or gravel-sand mix you need for your project',
    category: 'home-garden',
    inputs: [
      {
        id: 'width',
        name: 'Width',
        type: 'number',
        placeholder: 'Enter width',
        unit: 'ft',
        defaultValue: 10
      },
      {
        id: 'length',
        name: 'Length',
        type: 'number',
        placeholder: 'Enter length',
        unit: 'ft',
        defaultValue: 10
      },
      {
        id: 'depth',
        name: 'Depth',
        type: 'number',
        placeholder: 'Enter depth',
        unit: 'in',
        defaultValue: 2
      },
      {
        id: 'material',
        name: 'Material',
        type: 'select',
        options: [
          { value: 'gravel', label: 'Gravel (1/4"-2")' },
          { value: 'gravelSand', label: 'Gravel-Sand Mix' },
          { value: 'sand', label: 'Sand' }
        ],
        defaultValue: 'gravel'
      }
    ]
  },
  {
    id: 'square-footage',
    name: 'Square Footage Calculator',
    description: 'Calculate the square footage of your home or individual rooms',
    category: 'home-garden',
    inputs: [
      {
        id: 'width',
        name: 'Width',
        type: 'number',
        placeholder: 'Enter width',
        unit: 'ft',
        defaultValue: 10
      },
      {
        id: 'length',
        name: 'Length',
        type: 'number',
        placeholder: 'Enter length',
        unit: 'ft',
        defaultValue: 10
      }
    ]
  },
  {
    id: 'bmr-calculator',
    name: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate',
    category: 'health',
    url: '/health/bmr-calculator',
    inputs: [
      {
        id: 'age',
        name: 'Age',
        type: 'number',
        placeholder: 'Enter your age',
        unit: 'years',
        defaultValue: 30
      },
      {
        id: 'gender',
        name: 'Gender',
        type: 'select',
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' }
        ],
        defaultValue: 'male'
      },
      {
        id: 'weight',
        name: 'Weight',
        type: 'number',
        placeholder: 'Enter your weight',
        unit: 'kg',
        defaultValue: 70
      },
      {
        id: 'height',
        name: 'Height',
        type: 'number',
        placeholder: 'Enter your height',
        unit: 'cm',
        defaultValue: 175
      }
    ]
  },
  {
    id: 'how-long-to-walk-a-mile',
    name: 'How Long to Walk a Mile',
    description: 'Estimate how long it takes to walk a mile based on pace',
    category: 'health',
    url: '/health/how-long-to-walk-a-mile',
    inputs: [
      {
        id: 'pace',
        name: 'Walking Pace',
        type: 'number',
        placeholder: 'Enter your walking pace',
        unit: 'mph',
        defaultValue: 3
      },
      {
        id: 'age',
        name: 'Age',
        type: 'number',
        placeholder: 'Enter your age',
        unit: 'years',
        defaultValue: 30
      },
      {
        id: 'fitness',
        name: 'Fitness Level',
        type: 'select',
        options: [
          { value: 'beginner', label: 'Beginner' },
          { value: 'average', label: 'Average' },
          { value: 'fit', label: 'Fit' },
          { value: 'athletic', label: 'Athletic' }
        ],
        defaultValue: 'average'
      }
    ]
  },
  {
    id: 'how-many-steps-in-a-mile',
    name: 'How Many Steps in a Mile',
    description: 'Convert miles to steps based on stride length',
    category: 'health',
    url: '/health/how-many-steps-in-a-mile',
    inputs: [
      {
        id: 'height',
        name: 'Height',
        type: 'number',
        placeholder: 'Enter your height',
        unit: 'cm',
        defaultValue: 175
      },
      {
        id: 'gender',
        name: 'Gender',
        type: 'select',
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' }
        ],
        defaultValue: 'male'
      },
      {
        id: 'stride',
        name: 'Stride Length',
        type: 'number',
        placeholder: 'Enter your stride length',
        unit: 'inches',
        defaultValue: 30
      }
    ]
  },
  {
    id: 'kilojoules-to-calories',
    name: 'Kilojoules to Calories',
    description: 'Convert kilojoules to calories for nutritional tracking',
    category: 'health',
    url: '/health/kilojoules-to-calories',
    inputs: [
      {
        id: 'kilojoules',
        name: 'Kilojoules',
        type: 'number',
        placeholder: 'Enter kilojoules',
        unit: 'kJ',
        defaultValue: 1000
      },
      {
        id: 'calorie-type',
        name: 'Calorie Type',
        type: 'select',
        options: [
          { value: 'food', label: 'Food Calories (kcal)' },
          { value: 'small', label: 'Small Calories (cal)' }
        ],
        defaultValue: 'food'
      },
      {
        id: 'precision',
        name: 'Decimal Precision',
        type: 'select',
        options: [
          { value: '0', label: '0 decimal places' },
          { value: '1', label: '1 decimal place' },
          { value: '2', label: '2 decimal places' },
          { value: '3', label: '3 decimal places' },
          { value: '4', label: '4 decimal places' }
        ],
        defaultValue: '2'
      }
    ]
  },
  {
    id: 'miles-to-steps',
    name: 'Miles to Steps',
    description: 'Convert miles to steps for fitness tracking',
    category: 'health',
    url: '/health/miles-to-steps',
    inputs: [
      {
        id: 'steps',
        name: 'Number of Steps',
        type: 'number',
        placeholder: 'Enter number of steps',
        defaultValue: 10000
      },
      {
        id: 'height',
        name: 'Height',
        type: 'number',
        placeholder: 'Enter your height',
        unit: 'ft',
        defaultValue: 5.6
      },
      {
        id: 'gender',
        name: 'Gender',
        type: 'select',
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' }
        ],
        defaultValue: 'male'
      }
    ]
  },
  {
    id: 'pregnancy-calculator',
    name: 'Pregnancy Calculator',
    description: 'Calculate due date and pregnancy milestones',
    category: 'health',
    url: '/health/pregnancy-calculator',
    inputs: [
      {
        id: 'lmp-date',
        name: 'Last Menstrual Period',
        type: 'text',
        placeholder: 'Enter date of last period',
        defaultValue: ''
      },
      {
        id: 'cycle-length',
        name: 'Cycle Length',
        type: 'number',
        placeholder: 'Enter cycle length',
        unit: 'days',
        defaultValue: 28
      }
    ]
  },
  {
    id: 'sobriety-calculator',
    name: 'Sobriety Calculator',
    description: 'Track days of sobriety and milestones',
    category: 'health',
    url: '/health/sobriety-calculator',
    inputs: [
      {
        id: 'sobriety-date',
        name: 'Sobriety Start Date',
        type: 'text',
        placeholder: 'Enter your sobriety date',
        defaultValue: ''
      }
    ]
  },
  {
    id: 'steps-to-calories',
    name: 'Steps to Calories',
    description: 'Estimate calories burned based on step count',
    category: 'health',
    url: '/health/steps-to-calories',
    inputs: [
      {
        id: 'steps',
        name: 'Number of Steps',
        type: 'number',
        placeholder: 'Enter number of steps',
        defaultValue: 10000
      },
      {
        id: 'weight',
        name: 'Weight',
        type: 'number',
        placeholder: 'Enter your weight',
        unit: 'lbs',
        defaultValue: 150
      },
      {
        id: 'intensity',
        name: 'Walking Intensity',
        type: 'select',
        options: [
          { value: 'casual', label: 'Casual' },
          { value: 'average', label: 'Average' },
          { value: 'brisk', label: 'Brisk' },
          { value: 'power', label: 'Power' }
        ],
        defaultValue: 'average'
      }
    ]
  },
  {
    id: 'steps-to-km',
    name: 'Steps to Km',
    description: 'Convert steps to kilometers based on stride length',
    category: 'health',
    url: '/health/steps-to-km',
    inputs: [
      {
        id: 'steps',
        name: 'Number of Steps',
        type: 'number',
        placeholder: 'Enter number of steps',
        defaultValue: 10000
      },
      {
        id: 'height',
        name: 'Height',
        type: 'number',
        placeholder: 'Enter your height',
        unit: 'cm',
        defaultValue: 175
      },
      {
        id: 'gender',
        name: 'Gender',
        type: 'select',
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' }
        ],
        defaultValue: 'male'
      }
    ]
  },
  {
    id: 'baking-conversion',
    name: 'Baking Conversion Calculator',
    description: 'Convert baking ingredients between cups, grams, ounces, pounds, tablespoons, and teaspoons.',
    category: 'food-cooking',
    icon: 'utensils',
    url: '/calculator/baking-conversions',
    inputs: [
      {
        id: 'amount',
        name: 'Amount',
        type: 'number',
        placeholder: 'Enter amount',
        defaultValue: 1
      },
      {
        id: 'ingredient',
        name: 'Ingredient',
        type: 'select',
        options: [
          { value: 'all-purpose-flour', label: 'All-Purpose Flour' },
          { value: 'bread-flour', label: 'Bread Flour' },
          { value: 'cake-flour', label: 'Cake Flour' },
          { value: 'granulated-sugar', label: 'Granulated Sugar' },
          { value: 'brown-sugar', label: 'Brown Sugar (packed)' },
          { value: 'butter', label: 'Butter' }
        ],
        defaultValue: 'all-purpose-flour'
      },
      {
        id: 'from-unit',
        name: 'From',
        type: 'select',
        options: [
          { value: 'cups', label: 'Cups' },
          { value: 'grams', label: 'Grams' },
          { value: 'ounces', label: 'Ounces' },
          { value: 'tablespoons', label: 'Tablespoons' },
          { value: 'teaspoons', label: 'Teaspoons' }
        ],
        defaultValue: 'cups'
      },
      {
        id: 'to-unit',
        name: 'To',
        type: 'select',
        options: [
          { value: 'grams', label: 'Grams' },
          { value: 'cups', label: 'Cups' },
          { value: 'ounces', label: 'Ounces' },
          { value: 'tablespoons', label: 'Tablespoons' },
          { value: 'teaspoons', label: 'Teaspoons' }
        ],
        defaultValue: 'grams'
      }
    ]
  },
  {
    id: 'cooking-converter',
    name: 'Cooking Measurement Converter',
    description: 'Convert between cooking measurements like cups, tablespoons, teaspoons, milliliters, fluid ounces, and more.',
    category: 'food-cooking',
    icon: 'utensils',
    url: '/calculator/cooking-converter',
    inputs: [
      {
        id: 'amount',
        name: 'Amount',
        type: 'number',
        placeholder: 'Enter amount',
        defaultValue: 1
      },
      {
        id: 'from-unit',
        name: 'From',
        type: 'select',
        options: [
          { value: 'cup', label: 'Cup (US)' },
          { value: 'tablespoon', label: 'Tablespoon (US)' },
          { value: 'teaspoon', label: 'Teaspoon (US)' },
          { value: 'milliliter', label: 'Milliliter' },
          { value: 'fluid_ounce', label: 'Fluid Ounce (US)' }
        ],
        defaultValue: 'cup'
      },
      {
        id: 'to-unit',
        name: 'To',
        type: 'select',
        options: [
          { value: 'milliliter', label: 'Milliliter' },
          { value: 'cup', label: 'Cup (US)' },
          { value: 'tablespoon', label: 'Tablespoon (US)' },
          { value: 'teaspoon', label: 'Teaspoon (US)' },
          { value: 'fluid_ounce', label: 'Fluid Ounce (US)' }
        ],
        defaultValue: 'milliliter'
      }
    ]
  },
  {
    id: 'air-fryer-converter',
    name: 'Air Fryer Converter',
    description: 'Convert conventional and fan oven cooking times and temperatures to air fryer settings.',
    category: 'food-cooking',
    icon: 'utensils',
    url: '/calculator/air-fryer-converter',
    inputs: [
      {
        id: 'oven-type',
        name: 'Oven Type',
        type: 'select',
        options: [
          { value: 'conventional', label: 'Conventional' },
          { value: 'fan', label: 'Fan/Convection' }
        ],
        defaultValue: 'conventional'
      },
      {
        id: 'temp-unit',
        name: 'Temperature Unit',
        type: 'select',
        options: [
          { value: 'celsius', label: 'Celsius (°C)' },
          { value: 'fahrenheit', label: 'Fahrenheit (°F)' }
        ],
        defaultValue: 'celsius'
      },
      {
        id: 'oven-temp',
        name: 'Oven Temperature',
        type: 'number',
        placeholder: 'Enter oven temperature',
        unit: '°C',
        defaultValue: 180
      },
      {
        id: 'cooking-time',
        name: 'Cooking Time',
        type: 'number',
        placeholder: 'Enter cooking time',
        unit: 'minutes',
        defaultValue: 30
      },
      {
        id: 'food-type',
        name: 'Food Type',
        type: 'select',
        options: [
          { value: 'meat', label: 'Meat (beef, pork, lamb)' },
          { value: 'poultry', label: 'Poultry' },
          { value: 'fish', label: 'Fish & Seafood' },
          { value: 'vegetables', label: 'Vegetables' },
          { value: 'baked_goods', label: 'Baked Goods' },
          { value: 'frozen_foods', label: 'Frozen Foods' }
        ],
        defaultValue: 'meat'
      }
    ]
  },
];

// Helper function to get calculator by ID
export const getCalculatorById = (id: string): Calculator | undefined => {
  return calculators.find(calc => calc.id === id);
};

// Helper function to get calculators by category
export const getCalculatorsByCategory = (categoryId: string): Calculator[] => {
  return calculators.filter(calc => calc.category === categoryId);
}; 