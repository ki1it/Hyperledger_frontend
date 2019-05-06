var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/addDocument', function(req, res, next) {
    res.render('addDocument',
        { });
});

module.exports = router;
