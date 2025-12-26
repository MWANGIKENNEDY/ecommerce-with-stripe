"use client";

import { useState, useEffect } from "react";

import { Trash2, ShoppingCart } from "lucide-react";
import { useStore } from "@/lib/store";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

export default function CartItems() {
    const { cart, removeFromCart, _hasHydrated } = useStore();

    if (!_hasHydrated) return null;

    if (cart.length === 0) {
        return (
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingCart className="w-10 h-10 text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-xs">Looks like you haven't added anything to your cart yet.</p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-8 h-12 rounded-xl bg-gray-900 text-white font-bold hover:bg-black transition-all"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Cart Items ({cart.length})</h2>
            <div className="space-y-8">
                {cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex items-center justify-between group">
                        <div className="flex items-center gap-6">
                            <div className="relative w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                                <Image
                                    src={item.images?.[item.selectedColor] || item.image}
                                    alt={item.title}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-gray-900">{item.title}</h3>
                                <div className="text-sm text-gray-500 space-y-0.5">
                                    <p>Size: {item.selectedSize}</p>
                                    <div className="flex items-center gap-2">
                                        <span>Color:</span>
                                        <div
                                            className="w-3 h-3 rounded-full border border-gray-200"
                                            style={{ backgroundColor: item.selectedColor }}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mt-3">
                                    <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden h-8">
                                        <button
                                            onClick={() => useStore.getState().updateQuantity(item, item.quantity - 1)}
                                            className="px-2 hover:bg-gray-50 text-gray-400 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="px-3 text-sm font-bold text-gray-900 min-w-[32px] text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => useStore.getState().updateQuantity(item, item.quantity + 1)}
                                            className="px-2 hover:bg-gray-50 text-gray-400 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="font-bold text-gray-900">${item.price}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                removeFromCart(item);
                                toast.info(`${item.title} removed from cart`);
                            }}
                            className="p-3 bg-red-50 text-red-500 rounded-xl md:opacity-0 group-hover:opacity-100 transition-all hover:bg-red-100"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
