var express = require('express');
var router = express.Router();

var moment = require('moment');
const Document = require('../database/models/Document');
const DocSigners = require('../database/models/DocSigners');
const User = require('../database/models/User');
const SignedStatus = require('../database/models/SignedStatus');
const Position = require('../database/models/Position');
const DocType = require('../database/models/DocType');
const fetch = require("node-fetch");
let funcs = require('../commonfunc');
/* GET home page. */
router.get('/',async function(req, res, next) {
    let document;
    if (req.session.user === undefined) {
        res.redirect('/login');
        return
    }
    // if (req.query.ID === "" || req.query.ID === undefined) {
    //     document = await Document.create({
    //         AuthorFK: req.session.user.UserFK
    //     })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //
    // }
    // else {
    //     document = await Document.findOne({
    //
    //         include: [{model: DocType, as: 'DocType'},
    //             {model: User, as: 'User'}],
    //         where: {id: req.query.ID}
    //     })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }
    //
    // let signers = await DocSigners.findAll({
    //     include: [{model: User, as: 'User'}],
    //     where: {DocumentFK: document.dataValues.id}
    // })
    //     .catch((err) => {
    //         console.log(err)
    //     })

    let type = await DocType.findAll();
    let users = await User.findAll();
    res.render('addDocument',
        {
            document: document,
            users: users,
            username: req.session.user.User.FirstName + ' ' + req.session.user.User.SecondName,
            position: req.session.user.User.Position.id,
            userphoto: req.session.user.Photo
        });
});


router.post('/add', async function (req, res) {
    let number = Math.floor(Math.random()*1000+Math.random()*100);
    if (req.body.inputAssignedDoc!=='')
    {
        let resp = await fetch(process.env.API_IP+'api/Document/'+req.body.inputAssignedDoc,{ method: 'GET'});
        let result = await resp.json();
        result.assignedDocs.push(number);
        delete result.documentId;
        let change = await fetch(process.env.API_IP+"api/Document/"+req.body.inputAssignedDoc,{ method: 'PUT',headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: await JSON.stringify(result)} )

    }
    var data = {
        $class: "org.example.doc.InitialApplicationDocument",
        documentId: number,
        applicant: req.session.user.Role,
        university: req.session.user.University,
        date: funcs.formatDate(new Date(req.body.inputDate)),
        text: req.body.inputText,
        changes: [],
        type: "ORDER_TO_PRACTICE"

    };
    var body = JSON.stringify(data);
    let response = await fetch(process.env.API_IP+"api/InitialApplicationDocument",{ method: 'POST',headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:body} );
    let resu = await response.json();
    // let type = await DocType.findOne({
    //     where:{Name: req.body.inputType}
    // })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // let doc = await Document.update({
    //         Name: req.body.inputName,
    //         Number: req.body.inputNum,
    //         TypeFK: type.dataValues.id,
    //         AuthorFK: 2,
    //         Text: req.body.inputText,
    //         Date: moment(req.body.inputDate, 'YYYY-MM-DD').startOf('day')},
    //     {where:{id:req.query.id}
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    res.redirect('/myDocs')

});


// router.post('/add', async function (req, res) {
//     let type = await DocType.findOne({
//         where:{Name: req.body.inputType}
//     })
//         .catch((err) => {
//             console.log(err)
//         })
//     let doc = await Document.update({
//         Name: req.body.inputName,
//         Number: req.body.inputNum,
//         TypeFK: type.dataValues.id,
//         AuthorFK: 2,
//         Text: req.body.inputText,
//         Date: moment(req.body.inputDate, 'YYYY-MM-DD').startOf('day')},
//         {where:{id:req.query.id}
//     })
//         .catch((err) => {
//             console.log(err)
//         })
//     res.redirect('/myDocs')
//
// })
// router.post('/save', async function (req, res) {
//     let type = await DocType.findOne({
//         where:{Name: req.body.inputType}
//     })
//         .catch((err) => {
//             console.log(err)
//         })
//     let doc = await Document.update({
//             Name: req.body.inputName,
//             Number: req.body.inputNum,
//             TypeFK: type.dataValues.id,
//             AuthorFK: 2,
//             Text: req.body.inputText,
//             Date: moment(req.body.inputDate, 'YYYY-MM-DD').startOf('day')},
//         {where:{id:req.query.id}
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//
//
// })
//
// router.post('/addSigner', async function (req, res) {
//     let user= await User.findOne({
//         where:{SecondName:req.body.inputName.split(" ")[1]}
//     })
//         .catch((err) => {
//             console.log(err)
//         })
//     await DocSigners.create({
//         DocumentFK: req.query.ID,
//         UserFK: user.dataValues.id,
//         SignedFK: 4
//     })
//         .catch((err) => {
//             console.log(err)
//         })
//     res.redirect('/addDocument?ID='+req.query.ID)
//
// })
// router.get('/checkNum', async function (req, res) {
//     let num = await Document.findOne({
//         where: {Number: req.query.Num}
//
//     })
//         .catch((err) => {
//             console.log(err)
//         })
//     if (num === null)
//         res.end("ok")
//     else
//         res.end("null")
//
// })
// router.get('/checkType', async function (req, res) {
//     let num = await DocType.findOne({
//         where: {Name: req.query.Name}
//
//     })
//         .catch((err) => {
//             console.log(err)
//         })
//     if (num !== null)
//         res.end("ok")
//     else
//         res.end("null")
//
// })
module.exports = router;
