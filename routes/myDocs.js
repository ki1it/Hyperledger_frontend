var express = require('express');
var router = express.Router();
const Document = require('../database/models/Document');
const DocSigners = require('../database/models/DocSigners');
const User = require('../database/models/User');
const SignedStatus = require('../database/models/SignedStatus');
const Position = require('../database/models/Position');
const DocType = require('../database/models/DocType');
const fetch = require("node-fetch");
let funcs = require('../commonfunc');
var _ = require('lodash');
/* GET home page. */
router.get('/',async function(req, res, next) {
    if (req.session.user === undefined) {
        res.redirect('/login');
        return
    }
    // let docs = await Document.findAll({
    //     where:{
    //         AuthorFK: req.session.user.UserFK,
    //         },
    //
    //     include: [{model: DocSigners,include:[{model: User, as: 'User'},{model: SignedStatus, as: 'SignedStatus'}], as: 'DocSigners'},
    //         {model: DocType , as: 'DocType'},{model: User, as: 'User'}]
    // })
    //     .catch((err) => {
    //     console.log(err)
    // })
    // let que = {filter: {"where": {"applicant":"resource:org.example.doc.Teacher#1"}}}
    // let query = await querystring.stringify(que)
    let response;
    response = await fetch(process.env.API_IP+'api/Document?filter='+encodeURIComponent('{"where": {"applicant":"'+req.session.user.Role+'"}}'),{ method: 'GET'});
    let resu = await response.json();
    for (let i = 0; i < resu.length; i++){
        resu[i].applicantName = await funcs.getParticipantName(resu[i].applicant);
        resu[i].whosigned = _.intersection(resu[i].signers, resu[i].approval);
        for (let j = 0; j < resu[i].whosigned.length; j++){
            let name = await funcs.getParticipantName(resu[i].whosigned[j]);
            resu[i].whosigned[j] = name.name
        }
        resu[i].whonotsigned = _.difference(resu[i].signers, resu[i].approval);
        for (let j = 0; j < resu[i].whonotsigned.length; j++){
            let name = await funcs.getParticipantName(resu[i].whonotsigned[j]);
            resu[i].whonotsigned[j] = name.name
        }
    }
    let str = JSON.stringify(resu);
    console.log(resu.length)
    if (resu.length>20)
    {
        await resu.slice(0,20)
    }
    console.log('______________________________________________________________________________________________')
    console.log(resu.length)
    // let response = await fetch("http://172.16.49.142:3000/api/Document",{ method: 'GET', body: '{id:1}' })
    // let resu = await response.json()
    res.render('myDocs', {
        docs:resu,
        userid: req.session.user.UserFK,
        username: req.session.user.User.FirstName + ' ' + req.session.user.User.SecondName,
        position: req.session.user.User.Position.id,
        userphoto: req.session.user.Photo
    });
});

module.exports = router;
