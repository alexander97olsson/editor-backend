"use strict";
const database = require("../db/database.js");
const { text } = require("express");

const data = {
 postInsert: async function inserting(doc) {
    try {
        const db = await database.getDb();
        const result = await db.collection.insertOne(doc);
        // print a message if no documents were found

      } finally {
        const db = await database.getDb();
        await db.client.close();
      }
 }
}

module.exports = data;