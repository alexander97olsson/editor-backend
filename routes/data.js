var express = require('express');
const { get } = require('.');
var router = express.Router();
const getAll = require("../src/get.js");
const getAllPost = require("../src/post.js");
const getAllUpdate = require("../src/update.js");
const ObjectId = require('mongodb').ObjectId;


router.get('/', async function(req, res, next) {
    let result = await getAll.getAll();
    const data = {
        data: {
            msg: result.allData
        }
    };
    console.log(data);
    res.json(data);
});

router.post('/', async function(req, res, next) {
    const doc = {
        title: req.body.title,
        maintext: req.body.maintext
    }
    await getAllPost.postInsert(doc);
    const data = {
        msg: doc
    };
    console.log(data);
    res.json(data);
});

router.put('/', async function(req, res, next) {


    const filter = { _id: ObjectId(req.body.__id) };
    const doc = {
        title: req.body.title,
        maintext: req.body.maintext
    }
    await getAllUpdate.updateDoc(filter, doc);
    const data = {
        msg: doc
    };
    console.log(data);
    res.json(data);
});

module.exports = router;