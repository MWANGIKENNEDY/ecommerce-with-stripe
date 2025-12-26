"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Bell, ShoppingCart, Home, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const cart = useStore((state) => state.cart);
  const hasHydrated = useStore((state) => state._hasHydrated);

  const cartCount = hasHydrated ? cart.length : 0;
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 p-1.5">
            <ShoppingBag className="h-5 w-5 text-white" />
            <div className="absolute -bottom-1 -left-1 h-3 w-3 rotate-45 bg-red-500" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            TRENDLAMA.
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden max-w-sm flex-1 px-8 md:block lg:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-muted/50 pl-10 pr-4 focus-visible:ring-ring/20 border-border"
            />
          </div>
        </div>

        {/* Actions - Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <Home className="h-5 w-5" />
          </Link>
          <Link href="/track-order" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Track Order
          </Link>
          <SignedIn>
            <Link href="/account/orders" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              My Orders
            </Link>
          </SignedIn>
          <button className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <Link href="/cart" className="text-muted-foreground hover:text-foreground transition-colors relative">
            <ShoppingCart className="h-5 w-5" />
            {hasHydrated && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm ring-2 ring-background">
                {cartCount}
              </span>
            )}
          </Link>
          <ThemeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-base font-medium">
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <Button variant="ghost" className="text-base font-medium">
                Sign out
              </Button>
            </SignOutButton>
          </SignedIn>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button className="text-muted-foreground">
            <Search className="h-5 w-5" />
          </button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 pt-10">
                <Link href="/" className="flex items-center gap-3 text-lg font-medium">
                  <Home className="h-5 w-5" /> Home
                </Link>
                <Link href="/track-order" className="flex items-center gap-3 text-lg font-medium">
                  <Search className="h-5 w-5" /> Track Order
                </Link>
                <SignedIn>
                  <Link href="/account/orders" className="flex items-center gap-3 text-lg font-medium">
                    <ShoppingBag className="h-5 w-5" /> My Orders
                  </Link>
                </SignedIn>
                <Link href="/notifications" className="flex items-center gap-3 text-lg font-medium">
                  <Bell className="h-5 w-5" /> Notifications
                </Link>
                <Link href="/cart" className="flex items-center gap-3 text-lg font-medium relative w-fit">
                  <ShoppingCart className="h-5 w-5" /> Cart
                  {hasHydrated && (
                    <span className="absolute -right-6 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm ring-2 ring-background">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <hr className="border-border" />
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className="w-full justify-start text-lg" variant="ghost">
                      Sign in
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <SignOutButton>
                    <Button className="w-full justify-start text-lg" variant="ghost">
                      Sign out
                    </Button>
                  </SignOutButton>
                </SignedIn>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
