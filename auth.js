if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcrypt')

const adminUsers = [{
  _id: 1,
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
}]

module.exports = function(passport){

  

}
