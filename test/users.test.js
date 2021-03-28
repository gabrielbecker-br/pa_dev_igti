if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const axios = require('axios');
const usersData = require('../data/usersData');
const bcrypt = require('bcrypt')

test('Should get users', async function() {
  const response = await axios({
    url: `${process.env.URL}:${process.env.SERVER_PORT}/users`,
    method: 'get'
  })

  expect(response.data).toEqual(expect.anything()) // Se retornar qualquer coisa diferente de null ou undefined
}) 

test('Create user', async function() {
  const userTest01 = await usersData.createNewUser({ name: 'Test01', surname: 'User', email: 'test01@user', password: bcrypt.hash('12345', 10) })
  


  const response = await axios({
    url: `${process.env.URL}:${process.env.SERVER_PORT}/users`,
    method: 'get'
  })

  
})