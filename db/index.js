/**
 * Author: John Lee, Jan 2018
 */

const { Pool } = require('pg')

var config = {
  user: 'govtech',
  host: 'localhost',
  database: 'govtech',
  password: 'govtech',
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 3000
  }

var pool = new Pool(config);

module.exports = {
  query: (text, params) => pool.query(text, params),
  query_text_only: (text,) => pool.query(text)
}