"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

interface CartSummaryProps {
    currentStep: number;
}

export default function CartSummary({ currentStep }: CartSummaryProps) {
    const router = useRouter();
    const { cart, _hasHydrated } = useStore();

    if (!_hasHydrated) return null;

    const subtotal = cart.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
    const shippingFee = cart.length > 0 ? 10 : 0;
    const discount = cart.length > 0 ? subtotal * 0.1 : 0;
    const total = subtotal - discount + shippingFee;

    const handleContinue = () => {
        const nextStep = currentStep + 1;
        if (nextStep <= 3) {
            router.push(`/cart?step=${nextStep}`);
        }
    };

    const handleBack = () => {
        const prevStep = currentStep - 1;
        if (prevStep >= 1) {
            router.push(`/cart?step=${prevStep}`);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 w-full lg:w-[400px] h-fit sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Cart Details</h2>
            <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between items-center text-gray-500">
                        <span>Discount (10%)</span>
                        <span className="font-bold text-red-500">-${discount.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between items-center text-gray-500">
                    <span>Shipping Fee</span>
                    <span className="font-bold text-gray-900">${shippingFee.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-lg">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-black text-gray-900 font-mono italic">${total.toFixed(2)}</span>
                </div>
            </div>

            {currentStep < 3 && cart.length > 0 && (
                <div className="flex flex-col gap-3">
                    <Button
                        onClick={handleContinue}
                        className="w-full h-14 rounded-2xl bg-gray-900 hover:bg-black text-white font-bold text-lg shadow-xl shadow-gray-200 transition-all flex items-center justify-center gap-2 group"
                    >
                        Continue
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Button>

                    {currentStep > 1 && (
                        <Button
                            onClick={handleBack}
                            variant="ghost"
                            className="w-full h-12 rounded-2xl text-gray-500 font-bold hover:text-gray-900 transition-all"
                        >
                            Back to previous step
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
