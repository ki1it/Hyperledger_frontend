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
    if (req.session.user === undefined) {
        res.redirect('/login')
        return
    }
    let notif = await DocSigners.findAll({
        where:{
            [Op.and]: [{ UserFK: req.session.user.UserFK}, {SignedFK: 4}]},


        include: [{model: Document,include:[{model: DocType , as: 'DocType'},{model: User, as: 'User'}], as: 'Document'},],

    })
        .catch((err) => {
            console.log(err)
        })
    res.render('signDocs', {
        notif: notif,
        userid:req.session.user.UserFK,
        username: req.session.user.User.FirstName + ' ' + req.session.user.User.SecondName,
        position: req.session.user.User.Position.id,
        userphoto: req.session.user.Photo
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
    res.redirect(req.get('referer'));

})

router.post('/unsigndoc', async function (req, res) {

    await DocSigners.update({
        SignedFK: 2
    },{
        where: {
            [Op.and]: [{DocumentFK: req.body.DocId}, {UserFK: req.body.UserId}]

        }
    })
        .catch((err) => {
            console.log(err)
        })
    res.redirect(req.get('referer'));

})
router.post('/comment', async function (req, res) {

    await DocSigners.update({
        SignedFK: 3,
        Comment: req.body.Comment
    },{
        where: {
            [Op.and]: [{DocumentFK: req.body.DocId}, {UserFK: req.body.UserId}]

        }
    })
        .catch((err) => {
            console.log(err)
        })
    res.redirect(req.get('referer'));

})


module.exports = router;
