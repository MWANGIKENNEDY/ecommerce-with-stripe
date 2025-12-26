import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartStoreActionsType, CartStoreStateType } from "./data";

export const useStore = create<CartStoreStateType & CartStoreActionsType>()(
    persist(
        (set, get) => ({
            cart: [],
            _hasHydrated: false,
            isSynced: true, // Always synced since we're using local storage only
            setHasHydrated: (state) => set({ _hasHydrated: state }),
            addToCart: async (product) => {
                console.log('🛒 Adding to cart:', product.title);
                
                // Add to local cart
                set((state) => {
                    const existingItem = state.cart.find(
                        (item) =>
                            item.id === product.id &&
                            item.selectedSize === product.selectedSize &&
                            item.selectedColor === product.selectedColor
                    );

                    if (existingItem) {
                        return {
                            cart: state.cart.map((item) =>
                                item === existingItem
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }

                    return {
                        cart: [...state.cart, product],
                    };
                });

                console.log('✅ Added to local cart');
            },
            removeFromCart: async (product) => {
                // Remove from local cart
                set((state) => ({
                    cart: state.cart.filter(
                        (item) =>
                            !(item.id === product.id &&
                                item.selectedSize === product.selectedSize &&
                                item.selectedColor === product.selectedColor)
                    ),
                }));
            },
            updateQuantity: (product, quantity) => set((state) => ({
                cart: state.cart.map((item) =>
                    item.id === product.id &&
                        item.selectedSize === product.selectedSize &&
                        item.selectedColor === product.selectedColor
                        ? { ...item, quantity: Math.max(1, quantity) }
                        : item
                ),
            })),
            clearCart: () => set((state) => ({
                cart: [],
            })),
            getCart: () => get().cart,
            getDebugInfo: () => ({
                cart: get().cart,
                isSynced: get().isSynced,
                _hasHydrated: get()._hasHydrated,
                cartLength: get().cart.length,
                authTokenGetterAvailable: false
            }),
            resetSyncStatus: () => {
                console.log('🔄 Sync status reset (no-op in local mode)');
            },
            forceSyncWithBackend: async () => {
                console.log('🚀 Force sync (no-op in local mode)');
            },
            syncWithBackend: async (token: string) => {
                console.log('🔄 Sync with backend (no-op in local mode)');
            },
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                console.log('💾 Store rehydrating...');
                state?.setHasHydrated(true);
                // Always synced in local mode
                if (state) {
                    state.isSynced = true;
                }
                console.log('✅ Store rehydration complete');
            },
            partialize: (state) => ({ cart: state.cart } as any),
        }
    )
)