"use client";

export function CartSyncProvider({ children }: { children: React.ReactNode }) {
    // No backend sync needed - cart is purely local now
    return <>{children}</>;
}
