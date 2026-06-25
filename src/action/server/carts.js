"use server";

import { revalidatePath } from "next/cache";
import { cache } from "react";

const { authOptions } = require("@/lib/authOption");
const { dbConnect, collections } = require("@/lib/dbConnect");
const { getServerSession } = require("next-auth");
const { ObjectId } = require("mongodb");


const cartCollection = dbConnect(collections.CARTS)

const handleCart = async ({ product, inc = true }) => {

    const { user } = await getServerSession(authOptions)
    console.log("user :  ", user);

    if (!user) {
        return {
            success: false,
            message: "User not found"
        }
    }

    const query = {
        email: user.email,
        productId: product._id
    }

    const isAdded = await cartCollection.findOne(query)

    console.log("isAdded : ", isAdded);

    if (isAdded) {
        const updatedData = {
            $inc: {
                quantity: inc ? 1 : -1
            }
        }

        const result = await cartCollection.updateOne(query, updatedData)

        console.log("result : ", result);

        return {
            success: Boolean(result.modifiedCount)
        }
    }

    else {
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

        console.log("result : ", result);

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

        console.log("result : ", result);

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
            _id: new ObjectId(id)
            // email: user?.email,
        }

        const result = await cartCollection.deleteOne(query)

        console.log("result : ", result);

        if (result.deletedCount === 1) {
            revalidatePath("/cart")
        }

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
export {
    handleCart,
    getCart,
    deleteItemFromCart
}