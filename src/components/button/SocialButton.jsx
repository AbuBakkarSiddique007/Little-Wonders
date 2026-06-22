"use client"

import React from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

const SocialButton = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const handleSocialSignIn = async () => {
        try {
            const result = await signIn("google", {
                callbackUrl: searchParams.get('callbackUrl') || "/",
            });

            if (result?.error) {
                toast.error("Failed to login")
            }
            else {
                toast.success("Login successful")
            }


        } catch (error) {
            console.error("Social login failed:", error);
            toast.error("Failed to login")
        }
    }

    return (
        <div>
            <button onClick={handleSocialSignIn} className="btn btn-outline w-full flex items-center gap-2">
                <FcGoogle className="text-xl" />
                Continue with Google
            </button>
        </div>
    );
};

export default SocialButton;