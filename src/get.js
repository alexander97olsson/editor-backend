"use strict";
const database = require("../db/database.js");
const { text } = require("express");

const data = {
  getAllData: async function run(res, req) {
    let db;
    try {
      db = await database.getDb();
      const allData = await db.collection.find().toArray();
      return res.status(201).json({ data: { msg: allData } });
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