const bcrypt = require('bcrypt')
const User = require("./models/user");

exports.createNewUser = async function(userData) {
  const userAlreadyExists = await this.findUserByEmail(userData.email)

  if (userAlreadyExists) {
    console.log(userAlreadyExists)
    console.error('User already exists')
    return 'userAlreadyExists'
  }
    
  const hashedPassword = await bcrypt.hash(userData.password, 10)

  //console.log(`Função create > ${userData}`)
  const user = new User({
    firstName: userData.name, 
    lastName: userData.surname,  
    emailAdress: userData.email,    
    password: hashedPassword,     
    birthday: userData.birthday,
    whenCreated: Date.now(),
    whenChanged: Date.now(),
    enable: true,
    blocked: false,
    location: {
      country: userData.country
    }
  })

  let message;

  try {
    await user.save();
    message = `New user created and saved! User: ${userData.email}`;
    console.log(message);
  } catch(e) {
    message = `Error! New user not created and not saved! User: ${userData.email}`;
    console.error(`${message} -> ${e}`);
  }
   
  return message;
}

exports.findAllUsers = async function() {
  let users;
  //console.log(`1- ${user.email}`);
  //console.log(`2- ${user}`);
  //console.log(`3- ${email}`);
  //console.log (`pesquisa todos os usuários`)
  try {
    users = await User.find({ })
  
    /*
    if (users.length > 0)
      message = `findAllUsers -> Users finded!`;
    else 
      message = `findAllUsers -> Users empty!`;
    console.log(message);
    */
  } catch(e) {
    message = `Error`;
    console.log(message);
    console.error(e);
  }

  return users;
}

exports.findUserByEmail = async function(email) {
  let user;
  //console.log(`1- ${user.email}`);
  //console.log(`2- ${user}`);
  //console.log(`3- ${email}`);
  //console.log (`pesquisa por e-mail -> ${email}`)
  try {
    user = await User.find({ emailAdress: email })
    
    //console.log(await User.find({ emailAdress: email }));
    
    /*
    if (user.length > 0)
      message = `findUserByEmail -> User ${email} finded!`;
    else 
      message = `findUserByEmail -> User not exists!`;
    console.log(message);
    */
  } catch(e) {
    message = `Error`;
    console.log(message);
    console.error(e);
  }

  //console.log(user);
  return user;
}

exports.findUserById = async function(id) {
  let user;
  //console.log (`pesquisa por ID -> ${id}`);
  try {
    user = await User.find({ _id: id});
    //console.log(user[0].emailAdress);
    //message = `User ${user[0].emailAdress} finded!`;
    //console.log(message);
  } catch(e) {
    message = `Error`;
    console.log(message);
    console.error(e);
  }

  return user;
}