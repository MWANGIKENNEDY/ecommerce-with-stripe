"use client";

import { Check } from "lucide-react";

interface Step {
    id: number;
    label: string;
}

const steps: Step[] = [
    { id: 1, label: "Shopping Cart" },
    { id: 2, label: "Shipping Address" },
    { id: 3, label: "Payment Method" },
];

interface CartStepsProps {
    currentStep: number;
}

export default function CartSteps({ currentStep }: CartStepsProps) {
    return (
        <div className="flex items-center justify-center w-full mb-12">
            <div className="flex items-center gap-8 md:gap-16">
                {steps.map((step, index) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;

                    return (
                        <div key={step.id} className="flex items-center gap-3">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${isActive
                                        ? "bg-gray-900 text-white shadow-lg shadow-gray-200 scale-110"
                                        : isCompleted
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-200 text-gray-500"
                                    }`}
                            >
                                {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                            </div>
                            <span
                                className={`text-sm font-semibold transition-all ${isActive ? "text-gray-900" : "text-gray-400"
                                    }`}
                            >
                                {step.label}
                            </span>
                            {index < steps.length - 1 && (
                                <div className="hidden md:block w-12 h-[1px] bg-gray-200 ml-8" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
