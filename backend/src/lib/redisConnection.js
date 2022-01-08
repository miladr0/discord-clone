const redisObject = require('redis');

let subConnection;
let con;

const createConnection = function () {
  const redis = redisObject.createClient({
    url: process.env.REDIS_HOST,
  });

  redis.on('connect', function () {
    console.log('Connected to Redis');
  });
  redis.on('Error', function (err) {
    console.log('er', err);
  });

  redis.connect();

  return redis;
};

const createSubConnection = async function () {
  const redis = redisObject.createClient({ url: process.env.REDIS_HOST });
  redis.on('connect', function () {
    console.log('Redis subscribe Connected');
  });
  redis.on('Error', function (err) {
    console.log('er', err);
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
