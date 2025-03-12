"use client";

import Link from 'next/link';
import { Category } from '@/data/calculators';

interface CategoryCardProps {
  category: Category;
  count: number;
}

const CategoryCard = ({ category, count }: CategoryCardProps) => {
  return (
    <Link href={`/category/${category.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-200 h-full border-l-4 border-blue-600">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{category.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{category.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">{count} calculators</span>
          <span className="text-gray-900 dark:text-white dark:text-primary text-sm font-medium">View All →</span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard; 