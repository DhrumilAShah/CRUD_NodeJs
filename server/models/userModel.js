var bcrypt = require('bcrypt');
var sequelize = require('./../db/connection');

var User = sequelize.define('user', {
  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  hash_password:Sequelize.STRING,
  createdAt : Sequelize.NOW,
  updatedAt: Sequelize.NOW
});

User.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};


module.exports = { User : User };
