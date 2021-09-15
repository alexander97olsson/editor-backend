"use strict";
const database = require("../db/database.js");
const { text } = require("express");
const ObjectId = require('mongodb').ObjectId;

const data = {
  updateData: async function update(res, req) {
    const filter = { _id: ObjectId(req.body.__id) };
    const doc = {
        title: req.body.title,
        maintext: req.body.maintext
    }
     let db;
     try {
         db = await database.getDb();
         const result = await db.collection.updateOne(filter, {$set: doc});
         if(result) {
            return res.status(204).json();
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
 }

module.exports = data;