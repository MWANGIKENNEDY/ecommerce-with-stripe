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
import { Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { toast } from "react-toastify";

interface ProductDetailProps {
    product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
    const [selectedOptions, setSelectedOptions] = useState({
        size: product.sizes[0],
        color: product.colors[0],
    });

    const addToCart = useStore((state) => state.addToCart);

    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity: 1,
            selectedSize: selectedOptions.size,
            selectedColor: selectedOptions.color,
        });
        toast.success(`${product.title} added to cart!`);
    };

    const handleOptionChange = ({ type, value }: { type: "size" | "color", value: string }) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    const currentImage = product.images?.[selectedOptions.color] || product.image;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Section */}
            <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                <Image
                    src={currentImage}
                    alt={product.title}
                    fill
                    className="object-contain p-8 md:p-12 hover:scale-105 transition-transform duration-700"
                    priority
                />
            </div>

            {/* Info Section */}
            <div className="flex flex-col py-2">
                <div className="mb-8">
                    <span className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-2 block">
                        {product.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                        {product.title}
                    </h1>
                    <p className="text-3xl font-bold text-gray-900">${product.price}</p>
                </div>

                <div className="space-y-8 mb-10">
                    <p className="text-gray-500 text-lg leading-relaxed">
                        {product.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Size Selection */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                Select Size
                            </label>
                            <Select
                                defaultValue={selectedOptions.size}
                                onValueChange={(value) => handleOptionChange({ type: "size", value })}
                            >
                                <SelectTrigger className="h-12 w-full bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20">
                                    <SelectValue placeholder="Choose a size" />
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

                        {/* Color Selection */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                Select Color
                            </label>
                            <div className="flex gap-3 h-12 items-center">
                                {product.colors.map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionChange({ type: "color", value: color })}
                                        className={`p-1 rounded-full border-2 transition-all ${selectedOptions.color === color
                                            ? "border-indigo-600 scale-110 shadow-lg shadow-indigo-100"
                                            : "border-transparent hover:border-gray-200"
                                            }`}
                                        title={color}
                                    >
                                        <div
                                            className="w-6 h-6 rounded-full border border-black/5 shadow-inner"
                                            style={{ backgroundColor: color }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                    <Button
                        onClick={handleAddToCart}
                        className="flex-1 h-14 rounded-2xl bg-gray-900 hover:bg-black text-white text-lg font-bold shadow-xl shadow-gray-200 transition-all flex items-center justify-center gap-3"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        Add to Cart
                    </Button>
                    <Button variant="outline" className="flex-1 h-14 rounded-2xl border-gray-200 text-lg font-bold hover:bg-gray-50 transition-all">
                        Wishlist
                    </Button>
                </div>

                <div className="mt-12 pt-12 border-t border-gray-100 grid grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 uppercase mb-2">Delivery</h4>
                        <p className="text-sm text-gray-500">Free standard delivery on all orders over $150.</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 uppercase mb-2">Returns</h4>
                        <p className="text-sm text-gray-500">Free 30-day return policy for all members.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
