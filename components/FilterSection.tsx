import React from "react";
import {
    LayoutGrid,
    Shirt,
    Footprints,
    Glasses,
    Briefcase,
    Heart,
    Watch,
    Hand
} from "lucide-react";

const categories = [
    { name: "All", icon: LayoutGrid },
    { name: "T-shirts", icon: Shirt },
    { name: "Shoes", icon: Footprints },
    { name: "Accessories", icon: Glasses },
    { name: "Bags", icon: Briefcase },
    { name: "Dresses", icon: Heart },
    { name: "Jackets", icon: Watch }, // Using Watch as a placeholder for Jacket icon if not found
    { name: "Gloves", icon: Hand },
];

const FilterSection = () => {
    return (
        <div className="w-full bg-white py-4 mb-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar md:justify-center">
                    <div className="flex items-center gap-2 bg-gray-50/80 rounded-2xl p-1.5 shadow-sm border border-gray-100">
                        {categories.map((category) => (
                            <button
                                key={category.name}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-white hover:shadow-sm transition-all whitespace-nowrap group"
                            >
                                <category.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSection;
