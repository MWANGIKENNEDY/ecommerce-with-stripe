import React from "react";
import Image from "next/image";

const Hero = () => {
    return (
        <div className="relative w-full bg-background overflow-hidden py-12 md:py-24">
            {/* Container */}
            <div className="container mx-auto px-4 relative flex flex-col items-center justify-center min-h-[400px] md:min-h-[600px]">

                {/* Wavy Background SVG */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg
                        viewBox="0 0 1000 600"
                        className="w-full h-full opacity-90 scale-110 md:scale-100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M-100 300C50 200 250 500 450 400C650 300 850 450 1100 350V600H-100V300Z"
                            fill="#FACC15"
                        />
                    </svg>
                </div>

                {/* HERO Text (Back Layer) */}
                <div className="absolute inset-0 select-none pointer-events-none flex items-center justify-center">
                    <div className="relative w-full h-full max-w-6xl mx-auto">
                        <span className="absolute top-10 left-4 md:top-20 md:left-20 text-[6rem] md:text-[14rem] font-black text-foreground/80 tracking-tighter uppercase leading-none z-0">
                            SHOW
                        </span>
                        <span className="absolute bottom-10 right-4 md:bottom-20 md:right-20 text-[4rem] md:text-[10rem] font-bold text-foreground/70 tracking-tight z-20">
                            Your Style.
                        </span>
                    </div>
                </div>

                {/* Sneaker Image (Middle Layer) */}
                <div className="relative z-10 transform -rotate-12 hover:rotate-0 transition-transform duration-500 ease-in-out cursor-pointer md:mt-20">
                    <Image
                        src="/sneaker-hero.png"
                        alt="Yellow Sneaker"
                        width={800}
                        height={800}
                        className="w-[300px] md:w-[650px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_35px_35px_rgba(255,255,255,0.1)]"
                        priority
                    />
                </div>

            </div>
        </div>
    );
};

export default Hero;
