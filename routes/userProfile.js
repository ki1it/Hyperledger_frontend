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
    if (req.session.user === undefined) {
        res.redirect('/login')
        return
    }
    let user = await User.findOne({
        where:{
            id: req.session.user.UserFK,
            }
    })
        .catch((err) => {
            console.log(err)
        })
    res.render('userProfile', {
        user:user,
        username: req.session.user.User.FirstName + ' ' + req.session.user.User.SecondName,
        position: req.session.user.User.Position.id,
        userphoto: req.session.user.Photo
    });
});

module.exports = router;
