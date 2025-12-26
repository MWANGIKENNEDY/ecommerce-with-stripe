import { FilterControls } from "@/components/FilterControls";
import ProductList from "@/components/ProductList";
import { Suspense } from "react";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string; sort?: string }> }) {
    const category = (await searchParams).category || "all";

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
                    <p className="text-gray-500">Explore our curated collection of premium apparel and footwear.</p>
                </header>

                <Suspense fallback={<div>Loading filters...</div>}>
                    <FilterControls showSort={true} />
                </Suspense>

                <Suspense fallback={<div>Loading products...</div>}>
                    <ProductList category={category} />
                </Suspense>
            </div>
        </div>
    );
}
