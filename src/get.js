"use strict";
const database = require("../db/database.js");
const { text } = require("express");

const data = {
 getAll: async function run() {
   try {
     const db = await database.getDb();
     const allData = await db.collection.find().toArray();
     // print a message if no documents were found

     return {
        allData: allData
     }
   } finally {
     const db = await database.getDb();
     await db.client.close();
   }
 }
}

module.exports = data;