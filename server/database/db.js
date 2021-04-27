const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password:'Tango@007',
    database:'udhaari_book',
    // multipleStatements: true
});

module.exports = pool;