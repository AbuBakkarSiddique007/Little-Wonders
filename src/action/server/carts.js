"use server";

const { authOptions } = require("@/lib/authOption");
const { dbConnect, collections } = require("@/lib/dbConnect");
const { getServerSession } = require("next-auth");


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

export {
    handleCart
}