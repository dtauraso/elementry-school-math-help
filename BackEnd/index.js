const server = require('./api/server.js');

const dotenv = require('dotenv');

// Load env variable
dotenv.config({
  path: './config/config.env'
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(
    `\n=== Server listening on port ${PORT} in ${process.env.NODE_ENV} mode ===\n`
  );
});
