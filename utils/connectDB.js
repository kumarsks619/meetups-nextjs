import { MongoClient } from 'mongodb'

const connectDB = async () => {
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = await client.db()

    return { db, client }
}

export default connectDB
