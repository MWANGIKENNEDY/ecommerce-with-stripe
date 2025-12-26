"use client";

import ProductCard from "./ProductCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/data";

interface ProductListProps {
    category?: string;
    excludeId?: number;
}

const ProductList = ({ category: initialCategory, excludeId }: ProductListProps) => {
    const searchParams = useSearchParams();
    const category = initialCategory || searchParams.get("category") || "all";
    const sort = searchParams.get("sort") || "newest";

    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products', category, sort],
        queryFn: async () => {
            let url = '/api/products';
            if (category && category !== 'all') {
                url = `/api/products/category/${category}`;
            }
            
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Failed to fetch products');
            }
            return res.json() as Promise<Product[]>;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center py-20 text-red-500">
                Error loading products
            </div>
        );
    }

    let filteredProducts = products || [];
    
    // Filter out excluded product if specified
    if (excludeId) {
        filteredProducts = filteredProducts.filter(p => p.id !== excludeId);
    }

    // Apply sorting
    if (sort === 'price-low') {
        filteredProducts = [...filteredProducts].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sort === 'price-high') {
        filteredProducts = [...filteredProducts].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sort === 'oldest') {
        filteredProducts = [...filteredProducts].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
    // 'newest' is already sorted by default from the API

    return (
        <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                        <p className="text-lg font-medium">No products found in this category.</p>
                    </div>
                )}

                {/* View All */}
                <div className="mt-16 flex justify-center">
                    <Link
                        href="/products"
                        className="text-muted-foreground hover:text-foreground font-medium border-b border-transparent hover:border-foreground transition-all pb-1"
                    >
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductList;
