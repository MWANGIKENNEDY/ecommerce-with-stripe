import { NextResponse } from 'next/server';
import { dummyProducts } from '@/lib/data';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ category: string }> }
) {
    const { category } = await params;
    
    // Filter products by category
    const filteredProducts = dummyProducts.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
    );
    
    // Sort by createdAt in descending order (newest first)
    const sortedProducts = filteredProducts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return NextResponse.json(sortedProducts);
}