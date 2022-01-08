const redisObject = require('redis');

let subConnection;
let con;

const createConnection = function () {
  const redis = redisObject.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
  if (process.env.REDIS_PASSWORD) redis.auth(process.env.REDIS_PASSWORD);
  redis.on('connect', function () {
    console.log('Connected to Redis');
  });
  redis.on('Error', function (err) {
    console.log(err);
  });

  redis.connect();

  return redis;
};

const createSubConnection = async function () {
  const redis = redisObject.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
  if (process.env.REDIS_PASSWORD) redis.auth(process.env.REDIS_PASSWORD);
  redis.on('connect', function () {
    console.log('Redis subscribe Connected');
  });
  redis.on('Error', function (err) {
    console.log(err);
  });

  // await redis.connect();

  return redis;
};

module.exports.getSubConnection = async function () {
  if (!subConnection) {
    subConnection = await createSubConnection();
  }

  return subConnection;
};

module.exports.getConnection = function () {
  if (!con) con = createConnection();

  return con;
};
