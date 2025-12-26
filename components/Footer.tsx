import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-card border-t border-border text-muted-foreground py-12 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8">
                    {/* Logo and Copyright Section */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 p-1.5">
                                <ShoppingBag className="h-5 w-5 text-white" />
                                <div className="absolute -bottom-1 -left-1 h-3 w-3 rotate-45 bg-red-500" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-foreground">
                                TRENDLAMA.
                            </span>
                        </Link>
                        <div className="text-sm">
                            <p>© 2025 Trendlama.</p>
                            <p className="mt-1">All rights reserved.</p>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 lg:gap-24">
                        {/* Links */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-foreground font-semibold text-lg">Links</h3>
                            <ul className="flex flex-col gap-2 text-sm">
                                <li><Link href="/" className="hover:text-foreground transition-colors">Homepage</Link></li>
                                <li><Link href="/support" className="hover:text-foreground transition-colors">Contact</Link></li>
                                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        {/* Products */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-foreground font-semibold text-lg">Products</h3>
                            <ul className="flex flex-col gap-2 text-sm">
                                <li><Link href="/products" className="hover:text-foreground transition-colors">All Products</Link></li>
                                <li><Link href="/products?category=hoodies" className="hover:text-foreground transition-colors">Hoodies</Link></li>
                                <li><Link href="/products?category=shoes" className="hover:text-foreground transition-colors">Shoes</Link></li>
                                <li><Link href="/products?category=shirts" className="hover:text-foreground transition-colors">Shirts</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-foreground font-semibold text-lg">Company</h3>
                            <ul className="flex flex-col gap-2 text-sm">
                                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                                <li><Link href="/support" className="hover:text-foreground transition-colors">Contact</Link></li>
                                <li><Link href="/track-order" className="hover:text-foreground transition-colors">Track Order</Link></li>
                                <li><Link href="/account/orders" className="hover:text-foreground transition-colors">My Orders</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
