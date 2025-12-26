import { NextResponse } from 'next/server';
import { dummyProducts } from '@/lib/data';

export async function GET() {
    // Sort products by createdAt in descending order (newest first)
    const sortedProducts = [...dummyProducts].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return NextResponse.json(sortedProducts);
}