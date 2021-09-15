"use strict";
const database = require("../db/database.js");
const { text } = require("express");

const data = {
  createData: async function inserting(res, req) {
    const doc = {
      title: req.body.title,
      maintext: req.body.maintext
    }
    let db;
    try {
        db = await database.getDb();
        const result = await db.collection.insertOne(doc);
        if (result) {
          return res.status(202).json({
              data: result
          });
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