/**
 * Connect to the database and search using a criteria.
 */
"use strict";
const config = require("../config.json");
const mongo = require("mongodb").MongoClient;
const collectionName = "crowd";

const database = {
    getDb: async function getDb () {
        let dsn = `mongodb+srv://${config.username}:${config.password}@cluster0.xs9r9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb+srv://${config.username}:${config.password}@cluster0.xs9r9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;