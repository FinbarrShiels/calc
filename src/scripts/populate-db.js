const sqlite3 = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'calculators.db');
const db = new sqlite3(dbPath);

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS calculators (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    url TEXT NOT NULL,
    keywords TEXT
  );
`);

// Sample calculators data - comprehensive list
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
    id: 'salary-calculator',
    name: 'Salary Calculator',
    description: 'Calculate take-home pay after taxes and deductions',
    category: 'finance',
    url: '/finance/salary-calculator',
    keywords: 'salary, wage, income, pay, tax'
  },
  {
    id: 'tax-calculator',
    name: 'Tax Calculator',
    description: 'Estimate your income tax based on your earnings',
    category: 'finance',
    url: '/finance/tax-calculator',
    keywords: 'tax, income, return, deduction, filing'
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
  {
    id: 'roi-calculator',
    name: 'ROI Calculator',
    description: 'Calculate return on investment for your business or projects',
    category: 'finance',
    url: '/finance/roi-calculator',
    keywords: 'roi, return, investment, profit, business'
  },
  {
    id: 'inflation-calculator',
    name: 'Inflation Calculator',
    description: 'Calculate the impact of inflation on your money over time',
    category: 'finance',
    url: '/finance/inflation-calculator',
    keywords: 'inflation, money, value, purchasing power, economy'
  },
  {
    id: 'net-worth-calculator',
    name: 'Net Worth Calculator',
    description: 'Calculate your total net worth by adding assets and subtracting liabilities',
    category: 'finance',
    url: '/finance/net-worth-calculator',
    keywords: 'net worth, assets, liabilities, wealth, financial health'
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
  {
    id: 'macro-calculator',
    name: 'Macro Calculator',
    description: 'Calculate your macronutrient needs for your diet goals',
    category: 'health',
    url: '/health/macro-calculator',
    keywords: 'macros, protein, carbs, fat, nutrition'
  },
  {
    id: 'protein-calculator',
    name: 'Protein Calculator',
    description: 'Calculate your daily protein needs based on your weight and activity level',
    category: 'health',
    url: '/health/protein-calculator',
    keywords: 'protein, nutrition, diet, muscle, fitness'
  },
  {
    id: 'weight-loss-calculator',
    name: 'Weight Loss Calculator',
    description: 'Calculate calorie deficit needed to reach your weight loss goals',
    category: 'health',
    url: '/health/weight-loss-calculator',
    keywords: 'weight loss, diet, calories, deficit, fat loss'
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
    id: 'feet-to-meters',
    name: 'Feet to Meters',
    description: 'Convert feet to meters',
    category: 'unit-converters',
    url: '/unit-converters/feet-to-meters',
    keywords: 'feet, meters, length, height, conversion'
  },
  {
    id: 'inches-to-centimeters',
    name: 'Inches to Centimeters',
    description: 'Convert inches to centimeters',
    category: 'unit-converters',
    url: '/unit-converters/inches-to-centimeters',
    keywords: 'inches, cm, length, measurement, conversion'
  },
  {
    id: 'inches-to-feet',
    name: 'Inches to Feet',
    description: 'Convert inches to feet',
    category: 'unit-converters',
    url: '/unit-converters/inches-to-feet',
    keywords: 'inches, feet, length, height, conversion'
  },
  {
    id: 'meters-to-feet-inches',
    name: 'Meters to Feet & Inches',
    description: 'Convert meters to feet and inches',
    category: 'unit-converters',
    url: '/unit-converters/meters-to-feet-inches',
    keywords: 'meters, feet, inches, length, height'
  },
  {
    id: 'mm-to-inches',
    name: 'mm to Inches',
    description: 'Convert millimeters to inches',
    category: 'unit-converters',
    url: '/unit-converters/mm-to-inches',
    keywords: 'mm, inches, length, measurement, conversion'
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
    id: 'kilos-to-stone-lb',
    name: 'Kilos to Stone & lb',
    description: 'Convert kilograms to stone and pounds',
    category: 'unit-converters',
    url: '/unit-converters/kilos-to-stone-lb',
    keywords: 'kg, stone, pounds, weight, conversion'
  },
  {
    id: 'kilos-to-pounds',
    name: 'Kilos to Pounds',
    description: 'Convert kilograms to pounds',
    category: 'unit-converters',
    url: '/unit-converters/kilos-to-pounds',
    keywords: 'kg, pounds, weight, mass, conversion'
  },
  {
    id: 'ounces-to-pounds',
    name: 'Ounces to Pounds',
    description: 'Convert ounces to pounds',
    category: 'unit-converters',
    url: '/unit-converters/ounces-to-pounds',
    keywords: 'ounces, pounds, weight, mass, conversion'
  },
  {
    id: 'stone-to-pounds',
    name: 'Stone to Pounds',
    description: 'Convert stone to pounds',
    category: 'unit-converters',
    url: '/unit-converters/stone-to-pounds',
    keywords: 'stone, pounds, weight, mass, conversion'
  },
  {
    id: 'cubic-feet-to-gallons',
    name: 'Cubic Feet to Gallons',
    description: 'Convert cubic feet to gallons',
    category: 'unit-converters',
    url: '/unit-converters/cubic-feet-to-gallons',
    keywords: 'cubic feet, gallons, volume, conversion, liquid'
  },
  {
    id: 'gallons-to-ounces',
    name: 'Gallons to Ounces',
    description: 'Convert gallons to fluid ounces',
    category: 'unit-converters',
    url: '/unit-converters/gallons-to-ounces',
    keywords: 'gallons, ounces, volume, liquid, conversion'
  },
  {
    id: 'liters-to-gallons',
    name: 'Liters to Gallons',
    description: 'Convert liters to gallons',
    category: 'unit-converters',
    url: '/unit-converters/liters-to-gallons',
    keywords: 'liters, gallons, volume, liquid, conversion'
  },
  {
    id: 'liters-to-ounces',
    name: 'Liters to Ounces',
    description: 'Convert liters to fluid ounces',
    category: 'unit-converters',
    url: '/unit-converters/liters-to-ounces',
    keywords: 'liters, ounces, volume, liquid, conversion'
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
    id: 'data-transfer-rate',
    name: 'Data Transfer Rate Converter',
    description: 'Convert between bits per second, bytes per second, and more',
    category: 'utility-converters',
    url: '/utility-converters/data-transfer-rate',
    keywords: 'bps, mbps, bandwidth, internet, speed'
  },
  {
    id: 'energy',
    name: 'Energy Converter',
    description: 'Convert between joules, calories, kilowatt-hours, and more',
    category: 'utility-converters',
    url: '/utility-converters/energy',
    keywords: 'energy, joules, calories, power, conversion'
  },
  {
    id: 'fuel-consumption',
    name: 'Fuel Consumption Converter',
    description: 'Convert between miles per gallon, kilometers per liter, and more',
    category: 'utility-converters',
    url: '/utility-converters/fuel-consumption',
    keywords: 'mpg, km/l, fuel, efficiency, gas'
  },
  {
    id: 'power',
    name: 'Power Converter',
    description: 'Convert between watts, horsepower, kilowatts, and more',
    category: 'utility-converters',
    url: '/utility-converters/power',
    keywords: 'power, watts, hp, energy, conversion'
  },
  {
    id: 'pressure',
    name: 'Pressure Converter',
    description: 'Convert between pascals, bars, psi, atmospheres, and more',
    category: 'utility-converters',
    url: '/utility-converters/pressure',
    keywords: 'pressure, pascal, bar, psi, atmosphere'
  },
  {
    id: 'temperature',
    name: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, Kelvin, and more',
    category: 'utility-converters',
    url: '/utility-converters/temperature',
    keywords: 'temperature, celsius, fahrenheit, kelvin, conversion'
  },
  {
    id: 'time',
    name: 'Time Converter',
    description: 'Convert between seconds, minutes, hours, days, and more',
    category: 'utility-converters',
    url: '/utility-converters/time',
    keywords: 'time, seconds, minutes, hours, days'
  },
  {
    id: 'velocity',
    name: 'Velocity Converter',
    description: 'Convert between meters per second, miles per hour, and more',
    category: 'utility-converters',
    url: '/utility-converters/velocity',
    keywords: 'velocity, speed, m/s, mph, km/h'
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
    id: 'cubic-yards-calculator',
    name: 'Cubic Yards Calculator',
    description: 'Calculate volume in cubic yards for landscaping materials',
    category: 'home-garden',
    url: '/home-garden/cubic-yards-calculator',
    keywords: 'cubic, yards, volume, landscaping, materials'
  },
  {
    id: 'electricity-cost-calculator',
    name: 'Electricity Cost Calculator',
    description: 'Estimate electricity costs for appliances and devices',
    category: 'home-garden',
    url: '/home-garden/electricity-cost-calculator',
    keywords: 'electricity, cost, power, bill, energy'
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
    id: 'how-much-flooring',
    name: 'How Much Flooring',
    description: 'Calculate flooring materials needed for your space',
    category: 'home-garden',
    url: '/home-garden/how-much-flooring',
    keywords: 'flooring, tiles, hardwood, laminate, renovation'
  },
  {
    id: 'led-savings-calculator',
    name: 'LED Savings Calculator',
    description: 'Calculate energy savings from switching to LED lighting',
    category: 'home-garden',
    url: '/home-garden/led-savings-calculator',
    keywords: 'led, lighting, energy, savings, electricity'
  },
  {
    id: 'mulch-calculator',
    name: 'Mulch Calculator',
    description: 'Calculate how much mulch you need for your garden beds',
    category: 'home-garden',
    url: '/home-garden/mulch-calculator',
    keywords: 'mulch, garden, landscaping, volume, materials'
  },
  {
    id: 'square-footage',
    name: 'Square Footage',
    description: 'Calculate the square footage of rooms and spaces',
    category: 'home-garden',
    url: '/home-garden/square-footage',
    keywords: 'square footage, area, room, space, measurement'
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
    id: 'air-fryer-converter',
    name: 'Air Fryer Converter',
    description: 'Convert traditional oven recipes for air fryer cooking',
    category: 'cooking',
    url: '/cooking/air-fryer-converter',
    keywords: 'air fryer, oven, temperature, time, cooking'
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
    id: 'butter-converter',
    name: 'Butter Converter',
    description: 'Convert between sticks, cups, tablespoons, and grams of butter',
    category: 'cooking',
    url: '/cooking/butter-converter',
    keywords: 'butter, sticks, cups, tablespoons, grams'
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
  },
  {
    id: 'cups-to-ounces',
    name: 'Cups to Ounces',
    description: 'Convert cups to fluid ounces or weight ounces',
    category: 'cooking',
    url: '/cooking/cups-to-ounces',
    keywords: 'cups, ounces, volume, weight, conversion'
  },
  {
    id: 'cups-to-tablespoons',
    name: 'Cups to Tablespoons',
    description: 'Convert cups to tablespoons for precise measurements',
    category: 'cooking',
    url: '/cooking/cups-to-tablespoons',
    keywords: 'cups, tablespoons, volume, measurement, cooking'
  },
  {
    id: 'grams-to-cups',
    name: 'Grams to Cups',
    description: 'Convert gram measurements to cups for various ingredients',
    category: 'cooking',
    url: '/cooking/grams-to-cups',
    keywords: 'grams, cups, weight, volume, conversion'
  },
  {
    id: 'grams-to-ounces',
    name: 'Grams to Ounces',
    description: 'Convert grams to ounces for weight measurements',
    category: 'cooking',
    url: '/cooking/grams-to-ounces',
    keywords: 'grams, ounces, weight, conversion, measurement'
  },
  {
    id: 'oven-temperatures',
    name: 'Oven Temperatures',
    description: 'Convert between Fahrenheit, Celsius, and gas mark oven temperatures',
    category: 'cooking',
    url: '/cooking/oven-temperatures',
    keywords: 'oven, temperature, fahrenheit, celsius, gas mark'
  }
];

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

// Close the database connection
db.close(); 