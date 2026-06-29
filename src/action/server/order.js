"use server"

import { sendEmail } from "@/lib/sendEmail";
import { clearCart, getCart } from "./carts";
import { orderInvoiceTemplate } from "@/lib/invoiceTemplate";

const { authOptions } = require("@/lib/authOption");
const { dbConnect, collections } = require("@/lib/dbConnect");
const { getServerSession } = require("next-auth");

const orderCollection = dbConnect(collections.ORDERS)

const createOrder = async (deliveryInfo) => {
    try {
        const { user } = await getServerSession(authOptions)

        if (!user) {
            return { success: false, message: "User not logged in" }
        }

        const cart = await getCart()

        // const products = cart.data.map(item => ({
        //     productId: item.productId,
        //     title: item.title,
        //     price: item.price,
        //     quantity: item.quantity
        // }))



        const totalPrice = cart.data.reduce((acc, item) => acc + item.price * item.quantity, 0)

        const newOrder = {
            ...deliveryInfo,
            totalPrice,
            items: cart.data,
            createdAt: new Date()
        }

        const result = await orderCollection.insertOne(newOrder)

        if (Boolean(result.insertedId)) {
            await clearCart()
        }

        // Send Invoice Email
        try {
            await sendEmail({
                to: user.email,
                subject: "Your Order Invoice - Little Wonders",
                html: orderInvoiceTemplate({
                    orderId: result.insertedId.toString(),
                    items: cart.data,
                    totalPrice,
                }),
            });
        } catch (emailError) {
            console.error("Nodemailer failed to send order invoice email:", emailError);
        }


        if (result?.insertedId) {
            return {
                success: true,
                message: "Order created successfully",
                orderId: result.insertedId.toString()
            }
        }


    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export {
    createOrder
}
