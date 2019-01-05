const connection = require('./../db/connection');
var  jwt = require('jsonwebtoken');
var  bcrypt = require('bcrypt');


var insertUser = (name,email,password) => {
  return new Promise((resolve,reject) => {
    let hash = bcrypt.hashSync(password, 10);
    connection.query('insert into users(name,email,password) values (?,?,?)',[name,email,hash],(err,result) => {
      if(err) return reject(err);
      return resolve(JSON.stringify(result.affectedRows));
    })
  });
}

var getAllUser = () => {
  return new Promise((resolve, reject) => {
    connection.execute("SELECT * FROM users", (err, rows) => {
        if (err) return reject(err);
        return resolve(JSON.stringify(rows));
    });
  })
}

var findOne = (email) => {
  return new Promise((resolve, reject) => {
    connection.execute("SELECT * FROM users where email=?",[email], (err, user) => {
        if (err) return reject(err);
        return resolve(JSON.stringify(user));
    });
  })
}

var verifyPassword = (password,hash) => {
  return (bcrypt.compareSync(password, hash)) ? true : false;
}


module.exports = {
  insertUser : insertUser,
  getAllUser : getAllUser,
  findOne : findOne,
  verifyPassword : verifyPassword
}
