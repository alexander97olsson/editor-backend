"use strict";
const database = require("../db/database.js");
const ObjectId = require('mongodb').ObjectId;
const mailgun = require("mailgun-js");
let config;

try {
    config = require("../config.json");
} catch (error) {
    console.error(error);
}

const apiKeyer = "test" || config.mailgunAPIKey;
const DOMAIN = "testing" || config.mailgunDomain;

const data = {
    updateData: async function update(res, req) {
        const filter = { _id: ObjectId(req.body.__id) };
        const doc = {
            title: req.body.title,
            maintext: req.body.maintext,
        };

        let db;

        try {
            db = await database.getDb();
            const result = await db.collection.updateOne(filter, {$set: doc});

            if (result) {
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
    },

    updateUserAccess: async function update1(res, req) {
        const filter = { _id: ObjectId(req.body.__id) };

        let updateDoc = {
            $push: {
                allowed_users: req.body.allowed_users
            }
        };

        let db;

        try {
            db = await database.getDb();
            const result = await db.collection.updateOne(filter, updateDoc);

            if (result) {
                const mg = mailgun({apiKey: apiKeyer, domain: DOMAIN});
                const allInfo = {
                    from: 'Alexander <alexander93olsson@hotmail.com>',
                    to: req.body.allowed_users,
                    subject: 'Hejsan och välkommen!',
                    text: `Du har blivit inbjuden till att jobba i ett dokument.\n` +
                    `Följ länken för att registrera dig: ` +
                    `https://www.student.bth.se/~alos17/alex-editor.\n` +
                    `Om du redan är registrerad är det bara att logga in och skriva på!.\n` +
                    `Vi ses i dokumentet, kul om du vill vara med!`
                };

                mg.messages().send(allInfo, function (error, body) {
                    if (error) {
                        console.log(error);
                    }
                    console.log(body);
                });
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
};

module.exports = data;
