var express = require('express');
var router = express.Router();
const Document = require('../database/models/Document');
const DocSigners = require('../database/models/DocSigners');
const User = require('../database/models/User');
const SignedStatus = require('../database/models/SignedStatus');
const Position = require('../database/models/Position');
const DocType = require('../database/models/DocType');
const fetch = require("node-fetch");
var _ = require('lodash');
// var querystring = require('querystring')
/* GET home page. */
router.get('/',async function(req, res, next) {
    if (req.session.user === undefined) {
        res.redirect('/login');
        return
    }

    let response;
    response = await fetch(process.env.API_IP+'api/system/historian',{ method: 'GET'});
    // if (req.session.user.Role === "resource:org.example.doc.Teacher#1"){
    //     // response = await fetch(process.env.API_IP+'api/Document?filter=%7B%22where%22%3A%20%7B%22applicant%22%3A%22resource%3Aorg.example.doc.Teacher%231%22%7D%7D',{ method: 'GET'})
    //     response = await fetch(process.env.API_IP+'api/Document?filter='+encodeURIComponent('{"where": {"applicant":"resource:org.example.doc.Teacher#1"}}'),{ method: 'GET'})
    // }
    // if (req.session.user.Role === "resource:org.example.doc.Head_of_department#1"){
    //
    //     response = await fetch(process.env.API_IP+'api/Document?filter=%7B%22where%22%3A%20%7B%22applicant%22%3A%22resource%3Aorg.example.doc.Head_of_department%231%22%7D%7D',{ method: 'GET'})
    // }

    let resu = await response.json();
    let str = await JSON.stringify(resu, null, 4);
    // let response = await fetch("http://172.16.49.142:3000/api/Document",{ method: 'GET', body: '{id:1}' })
    // let resu = await response.json()
    var sort = _.reverse(_.sortBy(resu, "transactionTimestamp"))
    res.render('history', {
        history:sort,
        userid: req.session.user.UserFK,
        username: req.session.user.User.FirstName + ' ' + req.session.user.User.SecondName,
        position: req.session.user.User.Position.id,
        userphoto: req.session.user.Photo
    });
});

module.exports = router;
