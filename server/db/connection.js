var mysql = require('mysql2');

const connection = mysql.createConnection({user: 'root', password: 'root', host: 'localhost', port: 3306, database: 'mydatabase'});

module.exports = connection;
