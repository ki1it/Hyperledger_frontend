var express = require('express');
var router = express.Router();
const Document = require('../database/models/Document');
const DocSigners = require('../database/models/DocSigners');
const User = require('../database/models/User');
const SignedStatus = require('../database/models/SignedStatus');
const Position = require('../database/models/Position');
const DocType = require('../database/models/DocType');

/* GET home page. */
router.get('/',async function(req, res, next) {
    if (req.session.user === undefined) {
        res.redirect('/login');
        return
    }
    let doc = await Document.findOne({
        where:{
            AuthorFK: req.session.user.UserFK,
            id: req.query.id
            },

        include: [{model: DocSigners,include:[{model: User, as: 'User'},{model: SignedStatus, as: 'SignedStatus'}], as: 'DocSigners'},
            {model: DocType , as: 'DocType'},{model: User, as: 'User'}]
    })
        .catch((err) => {
        console.log(err)
    });
    res.render('viewDoc', {
        docs: doc,
        userid: req.session.user.UserFK,
        username: req.session.user.User.FirstName + ' ' + req.session.user.User.SecondName,
        position: req.session.user.User.Position.id,
        userphoto: req.session.user.Photo
    });
});

module.exports = router;
