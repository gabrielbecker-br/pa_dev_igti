const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email)
    if (user == '') {
      return done(null, false, { message: 'No user with that email' })
    }
  
    // Only Enable = true
    if (user[0].enable === false){
      return done(null, false, { message: 'User is disabled' })
    }

    try {
      if (await bcrypt.compareSync(password, user[0].password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (err) {
      console.log(err)
      return done(err, false)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => {
    if (user)
      done(null, user[0]._id)
  })
  passport.deserializeUser((id, done) => {
    try {
      return done(null, getUserById(id))  
    } catch (err) {
      console.log(err)
      return done(err, null)      
    }
    
    
  })
}

module.exports = initialize