const socketIo = require('socket.io');
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

const getSocketIo = () => {
  if (!io) {
    throw new Error('socket not available');
  }

  return io;
};
const setup = (server) => {
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
      console.log(`socket io connection is ready`);

      // init routes
      routes.map((route) => socket.on(route.name, route.controller));
    });

  return io;
};
module.exports = {
  setup,
  getSocketIo,
};
