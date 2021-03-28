if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const path = require('path')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const favicon = require('serve-favicon')

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const usersRouter = require('./routes/users')
const usersRouter2 = require('./routes/users')

const app = express()
const db = require('./config/database')
db.dbConnect()

app.use(express.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minutos
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use('/login', checkNotAuthenticated, loginRouter)
app.use('/users', checkNotAuthenticated, usersRouter2)
app.use('/users', checkAuthenticated, usersRouter)
app.use('/logout', checkAuthenticated, logoutRouter)
app.use('/', checkAuthenticated, indexRouter)

app.listen(process.env.SERVER_PORT, () => console.info(`[INFO] Server Started at port ${process.env.SERVER_PORT}`))

console.log('Teste github')

