var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

// 导入 express-session 插件
const session = require('express-session')

// redis
const RedisStore = require('connect-redis')(session)

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var blogRouter = require('./routes/blog')
var userRouter = require('./routes/user')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))

// 解析 body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 解析 cookie
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// session redis 配置, 将 session 存到 redis 中
const redisClient = require('./db/redis.js')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(
  session({
    // resave是指每次请求都重新设置session cookie，假设你的cookie是10分钟过期，每次请求都会再设置10分钟
    // saveUninitialized是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
    resave: false,
    saveUninitialized: true,
    secret: 'E.GuOyOuWAter323#gd', // 密钥
    cookie: {
      // path: '/', // 默认配置
      // httpOnly: true, // 默认配置
      maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
  })
)

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'dev' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
