var express = require('express');
var router = express.Router();
const Document = require('../database/models/Document')
const DocSigners = require('../database/models/DocSigners')
const User = require('../database/models/User')
const SignedStatus = require('../database/models/SignedStatus')
const Position = require('../database/models/Position')
const DocType = require('../database/models/DocType')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

/* GET home page. */
router.get('/',async function(req, res, next) {
    let notif = await DocSigners.findAll({
        where:{
            [Op.and]: [{ UserFK: req.session.user.UserFK}, {SignedFK: 4}]},


        include: [{model: Document,include:[{model: DocType , as: 'DocType'},{model: User, as: 'User'}], as: 'Document'},],

    })
    res.render('signDocs', {
        notif: notif,
        userid:req.session.user.UserFK,
        username: req.session.user.Login
    });
});

router.post('/signdoc', async function (req, res) {

     await DocSigners.update({
        SignedFK: 1
    },{
         where: {
             [Op.and]: [{DocumentFK: req.body.DocId}, {UserFK: req.body.UserId}]

         }
     })
        .catch((err) => {
            console.log(err)
        })
    res.redirect(req.url)

})

module.exports = router;