"use server"

import { getCart } from "@/action/server/carts";
import CartItem from "@/components/cart/CartItem";

const CartPage = async () => {
    const cartItems = await getCart();

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-4xl min-h-[80vh]">
            {
                cartItems.data?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] bg-base-200 rounded-3xl mt-8">
                        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                        <p className="text-gray-600">Looks like you haven&rsquo;t added anything to your cart yet.</p>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartItems.data?.length || 0} items)</h1>

                        <div className="flex flex-col gap-4">
                            {cartItems.data?.map(item => {

                                // Solve the error of _id is not serializable:
                                const plainItem = { ...item, _id: item._id.toString() };
                                return (
                                    <CartItem
                                        key={plainItem._id}
                                        item={plainItem} />
                                );
                            })}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CartPage;