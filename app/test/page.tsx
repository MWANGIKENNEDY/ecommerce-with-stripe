"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useStore } from "@/lib/store";
import { useState } from "react";

export default function TestPage() {
    const { isSignedIn, user } = useUser();
    const { cart, addToCart, clearCart, isSynced } = useStore();
    
    const [loading, setLoading] = useState(false);

    // Test products for adding to cart
    const testProducts = [
        { 
            id: 1, 
            title: "Test Hoodie", 
            description: "Test hoodie for cart functionality",
            price: "59.99", 
            image: "/test.jpg",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Red", "Blue", "Black"],
            category: "hoodies",
            createdAt: "2024-12-01T10:00:00Z",
            selectedSize: "M", 
            selectedColor: "Red", 
            quantity: 1
        },
        { 
            id: 2, 
            title: "Test Shoes", 
            description: "Test shoes for cart functionality",
            price: "89.99", 
            image: "/test.jpg",
            sizes: ["40", "41", "42", "43"],
            colors: ["Blue", "White", "Black"],
            category: "shoes",
            createdAt: "2024-12-01T10:00:00Z",
            selectedSize: "L", 
            selectedColor: "Blue", 
            quantity: 2
        },
        { 
            id: 3, 
            title: "Test Shirt", 
            description: "Test shirt for cart functionality",
            price: "29.99", 
            image: "/test.jpg",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Green", "Red", "Blue"],
            category: "shirts",
            createdAt: "2024-12-01T10:00:00Z",
            selectedSize: "S", 
            selectedColor: "Green", 
            quantity: 1
        }
    ];

    if (!isSignedIn) {
        return (
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Test Page (Local Mode)</h1>
                <p className="text-lg">Please sign in to test the functionality.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8 space-y-8">
            <h1 className="text-3xl font-bold">Test Page - Local Mode</h1>
            
            {/* User Authentication Info */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">User Authentication Info</h2>
                <div className="space-y-2">
                    <p><strong>User ID:</strong> {user?.id}</p>
                    <p><strong>Email:</strong> {user?.emailAddresses[0]?.emailAddress}</p>
                    <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
                    <p><strong>Mode:</strong> Local Storage Only</p>
                </div>
            </div>

            {/* Local Cart Management */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Local Cart Management</h2>
                <div className="flex gap-2 mb-4">
                    {testProducts.map(product => (
                        <button
                            key={product.id}
                            onClick={async () => await addToCart(product)}
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                        >
                            Add {product.title}
                        </button>
                    ))}
                    <button
                        onClick={clearCart}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                        Clear Cart
                    </button>
                </div>
                
                <p><strong>Items in cart:</strong> {cart.length}</p>
                <p><strong>Is synced:</strong> Always (Local Mode)</p>
                
                {cart.length > 0 && (
                    <div className="mt-4">
                        <strong>Cart contents:</strong>
                        <pre className="bg-gray-100 p-2 rounded mt-2 text-sm">
                            {JSON.stringify(cart, null, 2)}
                        </pre>
                    </div>
                )}
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h2 className="text-xl font-semibold mb-4">Local Mode Features</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Cart data is stored in browser localStorage</li>
                    <li>No backend synchronization needed</li>
                    <li>Cart persists across browser sessions</li>
                    <li>All cart operations work instantly</li>
                    <li>User authentication still works with Clerk</li>
                    <li>Products are served from local API routes</li>
                </ul>
            </div>

            {/* Testing Instructions */}
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h2 className="text-xl font-semibold mb-4">Testing Instructions</h2>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Add items to your cart using the green buttons above</li>
                    <li>Navigate to different pages - cart should persist</li>
                    <li>Refresh the page - cart should still be there</li>
                    <li>Try the checkout flow with your cart items</li>
                    <li>Test signing out and back in - cart should remain</li>
                </ol>
            </div>
        </div>
    );
}