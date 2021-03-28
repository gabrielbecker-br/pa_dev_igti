var express = require('express');
var router = express.Router();
var routerOpen = express.Router();

const usersData = require('../data/usersData');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const allUsers = await usersData.findAllUsers();
    
    //res.redirect('/users')
    res.send(allUsers);
  } catch {
    //res.redirect('/')
  }
  //res.render('users', { title: 'Users' });
  
});


routerOpen.get('/signup', (req, res) => {
  res.render('signup.ejs')
})
 
// Creating one
routerOpen.post('/signup', async (req, res) => {
  //const userAlreadyExists = await usersData.findUserByEmail(userData.email)

  //console.log(userAlreadyExists)


  try {
    await usersData.createNewUser(req.body);
    res.redirect('/login')
  } catch {
    res.redirect('/signup')
  }
})

module.exports = router
module.exports = routerOpen