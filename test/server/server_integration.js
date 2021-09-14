
/* global describe it */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('app', () => {
    describe('GET /data', () => {
        it('Should give me some data', (done) => {
            chai.request(server)
                .get("/data")
                .end((err, res) => {
                    res.body.should.be.an("object");
                    res.body.data.msg.should.be.an("array");
                    res.body.data.msg.length.should.be.above(0);
                    done();
                });
        });


        it('should delete one doc', (done) => {
            let doc = {
                _id: "61404046fffa749fbef1fb67",
                title: "testing title1",
                maintext: "<p>Testar en string från test</p>"
            };

            chai.request(server)
                .delete("/data")
                .send(doc)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
/*         it('should add an document', (done) => {
            let doc = {
                title: "testing title",
                maintext: "<p>Testar en string från test</p>"
            };
            chai.request(server)
                .post("/data")
                .send(doc)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        }); */

        it('should get 204', (done) => {
            let doc = {
                _id: "613f48a183d9adf4e376bd25",
                title: "newTitle",
                maintext: "<p>updated worked</p>"
            };
            chai.request(server)
                .put("/data")
                .send(doc)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('GET /index', () => {
        it('index', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
});
