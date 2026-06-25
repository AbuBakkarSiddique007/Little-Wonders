"use client"

import { RiDeleteBin2Fill } from "react-icons/ri";
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { deleteItemFromCart } from "@/action/server/carts";


const CartItem = ({ item }) => {
    const router = useRouter();

    const deleteCartProduct = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to remove "${item.bangla}" from the cart?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"

        }).then(async (result) => {
            if (result.isConfirmed) {

                const response = await deleteItemFromCart(item._id);
                console.log("response : ", response);

                if (response.success) {
                    Swal.fire({
                        title: "Removed!",
                        text: "Item has been removed from your cart.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });

                    // router.refresh();

                } else {
                    Swal.fire({
                        title: "Failed!",
                        text: response.message || "Failed to remove item.",
                        icon: "error"
                    });
                }
            }
        });
    }


    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-base-100 p-4 rounded-2xl shadow-sm border border-base-200 transition-all hover:shadow-md">

            <div className="avatar">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-base-200 shrink-0 relative">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="96px" />
                </div>
            </div>

            <div className="flex-1 space-y-1 w-full text-center sm:text-left">
                <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>

                <p className="text-sm text-base-content/70 line-clamp-1">{item.bangla}</p>

                <div className="text-primary font-bold text-lg">
                    ৳{item.price}
                </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 mt-4 sm:mt-0">
                <div className="join">
                    <button className="join-item btn btn-sm bg-base-200 hover:bg-base-300 border-none">-</button>
                    <span className="join-item btn btn-sm no-animation bg-base-100 w-12 border-none">{item.quantity}</span>
                    <button className="join-item btn btn-sm bg-base-200 hover:bg-base-300 border-none">+</button>
                </div>


                {/* Calculate total price */}
                <div className="text-right font-bold text-lg w-20 hidden sm:block">
                    ৳{item.price * item.quantity}
                </div>


                <button
                    onClick={deleteCartProduct}

                    className="btn btn-square btn-ghost text-error hover:bg-error/20 btn-sm">
                    <RiDeleteBin2Fill className="text-3xl" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
