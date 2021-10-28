const { query } = require('express')
const {Pool} = require('pg')
const debug = require('debug')('query')
require('dotenv').config()

const pool = new Pool({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT,
})

module.exports = {
    async query(text, params){
        const start = Date.now()
        const result = await pool.query(text, params)
        const duration = Date.now() - start
        debug('executed query', {text, duration, rows: result.rowCount})
        return result
    }
}