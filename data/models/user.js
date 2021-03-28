const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  
  firstName: { 
    type: String,
    required: true
  },
  lastName: { 
    type: String,
    required: true
  },
  emailAdress: { 
    type: String,
    required: true
  },
  password: { 
    type: String,
    required: true
  },
  birthday: {
    type: Date
  }, 
  whenCreated: {
    type: Date,
    required: true,
    default: Date.now
  },
  whenChanged: {
    type: Date, 
    required: true,
    default: Date.now
  },
  location: {
    country: { 
      type: String 
    }
  },
  enable: {
    type: Boolean
  },
  blocked: {
    type: Boolean
  }

})

module.exports = mongoose.model("User",userModel);