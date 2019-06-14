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
const fetch = require("node-fetch")

/* GET home page. */
router.get('/',async function(req, res, next) {
    if (req.session.user === undefined) {
        res.redirect('/login')
        return
    }
    // let notif = await DocSigners.findAll({
    //     where:{
    //         [Op.and]: [{ UserFK: req.session.user.UserFK}, {SignedFK: 4}]},
    //
    //
    //     include: [{model: Document,include:[{model: DocType , as: 'DocType'},{model: User, as: 'User'}], as: 'Document'},],
    //
    // })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    let response
    response = await fetch(process.env.API_IP+'api/Document?filter='+encodeURIComponent('{"include": {"signers":"'+req.session.user.Role+'"}}'),{ method: 'GET'})
    // if (req.session.user.Role === "resource:org.example.doc.Teacher#1"){
    //     // response = await fetch(process.env.API_IP+'api/Document?filter=%7B%22where%22%3A%20%7B%22applicant%22%3A%22resource%3Aorg.example.doc.Teacher%231%22%7D%7D',{ method: 'GET'})
    //     response = await fetch(process.env.API_IP+'api/Document?filter='+encodeURIComponent('{"where": {"applicant":"resource:org.example.doc.Teacher#1"}}'),{ method: 'GET'})
    // }
    // if (req.session.user.Role === "resource:org.example.doc.Head_of_department#1"){
    //
    //     response = await fetch(process.env.API_IP+'api/Document?filter=%7B%22where%22%3A%20%7B%22applicant%22%3A%22resource%3Aorg.example.doc.Head_of_department%231%22%7D%7D',{ method: 'GET'})
    // }

    let resu = await response.json()
    let str = JSON.stringify(resu)
    res.render('signDocs', {

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
