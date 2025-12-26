"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useStore } from "@/lib/store";

export default function DebugCartPage() {
    const { isSignedIn } = useUser();
    const { getToken } = useAuth();
    const { cart, isSynced, syncWithBackend, addToCart, _hasHydrated, resetSyncStatus, forceSyncWithBackend } = useStore();
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
        console.log(message);
    };

    const testProduct = {
        id: 1,
        title: "Under Armour StormFleece",
        description: "Test product for debugging cart functionality",
        price: "49.90",
        image: "/product-hoodie.png",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#FF0000", "#FFC107", "#000000"],
        category: "hoodies",
        createdAt: "2024-12-01T10:00:00Z",
        selectedSize: "M",
        selectedColor: "#FF0000",
        quantity: 1
    };

    const handleAddToCart = async () => {
        addLog("🛒 Testing addToCart...");
        await addToCart(testProduct);
        addLog("✅ addToCart completed");
    };

    const handleManualSync = async () => {
        addLog("🔄 Testing manual sync (local mode - no-op)...");
        try {
            const token = await getToken();
            if (token) {
                addLog("🔑 Got token, calling syncWithBackend...");
                await syncWithBackend(token);
                addLog("✅ Manual sync completed");
            } else {
                addLog("❌ No token available");
            }
        } catch (error) {
            addLog(`❌ Manual sync failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    const clearLogs = () => {
        setLogs([]);
    };

    useEffect(() => {
        addLog("🚀 Debug page loaded (Local Mode)");
        addLog(`👤 Signed in: ${isSignedIn}`);
        addLog(`💾 Hydrated: ${_hasHydrated}`);
        addLog(`🔄 Synced: ${isSynced}`);
        addLog(`🛒 Local cart items: ${cart.length}`);
    }, [isSignedIn, _hasHydrated, isSynced, cart.length]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Cart Debug Page (Local Mode)</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Status Panel */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Current Status</h2>
                    <div className="space-y-2">
                        <div>👤 Signed In: <span className={isSignedIn ? "text-green-600" : "text-red-600"}>{isSignedIn ? "Yes" : "No"}</span></div>
                        <div>💾 Hydrated: <span className={_hasHydrated ? "text-green-600" : "text-red-600"}>{_hasHydrated ? "Yes" : "No"}</span></div>
                        <div>🔄 Synced: <span className="text-green-600">Always (Local Mode)</span></div>
                        <div>🛒 Local Cart Items: <span className="font-mono">{cart.length}</span></div>
                        <div>📦 Backend: <span className="text-blue-600">Disabled (Local Mode)</span></div>
                    </div>
                </div>

                {/* Actions Panel */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Test Actions</h2>
                    <div className="space-y-2">
                        <button 
                            onClick={handleAddToCart}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            🛒 Add Test Product to Cart
                        </button>
                        <button 
                            onClick={handleManualSync}
                            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            disabled={!isSignedIn}
                        >
                            🔄 Manual Sync (No-op)
                        </button>
                        <button 
                            onClick={clearLogs}
                            className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            🗑️ Clear Logs
                        </button>
                        <button 
                            onClick={resetSyncStatus}
                            className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                        >
                            🔄 Reset Sync Status (No-op)
                        </button>
                        <button 
                            onClick={forceSyncWithBackend}
                            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            disabled={!isSignedIn}
                        >
                            🚀 Force Sync (No-op)
                        </button>
                    </div>
                </div>
            </div>

            {/* Local Cart Display */}
            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Local Cart Contents</h2>
                {cart.length === 0 ? (
                    <p className="text-gray-500">No items in local cart</p>
                ) : (
                    <div className="space-y-2">
                        {cart.map((item, index) => (
                            <div key={index} className="bg-white p-2 rounded border">
                                <div>Product ID: {item.id}</div>
                                <div>Title: {item.title}</div>
                                <div>Size: {item.selectedSize}</div>
                                <div>Color: {item.selectedColor}</div>
                                <div>Quantity: {item.quantity}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Logs Panel */}
            <div className="mt-6 bg-black text-green-400 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Debug Logs</h2>
                <div className="font-mono text-sm max-h-96 overflow-y-auto">
                    {logs.length === 0 ? (
                        <p>No logs yet...</p>
                    ) : (
                        logs.map((log, index) => (
                            <div key={index}>{log}</div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}