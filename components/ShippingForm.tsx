"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingFormSchema, ShippingFormValues } from "@/lib/data";

export default function ShippingForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingFormValues>({
        resolver: zodResolver(shippingFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
        },
    });

    const onSubmit = (data: ShippingFormValues) => {
        console.log("Form Data Submitted:", data);
        router.push("/cart?step=3");
    };

    return (
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-2xl mx-auto w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-10">Shipping Address</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <input
                        type="text"
                        {...register("name")}
                        placeholder="John Doe"
                        className={`w-full border-b pb-2 focus:outline-none transition-colors ${errors.name ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                            }`}
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        placeholder="john.doe@example.com"
                        className={`w-full border-b pb-2 focus:outline-none transition-colors ${errors.email ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                            }`}
                    />
                    {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                </div>

                {/* Phone Field */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <input
                        type="text"
                        {...register("phone")}
                        placeholder="1111111"
                        className={`w-full border-b pb-2 focus:outline-none transition-colors ${errors.phone ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                            }`}
                    />
                    {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                </div>

                {/* Address Field */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <input
                        type="text"
                        {...register("address")}
                        placeholder="123 Main St, Anytown"
                        className={`w-full border-b pb-2 focus:outline-none transition-colors ${errors.address ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                            }`}
                    />
                    {errors.address && <span className="text-xs text-red-500">{errors.address.message}</span>}
                </div>

                {/* City Field */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-500">City</label>
                    <input
                        type="text"
                        {...register("city")}
                        placeholder="Anytown"
                        className={`w-full border-b pb-2 focus:outline-none transition-colors ${errors.city ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                            }`}
                    />
                    {errors.city && <span className="text-xs text-red-500">{errors.city.message}</span>}
                </div>

                <div className="pt-6">
                    <Button
                        type="submit"
                        className="w-full h-14 rounded-2xl bg-gray-900 hover:bg-black text-white font-bold text-lg shadow-xl shadow-gray-200 transition-all flex items-center justify-center gap-2 group"
                    >
                        Continue
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Button>
                </div>
            </form>
        </div>
    );
}
