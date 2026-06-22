'use client'

import { usePathname, useRouter } from 'next/navigation';
import { BsCartPlus } from 'react-icons/bs';

const AddToCartButton = ({ product }) => {
    const isLogin = false;
    // const isLogin = true;
    
    const router = useRouter()
    const path = usePathname()

    const handleAddToCart = () => {
        if (isLogin) {
            alert(`Added ${product.bangla || product.title} to cart`)
        }

        else {
            // redirect to login
            router.push(`/login?callbackUrl=${path}`)
        }
    }



    return (
        <div>
            <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-sm flex-1">
                <BsCartPlus className="text-lg" /> Add to Cart
            </button>
        </div>
    );
};


export default AddToCartButton;