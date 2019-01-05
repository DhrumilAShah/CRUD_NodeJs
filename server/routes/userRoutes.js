
var userController = require('./../controller/userController');

  exports.insertUser = ( req , res ) => {
     userController.insertUser(req.body.name,req.body.email,req.body.password).then((user) => {
       res.send(user);
     }).catch((err) => {
       res.sendStatus(500);
       console.log(err);
     });
  };

  exports.getAllUser = ( req , res ) => {
    userController.getAllUser().then((rows) => {
       res.send(rows);
     }).catch((err) => {
       res.sendStatus(500);
       console.log(err);
     });
  };

  exports.findOne = ( req , res ) => {
    userController.findOne(req.params.email).then((user) => {
       res.send(user);
     }).catch((err) => {
       res.sendStatus(500);
       console.log(err);
     });
  };
