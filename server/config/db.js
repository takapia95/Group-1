require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let dbInstance;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDB() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB!");
        dbInstance = client.db(dbName); 
    } catch (error) {
        console.error("Could not connect to DB:", error);
        process.exit(1);
    }
}

const getDb = () => dbInstance;

module.exports = { connectDB, getDb };
