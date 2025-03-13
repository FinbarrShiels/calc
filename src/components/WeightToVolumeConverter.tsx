'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from '@/data/calculators';
import { decimalInputProps } from '@/utils/inputUtils';


interface WeightToVolumeConverterProps {
  calculator?: Calculator;
}

interface MaterialCategory {
  id: string;
  name: string;
  materials: Material[];
}

interface Material {
  id: string;
  name: string;
  density: number; // kg/L
}

const WeightToVolumeConverter: React.FC<WeightToVolumeConverterProps> = ({ calculator }) => {
  // Input state
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('kg');
  const [toUnit, setToUnit] = useState<string>('l');
  const [precision, setPrecision] = useState<number>(2);
  const [materialCategory, setMaterialCategory] = useState<string>('liquids');
  const [materialId, setMaterialId] = useState<string>('water');
  
  // Result state
  const [result, setResult] = useState<number>(0);
  
  // Material categories and densities
  const materialCategories: MaterialCategory[] = [
    {
      id: 'liquids',
      name: 'Liquids',
      materials: [
        { id: 'water', name: 'Water', density: 1.0 },
        { id: 'milk', name: 'Milk', density: 1.03 },
        { id: 'oil_vegetable', name: 'Oil (Vegetable)', density: 0.92 },
        { id: 'oil_olive', name: 'Oil (Olive)', density: 0.92 },
        { id: 'gasoline', name: 'Gasoline', density: 0.75 },
        { id: 'diesel', name: 'Diesel', density: 0.85 },
        { id: 'honey', name: 'Honey', density: 1.42 },
        { id: 'alcohol_ethyl', name: 'Alcohol (Ethyl)', density: 0.79 },
      ]
    },
    {
      id: 'materials',
      name: 'Building Materials',
      materials: [
        { id: 'concrete', name: 'Concrete', density: 2.4 },
        { id: 'brick', name: 'Brick', density: 1.9 },
        { id: 'cement', name: 'Cement', density: 1.44 },
        { id: 'sand_dry', name: 'Sand (Dry)', density: 1.6 },
        { id: 'sand_wet', name: 'Sand (Wet)', density: 2.08 },
        { id: 'gravel', name: 'Gravel', density: 1.68 },
        { id: 'soil', name: 'Soil (General)', density: 1.2 },
        { id: 'asphalt', name: 'Asphalt', density: 2.24 },
      ]
    },
    {
      id: 'woods',
      name: 'Woods',
      materials: [
        { id: 'wood_oak', name: 'Oak', density: 0.77 },
        { id: 'wood_pine', name: 'Pine', density: 0.55 },
        { id: 'wood_maple', name: 'Maple', density: 0.71 },
        { id: 'wood_cedar', name: 'Cedar', density: 0.38 },
        { id: 'wood_cherry', name: 'Cherry', density: 0.63 },
        { id: 'wood_mahogany', name: 'Mahogany', density: 0.67 },
        { id: 'wood_walnut', name: 'Walnut', density: 0.65 },
        { id: 'wood_birch', name: 'Birch', density: 0.67 },
      ]
    },
    {
      id: 'metals',
      name: 'Metals',
      materials: [
        { id: 'aluminum', name: 'Aluminum', density: 2.7 },
        { id: 'steel', name: 'Steel', density: 7.85 },
        { id: 'iron', name: 'Iron', density: 7.87 },
        { id: 'copper', name: 'Copper', density: 8.96 },
        { id: 'brass', name: 'Brass', density: 8.55 },
        { id: 'lead', name: 'Lead', density: 11.34 },
        { id: 'gold', name: 'Gold', density: 19.32 },
        { id: 'silver', name: 'Silver', density: 10.49 },
      ]
    }
  ];
  
  // Conversion factors to kilograms (base weight unit)
  const weightFactors: Record<string, number> = {
    'kg': 1,                     // kilograms (base weight unit)
    'g': 0.001,                  // grams
    'lb': 0.453592,              // pounds
    'oz': 0.0283495,             // ounces
  };
  
  // Conversion factors to liters (base volume unit)
  const volumeFactors: Record<string, number> = {
    'l': 1,                      // liters (base volume unit)
    'ml': 0.001,                 // milliliters
    'gal_us': 3.78541,           // US gallons
    'cu_ft': 28.3168,            // cubic feet
    'cu_in': 0.0163871,          // cubic inches
    'cu_m': 1000,                // cubic meters
  };
  
  // Get current material
  const getCurrentMaterial = (): Material => {
    const category = materialCategories.find(cat => cat.id === materialCategory);
    if (!category) return { id: 'water', name: 'Water', density: 1.0 };
    
    const material = category.materials.find(mat => mat.id === materialId);
    if (!material) return category.materials[0];
    
    return material;
  };
  
  // Calculate conversion when inputs change
  useEffect(() => {
    convertUnits();
  }, [valueStr, fromUnit, toUnit, precision, materialCategory, materialId]);
  
  // Handle from unit change
  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value);
  };
  
  // Handle to unit change
  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value);
  };
  
  // Handle precision change
  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrecision(Number(e.target.value));
  };
  
  // Handle material category change
  const handleMaterialCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setMaterialCategory(newCategory);
    
    // Set the first material in the new category as selected
    const category = materialCategories.find(cat => cat.id === newCategory);
    if (category && category.materials.length > 0) {
      setMaterialId(category.materials[0].id);
    }
  };
  
  // Handle material change
  const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMaterialId(e.target.value);
  };
  
  // Handle value input change with proper validation
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input
    if (value === '') {
      setValueStr('');
      return;
    }
    
    // Validate the input is a positive number
    if (/^\d*\.?\d*$/.test(value)) {
      setValueStr(value);
    }
  };
  
  // Check if unit is a volume unit
  const isVolumeUnit = (unit: string): boolean => {
    return unit in volumeFactors;
  };
  
  // Check if unit is a weight unit
  const isWeightUnit = (unit: string): boolean => {
    return unit in weightFactors;
  };
  
  // Convert between units
  const convertUnits = () => {
    const value = valueStr === '' ? 0 : parseFloat(valueStr);
    const material = getCurrentMaterial();
    const density = material.density; // kg/L
    
    let result: number;
    
    if (isWeightUnit(fromUnit) && isVolumeUnit(toUnit)) {
      // Weight to volume conversion
      const kg = value * weightFactors[fromUnit];
      const liters = kg / density;
      result = liters / volumeFactors[toUnit];
    } else if (isVolumeUnit(fromUnit) && isWeightUnit(toUnit)) {
      // Volume to weight conversion
      const liters = value * volumeFactors[fromUnit];
      const kg = liters * density;
      result = kg / weightFactors[toUnit];
    } else if (isWeightUnit(fromUnit) && isWeightUnit(toUnit)) {
      // Weight to weight conversion
      const kg = value * weightFactors[fromUnit];
      result = kg / weightFactors[toUnit];
    } else if (isVolumeUnit(fromUnit) && isVolumeUnit(toUnit)) {
      // Volume to volume conversion
      const liters = value * volumeFactors[fromUnit];
      result = liters / volumeFactors[toUnit];
    } else {
      result = 0;
    }
    
    setResult(Number(result.toFixed(precision)));
  };
  
  // Get the display name for a unit
  const getUnitDisplayName = (unit: string): string => {
    switch (unit) {
      case 'kg': return 'kg';
      case 'g': return 'g';
      case 'lb': return 'lb';
      case 'oz': return 'oz';
      case 'l': return 'L';
      case 'ml': return 'mL';
      case 'gal_us': return 'gal (US)';
      case 'cu_ft': return 'ft³';
      case 'cu_in': return 'in³';
      case 'cu_m': return 'm³';
      default: return unit;
    }
  };
  
  // Get the full name of a unit
  const getUnitFullName = (unit: string): string => {
    switch (unit) {
      case 'kg': return 'Kilograms';
      case 'g': return 'Grams';
      case 'lb': return 'Pounds';
      case 'oz': return 'Ounces';
      case 'l': return 'Liters';
      case 'ml': return 'Milliliters';
      case 'gal_us': return 'Gallons (US)';
      case 'cu_ft': return 'Cubic Feet';
      case 'cu_in': return 'Cubic Inches';
      case 'cu_m': return 'Cubic Meters';
      default: return unit;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-card rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Input</h2>
          
          {/* Material Selection */}
          <div className="space-y-3">
            <div>
              <label htmlFor="materialCategory" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Material Category
              </label>
              <select
                id="materialCategory"
                value={materialCategory}
                onChange={handleMaterialCategoryChange}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
              >
                {materialCategories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="material" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
                Material
              </label>
              <select
                id="material"
                value={materialId}
                onChange={handleMaterialChange}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
              >
                {materialCategories
                  .find(cat => cat.id === materialCategory)?.materials
                  .map(material => (
                    <option key={material.id} value={material.id}>{material.name}</option>
                  ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                Density: {getCurrentMaterial().density} kg/L
              </p>
            </div>
          </div>
          
          {/* Value Input */}
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Value
            </label>
            <input
              type="tel"
              id="value"
              value={valueStr}
              onChange={handleValueChange} {...decimalInputProps}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
              placeholder="Enter value"
            />
          </div>
          
          {/* From Unit Selection */}
          <div>
            <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              From Unit
            </label>
            <select
              id="fromUnit"
              value={fromUnit}
              onChange={handleFromUnitChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              <optgroup label="Weight">
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="lb">Pounds (lb)</option>
                <option value="oz">Ounces (oz)</option>
              </optgroup>
              <optgroup label="Volume">
                <option value="l">Liters (L)</option>
                <option value="ml">Milliliters (mL)</option>
                <option value="gal_us">Gallons (US)</option>
                <option value="cu_ft">Cubic Feet (ft³)</option>
                <option value="cu_in">Cubic Inches (in³)</option>
                <option value="cu_m">Cubic Meters (m³)</option>
              </optgroup>
            </select>
          </div>
          
          {/* To Unit Selection */}
          <div>
            <label htmlFor="toUnit" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              To Unit
            </label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={handleToUnitChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              <optgroup label="Weight">
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="lb">Pounds (lb)</option>
                <option value="oz">Ounces (oz)</option>
              </optgroup>
              <optgroup label="Volume">
                <option value="l">Liters (L)</option>
                <option value="ml">Milliliters (mL)</option>
                <option value="gal_us">Gallons (US)</option>
                <option value="cu_ft">Cubic Feet (ft³)</option>
                <option value="cu_in">Cubic Inches (in³)</option>
                <option value="cu_m">Cubic Meters (m³)</option>
              </optgroup>
            </select>
          </div>
          
          {/* Precision Selection */}
          <div>
            <label htmlFor="precision" className="block text-sm font-medium text-gray-900 dark:text-white dark:text-gray-300 mb-1">
              Decimal Places
            </label>
            <select
              id="precision"
              value={precision}
              onChange={handlePrecisionChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:text-primary-foreground"
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>
        
        {/* Result Section */}
        <div className="space-y-4">
      <h2 className="calculator-section-header">Result</h2>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {valueStr || '0'} {getUnitFullName(fromUnit)} of {getCurrentMaterial().name} equals
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {result.toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision })} {getUnitDisplayName(toUnit)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {getUnitFullName(toUnit)}
            </div>
          </div>
          
          <div className="calculator-button">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">About Material Density</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Density is the mass of a substance per unit volume. It is used to convert between weight and volume.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              The density of {getCurrentMaterial().name} is approximately {getCurrentMaterial().density} kg/L (kilograms per liter).
            </p>
          </div>
          
          <div className="bg-gray-100/50 dark:bg-gray-800/50 dark:bg-muted/50 p-4 rounded-md">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white dark:text-primary-foreground mb-2">Common Density Values</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Water:</strong> 1.0 kg/L (reference density)</li>
                <li><strong>Milk:</strong> 1.03 kg/L</li>
                <li><strong>Gasoline:</strong> 0.75 kg/L</li>
                <li><strong>Concrete:</strong> 2.4 kg/L</li>
                <li><strong>Oak Wood:</strong> 0.77 kg/L</li>
                <li><strong>Steel:</strong> 7.85 kg/L</li>
                <li><strong>Gold:</strong> 19.32 kg/L</li>
              </ul>
              <p className="mt-2">Note: Densities are approximate and may vary based on temperature, purity, and other factors.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightToVolumeConverter; 