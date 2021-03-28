if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')

// BANCO DE DADOS - MONGODB
const dbConfig = {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  cluster: process.env.DB_CLUSTER,
  database: process.env.DB_DATABASE
};

exports.dbConnect = function() {
  const uri = "mongodb+srv://"+dbConfig.user+":"+dbConfig.password+"@"+dbConfig.cluster+".rqmnd.mongodb.net/"+dbConfig.database+"?retryWrites=true&w=majority";
  const opts = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(uri, opts)
  const db = mongoose.connection
  const dbInfo = `${dbConfig.name} | ${dbConfig.cluster} | ${dbConfig.database}`
  db.on('error', (error) => console.error(`[ERRO] DB Error Connecting! ${dbInfo} \n ${error}`))
  db.once('open', () => console.info(`[INFO] DB Connected to Database! ${dbInfo}`))
}
// FIM CONEXÃO BANCO DE DADOS

//module.exports = db