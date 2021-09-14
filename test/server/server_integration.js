
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
