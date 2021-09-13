
/**
* Test for class Car, parameterized version of testsuite.
 */
"use strict";

/* global describe it */

var assert = require("assert");
const mathThings = require("../src/testingFile");


/**
 * Check a card with its expected card face.
 */
 describe("Get value of 4", function() {
    it("should return 4", function() {
        let res = mathThings.getValues(2, 2);

        assert.equal(res, "4");
    });
});
