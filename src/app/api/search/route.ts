import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  
  if (!query || query.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }
  
  const db = getDb();
  const normalizedQuery = query.trim().toLowerCase();
  
  // Improved search query with better ranking
  const results = db.prepare(`
    SELECT * FROM calculators 
    WHERE 
      LOWER(name) LIKE ? OR
      LOWER(description) LIKE ? OR
      LOWER(keywords) LIKE ?
    ORDER BY 
      CASE 
        WHEN LOWER(name) = ? THEN 1
        WHEN LOWER(name) LIKE ? THEN 2
        WHEN LOWER(keywords) LIKE ? THEN 3
        WHEN LOWER(description) LIKE ? THEN 4
        ELSE 5
      END,
      name ASC
    LIMIT 30
  `).all(
    `%${normalizedQuery}%`, 
    `%${normalizedQuery}%`, 
    `%${normalizedQuery}%`,
    normalizedQuery,
    `${normalizedQuery}%`,
    `%${normalizedQuery}%`,
    `%${normalizedQuery}%`
  );
  
  return NextResponse.json({ results });
} 