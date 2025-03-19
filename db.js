const pg = require('pg')

const client = new pg.Client(process.env.DATABASE_URL || 'postgress://localhost/acme_hr_directory');

module.exports = client;