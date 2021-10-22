var express = require('express');
var router = express.Router();
const pdf = require('html-pdf');

router.post('/', function(req, res) {
    const data = {
        data: {
            msg: "Pdf created"
        }
    };

    console.log(data);
    const html = req.body.maintext;

    pdf.create(html, {}).toFile(`result.pdf`, (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

module.exports = router;
