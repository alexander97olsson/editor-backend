"use strict";
const database = require("../db/database.js");
const { text } = require("express");

const data = {
 updateDoc: async function update(filter, doc) {
    try {
        const db = await database.getDb();
        await db.collection.updateOne(filter, {$set: doc});
        // print a message if no documents were found
        
      } finally {
        const db = await database.getDb();
        await db.client.close();
      }
 }
}

module.exports = data;