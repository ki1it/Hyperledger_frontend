var express = require('express');
var router = express.Router();

const Document = require('../database/models/Document')
const DocSigners = require('../database/models/DocSigners')
const User = require('../database/models/User')
const SignedStatus = require('../database/models/SignedStatus')
const Position = require('../database/models/Position')
const DocType = require('../database/models/DocType')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('addDocument',
        { });
});
router.get('/add', async function (req, res) {
    let doc = await Client.create({
        FirstName: req.body.inputName,
        SecondName: req.body.inputSecondName,
        Patronymic: req.body.inputPatronymic,
        PhoneNumber: req.body.inputPhoneNumber,
        Adress_fias: req.body.inputAdress,
        Adress: req.body.address,
        DLNumber: req.body.inputDLN,
        Birthday: moment(req.body.inputBD, 'DD.MM.YYYY').startOf('day')
    })
        .catch((err) => {
            console.log(err)
        })



    if (req.query.SLID === undefined) {
        res.redirect(req.headers.referer)
    }
    else {
        let sl = await ServiceList.update({
            ClientFK: cl.dataValues.id
        }, {where: {id: req.query.SLID}})
            .catch((err) => {
                console.log(err)
            })
        res.redirect('/addservicelist?ID=' + req.query.SLID)
    }

})
module.exports = router;
