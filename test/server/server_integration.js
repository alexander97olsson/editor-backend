
/* global describe it */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('app', () => {
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
