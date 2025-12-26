"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, Truck, Mail, ArrowRight, Download, Share2 } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";

interface OrderDetails {
    orderNumber: string;
    orderDate: string;
    total: string;
    items: any[];
    shippingAddress: any;
    paymentMethod: string;
    estimatedDelivery: string;
}

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const { clearCart } = useStore();
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get order details from URL params or localStorage
        const orderData = localStorage.getItem('lastOrder');
        if (orderData) {
            const order = JSON.parse(orderData);
            setOrderDetails(order);
            // Clear the cart after successful order
            clearCart();
            // Remove order data from localStorage after displaying
            localStorage.removeItem('lastOrder');
        } else {
            // Generate mock order for demo purposes
            const mockOrder: OrderDetails = {
                orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
                orderDate: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }),
                total: "$225.64",
                items: [
                    { title: "Under Armour StormFleece", quantity: 1, price: "$49.90" },
                    { title: "Nike Air Max 270", quantity: 2, price: "$59.90" }
                ],
                shippingAddress: {
                    name: "John Doe",
                    address: "123 Main St, City, State 12345"
                },
                paymentMethod: "•••• •••• •••• 3456",
                estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })
            };
            setOrderDetails(mockOrder);
            clearCart();
        }
        setIsLoading(false);
    }, [clearCart]);

    const handleShareOrder = () => {
        if (navigator.share && orderDetails) {
            navigator.share({
                title: 'My TrendLama Order',
                text: `I just placed order ${orderDetails.orderNumber} on TrendLama!`,
                url: window.location.href
            });
        }
    };

    const handleDownloadReceipt = () => {
        // In a real app, this would generate and download a PDF receipt
        alert('Receipt download would be implemented here');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!orderDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
                    <Link href="/" className="text-indigo-600 hover:text-indigo-700">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Success Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                    <p className="text-lg text-gray-600">
                        Thank you for your purchase. Your order has been received and is being processed.
                    </p>
                </div>

                {/* Order Summary Card */}
                <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                Order #{orderDetails.orderNumber}
                            </h2>
                            <p className="text-gray-600">Placed on {orderDetails.orderDate}</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex gap-3">
                            <button
                                onClick={handleDownloadReceipt}
                                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <Download className="w-4 h-4" />
                                Download Receipt
                            </button>
                            <button
                                onClick={handleShareOrder}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                            >
                                <Share2 className="w-4 h-4" />
                                Share
                            </button>
                        </div>
                    </div>

                    {/* Order Status Timeline */}
                    <div className="mb-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status</h3>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-white" />
                                </div>
                                <span className="ml-2 text-sm font-medium text-green-600">Order Placed</span>
                            </div>
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                    <Package className="w-5 h-5 text-white" />
                                </div>
                                <span className="ml-2 text-sm font-medium text-yellow-600">Processing</span>
                            </div>
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                    <Truck className="w-5 h-5 text-gray-500" />
                                </div>
                                <span className="ml-2 text-sm font-medium text-gray-500">Shipped</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Details Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Items Ordered */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Items Ordered</h3>
                            <div className="space-y-3">
                                {orderDetails.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                        <div>
                                            <p className="font-medium text-gray-900">{item.title}</p>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium text-gray-900">{item.price}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-900">Total</span>
                                    <span className="text-lg font-semibold text-gray-900">{orderDetails.total}</span>
                                </div>
                            </div>
                        </div>

                        {/* Delivery & Payment Info */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Delivery Information</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="font-medium text-gray-900">{orderDetails.shippingAddress.name}</p>
                                    <p className="text-gray-600">{orderDetails.shippingAddress.address}</p>
                                    <p className="text-sm text-green-600 mt-2">
                                        Estimated delivery: {orderDetails.estimatedDelivery}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Method</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-gray-900">Card ending in {orderDetails.paymentMethod}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What's Next Section */}
                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">What happens next?</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900">Order confirmation email</p>
                                <p className="text-sm text-gray-600">We've sent you an email with your order details</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Package className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900">Order processing</p>
                                <p className="text-sm text-gray-600">We'll prepare your items for shipment within 1-2 business days</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900">Shipping notification</p>
                                <p className="text-sm text-gray-600">You'll receive tracking information once your order ships</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Continue Shopping
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/account/orders"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                        View Order History
                    </Link>
                </div>

                {/* Customer Support */}
                <div className="text-center mt-12 pt-8 border-t border-gray-200">
                    <p className="text-gray-600 mb-2">Need help with your order?</p>
                    <Link
                        href="/support"
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                        Contact Customer Support
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        }>
            <OrderConfirmationContent />
        </Suspense>
    );
}