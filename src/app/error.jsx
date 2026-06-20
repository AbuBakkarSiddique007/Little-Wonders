'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4 text-center">
            
            <div className="relative mb-8">

                <div className="absolute inset-0 bg-error/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="bg-error/10 p-6 rounded-full border border-error/20 relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-error animate-[bounce_2s_infinite]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mb-3">
                ওহ না! কিছু একটা ভুল হয়েছে
            </h2>
            <h3 className="text-xl font-bold text-base-content/80 mb-4">
                Oops! Something went wrong
            </h3>

            <p className="text-base-content/60 max-w-md mx-auto mb-8">
                দুঃখিত, কোনো অপ্রত্যাশিত সমস্যার কারণে পেজটি লোড করা যাচ্ছে না। দয়া করে আবার চেষ্টা করুন।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button
                    onClick={() => reset()}
                    className="btn btn-error text-error-content rounded-full px-8 shadow-lg hover:shadow-error/30 transition-all flex-1 sm:flex-none"
                >
                    পুনরায় চেষ্টা করুন
                </button>
                <Link href="/" className="btn btn-outline rounded-full px-8 flex-1 sm:flex-none">
                    হোম পেজে যান
                </Link>
            </div>
        </div>
    );
}
