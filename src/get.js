"use strict";
const database = require("../db/database.js");

const data = {
    getAllData: async function run(res=undefined, req=undefined) {
        if (req === undefined) {
            console.log("req is undefined");
        }
        let db;

        try {
            db = await database.getDb();
            const allData = await db.collection.find().toArray();

            if (res === undefined) {
                return allData;
            }

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
};

module.exports = data;
