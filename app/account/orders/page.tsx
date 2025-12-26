"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Package, Truck, CheckCircle, Eye, Download, RotateCcw } from "lucide-react";
import Link from "next/link";

interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: string;
    items: {
        title: string;
        quantity: number;
        price: string;
        image: string;
    }[];
    trackingNumber?: string;
}

const mockOrders: Order[] = [
    {
        id: "1",
        orderNumber: "ORD-789123",
        date: "December 25, 2025",
        status: "shipped",
        total: "$225.64",
        trackingNumber: "1Z999AA1234567890",
        items: [
            {
                title: "Under Armour StormFleece",
                quantity: 1,
                price: "$49.90",
                image: "/product-hoodie.png"
            },
            {
                title: "Nike Air Max 270",
                quantity: 2,
                price: "$59.90",
                image: "/product-shoe1.png"
            }
        ]
    },
    {
        id: "2",
        orderNumber: "ORD-456789",
        date: "December 20, 2025",
        status: "delivered",
        total: "$89.90",
        items: [
            {
                title: "Levi's Classic Denim",
                quantity: 1,
                price: "$59.90",
                image: "/product-shirt.png"
            }
        ]
    },
    {
        id: "3",
        orderNumber: "ORD-123456",
        date: "December 15, 2025",
        status: "processing",
        total: "$139.80",
        items: [
            {
                title: "Nike Ultraboost Pulse",
                quantity: 2,
                price: "$69.90",
                image: "/product-shoe2.png"
            }
        ]
    }
];

export default function OrdersPage() {
    const { isSignedIn, user } = useUser();
    const [selectedStatus, setSelectedStatus] = useState<string>("all");

    if (!isSignedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h1>
                    <p className="text-gray-600 mb-6">Please sign in to view your order history.</p>
                    <Link
                        href="/sign-in"
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'processing':
                return <Package className="w-5 h-5 text-yellow-600" />;
            case 'shipped':
                return <Truck className="w-5 h-5 text-blue-600" />;
            case 'delivered':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'cancelled':
                return <RotateCcw className="w-5 h-5 text-red-600" />;
            default:
                return <Package className="w-5 h-5 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'processing':
                return 'text-yellow-700 bg-yellow-50 border-yellow-200';
            case 'shipped':
                return 'text-blue-700 bg-blue-50 border-blue-200';
            case 'delivered':
                return 'text-green-700 bg-green-50 border-green-200';
            case 'cancelled':
                return 'text-red-700 bg-red-50 border-red-200';
            default:
                return 'text-gray-700 bg-gray-50 border-gray-200';
        }
    };

    const filteredOrders = selectedStatus === "all" 
        ? mockOrders 
        : mockOrders.filter(order => order.status === selectedStatus);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
                    <p className="text-gray-600">
                        Welcome back, {user?.firstName}! Here are your recent orders.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="bg-white rounded-lg shadow-sm border mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { key: "all", label: "All Orders", count: mockOrders.length },
                                { key: "processing", label: "Processing", count: mockOrders.filter(o => o.status === 'processing').length },
                                { key: "shipped", label: "Shipped", count: mockOrders.filter(o => o.status === 'shipped').length },
                                { key: "delivered", label: "Delivered", count: mockOrders.filter(o => o.status === 'delivered').length }
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setSelectedStatus(tab.key)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        selectedStatus === tab.key
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab.label} ({tab.count})
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                        <p className="text-gray-600 mb-6">
                            {selectedStatus === "all" 
                                ? "You haven't placed any orders yet." 
                                : `No ${selectedStatus} orders found.`}
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredOrders.map((order) => (
                            <div key={order.id} className="bg-white rounded-lg shadow-sm border">
                                {/* Order Header */}
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Order #{order.orderNumber}
                                                </h3>
                                                <p className="text-sm text-gray-600">Placed on {order.date}</p>
                                            </div>
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </div>
                                        </div>
                                        <div className="mt-4 lg:mt-0 flex items-center gap-3">
                                            <span className="text-lg font-semibold text-gray-900">{order.total}</span>
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/account/orders/${order.id}`}
                                                    className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View
                                                </Link>
                                                {order.trackingNumber && (
                                                    <Link
                                                        href={`/track-order?order=${order.orderNumber}`}
                                                        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
                                                    >
                                                        <Truck className="w-4 h-4" />
                                                        Track
                                                    </Link>
                                                )}
                                                <button className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                                                    <Download className="w-4 h-4" />
                                                    Receipt
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                                </div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {item.price}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <div className="flex flex-wrap gap-3">
                                            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                                                Reorder Items
                                            </button>
                                            <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                                                Write Review
                                            </button>
                                            {order.status === 'delivered' && (
                                                <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                                                    Return Items
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination (if needed) */}
                {filteredOrders.length > 0 && (
                    <div className="mt-8 flex justify-center">
                        <nav className="flex items-center gap-2">
                            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            <button className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded-md">
                                1
                            </button>
                            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Next
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}