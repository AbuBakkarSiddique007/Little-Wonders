"use client"

import { createOrder } from "@/action/server/order";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CheckOut = ({ cartItems = [] }) => {
    const session = useSession()
    const router = useRouter()
    console.log("user => ", session.data)

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target

        const fullName = form.fullName.value
        const email = form.email.value
        const phone = form.phone.value
        const address = form.address.value

        const data = {
            fullName,
            email,
            phone,
            address
        }

        console.log("Form Data Submitted:", data)


        const result = await createOrder(data)

        if (result.success) {
            Swal.fire({
                title: "Order Placed Successfully",
                text: "Your order has been placed successfully.",
                icon: "success",
                confirmButtonText: "OK"
            }).then(() => {
                router.push("/")
            })
        }
        else {
            Swal.fire({
                title: "Order Failed",
                text: "Your order has been failed.",
                icon: "error",
                confirmButtonText: "OK"
            })
        }

    }

    if (!cartItems.length) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <p className="text-xl font-semibold text-base-content/60 mb-4">Your cart is empty.</p>
                <a href="/cart" className="btn btn-primary rounded-xl">Go to Cart</a>
            </div>
        )
    }

    if (session.status === 'loading') {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-base-200/40 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Checkout</h1>
                    <p className="text-base-content/50 text-sm mt-1">Complete your order details below.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                            <div className="bg-base-100 rounded-3xl border border-base-200 shadow-sm p-6">
                                <h2 className="text-xl font-bold mb-6">Delivery Details</h2>

                                <div className="space-y-4">
                                    <div className="form-control">
                                        <label className="label label-text font-medium">Full Name <span className="text-error">*</span></label>
                                        <input
                                            type="text"
                                            name="fullName"

                                            required
                                            readOnly
                                            value={session?.data?.user?.name}

                                            placeholder="Enter your full name"
                                            className="input input-bordered w-full rounded-xl"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label label-text font-medium">Email <span className="text-error">*</span></label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            readOnly
                                            value={session?.data?.user?.email}
                                            placeholder="Enter your email"
                                            className="input input-bordered w-full rounded-xl"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label label-text font-medium">Phone Number <span className="text-error">*</span></label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            placeholder="Enter your phone number"
                                            className="input input-bordered w-full rounded-xl"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label label-text font-medium">Full Address <span className="text-error">*</span></label>
                                        <textarea
                                            name="address"
                                            required
                                            rows={3}
                                            placeholder="Enter your full address"
                                            className="textarea textarea-bordered w-full rounded-xl resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT: Order Summary ── */}
                        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 w-full">
                            <div className="bg-base-100 border border-base-200 rounded-3xl shadow-sm overflow-hidden">
                                <div className="px-6 py-5 border-b border-base-200">

                                    <h2 className="text-xl font-bold">Order Summary</h2>

                                    <p className="text-xs text-base-content/40 mt-0.5">{totalQty} {totalQty === 1 ? 'item' : 'items'}</p>

                                </div>

                                <div className="px-6 py-5">
                                    <ul className="space-y-3 mb-6">

                                        {cartItems.map((item) => (
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
                                        <span className="font-bold text-xl text-primary">৳{total}</span>
                                    </div>

                                    <div className="mt-4 bg-base-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                                        <span className="text-2xl">💵</span>
                                        <div>
                                            <p className="text-sm font-semibold">Cash on Delivery</p>
                                            <p className="text-xs text-base-content/50">Pay when you receive your order</p>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full rounded-2xl text-base font-semibold mt-5"
                                    >
                                        🛍️ Place Order
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckOut;