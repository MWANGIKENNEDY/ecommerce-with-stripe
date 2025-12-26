import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import ProductList from "@/components/ProductList";
import { Suspense } from "react";

// Helper to fetch product
async function getProduct(id: string) {
    try {
        const baseUrl = process.env.NODE_ENV === 'production' 
            ? process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
            : 'http://localhost:3000';
            
        const res = await fetch(`${baseUrl}/api/products/${id}`, {
            cache: 'no-store' // Ensure we always get fresh data
        });
        if (!res.ok) return undefined;
        return res.json();
    } catch (error) {
        return undefined;
    }
}

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const product = await getProduct(id);
    if (!product) {
        return {
            title: "Product Not Found",
        };
    }
    return {
        title: product.title,
        description: product.description,
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }


    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 md:py-16">
                {/* Back Link */}
                <div className="mb-8">
                    <a href="/products" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest flex items-center gap-2">
                        ← Back to Products
                    </a>
                </div>

                <ProductDetail product={product} />

                {/* Related Products Section */}
                <div className="mt-24 md:mt-32">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-black text-gray-900">Related Products</h2>
                        <a href={`/products?category=${product.category}`} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest">
                            View all in {product.category}
                        </a>
                    </div>

                    <Suspense fallback={<div>Loading related products...</div>}>
                        <ProductList category={product.category} excludeId={product.id} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
