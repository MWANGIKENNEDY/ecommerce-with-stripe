"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const categories = [
    { label: "All Products", value: "all" },
    { label: "Shoes", value: "shoes" },
    { label: "Shirts", value: "shirts" },
    { label: "Hoodies", value: "hoodies" },
];

const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
];

interface FilterControlsProps {
    showSort?: boolean;
}

export function FilterControls({ showSort = true }: FilterControlsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get("category") || "all";
    const currentSort = searchParams.get("sort") || "newest";

    const updateParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "all" || !value) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm">
            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
                {categories.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => updateParams("category", cat.value)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${currentCategory === cat.value
                            ? "bg-gray-900 text-white shadow-md shadow-gray-200"
                            : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Sort Dropdown */}
            {showSort && (
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Sort by:</span>
                    <Select
                        defaultValue={currentSort}
                        onValueChange={(value) => updateParams("sort", value)}
                    >
                        <SelectTrigger className="w-full md:w-[180px] bg-white border-gray-200 rounded-xl focus:ring-0">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
        </div>
    );
}
