"use client"

import { useMemo, useState } from 'react';
import CartItem from './CartItem';
import Link from 'next/link';

const ClientCart = ({ cartItem = [] }) => {

    const [items, setItems] = useState(cartItem)

    const totalItem = useMemo(() => {
        return items.reduce((acc, item) => acc + item.quantity, 0)
    }, [items])

    const totalPrice = useMemo(() => {
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    }, [items])

    // Remove item from cart
    const removeItem = async (id) => {
        setItems((prevItems) => prevItems.filter((item) => item._id !== id))
    }

    // Update Quantity: Only updates local state after a successful DB call.
    const updateQuantity = (id, newQuantity) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item._id === id ? { ...item, quantity: newQuantity } : item
            )
        )
    }

    return (
        <div>
            {items?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[60vh] bg-base-200 rounded-3xl mt-8">
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <p className="text-gray-600">Looks like you haven&rsquo;t added anything to your cart yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">


                    <div className="lg:col-span-7 xl:col-span-8">
                        <h1 className="text-3xl font-bold mb-8">
                            Shopping Cart
                            <span className="ml-2 text-lg font-normal text-base-content/50">({items?.length || 0} items)</span>
                        </h1>

                        <div className="flex flex-col gap-4">
                            {items?.map(item => (
                                <CartItem
                                    key={item._id}
                                    item={item}
                                    removeItem={removeItem}
                                    updateQuantity={updateQuantity}
                                />
                            ))}
                        </div>
                    </div>


                    <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 w-full">
                        <div className="bg-base-100 border border-base-200 rounded-3xl shadow-sm overflow-hidden">


                            <div className="px-6 py-5 border-b border-base-200">
                                <h2 className="text-xl font-bold">Order Summary</h2>
                            </div>

                            <div className="px-6 py-5">


                                <ul className="space-y-3 mb-6">
                                    {items.map((item) => (
                                        <li key={item._id} className="flex justify-between items-start gap-3 text-sm">
                                            <span className="text-base-content/80 flex-1 leading-snug">
                                                {item.title}
                                                <span className="text-base-content/50 ml-1">× {item.quantity}</span>
                                            </span>
                                            <span className="font-medium shrink-0">৳{item.price * item.quantity}</span>
                                        </li>
                                    ))}
                                </ul>


                                <div className="border-t border-base-200 pt-4 flex justify-between items-center">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-xl text-primary">৳{totalPrice}</span>
                                </div>


                                <Link
                                    href={"/checkout"}
                                    className="btn btn-primary w-full rounded-2xl text-base font-semibold mt-5">
                                    Proceed to Checkout
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default ClientCart;