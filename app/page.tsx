import Hero from "@/components/Hero";
import { FilterControls } from "@/components/FilterControls";
import ProductList from "@/components/ProductList";
import { Suspense } from "react";

export default async function Home({ searchParams }: { searchParams: Promise<{ category: string }> }) {
  const category = (await searchParams).category || "all";
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Hero />
      <div className="container mx-auto px-4">
        <Suspense fallback={<div>Loading filters...</div>}>
          <FilterControls showSort={false} />
        </Suspense>
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductList category={category} />
        </Suspense>
      </div>
    </div>
  );
}
