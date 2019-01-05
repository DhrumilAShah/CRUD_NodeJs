const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var connection = require('./db/connection');
var userRoute = require('./routes/userRoutes');
var userController = require('./controller/userController');
var jwt = require('jsonwebtoken');
var basicAuthController = require('./controller/basicAuthController');
var jwtAuthController = require("./controller/jwtAuthController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views','./views');

app.get('/login',basicAuthController.isAuthenticated,(req,res) => {
  var payload = { email: req.get('email') };
  var token = jwt.sign(payload, jwtAuthController.jwtOptions.secretOrKey,{ expiresIn: '60m' });
  res.json({message: "ok", token: token});
});

/*app.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/');
});*/

 app.post('/user',userRoute.insertUser);
 app.get('/user',jwtAuthController.isAuthenticated,userRoute.getAllUser);
  /*.patch('/user',userRoute.updateUser)
    .delete('/user',userRoute.deleteUserByName);*/

 app.get('/user/:email',basicAuthController.isAuthenticated,userRoute.findOne);


app.listen(app.get('port'),() => {
  console.log('Started at: '+app.get('port'));
});
