const socketIo = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const { getSubConnection, getConnection } = require('../lib/redisConnection');
const passport = require('passport');
const { jwtStrategy } = require('../config/passport');
const routes = require('./socket.routes');

// https://philenius.github.io/web%20development/2021/03/31/use-passportjs-for-authentication-in-socket-io.html
// authenticate socket.io connection using passport jwt strategy
passport.use('jwt', jwtStrategy);
passport.serializeUser(function (user, done) {
  if (user) done(null, user);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});
const wrapMiddlewareForSocketIo = (middleware) => (socket, next) => middleware(socket.request, {}, next);

let io;

const getSocketIo = async () => {
  if (!io) {
    throw new Error('socket not available');
  }

  return io;
};

const setup = async (server) => {
  // const subClient = await getSubConnection()
  // const pubClient = await getConnection()

  // const socketIo = new Server();
  // socketIo.adapter(createAdapter(pubClient, subClient));
  io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })
    .use(wrapMiddlewareForSocketIo(passport.initialize()))
    .use(wrapMiddlewareForSocketIo(passport.session()))
    .use(wrapMiddlewareForSocketIo(passport.authenticate(['jwt'])))
    .on('connection', (socket) => {
      // init routes
      routes.map((route) => socket.on(route.name, (data) => route.controller(socket, data)));
    });

  return io;
};
module.exports = {
  setup,
  getSocketIo,
};
