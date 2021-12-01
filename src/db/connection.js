const { MongoClient } = require("mongodb")

require("dotenv").config()

const client = new MongoClient(process.env.MONGO_URI)

const connection = async (crudFunc, dataObj) => {
    try {
        await client.connect()
        console.log("Connection successful");
        const db = client.db("testDb") //creating new database
        const collection = db.collection("movies") //creating new collection
        await crudFunc(collection, dataObj)
        // await collection.insertOne({name: "lotr"})
        client.close();
    } catch (error) {
        console.log(error);
    }
}


module.exports = connection

