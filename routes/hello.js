var express = require('express');
var router = express.Router();

router.get("/hello/:msg", function(req, res, msg) {
    const data = {
        data: {
            msg: req.params.msg
        }
    };

    res.json(data);
});

module.exports = router;