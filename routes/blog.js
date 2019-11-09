var express = require('express')
var router = express.Router()

router.get('/list', function(req, res, next) {
  res.json({
    errno: 0,
    data: [1, 3, 4]
  })
})

router.get('/detial', function(req, res, next) {
  res.json({
    errno: 0,
    data: {
      name: 'ok'
    }
  })
})

module.exports = router
