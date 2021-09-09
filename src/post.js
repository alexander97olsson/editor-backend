"use strict";
const database = require("../db/database.js");
const { text } = require("express");

const data = {
  postInsert: async function inserting(doc) {
    let db;
    try {
        db = await database.getDb();
        await db.collection.insertOne(doc);
      } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                path: "/data",
                title: "Database error",
                message: e.message
            }
        }); 
      } finally {
         await db.client.close();
       }
    }
}

module.exports = data;