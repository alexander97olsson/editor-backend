var express = require('express');
var router = express.Router();
const getAll = require("../src/get.js");
const getAllPost = require("../src/post.js");
const getAllUpdate = require("../src/update.js");

router.get('/',
    (req, res) => getAll.getAllData(res, req)
);

router.post('/',
    (req, res) => getAllPost.createData(res, req)
);

router.put('/',
    (req, res) => getAllUpdate.updateData(res, req)
);

module.exports = router;
