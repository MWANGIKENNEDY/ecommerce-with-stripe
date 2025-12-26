import { Suspense } from "react";
import CartSteps from "@/components/CartSteps";
import CartItems from "@/components/CartItems";
import CartSummary from "@/components/CartSummary";
import ShippingForm from "@/components/ShippingForm";
import PaymentForm from "@/components/PaymentForm";

export default async function CartPage({
    searchParams
}: {
    searchParams: Promise<{ step?: string }>
}) {
    const stepParam = (await searchParams).step;
    const currentStep = stepParam ? parseInt(stepParam) : 1;

    return (
        <div className="min-h-screen bg-[#FDFDFD] py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-7xl">
                <header className="text-center mb-16 relative">
                    {currentStep === 1 && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
                            <a href="/products" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest flex items-center gap-2">
                                ← Back to Products
                            </a>
                        </div>
                    )}
                    <h1 className="text-4xl font-black text-gray-900 mb-2">Your Shopping Cart</h1>
                </header>

                <Suspense fallback={<div className="h-20" />}>
                    <CartSteps currentStep={currentStep} />
                </Suspense>

                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1">
                        {currentStep === 1 && <CartItems />}
                        {currentStep === 2 && <ShippingForm />}
                        {currentStep === 3 && <PaymentForm />}
                    </div>

                    <Suspense fallback={<div className="w-[400px] h-96 bg-gray-50 rounded-3xl" />}>
                        <CartSummary currentStep={currentStep} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
