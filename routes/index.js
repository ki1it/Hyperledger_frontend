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
      UserFK: req.session.user,
      SignedFK: 4},

      include: [{model: User, as: 'User'},{model: Document, as: 'Document'},],
    limit:5
  })
  res.render('index', { title: 'Express' });
});

module.exports = router;
