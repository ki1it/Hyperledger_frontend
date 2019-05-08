var express = require('express');
var router = express.Router();

var moment = require('moment');
const Document = require('../database/models/Document')
const DocSigners = require('../database/models/DocSigners')
const User = require('../database/models/User')
const SignedStatus = require('../database/models/SignedStatus')
const Position = require('../database/models/Position')
const DocType = require('../database/models/DocType')

/* GET home page. */
router.get('/',async function(req, res, next) {
    let document

    if (req.query.ID === "" || req.query.ID === undefined) {
        document = await Document.create({
            AuthorFK: req.session.user.UserFK
        })
            .catch((err) => {
                console.log(err)
            })

    }
    else {
        document = await Document.findOne({

            include: [{model: DocType, as: 'DocType'},
                {model: User, as: 'User'}],
            where: {id: req.query.ID}
        })
            .catch((err) => {
                console.log(err)
            })
    }

    let signers = await DocSigners.findAll({
        include: [{model: User, as: 'User'}],
        where: {DocumentFK: document.dataValues.id}
    })
        .catch((err) => {
            console.log(err)
        })

    let type = await DocType.findAll()
    let users = await User.findAll()
    res.render('addDocument',
        {
            type: type,
            document: document,
            users: users,
            signers: signers,
            username: req.session.user.Login,
        });
});

router.post('/add', async function (req, res) {
    let type = await DocType.findOne({
        where:{Name: req.body.inputType}
    })
        .catch((err) => {
            console.log(err)
        })
    let doc = await Document.update({
        Name: req.body.inputName,
        Number: req.body.inputNum,
        TypeFK: type.dataValues.id,
        AuthorFK: 2,
        Text: req.body.inputText,
        Date: moment(req.body.inputDate, 'YYYY-MM-DD').startOf('day')},
        {where:{id:req.query.id}
    })
        .catch((err) => {
            console.log(err)
        })
    res.redirect('/myDocs')

})
router.post('/save', async function (req, res) {
    let type = await DocType.findOne({
        where:{Name: req.body.inputType}
    })
        .catch((err) => {
            console.log(err)
        })
    let doc = await Document.update({
            Name: req.body.inputName,
            Number: req.body.inputNum,
            TypeFK: type.dataValues.id,
            AuthorFK: 2,
            Text: req.body.inputText,
            Date: moment(req.body.inputDate, 'YYYY-MM-DD').startOf('day')},
        {where:{id:req.query.id}
        })
        .catch((err) => {
            console.log(err)
        })


})

router.post('/addSigner', async function (req, res) {
    let user= await User.findOne({
        where:{SecondName:req.body.inputName.split(" ")[1]}
    })
        .catch((err) => {
            console.log(err)
        })
    await DocSigners.create({
        DocumentFK: req.query.ID,
        UserFK: user.dataValues.id,
        SignedFK: 4
    })
        .catch((err) => {
            console.log(err)
        })
    res.redirect('/addDocument?ID='+req.query.ID)

})
module.exports = router;
