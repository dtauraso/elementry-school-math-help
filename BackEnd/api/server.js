
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

// const userRouter = require('../users/user-router');
// const authRouter = require('../auth/auth-router');
// const ticketRouter = require('../tickets/ticket-router');
// const reactionRouter = require('../reactions/reaction-router')

server.use(express.json());
server.use(logger);
server.use(cors());
server.use(helmet());
// console.log(server)
// for register and login
// server.use('/api', authRouter);

// // for users
// server.use('/api/users', userRouter);
// // for tickets
// server.use('/api/tickets', ticketRouter);

// server.use('/api/reactions', reactionRouter);
// middleware for all status 500 errors

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    error: err.message
  });
});
function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
        'Origin'
      )}`
    );
  
    next();
  }

module.exports = server;
