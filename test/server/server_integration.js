
/* global describe it */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

const database = require("../../db/database.js");
const collectionName = "crowd";
chai.should();

chai.use(chaiHttp);

describe('app', () => {
    /*before(() => {
        return new Promise(async (resolve) => {
            const db = await database.getDb();

            db.db.listCollections(
                { name: collectionName }
            )
                .next()
                .then(async function(info) {
                    if (info) {
                        await db.collection.drop();
                    }
                })
                .catch(function(err) {
                    console.error(err);
                })
                .finally(async function() {
                    await db.client.close();
                    resolve();
                });
        });
    });*/
    describe('GET /data', () => {
        it('should add an document', (done) => {
            let doc = {
                title: "testing title",
                maintext: "<p>Testar en string från testasdasd</p>"
            };
            chai.request(server)
                .post("/data")
                .send(doc)
                .end((err, res) => {
                    console.log(res.body.data);
                    done();
                });
        });

        it('Should give me some data', (done) => {
            chai.request(server)
                .get("/data")
                .end((err, res) => {
                    //res.body.should.be.an("object");
                    //res.body.data.msg.should.be.an("array");
                    //res.body.data.msg.length.should.be.above(0);
                    console.log(res.body);
                    done();
                });
        });
    });
});
