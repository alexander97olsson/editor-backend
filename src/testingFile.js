"use strict";
const database = require("../db/database.js");
const { text } = require("express");

const testClass = {
  getValues: function(first, second) {
    return first + second;
  }
}

module.exports = testClass;