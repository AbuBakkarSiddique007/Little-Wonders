const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI
const dbName = process.env.DB_NAME


export const collections = {
    PRODUCTS: "products",
    USERS: 'users',
    CARTS: "carts"
}


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export const dbConnect = (collectionName) => {
    return client.db(dbName).collection(collectionName)
}