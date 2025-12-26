import { NextResponse } from 'next/server';
import { dummyProducts } from '@/lib/data';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const productId = parseInt(id);
    const product = dummyProducts.find(p => p.id === productId);
    
    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
}