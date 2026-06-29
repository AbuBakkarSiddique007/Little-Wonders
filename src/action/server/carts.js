"use server";

import { revalidatePath } from "next/cache";
import { cache } from "react";

const { authOptions } = require("@/lib/authOption");
const { dbConnect, collections } = require("@/lib/dbConnect");
const { getServerSession } = require("next-auth");
const { ObjectId } = require("mongodb");


const cartCollection = dbConnect(collections.CARTS)

const handleCart = async (productId) => {

    const { user } = await getServerSession(authOptions)

    if (!user) {
        return {
            success: false,
            message: "User not found"
        }
    }

    const query = {
        email: user?.email,
        productId: new ObjectId(productId)
    }

    const isAdded = await cartCollection.findOne(query)

    if (isAdded) {
        const updatedData = {
            $inc: {
                quantity: 1
            }
        }

        const result = await cartCollection.updateOne(query, updatedData)

        return {
            success: Boolean(result.modifiedCount)
        }
    }

    else {

        const product = await dbConnect(collections.PRODUCTS).findOne({ _id: new ObjectId(productId) })



        const newData = {
            productId: product._id,
            email: user.email,
            title: product.title,
            bangla: product.bangla,
            image: product.image,
            price: product.price - Math.floor((product.price * (product.discount || 0)) / 100),
            quantity: 1,
            username: user.name
        }

        const result = await cartCollection.insertOne(newData)

        return {
            success: Boolean(result.acknowledged)
        }
    }
}



// const getCart = async () => {
//     try {
//         const { user } = await getServerSession(authOptions)

//         if (!user) {
//             return {
//                 success: false,
//                 message: "User not found"
//             }
//         }

//         const query = {
//             email: user?.email
//         }

//         const result = await cartCollection.find(query).toArray()

//         console.log("result : ", result);

//         return {
//             success: true,
//             data: result
//         }

//     } catch (error) {
//         console.log(error);
//         return {
//             success: false,
//             message: "No cart data found"
//         }
//     }
// }

const getCart = cache(async () => {
    try {
        const { user } = await getServerSession(authOptions)

        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }

        const query = {
            email: user?.email
        }

        const result = await cartCollection.find(query).toArray()

        return {
            success: true,
            data: result
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "No cart data found"
        }
    }
})


const deleteItemFromCart = async (id) => {
    try {
        const { user } = await getServerSession(authOptions)

        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }

        const query = {
            _id: new ObjectId(id),
            email: user?.email,
        }

        const result = await cartCollection.deleteOne(query)

        // if (result.deletedCount === 1) {
        //     revalidatePath("/cart")
        // }

        return {
            success: Boolean(result.deletedCount)
        }


    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to delete cart item"
        }
    }
}



const increaseItemDB = async (id, quantity) => {
    try {
        const { user } = await getServerSession(authOptions)

        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }

        if (quantity >= 10) {
            return {
                success: false,
                message: "You can only add 10 items in the cart"
            }
        }

        const query = {
            _id: new ObjectId(id),
            email: user?.email,
        }

        const updatedData = {
            $inc: {
                quantity: 1
            }
        }

        const result = await cartCollection.updateOne(query, updatedData)

        return {
            success: Boolean(result.modifiedCount)
        }


    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to increase cart item"
        }
    }
}

const decreaseItemDB = async (id, quantity) => {
    try {
        const { user } = await getServerSession(authOptions)

        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }

        if (quantity <= 1) {
            return {
                success: false,
                message: "Item quantity must be at least 1"
            }
        }

        const query = {
            _id: new ObjectId(id),
            email: user?.email,
        }

        const updatedData = {
            $inc: {
                quantity: -1
            }
        }

        const result = await cartCollection.updateOne(query, updatedData)

        return {
            success: Boolean(result.modifiedCount)
        }


    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to decrease cart item"
        }
    }
}


const clearCart = async () => {
    try {
        const { user } = await getServerSession(authOptions)

        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }

        const query = {
            email: user?.email
        }

        const result = await cartCollection.deleteMany(query)

        revalidatePath("/cart")
        revalidatePath("/checkout")

        return {
            success: Boolean(result.deletedCount)
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to clear cart"
        }
    }
}

export {
    handleCart,
    getCart,
    deleteItemFromCart,
    increaseItemDB,
    decreaseItemDB,
    clearCart
}