// requiring dependencies
const express = require('express')
const passport = require('passport')
const Strategy  = require('passport-facebook').Strategy
const ejs = require('ejs')
const connectEnsureLogin = require('connect-ensure-login')


// setting up the passort-facebook starategy
// => from the documentation
passport.use(new Strategy({
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
    
      cb(null, obj);
   
  });




//app setup
const app = express()
const port = process.env.PORT || 3000

// view engine setup
app.set('views', __dirname + '/views')
app.set('view engine' , 'ejs')


// configruation -> grab them from the npm page
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extened: true}))
app.use(require('express-session')({secret : 'GraspItUp App', resave : true,
saveUninitialized  : true}));


//@route  -   GET  /home
//@desc   -   a route to home page
//@access -   PUBLIC
//@source -   express npm page
app.get('/', (req,res)=>{
    //res.send('this is the home page nibbas')
    res.render('home', {user: req.user})
})

//@route  -   GET  /login
//@desc   -   a route to home page
//@access -   PUBLIC
//@source -   express npm page
app.get('/login', (req,res)=>{
   
    res.render('login')
})

//@route  -   GET  /login/facebook/
//@desc   -   a route for facebook auth
//@access -   PUBLIC
//@source -   express npm page
app.get('/auth/facebook',
  passport.authenticate('facebook'));

  //@route  -   GET  /login/facebook/callback
//@desc   -   a route for facebook auth failure redirect
//@access -   PUBLIC
//@source -   express npm page
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res)=> {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//@route  -   GET  /profile
//@desc   -   a route to profile of the user
//@access -   PROTECTED
//@source -   documentation -> passport-facebook on github
app.get('/profile', require('connect-ensure-login').ensureLoggedIn(),(req,res)=>{
    res.render('profile', {user : req.user})
 })


// listening the app on the server
app.listen(port, ()=>{
    console.log(`Server Running on the port : ${port}`)
})