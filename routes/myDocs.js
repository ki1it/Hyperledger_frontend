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
    let docs = await Document.findAll({
        where:{
            AuthorFK: req.session.user.UserFK,
            },

        include: [{model: DocSigners,include:[{model: User, as: 'User'},{model: SignedStatus, as: 'SignedStatus'}], as: 'DocSigners'},
            {model: DocType , as: 'DocType'},{model: User, as: 'User'}],
        limit:5
    })
        .catch((err) => {
        console.log(err)
    })
    res.render('myDocs', {
        docs: docs,
        userid: req.session.user.UserFK,
        username: req.session.user.Login
    });
});

module.exports = router;
