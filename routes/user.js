var express = require('express')
var router = express.Router()

router.post('/login', function(req, res, next) {
  const username = req.body.username
  const password = req.body.password

  if (!username) {
    res.json(new ErrorModel('用户名不能为空'))
    return
  }

  if (!password) {
    res.json(new ErrorModel('密码不能为空'))
    return
  }

  login(username, password)
    .then(resData => {
      if (resData && resData.username) {
        // 操作cookie
        req.session.username = resData.username
        req.session.realName = resData.realName

        // 同步 redis
        // set(req.sessionId, req.session)

        res.json(new SuccessModel('登录成功'))
        return
      }

      res.json(new ErrorModel('用户名或密码错误'))
    })
    .catch(error => {
      console.log(error)
      res.json(new ErrorModel('登录失败'))
    })
})

module.exports = router
