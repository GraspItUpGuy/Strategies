const express = require('express')
const passport =  require('passport')
const Strategy = require('passport-google').Strategy

const app = express()
const port = process.env.PORT || 3000;


app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

// configruation -> grab them from the npm page
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extened: true}))
app.use(require('express-session')({secret : 'GraspItUp App', resave : true,
saveUninitialized  : true}));

passport.use(new Strategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, done) {
    User.findByOpenID({ openId: identifier },  (err, user)=> {
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

app.get('/', (req,res)=>{
    // res.send('this is the test home page')
    res.render('home',  {user: req.user})
})

app.get('/login', (req,res)=>{
    
    res.render('login')
})


app.get('/auth/google',
  passport.authenticate('google'),
  function(req, res){
    // The request will be redirected to Google for authentication, so
    // this function will not be called.
  });

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });




app.listen(port, ()=>{
    console.log('server running on port 3000')
})