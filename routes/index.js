var express = require('express');
var router = express.Router();

const usersData = require('../data/usersData');
const passport = require('passport')

/* GET home page. */
router.get('/', async function(req, res) {
  const user = await usersData.findUserById(req._passport.session.user)
  res.render('index', { title: `${user[0].firstName} ${user[0].lastName}` });
});

module.exports = router;