import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <div className="relative">
                <h1 className="text-[12rem] md:text-[16rem] font-black text-gray-100 leading-none select-none">
                    404
                </h1>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
                        Lost in Style?
                    </h2>
                    <p className="text-gray-500 text-lg max-w-md mx-auto mb-10">
                        The page you are looking for doesn't exist or has been moved to a more fashionable location.
                    </p>
                </div>
            </div>

            <Link
                href="/"
                className="group flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl shadow-gray-200"
            >
                <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Store
            </Link>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl opacity-50">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">TrendLama E-commerce</p>
                <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            </div>
        </div>
    );
}
