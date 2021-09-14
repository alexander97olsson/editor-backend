"use strict";
const database = require("../db/database.js");
const { text } = require("express");

/* const data = {
 getAll: async function run() {
   let db;
   try {
     db = await database.getDb();
     const allData = await db.collection.find().toArray();
     return {
        allData: allData
     }
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
} */

const data = {
  getAllDataForUser: async function run(res, req) {
    let db;
    try {
      db = await database.getDb();
      const allData = await db.collection.find().toArray();
      return res.json({ data: { msg: allData } });
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