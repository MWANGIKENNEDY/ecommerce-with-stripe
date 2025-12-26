"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { toast } from "react-toastify";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [productTypes, setProductTypes] = useState({
        size: product.sizes[0],
        color: product.colors[0],
    });

    const addToCart = useStore((state) => state.addToCart);

    const handleAddToCart = async () => {
        await addToCart({
            ...product,
            quantity: 1,
            selectedSize: productTypes.size,
            selectedColor: productTypes.color,
        });
        toast.success(`${product.title} added to cart!`);
    };

    const handleProductTypeChange = ({ type, value }: { type: "size" | "color", value: string }) => {
        setProductTypes((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    return (
        <div className="flex flex-col bg-card rounded-3xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-border group">
            {/* Image Container */}
            <Link href={`/products/${product.id}`} className="relative aspect-[4/5] w-full bg-muted/50 rounded-2xl overflow-hidden mb-4 block">
                <Image
                    src={product.images?.[productTypes.color] || product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1">
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold text-card-foreground mb-1 line-clamp-1 hover:text-primary transition-colors">
                        {product.title}
                    </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                {/* Filters Row */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Size</span>
                        <Select
                            defaultValue={product.sizes[0]}
                            onValueChange={(value) => handleProductTypeChange({ type: "size", value })}
                        >
                            <SelectTrigger className="h-8 w-[70px] bg-background border-border text-xs font-semibold rounded-lg focus:ring-0">
                                <SelectValue placeholder="Size" />
                            </SelectTrigger>
                            <SelectContent>
                                {product.sizes.map((size) => (
                                    <SelectItem key={size} value={size}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-1 items-end">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Color</span>
                        <div className="flex gap-1.5 h-8 items-center">
                            {product.colors.map((color, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleProductTypeChange({ type: "color", value: color })}
                                    className={`p-0.5 rounded-full border-2 transition-all cursor-pointer ${productTypes.color === color
                                        ? "border-foreground scale-110 shadow-sm"
                                        : "border-transparent hover:border-border"
                                        }`}
                                >
                                    <div
                                        className="w-4 h-4 rounded-full border border-border shadow-sm"
                                        style={{ backgroundColor: color }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-xl font-bold text-card-foreground">${product.price}</span>
                    <Button
                        onClick={handleAddToCart}
                        variant="outline"
                        size="sm"
                        className="rounded-xl flex items-center gap-2 font-semibold"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
