const express = require('express');
const router = express.Router();

const usersData = require('../data/usersData');
const passport = require('passport')

const initializePassport = require('../passport-config')
initializePassport(
  passport, 
  email => usersData.findUserByEmail(email),
  id => usersData.findUserById(id)
)

router.use(passport.session())

router.get('/', function(req, res) {
  if(req.query.fail)
    res.render('login', { message: 'Usuário e/ou senha inválidos!' });
  else
    res.render('login', { message: null });
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login?fail=true',
  failureFlash: true
}))

module.exports = router;