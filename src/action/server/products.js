import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

const getProducts = async () => {
    try {
        const products = await dbConnect(collections.PRODUCTS).find().toArray()

        return {
            data: products,
            success: true
        };
        
    } catch (error) {
        console.log(error)
        return {
            message: "Failed to fetch products",
            success: false
        }
    }
}


const getSingleProduct = async (id) => {
    try {
        if (!id || id.length !== 24) {
            return {
                message: "Invalid product id",
                success: false
            }
        }

        const query = {
            _id: new ObjectId(id)
        }

        const product = await dbConnect(collections.PRODUCTS).findOne(query)

        if (!product) {
            return {
                message: "Product not found",
                success: false
            }
        }

        return {
            data: product,
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            message: "Failed to fetch product",
            success: false
        }
    }
}

export {
    getProducts,
    getSingleProduct
}