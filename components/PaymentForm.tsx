"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { paymentFormSchema, PaymentFormValues } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useState } from "react";

export default function PaymentForm() {
    const router = useRouter();
    const { cart } = useStore();
    const [isProcessing, setIsProcessing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PaymentFormValues>({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: {
            nameOnCard: "",
            cardNumber: "",
            expirationDate: "",
        },
    });

    const onSubmit = async (data: PaymentFormValues) => {
        setIsProcessing(true);
        
        try {
            console.log("Processing payment:", data);
            
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Create order data for confirmation page
            const orderData = {
                orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
                orderDate: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }),
                total: `$${cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2)}`,
                items: cart.map(item => ({
                    title: item.title,
                    quantity: item.quantity,
                    price: `$${(parseFloat(item.price) * item.quantity).toFixed(2)}`
                })),
                shippingAddress: {
                    name: data.nameOnCard, // Using name from payment form
                    address: "123 Main St, City, State 12345" // In real app, get from shipping form
                },
                paymentMethod: `•••• •••• •••• ${data.cardNumber.slice(-4)}`,
                estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })
            };
            
            // Store order data for confirmation page
            localStorage.setItem('lastOrder', JSON.stringify(orderData));
            
            // Redirect to order confirmation
            router.push('/order-confirmation');
            
        } catch (error) {
            console.error("Payment failed:", error);
            alert("Payment failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-2xl mx-auto w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-10">Payment Method</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Name on Card */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-400">Name on Card</label>
                    <input
                        type="text"
                        {...register("nameOnCard")}
                        placeholder="John Doe"
                        className={`w-full border-b pb-2 focus:outline-none transition-colors text-gray-900 font-medium ${errors.nameOnCard ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                            }`}
                    />
                    {errors.nameOnCard && <span className="text-xs text-red-500">{errors.nameOnCard.message}</span>}
                </div>

                {/* Card Number */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-400">Card Number</label>
                    <input
                        type="text"
                        {...register("cardNumber")}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full border-b pb-2 focus:outline-none transition-colors text-gray-900 font-medium ${errors.cardNumber ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                            }`}
                    />
                    {errors.cardNumber && <span className="text-xs text-red-500">{errors.cardNumber.message}</span>}
                </div>

                {/* Expiration Date */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-400">Expiration Date</label>
                    <input
                        type="text"
                        {...register("expirationDate")}
                        placeholder="MM/YY"
                        className={`w-full border-b pb-2 focus:outline-none transition-colors text-gray-900 font-medium ${errors.expirationDate ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                            }`}
                    />
                    {errors.expirationDate && <span className="text-xs text-red-500">{errors.expirationDate.message}</span>}
                </div>

                {/* Payment Logos */}
                <div className="flex items-center gap-4 pt-4">
                    <div className="bg-[#FFE1E6] px-3 py-1.5 rounded-md flex items-center justify-center">
                        <span className="text-[#FF8095] font-black text-xs uppercase italic tracking-tighter">Klarna</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-8 h-5 bg-[#EB001B] rounded-l-sm"></div>
                        <div className="w-8 h-5 bg-[#F79E1B] rounded-r-sm -ml-2 opacity-80"></div>
                        <span className="ml-2 font-bold text-xs text-gray-400">mastercard</span>
                    </div>
                    <div className="flex items-center italic font-black text-[#1A1F71] text-lg">
                        Visa
                    </div>
                    <div className="bg-[#6772E5] text-white font-bold text-xs px-2 py-0.5 rounded flex items-center justify-center">
                        stripe
                    </div>
                </div>

                <div className="pt-6">
                    <Button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full h-14 rounded-2xl bg-[#1D2432] hover:bg-black text-white font-bold text-lg shadow-xl shadow-gray-200 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                Processing...
                            </>
                        ) : (
                            <>
                                Checkout
                                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
