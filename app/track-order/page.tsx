"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle, MapPin, Calendar, Clock } from "lucide-react";

interface TrackingEvent {
    date: string;
    time: string;
    status: string;
    location: string;
    description: string;
}

interface OrderTracking {
    orderNumber: string;
    status: string;
    estimatedDelivery: string;
    currentLocation: string;
    events: TrackingEvent[];
}

export default function TrackOrderPage() {
    const [orderNumber, setOrderNumber] = useState("");
    const [trackingData, setTrackingData] = useState<OrderTracking | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTrackOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderNumber.trim()) {
            setError("Please enter an order number");
            return;
        }

        setIsLoading(true);
        setError("");

        // Simulate API call
        setTimeout(() => {
            // Mock tracking data
            const mockTracking: OrderTracking = {
                orderNumber: orderNumber,
                status: "In Transit",
                estimatedDelivery: "December 28, 2025",
                currentLocation: "Distribution Center - Chicago, IL",
                events: [
                    {
                        date: "Dec 25, 2025",
                        time: "2:30 PM",
                        status: "In Transit",
                        location: "Chicago, IL",
                        description: "Package is in transit to the next facility"
                    },
                    {
                        date: "Dec 25, 2025",
                        time: "8:15 AM",
                        status: "Departed Facility",
                        location: "Indianapolis, IN",
                        description: "Package has departed from Indianapolis facility"
                    },
                    {
                        date: "Dec 24, 2025",
                        time: "11:45 PM",
                        status: "Arrived at Facility",
                        location: "Indianapolis, IN",
                        description: "Package arrived at Indianapolis sorting facility"
                    },
                    {
                        date: "Dec 24, 2025",
                        time: "3:20 PM",
                        status: "Shipped",
                        location: "New York, NY",
                        description: "Package has been shipped from our warehouse"
                    },
                    {
                        date: "Dec 23, 2025",
                        time: "10:00 AM",
                        status: "Order Processed",
                        location: "New York, NY",
                        description: "Your order has been processed and is ready for shipment"
                    }
                ]
            };

            setTrackingData(mockTracking);
            setIsLoading(false);
        }, 1500);
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'order processed':
                return <Package className="w-5 h-5 text-blue-600" />;
            case 'shipped':
            case 'departed facility':
            case 'in transit':
                return <Truck className="w-5 h-5 text-yellow-600" />;
            case 'delivered':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            default:
                return <Package className="w-5 h-5 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'order processed':
                return 'text-blue-600 bg-blue-50';
            case 'shipped':
            case 'departed facility':
            case 'in transit':
                return 'text-yellow-600 bg-yellow-50';
            case 'delivered':
                return 'text-green-600 bg-green-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Order</h1>
                    <p className="text-lg text-gray-600">
                        Enter your order number to see the latest updates on your shipment
                    </p>
                </div>

                {/* Search Form */}
                <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
                    <form onSubmit={handleTrackOrder} className="max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                placeholder="Enter order number (e.g., ORD-123456)"
                                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-indigo-600 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-indigo-600"></div>
                                ) : (
                                    <Search className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        {error && (
                            <p className="mt-2 text-sm text-red-600">{error}</p>
                        )}
                    </form>
                </div>

                {/* Tracking Results */}
                {trackingData && (
                    <div className="space-y-8">
                        {/* Order Status Overview */}
                        <div className="bg-white rounded-lg shadow-sm border p-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                        Order #{trackingData.orderNumber}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trackingData.status)}`}>
                                            {getStatusIcon(trackingData.status)}
                                            {trackingData.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                                    <p className="text-lg font-semibold text-gray-900">{trackingData.estimatedDelivery}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-900">Current Location</span>
                                </div>
                                <p className="text-gray-700">{trackingData.currentLocation}</p>
                            </div>
                        </div>

                        {/* Tracking Timeline */}
                        <div className="bg-white rounded-lg shadow-sm border p-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Tracking History</h3>
                            <div className="space-y-6">
                                {trackingData.events.map((event, index) => (
                                    <div key={index} className="relative flex gap-4">
                                        {/* Timeline line */}
                                        {index < trackingData.events.length - 1 && (
                                            <div className="absolute left-6 top-12 w-px h-16 bg-gray-200"></div>
                                        )}
                                        
                                        {/* Status icon */}
                                        <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                                            {getStatusIcon(event.status)}
                                        </div>
                                        
                                        {/* Event details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-900">{event.status}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {event.location}
                                                    </p>
                                                </div>
                                                <div className="mt-2 sm:mt-0 text-right">
                                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                                        <Calendar className="w-3 h-3" />
                                                        {event.date}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                                        <Clock className="w-3 h-3" />
                                                        {event.time}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Delivery Instructions */}
                        <div className="bg-blue-50 rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Delivery Information</h3>
                            <div className="space-y-2 text-sm text-gray-700">
                                <p>• Package will be delivered to your specified address</p>
                                <p>• Signature may be required upon delivery</p>
                                <p>• If you're not available, we'll leave a delivery notice</p>
                                <p>• You can reschedule delivery or request to hold at a pickup location</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Help Section */}
                <div className="text-center mt-12 pt-8 border-t border-gray-200">
                    <p className="text-gray-600 mb-4">Can't find your order or need help?</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/support"
                            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Contact Support
                        </a>
                        <a
                            href="/account/orders"
                            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                        >
                            View All Orders
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}