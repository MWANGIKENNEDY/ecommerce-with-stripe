"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <div className="bg-red-50 p-6 rounded-full mb-8">
                <div className="bg-red-100 p-4 rounded-full">
                    <RefreshCcw className="w-12 h-12 text-red-600" />
                </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Something went wrong
            </h1>
            <p className="text-gray-500 text-lg max-w-md mx-auto mb-10">
                We encountered an unexpected error. Don't worry, our team is already looking into it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    onClick={() => reset()}
                    className="bg-gray-900 text-white px-8 py-6 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center gap-2"
                >
                    <RefreshCcw className="w-5 h-5" />
                    Try again
                </Button>

                <Link
                    href="/"
                    className="bg-white border-2 border-gray-200 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center gap-2 justify-center"
                >
                    <Home className="w-5 h-5" />
                    Go Home
                </Link>
            </div>

            {error.digest && (
                <p className="mt-12 text-xs text-gray-400 font-mono">
                    Error ID: {error.digest}
                </p>
            )}
        </div>
    );
}
