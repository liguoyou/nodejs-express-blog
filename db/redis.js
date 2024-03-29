const redis = require('redis')
const { REDIS_CONF } = require('../conf/conf')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
  console.error(err)
})

module.exports = redisClient
