"use server"

import { clearCart, getCart } from "./carts";

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

        const newOrder = {
            ...deliveryInfo,
            items: cart,
            createdAt: new Date()
        }

        const result = await orderCollection.insertOne(newOrder)

        if (Boolean(result.insertedId)) {
            await clearCart()
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
