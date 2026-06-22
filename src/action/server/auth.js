"use server"

import bcrypt from "bcryptjs";
import { dbConnect, collections } from "@/lib/dbConnect";


const postUser = async (payload) => {

    try {

        const { name, email, password } = payload;

        // check payload:
        if (!name || !email || !password) {
            return {
                success: false,
                message: "All fields are required",
                data: null
            }
        }

        // check user:
        const existingUser = await dbConnect(collections.USERS).findOne({ email })

        if (existingUser) {
            return {
                success: false,
                message: "User already exists",
                data: null
            }
        }


        // create user:
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = {
            provider: 'credentials',
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: "user"
        }

        // Insert user: 
        const result = await dbConnect(collections.USERS).insertOne(newUser)

        if (!result.acknowledged) {
            return {
                success: false,
                message: "Failed to create user",
                data: null
            }
        }

        return {
            success: true,
            message: "User created successfully",
            data: { insertedId: result.insertedId.toString() }
        }


    } catch (error) {
        console.log(error)

        return {
            success: false,
            message: "Something went wrong",
            data: null
        }
    }
}


const loginUser = async (payload) => {

    try {

        const { email, password } = payload;

        // check payload:
        if (!email || !password) {
            return {
                success: false,
                message: "All fields are required",
                data: null
            }
        }

        // check user:
        const user = await dbConnect(collections.USERS).findOne({ email })

        console.log("User:", user);

        if (!user) {
            return {
                success: false,
                message: "User not found",
                data: null
            }
        }

        // check password:
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return {
                success: false,
                message: "Invalid password",
                data: null
            }
        }

        return {
            success: true,
            message: "User logged in successfully",
            data: user
        }

    } catch (error) {
        console.log(error)

        return {
            success: false,
            message: "Something went wrong",
            data: null
        }
    }
}

export {
    postUser,
    loginUser
}