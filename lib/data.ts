import { z } from "zod";

export interface Product {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    sizes: string[];
    colors: string[];
    images?: Record<string, string>;
    category: string;
    createdAt: string;
}

export const dummyProducts: Product[] = [
    {
        id: 1,
        title: "Under Armour StormFleece",
        description: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: "49.90",
        image: "/product-hoodie.png",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#FF0000", "#FFC107", "#000000"],
        images: {
            "#FF0000": "/product-hoodie.png",
            "#FFC107": "/product-hoodie.png",
            "#000000": "/product-hoodie.png"
        },
        category: "hoodies",
        createdAt: "2024-12-01T10:00:00Z"
    },
    {
        id: 2,
        title: "Nike Air Max 270",
        description: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: "59.90",
        image: "/product-shoe1.png",
        sizes: ["40", "41", "42", "43", "44"],
        colors: ["#808080", "#FFFFFF"],
        images: {
            "#808080": "/product-shoe1.png",
            "#FFFFFF": "/product-shoe2.png"
        },
        category: "shoes",
        createdAt: "2024-11-15T10:00:00Z"
    },
    {
        id: 3,
        title: "Nike Ultraboost Pulse",
        description: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: "69.90",
        image: "/product-shoe2.png",
        sizes: ["40", "41", "42", "43", "44"],
        colors: ["#808080", "#FFC0CB"],
        images: {
            "#808080": "/product-shoe2.png",
            "#FFC0CB": "/product-shoe1.png"
        },
        category: "shoes",
        createdAt: "2024-12-10T10:00:00Z"
    },
    {
        id: 4,
        title: "Levi's Classic Denim",
        description: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: "59.90",
        image: "/product-shirt.png",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#0000FF", "#008000"],
        images: {
            "#0000FF": "/product-shirt.png",
            "#008000": "/product-shirt.png"
        },
        category: "shirts",
        createdAt: "2024-10-01T10:00:00Z"
    },
];


export type CartItemType = Product & {
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

export type CartItemsType = CartItemType[];


export const shippingFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(7, "Phone is required")
        .max(15, "Phone is too long")
        .regex(/^[0-9]+$/, "Phone must contain only numbers"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
});


export type ShippingFormValues = z.infer<typeof shippingFormSchema>;

export const paymentFormSchema = z.object({
    nameOnCard: z.string().min(1, "Name on card is required"),
    cardNumber: z.string().min(1, "Card number is required")
        .regex(/^\d{4} \s?\d{4} \s?\d{4} \s?\d{4}$/, "Invalid card number format"),
    expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration date (MM/YY)"),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
    cart: CartItemsType;
    _hasHydrated: boolean;
    isSynced: boolean;
}

export type CartStoreActionsType = {
    addToCart: (product: CartItemType) => Promise<void>;
    removeFromCart: (product: CartItemType) => Promise<void>;
    updateQuantity: (product: CartItemType, quantity: number) => void;
    clearCart: () => void;
    getCart: () => CartItemsType;
    setHasHydrated: (state: boolean) => void;
    syncWithBackend: (token: string) => Promise<void>;
    getDebugInfo: () => {
        cart: CartItemsType;
        isSynced: boolean;
        _hasHydrated: boolean;
        cartLength: number;
        authTokenGetterAvailable: boolean;
    };
    resetSyncStatus: () => void;
    forceSyncWithBackend: () => Promise<void>;
}