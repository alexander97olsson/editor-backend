var express = require('express');
var router = express.Router();
const getAll = require("../src/get.js");
const getAllPost = require("../src/post.js");
const getAllUpdate = require("../src/update.js");
const auth = require("../src/auth.js");

router.get('/',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => getAll.getAllData(res, req)
);

router.post('/',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => getAllPost.createData(res, req)
);

router.put('/',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => getAllUpdate.updateData(res, req)
);

router.put('/user',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => getAllUpdate.updateUserAccess(res, req)
);

module.exports = router;
