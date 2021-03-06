var express = require('express');
var router = express.Router();
const Document = require('../database/models/Document');
const DocSigners = require('../database/models/DocSigners');
const User = require('../database/models/User');
const SignedStatus = require('../database/models/SignedStatus');
const Position = require('../database/models/Position');
const DocType = require('../database/models/DocType');

/* GET home page. */
router.get('/',async function(req, res, next) {
  let notif = await DocSigners.findAll({
    where:{
      UserFK: req.session.user.UserFK,
      SignedFK: 4},

      include: [{model: Document,include:[{model: DocType , as: 'DocType'},{model: User, as: 'User'}], as: 'Document'},],
    limit:5
  })
      .catch((err) => {
        console.log(err)
      });
  res.render('index', {
    notif: notif,
    userid: req.session.user.UserFK,
    username: req.session.user.User.FirstName + ' ' + req.session.user.User.SecondName,
    position: req.session.user.User.Position.id
  });
});

module.exports = router;
