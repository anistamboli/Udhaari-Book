const Pool = require('pg').Pool;

require('dotenv').config();

// const devConfig = {
//     host: process.env.PG_HOST,
//     user: process.env.PG_USER,
//     port: process.env.PG_PORT,
//     password: process.env.PG_PASSWORD,
//     database: process.env.PG_DATABASE,
//     // multipleStatements: true
// };



// PG_USER = xnrphgoykuojqy
// PG_PASSWORD = 6b9b79ff311856a811bd9801abe32322d8c5f2297f96171916ccd112300c3740
// PG_HOST = ec2-54-163-97-228.compute-1.amazonaws.com
// PG_PORT = 5432
// PG_DATABASE = d5lkbhfch13sij

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
console.log(devConfig)
const proConfig = process.env.DATABASE_URL;
console.log(proConfig)
console.log(process.env.NODE_ENV)
const pool = new Pool({
    connectionString:
        process.env.NODE_ENV === "production" ? proConfig : devConfig,
});

module.exports = pool;

// const Pool = require('pg').Pool;

// const pool = new Pool({
//     host: 'ec2-54-163-97-228.compute-1.amazonaws.com',
//     user: 'xnrphgoykuojqy',
//     port: 5432,
//     password: '6b9b79ff311856a811bd9801abe32322d8c5f2297f96171916ccd112300c3740',
//     database: 'd5lkbhfch13sij',
//     // multipleStatements: true
// });

// module.exports = pool;