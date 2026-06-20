import React from 'react';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">

            <div className="relative flex items-center justify-center w-24 h-24 mb-8">

                <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>

                <div className="absolute inset-3 rounded-full border-4 border-secondary/20 border-b-secondary animate-[spin_1.5s_linear_infinite_reverse]"></div>

                <span className="loading loading-infinity text-accent w-10 h-10"></span>
            </div>

            <div className="text-center flex flex-col items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">
                    Little Wonders
                </h2>
                <p className="text-base-content/60 font-medium tracking-wide animate-pulse flex items-center gap-2">
                    অপেক্ষা করুন, দারুণ কিছু আসছে
                    <span className="loading loading-dots loading-xs"></span>
                </p>
            </div>
        </div>
    );
};

export default Loading;