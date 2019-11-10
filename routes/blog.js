const express = require('express')
const router = express.Router()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 校验登录的中间件
const loginCheck = require('../middleware/loginCheck')

// 错误输出
function errorOutput(res, error, text) {
  console.log(error)
  text = text || '查询数据失败'
  res.json(new ErrorModel(text))
}

// 获取博客列表
router.get('/list', function(req, res, next) {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''

  // 管理员界面
  if (req.query.isadmin) {
    // 登录权限验证
    if (!req.session.username) {
      res.json(new ErrorModel('未登录'))
      return
    }

    // 强制查询自己的博客
    author = req.session.username
  }

  getList(author, keyword)
    .then(listData => {
      listData = listData || []
      res.json(new SuccessModel(listData))
    })
    .catch(error => {
      errorOutput(res, error)
    })
})

// 获取博客详情
router.get('/detail', function(req, res, next) {
  const id = req.query.id
  if (!id) {
    res.json(new ErrorModel('参数不能为空'))
    return
  }

  getDetail(id)
    .then(data => {
      if (data && data[0]) {
        res.json(new SuccessModel(data[0]))
        return
      }

      console.log(data)
      res.json(new ErrorModel('未查询到数据'))
    })
    .catch(error => {
      errorOutput(res, error)
    })
})

// 新增博客
router.post('/new', loginCheck, function(req, res, next) {
  const body = req.body
  if (!body.title || !body.content) {
    res.json(new ErrorModel('参数不能为空'))
    return
  }

  const author = req.session.username
  newBlog(body, author)
    .then(inResult => {
      if (inResult && inResult.id) {
        res.json(new SuccessModel(inResult))
        return
      }

      console.log(inResult)
      res.json(new ErrorModel('新增失败'))
    })
    .catch(error => {
      errorOutput(res, error, '新增失败')
    })
})

// 更新博客内容
router.post('/update', loginCheck, function(req, res, next) {
  const id = req.query.id
  const body = req.body

  if (!id || !body || !body.title || !body.content) {
    res.json(new ErrorModel('参数不能为空'))
    return
  }

  const author = req.session.username
  updateBlog(id, body, author)
    .then(result => {
      if (result) {
        res.json(new SuccessModel('更新成功'))
        return
      }

      console.log(result)
      res.json(new ErrorModel('更新失败'))
    })
    .catch(error => {
      errorOutput(res, error, '更新失败')
    })
})

// 删除博客
router.delete('/del', loginCheck, function(req, res, next) {
  const id = req.query.id
  if (!id) {
    res.json(new ErrorModel('参数不能为空'))
    return
  }

  const author = req.session.username
  delBlog(id, author)
    .then(result => {
      if (result) {
        res.json(new SuccessModel('删除成功'))
        return
      }

      console.log(result)
      res.json(new ErrorModel('删除失败'))
    })
    .catch(error => {
      errorOutput(res, error, '删除失败')
    })
})

module.exports = router
