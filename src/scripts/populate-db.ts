import { getDb } from '../lib/db';

// Categories of calculators
const categories = [
  'finance',
  'health',
  'unit-converters',
  'utility-converters',
  'home-garden',
  'cooking'
];

// Sample calculators data
const calculators = [
  // Finance calculators
  {
    id: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    description: 'Calculate how your investments grow over time with compound interest',
    category: 'finance',
    url: '/finance/compound-interest-calculator',
    keywords: 'interest, investment, money, savings, growth'
  },
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Estimate your monthly mortgage payments and amortization schedule',
    category: 'finance',
    url: '/finance/mortgage-calculator',
    keywords: 'mortgage, loan, home, house, payment'
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate loan payments, interest, and amortization schedules',
    category: 'finance',
    url: '/finance/loan-calculator',
    keywords: 'loan, borrow, interest, payment, debt'
  },
  {
    id: 'investment-calculator',
    name: 'Investment Calculator',
    description: 'Plan your investments and calculate potential returns',
    category: 'finance',
    url: '/finance/investment-calculator',
    keywords: 'invest, return, money, growth, portfolio'
  },
  {
    id: 'retirement-calculator',
    name: 'Retirement Calculator',
    description: 'Plan for retirement and calculate how much you need to save',
    category: 'finance',
    url: '/finance/retirement-calculator',
    keywords: 'retire, pension, savings, future, planning'
  },
  {
    id: 'overtime-calculator',
    name: 'Overtime Calculator',
    description: 'Calculate overtime pay based on regular hours and overtime rates',
    category: 'finance',
    url: '/finance/overtime-calculator',
    keywords: 'overtime, salary, wage, pay, hours'
  },
  {
    id: 'time-and-a-half-calculator',
    name: 'Time and a Half Calculator',
    description: 'Calculate time and a half pay for overtime hours',
    category: 'finance',
    url: '/finance/time-and-a-half-calculator',
    keywords: 'overtime, salary, wage, pay, hours'
  },
  
  // Health calculators
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and assess your weight category',
    category: 'health',
    url: '/health/bmi-calculator',
    keywords: 'bmi, weight, height, body mass, health'
  },
  {
    id: 'calorie-calculator',
    name: 'Calorie Calculator',
    description: 'Calculate your daily calorie needs based on your activity level',
    category: 'health',
    url: '/health/calorie-calculator',
    keywords: 'calories, diet, nutrition, weight, metabolism'
  },
  {
    id: 'body-fat-calculator',
    name: 'Body Fat Calculator',
    description: 'Estimate your body fat percentage using different methods',
    category: 'health',
    url: '/health/body-fat-calculator',
    keywords: 'fat, weight, fitness, health, body composition'
  },
  
  // Unit converters
  {
    id: 'centimeters-to-feet',
    name: 'Centimeters to Feet',
    description: 'Convert centimeters to feet and inches',
    category: 'unit-converters',
    url: '/unit-converters/centimeters-to-feet',
    keywords: 'cm, feet, length, height, conversion'
  },
  {
    id: 'centimeters-to-inches',
    name: 'Centimeters to Inches',
    description: 'Convert centimeters to inches',
    category: 'unit-converters',
    url: '/unit-converters/centimeters-to-inches',
    keywords: 'cm, inches, length, measurement, conversion'
  },
  {
    id: 'feet-to-inches',
    name: 'Feet to Inches',
    description: 'Convert feet to inches',
    category: 'unit-converters',
    url: '/unit-converters/feet-to-inches',
    keywords: 'feet, inches, length, height, conversion'
  },
  {
    id: 'grams-to-pounds',
    name: 'Grams to Pounds',
    description: 'Convert grams to pounds',
    category: 'unit-converters',
    url: '/unit-converters/grams-to-pounds',
    keywords: 'grams, pounds, weight, mass, conversion'
  },
  {
    id: 'kilos-to-pounds',
    name: 'Kilos to Pounds',
    description: 'Convert kilograms to pounds',
    category: 'unit-converters',
    url: '/unit-converters/kilos-to-pounds',
    keywords: 'kg, pounds, weight, mass, conversion'
  },
  
  // Utility converters
  {
    id: 'acceleration',
    name: 'Acceleration Converter',
    description: 'Convert between different units of acceleration',
    category: 'utility-converters',
    url: '/utility-converters/acceleration',
    keywords: 'acceleration, speed, velocity, physics, conversion'
  },
  {
    id: 'area',
    name: 'Area Converter',
    description: 'Convert between square meters, square feet, acres, and more',
    category: 'utility-converters',
    url: '/utility-converters/area',
    keywords: 'area, square, meters, feet, acres'
  },
  {
    id: 'data-storage',
    name: 'Data Storage Converter',
    description: 'Convert between bytes, kilobytes, megabytes, gigabytes, and more',
    category: 'utility-converters',
    url: '/utility-converters/data-storage',
    keywords: 'bytes, kb, mb, gb, storage'
  },
  {
    id: 'energy',
    name: 'Energy Converter',
    description: 'Convert between joules, calories, kilowatt-hours, and more',
    category: 'utility-converters',
    url: '/utility-converters/energy',
    keywords: 'energy, joules, calories, power, conversion'
  },
  
  // Home & Garden calculators
  {
    id: 'cubic-feet-calculator',
    name: 'Cubic Feet Calculator',
    description: 'Calculate volume in cubic feet for various shapes',
    category: 'home-garden',
    url: '/home-garden/cubic-feet-calculator',
    keywords: 'cubic, feet, volume, space, measurement'
  },
  {
    id: 'cubic-meters-calculator',
    name: 'Cubic Meters Calculator',
    description: 'Calculate volume in cubic meters for various shapes',
    category: 'home-garden',
    url: '/home-garden/cubic-meters-calculator',
    keywords: 'cubic, meters, volume, space, measurement'
  },
  {
    id: 'gravel-calculator',
    name: 'Gravel Calculator',
    description: 'Calculate how much gravel you need for your project',
    category: 'home-garden',
    url: '/home-garden/gravel-calculator',
    keywords: 'gravel, landscaping, garden, volume, materials'
  },
  {
    id: 'mulch-calculator',
    name: 'Mulch Calculator',
    description: 'Calculate how much mulch you need for your garden beds',
    category: 'home-garden',
    url: '/home-garden/mulch-calculator',
    keywords: 'mulch, garden, landscaping, volume, materials'
  },
  
  // Cooking converters
  {
    id: 'cooking-converter',
    name: 'Cooking Converter',
    description: 'Convert between various cooking measurements',
    category: 'cooking',
    url: '/cooking/cooking-converter',
    keywords: 'cooking, measurement, kitchen, recipe, conversion'
  },
  {
    id: 'baking-conversions',
    name: 'Baking Conversions',
    description: 'Convert common baking measurements',
    category: 'cooking',
    url: '/cooking/baking-conversions',
    keywords: 'baking, measurement, kitchen, recipe, conversion'
  },
  {
    id: 'cups-to-grams',
    name: 'Cups to Grams',
    description: 'Convert cup measurements to grams for various ingredients',
    category: 'cooking',
    url: '/cooking/cups-to-grams',
    keywords: 'cups, grams, cooking, baking, measurement'
  },
  {
    id: 'cups-to-ml',
    name: 'Cups to mL',
    description: 'Convert cups to milliliters for liquid ingredients',
    category: 'cooking',
    url: '/cooking/cups-to-ml',
    keywords: 'cups, ml, liquid, volume, measurement'
  }
];

// Populate the database
function populateDatabase() {
  const db = getDb();
  
  // Clear existing data
  db.prepare('DELETE FROM calculators').run();
  
  // Insert calculators
  const insert = db.prepare(`
    INSERT INTO calculators (id, name, description, category, url, keywords)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  calculators.forEach(calc => {
    insert.run(
      calc.id,
      calc.name,
      calc.description,
      calc.category,
      calc.url,
      calc.keywords
    );
  });
  
  console.log(`Populated database with ${calculators.length} calculators`);
}

// Run the population script
populateDatabase(); 