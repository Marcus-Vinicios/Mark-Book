const mysql = require('mysql')

//Configure este modulo de acordo com as suas preferências.
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'biblioteca'
})

module.exports = pool