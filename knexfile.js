// Update with your config settings.

module.exports = {

  // elementary-school-match-help-dev
  development: {
    client: 'pg',
    connection: {
      database: 'elementary-school-match-help-developement',
      user:     'postgres',
      password: ';/U1waA=.dlE^59b\''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    },

  },

  staging: {
    client: 'pg',
    // in a .env file
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations'
    },
    ssl: true,

    seeds: {
      directory: './database/seeds'
    }
  },

  production: {
    client: 'pg',
    // in a .env file
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations'
    },
    ssl: true,

    seeds: {
      directory: './database/seeds'
    }
  }

};
