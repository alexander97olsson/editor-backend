
/* global describe it */

process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhAaG90` +
`bWFpbC5zZSIsImlhdCI6MTYzNDg5ODE4NSwiZXhwIjoxNjM0OTg0NTg1fQ.` +
`RTHNcpWyfmCXwE3ngNHLB8z5016mBPcoMSFEa50iIaE`;
//const database = require("../../db/database.js");
//const collectionName = "crowd";

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
                .set({"x-access-token": token})
                .send(doc)
                .end((err, res) => {
                    res.should.have.status(202);
                    done();
                });
        });

        it('Should give me some data', (done) => {
            chai.request(server)
                .get("/data")
                .set({"x-access-token": token})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.msg.should.be.an("array");
                    res.body.data.msg.length.should.be.above(0);
                    assert.equal(res.body.data.msg[0].title, "testing title");
                    done();
                });
        });

        it('Should update some data', (done) => {
            chai.request(server)
                .get("/data")
                .set({"x-access-token": token})
                .end((err, res) => {
                    console.log(res.body.data.msg[0]._id);
                    let doc = {
                        __id: res.body.data.msg[0]._id,
                        title: "newTitle",
                        maintext: "<p>Testar en string från testasdasd</p>"
                    };

                    chai.request(server)
                        .put("/data")
                        .set({"x-access-token": token})
                        .send(doc)
                        .end((err, res) => {
                            res.should.have.status(204);
                            done();
                        });
                });
        });
    });
    describe('GET /index', () => {
        it('testing index', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(201);
                    console.log(res.body.data.msg);
                    assert.equal(res.body.data.msg, "Testing index site");
                    done();
                });
        });
    });
});
