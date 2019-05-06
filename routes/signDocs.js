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
    let notif = await DocSigners.findAll({
        where:{
            UserFK: req.session.user.UserFK,
            SignedFK: 4},

        include: [{model: User, as: 'User'},{model: Document,include:{model: DocType , as: 'DocType'}, as: 'Document'},],

    })
    res.render('signDocs', {
        notif: notif,
        userid:req.session.user.UserFK
    });
});

router.post('/signdoc', async function (req, res) {

     await DocSigners.update({
        SignedFK: 1
    },{
         where: {
             DocumentFK: req.body.Docid,
             UserFK: req.body.Userid,
         }
     })
        .catch((err) => {
            console.log(err)
        })
    res.redirect(req.url)

})

module.exports = router;
