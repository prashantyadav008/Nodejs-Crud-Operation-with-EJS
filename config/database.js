require("dotenv").config();
const { createPool } = require("mysql");

var pool = createPool({
    host: process.env.HOST,
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10,
});

module.exports = pool;