var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Testing index site"
        }
    };

    res.status(201).json(data);
});

module.exports = router;
