'use client'

import { handleCart } from '@/action/server/carts';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { BsCartPlus } from 'react-icons/bs';
import Swal from 'sweetalert2';



const AddToCartButton = ({ product }) => {
    // const isLogin = false;

    const router = useRouter()
    const path = usePathname()
    const session = useSession()

    const [isLoading, setIsLoading] = useState(false)

    const isLogin = session?.status === "authenticated"

    const handleAddToCart = async () => {
        setIsLoading(true)

        if (isLogin) {
            // alert(`Added ${product.bangla || product.title} to cart`)

            const result = await handleCart({
                product, inc: true
            })


            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Added to Cart',
                    text: `${product.bangla || product.title} has been added to your cart.`,
                    timer: 2000,
                    showConfirmButton: false
                });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to add product to cart',
                    text: `${product.bangla || product.title} has been added to your cart.`,
                    timer: 2000,
                    showConfirmButton: false
                });
            }

            setIsLoading(false)
        }

        else {
            // redirect to login
            router.push(`/login?callbackUrl=${path}`)
            setIsLoading(false)

        }


    }

    return (
        <div>
            <button
                disabled={isLoading}
                onClick={handleAddToCart}
                className="btn btn-primary btn-sm flex-1">

                {isLoading ? <BiLoaderCircle className="animate-spin text-lg" /> : <BsCartPlus className="text-lg" />}

                {isLoading ? "Adding..." : "Add to Cart"}
            </button>
        </div>
    );
};


export default AddToCartButton;