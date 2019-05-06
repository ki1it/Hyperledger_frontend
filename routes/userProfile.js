var express = require('express');
var router = express.Router();
const Document = require('../database/models/Document')
const DocSigners = require('../database/models/DocSigners')
const User = require('../database/models/User')
const SignedStatus = require('../database/models/SignedStatus')
const Position = require('../database/models/Position')
const DocType = require('../database/models/DocType')

/* GET home page. */
router.get('/',async function(req, res, next) {
    let user = await User.findAll({
        where:{
            id: req.session.user.UserFK,
            }
    })
    res.render('userProfile', {
        user:user,
        username: req.session.user.Login
    });
});

module.exports = router;
