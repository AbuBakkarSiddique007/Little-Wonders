"use server"

import { getCart } from "@/action/server/carts";
import CartItem from "@/components/cart/CartItem";
import ClientCart from "@/components/cart/ClientCart";

const CartPage = async () => {
    const cartItems = await getCart();
    console.log(cartItems);

    const formatCartData = cartItems?.data?.map(item => ({
        ...item,
        _id: item._id.toString()
    }))


    return (
        <div className="container mx-auto p-4 md:p-8 max-w-4xl min-h-[80vh]">
            <ClientCart
                cartItem={formatCartData}
            ></ClientCart>
        </div>
    );
};

export default CartPage;