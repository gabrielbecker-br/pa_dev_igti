if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const axios = require('axios');

test('Server started', async function () {
  const response = await axios({
    url: `${process.env.URL}:${process.env.SERVER_PORT}`,
    method: 'get'
  })

  expect(response.status).toBe(200)
})
