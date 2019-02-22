// requiring dependencies
const express = require('express')
const passport = require('passport')
const Strategy  = require('passport-facebook').Strategy
const bodyParser = require('body-parser')
const ejs = require('ejs')
const cookieParser  = require('cookie-parser')()
const expressSession = require('express-session')
const connectEnsureLogin = require('connect-ensure-login')
const morgan = require('morgan')


// setting up the passort-facebook starategy
// => from the documentation
passport.use(new FacebookStrategy({
    clientID: "354750295125258",
    clientSecret: "0871db3b3cbf23350d706bc4ac0374d9",
    callbackURL: "http://localhost:3000/login/facebook/return"
  },(accessToken, refreshToken, profile, cb) =>{
       return cb(null, profile);
     }
));

//  serialize user
passport.serializeUser((user, cb)=> {
    cb(null, user);
  });
   

// desereialize user
passport.deserializeUser((obj, cb) =>{
    
      cb(null, user);
   
  });

// view engine setup
app.set('views', __dirname + '/views')
app.set('view engine' , 'ejs')


//app setup
const app = express()
const port = process.env.PORT || 3000


//@route  -   GET  /home
//@desc   -   a route to home page
//@access -   PUBLIC
//@source -   express npm page
app.get('/', (req,res)=>(
    res.send('this is the home page nibbas')
))



// listening the app on the server
app.listen(port, ()=>{
    console.log(`Server Running on the port : ${port}`)
})